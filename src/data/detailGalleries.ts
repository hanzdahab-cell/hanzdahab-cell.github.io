import type { CardStackItem } from '../components/ui/CardStack';

const courseGalleryFiles: Record<string, string[]> = {
  'ssi-level-1': ['ssi-level-1-level1-main.jpg', 'ssi-level-1-freediving-courses.jpg', 'ssi-level-1-blue-hole.webp'],
  'ssi-level-2': ['ssi-level-2-level2-main.jpg', 'ssi-level-2-img-5462.jpg', 'ssi-level-2-freediving-course.jpg'],
  'ssi-level-3': ['ssi-level-3-freediving-dahab.webp', 'ssi-level-3-freediving-center.webp', 'ssi-level-3-lighthouse.jpg'],
  'spec-monofin': ['monofin-mono-fin.jpg', 'monofin-course.jpg'],
  'spec-mouthfill': ['mouthfill-course.jpg', 'mouthfill-course-1.jpg'],
  'fdd-equalization-clinic': ['equalization-clinic-workshop.jpg', 'equalization-clinic-techniques.webp', 'equalization-clinic-dahab.png'],
  'spec-variable-weight': ['variable-weight-dahab.jpg'],
  'spec-no-fins': ['no-fins-course.jpg', 'no-fins-dahab.jpg'],
  'spec-training-techniques': ['training-techniques-dahab.webp'],
  'spec-react-right': ['react-right-crossover.jpg', 'react-right-instructor.jpg'],
  'spec-marine-ecology': ['marine-ecology-dahab.jpg'],
  'ssi-itc': ['ssi-instructor-freediving.jpg', 'ssi-instructor-internship.jpg'],
  'ssi-advanced-instructor': ['ssi-advanced-instructor-training.jpg', 'ssi-advanced-instructor-img-703.jpg'],
  'ssi-performance-instructor': ['ssi-performance-instructor-training.jpg'],
};

export function getCourseDetailGalleryItems(courseId: string, title: string): CardStackItem[] {
  return (courseGalleryFiles[courseId] ?? []).map((file, index) => ({
    id: `${courseId}-gallery-${index + 1}`,
    title,
    description: `Course photo ${index + 1} of ${courseGalleryFiles[courseId].length}`,
    imageSrc: `/images/detail-galleries/courses/${encodeURIComponent(file)}`,
    imageAlt: `${title}, course photo ${index + 1}`,
    tag: 'Course gallery',
  }));
}

const packageGalleryFiles: Record<string, string[]> = {
  'ultimate-dahab-combo-week': ['training-zero-to-hero.jpg', 'training-freefall-master.jpg', 'training-week-bottom.jpg'],
  'depth-training-week': ['training-freefall-master.jpg', 'training-freediving-master.jpg', 'training-week-bottom.jpg'],
  'master-freediver-immersion': ['master-no-limits.jpg', 'master-no-fins.jpg', 'master-monofin.jpg', 'training-freediving-master.jpg'],
  'instructor-pathway': ['zero-to-hero.webp', 'zero-to-hero-course.jpg', 'zero-to-hero-training.jpg', 'training-instructor-internship.jpg', 'training-ssi-instructor.jpg'],
};

export function getPackageDetailGalleryItems(slug: string, title: string): CardStackItem[] {
  return (packageGalleryFiles[slug] ?? []).map((file, index) => ({
    id: `${slug}-gallery-${index + 1}`,
    title,
    description: `Package photo ${index + 1} of ${packageGalleryFiles[slug].length}`,
    imageSrc: `/images/detail-galleries/packages/${encodeURIComponent(file)}`,
    imageAlt: `${title}, package photo ${index + 1}`,
    tag: 'Package gallery',
  }));
}
