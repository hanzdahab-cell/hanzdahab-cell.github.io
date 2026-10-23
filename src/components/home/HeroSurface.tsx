import { lazy, Suspense, useEffect, useRef, useState, type FocusEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import type { PageType } from '../../types';
import './HeroSurface.css';

const HeroLogo3D = lazy(() =>
  import('./HeroLogo3D').then((module) => ({ default: module.HeroLogo3D })),
);

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
}

const HERO_SLIDES = [
  {
    name: 'freedive-dahab-freediving-training-red-sea.png',
    alt: 'Freedivers training together in the clear water of Dahab',
  },
  {
    name: 'linda-paganelli-freedive-dahab-freediving.png',
    alt: 'Freediver Linda Paganelli exploring Dahab’s clear Red Sea water',
  },
];

export function HeroSurface({ onNavigate }: HeroSurfaceProps) {
  const { language } = useLanguage();
  const { line1, line1Highlight, line2 } = TRANSLATIONS[language].hero;
  const highlightStart = line1.toLocaleLowerCase().indexOf(line1Highlight.toLocaleLowerCase());
  const sloganHighlight = language === 'en' ? 'IN THE WORLD SINCE 2010' : '';
  const sloganHighlightStart = sloganHighlight
    ? line2.toLocaleUpperCase().indexOf(sloganHighlight)
    : -1;
  const headlineParts =
    highlightStart < 0
      ? [{ text: line1, highlighted: false }]
      : [
          { text: line1.slice(0, highlightStart), highlighted: false },
          {
            text: line1.slice(highlightStart, highlightStart + line1Highlight.length),
            highlighted: true,
          },
          {
            text: line1.slice(highlightStart + line1Highlight.length),
            highlighted: false,
          },
        ];
  const sloganParts =
    sloganHighlightStart < 0
      ? [{ text: line2, highlighted: false }]
      : [
          { text: line2.slice(0, sloganHighlightStart), highlighted: false },
          {
            text: line2.slice(
              sloganHighlightStart,
              sloganHighlightStart + sloganHighlight.length,
            ),
            highlighted: true,
          },
          {
            text: line2.slice(sloganHighlightStart + sloganHighlight.length),
            highlighted: false,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    if (isFocused || reducedMotion || !isVisible) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [isFocused, isVisible, reducedMotion]);

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
                className="car-05__slide-image"
                src={`/images/home-hero/source/${slide.name}`}
                alt=""
                aria-hidden="true"
                width="1672"
                height="941"
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
            {headlineParts.map((part, index) => (
              <span
                key={`${index}-${part.text}`}
                className={part.highlighted ? 'car-05__accent' : undefined}
              >
                {part.text}
              </span>
            ))}
          </h1>
          <Suspense
            fallback={
              <div className="car-05__logo-placeholder" aria-hidden="true">
                <img src="/logo-freedive-dahab.png" alt="" />
              </div>
            }
          >
            <HeroLogo3D />
          </Suspense>
          <p className="car-05__slogan">
            {sloganParts.map((part, index) => (
              <span
                key={`${index}-${part.text}`}
                className={part.highlighted ? 'car-05__accent' : undefined}
              >
                {part.text}
              </span>
            ))}
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
          <p
            className="car-05__trust"
            aria-label="4,800 plus certified divers, small groups, beginners welcome, SSI Pro Instructor Training Center number 720079"
          >
            <span className="car-05__trust-item">4,800+ CERTIFIED</span>
            <span className="car-05__trust-item">SMALL GROUPS</span>
            <span className="car-05__trust-item">BEGINNERS WELCOME</span>
            <span className="car-05__trust-item">SSI PRO ITC #720079</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
