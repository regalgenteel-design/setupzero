import { Fragment } from "react";

/**
 * Renders `text` with `highlight` in the serif accent style.
 * When the highlight ends a longer sentence it drops to its own line, like the template headings.
 */
export function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const head = text.slice(0, text.length - highlight.length).trimEnd();
  // Drop the accent onto its own line only when the lead-in is long enough to stand alone.
  if (text.endsWith(highlight) && head.length >= 12) {
    return (
      <>
        <span className="block">{head}</span>
        <span className="highlight block">{highlight}</span>
      </>
    );
  }
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <span className="highlight">{highlight}</span> : null}
        </Fragment>
      ))}
    </>
  );
}
