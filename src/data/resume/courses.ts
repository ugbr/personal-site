export interface Course {
  title: string;
  provider: string;
  year: string;
  /** Verification link, certificate PDF in /public, or hosted image. Optional. */
  certificateUrl?: string;
}

const courses: Course[] = [
  {
    title: 'Machine Learning Specialization',
    provider: 'Stanford Online & DeepLearning.AI (Coursera)',
    year: '2025',
  },
  {
    title:
      'Comprehensive AI & Data Science: From Fundamentals to Real-World Application',
    provider: 'Faculty of Science, Chulalongkorn University',
    year: '2026',
  },
];

export default courses;
