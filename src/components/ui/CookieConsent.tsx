import { useEffect, useState } from 'react';
import { Cookie, Settings2, X } from 'lucide-react';

interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  externalReviews: boolean;
  savedAt: string;
}

const CONSENT_KEY = 'freedive-dahab-cookie-preferences-v1';
export const EXTERNAL_REVIEW_CONSENT_EVENT = 'freedive:external-review-consent';

function readConsent(): ConsentPreferences | null {
  const saved = window.localStorage.getItem(CONSENT_KEY);
  if (!saved) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(saved);
  } catch {
    return null;
  }
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('necessary' in parsed) ||
    !('analytics' in parsed) ||
    !('savedAt' in parsed) ||
    parsed.necessary !== true ||
    typeof parsed.analytics !== 'boolean' ||
    ('externalReviews' in parsed && typeof parsed.externalReviews !== 'boolean') ||
    typeof parsed.savedAt !== 'string'
  ) {
    return null;
  }

  const externalReviews =
    'externalReviews' in parsed && typeof parsed.externalReviews === 'boolean'
      ? parsed.externalReviews
      : false;

  return {
    necessary: true,
    analytics: parsed.analytics,
    externalReviews,
    savedAt: parsed.savedAt,
  };
}

export function hasExternalReviewConsent() {
  try {
    return readConsent()?.externalReviews ?? false;
  } catch {
    return false;
  }
}

export function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [externalReviewsEnabled, setExternalReviewsEnabled] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      const saved = readConsent();
      if (saved) {
        setHasConsent(true);
        setAnalyticsEnabled(saved.analytics);
        setExternalReviewsEnabled(saved.externalReviews);
      } else {
        setIsOpen(true);
      }
    } catch {
      setStorageError(true);
      setIsOpen(true);
    } finally {
      setIsReady(true);
    }
  }, []);

  const savePreferences = (analytics: boolean, externalReviews: boolean) => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics,
      externalReviews,
      savedAt: new Date().toISOString(),
    };
    setAnalyticsEnabled(analytics);
    setExternalReviewsEnabled(externalReviews);
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
      setHasConsent(true);
      setStorageError(false);
      setIsOpen(false);
      setShowSettings(false);
      window.dispatchEvent(
        new CustomEvent<boolean>(EXTERNAL_REVIEW_CONSENT_EVENT, { detail: externalReviews }),
      );
    } catch {
      setStorageError(true);
      setIsOpen(true);
    }
  };

  const continueForThisVisit = () => {
    setHasConsent(true);
    setIsOpen(false);
    setShowSettings(false);
    window.dispatchEvent(
      new CustomEvent<boolean>(EXTERNAL_REVIEW_CONSENT_EVENT, { detail: externalReviewsEnabled }),
    );
  };

  if (!isReady) return null;

  return (
    <>
      {isOpen ? (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 text-[#081F35] shadow-[0_20px_70px_rgba(0,0,0,0.4)] sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-900">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="cookie-consent-title" className="font-bebas text-2xl tracking-wide">
                Your privacy choices
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
                We store your language and privacy preferences in this browser. Essential storage
                supports site settings. Analytics are not active; live Google and TripAdvisor review
                feeds load only when you enable external review content.
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                Essential only keeps the review links available without loading third-party widgets.
              </p>

              {storageError && (
                <p role="status" className="mt-3 text-xs font-medium text-rose-800">
                  Your browser blocked preference storage. You can continue with this choice for
                  this visit only.
                </p>
              )}

              {showSettings && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-900">Optional storage</p>
                  <label className="mt-3 flex min-h-11 cursor-pointer items-center justify-between gap-4 text-xs text-slate-700">
                    <span>
                      Analytics preferences
                      <span className="mt-0.5 block text-[11px] text-slate-500">
                        No analytics tools are currently loaded.
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                      className="h-5 w-5 rounded border-slate-400 accent-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                    />
                  </label>
                  <label className="mt-3 flex min-h-11 cursor-pointer items-center justify-between gap-4 text-xs text-slate-700">
                    <span>
                      External review feeds
                      <span className="mt-0.5 block text-[11px] text-slate-500">
                        Loads live Google and TripAdvisor widgets from their providers.
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={externalReviewsEnabled}
                      onChange={(event) => setExternalReviewsEnabled(event.target.checked)}
                      className="h-5 w-5 rounded border-slate-400 accent-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                    />
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => savePreferences(analyticsEnabled, externalReviewsEnabled)}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                    >
                      Save choices
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSettings(false)}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                    >
                      Cancel
                    </button>
                    {storageError && (
                      <button
                        type="button"
                        onClick={continueForThisVisit}
                        className="inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                      >
                        Continue this visit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {!showSettings && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => savePreferences(false, false)}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    Essential only
                  </button>
                  <button
                    type="button"
                    onClick={() => savePreferences(true, true)}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-teal-900 transition-colors hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    <Settings2 className="h-4 w-4" aria-hidden="true" />
                    Customize
                  </button>
                  {storageError && (
                    <button
                      type="button"
                      onClick={continueForThisVisit}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                      Continue this visit
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : hasConsent ? (
        <button
          type="button"
          onClick={() => {
            setShowSettings(false);
            setIsOpen(true);
          }}
          className="fixed bottom-3 left-3 z-[60] inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#081F35] shadow-lg transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:bottom-5 sm:left-5"
        >
          <Cookie className="h-4 w-4 text-teal-800" aria-hidden="true" />
          Cookie settings
        </button>
      ) : null}
    </>
  );
}
