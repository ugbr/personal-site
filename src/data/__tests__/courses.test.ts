import { describe, expect, it } from 'vitest';

import courses from '../resume/courses';

describe('courses data', () => {
  it('exports an array of courses', () => {
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  it('each course has required properties', () => {
    for (const course of courses) {
      expect(course).toHaveProperty('title');
      expect(course).toHaveProperty('provider');
      expect(course).toHaveProperty('year');

      expect(typeof course.title).toBe('string');
      expect(typeof course.provider).toBe('string');
      expect(typeof course.year).toBe('string');
    }
  });

  it('titles and providers are non-empty', () => {
    for (const course of courses) {
      expect(course.title.trim().length).toBeGreaterThan(0);
      expect(course.provider.trim().length).toBeGreaterThan(0);
    }
  });

  it('certificate urls are valid when present', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const course of courses) {
      if (course.certificateUrl) {
        expect(course.certificateUrl).toMatch(urlRegex);
      }
    }
  });

  it('has unique course titles', () => {
    const titles = courses.map((c) => c.title);
    const uniqueTitles = new Set(titles);

    expect(uniqueTitles.size).toBe(titles.length);
  });
});
