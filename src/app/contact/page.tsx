import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="page-shell">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-heading">How can we help?</h1>
          <p>
            Ask a question about The Village Kit, a purchase, or digital access. We will use the
            details you send only as described in our{' '}
            <Link href="/policies/privacy/">privacy policy</Link>.
          </p>
        </div>
      </section>

      <div className="page-shell prose-page">
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading">Send a message</h2>
          <form
            className="form-shell"
            name="contact"
            method="POST"
            action="/contact/thank-you/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />

            <p hidden>
              <label htmlFor="contact-company">
                Do not fill out this field
                <input
                  id="contact-company"
                  name="bot-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </p>

            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={7} required />
            </div>

            <button className="button" type="submit">
              Send message
            </button>

            <p className="form-status">
              For order or download help, include the email used at checkout. Never send a full card
              number or other sensitive payment details.
            </p>
          </form>
        </section>

        <section aria-labelledby="email-heading">
          <h2 id="email-heading">Prefer email?</h2>
          <p>
            Write to <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>.
          </p>
        </section>
      </div>
    </>
  );
}
