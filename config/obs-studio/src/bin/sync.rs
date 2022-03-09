#![feature(exit_status_error)]
#![feature(unix_chown)]

use glob::glob;
use regex::Regex;
use serde_json::Value;
use std::path::Path;
use std::process::{Command, ExitStatusError};
use thiserror::Error;

#[derive(Debug, Error)]
enum CommandError {
    #[error("")]
    ExitStatusError(#[from] ExitStatusError),
    #[error("")]
    IoError(#[from] std::io::Error),
    #[error("")]
    GlobError(#[from] glob::GlobError),
    #[error("")]
    PatternError(#[from] glob::PatternError),
    #[error("")]
    JsonError(#[from] serde_json::Error),
    #[error("")]
    Utf8Error(#[from] std::string::FromUtf8Error),
}

fn foreach_glob<F: Fn(String) -> Result<String, CommandError>>(
    glob_all_paths: &str,
    f: F,
) -> Result<(), CommandError> {
    let all_paths = glob(glob_all_paths)?.collect::<Result<Vec<_>, _>>()?;
    for path in all_paths {
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
            serde_json::to_string_pretty(&input_json).map_err(CommandError::JsonError)
        },
    )
}

fn sync_files(source: &Path, destination: &Path) -> Result<(), CommandError> {
    // TODO: interactively sudo only this function. It may be difficult to attach the TTY at only
    // this point. But running `sudo cargo …` is nuts.

    Command::new("rsync")
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

    let uid = 501; // TODO: get current user id

    std::os::unix::fs::chown(destination, Some(uid), None)?;

    let glob_all_paths = destination.join("**/*");
    let all_paths = glob(glob_all_paths.to_str().unwrap())?.collect::<Result<Vec<_>, _>>()?;
    for path in all_paths {
        std::os::unix::fs::chown(path, Some(uid), None)?;
    }

    Ok(())
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
        Err(CommandError::ExitStatusError(err)) => std::process::exit(err.code().unwrap_or(1)),
        Err(_) => std::process::exit(1),
        _ => (),
    }
}
