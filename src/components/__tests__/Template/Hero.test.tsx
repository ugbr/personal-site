import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Uguudei Bayaraa');
  });

  it('renders the tagline', () => {
    render(<Hero />);

    const tagline = document.querySelector('.hero-tagline');
    expect(tagline?.textContent).toMatch(/fullstack developer/i);
    expect(tagline?.textContent).toMatch(/agentic ai/i);
  });

  it('displays hero chips', () => {
    render(<Hero />);

    expect(screen.getByText('Fullstack')).toBeInTheDocument();
    expect(screen.getByText('Agentic AI')).toBeInTheDocument();
    expect(screen.getByText('TypeScript · Python')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<Hero />);

    const projectsButton = screen.getByRole('link', { name: /view projects/i });
    expect(projectsButton).toHaveAttribute('href', '/projects');
    expect(projectsButton).toHaveClass('button');

    const aboutButton = screen.getByRole('link', { name: /about me/i });
    expect(aboutButton).toHaveAttribute('href', '/about');
    expect(aboutButton).toHaveClass('button-secondary');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
