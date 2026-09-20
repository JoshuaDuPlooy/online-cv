import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  muted?: boolean;
};

export default function Section({ id, eyebrow, title, intro, children, muted }: Props) {
  return (
    <section id={id} className={`reveal scroll-mt-20 py-20 sm:py-24 ${muted ? "bg-surface-muted" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
