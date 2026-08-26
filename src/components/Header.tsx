'use client';

import Logo from '@/components/Logo';
import TrackedBuyLink from '@/components/TrackedBuyLink';
import { VILLAGE_KIT_PRICE } from '@/lib/site';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navigation = [
  { name: 'The Village Kit', href: '/village-kit/' },
  { name: 'Free guide', href: '/free/10-ways-to-help/' },
  { name: 'About', href: '/about/' },
];

function isCurrentPath(pathname: string, href: string): boolean {
  const current = pathname.replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '') || '/';
  return current === target || current.startsWith(`${target}/`);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        menuToggleRef.current?.getAttribute('aria-expanded') === 'true'
      ) {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Logo />

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = isCurrentPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'nav-link nav-link-active' : 'nav-link'}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            );
          })}
          <TrackedBuyLink
            href="/village-kit/#buy"
            location="navigation"
            className="button button-small"
          >
            Get the kit
          </TrackedBuyLink>
        </nav>

        <button
          ref={menuToggleRef}
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={isMenuOpen ? 'mobile-nav mobile-nav-open' : 'mobile-nav'}
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
      >
        {navigation.map((item) => {
          const isActive = isCurrentPath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={isActive ? 'mobile-nav-link mobile-nav-link-active' : 'mobile-nav-link'}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.name}
            </Link>
          );
        })}
        <TrackedBuyLink
          href="/village-kit/#buy"
          location="navigation"
          className="button mobile-nav-cta"
          onClick={() => setIsMenuOpen(false)}
        >
          Get The Village Kit — ${VILLAGE_KIT_PRICE}
        </TrackedBuyLink>
      </nav>
    </header>
  );
}
