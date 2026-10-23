import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { REVIEW_SOURCES, type ReviewPlatform } from '../../data/reviews';
import { useLanguage } from '../../context/LanguageContext';
import {
  EXTERNAL_REVIEW_CONSENT_EVENT,
  hasExternalReviewConsent,
} from '../ui/CookieConsent';
import './ReviewsCarousel.css';

export function PlatformMark({ platform }: { platform: ReviewPlatform }) {
  if (platform === 'tripadvisor') {
    return (
      <span
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: '#34E0A1' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <circle cx="7.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="16.5" cy="12" r="3.2" stroke="#000" strokeWidth="1.6" />
          <circle cx="7.5" cy="12" r="1" fill="#000" />
          <circle cx="16.5" cy="12" r="1" fill="#000" />
          <path d="M3 9c2.4-2.2 5.6-3.4 9-3.4S18.6 6.8 21 9" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-4">
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
  const [isVisible, setIsVisible] = useState(false);
  const [externalReviewsEnabled, setExternalReviewsEnabled] = useState(
    hasExternalReviewConsent,
  );
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    if (!externalReviewsEnabled || !isVisible) return;

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
      document
        .getElementById('JFWebsiteWidget-01a1632c6fb8700089e9632c90b420331d61')
        ?.replaceChildren();
      document.querySelector('.elfsight-app-07e8aff4-b227-4bb3-a052-0a143c636b09')
        ?.replaceChildren();
    };
  }, [externalReviewsEnabled, isVisible]);

  useEffect(() => {
    if (!externalReviewsEnabled || !isVisible) return;

    const widget = document.getElementById('tripadvisor-live-reviews-widget');
    if (!widget) return;

    const applyWidgetTheme = () => {
      const shadowRoot = widget.querySelector('.es-embed-root')?.shadowRoot;
      if (!shadowRoot || shadowRoot.getElementById('freedive-tripadvisor-theme')) return;

      const style = document.createElement('style');
      style.id = 'freedive-tripadvisor-theme';
      style.textContent = `
        [class*='HeaderContainer__Inner'] { background-color: #000000 !important; }
        [class*='ReviewBackground__Container'] { background-color: #000000 !important; }
        a[href*='elfsight.com/tripadvisor-reviews-widget'] { display: none !important; }
      `;
      shadowRoot.appendChild(style);
    };

    applyWidgetTheme();
    const observer = new MutationObserver(applyWidgetTheme);
    observer.observe(widget, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [externalReviewsEnabled, isVisible]);

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
            {REVIEW_SOURCES.map((source) => (
              <a
                key={source.platform}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg text-xs font-alata text-white/85 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <PlatformMark platform={source.platform} />
                <span className="inline-flex items-center gap-1">
                  {source.label}
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </header>

        <div className="mx-auto mb-12 grid w-full grid-cols-1 gap-6">
          <section
            aria-labelledby="google-live-reviews-title"
            className="min-w-0 rounded-2xl border border-white/10 bg-[#0A2943]/80 p-4 shadow-lg sm:p-6"
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
              <p className="flex min-h-24 items-center text-sm leading-relaxed text-slate-300">
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
            className="min-w-0 rounded-2xl border border-white/10 bg-[#0A2943]/80 p-4 shadow-lg sm:p-6"
          >
            <h3
              id="tripadvisor-live-reviews-title"
              className="mb-4 font-bebas text-2xl tracking-wide text-white"
            >
              TRIPADVISOR REVIEWS
            </h3>
            {externalReviewsEnabled ? (
              <div
                id="tripadvisor-live-reviews-widget"
                className="elfsight-app-07e8aff4-b227-4bb3-a052-0a143c636b09 min-h-72"
                data-elfsight-app-lazy=""
              />
            ) : (
              <p className="flex min-h-24 items-center text-sm leading-relaxed text-slate-300">
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
