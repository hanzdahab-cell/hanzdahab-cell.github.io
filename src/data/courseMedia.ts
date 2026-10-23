export interface CourseGalleryImage {
  src: string;
  alt: string;
}

const uploadedPhotos = {
  freediver: {
    src: '/courses/uploaded/dahab-freediver-glide.jpeg',
    alt: 'Freediver gliding underwater through clear blue Red Sea water',
  },
  reefDiver: {
    src: '/courses/uploaded/dahab-reef-and-diver.jpg',
    alt: 'Freediver looking toward a colorful coral reef in Dahab',
  },
  lineTraining: {
    src: '/courses/uploaded/dahab-line-training.jpeg',
    alt: 'Freediver training beside a vertical line in the Red Sea',
  },
  dynamic: {
    src: '/courses/uploaded/dahab-freediver-dynamic.jpg',
    alt: 'Freediver moving through blue water during a training dive',
  },
  reef: {
    src: '/courses/uploaded/dahab-reef-fish.jpg',
    alt: 'Red Sea reef filled with colorful coral and fish',
  },
};

export const coreCoursePhotoById: Record<string, CourseGalleryImage> = {
  'ssi-basic-freediver': uploadedPhotos.dynamic,
  'ssi-level-1': uploadedPhotos.freediver,
  'ssi-level-2': uploadedPhotos.reefDiver,
  'ssi-level-3': uploadedPhotos.lineTraining,
};

export const coursePhotoById: Record<string, CourseGalleryImage> = {
  ...coreCoursePhotoById,
  'spec-advanced-pool': uploadedPhotos.dynamic,
  'spec-performance-pool': uploadedPhotos.lineTraining,
  'spec-photo': uploadedPhotos.reef,
  'spec-monofin': {
    src: '/courses/monofin.jpg',
    alt: 'SSI Monofin Course artwork',
  },
  'spec-mouthfill': {
    src: '/courses/mouthfill-workshop.jpg',
    alt: 'FDD Mouthfill Workshop in open water',
  },
  'fdd-equalization-clinic': {
    src: '/courses/equalization-clinic.webp',
    alt: 'FDD Equalization Clinic with an instructor in clear Red Sea water',
  },
  'spec-variable-weight': {
    src: '/courses/variable-weight.jpg',
    alt: 'SSI Variable Weight Course artwork',
  },
  'spec-no-fins': {
    src: '/courses/no-fins-freediving.jpg',
    alt: 'SSI No-Fins Freediving Course artwork',
  },
  'spec-training-techniques': {
    src: '/courses/training-techniques.jpg',
    alt: 'SSI Training Techniques Course artwork',
  },
  'spec-react-right': {
    src: '/courses/react-right.jpg',
    alt: 'SSI React Right Course artwork',
  },
  'spec-free-immersion': uploadedPhotos.freediver,
  'spec-marine-ecology': {
    src: '/courses/marine-ecology.jpg',
    alt: 'SSI Marine Ecology Course artwork',
  },
  'master-freediver': uploadedPhotos.lineTraining,
  'ssi-basic-instructor': uploadedPhotos.reefDiver,
  'ssi-itc': uploadedPhotos.dynamic,
  'ssi-advanced-instructor': uploadedPhotos.freediver,
};

export const ssiCourseArtworkBySlug: Record<string, CourseGalleryImage> = {
  'ssi-freediver-level-1': {
    src: '/courses/uploaded/ssi-freediver-level-1.jpg',
    alt: 'SSI Freediver Level 1 course artwork',
  },
  'ssi-advanced-freediver-level-2': {
    src: '/courses/uploaded/ssi-advanced-freediver-level-2.jpg',
    alt: 'SSI Advanced Freediver Level 2 course artwork',
  },
  'ssi-performance-freediver-level-3': {
    src: '/courses/uploaded/ssi-performance-freediver-level-3.jpg',
    alt: 'SSI Performance Freediver course artwork',
  },
};

export const courseCardArtworkById: Record<string, CourseGalleryImage> = {
  'ssi-basic-freediver': {
    src: '/cards/catalog/try-freediving.jpg',
    alt: 'Try freediving course card',
  },
  'ssi-level-1': {
    src: '/cards/core/freediving-level-1-ssi-certifcation-in-redsea-dahab.jpg',
    alt: 'SSI Freediver Level 1 course card',
  },
  'ssi-level-2': {
    src: '/cards/core/advanced-freediving-course-in-dahab-freedive-dahab.jpg',
    alt: 'SSI Advanced Freediver Level 2 course card',
  },
  'ssi-level-3': {
    src: '/cards/core/performance-freediver-course-in-dahab.jpg',
    alt: 'SSI Performance Freediver Level 3 course card',
  },
  'spec-advanced-pool': {
    src: '/cards/catalog/advanced-pool-freediver.jpg',
    alt: 'SSI Advanced Pool Freediver course card',
  },
  'spec-performance-pool': {
    src: '/cards/catalog/pool-freediving.jpg',
    alt: 'SSI Performance Pool Freediver course card',
  },
  'spec-photo': {
    src: '/cards/catalog/specialty-freediver.jpg',
    alt: 'Underwater photography specialty course card',
  },
  'spec-monofin': {
    src: '/courses/monofin.jpg',
    alt: 'SSI Monofin Course artwork',
  },
  'spec-mouthfill': {
    src: '/courses/mouthfill-workshop.jpg',
    alt: 'FDD Mouthfill Workshop in open water',
  },
  'fdd-equalization-clinic': {
    src: '/courses/equalization-clinic.webp',
    alt: 'FDD Equalization Clinic with an instructor in clear Red Sea water',
  },
  'spec-variable-weight': {
    src: '/courses/variable-weight.jpg',
    alt: 'SSI Variable Weight Course artwork',
  },
  'spec-no-fins': {
    src: '/cards/specialties/no-fins-freediving.jpg',
    alt: 'Constant weight no-fins specialty course card',
  },
  'spec-training-techniques': {
    src: '/courses/training-techniques.jpg',
    alt: 'SSI Training Techniques Course artwork',
  },
  'spec-react-right': {
    src: '/courses/react-right.jpg',
    alt: 'SSI React Right Course artwork',
  },
  'spec-free-immersion': {
    src: '/cards/catalog/free-immersion.jpg',
    alt: 'SSI Free Immersion specialty course card',
  },
  'spec-marine-ecology': {
    src: '/courses/marine-ecology.jpg',
    alt: 'SSI Marine Ecology Course artwork',
  },
  'master-freediver': {
    src: '/cards/catalog/master-freediver.jpg',
    alt: 'SSI Master Freediver course card',
  },
  'ssi-basic-instructor': {
    src: '/cards/specialties/basic-freediving-instructor.jpg',
    alt: 'SSI Basic Freediving Instructor course card',
  },
  'ssi-itc': {
    src: '/courses/uploaded/ssi-freediving-instructor-course.jpg',
    alt: 'SSI Freediving Instructor Course card',
  },
  'ssi-advanced-instructor': {
    src: '/courses/uploaded/ssi-advanced-freediving-instructor-course.jpg',
    alt: 'SSI Advanced Freediving Instructor Course card',
  },
};

export const freedivingGalleryPhotos = Object.values(uploadedPhotos);

export const desertExperiencePhotos: CourseGalleryImage[] = [
  {
    src: '/images/desert-gallery/sinai-desert-01.webp',
    alt: 'Sinai desert landscape near Dahab',
  },
  {
    src: '/images/desert-gallery/sinai-desert-02.webp',
    alt: 'Golden desert scenery in South Sinai',
  },
  {
    src: '/images/desert-gallery/sinai-desert-03.webp',
    alt: 'Mountain desert landscape in Sinai',
  },
  {
    src: '/images/desert-gallery/sinai-desert-04.webp',
    alt: 'Sinai desert scenery at sunset',
  },
];

export function getCourseGalleryImages(
  courseId: string,
  fallback: CourseGalleryImage
): CourseGalleryImage[] {
  const primary = coursePhotoById[courseId] ?? fallback;
  const additional = Object.values(uploadedPhotos).filter((photo) => photo.src !== primary.src);
  return [primary, ...additional].slice(0, 4);
}
