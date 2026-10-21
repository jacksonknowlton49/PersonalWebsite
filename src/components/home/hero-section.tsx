import Image from 'next/image';
import { ActionLink } from '@/components/ui/action-link';
import { HeroPortrait } from './hero-portrait';

export function HeroSection() {
  return (
    <section
      className="relative grid items-end md:grid-cols-[46%_54%] xl:min-h-[596px]"
      aria-labelledby="hero-title"
    >
      <div className="relative z-1 pt-8 pb-7 md:pt-12 md:pb-14 xl:pt-[70px]">
        <p className="mb-5 flex items-center gap-[13px] text-[23px] xl:mb-7 xl:text-[28px]">
          <Image
            src="/images/waving.png"
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
          />
          Hello, I’m
        </p>
        <h1
          id="hero-title"
          className="text-[clamp(54px,12vw,76px)] leading-[1.12] font-bold tracking-[-2px] md:text-[clamp(54px,5.15vw,86px)] xl:tracking-[-3px]"
        >
          Jackson <span className="text-accent">K.</span>
        </h1>
        <p className="mt-3.5 mb-7 text-[27px] tracking-[-.8px] md:text-2xl xl:mb-11 xl:text-[32px]">
          Full Stack Developer
        </p>
        <div className="max-w-[580px] space-y-5 text-base leading-[1.55] text-muted xl:text-[17px] xl:leading-[1.4]">
          <p>
            I&apos;m a{' '}
            <span className="underline underline-offset-2">
              Full-Stack Developer
            </span>{' '}
            specializing in frontend development, focused on creating fast,
            responsive, and visually engaging web experiences.
          </p>
          <p>
            Currently exploring full-time software development opportunities.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 xl:mt-[66px] xl:gap-5">
          <ActionLink href="/about" variant="primary">
            About Me
          </ActionLink>
          <ActionLink href="/projects" icon="grid">
            View Projects
          </ActionLink>
        </div>
      </div>
      <HeroPortrait />
    </section>
  );
}
