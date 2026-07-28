# AGENTS.md

Guidance for AI coding agents working on this Next.js personal portfolio site.

## Quick Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run format       # Format with Prettier + Biome (run before committing)
npm run lint         # Biome linting
npm run type-check   # TypeScript checking
npm test             # Vitest tests
npm run build        # Production build + static export
npm run verify-export # Check the built out/ HTML (run after npm run build)
```

**File-scoped (faster feedback):**

```bash
npx tsc --noEmit path/to/file.tsx           # Type check single file
npx biome check path/to/file.tsx            # Lint single file
npm test -- ComponentName                    # Test single component
```

## Project Structure

```
app/                  → Pages, layouts, global CSS
app/styles/           → Modular CSS (tokens, base, components, layout, pages)
src/components/       → React components (organized by feature)
src/data/             → Static data (resume, projects, contact)
src/hooks/            → Custom React hooks
content/writing/      → Blog posts (Markdown with frontmatter)
src/data/writing.ts   → External writing links shown on `/writing`
public/images/        → Images and favicons
docs/                 → Documentation
```

## Code Style

**Do:**

- Use TypeScript strict mode, functional components with hooks
- Style with CSS custom properties in `app/styles/` (tokens in `tokens/`, components in `components/`)
- Keep components small and focused
- Use existing patterns from similar components
- Mark client components with `'use client'`
- Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Run `npm run format` before committing (CI enforces this)

**Don't:**

- Add new dependencies without clear need
- Create god components or monolithic files
- Hard-code colors—use CSS variables (`var(--color-*)`)
- Skip type annotations on function parameters
- Commit without running `npm run format` first

## Git Workflow

- Create a topic branch for every task; never commit or push directly to `main`
- Make small, frequent conventional commits as you go (e.g., `feat:`, `fix:`, `refactor:`)
- Push to your remote branch after every commit to keep it in sync
- Land changes on `main` by merging GitHub PRs with conventional-commit titles (deploys trigger automatically from these merges)
- If multiple PRs need to land together, open an integration branch PR; do not locally merge into `main`
- Treat `main` as protected: force-pushes and history rewrites require explicit user approval

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Biome · Vitest

## Key Patterns

- **Theming**: `data-theme` attribute on `<html>`, persisted to `window.localStorage` in client code/tests to avoid Node runtime globals leaking into browser-only paths
- **Static export**: `output: 'export'` for GitHub Pages—no server features
- **Canonical/export URLs**: When generating absolute URLs for metadata, RSS, sitemap, or schema, match `trailingSlash: true` output (`/about/`, `/writing/post-slug/`) instead of non-canonical no-slash variants; file-like routes such as `/feed.xml` and `/sitemap.xml` stay file-like
- **Page metadata**: Route-level `metadata` exports and `generateMetadata` should override `openGraph` and `twitter`, not just `title`/`description`, otherwise subpages inherit the homepage share card from `app/layout.tsx`; for `app/not-found.tsx`, omit `openGraph.url` because there is no stable canonical 404 route in the static export
- **Theme images**: Use `ThemePortrait` component for light/dark variants
- **Profile copy**: Keep role/bio updates in sync across `src/components/Template/Hero.tsx`, `app/layout.tsx` metadata, `src/data/about.ts`, and `src/data/resume/work.ts` so homepage copy, SEO, schema, and resume stay aligned
- **Long-form markdown pages**: Prefer a dedicated renderer component that can parse markdown into semantic sections instead of styling raw headings globally; if `markdown-to-jsx` causes dev/runtime issues in App Router, a `'use client'` boundary may still be required even without hooks. Preserve stable heading ids when converting markdown headings so deep links and `scroll-margin-top` behavior keep working, prefer a shared helper over duplicating slug logic in each page component, and expose those anchors in the UI with section nav or self-links if readers are expected to use them
- **Blog posts**: Markdown files in `content/writing/` with frontmatter (title, date, description); slug derived from filename
- **Writing page**: Add external links in `src/data/writing.ts` and keep dated entries sorted newest first; local posts still live in `content/writing/`

## Syncing With Upstream

This repo is a fork of `mldangelo/personal-site`, tracked as the `upstream` remote. It keeps its own visual identity (minimal styling, emerald `#10b981` accent), so an upstream sync is **not** a plain `git merge`.

- Take from upstream: dependency and security bumps, CI/tooling, build config, and portable correctness fixes.
- Keep ours: everything under `app/styles/`, page and component markup, `src/data/` content, and `content/writing/`.
- Upstream's `01d8968` ("Ground Station") replaces the palette and typography wholesale and was deliberately declined; the merge commit records it as an ancestor so it will not re-conflict on every future sync.
- Practical method: `git merge upstream/main --no-commit`, then `git read-tree -u --reset HEAD` to reset the tree to ours while keeping `MERGE_HEAD`, then `git checkout upstream/main -- <specific infra paths>`. This beats resolving conflicts file by file, because upstream changes to files we did not touch are auto-merged silently and would otherwise leak the redesign in.
- Do not let `actions/configure-pages` run its `static_site_generator: next` codemod. It rewrites `next.config.mjs` and drops `trailingSlash`, which breaks canonical and sitemap URLs on this project-path site. Read its `base_path` output into `NEXT_PUBLIC_BASE_PATH` instead.

## Testing

Tests live in `__tests__/` directories adjacent to the code they test. Run `npm test` before committing.

`npm run verify-export` checks the generated HTML for problems no component test can see: leaked drafts, contradictory robots tags, duplicate ids, missing canonicals, incomplete share metadata, and broken internal links. Run it after `npm run build`; CI runs it too. Note that component tests render each component alone, so anything about how components _combine_ on a page (duplicate anchor ids, for one) is invisible to them and needs a page-level test in `app/__tests__/`.

```bash
npm test                        # Run all tests
npm test -- --watch             # Watch mode
npm test -- ComponentName       # Run specific test
```

## Further Reading

- [README.md](./README.md) — Setup and deployment
- [docs/adapting-guide.md](./docs/adapting-guide.md) — Guide for forking and customizing
- [docs/design-goals.md](./docs/design-goals.md) — Architecture principles
- [docs/contributing.md](./docs/contributing.md) — Contribution guidelines

## Maintaining This Document

When creating a PR, audit this file and make small, targeted improvements based on your learnings—new patterns discovered, outdated references, or missing guidance that would have helped.
