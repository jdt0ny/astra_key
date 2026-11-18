import { useActiveSection } from '../hooks/useActiveSection';
import { useLanguage } from '../i18n/LanguageProvider';
import { AstraMark } from './AstraMark';
import { LanguageToggle } from './LanguageToggle';
import './SiteHeader.css';

const SECTION_IDS = ['about', 'connect', 'terminal'] as const;

export function SiteHeader() {
  const { t } = useLanguage();
  const activeSection = useActiveSection(SECTION_IDS);

  const links = [
    { id: 'about', label: t.nav.about, index: '01' },
    { id: 'connect', label: t.nav.connect, index: '02' },
    { id: 'terminal', label: t.nav.terminal, index: '03' },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a className="brand" href="#top">
          <AstraMark className="brand__mark" size={32} />
          <span className="brand__text">
            <span className="brand__name">ASTRA KEY</span>
            <span className="brand__tagline">{t.nav.tagline}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label={t.nav.navLabel}>
          {links.map((link) => (
            <a
              key={link.id}
              className={`site-nav__link${activeSection === link.id ? ' is-active' : ''}`}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? 'location' : undefined}
            >
              <span className="site-nav__index" aria-hidden="true">
                {link.index}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="site-header__controls">
          <span className="site-header__status">
            <span className="status-dot" aria-hidden="true" />
            {t.nav.status}
          </span>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
