import type { Course as CourseType } from '@/data/resume/courses';

import Course from './Course';

interface CoursesProps {
  data: CourseType[];
}

export default function Courses({ data }: CoursesProps) {
  return (
    <ul className="course-list">
      {data.map((course) => (
        <Course data={course} key={course.title} />
      ))}
    </ul>
  );
}
