import { ArrowUp, RotateCcw } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useLanguage } from '../i18n/LanguageProvider';
import { AstraMark } from './AstraMark';
import './SiteFooter.css';

interface SiteFooterProps {
  onReplayBoot: () => void;
}

export function SiteFooter({ onReplayBoot }: SiteFooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <AstraMark className="site-footer__mark" size={40} />
            <div>
              <p className="site-footer__name">ASTRA KEY</p>
              <p className="site-footer__tagline">{t.footer.tagline}</p>
            </div>
          </div>

          <div className="site-footer__actions">
            <button type="button" className="footer-action" onClick={onReplayBoot}>
              <RotateCcw size={14} strokeWidth={1.8} aria-hidden="true" />
              {t.footer.replayBoot}
            </button>
            <a className="footer-action" href="#top">
              {t.footer.backToTop}
              <ArrowUp size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="site-footer__rule" aria-hidden="true">
          <span>+</span>
        </div>

        <div className="site-footer__meta">
          <p>
            © {currentYear} {PROFILE.fullName}. {t.footer.rights}
          </p>
          <p className="site-footer__status">
            <span className="status-dot" aria-hidden="true" />
            {t.footer.status}
          </p>
          <p className="site-footer__privacy">{t.footer.privacy}</p>
          <p className="site-footer__end">{t.footer.endTransmission}</p>
        </div>
      </div>
    </footer>
  );
}
