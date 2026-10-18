import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import type { PageType } from '../../types';
import './HeroSurface.css';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
}

const HERO_SLIDES = [
  {
    name: 'freedive-team',
    alt: 'Freedivers training together in the clear water of Dahab',
    position: 'center 48%',
  },
  {
    name: 'cnf-record-one',
    alt: 'Egyptian freediver celebrating a national constant no fins record',
    position: 'center 38%',
  },
  {
    name: 'blue-water-diver',
    alt: 'A freediver moving through blue water in Dahab',
    position: 'center 46%',
  },
  {
    name: 'cnf-record-two',
    alt: 'Freediver holding the Egyptian flag after a record dive',
    position: 'center 42%',
  },
  {
    name: 'ras-mohammed',
    alt: 'A sea turtle swimming above a reef at Ras Mohammed',
    position: 'center 50%',
  },
  {
    name: 'lighthouse-freediver',
    alt: 'A freediver training at Lighthouse Bay in Dahab',
    position: 'center 55%',
  },
];

export function HeroSurface({ onNavigate }: HeroSurfaceProps) {
  const { language } = useLanguage();
  const [headline, foundingYear] = TRANSLATIONS[language].hero.line1
    .split(' — ')
    .map((part) => part.trim());

  const headlineWords = headline.split(/\s+/);
  const headlineLead = headlineWords.slice(0, Math.max(0, headlineWords.length - 2)).join(' ');
  const headlineTail = headlineWords.slice(-2).join(' ');

  const [activeIndex, setActiveIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPlayingThroughInteraction, setIsPlayingThroughInteraction] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const interactionPaused = (isHovered || isFocused) && !isPlayingThroughInteraction;

  useEffect(() => {
    if (manuallyPaused || interactionPaused || reducedMotion || !isVisible) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [interactionPaused, isVisible, manuallyPaused, reducedMotion]);

  const showSlide = (index: number) => {
    setActiveIndex((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const togglePlayback = () => {
    const nextPaused = !manuallyPaused;
    setManuallyPaused(nextPaused);
    setIsPlayingThroughInteraction(!nextPaused);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isFocused) setIsPlayingThroughInteraction(false);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsFocused(false);
    if (!isHovered) setIsPlayingThroughInteraction(false);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Freedive Dahab"
      aria-roledescription="carousel"
      className="car-05"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => {
        setIsFocused(true);
        setIsPlayingThroughInteraction(false);
      }}
      onBlurCapture={handleBlur}
    >
      <div className="car-05__deck">
        <div className="car-05__image-stack" aria-hidden="true">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.name}
              className={`car-05__slide ${index === activeIndex ? 'is-active' : ''}`}
            >
              <img
                src={`/images/home-hero/optimized/${slide.name}-1920.webp`}
                srcSet={[
                  `/images/home-hero/optimized/${slide.name}-1920.webp 1920w`,
                  `/images/home-hero/optimized/${slide.name}-3840.webp 3840w`,
                  `/images/home-hero/optimized/${slide.name}-7680.webp 7680w`,
                ].join(', ')}
                sizes="100vw"
                alt=""
                aria-hidden="true"
                width="7680"
                height="4320"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>

        <div className="car-05__shade" aria-hidden="true" />

        <div className="car-05__overlay">
          <h1 className="car-05__title">
            {headlineLead}{' '}
            <span className="car-05__title--accent">{headlineTail}</span>
          </h1>
          <img
            src="/logo-freedive-dahab.png"
            alt="Freedive Dahab"
            className="car-05__logo"
            fetchPriority="high"
          />
          <p className="car-05__year">{foundingYear}</p>
          <div className="car-05__actions">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="car-05__cta car-05__cta--sky"
            >
              Explore SSI Courses
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="car-05__cta car-05__cta--white"
            >
              Our Calendar
            </button>
          </div>
        </div>

        <div className="car-05__controls" role="group" aria-label="Slideshow controls">
          <button
            type="button"
            onClick={() => showSlide(activeIndex - 1)}
            aria-label="Show previous hero image"
            className="car-05__control"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="car-05__indicators" role="group" aria-label="Choose a hero image">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Show hero image ${index + 1} of ${HERO_SLIDES.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`car-05__indicator ${index === activeIndex ? 'is-active' : ''}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => showSlide(activeIndex + 1)}
            aria-label="Show next hero image"
            className="car-05__control"
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={
              reducedMotion
                ? 'Automatic hero slideshow disabled by reduced-motion preference'
                : manuallyPaused
                  ? 'Resume hero slideshow'
                  : 'Pause hero slideshow'
            }
            aria-pressed={manuallyPaused || reducedMotion}
            disabled={reducedMotion}
            className="car-05__control car-05__playback"
          >
            {manuallyPaused || reducedMotion ? (
              <Play aria-hidden="true" />
            ) : (
              <Pause aria-hidden="true" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
