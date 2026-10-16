import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { REVIEW_SOURCES, reviews, ReviewPlatform } from '../../data/reviews';
import { useLanguage } from '../../context/LanguageContext';

export function PlatformMark({ platform }: { platform: ReviewPlatform }) {
  if (platform === 'tripadvisor') {
    // Simplified TripAdvisor owl: green disc + binocular eyes
    return (
      <span
        className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0"
        style={{ backgroundColor: '#34E0A1' }}
        aria-label="TripAdvisor"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
          <circle cx="7.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="16.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="7.5" cy="12" r="1" fill="#000" />
          <circle cx="16.5" cy="12" r="1" fill="#000" />
          <path d="M3 9c2.4-2.2 5.6-3.4 9-3.4S18.6 6.8 21 9" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  // Google "G"
  return (
    <span className="inline-flex w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shrink-0" aria-label="Google">
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.6 12.23c0-.68-.06-1.36-.19-2.02H12v3.83h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.3 2.97-7.33Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.05.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
        />
        <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96l3.33-2.58Z" />
        <path
          fill="#EA4335"
          d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A10 10 0 0 0 3.07 7.52l3.33 2.58c.8-2.36 3-4.12 5.6-4.12Z"
        />
      </svg>
    </span>
  );
}

function GoogleReviewsEmbed() {
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
    script.defer = true;
    script.async = true;
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="mt-14 border-t border-white/10 pt-10">
      <h3 className="font-bebas text-3xl tracking-wide text-white sm:text-4xl">
        Google reviews
      </h3>
      <p className="mb-5 mt-2 text-sm text-slate-300">
        Recent reviews from our Google profile.
      </p>
      <div
        className="sk-ww-google-reviews min-h-72 rounded-2xl bg-white p-3 text-slate-900"
        data-embed-id="25722416"
        aria-label="Google reviews widget"
        role="region"
      />
      {scriptError && (
        <p role="status" className="mt-3 text-sm text-slate-300">
          Google reviews could not be loaded. You can still read them on{' '}
          <a
            href={REVIEW_SOURCES.find((source) => source.platform === 'google')?.url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-200 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Google
          </a>
          .
        </p>
      )}
    </div>
  );
}

export function ReviewsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative border-t border-white/5 bg-transparent px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-alata uppercase tracking-[0.24em] text-cyan-300">
              {t.testimonials.eyebrow}
            </p>
            <h2
              id="testimonials-title"
              className="font-bebas text-5xl leading-tight tracking-wide text-white sm:text-6xl"
            >
              {t.testimonials.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {t.testimonials.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {REVIEW_SOURCES.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg text-xs font-alata text-white/85 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <PlatformMark platform={s.platform} />
                <span className="inline-flex items-center gap-1">
                  {s.label}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </header>

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            aria-pressed={isPaused}
            onClick={() => setIsPaused((paused) => !paused)}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/30 px-3 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPaused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
            {isPaused ? 'Play reviews' : 'Pause reviews'}
          </button>
        </div>
        <InfiniteMovingCards
          items={reviews}
          speed="normal"
          direction="left"
          isPaused={isPaused}
          className="pb-1"
          cardClassName="flex"
          renderItem={(review) => (
            <article className="flex h-full min-h-64 flex-col gap-5 rounded-2xl border border-white/10 bg-[#0A2943]/90 p-5 shadow-lg sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200">
                <PlatformMark platform={review.platform} />
                {review.platform === 'tripadvisor' ? 'TripAdvisor' : 'Google review'}
              </div>
              {review.photo && (
                <img
                  src={review.photo.src}
                  alt={review.photo.alt}
                  className="aspect-[16/9] w-full rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <blockquote className="flex-1 font-alata text-sm leading-relaxed text-slate-100">
                “{review.text}”
              </blockquote>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white"
                >
                  {review.name.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-sm font-semibold text-white">{review.name}</div>
                  {review.date && <div className="mt-1 text-xs text-slate-400">{review.date}</div>}
                </div>
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read ${review.platform === 'tripadvisor' ? 'TripAdvisor' : 'Google'} review by ${review.name}`}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-lg px-2 text-xs font-semibold text-cyan-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View review
                </a>
              </div>
            </article>
          )}
        />
        <GoogleReviewsEmbed />
      </div>
    </section>
  );
}
