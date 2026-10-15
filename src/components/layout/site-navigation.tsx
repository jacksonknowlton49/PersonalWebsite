'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { site } from '@/config/site';
import styles from './site-shell.module.scss';

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-2">
      {site.navigation.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? 'page' : undefined}
          className={styles.navLink}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
