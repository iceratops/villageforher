import CheckoutPanel from '@/components/CheckoutPanel';
import TrackedBuyLink from '@/components/TrackedBuyLink';
import { VILLAGE_KIT_PRICE, VILLAGE_KIT_SKU, absoluteUrl, socialMetadata } from '@/lib/site';
import { ArrowRight, Download, LockKeyhole } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const description =
  'A 16-page digital toolkit that makes practical care easier to ask for, organize, give, and receive. Buy for yourself or give it to someone you love.';

export const metadata: Metadata = {
  title: `The Village Kit — Practical support planning for $${VILLAGE_KIT_PRICE}`,
  description,
  alternates: { canonical: '/village-kit/' },
  ...socialMetadata({
    title: 'The Village Kit | Village For Her',
    description,
    path: '/village-kit/',
    image: '/images/social-card.png',
  }),
};

const includedItems = [
  ['What I Actually Need', 'A clear starting point for naming useful support.'],
  ['Right-now priorities', 'Choose what matters, what can wait, and who can coordinate.'],
  ['Meals and groceries', 'Preferences, drop-off details, and one clear meal offer.'],
  ['Home and errands', 'Turn vague help into complete household and logistics tasks.'],
  ['Visitors and boundaries', 'Share what works without repeatedly explaining or defending it.'],
  ['Supportive check-ins', 'Name the kind, timing, and rhythm of contact that feels helpful.'],
  ['Support-person guide', 'Concrete guidance for partners, family, and friends.'],
  ['Weekly village schedule', 'Put names, tasks, timing, and backup plans in one place.'],
  [
    'Ready-to-send messages',
    'Eight editable scripts for asking, accepting, declining, and updating.',
  ],
  ['Practical wishlist', 'Useful no-cost, under-$20, group, and long-distance options.'],
  ['Important contacts', 'A private place for roles, contact details, and timing.'],
  ['One small next step', 'Move from a big support problem to one honest request.'],
];

const faqs = [
  {
    question: 'Is The Village Kit a physical product?',
    answer:
      'No. It is a 16-page digital PDF designed to print at home or use as a reference on your device. Nothing is shipped.',
  },
  {
    question: 'When do I receive it?',
    answer:
      'Immediately after Stripe confirms payment. You will return to a private Village For Her access page where you can download the PDF.',
  },
  {
    question: 'How does gifting work?',
    answer:
      'Choose “I am giving this” before checkout. After payment, you receive a private gift-access link to copy, share, or email to the recipient. Scheduled delivery and recipient accounts are not part of this v1.',
  },
  {
    question: 'Who is it for?',
    answer:
      'It is for a woman preparing for or moving through a season when practical support would help, and for the partners, friends, relatives, coworkers, or long-distance supporters who want to show up usefully.',
  },
  {
    question: 'Do I need to be a new mother to use it?',
    answer:
      'No. The examples are especially relevant around pregnancy and postpartum, but the planning tools can support other demanding seasons too. Use only the pages that fit.',
  },
  {
    question: 'Is this therapy or medical guidance?',
    answer:
      'No. The Village Kit is an organizational and communication resource. It does not provide therapy, diagnosis, medical care, crisis support, or clinical treatment.',
  },
  {
    question: 'Can I share the blank kit?',
    answer:
      'A purchase covers the buyer and their household, or one gift recipient. Completed planning pages can be shared with the people helping. The blank PDF may not be resold, uploaded, or distributed.',
  },
  {
    question: 'What if I have a download problem?',
    answer:
      'Email hello@villageforher.com with the purchaser email. We can help recover access or replace a file that did not deliver correctly.',
  },
];

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Village Kit',
  description:
    'A 16-page digital support-planning toolkit that makes care easier to ask for, organize, give, and receive.',
  image: [
    absoluteUrl('/images/village-kit-cover.webp'),
    absoluteUrl('/images/village-kit-weekly.webp'),
    absoluteUrl('/images/village-kit-messages.webp'),
  ],
  sku: VILLAGE_KIT_SKU,
  brand: {
    '@type': 'Brand',
    name: 'Village For Her',
  },
  offers: {
    '@type': 'Offer',
    url: absoluteUrl('/village-kit/'),
    priceCurrency: 'USD',
    price: VILLAGE_KIT_PRICE.toFixed(2),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
};

export default function VillageKitPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>

      <section className="product-hero">
        <div className="container product-hero-grid">
          <div className="product-visual" aria-label="The Village Kit digital workbook">
            <Image
              src="/images/village-kit-cover.webp"
              alt="The Village Kit cover"
              width={720}
              height={932}
              sizes="(max-width: 900px) 58vw, 31vw"
              priority
            />
            <div className="product-badge">
              <strong>${VILLAGE_KIT_PRICE}</strong>
              <span>one-time digital purchase</span>
            </div>
          </div>

          <div className="product-hero-copy">
            <p className="eyebrow">The Village Kit</p>
            <h1>Make care easier to ask for, organize, give, and receive.</h1>
            <p className="lede">
              A practical, printable toolkit for a woman and the people around her to turn good
              intentions into useful support — without leaving her to coordinate everything.
            </p>
            <p className="price-line">
              <span className="price">${VILLAGE_KIT_PRICE}</span>
              <span className="price-note">launch price · USD · one-time</span>
            </p>
            <ul className="check-list">
              <li>16 polished planning and communication pages</li>
              <li>Use for yourself or give to one recipient</li>
              <li>Private access immediately after verified payment</li>
            </ul>
            <CheckoutPanel />
            <p className="microcopy checkout-policies">
              By purchasing, you agree to our <Link href="/policies/terms/">terms</Link>,{' '}
              <Link href="/policies/digital-delivery/">digital delivery policy</Link>, and{' '}
              <Link href="/policies/refunds/">refund policy</Link>.
            </p>
            <div className="trust-inline" aria-label="Purchase trust details">
              <span>
                <LockKeyhole aria-hidden="true" size={14} /> Secure Stripe Checkout
              </span>
              <span>
                <Download aria-hidden="true" size={14} /> Digital PDF
              </span>
              <span>
                Support: <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="after-heading">
        <div className="container recognition-grid">
          <div>
            <p className="eyebrow">What becomes easier</p>
            <h2 id="after-heading">A clearer plan. Fewer repeated decisions.</h2>
          </div>
          <div>
            <p className="lede">
              After using the kit, the people who care can see what would help, what would not, who
              owns each task, and how to respect the household's boundaries.
            </p>
            <ul className="recognition-list">
              <li>Ask for one specific thing instead of explaining the whole situation</li>
              <li>Give a supporter a page they can coordinate from</li>
              <li>Protect rest, privacy, visits, and communication preferences</li>
              <li>Let long-distance friends and family find useful ways to participate</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="inside-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Inside the 16-page kit</p>
            <h2 id="inside-heading">Enough structure to help. No new system to manage.</h2>
            <p>Print the whole workbook or choose only the pages that lower the load today.</p>
          </div>
          <div className="included-grid">
            {includedItems.map(([title, description]) => (
              <div className="included-item" key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
          <div className="button-row section-actions">
            <TrackedBuyLink href="#buy" location="village_kit_contents" className="button">
              Get immediate access — ${VILLAGE_KIT_PRICE}
            </TrackedBuyLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="preview-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Real pages from the download</p>
            <h2 id="preview-heading">Made to be used, not admired and forgotten.</h2>
            <p>
              Spacious worksheets, direct language, and examples that reduce the blank-page feeling.
            </p>
          </div>
          <div className="preview-grid">
            <figure className="preview-item">
              <Image
                src="/images/village-kit-needs.webp"
                alt="What I Actually Need worksheet preview"
                width={720}
                height={932}
                sizes="(max-width: 680px) 88vw, 29vw"
              />
              <figcaption>Name useful care — and what would create more work.</figcaption>
            </figure>
            <figure className="preview-item">
              <Image
                src="/images/village-kit-weekly.webp"
                alt="Weekly village schedule preview"
                width={720}
                height={932}
                sizes="(max-width: 680px) 88vw, 29vw"
              />
              <figcaption>Give complete tasks a name, owner, time, and backup plan.</figcaption>
            </figure>
            <figure className="preview-item">
              <Image
                src="/images/village-kit-messages.webp"
                alt="Ready-to-send support messages preview"
                width={720}
                height={932}
                sizes="(max-width: 680px) 88vw, 29vw"
              />
              <figcaption>Copy, edit, and send the words that fit the day.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section-sage" aria-labelledby="how-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2 id="how-heading">From checkout to a usable plan in three steps.</h2>
          </div>
          <div className="how-grid">
            <article className="how-step">
              <span>01</span>
              <h3>Choose self or gift</h3>
              <p>Tell us whether the private access is for you or someone you love.</p>
            </article>
            <article className="how-step">
              <span>02</span>
              <h3>Pay securely</h3>
              <p>
                Complete a one-time ${VILLAGE_KIT_PRICE} purchase through Stripe&apos;s hosted
                Checkout.
              </p>
            </article>
            <article className="how-step">
              <span>03</span>
              <h3>Open the kit</h3>
              <p>
                After server-verified payment, download it or share the private gift-access link.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="gift" className="section" aria-labelledby="gift-page-heading">
        <div className="container gift-grid">
          <div>
            <p className="eyebrow">Giving The Village Kit</p>
            <h2 id="gift-page-heading">
              Useful for the person who wants to help but does not know where to begin.
            </h2>
            <p className="lede">
              This is a thoughtful digital gift for a friend, sister, daughter, coworker, partner,
              or long-distance loved one who could use a simpler way to coordinate care.
            </p>
            <p className="gift-note">
              The gift is not advice about how she should feel. It is a practical tool she can use,
              skip, edit, or set aside on her own terms.
            </p>
            <TrackedBuyLink href="#buy" location="village_kit_gift" className="button">
              Choose “I am giving this” <ArrowRight aria-hidden="true" size={18} />
            </TrackedBuyLink>
          </div>
          <div>
            <h3>What happens after you pay</h3>
            <ul className="check-list">
              <li>You return to Village For Her after Stripe confirms payment</li>
              <li>You receive a private link to copy, share, or email</li>
              <li>The recipient can open and download the kit immediately</li>
              <li>No account, shipping address, or scheduled delivery is required</li>
            </ul>
            <p className="microcopy">
              The purchaser is responsible for sharing the private link in v1. Automated recipient
              email and scheduled gifting are intentionally not part of this launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Questions before buying</p>
            <h2 id="faq-heading">Clear answers, before checkout.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact" aria-labelledby="kit-final-heading">
        <div className="container final-cta">
          <div>
            <p className="eyebrow">Digital · immediate access · one-time</p>
            <h2 id="kit-final-heading">Give care somewhere clear to land.</h2>
            <p className="microcopy">
              By purchasing, you agree to our <Link href="/policies/terms/">terms</Link>,{' '}
              <Link href="/policies/digital-delivery/">digital delivery policy</Link>, and{' '}
              <Link href="/policies/refunds/">refund policy</Link>.
            </p>
          </div>
          <TrackedBuyLink href="#buy" location="village_kit_final" className="button">
            Get The Village Kit — ${VILLAGE_KIT_PRICE}
          </TrackedBuyLink>
        </div>
      </section>

      <div className="mobile-purchase-bar" aria-label="Village Kit purchase shortcut">
        <div>
          <strong>${VILLAGE_KIT_PRICE}</strong>
          <span>digital · immediate access</span>
        </div>
        <TrackedBuyLink href="#buy" location="village_kit_final" className="button">
          Choose yours
        </TrackedBuyLink>
      </div>
    </>
  );
}
