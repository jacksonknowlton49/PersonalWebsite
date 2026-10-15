import type { ReactNode } from 'react';

type PageIntroProps = Readonly<{
  eyebrow: string;
  title: string;
  children: ReactNode;
}>;

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <div className="max-w-3xl">
      <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {eyebrow}
      </p>
      <h1 className="text-5xl leading-[1.08] font-medium tracking-[-0.05em] text-balance sm:text-7xl">
        {title}
      </h1>
      <div className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted">
        {children}
      </div>
    </div>
  );
}
