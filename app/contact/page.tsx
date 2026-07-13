import type { Metadata } from 'next';

import ContactIcons from '@/components/Contact/ContactIcons';

import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';

const EMAIL = 'uguudei.bayar@gmail.com';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: 'Get in touch with Uguudei Bayaraa by email or on social.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <PageWrapper>
      <section className="contact-page">
        <header className="contact-header">
          <h1 className="page-title">Get in Touch</h1>
        </header>

        <div className="contact-content">
          <div className="contact-email-block">
            <div className="contact-email-container">
              <a href={`mailto:${EMAIL}`} className="contact-email-link">
                <span className="contact-email-prefix">uguudei.bayar</span>
                <span className="contact-email-domain">@gmail.com</span>
              </a>
            </div>
            <p className="contact-hint">I usually reply within a day or two</p>
          </div>

          <div className="contact-divider">
            <span>or find me on</span>
          </div>

          <ContactIcons />
        </div>
      </section>
    </PageWrapper>
  );
}
