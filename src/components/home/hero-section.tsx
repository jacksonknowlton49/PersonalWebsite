'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ActionLink } from '@/components/ui/action-link';
import { Icon } from '@/components/ui/icon';
import {
  animateHeroView,
  captureHeroLayout,
  exitHeroPanel,
  reservePortraitDetails,
} from '@/lib/animations';
import { HeroPortrait } from './hero-portrait';
import { WaveIcon } from './wave-icon';

export function HeroSection() {
  const [about, setAbout] = useState(false);
  const [changing, setChanging] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const layoutRef = useRef<ReturnType<typeof captureHeroLayout> | null>(null);
  const animationRef = useRef<{ kill: () => void } | null>(null);
  const busyRef = useRef(false);
  const focusPendingRef = useRef(false);

  function changeView(nextAbout: boolean) {
    if (busyRef.current || !rootRef.current) return;
    const outgoing = about ? aboutRef.current : introRef.current;
    if (!outgoing) return;
    busyRef.current = true;
    setChanging(true);
    animationRef.current = exitHeroPanel(outgoing, () => {
      if (!rootRef.current) return;
      layoutRef.current = captureHeroLayout(rootRef.current);
      setAbout(nextAbout);
    });
  }

  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = about ? aboutRef.current : introRef.current;
    if (!root || !panel || !layoutRef.current) return;

    animationRef.current = animateHeroView(
      root,
      panel,
      layoutRef.current,
      () => {
        layoutRef.current = null;
        busyRef.current = false;
        focusPendingRef.current = true;
        setChanging(false);
      },
    );
  }, [about]);

  useLayoutEffect(() => {
    if (changing || !focusPendingRef.current) return;
    focusPendingRef.current = false;
    if (about) headingRef.current?.focus({ preventScroll: true });
    else aboutButtonRef.current?.focus({ preventScroll: true });
  }, [about, changing]);

  useLayoutEffect(() => () => animationRef.current?.kill(), []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || changing) return;
    const observer = new ResizeObserver(() => reservePortraitDetails(root));
    observer.observe(root);
    root
      .querySelectorAll('.stat-card')
      .forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [about, changing]);

  return (
    <section
      ref={rootRef}
      className="hero-section relative grid items-end md:grid-cols-[46%_54%] xl:min-h-149"
      data-about={about}
      data-changing={changing}
      aria-labelledby={about ? 'about-title' : 'hero-title'}
    >
      <div
        ref={introRef}
        hidden={about}
        inert={about || changing}
        className="hero-intro relative z-1 pt-8 pb-7 md:pt-12 md:pb-14 xl:pt-17.5"
      >
        <p
          data-entrance="text"
          className="mb-5 flex items-center gap-3.25 text-[23px] xl:mb-7 xl:text-[28px]"
        >
          <WaveIcon />
          Hello, I’m
        </p>
        <h1
          id="hero-title"
          data-entrance="text"
          className="text-[clamp(54px,12vw,76px)] leading-[1.12] font-bold tracking-[-2px] md:text-[clamp(54px,5.15vw,86px)] xl:tracking-[-3px]"
        >
          Jackson <span className="text-accent">K.</span>
        </h1>
        <p
          data-entrance="text"
          className="mt-3.5 mb-7 text-[27px] tracking-[-.8px] md:text-2xl xl:mb-11 xl:text-[32px]"
        >
          Full Stack Developer
        </p>
        <div className="max-w-[580px] space-y-5 text-base leading-[1.55] text-muted xl:text-[17px] xl:leading-[1.4]">
          <p data-entrance="text">
            I&apos;m a{' '}
            <span className="underline underline-offset-2">
              Full-Stack Developer
            </span>{' '}
            specializing in frontend development, focused on creating fast,
            responsive, and visually engaging web experiences.
          </p>
          <p data-entrance="text">
            Currently exploring full-time software development opportunities.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 xl:mt-16.5 xl:gap-5">
          <button
            ref={aboutButtonRef}
            type="button"
            data-entrance="action"
            className="action-link action-link-default action-link-primary"
            aria-controls="about-panel"
            aria-expanded={about}
            onClick={() => changeView(true)}
          >
            About Me
            <Icon name="arrow" className="text-xl" />
          </button>
          <ActionLink href="/projects" icon="grid">
            View Projects
          </ActionLink>
        </div>
      </div>
      <HeroPortrait expanded={about} />
      <div
        ref={aboutRef}
        id="about-panel"
        hidden={!about}
        inert={!about || changing}
        className="hero-about-panel"
      >
        <p className="mb-3 text-base text-accent">A little about me</p>
        <h2
          ref={headingRef}
          id="about-title"
          tabIndex={-1}
          className="mb-5 text-[clamp(32px,3vw,44px)] leading-[1.15] font-bold tracking-[-1px] focus:outline-none"
        >
          Thoughtful code.
          <br />
          Useful experiences.
        </h2>
        <div className="space-y-4 text-base leading-[1.65] text-muted">
          <p>
            I’m Jackson, a Full Stack Developer in Kansas City. I build reusable
            components and refine the details that make interfaces feel
            effortless.
          </p>
          <p>
            My experience spans education platforms, web applications, and
            design systems. I use React, TypeScript, and CSS to build fast,
            accessible experiences with thoughtful teams.
          </p>
        </div>
        <button
          type="button"
          className="action-link action-link-compact action-link-outline mt-6"
          onClick={() => changeView(false)}
        >
          <Icon name="arrow" className="rotate-180 text-xl" />
          Back to intro
        </button>
      </div>
    </section>
  );
}
