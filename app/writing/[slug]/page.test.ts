import { describe, expect, it } from 'vitest';

import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/utils';

import { generateMetadata, generateStaticParams } from './page';

describe('writing post metadata', () => {
  it('exposes static params as an array (empty when no posts exist)', () => {
    expect(Array.isArray(generateStaticParams())).toBe(true);
  });

  it('falls back to a not-found title for unknown slugs', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'does-not-exist' }),
    });

    expect(metadata.title).toBe('Post Not Found');
    expect(metadata.openGraph?.url).toBeUndefined();
  });

  it('uses a trailing-slash canonical URL for any real post', async () => {
    const [post] = getAllPosts();

    // Only assert canonical formatting when at least one post is present.
    if (!post) return;

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: post.slug }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/${post.slug}/`);
  });
});
