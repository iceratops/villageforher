import LeadCaptureForm from '@/components/LeadCaptureForm';
import TrackedBuyLink from '@/components/TrackedBuyLink';
import { SITE_DESCRIPTION, SITE_NAME, VILLAGE_KIT_PRICE, absoluteUrl } from '@/lib/site';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Village For Her — Practical care, easier to coordinate' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/brand-mark.svg'),
  email: 'hello@villageforher.com',
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Practical care for the woman carrying so much</p>
            <h1>Every woman deserves a village.</h1>
            <p className="lede">
              Village For Her makes meaningful help easier to ask for, organize, give, and receive -
              without asking her to manage everyone who wants to care.
            </p>
            <div className="button-row">
              <TrackedBuyLink href="/village-kit/#buy" location="homepage_hero" className="button">
                Get The Village Kit <ArrowRight aria-hidden="true" size={18} />
              </TrackedBuyLink>
              <Link href="/village-kit/#gift" className="button button-secondary">
                Help someone you love
              </Link>
            </div>
            <p className="hero-trust" aria-label="Village Kit purchase details">
              <span>${VILLAGE_KIT_PRICE} one-time</span>
              <span>Printable digital kit</span>
              <span>Immediate access after payment</span>
            </p>
          </div>

          <div className="hero-art" aria-label="Pages from The Village Kit">
            <Image
              className="hero-page hero-page-back"
              src="/images/village-kit-needs.webp"
              alt="What I Actually Need worksheet from The Village Kit"
              width={720}
              height={932}
              sizes="(max-width: 680px) 55vw, (max-width: 900px) 38vw, 24vw"
              priority
            />
            <Image
              className="hero-page hero-page-front"
              src="/images/village-kit-cover.webp"
              alt="Cover of The Village Kit"
              width={720}
              height={932}
              sizes="(max-width: 680px) 55vw, (max-width: 900px) 38vw, 24vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="recognition-heading">
        <div className="container recognition-grid">
          <div>
            <p className="eyebrow">When people care but do not know what to do</p>
            <h2 id="recognition-heading">The help should not become another thing to manage.</h2>
          </div>
          <div>
            <p className="lede">
              People often say, “Let me know what you need.” Then the person who needs support is
              left to find the answer, assign the task, explain the details, and follow up.
            </p>
            <ul className="recognition-list">
              <li>Decide what would actually help right now</li>
              <li>Reply to messages and coordinate well-meaning offers</li>
              <li>Manage meals, errands, visitors, schedules, and boundaries</li>
              <li>Carry the invisible work of keeping everyone informed</li>
            </ul>
            <p>
              Village For Her gives that information somewhere else to live, so care can feel like
              less to carry.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="kit-intro-heading">
        <div className="container product-story-grid">
          <div className="preview-stage" aria-label="Real Village Kit worksheet previews">
            <Image
              src="/images/village-kit-weekly.webp"
              alt="Weekly village support schedule worksheet"
              width={720}
              height={932}
              sizes="(max-width: 900px) 56vw, 25vw"
            />
            <Image
              src="/images/village-kit-messages.webp"
              alt="Ready-to-send support message scripts"
              width={720}
              height={932}
              sizes="(max-width: 900px) 56vw, 25vw"
            />
          </div>

          <div>
            <p className="eyebrow">The Village Kit</p>
            <h2 id="kit-intro-heading">A practical plan people can act on.</h2>
            <p className="lede">
              A 16-page printable toolkit that helps a woman name what would lighten the load and
              helps the people around her show up clearly.
            </p>
            <ul className="outcome-list">
              <li>Know what to ask for without starting from a blank page</li>
              <li>Set visitor and communication boundaries without over-explaining</li>
              <li>Turn offers into complete tasks with names, timing, and details</li>
              <li>Share ready-to-send language when composing a request feels like too much</li>
            </ul>
            <p className="price-line">
              <span className="price">${VILLAGE_KIT_PRICE}</span>
              <span className="price-note">launch price · one-time · digital PDF</span>
            </p>
            <TrackedBuyLink href="/village-kit/" location="homepage_product" className="text-link">
              See everything inside <ArrowRight aria-hidden="true" size={16} />
            </TrackedBuyLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="paths-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Two ways into the same village</p>
            <h2 id="paths-heading">Start with what you are trying to do.</h2>
          </div>
          <div className="path-grid">
            <article className="path-block">
              <span className="path-number">01</span>
              <h3>I need support</h3>
              <p>
                Clarify what would help, choose what can wait, share boundaries, and make a simple
                plan without becoming the coordinator of everyone else.
              </p>
              <TrackedBuyLink
                href="/village-kit/#buy"
                location="homepage_product"
                className="text-link"
              >
                Get the kit for me
              </TrackedBuyLink>
            </article>
            <article className="path-block">
              <span className="path-number">02</span>
              <h3>I want to support her</h3>
              <p>
                Give a useful digital tool that helps her communicate needs and gives friends,
                family, partners, and long-distance supporters clear ways to act.
              </p>
              <TrackedBuyLink
                href="/village-kit/#gift"
                location="homepage_gift"
                className="text-link"
              >
                Learn how gifting works
              </TrackedBuyLink>
            </article>
          </div>
        </div>
      </section>

      <section id="gift" className="section section-sage" aria-labelledby="gift-heading">
        <div className="container gift-grid">
          <div>
            <p className="eyebrow">A thoughtful, useful digital gift</p>
            <h2 id="gift-heading">“I want to help. I just do not know what would be useful.”</h2>
            <p className="lede">
              The Village Kit turns care into a practical next step. It works for a friend, sister,
              daughter, coworker, partner, or anyone whose village wants to show up with less
              guesswork.
            </p>
            <p className="gift-note">
              You do not need to know motherhood language. You only need to care and be willing to
              follow her lead.
            </p>
            <TrackedBuyLink href="/village-kit/#gift" location="homepage_gift" className="button">
              Give The Village Kit <ArrowRight aria-hidden="true" size={18} />
            </TrackedBuyLink>
          </div>
          <div>
            <ul className="check-list">
              <li>Choose “I am giving this to someone” before checkout</li>
              <li>Pay securely through Stripe</li>
              <li>Receive a private access link to copy or share</li>
              <li>The recipient opens the kit immediately — nothing is shipped</li>
            </ul>
            <p className="microcopy">
              Flowers, food, and baby gifts can be lovely. This simply gives the care around them a
              practical plan.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="free-guide-heading">
        <div className="container free-grid">
          <div className="free-cover-wrap">
            <Image
              src="/images/free-guide-cover.webp"
              alt="Cover of 10 Ways to Actually Help a New Mom"
              width={720}
              height={932}
              sizes="(max-width: 900px) 62vw, 31vw"
            />
          </div>
          <div>
            <p className="eyebrow">Free practical guide</p>
            <h2 id="free-guide-heading">10 Ways to Actually Help a New Mom</h2>
            <p className="lede">
              Concrete ideas for friends, family, partners, and coworkers who want to make life
              lighter without asking her to manage the help.
            </p>
            <div className="lead-form-shell">
              <h3>Get immediate access</h3>
              <p className="microcopy">
                Enter your email and the PDF will be ready on the next screen.
              </p>
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-plum" aria-labelledby="mission-heading">
        <div className="container mission-statement">
          <p className="eyebrow">Why Village For Her exists</p>
          <h2 id="mission-heading">Women should not have to carry everything alone.</h2>
          <p>
            We create concrete tools for the everyday work of care: asking, listening, coordinating,
            respecting boundaries, and following through. Not vague wellness. Not a promise to fix
            every hard day. A clearer way to build support around her.
          </p>
          <Link href="/about/" className="button button-light">
            More about our approach
          </Link>
        </div>
      </section>

      <section className="section section-compact" aria-labelledby="final-heading">
        <div className="container final-cta">
          <div>
            <p className="eyebrow">Begin with one clear next step</p>
            <h2 id="final-heading">Make care easier to give and receive.</h2>
          </div>
          <TrackedBuyLink href="/village-kit/#buy" location="homepage_final" className="button">
            Get The Village Kit — ${VILLAGE_KIT_PRICE} <ArrowRight aria-hidden="true" size={18} />
          </TrackedBuyLink>
        </div>
      </section>
    </>
  );
}
