import type { Course as CourseType } from '@/data/resume/courses';

interface CourseProps {
  data: CourseType;
}

export default function Course({ data }: CourseProps) {
  const { title, provider, year, certificateUrl } = data;

  return (
    <li className="course-card">
      <div className="course-card-body">
        <span className="course-year">{year}</span>
        <h4 className="course-name">{title}</h4>
        <p className="course-provider">{provider}</p>
      </div>
      <div className="course-card-footer">
        {certificateUrl ? (
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="course-cert"
          >
            View certificate
            <span className="course-cert-arrow" aria-hidden="true">
              ↗
            </span>
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
