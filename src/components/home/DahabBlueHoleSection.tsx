import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { PageType } from '../../types';

interface DahabBlueHoleSectionProps {
  onNavigate: (page: PageType) => void;
}

const STORY_SLIDES = [
  {
    src: '/images/dahab-story/lighthouse-training.jpg',
    title: 'Lighthouse Bay',
    alt: 'Freedivers entering the clear water at Dahab’s Lighthouse Bay',
    detail:
      'Sheltered shallows make Lighthouse Bay a welcoming place to learn. Instructors build each session around calm technique and safe buddy practice.',
  },
  {
    src: '/images/dahab-story/blue-hole-training.jpg',
    title: 'The Blue Hole',
    alt: 'Freedivers preparing for a supervised session at the Blue Hole',
    detail:
      'The Blue Hole is a coastal sinkhole reaching roughly 92 metres. Depth training is planned around each diver’s level and conducted with trained supervision.',
  },
  {
    src: '/images/dahab-story/lighthouse-sunset.jpg',
    title: 'A town beside the sea',
    alt: 'Freedivers sharing the water at sunset along Dahab’s shore',
    detail:
      'Dahab’s shoreline brings the water close to town. Training, cafés and local life sit side by side along the Gulf of Aqaba.',
  },
  {
    src: '/images/dahab-story/line-coaching.jpg',
    title: 'Progress, one session at a time',
    alt: 'An instructor guiding a freediver beside the training line',
    detail:
      'Line sessions give divers a clear reference for controlled descents. Coaching focuses on equalisation, relaxation and a safe return to the surface.',
  },
  {
    src: '/images/dahab-story/freediver-ascent.jpg',
    title: 'A different perspective',
    alt: 'A freediver moving slowly through the blue water in Dahab',
    detail:
      'The Red Sea’s clear water reveals the reef as divers move through the depth. Every dive is paced to the individual, not a number.',
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
            Dahab, South Sinai · Red Sea
          </p>
          <h2 className="font-bebas text-5xl leading-[0.98] tracking-wide text-white sm:text-6xl lg:text-7xl">
            Dahab and
            <br />
            the Blue Hole
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
            A Bedouin town on the Gulf of Aqaba, with the coral-framed Blue Hole to the north and
            Lighthouse Bay at the heart of local freediving. Move through the places, people and
            training that make Dahab a place to return to.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('experience')}
            className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-sm font-semibold text-[#A9D2EC]">{slide.title}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white sm:text-base">
                  {slide.detail}
                </p>
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
