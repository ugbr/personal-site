import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumePage from '../resume/page';

/**
 * The resume sections used to carry their anchor ids twice: once on the
 * `<section>` in the page and again on a legacy `.link-to` offset div inside
 * each component. Duplicate ids make `#experience` ambiguous, and nothing in
 * the component tests could see it because each component rendered alone.
 */
describe('resume section anchors', () => {
  const sectionIds = ['experience', 'education', 'courses', 'skills'];

  it('renders each anchor exactly once', () => {
    const { container } = render(<ResumePage />);

    for (const id of sectionIds) {
      const matches = container.querySelectorAll(`[id="${id}"]`);
      expect(matches, `expected one #${id} anchor`).toHaveLength(1);
    }
  });

  it('puts every anchor on the section element the nav scrolls to', () => {
    const { container } = render(<ResumePage />);

    for (const id of sectionIds) {
      const anchor = container.querySelector(`[id="${id}"]`);
      expect(anchor?.tagName).toBe('SECTION');
      expect(anchor).toHaveClass('resume-section');
    }
  });
});
