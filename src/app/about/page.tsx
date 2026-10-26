import type { Metadata } from 'next';
import { ActionLink } from '@/components/ui/action-link';
import { PageIntro } from '@/components/ui/page-intro';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <section className="pt-6 pb-18">
      <PageIntro eyebrow="About me" title="Hi, I’m Jackson.">
        <p>
          I’m a Full-Stack Developer based in Kansas City, MO, specializing in
          frontend development. I focus on creating fast, responsive, and
          visually engaging web experiences.
        </p>
        <p>Currently exploring full-time software development opportunities.</p>
      </PageIntro>
      <ActionLink href="/">Back home</ActionLink>
    </section>
  );
}
