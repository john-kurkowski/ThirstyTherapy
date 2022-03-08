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

fn exclude_sensitive_params_ini(destination: &Path) -> Result<(), CommandError> {
    let replace_re = Regex::new(r#"(?m)^.*Token=.*$"#).unwrap();

    let glob_all_paths = destination.join("**/*.ini");
    let all_paths = glob(glob_all_paths.to_str().unwrap())?.collect::<Result<Vec<_>, _>>()?;
    for path in all_paths {
        let input_string = String::from_utf8(std::fs::read(&path)?)?;
        let output_string = replace_re
            .replace_all(input_string.as_str(), "")
            .into_owned();
        std::fs::write(&path, output_string)?;
    }

    Ok(())
}

fn exclude_sensitive_params_json(destination: &Path) -> Result<(), CommandError> {
    let replace_re =
        Regex::new(r#"&(password|room|tt\w+)(=[^&"]*)?|\?(password|room|tt\w+)(=[^&"]*)?&?"#)
            .unwrap();

    let glob_all_paths = destination.join("**/*.json");
    let all_paths = glob(glob_all_paths.to_str().unwrap())?.collect::<Result<Vec<_>, _>>()?;
    for path in all_paths {
        let input_string = String::from_utf8(std::fs::read(&path)?)?;
        let output_string = replace_re
            .replace_all(input_string.as_str(), "")
            .into_owned();
        std::fs::write(&path, output_string)?;
    }

    Ok(())
}

fn format_json(destination: &Path) -> Result<(), CommandError> {
    let glob_all_paths = destination.join("**/*.json");
    let all_paths = glob(glob_all_paths.to_str().unwrap())?.collect::<Result<Vec<_>, _>>()?;
    for path in all_paths {
        let input_string = String::from_utf8(std::fs::read(&path)?)?;
        let input_json: Value = serde_json::from_str(input_string.as_str())?;
        let output_string = serde_json::to_vec_pretty(&input_json)?;
        std::fs::write(&path, output_string)?;
    }

    Ok(())
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

    let base_files = source.file_name().unwrap().to_str().unwrap(); // TODO: ugh unwrap
    std::os::unix::fs::chown(base_files, Some(uid), None)?;

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
