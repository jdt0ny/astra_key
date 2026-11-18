export const CONTACT_IDS = ['whatsapp', 'phone', 'linkedin', 'email', 'github'] as const;

export type ContactId = (typeof CONTACT_IDS)[number];

export interface ContactChannel {
  id: ContactId;
  href: string;
  display: string;
  terminalValue: string;
  external: boolean;
}

export const CONTACTS: readonly ContactChannel[] = [
  {
    id: 'whatsapp',
    href: 'https://wa.me/393480612139',
    display: '+39 348 061 2139',
    terminalValue: 'wa.me/393480612139',
    external: true,
  },
  {
    id: 'phone',
    href: 'tel:+393480612139',
    display: '+39 348 061 2139',
    terminalValue: '+39 348 061 2139',
    external: false,
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/t0nyrusso/',
    display: 'in/t0nyrusso',
    terminalValue: 'linkedin.com/in/t0nyrusso',
    external: true,
  },
  {
    id: 'email',
    href: 'mailto:tonyrusso_nh@proton.me',
    display: 'tonyrusso_nh@proton.me',
    terminalValue: 'tonyrusso_nh@proton.me',
    external: false,
  },
  {
    id: 'github',
    href: 'https://github.com/jdt0ny',
    display: '@jdt0ny',
    terminalValue: 'github.com/jdt0ny',
    external: true,
  },
];

export function getContact(id: ContactId): ContactChannel {
  const contact = CONTACTS.find((item) => item.id === id);

  if (!contact) {
    throw new Error(`Unknown contact channel: ${id}`);
  }

  return contact;
}
