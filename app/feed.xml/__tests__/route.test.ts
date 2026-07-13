import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';

import { GET } from '../route';

describe('feed.xml route', () => {
  it('renders a valid feed with the canonical writing channel link', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain('<rss');
    expect(xml).toContain(`<link>${SITE_URL}/writing/</link>`);
  });

  it('uses trailing-slash links for any post items', async () => {
    const response = await GET();
    const xml = await response.text();

    // The blog may be empty; when post items exist they must be trailing-slashed.
    const postLinks = [...xml.matchAll(/<link>(.*?)<\/link>/g)]
      .map((m) => m[1])
      .filter(
        (link) =>
          link.startsWith(`${SITE_URL}/writing/`) &&
          link !== `${SITE_URL}/writing/`,
      );

    expect(postLinks.every((link) => link.endsWith('/'))).toBe(true);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });
});
