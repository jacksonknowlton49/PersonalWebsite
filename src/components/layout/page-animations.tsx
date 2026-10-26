'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { animatePageLoad } from '@/lib/animations';

export function PageAnimations({
  children,
}: Readonly<{ children: ReactNode }>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (rootRef.current) return animatePageLoad(rootRef.current);
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
