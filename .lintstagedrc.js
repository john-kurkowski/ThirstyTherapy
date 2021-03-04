const path = require("path");
const pkgUp = require("pkg-up");

module.exports = {
  "*.css": ["stylelint --fix", "prettier --write"],

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

  "*.{js,ts,tsx}": [
    "eslint --cache --fix --max-warnings=0",
    "prettier --write",
  ],
};
