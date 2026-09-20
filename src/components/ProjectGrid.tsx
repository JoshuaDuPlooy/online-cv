"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import RichText from "./RichText";

export type ProjectCardData = {
  slug: string;
  title: string;
  type: string;
  year: string;
  tech: string[];
  link?: string;
  demo?: string;
  image?: string;
  file?: string;
  fileName?: string;
  featured: boolean;
  body: string;
};

const IconExternal = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);
const IconFile = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </svg>
);

export default function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const types = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.type)))], [projects]);
  const [filter, setFilter] = useState("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.type === filter);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {types.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                filter === t
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-border bg-surface text-muted hover:border-accent hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setOpenSlug(p.slug)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-soft">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="hero-grid absolute inset-0 grid place-items-center">
                  <span className="font-mono text-4xl font-semibold text-white/25">
                    {p.title
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)
                      .toUpperCase()}
                  </span>
                </div>
              )}
              {p.featured && (
                <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-navy">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold uppercase tracking-wider text-accent">{p.type}</span>
                {p.year && <span className="font-mono text-muted">{p.year}</span>}
              </div>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{firstParagraph(p.body)}</p>
              {p.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md bg-surface-muted px-2 py-0.5 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 4 && <span className="px-1 text-xs text-muted">+{p.tech.length - 4}</span>}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpenSlug(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-surface shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {open.image && (
              <div className="relative aspect-[16/9] w-full bg-navy-soft">
                <Image src={open.image} alt={open.title} fill sizes="768px" className="object-cover" />
              </div>
            )}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-accent">{open.type}</span>
                    {open.year && <span className="font-mono text-muted">{open.year}</span>}
                    {open.featured && (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-navy">Featured</span>
                    )}
                  </div>
                  <h3 id="project-title" className="mt-2 text-2xl font-semibold">
                    {open.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenSlug(null)}
                  aria-label="Close"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-muted text-muted hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {open.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {open.tech.map((t) => (
                    <span key={t} className="rounded-md bg-surface-muted px-2 py-0.5 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <RichText text={open.body} className="mt-6" />

              {(open.link || open.demo || open.file) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {open.demo && (
                    <a
                      href={open.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
                    >
                      <IconExternal /> Live site
                    </a>
                  )}
                  {open.link && (
                    <a
                      href={open.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                        open.demo
                          ? "border border-border hover:bg-surface-muted"
                          : "bg-accent text-accent-contrast hover:opacity-90"
                      }`}
                    >
                      <IconExternal /> {/github\.com/.test(open.link) ? "View on GitHub" : "Open project"}
                    </a>
                  )}
                  {open.file && (
                    <a
                      href={open.file}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-surface-muted"
                    >
                      <IconFile /> {/\.pdf$/i.test(open.fileName ?? "") ? "View report (PDF)" : "Download file"}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function firstParagraph(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b && !b.startsWith("- ")) ?? "";
}
