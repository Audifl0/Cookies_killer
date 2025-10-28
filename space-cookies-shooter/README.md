# Space Cookies Shooter 🍪🚀

![Space Cookies Shooter](public/favicon.svg)

[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF.svg)](https://vitejs.dev/) [![Phaser](https://img.shields.io/badge/Engine-Phaser%203-2E97FF.svg)](https://phaser.io/) [![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/) [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Space Cookies Shooter** est un shooter spatial arcade en TypeScript propulsé par Phaser 3. Survivez à des vagues infinies de cookies de l’espace diaboliques, terrassez des mini-boss et des boss, améliorez votre vaisseau grâce aux boutiques et à l’arbre de compétences, et profitez d’un décor dynamique à 60 FPS.

## 🚀 Fonctionnalités principales

- Vue top‑down fluide en WebGL (fallback Canvas).
- 6 archétypes d’ennemis + 2 mini-boss + 2 boss avec IA à états.
- Système d’armes modulaires (canon rapide, railgun, tir triple, faisceau…).
- Monnaie **Crumbs**, XP, loot varié et modules temporaires.
- Boutique entre les vagues + atelier persistant.
- Arbre de compétences à 3 branches (Offensif, Défensif, Mobilité).
- Sauvegarde locale versionnée (`localStorage`).
- Options d’accessibilité (mode daltonien, taille UI, secousses).
- Parallaxe, particules, météorites, effets dynamiques.
- Debug overlay intégrée (F9) + éditeur de vagues minimal.

## 🧱 Structure du projet

```
space-cookies-shooter/
  assets/
    data/...
  deploy/
  nginx/
  public/
  src/
    core/
    entities/
    scenes/
    systems/
    ui/
    styles/
    tests/
```

Toutes les données de gameplay sont externalisées dans `assets/data/*.json` afin de faciliter l’équilibrage.

## 🛠️ Installation & développement

```bash
npm install
npm run dev
```

Le serveur Vite s’ouvre automatiquement sur `http://localhost:5173`. Le jeu est responsive et s’adapte au plein écran.

### Scripts NPM

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Lance Vite en mode développement. |
| `npm run build` | Compile TypeScript (`tsc`) puis génère le bundle Vite de production. |
| `npm run preview` | Prévisualise le build de production. |
| `npm run lint` | Analyse ESLint (TypeScript strict). |
| `npm run lint:fix` | Corrige automatiquement les problèmes formatables. |
| `npm run test` | Exécute les tests Jest (utilitaires et économie). |

## 🎮 Commandes

| Action | Clavier | Gamepad |
| ------ | ------- | ------- |
| Déplacement | ZQSD / Flèches | Stick gauche |
| Tir | Clic gauche | Bouton A |
| Dash | Barre espace | Bouton B |
| Autotir | Touche F (toggle) | Start (via options) |
| Menu Pause | Échap | Start |

Les contrôles sont remappables via **Options > Entrées**.

## 🛒 Boutiques & progression

- **Boutique inter-vagues** : utilisez vos Crumbs pour acheter armes, boucliers, propulseurs, drones et aimants.
- **Arbre de compétences** : dépensez les points de talent gagnés en montant de niveau pour débloquer des passifs offensifs, défensifs et de mobilité.
- Les boss offrent des récompenses massives en Crumbs et XP.

## 💾 Sauvegarde

La sauvegarde est stockée dans `localStorage` (`space-cookies-save`). Le schéma est versionné (`SaveGame.version`) et migré automatiquement.

## 🧪 Tests

```bash
npm run test
```

Les tests Jest couvrent les utilitaires mathématiques (XP, crit, clamp) et les événements économiques.

## 📦 Build de production

```bash
npm run build
```

Le dossier `dist/` contient le bundle optimisé prêt à être déployé via Nginx ou un CDN.

## 📚 Documentation de déploiement

- [Guide Ubuntu + Nginx + HTTPS](deploy/ubuntu-setup.md)
- [Configuration Nginx](nginx/space-cookies.conf)
- Scripts d’automatisation dans `deploy/`

## 🙌 Crédits

- Code & design : Codex (assistant IA)
- Audio : généré procéduralement via WebAudio (placeholders inclus)
- Graphismes : sprites placeholders générés runtime (Canvas/Phaser)

Bon vol parmi les miettes cosmiques !
