# Déploiement Space Cookies Shooter sur Ubuntu 22.04+

Ce guide décrit la mise en production de **Space Cookies Shooter** sur un serveur Ubuntu 22.04 LTS (ou supérieur) avec **Nginx** et **HTTPS** via Certbot.

## 1. Pré-requis

- VPS Ubuntu 22.04+
- Nom de domaine : `example.com` (et `www.example.com`) pointant sur l’adresse IP du serveur (DNS A/AAAA)
- Accès SSH avec un utilisateur sudo

## 2. Mise à jour du système & paquets de base

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl ufw
```

Activez le pare-feu et autorisez Nginx :

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 3. Installation de Node.js LTS via NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
node -v
npm -v
```

## 4. Récupération du projet

```bash
cd /var/www
sudo mkdir -p space-cookies
sudo chown $USER:$USER space-cookies
cd space-cookies
git clone https://github.com/your-org/space-cookies-shooter.git .
```

## 5. Installation & build

```bash
npm ci
npm run build
```

Le build génère le dossier `dist/`.

## 6. Structure web

```bash
sudo mkdir -p /var/www/space-cookies/dist
sudo chown -R www-data:www-data /var/www/space-cookies
```

Déployez (via `rsync` ou `deploy/sync-dist.sh`) le contenu de `dist/` vers `/var/www/space-cookies/dist`.

## 7. Configuration Nginx

Copiez le fichier `nginx/space-cookies.conf` dans `/etc/nginx/sites-available/space-cookies.conf`, adaptez le domaine, puis activez-le :

```bash
sudo cp nginx/space-cookies.conf /etc/nginx/sites-available/space-cookies.conf
sudo ln -s /etc/nginx/sites-available/space-cookies.conf /etc/nginx/sites-enabled/space-cookies.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 8. HTTPS avec Certbot

```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot configure automatiquement le renouvellement (`/etc/cron.d/certbot`). Testez :

```bash
sudo certbot renew --dry-run
```

## 9. Scripts de déploiement

Dans `deploy/` :

- `install.sh` : installe les dépendances système + Node + projet.
- `build.sh` : lance `npm ci` + `npm run build`.
- `sync-dist.sh` : synchronise `dist/` sur `/var/www/space-cookies/dist` (via `rsync`).

Exemple :

```bash
bash deploy/install.sh
bash deploy/build.sh
bash deploy/sync-dist.sh
```

## 10. Vérifications post-déploiement

```bash
sudo nginx -t
systemctl status nginx
```

Ouvrez `https://example.com` dans un navigateur, puis réalisez un audit rapide (Lighthouse/Chrome DevTools) pour vérifier les performances.

## 11. Option Docker (facultatif)

Vous pouvez servir le dossier `dist/` via `nginx:alpine` :

```Dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
```

Déployez ensuite avec Docker Compose ou tout orchestrateur.

## 12. Mises à jour ultérieures

1. `git pull`
2. `npm ci`
3. `npm run build`
4. `bash deploy/sync-dist.sh`
5. `sudo systemctl reload nginx`

Bon déploiement !
