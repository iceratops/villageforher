import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import Link from 'next/link';

const description =
  'Learn how Village For Her makes practical care easier to ask for, organize, give, and receive.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: {
    canonical: '/about/',
  },
  ...socialMetadata({
    title: 'About Village For Her',
    description,
    path: '/about/',
    image: '/images/brand-social-card.png',
  }),
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="page-shell">
          <p className="eyebrow">About Village For Her</p>
          <h1 id="about-heading">Every woman deserves a village.</h1>
          <p>
            We create practical tools that make care easier to ask for, organize, give, and receive.
          </p>
        </div>
      </section>

      <article className="page-shell prose-page">
        <section aria-labelledby="why-we-exist">
          <h2 id="why-we-exist">Why we exist</h2>
          <p>
            People often want to help, but the work of deciding what is needed, asking for it, and
            coordinating everyone can fall back on the woman already carrying the most. Village For
            Her helps turn caring intentions into useful action without adding another system for
            her to manage.
          </p>
          <p>
            Our work is especially relevant during pregnancy and postpartum, but the principle is
            broader: support should be concrete, respectful, and shaped around the person receiving
            it.
          </p>
        </section>

        <section aria-labelledby="what-we-make">
          <h2 id="what-we-make">What we make</h2>
          <p>
            <strong>The Village Kit</strong> is a digital support-planning toolkit for coordinating
            meals, errands, household help, visitor boundaries, check-ins, and the other details
            that make support genuinely useful.
          </p>
          <p>
            Our free guide, <strong>10 Ways to Actually Help a New Mom</strong>, gives friends,
            relatives, partners, and coworkers a clear place to begin.
          </p>
        </section>

        <section aria-labelledby="who-its-for">
          <h2 id="who-its-for">Made for receiving and giving care</h2>
          <p>
            Village For Her is for a woman building support around herself and for anyone who wants
            to show up for her well. That includes partners, friends, family members, coworkers, and
            people supporting from a distance.
          </p>
          <p>
            Our resources are practical planning tools. They are not therapy, medical care, a
            diagnosis, or a substitute for professional support.
          </p>
        </section>

        <nav className="button-row" aria-label="Explore Village For Her">
          <Link className="button" href="/village-kit">
            Explore The Village Kit
          </Link>
          <Link className="button button-secondary" href="/free/10-ways-to-help">
            Get the free guide
          </Link>
        </nav>
      </article>
    </>
  );
}
