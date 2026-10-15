'use client';

import { PageIntro } from '@/components/ui/page-intro';

export default function ErrorPage({
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <>
      <PageIntro eyebrow="Something went wrong" title="Let’s try that again.">
        <p>This part of the page couldn’t load. Please try again.</p>
      </PageIntro>
      <button
        type="button"
        onClick={reset}
        className="mt-9 min-h-12 rounded bg-accent px-5 py-3 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </>
  );
}
