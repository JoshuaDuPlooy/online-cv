# Editing your CV content

Everything on the site comes from the `.txt` files in this folder. Edit them,
save, and the page updates (restart `npm run dev` if a brand-new file is added).

## Shared format

```
Key: value
Another Key: value

Body text. Blank line starts a new paragraph.
- Lines starting with "- " become bullet points.
```

Files with several entries (education, sport, projects list) separate entries
with a line containing only `---`.

## Files

| File | What it drives |
|------|----------------|
| `profile.txt` | Hero section: name, title, tagline, contact links, photo. Also Availability / Languages / Interests for the "At a glance" panel |
| `backstory.txt` | "My Story" section (free text) |
| `experience.txt` | Work experience timeline, one entry per `---` block (Role, Company, Period, Location) |
| `education.txt` | Education timeline, one entry per `---` block |
| `sport.txt` | Sport & achievements, one entry per `---` block |
| `soft-skills.txt` | One skill per line: `Name | short description` |
| `professional-skills.txt` | `## Category` headings, then `Skill | 1-5` lines (rating bar) or just `Skill` (tag) |
| `projects/*.txt` | One file per portfolio project |

## Adding a project

1. Create `content/projects/my-project.txt`:

```
Title: Tournament Manager
Type: Varsity Project        (Varsity / Personal / Work / Freelance)
Year: 2025
Tech: Next.js, TypeScript, PostgreSQL
Link: https://github.com/you/repo   (optional — code / project page)
Demo: https://example.com          (optional — live site button)
Image: tournament-manager.png       (optional, file in /public/projects)
File: tournament-manager.pdf        (optional, file in /public/projects — e.g. report)
Featured: yes                       (optional, shows a highlight badge)
Order: 1                            (optional, lower = shown first)

Description paragraphs go here.
- Bullet points work too.
```

2. Drop any screenshot / PDF into `public/projects/`.

## Photo

Put your photo at `public/profile.jpg` (or set `Photo:` in `profile.txt` to a
different filename inside `/public`). Put a downloadable PDF CV at
`public/cv.pdf` and set `CV: cv.pdf` in `profile.txt` to enable the button.
