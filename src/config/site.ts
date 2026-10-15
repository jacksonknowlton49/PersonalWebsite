import type { Route } from 'next';

export const site = {
  name: 'Portfolio',
  description: 'A space for ideas, projects, and the person behind them.',
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ] satisfies ReadonlyArray<{ href: Route; label: string }>,
} as const;
