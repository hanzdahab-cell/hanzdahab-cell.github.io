import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import { SSI_BADGES } from '../../data/ssiBadges';
import type { PageType } from '../../types';
import './HeroSurface.css';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
}

const HERO_SLIDES = [
  {
    name: 'freedive-dahab-freediving-training-red-sea.png',
    alt: 'Freedivers training together in the clear water of Dahab',
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

  const yearWords = foundingYear.split(' ');
  const yearLead = yearWords.slice(0, -1).join(' ');
  const yearTail = yearWords[yearWords.length - 1];

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
          <p className="car-05__year">
            {yearLead}{' '}
            <span className="car-05__year-accent">{yearTail}</span>
          </p>
          <img
            src="/logo-freedive-dahab.png"
            alt="Freedive Dahab"
            className="car-05__logo"
            fetchPriority="high"
          />
          <p className="car-05__slogan">
            THE DEEPER YOU GO{' '}
            <span className="car-05__slogan--accent">THE QUIETER IT BECOMES</span>
          </p>
          <div className="car-05__actions">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="car-05__cta car-05__cta--primary"
            >
              SSI Freediving Courses
              <ArrowRight className="car-05__cta-arrow" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="car-05__cta car-05__cta--secondary"
            >
              View Calendar
              <ArrowUpRight className="car-05__cta-arrow" aria-hidden="true" />
            </button>
          </div>
          <ul className="car-05__badges" aria-label="SSI certifications">
            {SSI_BADGES.map((badge) => (
              <li key={badge.id} className="car-05__badge" title={badge.title}>
                <img src={badge.src} alt={badge.alt} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
