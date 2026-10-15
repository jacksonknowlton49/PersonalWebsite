import { ActionLink } from '@/components/ui/action-link';
import { PageIntro } from '@/components/ui/page-intro';

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="404 / Not found" title="Nothing here just yet.">
        <p>This page may have moved, or the address may be incorrect.</p>
      </PageIntro>
      <div className="mt-9">
        <ActionLink href="/">Return home</ActionLink>
      </div>
    </>
  );
}
