import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { REVIEW_SOURCES, reviews, ReviewPlatform } from '../../data/reviews';
import { useLanguage } from '../../context/LanguageContext';
import {
  EXTERNAL_REVIEW_CONSENT_EVENT,
  hasExternalReviewConsent,
} from '../ui/CookieConsent';

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

export function ReviewsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [externalReviewsEnabled, setExternalReviewsEnabled] = useState(hasExternalReviewConsent);
  const [widgetsInView, setWidgetsInView] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setWidgetsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidgetsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateConsent = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'boolean') {
        setExternalReviewsEnabled(event.detail);
      }
    };
    window.addEventListener(EXTERNAL_REVIEW_CONSENT_EVENT, updateConsent);
    return () => window.removeEventListener(EXTERNAL_REVIEW_CONSENT_EVENT, updateConsent);
  }, []);

  useEffect(() => {
    if (!externalReviewsEnabled || !widgetsInView) return;

    const addScript = (id: string, src: string) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.defer = true;
      script.referrerPolicy = 'strict-origin-when-cross-origin';
      document.body.appendChild(script);
    };

    addScript(
      'jotform-review-widget-script',
      'https://www.jotform.com/website-widgets/embed/01a1632c6fb8700089e9632c90b420331d61',
    );
    addScript('elfsight-review-widget-script', 'https://elfsightcdn.com/platform.js');
    return () => {
      document.getElementById('jotform-review-widget-script')?.remove();
      document.getElementById('elfsight-review-widget-script')?.remove();
    };
  }, [externalReviewsEnabled, widgetsInView]);

  useEffect(() => {
    if (isPaused || isInteractionPaused || reduceMotion || reviews.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveReview((active) => (active + 1) % reviews.length);
    }, 7600);
    return () => window.clearInterval(interval);
  }, [isPaused, isInteractionPaused, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="ocean-surface relative overflow-hidden border-t border-white/5 px-6 py-24 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
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

        <div className="mb-5 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-pressed={isPaused || reduceMotion}
            aria-label={
              reduceMotion
                ? 'Automatic review movement is disabled by your motion preference'
                : isPaused
                  ? 'Resume reviews'
                  : 'Pause reviews'
            }
            disabled={reduceMotion}
            onClick={() => setIsPaused((paused) => !paused)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPaused || reduceMotion ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <div
            aria-hidden="true"
            className="flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4"
          >
            {reviews.map((review, index) => (
              <span
                key={review.id}
                className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                  index === activeReview ? 'w-7 bg-white' : 'w-2.5 bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
        <div
          onMouseEnter={() => setIsInteractionPaused(true)}
          onMouseLeave={(event) => setIsInteractionPaused(event.currentTarget.contains(document.activeElement))}
          onFocusCapture={() => setIsInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsInteractionPaused(event.currentTarget.matches(':hover'));
            }
          }}
        >
          <InfiniteMovingCards
            items={reviews}
            speed="normal"
            direction="left"
            pauseOnHover={false}
            isPaused={isPaused || isInteractionPaused}
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
        </div>

        <div className="mt-14 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
          <section
            aria-labelledby="google-live-reviews-title"
            className="min-w-0 rounded-2xl border border-white/10 bg-[#0A2943]/70 p-4 sm:p-6"
          >
            <h3
              id="google-live-reviews-title"
              className="mb-4 font-bebas text-2xl tracking-wide text-white"
            >
              GOOGLE REVIEWS
            </h3>
            {externalReviewsEnabled ? (
              <div
                id="JFWebsiteWidget-01a1632c6fb8700089e9632c90b420331d61"
                className="min-h-72"
              />
            ) : (
              <p className="flex min-h-72 items-center text-sm leading-relaxed text-slate-300">
                Enable external review feeds in Cookie settings to load the live Google widget.
              </p>
            )}
            <a
              href={REVIEW_SOURCES.find((source) => source.platform === 'google')?.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center rounded-lg text-sm text-cyan-200 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Open Google reviews
            </a>
          </section>
          <section
            aria-labelledby="tripadvisor-live-reviews-title"
            className="min-w-0 rounded-2xl border border-white/10 bg-[#0A2943]/70 p-4 sm:p-6"
          >
            <h3
              id="tripadvisor-live-reviews-title"
              className="mb-4 font-bebas text-2xl tracking-wide text-white"
            >
              TRIPADVISOR REVIEWS
            </h3>
            {externalReviewsEnabled ? (
              <div
                className="elfsight-app-07e8aff4-b227-4bb3-a052-0a143c636b09 min-h-72"
                data-elfsight-app-lazy=""
              />
            ) : (
              <p className="flex min-h-72 items-center text-sm leading-relaxed text-slate-300">
                Enable external review feeds in Cookie settings to load the live TripAdvisor widget.
              </p>
            )}
            <a
              href={REVIEW_SOURCES.find((source) => source.platform === 'tripadvisor')?.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center rounded-lg text-sm text-cyan-200 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Open TripAdvisor reviews
            </a>
          </section>
        </div>
      </div>
    </section>
  );
}
