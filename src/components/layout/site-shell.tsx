import Link from 'next/link';
import type { ReactNode } from 'react';

import { site } from '@/config/site';
import { SiteNavigation } from './site-navigation';
import styles from './site-shell.module.scss';

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <header className="border-b border-line">
        <div
          className={`${styles.container} flex min-h-24 flex-wrap items-center justify-between gap-4 py-5`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight"
          >
            <span aria-hidden="true" className={styles.mark}>
              p.
            </span>
            {site.name}
          </Link>
          <SiteNavigation />
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className={`${styles.container} flex-1 py-16 sm:py-24`}
      >
        {children}
      </main>
      <footer className="border-t border-line">
        <div
          className={`${styles.container} flex flex-wrap justify-between gap-3 py-7 text-sm text-muted`}
        >
          <p>{site.name}</p>
          <p>A little room for what comes next.</p>
        </div>
      </footer>
    </div>
  );
}
