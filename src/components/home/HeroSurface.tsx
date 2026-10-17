import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  MapPin,
  Pause,
  Play,
} from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import { PageType } from '../../types';
import { siteConfig } from '../../data/site';
import { PlatformMark } from '../footer/ReviewsCarousel';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
  onViewReviews: () => void;
}

const HERO_IMAGES = [
  '/images/story-carousel/blue-hole-freediver.jpg',
  '/images/philosophy/team.jpg',
  '/images/story-carousel/training-line.jpg',
  '/images/philosophy/school.jpg',
  '/images/story-carousel/surface-session.jpg',
];

function cardOffset(index: number, active: number, total: number): number {
  const raw = (index - active + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

export function HeroSurface({ onNavigate, onViewReviews }: HeroSurfaceProps) {
  const { t } = useTranslation();
  const { isRtl, language } = useLanguage();
  const copy = TRANSLATIONS[language].hero;
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerCurrentX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [motionRequested, setMotionRequested] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [liveStatus, setLiveStatus] = useState('');
  const inView = useInView(stageRef, { amount: 0.15 });
  const slides = copy.carouselSlides;
  const activeSlide = slides[activeIndex];
  const canAnimate = !prefersReducedMotion || motionRequested;
  const isCarouselPlaying = isPlaying && canAnimate;
  const transitionDuration = canAnimate ? 0.65 : 0.01;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setStageSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (
      !isCarouselPlaying ||
      isHovered ||
      isFocused ||
      !isDocumentVisible ||
      !inView ||
      slides.length < 2
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [inView, isCarouselPlaying, isDocumentVisible, isFocused, isHovered, slides.length]);

  const showSlide = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setActiveIndex(nextIndex);
    setIsPlaying(false);
    setLiveStatus(copy.slideAnnouncement(nextIndex + 1, slides.length, slides[nextIndex].title));
  };

  const toggleCarousel = () => {
    if (isCarouselPlaying) {
      setIsPlaying(false);
      return;
    }
    setMotionRequested(true);
    setIsPlaying(true);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return;
    pointerStartX.current = event.clientX;
    pointerCurrentX.current = event.clientX;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' && pointerStartX.current !== null) {
      pointerCurrentX.current = event.clientX;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch' || pointerStartX.current === null) return;
    const delta = pointerCurrentX.current - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) >= 40) {
      showSlide(activeIndex + (delta < 0 ? 1 : -1));
    }
  };

  const width = stageSize.width || 600;
  const height = stageSize.height || 500;
  const centerCardWidth = Math.min(width * 0.6, width < 640 ? 260 : 360);
  const sideCardWidth = centerCardWidth * 0.78;
  const cardHeight = Math.min(height * 0.9, centerCardWidth * 1.18);
  const cardGap = Math.max(12, centerCardWidth * 0.08);

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#081F35] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_44%,rgba(34,98,140,0.32),transparent_48%),linear-gradient(115deg,#081F35_22%,#0E3453_100%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1440px] items-center gap-6 px-5 pb-10 pt-32 sm:gap-8 sm:px-8 sm:pb-12 sm:pt-36 md:grid-cols-[0.82fr_1.18fr] md:gap-8 md:px-8 md:pt-32 xl:gap-10 xl:px-12">
        <div className="relative z-10 max-w-2xl text-start">
          <p className="mb-5 flex items-center gap-2 font-alata text-sm text-[#A9D2EC] sm:mb-6">
            <MapPin className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
            {copy.locationEyebrow}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`copy-${activeIndex}`}
              initial={{ opacity: 0, y: canAnimate ? 10 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: canAnimate ? -8 : 0 }}
              transition={{ duration: Math.min(transitionDuration, 0.35) }}
            >
              <p className="mb-3 font-alata text-sm font-semibold text-cyan-200 sm:text-base">
                {activeSlide.eyebrow}
              </p>
              <h1
                className="max-w-[13ch] text-balance font-bebas text-5xl leading-[0.94] tracking-[0.015em] text-white sm:text-6xl md:text-5xl xl:text-7xl"
                aria-live="off"
              >
                {activeSlide.title}
              </h1>
              <p className="mt-5 max-w-xl font-alata text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 font-alata text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('hero.exploreCourses')}
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-5 py-3 font-alata text-sm font-medium text-white transition-colors hover:border-cyan-200 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100"
            >
              {t('hero.bookInquireNow')}
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8" role="group" aria-label="Follow Freedive Dahab">
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

          <a
            href="#story"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-alata text-xs text-[#A9D2EC] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
            <span>{t('hero.scrollExplore')}</span>
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] min-w-0 lg:me-0">
          <div
            ref={stageRef}
            className="relative h-[340px] w-full touch-pan-y sm:h-[440px] md:h-[min(62vh,500px)]"
            role="region"
            aria-label={copy.carouselLabel}
            aria-roledescription="carousel"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsFocused(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                showSlide(activeIndex + (isRtl ? 1 : -1));
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                showSlide(activeIndex + (isRtl ? -1 : 1));
              }
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartX.current = null;
            }}
          >
            {slides.map((slide, index) => {
              const offset = cardOffset(index, activeIndex, slides.length);
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              const cardWidth = isCenter ? centerCardWidth : sideCardWidth;
              const spread =
                centerCardWidth * 0.64 +
                cardGap +
                (absOffset > 1 ? sideCardWidth * 0.78 : 0);
              const x =
                width / 2 -
                cardWidth / 2 +
                (offset === 0 ? 0 : (offset < 0 ? -1 : 1) * spread);

              return (
                <motion.figure
                  key={HERO_IMAGES[index]}
                  aria-hidden={!isCenter}
                  className="absolute left-0 top-0 m-0 overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#0E3453] shadow-[0_32px_90px_rgba(0,0,0,0.45)]"
                  initial={false}
                  animate={{
                    x,
                    y: height / 2 - cardHeight / 2,
                    width: cardWidth,
                    height: cardHeight,
                    opacity: absOffset > 2 ? 0 : absOffset === 2 ? 0.18 : absOffset === 1 ? 0.62 : 1,
                    scale: isCenter ? 1 : 0.96,
                    rotateY: offset === 0 ? 0 : offset < 0 ? 7 : -7,
                    zIndex: isCenter ? 30 : absOffset === 1 ? 20 : 10,
                  }}
                  transition={{
                    duration: transitionDuration,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={HERO_IMAGES[index]}
                    alt={isCenter ? slide.alt : ''}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061A2B]/85 via-transparent to-[#061A2B]/10"
                  />
                  {isCenter && (
                    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                      <span className="font-alata text-sm text-white sm:text-base">
                        Dahab, South Sinai, Egypt
                      </span>
                      <span className="shrink-0 rounded-full border border-white/35 bg-[#081F35]/60 px-3 py-1.5 font-alata text-xs text-white backdrop-blur">
                        {String(activeIndex + 1).padStart(2, '0')} /{' '}
                        {String(slides.length).padStart(2, '0')}
                      </span>
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-1 sm:mt-3">
            <button
              type="button"
              onClick={() => showSlide(activeIndex + (isRtl ? 1 : -1))}
              aria-label={copy.previousPhoto}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#081F35]/70 text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {slides.map((slide, index) => (
              <button
                key={HERO_IMAGES[index]}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={copy.showPhotoLabel(index + 1, slide.title)}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="inline-flex h-11 min-w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full bg-white transition-[width,opacity] duration-300 motion-reduce:transition-none ${
                    index === activeIndex ? 'w-6 opacity-100' : 'w-2 opacity-45'
                  }`}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={toggleCarousel}
              aria-label={isCarouselPlaying ? copy.pauseCarousel : copy.resumeCarousel}
              aria-pressed={isCarouselPlaying}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#081F35]/70 text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isCarouselPlaying ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => showSlide(activeIndex + (isRtl ? -1 : 1))}
              aria-label={copy.nextPhoto}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#081F35]/70 text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {liveStatus}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 border-t border-white/15 pt-4 sm:mt-6 sm:justify-start sm:pt-5">
            <span className="font-alata text-xs text-slate-300">
              SSI-certified training since 2003
            </span>
            <div className="flex items-center gap-4 sm:gap-5">
              <img
                src="/badges/ssi-freediving-center.png"
                alt="SSI Freediving Center"
                className="h-11 w-11 object-contain sm:h-14 sm:w-14"
              />
              <img
                src="/badges/ssi-instructor-training-center-transparent.png"
                alt="SSI Instructor Training Center"
                className="h-11 w-11 object-contain sm:h-14 sm:w-14"
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
