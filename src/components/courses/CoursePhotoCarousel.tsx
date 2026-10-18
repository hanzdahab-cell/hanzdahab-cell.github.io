import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, CalendarDays, Pause, Play } from 'lucide-react';
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
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const motionPaused = isHovered || isFocused || prefersReducedMotion || manuallyPaused;

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
      motionPaused
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [motionPaused, slides.length]);

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
      className={`group relative isolate overflow-hidden rounded-3xl border border-white/15 bg-[#081F35] shadow-[0_24px_70px_rgba(0,0,0,0.38)] ${
        showStory ? 'h-[440px] sm:h-[360px] lg:h-[390px]' : 'aspect-[4/3] min-h-[12rem] sm:min-h-[280px]'
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
            ? 'bg-gradient-to-t from-[#081F35]/98 via-[#081F35]/40 to-[#081F35]/10'
            : 'bg-gradient-to-t from-[#081F35]/70 via-transparent to-transparent'
        }`}
      />

      {showStory && (
        <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#081F35]/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:left-7 sm:top-7">
          <span className="h-2 w-2 rounded-full bg-teal-300" aria-hidden="true" />
          Core course pathway
        </div>
      )}
      <div
        className={`absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-[#081F35]/70 px-3 py-1 text-xs text-white backdrop-blur ${
          showStory ? '' : 'font-mono'
        }`}
        role="status"
        aria-live="polite"
        aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
      >
        {activeIndex + 1} / {slides.length}
      </div>

      {showStory && (
        <div className="absolute inset-x-0 bottom-0 z-10 space-y-2.5 p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 sm:text-sm">
            {activeSlide.subtitle}
          </p>
          <h2 className="max-w-xl font-bebas text-3xl leading-[0.98] text-white sm:text-5xl">
            <button
              type="button"
              onClick={() => onView(activeSlide.courseSlug)}
              className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {activeSlide.title}
            </button>
          </h2>
          <p className="max-w-lg text-xs leading-relaxed text-white/90 sm:text-sm">
            {activeSlide.detail}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
              {activeSlide.duration}
            </span>
            {activeSlide.depth && (
              <span className="inline-flex items-center gap-1.5">
                <ArrowDownToLine className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                {activeSlide.depth}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => onBook(activeSlide.courseId)}
              className="fd-button inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
        <div
          className={`absolute right-4 z-20 flex items-center gap-2 sm:right-6 ${
            showStory
              ? 'top-14 sm:bottom-6 sm:top-auto'
              : 'bottom-4 sm:bottom-6'
          }`}
        >
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous course photo"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/70 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          {showStory && (
            <button
              type="button"
              onClick={() => setManuallyPaused((paused) => !paused)}
              aria-label={manuallyPaused ? 'Resume course carousel' : 'Pause course carousel'}
              aria-pressed={manuallyPaused}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/70 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {manuallyPaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
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
      {showStory && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/20"
        >
          <span
            className="block h-full bg-cyan-200 transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
