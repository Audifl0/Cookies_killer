#!/usr/bin/env bash
set -euo pipefail

sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl ufw build-essential

if ! command -v nvm >/dev/null 2>&1; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  source "$HOME/.nvm/nvm.sh"
fi

nvm install --lts
nvm use --lts

if [ -f package-lock.json ]; then
  npm ci || npm install
else
  npm install
fi
