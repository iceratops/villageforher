import Logo from '@/components/Logo';
import Link from 'next/link';

const shopLinks = [
  { label: 'The Village Kit', href: '/village-kit/' },
  { label: 'Gift the kit', href: '/village-kit/#gift' },
  { label: 'Free practical-help guide', href: '/free/10-ways-to-help/' },
];

const companyLinks = [
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

const policyLinks = [
  { label: 'Digital delivery', href: '/policies/digital-delivery/' },
  { label: 'Refund policy', href: '/policies/refunds/' },
  { label: 'Privacy', href: '/policies/privacy/' },
  { label: 'Terms', href: '/policies/terms/' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <Logo inverse />
          <p>Practical tools that make care easier to ask for, organize, give, and receive.</p>
          <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>
        </div>

        <FooterList title="Start here" links={shopLinks} />
        <FooterList title="Village For Her" links={companyLinks} />
        <FooterList title="Policies" links={policyLinks} />
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Village For Her. All rights reserved.</p>
        <p>Not therapy, medical care, diagnosis, or clinical treatment.</p>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  links,
}: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="footer-list">
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
