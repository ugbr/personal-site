export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  date: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

const data: Project[] = [
  {
    title: 'Structured Data Extractor',
    subtitle: 'Extraction pipeline + eval harness',
    link: 'https://github.com/ugbr/structured-data-extractor',
    image: '/images/projects/structured-data-extractor.svg',
    date: '2026-07-27',
    desc: 'Turns scanned receipts into validated JSON with the Anthropic API, then scores every field against hand-checked labels so I can say how accurate it really is and what it costs per thousand documents. The eval harness is the actual point.',
    tech: ['Python', 'Pydantic', 'Anthropic API', 'Evals'],
    featured: true,
  },
];

export default data;
