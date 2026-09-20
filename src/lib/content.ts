import fs from "fs";
import path from "path";

/**
 * Content lives in /content as plain .txt files.
 *
 * File format (shared by every file):
 *   - A header of `key: value` lines, then a blank line, then free-text body.
 *   - Files that hold many entries (education, sport, projects) separate each
 *     entry with a line containing only `---`.
 *   - Body text: blank line = new paragraph, lines starting with `- ` = bullet.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Entry = {
  meta: Record<string, string>;
  body: string;
};

function readFile(rel: string): string {
  const full = path.join(CONTENT_DIR, rel);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8").replace(/\r\n/g, "\n");
}

export function parseEntry(raw: string): Entry {
  const lines = raw.trim().split("\n");
  const meta: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") break;
    const m = line.match(/^([A-Za-z][\w -]*):\s*(.*)$/);
    if (!m) break;
    meta[m[1].trim().toLowerCase()] = m[2].trim();
  }
  const body = lines.slice(i).join("\n").trim();
  return { meta, body };
}

export function parseEntries(raw: string): Entry[] {
  return raw
    .split(/^\s*---\s*$/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(parseEntry);
}

export function getEntry(file: string): Entry {
  return parseEntry(readFile(file));
}

export function getEntries(file: string): Entry[] {
  return parseEntries(readFile(file));
}

/** Soft skills: one per line, `Name | short description` */
export type SoftSkill = { name: string; description: string };
export function getSoftSkills(): SoftSkill[] {
  return readFile("soft-skills.txt")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const [name, ...rest] = l.split("|");
      return { name: name.trim(), description: rest.join("|").trim() };
    });
}

/** Professional skills: `## Category` headings, then `Skill | level 1-5` lines */
export type SkillGroup = { category: string; skills: { name: string; level: number }[] };
export function getProfessionalSkills(): SkillGroup[] {
  const groups: SkillGroup[] = [];
  for (const rawLine of readFile("professional-skills.txt").split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("##")) {
      groups.push({ category: line.replace(/^#+\s*/, ""), skills: [] });
      continue;
    }
    if (line.startsWith("#")) continue;
    const [name, level] = line.split("|").map((s) => s.trim());
    const parsed = Number.parseInt(level ?? "", 10);
    if (!groups.length) groups.push({ category: "Skills", skills: [] });
    groups[groups.length - 1].skills.push({
      name,
      level: Number.isFinite(parsed) ? Math.min(5, Math.max(0, parsed)) : 0,
    });
  }
  return groups;
}

/** Projects: one .txt per project in /content/projects */
export type Project = Entry & { slug: string };
export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .map((f) => ({ slug: f.replace(/\.txt$/, ""), ...parseEntry(readFile(path.join("projects", f))) }))
    .sort((a, b) => {
      const order = (p: Project) => Number.parseInt(p.meta.order ?? "999", 10);
      if (order(a) !== order(b)) return order(a) - order(b);
      return (b.meta.year ?? "").localeCompare(a.meta.year ?? "");
    });
}

/** Split a comma-separated meta value into a clean list */
export function list(value?: string): string[] {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
