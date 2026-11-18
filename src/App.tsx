import { useCallback, useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { BootSequence } from './components/BootSequence';
import { Connect } from './components/Connect';
import { Hero } from './components/Hero';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { Terminal } from './components/Terminal';
import { useLanguage } from './i18n/LanguageProvider';

const BOOT_SESSION_KEY = 'astra-key:booted';

function shouldShowInitialBoot(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(BOOT_SESSION_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const { t } = useLanguage();
  const [bootVisible, setBootVisible] = useState(shouldShowInitialBoot);
  const mainRef = useRef<HTMLElement>(null);

  const completeBoot = useCallback(() => {
    setBootVisible(false);

    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, '1');
    } catch {
      // Booting still completes when session storage is unavailable.
    }

    window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const replayBoot = useCallback(() => {
    setBootVisible(true);
  }, []);

  useEffect(() => {
    if (!bootVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [bootVisible]);

  return (
    <>
      {bootVisible ? <BootSequence onComplete={completeBoot} /> : null}

      <div
        className="site"
        inert={bootVisible ? true : undefined}
        aria-hidden={bootVisible ? true : undefined}
      >
        <a className="skip-link" href="#main-content">
          {t.common.skipToContent}
        </a>

        <SiteHeader />

        <main className="site-main" id="main-content" ref={mainRef} tabIndex={-1}>
          <Hero />
          <About />
          <Connect />
          <Terminal />
        </main>

        <SiteFooter onReplayBoot={replayBoot} />
      </div>

      <div className="crt-overlay" aria-hidden="true">
        <span className="crt-overlay__sweep" />
      </div>
    </>
  );
}
