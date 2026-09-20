/** Renders the free-text body of a content file: paragraphs + "- " bullets. */
export default function RichText({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;

  // Group consecutive lines into paragraph / list chunks. A blank line or a
  // switch between bullet and non-bullet lines starts a new chunk.
  const chunks: { type: "p" | "ul"; lines: string[] }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      chunks.push({ type: "p", lines: [] });
      continue;
    }
    const type = line.startsWith("- ") ? "ul" : "p";
    const last = chunks[chunks.length - 1];
    if (last && last.type === type && last.lines.length) {
      last.lines.push(line);
    } else if (last && !last.lines.length) {
      last.type = type;
      last.lines.push(line);
    } else {
      chunks.push({ type, lines: [line] });
    }
  }

  return (
    <div className={`space-y-4 leading-relaxed text-muted ${className}`}>
      {chunks
        .filter((c) => c.lines.length)
        .map((c, i) =>
          c.type === "ul" ? (
            <ul key={i} className="space-y-1.5 pl-1">
              {c.lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{l.replace(/^- /, "")}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p key={i}>{c.lines.join(" ")}</p>
          ),
        )}
    </div>
  );
}
