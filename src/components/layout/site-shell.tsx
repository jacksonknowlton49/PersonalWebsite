import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { PageAnimations } from './page-animations';

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mx-auto w-[calc(100%-40px)] max-w-348 pb-6 sm:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] lg:pb-16">
      <PageAnimations>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
      </PageAnimations>
    </div>
  );
}
