import type { Metadata } from 'next';

import Courses from '@/components/Courses/Courses';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import courses from '@/data/resume/courses';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';

const COURSES_URL = `${SITE_URL}/courses/`;

const COURSES_DESCRIPTION =
  'Courses and certificates Uguudei Bayaraa has completed in machine learning, AI, and data science.';

export const metadata: Metadata = createPageMetadata({
  title: 'Courses',
  description: COURSES_DESCRIPTION,
  path: '/courses/',
});

export default function CoursesPage() {
  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: COURSES_URL,
            name: 'Courses',
            description: COURSES_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(COURSES_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Courses', url: COURSES_URL },
          ]),
        ]}
      />
      <section className="courses-page">
        <header className="courses-header">
          <h1 className="page-title">Courses &amp; Certificates</h1>
          <p className="page-subtitle">
            Courses I&apos;ve worked through to keep sharpening my AI and
            machine learning skills.
          </p>
        </header>

        <Courses data={courses} />
      </section>
    </PageWrapper>
  );
}
