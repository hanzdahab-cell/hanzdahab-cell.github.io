import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Languages, Pause, Play, ShieldCheck } from 'lucide-react';
import { PageType } from '../../types';

interface StoryHeroCarouselProps {
  onNavigate: (page: PageType) => void;
}

const SLIDES = [
  {
    image: '/images/story-carousel/lighthouse-bay-team.webp',
    alt: 'Freedive Dahab instructors and students sharing a surface session at Lighthouse Bay',
    eyebrow: 'A school built around people',
    title: 'Find your people in Dahab.',
    description:
      'Small-group freediving, patient coaching and a warm welcome for every level at our home in Lighthouse Bay.',
    detail: 'Beginners welcome',
  },
  {
    image: '/images/story-carousel/blue-hole-freediver.jpg',
    alt: 'A freediver moving through the Blue Hole’s clear water',
    eyebrow: 'The Blue Hole, with local guidance',
    title: 'Learn the water. Respect its depth.',
    description:
      'The Blue Hole is part of Dahab’s story. Our instructors put preparation, buddy practice and personal readiness before depth.',
    detail: 'Safety-led progression',
  },
  {
    image: '/images/story-carousel/red-sea-blue-hole.jpg',
    alt: 'A freediver in clear Red Sea water below a rocky opening',
    eyebrow: 'SSI training in South Sinai',
    title: 'Progress, one calm dive at a time.',
    description:
      'Follow a clear path from your first freediving session to internationally recognised SSI training with experienced instructors.',
    detail: 'SSI Diamond Instructor Training Center',
  },
  {
    image: '/images/story-carousel/training-line.jpg',
    alt: 'A freediver practising beside a guided depth line',
    eyebrow: 'Coaching that meets you where you are',
    title: 'Your pace. Your next milestone.',
    description:
      'Build relaxed technique and confidence with attentive feedback, a trained buddy and a plan tailored to your experience.',
    detail: 'Small groups · Individual progress',
  },
  {
    image: '/images/desert-experience/sinai-desert-04.webp',
    alt: 'Warm evening light across the Sinai desert near Dahab',
    eyebrow: 'More than time underwater',
    title: 'Take the Red Sea home with you.',
    description:
      'Share the water, discover Dahab and explore the surrounding South Sinai landscape with our local team.',
    detail: 'Dahab, South Sinai, Egypt',
  },
];

export function StoryHeroCarousel({ onNavigate }: StoryHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = SLIDES[activeIndex];
  const motionPaused = manuallyPaused || isHovered || isFocused || reducedMotion || videoUnavailable;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (motionPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [motionPaused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (motionPaused) {
      video.pause();
      return;
    }

    const playRequest = video.play();
    if (playRequest) {
      void playRequest.then(
        () => setVideoUnavailable(false),
        () => setVideoUnavailable(true)
      );
    }
  }, [motionPaused]);

  const showSlide = (index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
    setManuallyPaused(true);
  };

  return (
    <section
      aria-label="Freedive Dahab school story"
      aria-roledescription="carousel"
      className="relative isolate flex min-h-[620px] items-end overflow-hidden border-b border-white/10 bg-[#081F35]/70 px-5 pb-10 pt-32 sm:min-h-[680px] sm:px-8 sm:pb-14 lg:min-h-[740px] lg:items-center lg:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
        if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
      }}
    >
      <div className="absolute inset-0">
        <img
          src={SLIDES[0].image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={videoRef}
          src="/videos/why-freedive-dahab.mp4"
          poster={SLIDES[0].image}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoUnavailable(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            videoUnavailable ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#081F35]/95 via-[#081F35]/75 to-[#081F35]/35 lg:via-[#081F35]/65"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#081F35]/90 via-transparent to-[#081F35]/30 lg:from-[#081F35]/50"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.05fr_0.55fr] lg:items-center">
        <div className="max-w-3xl" aria-live={motionPaused ? 'polite' : 'off'} aria-atomic="true">
          <p className="mb-5 flex items-center gap-2 text-sm font-medium text-[#A9D2EC]">
            <ShieldCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h1
            key={slide.title}
            className="max-w-[13ch] animate-in fade-in slide-in-from-bottom-3 font-bebas text-5xl leading-[0.98] tracking-[0.025em] text-white duration-500 sm:text-7xl lg:text-8xl"
          >
            {slide.title}
          </h1>
          <p
            key={slide.description}
            className="mt-6 max-w-xl animate-in fade-in font-alata text-base leading-relaxed text-slate-100 duration-700 sm:text-lg"
          >
            {slide.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <Languages className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              English · العربية · Español · Deutsch
            </span>
            <span className="hidden text-white/40 sm:inline" aria-hidden="true">|</span>
            <span>{slide.detail}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="fd-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-alata text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore SSI courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="#story-intro"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 bg-[#081F35]/30 px-6 py-3 font-alata text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Meet the school
            </a>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end">
          <p className="max-w-[20ch] text-right font-bebas text-2xl tracking-wide text-white/90 sm:text-3xl">
            Dahab
            <span className="mt-1 block font-alata text-sm font-normal text-[#A9D2EC]">
              South Sinai, Egypt · Red Sea
            </span>
          </p>
          <div className="flex items-center gap-2" aria-label="Choose a school story slide">
            {SLIDES.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Show story: ${item.eyebrow}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="flex h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                    index === activeIndex ? 'w-7 bg-cyan-200' : 'w-2.5 bg-white/60'
                  }`}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => showSlide(activeIndex - 1)}
              aria-label="Previous story slide"
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-[#081F35]/50 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setManuallyPaused((paused) => !paused)}
              aria-label={manuallyPaused ? 'Resume hero motion' : 'Pause hero motion'}
              aria-pressed={manuallyPaused}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-[#081F35]/50 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {manuallyPaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => showSlide(activeIndex + 1)}
              aria-label="Next story slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-[#081F35]/50 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {videoUnavailable && (
        <p role="status" className="absolute bottom-4 left-5 z-20 max-w-[min(24rem,calc(100%-2.5rem))] rounded-lg border border-white/20 bg-[#081F35]/85 px-3 py-2 text-xs text-white sm:left-8">
          Background video is unavailable; showing a still image instead.
        </p>
      )}
      <span className="sr-only" aria-live={motionPaused ? 'polite' : 'off'}>
        Story {activeIndex + 1} of {SLIDES.length}: {slide.eyebrow}
      </span>
    </section>
  );
}
