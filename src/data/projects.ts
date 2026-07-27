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
  {
    title: 'Agentic AI Assistant',
    subtitle: 'In progress',
    // Placeholder until this one is far enough along to write up properly.
    image: '/images/projects/placeholder.svg',
    date: '2026-01-01',
    desc: "An AI agent that can plan a task, call tools, and follow through on its own. I'm building this now and will write it up properly once it's further along.",
    tech: ['Python', 'LLM', 'Agents'],
    featured: true,
  },
  {
    title: 'RAG Knowledge App',
    subtitle: 'In progress',
    link: 'https://github.com/ugbr',
    image: '/images/projects/placeholder.svg',
    date: '2025-12-01',
    desc: 'A retrieval-augmented app that answers questions over a private set of documents, with citations. Another one in the works, follow along on GitHub.',
    tech: ['Next.js', 'TypeScript', 'RAG'],
  },
];

export default data;
