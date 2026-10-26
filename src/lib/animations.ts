import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

function createStatCardReveal(card: Element, reduced: boolean, delay = 0) {
  const items = card.querySelectorAll('.stat-card-details-content li');
  if (!items.length) return null;

  return gsap.fromTo(
    items,
    { autoAlpha: 0, y: -6 },
    {
      autoAlpha: 1,
      y: 0,
      delay: reduced ? 0 : delay,
      duration: reduced ? 0 : 0.22,
      ease: 'power2.out',
      stagger: reduced
        ? 0
        : { amount: Math.min(0.4, (items.length - 1) * 0.07) },
      clearProps: 'opacity,visibility,transform',
    },
  );
}

export function animateStatCardDetails(card: HTMLElement) {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Wait for the CSS width and details expansion (220ms) before revealing.
    createStatCardReveal(card, false, 0.22);
  });
  return () => media.revert();
}

export function reservePortraitDetails(root: HTMLElement) {
  const portrait = root.querySelector<HTMLElement>('.hero-portrait');
  if (!portrait) return;
  if (
    root.dataset.about !== 'true' ||
    window.matchMedia('(min-width: 48rem)').matches
  ) {
    portrait.style.removeProperty('margin-bottom');
    return;
  }

  // Floating, expanded cards need space below the portrait, without changing
  // their positions relative to the image or overlapping the contact bar.
  const bottom = portrait.getBoundingClientRect().bottom;
  const cards = Array.from(portrait.querySelectorAll('.stat-card'));
  const overflow = Math.max(
    0,
    ...cards.map((card) => card.getBoundingClientRect().bottom - bottom),
  );
  const margin = Math.ceil(overflow);
  if (portrait.style.marginBottom !== `${margin}px`) {
    portrait.style.marginBottom = `${margin}px`;
  }
}

export function captureHeroLayout(root: HTMLElement) {
  gsap.getById('page-entrance')?.progress(1);
  if (root.dataset.about !== 'true') {
    root.style.setProperty(
      '--hero-intro-height',
      `${root.getBoundingClientRect().height}px`,
    );
  }
  return {
    state: Flip.getState(
      root.querySelectorAll('[data-hero-visual], .stat-card'),
    ),
    height: root.getBoundingClientRect().height,
  };
}

export function exitHeroPanel(panel: HTMLElement, onComplete: () => void) {
  return gsap.to(panel, {
    x: -40,
    autoAlpha: 0,
    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : 0.2,
    ease: 'power2.in',
    onComplete,
  });
}

export function animateHeroView(
  root: HTMLElement,
  panel: HTMLElement,
  previous: ReturnType<typeof captureHeroLayout>,
  onComplete: () => void,
) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  reservePortraitDetails(root);
  const height = root.getBoundingClientRect().height;
  // Freeze the destination grid tracks before Flip measures its endpoints.
  // Animating the section height must not re-align its bottom-anchored portrait.
  gsap.set(root, { gridTemplateRows: getComputedStyle(root).gridTemplateRows });
  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.set(root.querySelectorAll('[data-hero-visual], .stat-card'), {
        clearProps: 'transform',
      });
      onComplete();
    },
  });

  timeline
    .add(
      Flip.from(previous.state, {
        duration: reduced ? 0 : 0.65,
        ease: 'power3.inOut',
        nested: true,
        absolute: root.querySelectorAll('.stat-card'),
      }),
      0,
    )
    .fromTo(
      root,
      { height: previous.height },
      {
        height,
        autoRound: false,
        duration: reduced ? 0 : 0.65,
        ease: 'power3.inOut',
        clearProps: 'height,gridTemplateRows',
      },
      0,
    )
    .fromTo(
      panel,
      { x: 28, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: reduced ? 0 : 0.35,
        clearProps: 'transform,opacity,visibility',
      },
      reduced ? 0 : 0.3,
    );

  if (root.dataset.about === 'true') {
    // Keep the final list dimensions during expansion, but reveal the items
    // only after Flip has finished resizing and positioning the cards.
    for (const card of root.querySelectorAll('.stat-card')) {
      const reveal = createStatCardReveal(card, reduced);
      if (reveal) timeline.add(reveal, reduced ? 0 : 0.65);
    }
  }

  return timeline;
}

function createWaveTimeline(target: HTMLElement) {
  return gsap
    .timeline({ id: 'hero-wave', defaults: { ease: 'power1.inOut' } })
    .set(target, { transformOrigin: '70% 80%' })
    .to(target, { rotation: 20, duration: 0.18 })
    .to(target, { rotation: -12, duration: 0.22, repeat: 3, yoyo: true })
    .to(target, { rotation: 0, duration: 0.25 });
}

function attachDevTools(timeline: gsap.core.Timeline) {
  let active = true;
  let devTools: { kill: () => void } | undefined;

  if (process.env.NODE_ENV === 'development') {
    void import('gsap/GSDevTools').then(({ GSDevTools }) => {
      if (!active) return;
      gsap.registerPlugin(GSDevTools);
      devTools = GSDevTools.create({
        animation: timeline,
        globalSync: false,
        loop: false,
        persist: false,
      });
    });
  }

  return () => {
    active = false;
    devTools?.kill();
  };
}

export function animatePageLoad(root: HTMLElement) {
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const timeline = gsap.timeline({
      id: 'page-entrance',
      paused: true,
      defaults: { duration: 0.32, ease: 'power2.out' },
    });

    // Overlap groups, giving interactive elements a longer, more visible drop.
    const groups = [
      { selector: '[data-entrance="frame"]', at: 0, y: -10, duration: 0.32 },
      { selector: '[data-entrance="text"]', at: 0.1, y: -10, duration: 0.32 },
      { selector: '[data-entrance="image"]', at: 0.16, y: -10, duration: 0.32 },
      { selector: '[data-entrance="action"]', at: 0.3, y: -28, duration: 0.55 },
      { selector: '[data-entrance="stat"]', at: 0.36, y: -28, duration: 0.55 },
    ];

    for (const { selector, at, y, duration } of groups) {
      const targets = root.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) continue;
      timeline.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger: { amount: 0.1 },
          clearProps: 'opacity,visibility,transform',
        },
        at,
      );
    }

    const wave = root.querySelector<HTMLElement>('[data-wave]');
    if (wave) timeline.add(createWaveTimeline(wave), '+=0.04');

    let cleanupDevTools: (() => void) | undefined;
    const play = () => {
      timeline.play();
      cleanupDevTools = attachDevTools(timeline);
    };

    if (document.readyState === 'complete') {
      play();
    } else {
      window.addEventListener('load', play, { once: true });
    }

    return () => {
      window.removeEventListener('load', play);
      cleanupDevTools?.();
    };
  });

  return () => media.revert();
}
