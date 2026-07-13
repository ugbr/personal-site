import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';
import sitemap from '../sitemap';

describe('sitemap', () => {
  it('uses trailing slashes for exported page routes', () => {
    const entries = sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: `${SITE_URL}/about/` }),
        expect.objectContaining({ url: `${SITE_URL}/resume/` }),
        expect.objectContaining({ url: `${SITE_URL}/courses/` }),
        expect.objectContaining({ url: `${SITE_URL}/projects/` }),
        expect.objectContaining({ url: `${SITE_URL}/writing/` }),
        expect.objectContaining({ url: `${SITE_URL}/contact/` }),
      ]),
    );
  });

  it('uses trailing slashes for any post routes', () => {
    const entries = sitemap();
    const postEntries = entries.filter(
      (entry) =>
        entry.url.startsWith(`${SITE_URL}/writing/`) &&
        entry.url !== `${SITE_URL}/writing/`,
    );

    // The blog may be empty; when posts exist, their URLs must be trailing-slashed.
    expect(postEntries.every((entry) => entry.url.endsWith('/'))).toBe(true);
  });
});
