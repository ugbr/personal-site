export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // Languages
  {
    title: 'TypeScript',
    competency: 5,
    category: ['Languages', 'Frontend', 'Backend'],
  },
  {
    title: 'JavaScript',
    competency: 5,
    category: ['Languages', 'Frontend', 'Backend'],
  },
  {
    title: 'Python',
    competency: 4,
    category: ['Languages', 'AI Engineering'],
  },
  {
    title: 'Dart',
    competency: 3,
    category: ['Languages', 'Mobile'],
  },
  {
    title: 'SQL',
    competency: 4,
    category: ['Languages', 'Databases'],
  },
  // Frontend
  {
    title: 'React',
    competency: 5,
    category: ['Frontend'],
  },
  {
    title: 'Next.js',
    competency: 4,
    category: ['Frontend'],
  },
  {
    title: 'HTML & CSS',
    competency: 5,
    category: ['Frontend'],
  },
  // Backend
  {
    title: 'Node.js',
    competency: 4,
    category: ['Backend'],
  },
  {
    title: 'FastAPI',
    competency: 3,
    category: ['Backend'],
  },
  {
    title: 'REST APIs',
    competency: 4,
    category: ['Backend'],
  },
  {
    title: 'Appwrite',
    competency: 3,
    category: ['Backend'],
  },
  // Databases
  {
    title: 'PostgreSQL',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'PostGIS',
    competency: 4,
    category: ['Databases'],
  },
  // AI Engineering
  {
    title: 'LLM APIs',
    competency: 4,
    category: ['AI Engineering'],
  },
  {
    title: 'AI Agents',
    competency: 4,
    category: ['AI Engineering'],
  },
  {
    title: 'RAG',
    competency: 3,
    category: ['AI Engineering'],
  },
  {
    title: 'Prompt Engineering',
    competency: 4,
    category: ['AI Engineering'],
  },
  // Mobile
  {
    title: 'Expo',
    competency: 5,
    category: ['Mobile'],
  },
  {
    title: 'Flutter',
    competency: 3,
    category: ['Mobile'],
  },
  // Infrastructure
  {
    title: 'CI/CD',
    competency: 4,
    category: ['Infrastructure'],
  },
  {
    title: 'Google Cloud Platform',
    competency: 4,
    category: ['Infrastructure'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['Infrastructure'],
  },
  {
    title: 'Git',
    competency: 5,
    category: ['Infrastructure'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Build categories from skills, all using the accent color token.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
