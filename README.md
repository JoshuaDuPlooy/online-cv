# Online CV

A single-page online CV and portfolio built with Next.js (App Router), TypeScript and Tailwind CSS.
All content is driven by plain `.txt` files in [`content/`](content/README.md) — no code changes needed to update the site.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

See [`content/README.md`](content/README.md). In short:

- `content/profile.txt` — name, title, tagline, contact links
- `content/backstory.txt` — your story
- `content/education.txt`, `content/sport.txt` — timeline entries separated by `---`
- `content/soft-skills.txt`, `content/professional-skills.txt` — skill lists
- `content/projects/*.txt` — one file per portfolio project; screenshots and PDFs go in `public/projects/`
- `public/profile.jpg` — your photo; `public/cv.pdf` — downloadable CV

## Deploying

`npm run build` produces a fully static site. Deploy to Vercel, Netlify or any static host.
