import fs from "fs";
import path from "path";
import type { Project } from "@/lib/content";
import { list } from "@/lib/content";
import ProjectGrid, { type ProjectCardData } from "./ProjectGrid";

function projectAsset(file?: string): string | undefined {
  if (!file) return undefined;
  const exists = fs.existsSync(path.join(process.cwd(), "public", "projects", file));
  return exists ? `/projects/${file}` : undefined;
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <p className="text-muted">
        No projects yet. Add a <code className="font-mono text-sm">.txt</code> file to{" "}
        <code className="font-mono text-sm">content/projects/</code> — see{" "}
        <code className="font-mono text-sm">content/README.md</code>.
      </p>
    );
  }

  const cards: ProjectCardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.meta.title ?? p.slug,
    type: p.meta.type ?? "Project",
    year: p.meta.year ?? "",
    tech: list(p.meta.tech),
    link: p.meta.link || undefined,
    demo: p.meta.demo || undefined,
    image: projectAsset(p.meta.image),
    file: projectAsset(p.meta.file),
    fileName: p.meta.file || undefined,
    featured: /^(yes|true)$/i.test(p.meta.featured ?? ""),
    body: p.body,
  }));

  return <ProjectGrid projects={cards} />;
}
