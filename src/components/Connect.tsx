import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { CONTACTS, getContact, type ContactId } from '../data/contacts';
import { useLanguage } from '../i18n/LanguageProvider';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './BrandIcons';
import { SectionHeading } from './SectionHeading';
import './Connect.css';

function ChannelIcon({ id }: { id: ContactId }) {
  switch (id) {
    case 'whatsapp':
      return <WhatsAppIcon />;
    case 'phone':
      return <Phone strokeWidth={1.8} aria-hidden="true" />;
    case 'linkedin':
      return <LinkedInIcon />;
    case 'email':
      return <Mail strokeWidth={1.8} aria-hidden="true" />;
    case 'github':
      return <GitHubIcon />;
  }
}

export function Connect() {
  const { t } = useLanguage();
  const whatsapp = getContact('whatsapp');
  const secondaryContacts = CONTACTS.filter((contact) => contact.id !== whatsapp.id);

  return (
    <section className="section connect" id="connect" aria-labelledby="connect-title">
      <div className="connect__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow={t.connect.eyebrow}
          title={t.connect.title}
          titleId="connect-title"
        />

        <div className="connect__grid">
          <div className="connect__intro">
            <p className="connect__supporting">{t.connect.supporting}</p>
            <p className="connect__note">
              <span aria-hidden="true">&gt;</span>
              {t.connect.note}
            </p>
            <div className="connect__status">
              <span className="status-dot" aria-hidden="true" />
              {t.connect.status}
            </div>
          </div>

          <div className="connect__channels">
            <p className="connect__channel-label">
              <span aria-hidden="true">[</span> {t.connect.channelLabel}{' '}
              <span aria-hidden="true">]</span>
            </p>

            <a
              className="channel channel--primary"
              href={whatsapp.href}
              target={whatsapp.external ? '_blank' : undefined}
              rel={whatsapp.external ? 'noopener noreferrer' : undefined}
            >
              <span className="channel__index" aria-hidden="true">
                01
              </span>
              <span className="channel__icon" aria-hidden="true">
                <ChannelIcon id={whatsapp.id} />
              </span>
              <span className="channel__body">
                <span className="channel__topline">
                  <span className="channel__label">{t.connect.labels.whatsapp.label}</span>
                  <span className="channel__tag">{t.connect.primaryTag}</span>
                </span>
                <span className="channel__hint">{t.connect.labels.whatsapp.hint}</span>
                <span className="channel__value">{whatsapp.display}</span>
              </span>
              <span className="channel__action" aria-hidden="true">
                <ArrowUpRight size={20} strokeWidth={1.7} />
              </span>
              {whatsapp.external ? (
                <span className="sr-only">({t.connect.opensNewTab})</span>
              ) : null}
            </a>

            <div className="connect__secondary">
              {secondaryContacts.map((contact, index) => (
                <a
                  className="channel channel--secondary"
                  href={contact.href}
                  key={contact.id}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="channel__index" aria-hidden="true">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                  <span className="channel__icon" aria-hidden="true">
                    <ChannelIcon id={contact.id} />
                  </span>
                  <span className="channel__body">
                    <span className="channel__label">{t.connect.labels[contact.id].label}</span>
                    <span className="channel__value">{contact.display}</span>
                    <span className="channel__hint">{t.connect.labels[contact.id].hint}</span>
                  </span>
                  <span className="channel__action" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={1.7} />
                  </span>
                  {contact.external ? (
                    <span className="sr-only">({t.connect.opensNewTab})</span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
