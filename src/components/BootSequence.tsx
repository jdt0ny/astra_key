import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { AstraMark } from './AstraMark';
import './BootSequence.css';

const INTRO_DELAY = 420;
const STEP_DELAY = 420;
const HOLD_DELAY = 720;
const EXIT_DELAY = 280;

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const { t } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const finishedRef = useRef(false);
  const timersRef = useRef<Set<number>>(new Set());
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) {
      window.clearTimeout(timer);
    }

    timersRef.current.clear();
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);

    timersRef.current.add(timer);
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;
    clearTimers();
    setIsLeaving(true);
    schedule(() => onCompleteRef.current(), EXIT_DELAY);
  }, [clearTimers, schedule]);

  useEffect(() => {
    skipButtonRef.current?.focus();

    t.boot.lines.forEach((_, index) => {
      schedule(
        () => setCompletedSteps(index + 1),
        INTRO_DELAY + STEP_DELAY * index,
      );
    });

    schedule(finish, INTRO_DELAY + STEP_DELAY * t.boot.lines.length + HOLD_DELAY);

    return clearTimers;
  }, [clearTimers, finish, schedule, t.boot.lines.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [finish]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      skipButtonRef.current?.focus();
    }
  };

  const totalSteps = t.boot.lines.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const isReady = completedSteps >= totalSteps;

  return (
    <div
      className={`boot-screen${isLeaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-title"
      aria-describedby="boot-hint"
      onKeyDown={trapFocus}
    >
      <div className="boot-screen__inner">
        <div className="boot-screen__topline">
          <span className="boot-screen__kicker">{t.boot.kicker}</span>
          <button
            ref={skipButtonRef}
            type="button"
            className="boot-screen__skip"
            onClick={finish}
            disabled={isLeaving}
          >
            {t.boot.skip} <kbd>ESC</kbd>
          </button>
        </div>

        <div className="boot-screen__brand">
          <AstraMark className="boot-screen__mark" size={82} />
          <h1 className="boot-screen__title" id="boot-title">
            {t.boot.title}
          </h1>
          <p className="boot-screen__tagline">{t.boot.tagline}</p>
        </div>

        <ul className="boot-screen__log">
          {t.boot.lines.map((line, index) => {
            const isDone = index < completedSteps;
            const isActive = index === completedSteps && !isReady;
            const status = isDone ? 'OK' : isActive ? '···' : '';

            return (
              <li
                className={`boot-screen__line${isDone ? ' is-done' : ''}${isActive ? ' is-active' : ''}`}
                key={line}
              >
                <span className="boot-screen__prompt" aria-hidden="true">
                  &gt;
                </span>
                <span className="boot-screen__line-text">{line}</span>
                <span className="boot-screen__leader" aria-hidden="true" />
                <span className="boot-screen__line-status" aria-hidden="true">
                  {status}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="boot-screen__progress">
          <div className="boot-screen__progress-meta">
            <span>{isReady ? t.boot.ready : t.boot.progressLabel}</span>
            <span className="boot-screen__percent">{String(progress).padStart(3, '0')}%</span>
          </div>
          <div
            className="boot-screen__track"
            role="progressbar"
            aria-label={t.boot.progressLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span className="boot-screen__bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="boot-screen__hint" id="boot-hint">
          {t.boot.escHint}
        </p>
      </div>
    </div>
  );
}
