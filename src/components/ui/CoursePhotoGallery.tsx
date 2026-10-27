import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CardStackItem } from './CardStack';

interface CoursePhotoGalleryProps {
  images: CardStackItem[];
  label: string;
}

export function CoursePhotoGallery({ images, label }: CoursePhotoGalleryProps) {
  const photos = images.filter((image) => image.imageSrc);
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  if (!photos.length) return null;

  const activePhoto = photos[activeIndex % photos.length];
  const move = (offset: number) => {
    setActiveIndex((index) => (index + offset + photos.length) % photos.length);
  };

  return (
    <div
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      className="group relative w-full touch-pan-y overflow-hidden rounded-2xl border border-white/15 bg-[#081F35] shadow-[0_18px_50px_rgba(0,0,0,0.3)]"
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
        pointerStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (!pointerStart.current) return;
        const dx = event.clientX - pointerStart.current.x;
        const dy = event.clientY - pointerStart.current.y;
        pointerStart.current = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? -1 : 1);
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
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
      <div className="relative aspect-video w-full bg-[#04111F]">
        <img
          key={activePhoto.id}
          src={activePhoto.imageSrc}
          alt={activePhoto.imageAlt ?? activePhoto.title}
          className="absolute inset-0 h-full w-full object-contain"
          loading="lazy"
          draggable={false}
        />
        {photos.length > 1 && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={`Show previous photo for ${label}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/75 text-white backdrop-blur transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={`Show next photo for ${label}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-[#081F35]/75 text-white backdrop-blur transition-colors hover:bg-[#22628C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="absolute inset-x-3 bottom-3 z-10">
              <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Choose a photo">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show photo ${index + 1} of ${photos.length}`}
                    aria-pressed={index === activeIndex}
                    className={`relative aspect-square w-12 shrink-0 overflow-hidden rounded-md border-2 transition-opacity motion-reduce:transition-none sm:w-14 ${index === activeIndex ? 'border-white opacity-100 ring-2 ring-black/20' : 'border-white/40 opacity-65 hover:opacity-100'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                  >
                    <img
                      src={photo.imageSrc}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
            <span className="absolute right-3 top-3 z-10 rounded-full border border-white/25 bg-[#081F35]/75 px-2.5 py-1 text-xs text-white backdrop-blur" aria-live="polite">
              {activeIndex + 1} / {photos.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
