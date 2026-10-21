import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mx-auto w-[calc(100%-40px)] max-w-[1392px] pb-6 sm:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] lg:pb-16">
      <a
        href="#main-content"
        className="absolute top-3 left-3 z-10 -translate-y-[200%] rounded-lg border border-accent bg-canvas px-5 py-3 focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </div>
  );
}
