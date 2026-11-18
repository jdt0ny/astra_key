interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  titleId: string;
  lead?: string;
}

export function SectionHeading({ index, eyebrow, title, titleId, lead }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="section-heading__meta">
        <span className="section-heading__index" aria-hidden="true">
          {index}
        </span>
        <span className="section-heading__eyebrow">{eyebrow}</span>
        <span className="section-heading__rule" aria-hidden="true" />
        <span className="section-heading__glyph" aria-hidden="true">
          ✦
        </span>
      </div>
      <h2 className="section-heading__title" id={titleId}>
        {title}
      </h2>
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
    </header>
  );
}
