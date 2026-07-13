import type { Course as CourseType } from '@/data/resume/courses';

interface CourseProps {
  data: CourseType;
}

export default function Course({ data }: CourseProps) {
  const { title, provider, year, certificateUrl } = data;

  return (
    <li className="course-card">
      <div className="course-card-body">
        <h3 className="course-name">{title}</h3>
        <p className="course-provider">{provider}</p>
      </div>
      <div className="course-card-meta">
        <span className="course-year">{year}</span>
        {certificateUrl ? (
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="course-cert"
          >
            View certificate ↗
          </a>
        ) : (
          <span className="course-cert course-cert--pending">
            Certificate coming soon
          </span>
        )}
      </div>
    </li>
  );
}
