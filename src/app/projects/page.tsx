import type { Metadata } from 'next';
import { ActionLink } from '@/components/ui/action-link';
import { PageIntro } from '@/components/ui/page-intro';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Projects' };

export default function ProjectsPage() {
  return (
    <section className="pt-[25px] pb-[70px]">
      <PageIntro eyebrow="Selected work" title="Projects">
        <p>
          Project details are coming soon. In the meantime, get in touch to
          learn more about my work.
        </p>
      </PageIntro>
      <ActionLink href={`mailto:${site.email}`} icon="send">
        Get in Touch
      </ActionLink>
    </section>
  );
}
