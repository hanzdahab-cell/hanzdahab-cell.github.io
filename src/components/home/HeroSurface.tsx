import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import type { PageType } from '../../types';
import './HeroSurface.css';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
}

const HERO_SLIDES = [
  {
    name: 'freedive-dahab-freediving-training-red-sea.webp',
    alt: 'Freedivers training together in the clear water of Dahab',
  },
  {
    name: 'linda-paganelli-freedive-dahab-freediving.webp',
    alt: 'Linda Paganelli freediving above a coral reef',
  },
  {
    name: 'ras-mohammed-red-sea-turtle-coral-reef.webp',
    alt: 'A sea turtle swimming above a reef at Ras Mohammed',
  },
  {
    name: 'dahab-lighthouse-bay-freediving-reef.webp',
    alt: 'Freediving at Lighthouse Bay in Dahab',
  },
  {
    name: 'freediving-blue-hole-sinai-red-sea-egypt.webp',
    alt: 'A freediver descending at the Blue Hole in Sinai',
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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  const interactionPaused = isHovered || isFocused;

  useEffect(() => {
    if (interactionPaused || reducedMotion || !isVisible) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [interactionPaused, isVisible, reducedMotion]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsFocused(false);
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
                className="car-05__slide-fill"
                src={`/images/home-hero/source/${slide.name}`}
                alt=""
                aria-hidden="true"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <img
                className="car-05__slide-full"
                src={`/images/home-hero/source/${slide.name}`}
                alt=""
                aria-hidden="true"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
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
          <p className="car-05__year">{foundingYear}</p>
          <img
            src="/logo-freedive-dahab.png"
            alt="Freedive Dahab"
            className="car-05__logo"
            fetchPriority="high"
          />
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
          <p className="car-05__trust-line">
            4,800+ certified freedivers <span aria-hidden="true">·</span> Small groups{' '}
            <span aria-hidden="true">·</span> Beginners welcome <span aria-hidden="true">·</span>{' '}
            SSI Pro #720079
          </p>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
