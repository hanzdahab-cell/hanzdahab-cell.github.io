import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  MapPin,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { PageType } from '../../types';
import { siteConfig } from '../../data/site';
import { PlatformMark } from '../footer/ReviewsCarousel';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
  onViewReviews: () => void;
}

const HERO_SLIDES = [
  {
    src: '/images/story-carousel/lighthouse-bay-team.webp',
    alt: 'Freedivers training together at Lighthouse Bay in Dahab',
    title: 'Lighthouse Bay, Dahab',
  },
  {
    src: '/images/story-carousel/blue-hole-freediver.jpg',
    alt: 'Freediver descending through the clear water of the Blue Hole',
    title: 'The Blue Hole',
  },
  {
    src: '/images/story-carousel/training-line.jpg',
    alt: 'Freediver training with an instructor beside a Red Sea dive line',
    title: 'Learn at your own pace',
  },
  {
    src: '/images/story-carousel/red-sea-reef.jpg',
    alt: 'Red Sea coral reef in clear blue water',
    title: 'The Red Sea',
  },
  {
    src: '/images/story-carousel/surface-session.jpg',
    alt: 'Freedivers sharing a calm surface session in Dahab',
    title: 'Find your first breath',
  },
];

export function HeroSurface({ onNavigate, onViewReviews }: HeroSurfaceProps) {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = HERO_SLIDES[activeIndex];
  const previousSlide = HERO_SLIDES[(activeIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length];
  const nextSlide = HERO_SLIDES[(activeIndex + 1) % HERO_SLIDES.length];

  const changeSlide = (direction: -1 | 1) => {
    setActiveIndex((index) => (index + direction + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#081F35] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_44%,rgba(34,98,140,0.32),transparent_48%),linear-gradient(115deg,#081F35_22%,#0E3453_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 w-1/2 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(169,210,236,0.55) 0.7px, transparent 0.7px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1440px] items-start gap-8 px-5 pb-12 pt-40 sm:px-8 sm:pb-16 sm:pt-44 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-12 lg:pt-44">
        <div className="relative z-10 max-w-2xl text-start">
          <p className="mb-5 flex items-center gap-2 text-sm font-alata text-[#A9D2EC]">
            <MapPin className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
            {t('hero.locationEyebrow')}
          </p>

          <h1
            className="max-w-xl text-balance font-tidal text-5xl leading-[0.98] tracking-[0.015em] text-white sm:text-6xl md:text-6xl xl:text-7xl"
            style={{
              fontFamily: isRtl
                ? "'Beiruti', sans-serif"
                : "'Tidal Astral Grotesk', 'Bebas Neue', sans-serif",
            }}
          >
            {t('hero.leadTitle')}
          </h1>

          <p className="mt-6 max-w-xl font-alata text-base leading-relaxed text-slate-200 sm:text-lg">
            {t('hero.leadDesc')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 font-alata text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('hero.exploreCourses')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-5 py-3 font-alata text-sm font-medium text-white transition-colors hover:border-cyan-200 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100"
            >
              {t('hero.bookInquireNow')}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3" role="group" aria-label="Follow Freedive Dahab">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram — @freedive_dahab"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook — Freedive Dahab"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.tripadvisor}
              target="_blank"
              rel="noreferrer"
              aria-label="TripAdvisor — Freedive Dahab reviews"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <PlatformMark platform="tripadvisor" />
            </a>
            <button
              type="button"
              onClick={onViewReviews}
              className="ms-1 inline-flex min-h-11 items-center gap-2 font-alata text-sm text-[#A9D2EC] underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('hero.readReviews')}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 font-alata text-xs text-slate-300 sm:text-sm">
            <span>{t('hero.line1')}</span>
            <span className="text-cyan-200/75">{t('hero.line2')}</span>
          </div>

          <a
            href="#story"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-alata text-xs text-[#A9D2EC] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
            <span>{t('hero.scrollExplore')}</span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] min-w-0 lg:me-0">
          <div
            className="relative h-[340px] w-full sm:h-[440px] lg:h-[min(68vh,620px)]"
            role="region"
            aria-label="Dahab freediving photo carousel"
            aria-roledescription="carousel"
          >
            {[previousSlide, nextSlide].map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                aria-hidden="true"
                className={`absolute top-[8%] hidden h-[78%] w-[58%] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0E3453] opacity-45 shadow-2xl sm:block ${
                  index === 0
                    ? 'start-0 -rotate-[7deg] translate-x-1/4'
                    : 'end-0 rotate-[7deg] -translate-x-1/4'
                }`}
              >
                <img
                  src={slide.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

            <figure
              aria-live="polite"
              aria-atomic="true"
              className="absolute inset-x-[4%] top-[2%] z-10 m-0 h-[84%] overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#0E3453] shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:inset-x-[12%] sm:h-[88%]"
            >
              <img
                key={activeSlide.src}
                src={activeSlide.src}
                alt={activeSlide.alt}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/90 via-transparent to-[#061A2B]/10"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <p className="text-xs font-alata text-[#A9D2EC]">
                    Dahab, South Sinai, Egypt
                  </p>
                  <h2 className="mt-1 font-bebas text-3xl tracking-wide text-white sm:text-4xl">
                    {activeSlide.title}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-white/35 bg-[#081F35]/50 px-3 py-1.5 font-alata text-xs text-white backdrop-blur">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>

            <div className="absolute inset-x-[4%] bottom-0 z-20 flex items-center justify-between sm:inset-x-[12%]">
              <div className="flex items-center gap-1" aria-label="Choose a featured photo">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show photo: ${slide.title}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    className="flex min-h-11 min-w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 rounded-full bg-white transition-[width,opacity] duration-300 motion-reduce:transition-none ${
                        index === activeIndex ? 'w-6 opacity-100' : 'w-2 opacity-45'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  aria-label="Show previous photo"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-[#081F35]/70 text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  aria-label="Show next photo"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-[#081F35]/70 text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 border-t border-white/15 pt-5 sm:mt-10 sm:justify-start">
            <span className="font-alata text-xs text-slate-300">SSI-certified training since 2003</span>
            <div className="flex items-center gap-5">
              <img
                src="/badges/ssi-freediving-center.png"
                alt="SSI Freediving Center"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <img
                src="/badges/ssi-instructor-training-center-transparent.png"
                alt="SSI Instructor Training Center"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
