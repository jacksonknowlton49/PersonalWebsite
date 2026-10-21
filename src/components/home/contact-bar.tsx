import Image from 'next/image';
import { ActionLink } from '@/components/ui/action-link';
import { Icon, type IconName } from '@/components/ui/icon';
import { site } from '@/config/site';

function ContactDetail({
  label,
  value,
  href,
  icon,
}: Readonly<{ label: string; value: string; href?: string; icon: IconName }>) {
  return (
    <div className="min-w-0 first:basis-full sm:first:basis-auto">
      <dt className="mb-2 flex items-center gap-1 text-base text-accent lg:mb-3">
        <Icon
          name={icon}
          className="text-lg [font-variation-settings:'wght'_200]"
        />
        {label}
      </dt>
      <dd className="text-[15px] leading-[1.4] wrap-anywhere sm:whitespace-nowrap lg:text-base">
        {href ? (
          <a href={href} className="hover:underline hover:underline-offset-4">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

export function SocialLinks() {
  return (
    <div className="mr-auto flex items-center gap-[18px] text-base whitespace-nowrap xl:mx-auto xl:gap-5">
      <span className="mr-1">Check me out on</span>
      {(['linkedin', 'github'] as const).map((platform) => {
        const label = platform === 'linkedin' ? 'LinkedIn' : 'GitHub';
        const icon = (
          <Image
            src={`/images/${platform}-icon.png`}
            width={32}
            height={32}
            alt=""
            className="block size-[30px] object-contain"
          />
        );
        const href = site.social[platform];
        return href ? (
          <a
            key={platform}
            href={href}
            aria-label={`${label} profile`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 min-w-9 items-center justify-center"
          >
            {icon}
          </a>
        ) : (
          <span
            key={platform}
            className="inline-flex min-h-11 items-center"
            role="img"
            aria-label={`${label} profile coming soon`}
            title={`${label} profile coming soon`}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}

export function ContactBar() {
  return (
    <section
      className="relative z-2 flex min-h-[145px] flex-wrap items-center justify-between gap-6 rounded-[28px] border border-[#262834] bg-[#10121e] p-7 shadow-[inset_0_0_5px_#ffffff03] sm:gap-[26px] sm:rounded-[36px] sm:px-9 sm:py-[34px] 2xl:flex-nowrap 2xl:gap-10 2xl:px-[54px]"
      aria-label="Contact Jackson"
    >
      <dl className="flex basis-full flex-wrap justify-start gap-x-9 gap-y-6 sm:flex-nowrap sm:justify-between 2xl:flex-1 2xl:basis-auto 2xl:gap-12">
        <ContactDetail
          label="Email"
          value={site.email}
          href={`mailto:${site.email}`}
          icon="mail"
        />
        <ContactDetail
          label="Phone"
          value={site.phone}
          href={site.phoneHref}
          icon="phone"
        />
        <ContactDetail label="Location" value={site.location} icon="pin" />
      </dl>
      <SocialLinks />
      <ActionLink
        href={`mailto:${site.email}`}
        icon="send"
        className="w-full sm:w-auto"
      >
        Get in Touch
      </ActionLink>
    </section>
  );
}
