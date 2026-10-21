import Link from 'next/link';
import { ActionLink } from '@/components/ui/action-link';
import { Icon } from '@/components/ui/icon';
import { site } from '@/config/site';

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-3 pt-6 pb-5 sm:gap-6 sm:pt-10 lg:pt-[62px] lg:pb-[26px]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-base font-bold tracking-[-.5px] min-[390px]:text-lg sm:gap-3.5 sm:text-[28px] sm:tracking-[-.7px]"
        aria-label={`${site.name}, home`}
      >
        <Icon name="code" className="text-[28px] text-accent sm:text-[46px]" />
        <span>
          Jackson <span className="text-accent">Knowlton</span>
        </span>
      </Link>
      <ActionLink href={site.resume} download compact icon="download">
        Download Resume
      </ActionLink>
    </header>
  );
}
