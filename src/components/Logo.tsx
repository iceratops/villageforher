import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  inverse?: boolean;
};

export default function Logo({ inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`brand ${inverse ? 'brand-inverse' : ''}`}
      aria-label="Village For Her home"
    >
      <Image src="/brand-mark.svg" alt="" width={42} height={42} priority />
      <span className="brand-wordmark">Village For Her</span>
    </Link>
  );
}
