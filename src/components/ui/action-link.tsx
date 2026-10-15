import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';

import styles from './action-link.module.scss';

export function ActionLink({
  href,
  children,
}: Readonly<{ href: Route; children: ReactNode }>) {
  return (
    <Link href={href} className={styles.link}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
