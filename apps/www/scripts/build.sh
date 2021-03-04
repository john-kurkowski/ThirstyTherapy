#!/usr/bin/env bash

# Standard Sapper production build command, but ignore some stderr patterns.
# Otherwise Rush fails the build, thinking there was a warning or error.

NODE_ENV=production sapper export --legacy 2> \
  >(grep --extended-regexp --invert-match \
    --regexp 'Built in' \
    --regexp 'Type .* to run the app' \
    --regexp '^\s*$' `# Blank lines` \
  >&2)
