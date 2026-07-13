import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Course from '../../Courses/Course';
import Courses from '../../Courses/Courses';

const mockCourses = [
  {
    title: 'Machine Learning Specialization',
    provider: 'Stanford Online & DeepLearning.AI (Coursera)',
    year: '2025',
    certificateUrl: 'https://example.com/cert-ml',
  },
  {
    title: 'Deep Learning',
    provider: 'DeepLearning.AI',
    year: '2026',
  },
];

describe('Courses', () => {
  it('renders all courses', () => {
    render(<Courses data={mockCourses} />);

    expect(
      screen.getByText('Machine Learning Specialization'),
    ).toBeInTheDocument();
    expect(screen.getByText('Deep Learning')).toBeInTheDocument();
  });

  it('renders providers and years', () => {
    render(<Courses data={mockCourses} />);

    expect(screen.getByText(/Stanford Online/)).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders courses as list items', () => {
    render(<Courses data={mockCourses} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockCourses.length);
  });
});

describe('Course', () => {
  it('renders title and provider', () => {
    render(<Course data={mockCourses[0]} />);

    expect(
      screen.getByText('Machine Learning Specialization'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Stanford Online/)).toBeInTheDocument();
  });

  it('renders a certificate link when a url is present', () => {
    render(<Course data={mockCourses[0]} />);

    const link = screen.getByRole('link', { name: /view certificate/i });
    expect(link).toHaveAttribute('href', 'https://example.com/cert-ml');
  });

  it('shows a pending state when no certificate url is present', () => {
    render(<Course data={mockCourses[1]} />);

    expect(screen.getByText(/certificate coming soon/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /view certificate/i }),
    ).not.toBeInTheDocument();
  });

  it('renders as a list item', () => {
    render(<Course data={mockCourses[0]} />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
