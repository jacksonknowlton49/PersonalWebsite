import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon, type IconName } from './icon';

type ActionLinkProps = Readonly<
  {
    children: ReactNode;
    variant?: 'primary' | 'outline';
    icon?: IconName;
    compact?: boolean;
    className?: string;
  } & (
    | { href: string; download: true }
    | { href: ComponentProps<typeof Link>['href']; download?: false }
  )
>;

export function ActionLink(props: ActionLinkProps) {
  const {
    children,
    variant = 'outline',
    icon = 'arrow',
    compact = false,
    className = '',
  } = props;
  const classes = `inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[14px] border leading-[1.4] whitespace-nowrap transition-colors motion-reduce:transition-none hover:border-[#b7a9fb] ${compact ? 'min-h-11 px-3 py-2.5 text-[13px] sm:min-h-[52px] sm:px-[25px] sm:py-3 sm:text-lg' : 'min-h-[58px] px-6 py-4 text-[17px] xl:min-h-[66px] xl:px-[34px] xl:py-[18px] xl:text-xl'} ${variant === 'primary' ? 'border-[#9376ed] bg-linear-[100deg,#b667ed,#5958ee] shadow-[inset_0_0_3px_#ffffff38] hover:brightness-110' : 'border-line bg-transparent hover:bg-accent/10'} ${className}`;
  const content = (
    <>
      {children}
      <Icon
        name={icon}
        className={compact ? 'text-base sm:text-xl' : 'text-xl'}
      />
    </>
  );
  if (props.download)
    return (
      <a href={props.href} download className={classes}>
        {content}
      </a>
    );
  return (
    <Link href={props.href} className={classes}>
      {content}
    </Link>
  );
}
