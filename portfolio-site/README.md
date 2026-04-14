# Ajay Portfolio Website

Production-ready interactive portfolio built with Next.js (App Router), Tailwind CSS, Framer Motion, and Lucide icons.

## Features

- Resume-to-portfolio content architecture (About, Experience, Skills, Projects, Contact)
- 3D cursor tracking and spring smoothing
- Scroll-based parallax background layers
- 3D depth card reveals and hover transforms
- Sticky navigation with smooth section scrolling
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open `http://localhost:3000`

## Build and Run Production

1. Build: `npm run build`
2. Run production server: `npm run start`

## Deployment

### Vercel (recommended)

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use default Next.js settings and deploy.

### Other platforms

Any Node.js host that supports Next.js server mode can deploy this project. Use:

- `npm run build`
- `npm run start`

## Notes

- Contact links currently use generic LinkedIn and GitHub profile URLs. Update them in `src/app/page.tsx` for production identity.
- All portfolio content is sourced from `Ajay Resume Updated.docx`.
