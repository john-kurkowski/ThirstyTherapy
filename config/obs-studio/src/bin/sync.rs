#![feature(exit_status_error)]

use glob::glob;
use regex::Regex;
use serde_json::Value;
use std::path::Path;
use std::process::{Command, ExitStatusError};
use thiserror::Error;

#[derive(Debug, Error)]
enum CommandError {
    #[error("")]
    ExitStatus(#[from] ExitStatusError),
    #[error("")]
    Io(#[from] std::io::Error),
    #[error("")]
    Glob(#[from] glob::GlobError),
    #[error("")]
    Pattern(#[from] glob::PatternError),
    #[error("")]
    Json(#[from] serde_json::Error),
    #[error("")]
    Utf8(#[from] std::string::FromUtf8Error),
}

fn foreach_glob<F: Fn(String) -> Result<String, CommandError>>(
    glob_all_paths: &str,
    f: F,
) -> Result<(), CommandError> {
    let all_paths = glob(glob_all_paths)?;
    for path_result in all_paths {
        let path = path_result?;
        let file_contents = String::from_utf8(std::fs::read(&path)?)?;
        let mut new_file_contents = f(file_contents)?;

        match new_file_contents.chars().last() {
            Some(last) if last != '\n' => new_file_contents.push('\n'),
            _ => (),
        }

        std::fs::write(&path, new_file_contents)?;
    }

    Ok(())
}

fn exclude_sensitive_params_ini(destination: &Path) -> Result<(), CommandError> {
    let replace_re = Regex::new(r#"(?m)^.*Token=.*$"#).unwrap();
    foreach_glob(
        destination.join("**/*.ini").to_str().unwrap(),
        |file_contents| Ok(replace_re.replace_all(&file_contents, "").into_owned()),
    )
}

fn exclude_sensitive_params_json(destination: &Path) -> Result<(), CommandError> {
    let replace_re =
        Regex::new(r#"&(password|room|tt\w+)(=[^&"]*)?|\?(password|room|tt\w+)(=[^&"]*)?&?"#)
            .unwrap();
    foreach_glob(
        destination.join("**/*.json").to_str().unwrap(),
        |file_contents| Ok(replace_re.replace_all(&file_contents, "").into_owned()),
    )
}

fn format_json(destination: &Path) -> Result<(), CommandError> {
    foreach_glob(
        destination.join("**/*.json").to_str().unwrap(),
        |file_contents| {
            let input_json: Value = serde_json::from_str(&file_contents)?;
            Ok(serde_json::to_string_pretty(&input_json)?)
        },
    )
}

fn sync_files(source: &Path, destination: &Path) -> Result<(), CommandError> {
    Command::new("sudo")
        .arg("rsync")
        .arg("--compress")
        .arg("--links")
        .arg("--recursive")
        .arg("--times")
        .arg("--verbose")
        .args(["--exclude", "service.json"])
        .args(["--exclude", "*.bak"])
        .arg(source)
        .arg(destination)
        .spawn()?
        .wait_with_output()?
        .status
        .exit_ok()?;

    let whoami = trimmed_string(Command::new("whoami").output()?.stdout)?;

    Command::new("sudo")
        .arg("chown")
        .arg("-R")
        .arg(whoami)
        .arg(destination)
        .spawn()?
        .wait_with_output()?
        .status
        .exit_ok()?;

    Ok(())
}

fn trimmed_string(vec: Vec<u8>) -> Result<String, std::string::FromUtf8Error> {
    let mut s = String::from_utf8(vec)?;
    s.truncate(s.trim_end().len());
    Ok(s)
}

fn main_wrapped_error() -> Result<(), CommandError> {
    let source = Path::new("/Users/thirstytherapy/Library/Application Support/obs-studio/basic/");
    let destination = std::env::current_dir()?.join("basic");
    sync_files(source, destination.as_path())?;
    format_json(destination.as_path())?;
    exclude_sensitive_params_ini(destination.as_path())?;
    exclude_sensitive_params_json(destination.as_path())
}

fn main() {
    match main_wrapped_error() {
        Err(CommandError::ExitStatus(err)) => std::process::exit(err.code().unwrap_or(1)),
        Err(_) => std::process::exit(1),
        _ => (),
    }
}
