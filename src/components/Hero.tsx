import { ArrowDownRight, MapPin, Terminal as TerminalIcon } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useLanguage } from '../i18n/LanguageProvider';
import { OrbitPlate } from './OrbitPlate';
import './Hero.css';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__status-line">
            <span className="hero__status">
              <span className="status-dot" aria-hidden="true" />
              {t.hero.status}
            </span>
            <span className="hero__status-rule" aria-hidden="true" />
            <span className="hero__eyebrow">{t.hero.eyebrow}</span>
          </div>

          <h1 className="hero__title" id="hero-title" aria-label={PROFILE.fullName}>
            <span className="hero__name-line">{PROFILE.firstName}</span>
            <span className="hero__name-line hero__name-line--accent">
              {PROFILE.lastName}
              <span className="hero__name-star" aria-hidden="true">
                ✦
              </span>
            </span>
          </h1>

          <div className="hero__identity">
            <p className="hero__role">{t.hero.role}</p>
            <p className="hero__location">
              <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
              {t.hero.location}
            </p>
          </div>

          <div className="hero__statement-block">
            <span className="hero__bracket" aria-hidden="true">
              //
            </span>
            <div>
              <p className="hero__statement">
                {t.hero.statementLead}{' '}
                <span className="hero__statement-accent">{t.hero.statementAccent}</span>
              </p>
              <p className="hero__supporting">{t.hero.supporting}</p>
            </div>
          </div>

          <div className="hero__actions">
            <a className="button button--primary" href="#connect">
              {t.hero.ctaPrimary}
              <ArrowDownRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href="#terminal">
              <TerminalIcon size={16} strokeWidth={1.8} aria-hidden="true" />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <aside className="hero__visual" aria-label={t.hero.plateLabel}>
          <div className="id-plate">
            <div className="id-plate__head">
              <span className="id-plate__label">{t.hero.plateLabel}</span>
              <span className="id-plate__serial">{t.hero.plateSerial}</span>
            </div>

            <div className="id-plate__orbit-wrap">
              <OrbitPlate />
              <span className="id-plate__orbit-caption" aria-hidden="true">
                N
              </span>
              <span className="id-plate__orbit-caption id-plate__orbit-caption--s" aria-hidden="true">
                S
              </span>
            </div>

            <p className="id-plate__signal">
              <span className="status-dot" aria-hidden="true" />
              {t.hero.plateSignal}
            </p>

            <dl className="id-plate__data">
              {t.hero.plateRows.map((row, index) => (
                <div className="id-plate__row" key={row.id}>
                  <dt>
                    <span className="id-plate__row-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {row.label}
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
