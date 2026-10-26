import Image from 'next/image';
import { StatCard } from './stat-card';
import {
  primaryTechnologies,
  technologies,
  workHistory,
} from '@/config/experience';

export function HeroPortrait({
  expanded = false,
}: Readonly<{ expanded?: boolean }>) {
  return (
    <div className="hero-portrait relative mx-auto w-full max-w-150 min-w-0 self-end md:max-w-none">
      <Image
        data-entrance="image"
        data-hero-visual
        src="/images/head-shot.png"
        alt="Jackson Knowlton wearing a black hoodie"
        width={846}
        height={700}
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1536px) 54vw, 752px"
        className="block h-auto w-full"
      />
      <StatCard
        {...(expanded ? { open: true } : {})}
        value="10+"
        label="Years Experience"
        icon="clock"
        tone="lime"
        className="stat-card-experience top-[24%]"
      >
        <ol className="space-y-4">
          {workHistory.map(({ company, role, dates }) => (
            <li key={company} className="border-l-2 border-[#96df61]/40 pl-3">
              <p className="text-sm leading-snug font-semibold text-ink">
                {company}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{role}</p>
              <p className="mt-1 text-xs text-muted/75">{dates}</p>
            </li>
          ))}
        </ol>
      </StatCard>
      <StatCard
        {...(expanded ? { open: true } : {})}
        value="16+"
        label="Skilled Technologies"
        icon="check"
        tone="orchid"
        className="top-[50%] right-0"
      >
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {primaryTechnologies.map((technology) => (
            <li
              key={technology}
              className="technology-tag technology-tag-primary"
            >
              {technology}
              <span className="sr-only"> (primary)</span>
            </li>
          ))}
          {technologies.map((technology) => (
            <li key={technology} className="technology-tag">
              {technology}
            </li>
          ))}
        </ul>
      </StatCard>
    </div>
  );
}
