#![feature(exit_status_error)]
#![feature(unix_chown)]

use glob::glob;
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
}

fn sync_files(source: &Path, destination: &Path) -> Result<(), CommandError> {
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

    let glob_all_destination_files = destination.join(format!("{}/**/*", base_files));
    let all_paths = glob(glob_all_destination_files.to_str().unwrap())?;
    for path in all_paths {
        std::os::unix::fs::chown(path?, Some(uid), None)?;
    }

    Ok(())
}

fn main_wrapped_error() -> Result<(), CommandError> {
    let source = Path::new("/Users/thirstytherapy/Library/Application Support/obs-studio/basic");
    let destination = std::env::current_dir()?;
    sync_files(source, destination.as_path())
    // TODO: format JSON
    // TODO: exclude sensitive params
}

fn main() {
    match main_wrapped_error() {
        Err(CommandError::ExitStatusError(err)) => std::process::exit(err.code().unwrap_or(1)),
        Err(_) => std::process::exit(1),
        _ => (),
    }
}
