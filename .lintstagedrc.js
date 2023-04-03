const path = require("path");
const pkgUp = require("pkg-up");
const { ESLint } = require("eslint");

/**
 * Honor ignored ESLint files in lint-staged.
 *
 * Avoids generating warnings avoid ignored files in CI, which Rush would treat
 * as errors.
 */
async function ignoredEslintFiles(files) {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  return files.filter((_, i) => !isIgnored[i]);
}

/**
 * Find the path to a command in the subproject responsible for linting.
 *
 * Otherwise, lint-staged might not find the correct executable, when run
 * outside of the Rush project's context.
 */
function bin(cmd) {
  return path.resolve(
    __dirname,
    "common",
    "autoinstallers",
    "rush-husky",
    "node_modules",
    ".bin",
    cmd
  );
}

module.exports = {
  "*.css": [`${bin("stylelint")} --fix`, `${bin("prettier")} --write`],

  "*.md": [`${bin("prettier")} --write`],

  "*.sh": "shellcheck",

  /**
   * Run typical JS checks, and run `svelte-check` per project folder.
   *
   * `svelte-check` does not expect to be run with a single file argument and
   * it does not expect to be run over the entire monorepo.
   */
  "*.svelte": (filenames) => {
    const distinctProjectFolders = [
      ...new Set(
        filenames.map((filename) =>
          path.dirname(pkgUp.sync({ cwd: path.dirname(filename) }))
        )
      ),
    ];

    const svelteChecks = distinctProjectFolders.map(
      (projectFolder) => `${bin("svelte-check")} --workspace ${projectFolder}`
    );

    return [
      `${bin("eslint")} --cache --fix --max-warnings=0 ${filenames.join(" ")}`,
      ...svelteChecks,
      `${bin("prettier")} --write ${filenames.join(" ")}`,
    ];
  },

  "*.{js,ts,tsx}": async (files) => {
    return [
      `${bin("eslint")} --cache --fix --max-warnings=0 ${(
        await ignoredEslintFiles(files)
      ).join(" ")}`,
      `${bin("prettier")} --write ${files.join(" ")}`,
    ];
  },
};
