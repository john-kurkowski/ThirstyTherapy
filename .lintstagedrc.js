const path = require("path");
const pkgUp = require("pkg-up");
const { ESLint } = require("eslint");

async function ignoredEslintFiles(files) {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  return files.filter((_, i) => !isIgnored[i]);
}

module.exports = {
  "*.css": ["stylelint --fix", "prettier --write"],

  "*.sh": "shellcheck",

  "*.svelte": (filenames) => {
    const distintProjectFolders = [
      ...new Set(
        filenames.map((filename) =>
          path.dirname(pkgUp.sync({ cwd: path.dirname(filename) }))
        )
      ),
    ];

    const svelteChecks = distintProjectFolders.map(
      (projectFolder) => `svelte-check --workspace ${projectFolder}`
    );

    return [
      `eslint --cache --fix --max-warnings=0 ${filenames.join(" ")}`,
      ...svelteChecks,
      `prettier --write ${filenames.join(" ")}`,
    ];
  },

  "*.{js,ts,tsx}": async (files) => {
    return [
      `eslint --cache --fix --max-warnings=0 ${(
        await ignoredEslintFiles(files)
      ).join(" ")}`,
      `prettier --write ${files.join(" ")}`,
    ];
  },
};
