# Clarion Global Website

Public marketing website for **Clarion Education & Skill Pvt. Ltd.** — a purpose-driven social enterprise working at the intersection of education, communication, and social innovation.

## Features

- Home, About, Work, and Contact pages
- GSAP scroll and entrance animations
- Responsive layout with Clarion branding
- Static deployment — no server or database required

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router v7
- GSAP

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # output in dist/
npm run preview  # preview production build locally
```

## Deployment

This is a static single-page app. Build with `npm run build` and deploy the `dist/` folder to any static host.

### Netlify / Cloudflare Pages

A `public/_redirects` file is included so client-side routes (`/about`, `/work`, etc.) work on refresh.

### Vercel

`vercel.json` is included for SPA routing.

### Docker

```bash
docker build -t clarion-website .
docker run -p 8080:80 clarion-website
```

Serves the built site via nginx on port 80.

### Other hosts

Configure your host to serve `index.html` for all routes (SPA fallback).

## Project Structure

```
.
├── public/             # Static assets (images, routing config)
├── src/
│   ├── components/     # Navigation, Footer
│   ├── pages/          # Home, About, Work, Contact
│   ├── sections/     # Home page sections
│   └── App.tsx         # Routes
├── scripts/
│   └── generate-gallery-manifest.js # Pre-build script for gallery images
├── index.html
└── vite.config.ts
```

## Adding Project Gallery Images

To add additional images to a project's gallery (which automatically appear in an interactive slider on the Work Modal):
1. Navigate to `public/work/<project-id>/` (e.g. `public/work/affordable-school-notebook/`).
2. Create a `gallery/` folder if it doesn't exist.
3. Drop your images inside (`.jpg`, `.png`, `.webp`, etc.).
4. The system will automatically pick them up on the next `npm run dev` or `npm run build` and display them in the modal.

## Design

- Primary: `#2B468B` (Deep Blue)
- Secondary: `#F58220` (Orange)
- Background: `#ffffff` (White)
- Typography: Outfit & Roboto