#!/usr/bin/env bash
set -euo pipefail

source "$HOME/.nvm/nvm.sh"
nvm use --lts

npm ci
npm run build
