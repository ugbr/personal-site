/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'E-Mongolia Academy',
    position: 'Software Engineer',
    startDate: '2022-08-01',
    summary: `E-Mongolia Academy builds the technology behind Mongolia's national e-government
    platform. I work across several government web and mobile apps, including e-Mongolia, which
    people around the country use to access public services.`,
    highlights: [
      'Build and maintain front-end and mobile apps for national government services.',
      'Own the CI/CD pipeline and ship to production reliably and often.',
      'Work on e-Mongolia, one of the most widely used government apps in the country.',
    ],
  },
  {
    name: 'Steppe Group',
    position: 'Software Developer Intern',
    startDate: '2021-06-01',
    endDate: '2021-09-01',
    summary: `A summer internship where I worked across the stack on a fintech product and the
    company's web presence.`,
    highlights: [
      'Built features for a fintech mobile app using Flutter.',
      'Developed the company landing page with Hugo.',
      'Worked on backend services using Appwrite.',
    ],
  },
];

export default work;
