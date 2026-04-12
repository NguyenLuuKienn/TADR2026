<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a8913edf-fc44-41fa-b7c9-0062bc9c8080

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Build static files to `docs/`:
   `npm run build:pages`
2. On GitHub, go to Settings -> Pages:
   Source = Deploy from a branch
   Branch = `main`
   Folder = `/docs`
3. Open the project site URL:
   `https://nguyenluukienn.github.io/TADR2026/`

If you open `https://nguyenluukienn.github.io/` directly, GitHub Pages will not load this repository's app because this is a project site repository.
