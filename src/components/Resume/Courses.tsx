import type { Course as CourseType } from '@/data/resume/courses';

import Course from './Courses/Course';

interface CoursesProps {
  data: CourseType[];
}

export default function Courses({ data }: CoursesProps) {
  return (
    <div className="courses">
      <div className="link-to" id="courses" />
      <div className="title">
        <h3>Courses</h3>
      </div>
      <ul className="course-list">
        {data.map((course) => (
          <Course data={course} key={course.title} />
        ))}
      </ul>
    </div>
  );
}
