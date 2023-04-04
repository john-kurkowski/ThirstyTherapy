# Thirsty Therapy

You are worthy of good ~~drinks~~ source code for the website and stream
overlays.

## Requirements

- Rush: `npm install -g '@microsoft/rush@^5'`

## Install

1. `rush install`

## Development

1. `cd` to the 1 subproject of this monorepo you are working on, usually in
   `apps/`.
2. `rushx` to inspect the subproject's available lifecycle commands, like
   starting a development server.
3. Run your relevant lifecycle command, such as `rushx start`.

### Test

#### Lint and Typecheck

Lint and typecheck commands are the same across all apps in this project.
**The checks are run on commit, on staged files.**

The Node.js "app" that performs these checks is a Rush autoinstaller, in
[`common/autoinstallers/rush-husky/`](common/autoinstallers/rush-husky/). In
order for the autoinstaller to perform against all files in the project, the
lint config is in the project root, [`.lintstagedrc.js`](.lintstagedrc.js).

To perform the checks outside of the commit hook, use the full path to tools in
the autoinstaller directory. For example:

```sh
common/autoinstallers/rush-husky/node_modules/.bin/eslint --fix my-file.js
```

Consider running your command only on the subproject you're working on, usually
in `apps/`. For example, with `lint-staged`'s `--cwd` flag:

```sh
common/autoinstallers/rush-husky/node_modules/.bin/lint-staged --cwd apps/my-app/
```

To perform checks on all files regardless of Git status, while `lint-staged`
doesn't have an `--all-files` flag, there is the `--diff` flag you can abuse.
For example, linting the last 20 commits worth of changed files:

```sh
common/autoinstallers/rush-husky/node_modules/.bin/lint-staged --no-stash --diff @~20
```
