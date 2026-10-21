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
      className={`course-carousel bg-[#020617] py-8 sm:py-10 ${
        isInView && isPageVisible ? '' : 'course-carousel--paused'
      }`}
      aria-label="Freediving courses; focus to pause scrolling"
      tabIndex={0}
    >
      <div className="course-carousel__viewport">
        <div className="course-carousel__track flex w-max">
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              className="course-carousel__set m-0 flex shrink-0 list-none items-center gap-10 p-0 pr-10 sm:gap-16 sm:pr-16"
              aria-hidden={isDuplicate || undefined}
            >
              {COURSES.map((course) => (
                <li
                  key={course}
                  className="course-carousel__item shrink-0 whitespace-nowrap font-bebas text-2xl tracking-[0.04em] text-white sm:text-3xl md:text-4xl"
                >
                  {course}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
