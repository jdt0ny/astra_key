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
import { CONTACTS, getContact } from '../data/contacts';
import { useLanguage } from '../i18n/LanguageProvider';
import type { Translation } from '../i18n/translations';
import {
  ASSISTANT,
  isAssistantEnabled,
  requestAssistant,
  sanitizeBookingUrl,
  type AssistantMessage,
} from '../lib/assistant';
import { SectionHeading } from './SectionHeading';
import './Terminal.css';

type TerminalEntry =
  | { id: number; type: 'command'; command: TerminalCommand }
  | { id: number; type: 'error'; raw: string }
  | { id: number; type: 'chat'; raw: string }
  | {
      id: number;
      type: 'assistant';
      content: string;
      bookingUrl: string | null;
    }
  | { id: number; type: 'pending' }
  | { id: number; type: 'assistant-error' };

const BOOKING_URL = sanitizeBookingUrl(ASSISTANT.bookingUrl);

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

  if (command === 'book') {
    const whatsapp = getContact('whatsapp');

    return (
      <div className="terminal__block">
        <p>{terminal.bookIntro}</p>
        {BOOKING_URL ? (
          <a
            className="terminal__booking"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {terminal.bookCta} <span aria-hidden="true">↗</span>
            <span className="sr-only"> ({copy.connect.opensNewTab})</span>
          </a>
        ) : (
          <>
            <p className="terminal__hint-line">{terminal.bookFallback}</p>
            <a
              className="terminal__booking"
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.connect.labels.whatsapp.hint} <span aria-hidden="true">↗</span>
            </a>
          </>
        )}
        <p className="terminal__hint-line">{terminal.bookNote}</p>
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

function AssistantResponse({
  text,
  bookingUrl,
  copy,
}: {
  text: string;
  bookingUrl: string | null;
  copy: Translation;
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="terminal__block terminal__assistant">
      <p className="terminal__assistant-label">
        <span aria-hidden="true">✦</span> {copy.terminal.assistantLabel}
      </p>
      <div className="terminal__assistant-text">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {bookingUrl ? (
        <a
          className="terminal__booking"
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.terminal.assistantBookingCta} <span aria-hidden="true">↗</span>
          <span className="sr-only"> ({copy.connect.opensNewTab})</span>
        </a>
      ) : null}
    </div>
  );
}

export function Terminal() {
  const { language, t } = useLanguage();
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [conversation, setConversation] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPosition, setHistoryPosition] = useState(-1);
  const [announcement, setAnnouncement] = useState('');
  const [pending, setPending] = useState(false);
  const nextEntryId = useRef(0);
  const draftInput = useRef('');
  const logRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const log = logRef.current;

    if (log) {
      log.scrollTop = log.scrollHeight;
    }
  }, [entries]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

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
    if (pendingRef.current) {
      return;
    }

    setInput('');
    setHistoryPosition(-1);
    pushHistory(command);
    runCommand(command);
  };

  const sendToAssistant = async (raw: string) => {
    pendingRef.current = true;
    setPending(true);

    nextEntryId.current += 1;
    const chatEntryId = nextEntryId.current;
    nextEntryId.current += 1;
    const replyEntryId = nextEntryId.current;

    setEntries((previous) => [
      ...previous,
      { id: chatEntryId, type: 'chat', raw },
      { id: replyEntryId, type: 'pending' },
    ]);
    setAnnouncement(t.terminal.assistantPending);

    const nextConversation = [
      ...conversation,
      { role: 'user' as const, content: raw },
    ].slice(-ASSISTANT.maxHistory);

    setConversation(nextConversation);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await requestAssistant({
        messages: nextConversation,
        language,
        signal: controller.signal,
      });

      setConversation(
        [
          ...nextConversation,
          { role: 'assistant' as const, content: result.reply },
        ].slice(-ASSISTANT.maxHistory),
      );
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === replyEntryId
            ? {
                id: entry.id,
                type: 'assistant',
                content: result.reply,
                bookingUrl: result.bookingUrl,
              }
            : entry,
        ),
      );
      setAnnouncement(result.reply);
    } catch {
      if (!controller.signal.aborted) {
        setEntries((previous) =>
          previous.map((entry) =>
            entry.id === replyEntryId
              ? { id: entry.id, type: 'assistant-error' }
              : entry,
          ),
        );
        setAnnouncement(t.terminal.assistantError);
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }

      pendingRef.current = false;
      setPending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raw = input.trim();

    if (!raw || pendingRef.current) {
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

    if (isAssistantEnabled) {
      void sendToAssistant(raw);
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
          lead={isAssistantEnabled ? t.terminal.intro : t.terminal.introLocal}
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
              aria-busy={pending}
              tabIndex={0}
            >
              <div className="terminal__welcome">
                {(isAssistantEnabled
                  ? t.terminal.welcome
                  : t.terminal.welcomeLocal
                ).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {entries.map((entry) => {
                if (entry.type === 'command') {
                  return (
                    <div className="terminal__entry" key={entry.id}>
                      <p className="terminal__echo">
                        <span className="terminal__prompt" aria-hidden="true">
                          {t.terminal.windowTitle} $
                        </span>
                        <span className="terminal__echo-command">{entry.command}</span>
                      </p>
                      <div className="terminal__response">
                        <TerminalResponse
                          command={entry.command}
                          copy={t}
                          onRun={runCommand}
                        />
                      </div>
                    </div>
                  );
                }

                if (entry.type === 'error') {
                  return (
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
                  );
                }

                if (entry.type === 'chat') {
                  return (
                    <div className="terminal__entry" key={entry.id}>
                      <p className="terminal__echo">
                        <span className="terminal__prompt" aria-hidden="true">
                          {t.terminal.windowTitle} $
                        </span>
                        <span className="terminal__echo-command">{entry.raw}</span>
                      </p>
                    </div>
                  );
                }

                if (entry.type === 'pending') {
                  return (
                    <div className="terminal__entry terminal__entry--reply" key={entry.id}>
                      <p className="terminal__response terminal__pending" role="status">
                        <span className="terminal__assistant-label">
                          {t.terminal.assistantLabel}
                        </span>{' '}
                        {t.terminal.assistantPending}
                        <span className="terminal__dots" aria-hidden="true">
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </span>
                      </p>
                    </div>
                  );
                }

                if (entry.type === 'assistant-error') {
                  return (
                    <div className="terminal__entry terminal__entry--reply" key={entry.id}>
                      <p className="terminal__response terminal__error">
                        {t.terminal.assistantError}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="terminal__entry terminal__entry--reply" key={entry.id}>
                    <div className="terminal__response">
                      <AssistantResponse
                        text={entry.content}
                        bookingUrl={entry.bookingUrl}
                        copy={t}
                      />
                    </div>
                  </div>
                );
              })}
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
                    disabled={pending}
                  >
                    <span aria-hidden="true">&gt;</span>
                    {command}
                  </button>
                ))}
              </div>
            </div>

            <form className="terminal__form" onSubmit={handleSubmit} aria-busy={pending}>
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
                placeholder={
                  isAssistantEnabled
                    ? t.terminal.placeholder
                    : t.terminal.placeholderLocal
                }
                aria-describedby="terminal-hint"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="send"
                maxLength={ASSISTANT.maxInputLength}
              />
              <button
                className="terminal__run"
                type="submit"
                aria-label={t.terminal.run}
                disabled={pending}
              >
                <span className="terminal__run-label">{t.terminal.run}</span>
                <CornerDownLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>

            <p className="terminal__hint" id="terminal-hint">
              {isAssistantEnabled ? t.terminal.hint : t.terminal.hintLocal}
            </p>

            {isAssistantEnabled ? (
              <p className="terminal__privacy">{t.terminal.assistantPrivacy}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
