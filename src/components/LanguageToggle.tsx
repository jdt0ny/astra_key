import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import type { Language } from '../i18n/translations';

const LANGUAGE_OPTIONS: readonly Language[] = ['it', 'en'];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="lang-toggle" role="group" aria-label={t.nav.languageLabel}>
      <Globe className="lang-toggle__icon" size={14} aria-hidden="true" />
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option;
        const label = option === 'it' ? t.nav.italian : t.nav.english;

        return (
          <button
            key={option}
            type="button"
            className={`lang-toggle__button${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            aria-label={`${option.toUpperCase()} — ${label}`}
            lang={option}
            onClick={() => setLanguage(option)}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
