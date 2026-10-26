'use client';

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Icon, type IconName } from '@/components/ui/icon';
import { animateStatCardDetails } from '@/lib/animations';

type StatCardProps = Readonly<{
  value: string;
  label: string;
  icon: IconName;
  tone: 'lime' | 'orchid';
  className?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export function StatCard({
  value,
  label,
  icon,
  tone,
  className = '',
  children,
  open,
  onOpenChange,
}: StatCardProps) {
  const contentId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const [interaction, setInteraction] = useState({
    hovered: false,
    focused: false,
    pinned: false,
  });
  const expanded =
    open ?? (interaction.hovered || interaction.focused || interaction.pinned);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!expanded || !card) return;
    // The hero timeline coordinates the reveal during a view change.
    if (card.closest('[data-changing="true"]')) return;
    return animateStatCardDetails(card);
  }, [expanded, open]);

  function updateInteraction(next: Partial<typeof interaction>) {
    if (open !== undefined && !onOpenChange) return;
    const updated = { ...interaction, ...next };
    setInteraction(updated);
    onOpenChange?.(updated.hovered || updated.focused || updated.pinned);
  }

  return (
    <div
      ref={cardRef}
      className={`stat-card ${className}`}
      data-entrance="stat"
      data-expanded={expanded}
      data-tone={tone}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') updateInteraction({ hovered: true });
      }}
      onPointerLeave={() => updateInteraction({ hovered: false })}
      onFocusCapture={(event) => {
        // Touch and mouse clicks use pinning; keyboard focus previews the card.
        if (event.target.matches(':focus-visible')) {
          updateInteraction({ focused: true });
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          updateInteraction({ focused: false });
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          updateInteraction({ hovered: false, focused: false, pinned: false });
        }
      }}
    >
      <button
        type="button"
        className="stat-card-trigger"
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-disabled={open !== undefined && !onOpenChange ? true : undefined}
        onClick={() => updateInteraction({ pinned: !interaction.pinned })}
      >
        <span
          className={`flex items-start justify-between gap-2 ${tone === 'lime' ? 'text-[#96df61]' : 'text-[#c56ce8]'}`}
        >
          <strong className="text-[26px] leading-none lg:text-[34px]">
            {value}
          </strong>
          <Icon name={icon} className="text-lg lg:text-[24px]" />
        </span>
        <span className="mt-3 block max-w-27.5 text-sm leading-[1.3] text-[#e1e0e9] lg:mt-3.75 lg:text-lg">
          {label}
        </span>
        <span className="sr-only">
          {open !== undefined && !onOpenChange
            ? 'Details are shown in this view'
            : interaction.pinned
              ? 'Click to unpin details'
              : 'Click to keep details open'}
        </span>
      </button>
      <div
        id={contentId}
        className="stat-card-details"
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="stat-card-details-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
