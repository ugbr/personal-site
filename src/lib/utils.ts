/**
 * Shared utility functions and constants
 */

// Site configuration
export const SITE_URL = 'https://uguudeib.com';
export const AUTHOR_NAME = 'Uguudei Bayaraa';
export const TWITTER_HANDLE = '';
export const SITE_IMAGE_PATH = '/images/me.jpg';

/**
 * basePath the site is served under, e.g. `/personal-site` on a GitHub Pages
 * project path. Empty for root domains. Inlined at build time by Next because
 * of the NEXT_PUBLIC_ prefix, so this works in client components too.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefixes a root-relative public asset path with the basePath.
 *
 * Next rewrites its own `_next/` URLs and `next/link` hrefs, but files served
 * straight out of `public/` are not rewritten: `next/image` leaves `src`
 * untouched under `unoptimized: true`, and a native `<img>` is never touched.
 * Without this, every image 404s on a project-path deploy.
 */
export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith('/')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
export const SITE_IMAGE_DIMENSIONS = {
  width: 1024,
  height: 1024,
} as const;

// Canonical one-line bio, shared across page metadata, OpenGraph, and JSON-LD.
export const SITE_DESCRIPTION =
  'Fullstack developer and AI engineer based in Ulaanbaatar, building web and mobile products and going deep on agentic AI.';

// Image dimension constants
export const AVATAR_SIZE = {
  hero: 120,
  footer: 80,
  sidebar: 200,
} as const;

export const PROJECT_IMAGE = {
  width: 600,
  height: 400,
} as const;

// Skill competency
export const MAX_COMPETENCY = 5;

/**
 * Formats a date string to a human-readable format.
 * Parses as UTC to avoid timezone shifts.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Parse as UTC to avoid timezone shifts
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
