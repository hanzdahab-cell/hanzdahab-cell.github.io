import { useEffect, useRef, useState } from 'react';
import './CourseCarousel.css';

const COURSES = [
  'Freediving Instructor Training Course',
  'Freediving Recognition',
  'No-Fins Freediving',
  'Advanced Freediver',
  'Freediver',
  'Performance Freediver',
  'Training Techniques',
  'Variable Weight',
  'Mouth-fill Workshops',
  'Equalization Clinic',
];

export function CourseCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '64px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`course-carousel ocean-surface film-grain relative overflow-hidden py-8 sm:py-10 ${
        isInView && isPageVisible ? '' : 'course-carousel--paused'
      }`}
      aria-label="Freediving courses; focus to pause scrolling"
      tabIndex={0}
    >
      <div aria-hidden="true" className="course-carousel__glow" />
      <div className="course-carousel__viewport relative z-10">
        <div className="course-carousel__track flex w-max">
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              className="course-carousel__set m-0 flex shrink-0 list-none items-center gap-8 p-0 pr-8 sm:gap-12 sm:pr-12 md:gap-16 md:pr-16"
              aria-hidden={isDuplicate || undefined}
            >
              <li className="course-carousel__brand shrink-0">
                <img
                  src="/logo-freedive-dahab.png"
                  alt={isDuplicate ? '' : 'Freedive Dahab'}
                  className="h-8 w-auto max-w-none object-contain sm:h-9 md:h-10"
                  width="843"
                  height="645"
                  loading="lazy"
                  decoding="async"
                />
              </li>
              {COURSES.map((course) => (
                <li
                  key={course}
                  className="course-carousel__item shrink-0 whitespace-nowrap font-bebas text-2xl tracking-[0.04em] text-white sm:text-3xl md:text-4xl"
                >
                  {course}
                </li>
              ))}
              <li className="course-carousel__brand shrink-0">
                <img
                  src="/badges/ssi-logo-white.png"
                  alt={isDuplicate ? '' : 'SSI Freediving'}
                  className="h-8 w-auto max-w-none object-contain sm:h-9 md:h-10"
                  width="2048"
                  height="456"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
