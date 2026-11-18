import type { TerminalCommand } from '../data/commands';
import type { ContactId } from '../data/contacts';

export type Language = 'it' | 'en';

export interface MetaTranslation {
  title: string;
  description: string;
  ogLocale: string;
}

export interface NavTranslation {
  tagline: string;
  navLabel: string;
  about: string;
  connect: string;
  terminal: string;
  status: string;
  languageLabel: string;
  italian: string;
  english: string;
}

export interface BootTranslation {
  dialogLabel: string;
  kicker: string;
  title: string;
  tagline: string;
  lines: readonly string[];
  skip: string;
  escHint: string;
  progressLabel: string;
  ready: string;
}

interface PlateRow {
  id: string;
  label: string;
  value: string;
}

export interface HeroTranslation {
  status: string;
  eyebrow: string;
  role: string;
  location: string;
  statementLead: string;
  statementAccent: string;
  supporting: string;
  ctaPrimary: string;
  ctaSecondary: string;
  plateLabel: string;
  plateSerial: string;
  plateSignal: string;
  plateRows: readonly PlateRow[];
}

interface AboutField {
  id: string;
  label: string;
  value: string;
}

export interface AboutTranslation {
  eyebrow: string;
  title: string;
  fileLabel: string;
  fileCode: string;
  fields: readonly AboutField[];
  paragraphs: readonly string[];
  endNote: string;
  next: string;
}

interface ContactLabel {
  label: string;
  hint: string;
}

export interface ConnectTranslation {
  eyebrow: string;
  title: string;
  supporting: string;
  note: string;
  channelLabel: string;
  status: string;
  primaryTag: string;
  labels: Record<ContactId, ContactLabel>;
  opensNewTab: string;
}

export interface TerminalTranslation {
  eyebrow: string;
  title: string;
  intro: string;
  windowTitle: string;
  windowStatus: string;
  quickLabel: string;
  inputLabel: string;
  placeholder: string;
  run: string;
  hint: string;
  outputLabel: string;
  welcome: readonly string[];
  commandDescriptions: Record<TerminalCommand, string>;
  helpIntro: string;
  helpHint: string;
  aboutResponse: readonly string[];
  connectIntro: string;
  connectOutro: string;
  goToConnect: string;
  astraLines: readonly string[];
  astraSignature: string;
  notFound: (command: string) => string;
  announcements: Record<TerminalCommand, string>;
  announcementError: string;
}

export interface FooterTranslation {
  tagline: string;
  status: string;
  privacy: string;
  backToTop: string;
  replayBoot: string;
  rights: string;
  endTransmission: string;
}

export interface CommonTranslation {
  skipToContent: string;
}

export interface Translation {
  meta: MetaTranslation;
  nav: NavTranslation;
  boot: BootTranslation;
  hero: HeroTranslation;
  about: AboutTranslation;
  connect: ConnectTranslation;
  terminal: TerminalTranslation;
  footer: FooterTranslation;
  common: CommonTranslation;
}

export const translations: Record<Language, Translation> = {
  it: {
    meta: {
      title: 'ASTRA KEY — Antonino Russo · Sviluppatore AI & Software',
      description:
        'Antonino Russo, sviluppatore indipendente e autodidatta in Sicilia. Costruisco soluzioni software con intelligenza artificiale e automazione. Contatti diretti via WhatsApp, telefono, LinkedIn, email e GitHub.',
      ogLocale: 'it_IT',
    },
    nav: {
      tagline: 'TERMINALE DI ACCESSO PERSONALE',
      navLabel: 'Navigazione principale',
      about: 'PROFILO',
      connect: 'CONTATTI',
      terminal: 'TERMINALE',
      status: 'SISTEMA ONLINE',
      languageLabel: 'Seleziona lingua',
      italian: 'Italiano',
      english: 'English',
    },
    boot: {
      dialogLabel: 'Sequenza di avvio di ASTRA KEY',
      kicker: 'ASTRA KEY BIOS v1.0',
      title: 'ASTRA KEY',
      tagline: 'TERMINALE DI ACCESSO PERSONALE',
      lines: [
        'ASTRA KEY BIOS',
        'TERMINALE DI ACCESSO PERSONALE',
        'INIZIALIZZAZIONE PROFILO',
        'CONNESSIONE STABILITA',
      ],
      skip: 'SALTA',
      escHint: 'Premi ESC per saltare l’avvio',
      progressLabel: 'Avvio del sistema',
      ready: 'ACCESSO CONSENTITO',
    },
    hero: {
      status: 'ACCESSO CONSENTITO',
      eyebrow: 'TERMINALE DI IDENTITÀ PERSONALE',
      role: 'SVILUPPATORE AI & SOFTWARE',
      location: 'Sicilia, Italia',
      statementLead: 'La tecnologia è uno strumento.',
      statementAccent: 'Le idee sono il punto di partenza.',
      supporting: 'Autodidatta. Costruisco soluzioni software con AI e automazione.',
      ctaPrimary: 'ENTRIAMO IN CONTATTO',
      ctaSecondary: 'APRI IL TERMINALE',
      plateLabel: 'MODULO IDENTITÀ',
      plateSerial: 'AK-001',
      plateSignal: 'SEGNALE STABILE',
      plateRows: [
        { id: 'operator', label: 'OPERATORE', value: 'A. RUSSO' },
        { id: 'role', label: 'RUOLO', value: 'AI & SOFTWARE' },
        { id: 'base', label: 'BASE', value: 'SICILIA // IT' },
        { id: 'status', label: 'STATO', value: 'APERTO A COLLABORAZIONI' },
      ],
    },
    about: {
      eyebrow: '// FILE OPERATORE',
      title: 'CHI SONO',
      fileLabel: 'Scheda del profilo',
      fileCode: 'AR-001',
      fields: [
        { id: 'role', label: 'RUOLO', value: 'Sviluppatore indipendente' },
        { id: 'method', label: 'METODO', value: 'Autodidatta' },
        { id: 'focus', label: 'FOCUS', value: 'AI · Software · Automazione' },
        { id: 'base', label: 'BASE', value: 'Sicilia, Italia' },
        { id: 'status', label: 'STATO', value: 'Aperto a collaborazioni' },
      ],
      paragraphs: [
        'Sono Antonino Russo, sviluppatore indipendente e autodidatta.',
        'Il mio percorso nella tecnologia non nasce da una strada convenzionale, ma dalla curiosità, dalla sperimentazione e dalla voglia di capire come funzionano le cose.',
        'Mi occupo di sviluppo software, intelligenza artificiale e automazione. Mi piace partire da un’esigenza concreta, analizzare il problema e progettare soluzioni che trasformino un’idea in qualcosa di realmente utilizzabile.',
        'Studio, sperimento e costruisco: dal codice alle API, dalle applicazioni web agli strumenti basati sull’intelligenza artificiale. Considero l’AI un alleato nello sviluppo, non un sostituto del pensiero critico e delle competenze tecniche.',
        'Non mi interessa utilizzare la tecnologia soltanto perché è nuova o di tendenza. Mi interessa capire cosa possiamo realizzare con essa e, soprattutto, quale problema possiamo risolvere.',
        'Sono aperto a collaborazioni, confronti tecnici e nuove opportunità professionali.',
      ],
      endNote: 'FINE FILE',
      next: 'PROSEGUI VERSO I CONTATTI',
    },
    connect: {
      eyebrow: '// CANALI DIRETTI',
      title: 'ENTRIAMO IN CONTATTO',
      supporting:
        'Hai un’idea, una proposta o vuoi semplicemente scambiare due parole? Scegli il canale che preferisci.',
      note: 'Nessun form. Nessun intermediario. Scrivi direttamente.',
      channelLabel: 'SELEZIONA UN CANALE',
      status: 'CANALI APERTI',
      primaryTag: 'CANALE PRINCIPALE',
      labels: {
        whatsapp: { label: 'WHATSAPP', hint: 'Apri la chat diretta' },
        phone: { label: 'TELEFONO', hint: 'Chiama direttamente' },
        linkedin: { label: 'LINKEDIN', hint: 'Profilo professionale' },
        email: { label: 'EMAIL', hint: 'Scrivi una email' },
        github: { label: 'GITHUB', hint: 'Profilo sviluppatore' },
      },
      opensNewTab: 'Si apre in una nuova scheda',
    },
    terminal: {
      eyebrow: '// INTERFACCIA DI COMANDO',
      title: 'TERMINALE',
      intro:
        'Una shell locale per conoscermi meglio. Digita un comando o seleziona una scorciatoia. Nessun dato lascia il browser.',
      windowTitle: 'visitor@astra-key:~',
      windowStatus: 'SESSIONE ATTIVA',
      quickLabel: 'COMANDI RAPIDI',
      inputLabel: 'Comando del terminale',
      placeholder: 'digita un comando…',
      run: 'ESEGUI',
      hint: 'INVIO per eseguire · ↑ ↓ cronologia',
      outputLabel: 'Cronologia del terminale',
      welcome: [
        'ASTRA KEY SHELL v1.0 — sessione locale avviata.',
        'Digita “help” o seleziona un comando rapido.',
      ],
      commandDescriptions: {
        help: 'mostra i comandi disponibili',
        about: 'una breve introduzione personale',
        connect: 'i canali di contatto disponibili',
        astra: 'un segnale dall’orbita',
      },
      helpIntro: 'Comandi disponibili:',
      helpHint: 'Seleziona un comando qui sotto o digitane uno nel prompt.',
      aboutResponse: [
        'Antonino Russo — sviluppatore indipendente e autodidatta, con base in Sicilia.',
        'Lavora su sviluppo software, intelligenza artificiale e automazione. Parte da esigenze concrete per trasformare le idee in strumenti realmente utilizzabili.',
        'Aperto a collaborazioni, confronti tecnici e nuove opportunità professionali.',
      ],
      connectIntro: 'Canali diretti, senza form:',
      connectOutro: 'I dettagli completi sono nella sezione Contatti.',
      goToConnect: 'VAI AI CONTATTI',
      astraLines: [
        '✦ SEGNALE ASTRALE ACQUISITO',
        'CURIOSITÀ IN ORBITA.',
        'IDEE IN COSTRUZIONE.',
        'RESTA CURIOSO.',
      ],
      astraSignature: 'Ogni chiave apre una porta. Questa apre una conversazione. — ASTRA KEY',
      notFound: (command) =>
        `Comando non trovato: “${command}”. Digita “help” per vedere i comandi disponibili.`,
      announcements: {
        help: 'Comandi disponibili visualizzati.',
        about: 'Introduzione personale visualizzata.',
        connect: 'Canali di contatto visualizzati.',
        astra: 'Segnale astrale acquisito.',
      },
      announcementError: 'Comando non riconosciuto.',
    },
    footer: {
      tagline: 'Costruito con curiosità.',
      status: 'SISTEMA OPERATIVO',
      privacy: 'NESSUN COOKIE · NESSUN TRACCIAMENTO',
      backToTop: 'TORNA SU',
      replayBoot: 'RIAVVIA BOOT',
      rights: 'Tutti i diritti riservati.',
      endTransmission: 'FINE TRASMISSIONE',
    },
    common: {
      skipToContent: 'Vai al contenuto',
    },
  },
  en: {
    meta: {
      title: 'ASTRA KEY — Antonino Russo · AI & Software Developer',
      description:
        'Antonino Russo, independent and self-taught developer based in Sicily, Italy. Building software solutions with artificial intelligence and automation. Reach me directly via WhatsApp, phone, LinkedIn, email or GitHub.',
      ogLocale: 'en_US',
    },
    nav: {
      tagline: 'PERSONAL ACCESS TERMINAL',
      navLabel: 'Main navigation',
      about: 'PROFILE',
      connect: 'CONTACT',
      terminal: 'TERMINAL',
      status: 'SYSTEM ONLINE',
      languageLabel: 'Select language',
      italian: 'Italian',
      english: 'English',
    },
    boot: {
      dialogLabel: 'ASTRA KEY boot sequence',
      kicker: 'ASTRA KEY BIOS v1.0',
      title: 'ASTRA KEY',
      tagline: 'PERSONAL ACCESS TERMINAL',
      lines: [
        'ASTRA KEY BIOS',
        'PERSONAL ACCESS TERMINAL',
        'INITIALIZING PROFILE',
        'CONNECTION ESTABLISHED',
      ],
      skip: 'SKIP',
      escHint: 'Press ESC to skip the boot sequence',
      progressLabel: 'System startup',
      ready: 'ACCESS GRANTED',
    },
    hero: {
      status: 'ACCESS GRANTED',
      eyebrow: 'PERSONAL IDENTITY TERMINAL',
      role: 'AI & SOFTWARE DEVELOPER',
      location: 'Sicily, Italy',
      statementLead: 'Technology is a tool.',
      statementAccent: 'Ideas are where everything begins.',
      supporting: 'Self-taught. Building software solutions with AI and automation.',
      ctaPrimary: 'LET’S CONNECT',
      ctaSecondary: 'OPEN TERMINAL',
      plateLabel: 'IDENTITY MODULE',
      plateSerial: 'AK-001',
      plateSignal: 'SIGNAL STABLE',
      plateRows: [
        { id: 'operator', label: 'OPERATOR', value: 'A. RUSSO' },
        { id: 'role', label: 'ROLE', value: 'AI & SOFTWARE' },
        { id: 'base', label: 'BASE', value: 'SICILY // IT' },
        { id: 'status', label: 'STATUS', value: 'OPEN TO COLLABORATION' },
      ],
    },
    about: {
      eyebrow: '// OPERATOR FILE',
      title: 'ABOUT ME',
      fileLabel: 'Profile file',
      fileCode: 'AR-001',
      fields: [
        { id: 'role', label: 'ROLE', value: 'Independent developer' },
        { id: 'method', label: 'METHOD', value: 'Self-taught' },
        { id: 'focus', label: 'FOCUS', value: 'AI · Software · Automation' },
        { id: 'base', label: 'BASE', value: 'Sicily, Italy' },
        { id: 'status', label: 'STATUS', value: 'Open to collaborations' },
      ],
      paragraphs: [
        'I’m Antonino Russo, an independent, self-taught developer.',
        'My path into technology didn’t start on a conventional route. It began with curiosity, experimentation and the desire to understand how things work.',
        'I work in software development, artificial intelligence and automation. I like to start from a concrete need, analyze the problem and design solutions that turn an idea into something genuinely usable.',
        'I study, experiment and build: from code to APIs, from web applications to tools powered by artificial intelligence. I see AI as an ally in development, not a replacement for critical thinking and technical skills.',
        'I’m not interested in using technology simply because it’s new or trendy. I’m interested in understanding what we can build with it and, above all, what problem we can solve.',
        'I’m open to collaborations, technical conversations and new professional opportunities.',
      ],
      endNote: 'END OF FILE',
      next: 'CONTINUE TO CONNECT',
    },
    connect: {
      eyebrow: '// DIRECT CHANNELS',
      title: 'LET’S CONNECT',
      supporting:
        'Have an idea, a proposal, or simply want to exchange a few words? Choose your preferred channel.',
      note: 'No forms. No middlemen. Write directly.',
      channelLabel: 'SELECT A CHANNEL',
      status: 'CHANNELS OPEN',
      primaryTag: 'PRIMARY CHANNEL',
      labels: {
        whatsapp: { label: 'WHATSAPP', hint: 'Open the direct chat' },
        phone: { label: 'PHONE', hint: 'Call directly' },
        linkedin: { label: 'LINKEDIN', hint: 'Professional profile' },
        email: { label: 'EMAIL', hint: 'Write an email' },
        github: { label: 'GITHUB', hint: 'Developer profile' },
      },
      opensNewTab: 'Opens in a new tab',
    },
    terminal: {
      eyebrow: '// COMMAND INTERFACE',
      title: 'TERMINAL',
      intro:
        'A local shell to get to know me better. Type a command or select a shortcut. No data leaves your browser.',
      windowTitle: 'visitor@astra-key:~',
      windowStatus: 'SESSION ACTIVE',
      quickLabel: 'QUICK COMMANDS',
      inputLabel: 'Terminal command',
      placeholder: 'type a command…',
      run: 'RUN',
      hint: 'ENTER to run · ↑ ↓ history',
      outputLabel: 'Terminal history',
      welcome: [
        'ASTRA KEY SHELL v1.0 — local session started.',
        'Type “help” or select a quick command.',
      ],
      commandDescriptions: {
        help: 'display available commands',
        about: 'a short personal introduction',
        connect: 'available contact channels',
        astra: 'a signal from orbit',
      },
      helpIntro: 'Available commands:',
      helpHint: 'Select a command below or type one at the prompt.',
      aboutResponse: [
        'Antonino Russo — an independent, self-taught developer based in Sicily.',
        'He works across software development, artificial intelligence and automation, starting from real needs to turn ideas into genuinely usable tools.',
        'Open to collaborations, technical conversations and new professional opportunities.',
      ],
      connectIntro: 'Direct channels, no forms:',
      connectOutro: 'Full details are in the Connect section.',
      goToConnect: 'GO TO CONNECT',
      astraLines: [
        '✦ ASTRAL SIGNAL ACQUIRED',
        'CURIOSITY IN ORBIT.',
        'IDEAS UNDER CONSTRUCTION.',
        'STAY CURIOUS.',
      ],
      astraSignature: 'Every key opens a door. This one opens a conversation. — ASTRA KEY',
      notFound: (command) =>
        `Command not found: “${command}”. Type “help” to see available commands.`,
      announcements: {
        help: 'Available commands displayed.',
        about: 'Personal introduction displayed.',
        connect: 'Contact channels displayed.',
        astra: 'Astral signal acquired.',
      },
      announcementError: 'Command not recognized.',
    },
    footer: {
      tagline: 'Built with curiosity.',
      status: 'SYSTEM OPERATIONAL',
      privacy: 'NO COOKIES · NO TRACKING',
      backToTop: 'BACK TO TOP',
      replayBoot: 'REPLAY BOOT',
      rights: 'All rights reserved.',
      endTransmission: 'END OF TRANSMISSION',
    },
    common: {
      skipToContent: 'Skip to content',
    },
  },
};
