#!/usr/bin/env bash
set -euo pipefail

target="/var/www/space-cookies/dist"
sudo mkdir -p "$target"
sudo rsync -avh --delete dist/ "$target"/
sudo chown -R www-data:www-data /var/www/space-cookies
