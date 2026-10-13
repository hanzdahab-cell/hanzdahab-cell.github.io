import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CourseGalleryImage } from '../../data/courseMedia';

export interface CourseStorySlide extends CourseGalleryImage {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  courseId: string;
  courseSlug: string;
  duration: string;
  depth?: string;
}

interface CoursePhotoCarouselProps {
  slides: CourseStorySlide[];
  onBook: (courseId: string) => void;
  onView: (courseSlug: string) => void;
  onCalendar: () => void;
  variant?: 'story' | 'gallery';
}

export function CoursePhotoCarousel({
  slides,
  onBook,
  onView,
  onCalendar,
  variant = 'story',
}: CoursePhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (
      slides.length < 2 ||
      isHovered ||
      isFocused ||
      prefersReducedMotion
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [isFocused, isHovered, prefersReducedMotion, slides.length]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex % slides.length];
  const showStory = variant === 'story';

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  return (
    <div
      role="region"
      aria-label={showStory ? 'Freediving course highlights' : `${activeSlide.title} photo gallery`}
      aria-roledescription="carousel"
      className={`group relative isolate overflow-hidden bg-[#081F35] ${
        showStory ? 'min-h-[390px] sm:min-h-[500px]' : 'aspect-[4/3] min-h-[280px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
    >
      <img
        key={activeSlide.src}
        src={activeSlide.src}
        alt={activeSlide.alt}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        fetchPriority={activeIndex === 0 && showStory ? 'high' : 'auto'}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${
          showStory
            ? 'bg-gradient-to-t from-[#081F35]/95 via-[#081F35]/20 to-[#081F35]/10'
            : 'bg-gradient-to-t from-[#081F35]/70 via-transparent to-transparent'
        }`}
      />

      <div
        className={`absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-[#081F35]/70 px-3 py-1 text-xs text-white backdrop-blur ${
          showStory ? '' : 'font-mono'
        }`}
        aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
      >
        {activeIndex + 1} / {slides.length}
      </div>

      {showStory && (
        <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 sm:p-8">
          <p className="text-sm font-medium text-white/90">{activeSlide.subtitle}</p>
          <h2 className="max-w-xl font-bebas text-4xl leading-none text-white sm:text-6xl">
            <button
              type="button"
              onClick={() => onView(activeSlide.courseSlug)}
              className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {activeSlide.title}
            </button>
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
            {activeSlide.detail}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/90">
            <span>{activeSlide.duration}</span>
            {activeSlide.depth && <span>{activeSlide.depth}</span>}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => onBook(activeSlide.courseId)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Enroll in course
            </button>
            <button
              type="button"
              onClick={onCalendar}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Our calendar
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous course photo"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/70 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next course photo"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/70 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
