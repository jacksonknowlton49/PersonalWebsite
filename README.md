# Portfolio website

A small, typed foundation built with React, Next.js App Router, Tailwind CSS, and SCSS modules. Two placeholder pages live at `/` and `/about`.

## Getting started

Use Node.js 24 LTS and npm 11.19.1 (the package manager is recorded in `package.json`). npm is included with Node.js; Corepack is not required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` followed by `npm start`.

Development and production explicitly use Next.js's supported Webpack bundler. Turbopack's Sass worker exits before connecting in the current Windows runtime, including outside the sandbox. Keeping both commands on the same bundler makes the verified build reproducible; reevaluate Turbopack when upgrading the runtime or framework.

## Structure and boundaries

```text
src/
  app/                  Route entry points, metadata, and error boundaries
    about/page.tsx      Second placeholder page
    layout.tsx          Persistent application shell
    page.tsx            Home placeholder
  components/
    layout/             Shared header, navigation, and footer
    ui/                 Small, reusable presentation components
  config/site.ts        Site identity and navigation
  styles/globals.css    Tailwind entry point, tokens, and base styles
```

Keep route files focused on composing content. Colocate styles and implementation details with the component that owns them. Import shared code through `@/`; use direct imports instead of barrel files. Add abstractions when real reuse appears, rather than creating empty service, hook, or state layers in advance.

### Navigation and the SPA model

All internal navigation uses `next/link`. Next.js handles transitions in the browser, preserving the root layout without a full document reload. Pages retain distinct, bookmarkable URLs, and direct requests to either route work. Initial pages are prerendered; this is the Next.js SPA navigation model, rather than a single HTML file with rendering disabled. See the [official SPA guide](https://nextjs.org/docs/app/guides/single-page-applications).

Components stay server components by default. Add `'use client'` only where browser APIs, state, or event handlers require it; navigation is the initial example. Place future providers in the narrowest persistent layout that needs them. Add feature-specific code under `src/features/<feature>/` once a feature is large enough to justify that boundary. No global state library or data-fetching dependency is needed yet.

### Adding a page

1. Create `src/app/<route>/page.tsx` with a default component export.
2. Export `metadata` to set its title and description.
3. Add its link to `src/config/site.ts` if it belongs in main navigation.
4. Compose existing UI components; keep page-specific components beside that route.
5. Run `npm run check` and `npm run build`.

Typed routes check internal links against Next.js's generated route definitions. Keep navigation matching exact for these top-level pages; deliberately extend matching when nested sections are introduced.

### Styling

`globals.css` is the only Tailwind entry point. CSS custom properties in `:root` are the shared design tokens, exposed to Tailwind using `@theme inline`. Both SCSS and utilities consume those tokens, so branding can change in one place. Fonts use system stacks; builds do not download fonts.

Use Tailwind for spacing, layout, typography, and responsive composition. Use colocated `*.module.scss` files for component selectors and pseudo-states. Begin every stylesheet with `@layer theme, base, components, utilities;` and put module rules in `@layer components`. This establishes cascade order even when Next.js loads route styles before global styles; Tailwind utilities can predictably override component styles. Keep Sass separate from Tailwind's processing: no Tailwind imports, `@apply`, or Tailwind directives inside SCSS. Tailwind v4's [compatibility guidance](https://tailwindcss.com/docs/compatibility) explains this separation. Prefer Sass's modern `@use` if shared Sass helpers become necessary.

The shell includes semantic landmarks, a keyboard skip link, visible focus indicators, and an active-page navigation state. Preserve those conventions as pages grow. Error and missing-route screens provide recovery paths.

## Quality checks

```sh
npm run check     # Formatting, ESLint (zero warnings), strict TypeScript
npm run build     # Production compilation and route prerendering
npm run format    # Apply formatting
```

TypeScript enables strict mode, checked indexed access, and exact optional property types. ESLint uses Next.js's accessibility, React, and TypeScript rules. Prettier owns formatting. Dependency versions are exact and `package-lock.json` records the complete resolution; commit it and use `npm ci` for reproducible local and CI installs. `.npmrc` saves exact versions for new dependencies and enables strict peer dependency checking during installation. The `allowScripts` field in `package.json` records the native dependency scripts approved for this toolchain. Tooling versions must satisfy Next.js's ESLint plugin peer ranges; upgrade them together.

Use `npm install <package>` for runtime dependencies and `npm install --save-dev <package>` for development tools. Commit both `package.json` and `package-lock.json` after dependency changes.

The placeholder content has no business logic requiring a unit-test framework. As behavior grows, add focused tests around that behavior and browser tests for critical journeys. For the base, verify both routes, browser back/forward navigation, direct URL entry, keyboard focus, and narrow layouts before release.

## Scope

No backend, authentication, analytics, external fonts, or deployment provider is configured. Add environment variables only when needed; local `.env*` files are ignored, and an `.env.example` may be tracked. Only `NEXT_PUBLIC_` variables are exposed to browser code; never use that prefix for secrets.

The existing root-level `Resume.pdf` is retained as supplied. Files are publicly served only when explicitly placed under `public/`.
