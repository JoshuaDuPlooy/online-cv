import fs from "fs";
import path from "path";
import Image from "next/image";

type Props = { profile: Record<string, string> };

function publicFileExists(file?: string) {
  return !!file && fs.existsSync(path.join(process.cwd(), "public", file));
}

const IconMail = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function Hero({ profile }: Props) {
  const name = profile.name ?? "Your Name";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const hasPhoto = publicFileExists(profile.photo);
  const hasCv = publicFileExists(profile.cv);
  const linkedin = profile.linkedin;
  const github = profile.github;

  return (
    <div id="top" className="relative overflow-hidden bg-navy text-white">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">Online CV</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{name}</h1>
          {profile.title && <p className="mt-3 text-xl text-white/80 sm:text-2xl">{profile.title}</p>}
          {profile.tagline && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{profile.tagline}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition hover:opacity-90"
            >
              View portfolio
            </a>
            {hasCv && (
              <a
                href={`/${profile.cv}`}
                download
                className="rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Download CV
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get in touch
              </a>
            )}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            {profile.location && (
              <li className="flex items-center gap-2">
                <IconPin />
                {profile.location}
              </li>
            )}
            {profile.email && (
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={`mailto:${profile.email}`}>
                  <IconMail />
                  {profile.email}
                </a>
              </li>
            )}
            {profile.phone && (
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  <IconPhone />
                  {profile.phone}
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={linkedin} target="_blank" rel="noreferrer">
                  <IconLinkedIn />
                  LinkedIn
                </a>
              </li>
            )}
            {github && (
              <li>
                <a className="flex items-center gap-2 hover:text-white" href={github} target="_blank" rel="noreferrer">
                  <IconGitHub />
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <div className="relative h-72 w-56 sm:h-96 sm:w-72">
            <div className="absolute inset-0 rotate-6 rounded-3xl bg-accent/30" aria-hidden />
            <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gold/20" aria-hidden />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 bg-navy-soft">
              {hasPhoto ? (
                <Image src={`/${profile.photo}`} alt={name} fill priority sizes="288px" className="object-cover object-top" />
              ) : (
                <div className="grid h-full w-full place-items-center text-6xl font-semibold text-white/30">{initials}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
