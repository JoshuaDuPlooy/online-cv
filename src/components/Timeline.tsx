import type { Entry } from "@/lib/content";
import RichText from "./RichText";

type Props = {
  entries: Entry[];
  /** meta keys, in order: [headline, subheadline] */
  headlineKey: string;
  subKey: string;
  emptyMessage: string;
};

/** Vertical timeline used for Education and Sport. Reads Period / Location / Highlight from meta. */
export default function Timeline({ entries, headlineKey, subKey, emptyMessage }: Props) {
  if (!entries.length) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
      {entries.map((e, i) => {
        const headline = e.meta[headlineKey];
        const sub = e.meta[subKey];
        const chips = ["role", "team"]
          .filter((k) => k !== headlineKey && k !== subKey)
          .map((k) => e.meta[k])
          .filter(Boolean);
        return (
          <li key={i} className="relative">
            <span className="absolute -left-[2.35rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-accent bg-background sm:-left-[2.85rem]">
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-lg font-semibold">{headline}</h3>
                  {sub && <p className="text-muted">{sub}</p>}
                </div>
                <div className="text-right text-sm text-muted">
                  {e.meta.period && <p className="font-mono">{e.meta.period}</p>}
                  {e.meta.location && <p>{e.meta.location}</p>}
                </div>
              </div>

              {(chips.length > 0 || e.meta.highlight) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.meta.highlight && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                      {e.meta.highlight}
                    </span>
                  )}
                  {chips.map((c) => (
                    <span key={c} className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-muted">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {e.body && <RichText text={e.body} className="mt-4 text-[0.95rem]" />}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
