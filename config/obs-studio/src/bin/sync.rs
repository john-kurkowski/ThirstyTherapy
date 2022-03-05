#![feature(exit_status_error)]

use std::path::Path;
use std::process::{Command, ExitStatusError};

enum CommandError {
    GenericError(std::io::Error),
    ExitStatusError(ExitStatusError),
}

impl From<std::io::Error> for CommandError {
    fn from(err: std::io::Error) -> CommandError {
        CommandError::GenericError(err)
    }
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
        .exit_ok()
        .map_err(CommandError::ExitStatusError)
}

fn main_wrapped_error() -> Result<(), CommandError> {
    let source = Path::new("/Users/thirstytherapy/Library/Application Support/obs-studio/basic");
    let destination = std::env::current_dir()?;
    sync_files(source, destination.as_path())
    // TODO: port more
}

fn main() {
    match main_wrapped_error() {
        Err(CommandError::ExitStatusError(err)) => std::process::exit(err.code().unwrap_or(1)),
        Err(_) => std::process::exit(1),
        _ => (),
    }
}
