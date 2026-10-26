import type { ReactNode } from 'react';

export function PageIntro({
  eyebrow,
  title,
  children,
}: Readonly<{ eyebrow: string; title: string; children: ReactNode }>) {
  return (
    <div className="mt-[50px] mb-9 max-w-[800px]">
      <p className="mb-6 text-base text-accent" data-entrance="text">
        {eyebrow}
      </p>
      <h1
        data-entrance="text"
        className="mb-7 text-[clamp(44px,6vw,72px)] leading-[1.1] tracking-[-2px]"
      >
        {title}
      </h1>
      <div
        data-entrance="text"
        className="max-w-[650px] space-y-5 text-xl leading-[1.7] text-muted"
      >
        {children}
      </div>
    </div>
  );
}
