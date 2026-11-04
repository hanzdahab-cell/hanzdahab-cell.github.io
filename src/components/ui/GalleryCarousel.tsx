import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export interface GallerySlide {
  id: string | number;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description?: string;
  tag?: string;
  href?: string;
  ctaLabel?: string;
}

interface GalleryCarouselProps {
  items: GallerySlide[];
  label: string;
  headingLevel?: 'h2' | 'h3';
}

export function GalleryCarousel({ items, label, headingLevel = 'h2' }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [items.length, paused, reducedMotion]);

  if (!items.length) return null;

  const activeItem = items[activeIndex % items.length];
  const SlideHeading = headingLevel;
  const move = (offset: number) => {
    setActiveIndex((index) => (index + offset + items.length) % items.length);
    setPaused(true);
  };

  return (
    <div
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target as HTMLElement).closest('button, a')) return;
        pointerStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (!pointerStart.current) return;
        const dx = event.clientX - pointerStart.current.x;
        const dy = event.clientY - pointerStart.current.y;
        pointerStart.current = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? -1 : 1);
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(1);
        }
      }}
      tabIndex={0}
    >
      <div
        className="group/gallery relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#081F35] sm:aspect-[16/10]"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              index === activeIndex % items.length ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== activeIndex % items.length}
          >
            <img
              src={item.imageSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
              loading={index === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="absolute inset-0 h-full w-full object-contain"
              loading={index === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
        {items.length > 1 && (
          <>
            <div className="absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between sm:px-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={`Show previous slide for ${label}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/60 bg-[#081F35]/85 text-white shadow-lg transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={`Show next slide for ${label}`}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/60 bg-[#081F35]/85 text-white shadow-lg transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
            <span
              className="absolute right-3 top-3 rounded-full border border-white/40 bg-[#081F35]/85 px-2.5 py-1 text-xs text-white"
              aria-hidden="true"
            >
              {activeIndex % items.length + 1} / {items.length}
            </span>
          </>
        )}
      </div>

      <div
        className="mt-4 flex flex-wrap items-end justify-between gap-4"
        aria-live={paused ? 'polite' : 'off'}
        aria-atomic="true"
      >
        <div className="min-w-0 flex-1">
          {activeItem.tag && (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
              {activeItem.tag}
            </p>
          )}
          <SlideHeading className="mt-1 font-bebas text-2xl leading-tight text-white sm:text-3xl">
            {activeItem.title}
          </SlideHeading>
          {activeItem.description && (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200">
              {activeItem.description}
            </p>
          )}
        </div>
        {activeItem.href && activeItem.ctaLabel && (
          <a
            href={activeItem.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#E8FBFF] px-4 py-2 text-sm font-semibold text-[#0A2943] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {activeItem.ctaLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>

      {items.length > 1 && (
        <div role="group" className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Choose a slide">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setPaused(true);
              }}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex % items.length ? 'true' : undefined}
              className={`min-h-11 min-w-11 rounded-full p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100 ${
                index === activeIndex % items.length ? 'text-cyan-100' : 'text-white/60 hover:text-white'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mx-auto block size-2.5 rounded-full ${
                  index === activeIndex % items.length ? 'bg-current' : 'bg-current/50'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
