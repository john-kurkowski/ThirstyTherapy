module.exports = {
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.svelte": ["eslint --cache --fix --max-warnings=0", "svelte-check", "prettier --write"],
  "*.{ts,tsx}": ["eslint --cache --fix --max-warnings=0", "prettier --write"],
}
