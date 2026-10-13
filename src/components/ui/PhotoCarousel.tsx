import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CourseGalleryImage } from '../../data/courseMedia';

interface PhotoCarouselProps {
  images: CourseGalleryImage[];
  label: string;
  className?: string;
  imageClassName?: string;
  interval?: number;
}

export function PhotoCarousel({
  images,
  label,
  className = '',
  imageClassName = '',
  interval = 5000,
}: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (images.length < 2 || isHovered || isFocused || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [images.length, interval, isFocused, isHovered, prefersReducedMotion]);

  useEffect(() => {
    setActiveIndex((index) => index % Math.max(images.length, 1));
  }, [images.length]);

  if (images.length === 0) return null;

  const show = (offset: number) => {
    setActiveIndex((index) => (index + offset + images.length) % images.length);
  };

  const activeImage = images[activeIndex];

  return (
    <div
      role="group"
      aria-label={label}
      aria-roledescription="carousel"
      className={`group/photo relative isolate overflow-hidden bg-[#081F35] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
    >
      <img
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        className={`h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover/photo:scale-[1.03] ${imageClassName}`}
        loading="lazy"
      />

      {images.length > 1 && (
        <div className="absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between opacity-100 transition-opacity sm:opacity-0 sm:group-hover/photo:opacity-100 sm:group-focus-within/photo:opacity-100">
          <button
            type="button"
            onClick={() => show(-1)}
            aria-label={`Show previous photo for ${label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/75 text-white backdrop-blur transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => show(1)}
            aria-label={`Show next photo for ${label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/75 text-white backdrop-blur transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {images.length > 1 && (
        <span className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-[#081F35]/75 px-2.5 py-1 text-xs text-white backdrop-blur">
          {activeIndex + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
