import '@/styles/globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteShell } from '@/components/layout/site-shell';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=code_xml,download,schedule,task_alt,arrow_right_alt,view_cozy,send,mail,call,location_on"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
