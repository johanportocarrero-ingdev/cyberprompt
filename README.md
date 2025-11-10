<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1m-ow08nRbnKx3Ha5E-i87HgJ0iYlNPpE

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build for Production

Generate the optimized bundle before deploying:

```bash
npm run build
```

The static assets are emitted to the `dist/` directory.

## Deploy to GitHub Pages

This repository ships with a GitHub Actions workflow that builds the project with Vite and publishes the `dist/` folder to GitHub Pages.

1. In your repository settings on GitHub, enable **Pages** and set the source to “GitHub Actions”.
2. Push your changes to the `main` branch. The workflow at `.github/workflows/deploy.yml` will run automatically, build the site, and deploy it.
3. The published site will be served from `https://<tu-usuario>.github.io/cyberprompt/`.

> Para desplegar en otro repositorio o subruta, configura la variable de entorno `VITE_BASE_PATH` con el prefijo deseado antes de ejecutar `npm run build`.
