import type { Metadata } from 'next';

import { ActionLink } from '@/components/ui/action-link';
import { PageIntro } from '@/components/ui/page-intro';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="02 / About" title="A place for the bigger picture.">
        <p>
          Every project has a person and a story behind it. Soon, this page will
          introduce both.
        </p>
      </PageIntro>
      <section
        aria-labelledby="story-heading"
        className="mt-16 max-w-2xl border-t border-line pt-8"
      >
        <h2 id="story-heading" className="text-2xl font-medium tracking-tight">
          The story comes next.
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          This is a placeholder for a short introduction, a few interests, and
          the things that make this space your own.
        </p>
        <p className="mt-6 text-xs tracking-widest text-muted uppercase">
          Placeholder content
        </p>
      </section>
      <div className="mt-10">
        <ActionLink href="/">Back to the beginning</ActionLink>
      </div>
    </>
  );
}
