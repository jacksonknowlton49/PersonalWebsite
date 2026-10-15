import { ActionLink } from '@/components/ui/action-link';
import { PageIntro } from '@/components/ui/page-intro';

export default function HomePage() {
  return (
    <>
      <PageIntro
        eyebrow="01 / Home"
        title="Good things start with a little space."
      >
        <p>
          A home for future projects, fresh ideas, and everything in between.
          For now, this is just the beginning.
        </p>
      </PageIntro>
      <div className="mt-9">
        <ActionLink href="/about">A little about this space</ActionLink>
      </div>
      <section
        aria-labelledby="next-heading"
        className="mt-24 grid gap-6 border-t border-line pt-8 sm:mt-32 sm:grid-cols-[1fr_2fr] sm:gap-12"
      >
        <h2 id="next-heading" className="text-sm font-semibold">
          Room to grow
        </h2>
        <div>
          <p className="max-w-xl text-2xl leading-snug tracking-tight">
            The first chapter is still unwritten.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            This placeholder will make way for selected work, stories, or
            whatever comes next.
          </p>
          <p className="mt-8 text-xs tracking-widest text-muted uppercase">
            Placeholder content
          </p>
        </div>
      </section>
    </>
  );
}
