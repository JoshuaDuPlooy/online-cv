import type { SkillGroup, SoftSkill } from "@/lib/content";

export function SoftSkills({ skills }: { skills: SoftSkill[] }) {
  if (!skills.length) return <p className="text-muted">Add skills to content/soft-skills.txt.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, i) => (
        <div key={s.name} className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 text-lg font-semibold">{s.name}</h3>
          {s.description && <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>}
        </div>
      ))}
    </div>
  );
}

const LEVEL_LABEL = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

export function ProfessionalSkills({ groups }: { groups: SkillGroup[] }) {
  if (!groups.length) return <p className="text-muted">Add skills to content/professional-skills.txt.</p>;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((g) => {
        const rated = g.skills.filter((s) => s.level > 0);
        const tags = g.skills.filter((s) => s.level === 0);
        return (
          <div key={g.category} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="mb-5 text-lg font-semibold">{g.category}</h3>
            {rated.length > 0 && (
              <ul className="space-y-4">
                {rated.map((s) => (
                  <li key={s.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-xs text-muted">{LEVEL_LABEL[s.level]}</span>
                    </div>
                    <div className="flex gap-1.5" aria-label={`${s.level} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`h-1.5 flex-1 rounded-full ${n <= s.level ? "bg-accent" : "bg-surface-muted"}`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {tags.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 ${rated.length ? "mt-5 border-t border-border pt-4" : ""}`}>
                {tags.map((s) => (
                  <span key={s.name} className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
