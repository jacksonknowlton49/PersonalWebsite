import Link from 'next/link';
import { ActionLink } from '@/components/ui/action-link';
import { Icon } from '@/components/ui/icon';
import { site } from '@/config/site';

export function SiteHeader() {
  return (
    <header className="site-header" data-entrance="frame">
      <Link href="/" className="site-brand" aria-label={`${site.name}, home`}>
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
