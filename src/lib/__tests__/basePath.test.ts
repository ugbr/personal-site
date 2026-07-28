import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * These only bite on a project-path deploy (github.io/personal-site), where
 * NEXT_PUBLIC_BASE_PATH is set. Every local build and three of the four CI
 * matrix legs run with it empty, so a regression here is invisible until the
 * images 404 in production. Reload the module per case because BASE_PATH is
 * read once at module scope, exactly as Next inlines it at build time.
 */
async function loadWithBasePath(basePath: string | undefined) {
  vi.resetModules();
  if (basePath === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  } else {
    process.env.NEXT_PUBLIC_BASE_PATH = basePath;
  }
  return import('../utils');
}

describe('withBasePath', () => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
  });

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
    } else {
      process.env.NEXT_PUBLIC_BASE_PATH = original;
    }
    vi.resetModules();
  });

  it('leaves paths alone when no basePath is configured', async () => {
    const { withBasePath } = await loadWithBasePath(undefined);
    expect(withBasePath('/images/me.jpg')).toBe('/images/me.jpg');
  });

  it('prefixes public asset paths on a project-path deploy', async () => {
    const { withBasePath } = await loadWithBasePath('/personal-site');
    expect(withBasePath('/images/me.jpg')).toBe('/personal-site/images/me.jpg');
    expect(withBasePath('/images/projects/extractor.svg')).toBe(
      '/personal-site/images/projects/extractor.svg',
    );
  });

  it('does not double-prefix an already-prefixed path', async () => {
    const { withBasePath } = await loadWithBasePath('/personal-site');
    expect(withBasePath('/personal-site/images/me.jpg')).toBe(
      '/personal-site/images/me.jpg',
    );
  });

  it('leaves absolute and relative URLs untouched', async () => {
    const { withBasePath } = await loadWithBasePath('/personal-site');
    expect(withBasePath('https://example.com/a.png')).toBe(
      'https://example.com/a.png',
    );
    expect(withBasePath('./a.png')).toBe('./a.png');
  });
});
