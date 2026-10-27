# Shivam Sharma - Graphic Designer Portfolio

Modern, responsive portfolio website built with **React + Vite + Tailwind CSS**.

**Live site (after GitHub Pages is enabled):**  
https://shivam-graphic.github.io/portfolio/

## Features
- Clean modern UI based on your Figma design (improved)
- Fully responsive (mobile, tablet, desktop)
- Smooth scrolling + sticky header
- Hero, About, Experience, Work, Contact sections
- Ready for Sanity CMS (with Google/GitHub OAuth)

## How to see the site on GitHub Pages

1. Go to your repository: https://github.com/Shivam-Graphic/portfolio
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Wait 1–2 minutes for the workflow to finish (check **Actions** tab)
5. Open: **https://shivam-graphic.github.io/portfolio/**

The site will automatically rebuild and update every time code is pushed to `main`.

## Deploy to Vercel later (optional & easier)

1. Go to https://vercel.com and login with GitHub
2. Click **Add New Project** → Import `Shivam-Graphic/portfolio`
3. Framework Preset: **Vite**
4. Click **Deploy**

## Project Structure

```
src/
  App.jsx       → Main portfolio page
  data.js       → All content (easy to replace with CMS)
  index.css     → Tailwind + custom styles
  main.jsx
public/         → Put profile.jpg here later
```

## Next improvements I can do
- Add your real profile photo
- Add real project images from your screenshots
- Connect Sanity CMS with OAuth so you can edit content without code
- Make category filters fully functional

Just tell me what you want next!
