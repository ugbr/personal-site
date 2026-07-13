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

// Placeholders for now. These get replaced with real write-ups as projects ship.
const data: Project[] = [
  {
    title: 'Agentic AI Assistant',
    subtitle: 'In progress',
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
