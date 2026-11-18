import { CornerDownLeft } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import {
  TERMINAL_COMMANDS,
  isTerminalCommand,
  type TerminalCommand,
} from '../data/commands';
import { CONTACTS } from '../data/contacts';
import { useLanguage } from '../i18n/LanguageProvider';
import type { Translation } from '../i18n/translations';
import { SectionHeading } from './SectionHeading';
import './Terminal.css';

type TerminalEntry =
  | { id: number; type: 'command'; command: TerminalCommand }
  | { id: number; type: 'error'; raw: string };

interface TerminalResponseProps {
  command: TerminalCommand;
  copy: Translation;
  onRun: (command: TerminalCommand) => void;
}

function TerminalResponse({ command, copy, onRun }: TerminalResponseProps) {
  const terminal = copy.terminal;

  if (command === 'help') {
    return (
      <div className="terminal__block">
        <p>{terminal.helpIntro}</p>
        <ul className="terminal__command-list">
          {TERMINAL_COMMANDS.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="terminal__command-link"
                onClick={() => onRun(item)}
              >
                {item}
              </button>
              <span className="terminal__command-desc">
                {terminal.commandDescriptions[item]}
              </span>
            </li>
          ))}
        </ul>
        <p className="terminal__hint-line">{terminal.helpHint}</p>
      </div>
    );
  }

  if (command === 'about') {
    return (
      <div className="terminal__block">
        {terminal.aboutResponse.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  if (command === 'connect') {
    return (
      <div className="terminal__block">
        <p>{terminal.connectIntro}</p>
        <dl className="terminal__channels">
          {CONTACTS.map((contact) => (
            <div className="terminal__channel" key={contact.id}>
              <dt>{copy.connect.labels[contact.id].label}</dt>
              <dd>{contact.terminalValue}</dd>
            </div>
          ))}
        </dl>
        <p>{terminal.connectOutro}</p>
        <a className="terminal__jump" href="#connect">
          [{terminal.goToConnect}] <span aria-hidden="true">↓</span>
        </a>
      </div>
    );
  }

  return (
    <div className="terminal__block terminal__egg">
      <p className="terminal__egg-kicker">{terminal.astraLines[0]}</p>
      <div className="terminal__egg-lines">
        {terminal.astraLines.slice(1).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="terminal__egg-signature">{terminal.astraSignature}</p>
    </div>
  );
}

export function Terminal() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPosition, setHistoryPosition] = useState(-1);
  const [announcement, setAnnouncement] = useState('');
  const nextEntryId = useRef(0);
  const draftInput = useRef('');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const log = logRef.current;

    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [entries]);

  const runCommand = (command: TerminalCommand) => {
    nextEntryId.current += 1;
    setEntries((previous) => [
      ...previous,
      { id: nextEntryId.current, type: 'command', command },
    ]);
    setAnnouncement(t.terminal.announcements[command]);
  };

  const pushHistory = (value: string) => {
    setHistory((previous) => [...previous, value].slice(-30));
  };

  const handleShortcut = (command: TerminalCommand) => {
    setInput('');
    setHistoryPosition(-1);
    pushHistory(command);
    runCommand(command);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raw = input.trim();

    if (!raw) {
      return;
    }

    setInput('');
    setHistoryPosition(-1);
    pushHistory(raw);

    const normalized = raw.toLowerCase();

    if (isTerminalCommand(normalized)) {
      runCommand(normalized);
      return;
    }

    nextEntryId.current += 1;
    setEntries((previous) => [
      ...previous,
      { id: nextEntryId.current, type: 'error', raw },
    ]);
    setAnnouncement(t.terminal.announcementError);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      if (history.length === 0) {
        return;
      }

      event.preventDefault();

      if (historyPosition === -1) {
        draftInput.current = input;
      }

      const nextPosition =
        historyPosition === -1 ? history.length - 1 : Math.max(0, historyPosition - 1);

      setHistoryPosition(nextPosition);
      setInput(history[nextPosition] ?? '');
      return;
    }

    if (event.key === 'ArrowDown') {
      if (historyPosition === -1) {
        return;
      }

      event.preventDefault();

      const nextPosition = historyPosition + 1;

      if (nextPosition >= history.length) {
        setHistoryPosition(-1);
        setInput(draftInput.current);
        return;
      }

      setHistoryPosition(nextPosition);
      setInput(history[nextPosition] ?? '');
    }
  };

  return (
    <section className="section terminal-section" id="terminal" aria-labelledby="terminal-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow={t.terminal.eyebrow}
          title={t.terminal.title}
          titleId="terminal-title"
          lead={t.terminal.intro}
        />

        <div className="terminal">
          <div className="terminal__chrome">
            <div className="terminal__lights" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="terminal__window-title">{t.terminal.windowTitle}</p>
            <p className="terminal__window-status">
              <span className="status-dot" aria-hidden="true" />
              {t.terminal.windowStatus}
            </p>
          </div>

          <div className="terminal__workspace">
            <div
              className="terminal__log"
              ref={logRef}
              role="region"
              aria-label={t.terminal.outputLabel}
              tabIndex={0}
            >
              <div className="terminal__welcome">
                {t.terminal.welcome.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {entries.map((entry) =>
                entry.type === 'command' ? (
                  <div className="terminal__entry" key={entry.id}>
                    <p className="terminal__echo">
                      <span className="terminal__prompt" aria-hidden="true">
                        {t.terminal.windowTitle} $
                      </span>
                      <span className="terminal__echo-command">{entry.command}</span>
                    </p>
                    <div className="terminal__response">
                      <TerminalResponse command={entry.command} copy={t} onRun={runCommand} />
                    </div>
                  </div>
                ) : (
                  <div className="terminal__entry" key={entry.id}>
                    <p className="terminal__echo">
                      <span className="terminal__prompt" aria-hidden="true">
                        {t.terminal.windowTitle} $
                      </span>
                      <span className="terminal__echo-command">{entry.raw}</span>
                    </p>
                    <p className="terminal__response terminal__error">
                      {t.terminal.notFound(entry.raw)}
                    </p>
                  </div>
                ),
              )}
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </p>

            <div className="terminal__shortcuts">
              <p className="terminal__shortcuts-label" id="terminal-shortcuts-label">
                {t.terminal.quickLabel}
              </p>
              <div className="terminal__shortcut-list" aria-labelledby="terminal-shortcuts-label">
                {TERMINAL_COMMANDS.map((command) => (
                  <button
                    key={command}
                    type="button"
                    className="terminal__shortcut"
                    onClick={() => handleShortcut(command)}
                  >
                    <span aria-hidden="true">&gt;</span>
                    {command}
                  </button>
                ))}
              </div>
            </div>

            <form className="terminal__form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="terminal-input">
                {t.terminal.inputLabel}
              </label>
              <span className="terminal__input-prompt" aria-hidden="true">
                &gt;
              </span>
              <input
                id="terminal-input"
                className="terminal__input"
                type="text"
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);

                  if (historyPosition !== -1) {
                    setHistoryPosition(-1);
                  }
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t.terminal.placeholder}
                aria-describedby="terminal-hint"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="send"
                maxLength={64}
              />
              <button className="terminal__run" type="submit" aria-label={t.terminal.run}>
                <span className="terminal__run-label">{t.terminal.run}</span>
                <CornerDownLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>

            <p className="terminal__hint" id="terminal-hint">
              {t.terminal.hint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
