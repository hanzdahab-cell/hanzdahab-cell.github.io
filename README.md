# Freedive Dahab

The Freedive Dahab website is a React, TypeScript, and Vite application.

## Run locally

Requirements: Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run lint
npm run build
npm run preview
```

## Deployment

The `main` branch is deployed to GitHub Pages by `.github/workflows/deploy.yml`.
The website is published at <https://hanzdahab-cell.github.io/>.

The deployment workflow runs the TypeScript check and production build before
publishing the `dist` directory. Historical source brochures and local working
materials are excluded from the repository; published prices shown on the site
are identified as historical and must be confirmed with the school.
