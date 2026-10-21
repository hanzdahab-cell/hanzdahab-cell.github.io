import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { PageType } from '../../types';

interface DahabBlueHoleSectionProps {
  onNavigate: (page: PageType) => void;
}

const STORY_SLIDES = [
  {
    src: '/images/dahab-story/lighthouse-training.jpg',
    title: 'Why Dahab Is Ideal for Freediving',
    alt: "Freedivers entering the clear water at Dahab's Lighthouse Bay",
    detail:
      "Dahab's unique geography gives freedivers everything they need, all within a short walk of the shore.",
  },
  {
    src: '/images/dahab-story/blue-hole-training.jpg',
    title: 'Lighthouse Bay — The Perfect Starting Point',
    alt: 'Freedivers preparing for a supervised session at the Blue Hole',
    detail:
      'Lighthouse Bay — The Perfect Starting Point\nShallow, sheltered and calm, Lighthouse Bay is where every freediving journey begins. Easy shore access and gentle conditions make it ideal for first breath-holds, skills practice and confidence-building at any level.',
  },
  {
    src: '/images/dahab-story/lighthouse-sunset.jpg',
    title: 'The Blue Hole — Deep Water, Minutes Away',
    alt: "Freedivers sharing the water at sunset along Dahab's shore",
    detail:
      'A world-famous freediving site, the Blue Hole drops to over 100 metres just meters from the shoreline — no boat required. Its sheer depth and calm, current-free water make it the perfect training ground for divers chasing new personal bests.',
  },
  {
    src: '/images/dahab-story/line-coaching.jpg',
    title: 'Warm Water, Year-Round Visibility',
    alt: 'An instructor guiding a freediver beside the training line',
    detail:
      'With water temperatures rarely dropping below 24°C and visibility often exceeding 20 metres, Dahab offers some of the most consistent conditions in the world — so every session counts, whatever the season.',
  },
];

export function DahabBlueHoleSection({ onNavigate }: DahabBlueHoleSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slide = STORY_SLIDES[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % STORY_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const showSlide = (index: number) => {
    setActiveIndex((index + STORY_SLIDES.length) % STORY_SLIDES.length);
    setPaused(true);
  };

  return (
    <section
      id="dahab-blue-hole"
      className="relative overflow-hidden border-t border-white/5 bg-transparent px-6 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div className="max-w-lg">
          <p className="mb-5 flex items-center gap-2 text-sm text-[#A9D2EC]">
            <MapPin className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            Dahab, South Sinai, Egypt · Red Sea
          </p>
          <h2 className="font-bebas text-5xl leading-[0.98] tracking-wide text-white sm:text-6xl lg:text-7xl">
            {slide.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
            {slide.detail}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('experience')}
            className="fd-button mt-8 inline-flex min-h-11 items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore Dahab experiences
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className="min-w-0"
          role="region"
          aria-roledescription="carousel"
          aria-label="Dahab and Blue Hole photo story"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <figure aria-live={paused ? 'polite' : 'off'} aria-atomic="true">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#081F35] sm:aspect-[16/10]">
              {STORY_SLIDES.map((item, index) => (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  aria-hidden={index !== activeIndex}
                />
              ))}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/95 via-[#061A2B]/10 to-transparent"
              />
              <img
                src="/logo-freedive-dahab.png"
                alt=""
                aria-hidden="true"
                className="absolute right-5 top-5 z-10 h-10 w-12 object-contain opacity-75 drop-shadow-lg sm:right-7 sm:top-7"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-sm font-semibold text-[#A9D2EC]">{slide.title}</p>
              </figcaption>
            </div>
          </figure>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-label="Choose a photo">
              {STORY_SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`min-h-11 min-w-11 rounded-full p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                      index === activeIndex ? 'w-7 bg-cyan-300' : 'w-3 bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 text-xs text-slate-300" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')} / {String(STORY_SLIDES.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => showSlide(activeIndex - 1)}
                aria-label="Show previous photo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => showSlide(activeIndex + 1)}
                aria-label="Show next photo"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
