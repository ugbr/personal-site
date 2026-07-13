import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the intro section', () => {
    expect(aboutMarkdown).toContain('# Intro');
    expect(aboutMarkdown).toContain('Ulaanbaatar');
    expect(aboutMarkdown).toContain('E-Mongolia Academy');
  });

  it('contains the origin story', () => {
    expect(aboutMarkdown).toContain('# How I Got Here');
    expect(aboutMarkdown).toContain('Minecraft');
  });

  it('contains the current focus section', () => {
    expect(aboutMarkdown).toContain("# What I'm Into Now");
    expect(aboutMarkdown).toContain('agentic AI');
  });

  it('contains the likes section', () => {
    expect(aboutMarkdown).toContain('# A Few Things I Like');
    expect(aboutMarkdown).toContain('Chess');
  });

  it('contains the aspirations section', () => {
    expect(aboutMarkdown).toContain("# What I'm Aiming For");
  });

  it('does not use em dashes', () => {
    expect(aboutMarkdown).not.toContain('—');
  });

  it('contains at least one markdown link', () => {
    const linkRegex = /\[.+?\]\(.+?\)/g;
    const links = aboutMarkdown.match(linkRegex);

    expect(links).not.toBeNull();
    expect(links!.length).toBeGreaterThanOrEqual(1);
  });

  it('contains properly formatted headers', () => {
    const headerRegex = /^#+ .+$/gm;
    const headers = aboutMarkdown.match(headerRegex);

    expect(headers).not.toBeNull();
    expect(headers!.length).toBeGreaterThanOrEqual(4);
  });
});
