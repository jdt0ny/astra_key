import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { AstraMark } from './AstraMark';
import { SectionHeading } from './SectionHeading';
import './About.css';

export function About() {
  const { t } = useLanguage();

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          titleId="about-title"
        />

        <div className="about__grid">
          <aside className="about__file" aria-label={t.about.fileLabel}>
            <div className="about__file-head">
              <span>{t.about.fileLabel}</span>
              <span>{t.about.fileCode}</span>
            </div>

            <div className="about__file-mark" aria-hidden="true">
              <AstraMark size={72} />
            </div>

            <dl className="about__file-data">
              {t.about.fields.map((field) => (
                <div className="about__file-row" key={field.id}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about__barcode" aria-hidden="true" />
          </aside>

          <div className="about__body">
            {t.about.paragraphs.map((paragraph, index) => {
              const classes = ['about__paragraph'];

              if (index === 0) {
                classes.push('about__paragraph--lead');
              }

              if (index === 4) {
                classes.push('about__paragraph--manifesto');
              }

              return (
                <p className={classes.join(' ')} key={paragraph}>
                  {index === 0 ? (
                    <span className="about__lead-prompt" aria-hidden="true">
                      &gt;
                    </span>
                  ) : null}
                  {paragraph}
                </p>
              );
            })}

            <div className="about__foot">
              <span className="about__eof">[ {t.about.endNote} ]</span>
              <a className="text-link" href="#connect">
                {t.about.next}
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
