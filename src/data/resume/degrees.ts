export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'The University of Chicago',
    degree: 'B.Sc. Computer Science',
    link: 'https://www.uchicago.edu',
    year: 2022,
  },
];

export default degrees;
