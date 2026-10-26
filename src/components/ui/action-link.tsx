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
  const classes = `action-link ${compact ? 'action-link-compact' : 'action-link-default'} action-link-${variant} ${className}`;
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
      <a href={props.href} download className={classes} data-entrance="action">
        {content}
      </a>
    );
  return (
    <Link href={props.href} className={classes} data-entrance="action">
      {content}
    </Link>
  );
}
