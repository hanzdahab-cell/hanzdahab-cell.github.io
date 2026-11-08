import { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, ShoppingCart, Trash2, Waves } from 'lucide-react';
import type { PageType, TrainingCartItem } from '../../types';
import { SectionHero } from '../ui/SectionHero';
import { PricingTable } from '../ui/PricingTable';

interface TrainingSectionProps {
  onOpenBooking: (courseId?: string, trainingCartItems?: TrainingCartItem[]) => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  onNavigate?: (page: PageType) => void;
}

function formatPrice(eur: number, currency: 'EUR' | 'USD' | 'EGP') {
  if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
  if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
  return `€${Math.round(eur)}`;
}

export function TrainingSection({ onOpenBooking, onNavigate, currency = 'EUR' }: TrainingSectionProps) {
  const [trainingCartItems, setTrainingCartItems] = useState<TrainingCartItem[]>([]);
  const [cartStatus, setCartStatus] = useState('');
  const selectedIds = new Set(trainingCartItems.map((item) => item.id));
  const cartEstimateEur = trainingCartItems.reduce(
    (total, item) => total + item.unitPriceEur * (item.perDiver ? 1 : item.quantity),
    0,
  );

  const addToCart = (item: TrainingCartItem) => {
    setTrainingCartItems((current) => current.some((existing) => existing.id === item.id)
      ? current
      : [...current, item]);
    setCartStatus(`${item.title} added to your training request.`);
  };

  const removeFromCart = (itemId: string) => {
    const item = trainingCartItems.find((cartItem) => cartItem.id === itemId);
    setTrainingCartItems((current) => current.filter((cartItem) => cartItem.id !== itemId));
    if (item) setCartStatus(`${item.title} removed from your training request.`);
  };

  return (
    <section id="training" className="ocean-surface relative overflow-hidden border-t border-white/5 px-6 pb-24 pt-0 text-slate-100 sm:pb-32">
      <SectionHero
        imageSrc="/images/story-carousel/lighthouse-bay-team.webp"
        imageAlt="The Freedive Dahab team at Lighthouse Bay"
        className="-mx-6 mb-14 min-h-[50svh]"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <h1 className="font-bebas text-5xl leading-[0.95] tracking-[0.025em] text-white sm:text-6xl md:text-[clamp(3.25rem,4.5vw,3.75rem)]">
              Why train <span className="text-[#A9D2EC]">with us?</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-100 sm:text-lg">
              Training sessions are for certified freedivers. If you have never freedived, start with the SSI Freediving Course (10 meters).
            </p>
          </div>
          <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ['Set up for you', 'Our instructors prepare buoys and lines at a depth that suits your level.'],
              ['Real coaching', 'Get technique tips, feedback, safety supervision, and sessions adjusted to your progress.'],
              ['Small groups', 'No more than three people share a buoy, so there is little waiting between dives.'],
              ['Easy access to depth', 'Dive from shore in warm, clear, calm water without a boat schedule.'],
              ['Flexible options', 'Join day-by-day sessions, book a Training Week, or choose an Advanced Training Package.'],
              ['Our history', 'Freedive Dahab grew from three pioneers who helped shape the freediving community in Dahab.'],
            ].map(([title, copy]) => (
              <li key={title} className="h-full rounded-xl border border-white/15 bg-[#061A2B]/75 p-4 backdrop-blur-sm">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  {title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-100">{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionHero>

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        <section aria-labelledby="training-locations-heading">
          <div className="mb-6 flex items-end gap-3">
            <div>
              <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Two shore-based sites</p>
              <h2 id="training-locations-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Where we train</h2>
            </div>
            <span className="mb-3 h-px flex-1 bg-white/15" aria-hidden="true" />
          </div>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            <article id="lighthouse-bay-training" className="h-full scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943]">
              <div className="relative aspect-[16/10] bg-[#081F35]">
                <img
                  src="/images/cards/training/lighthouse-training.webp"
                  alt="Freedive Dahab Lighthouse Bay training poster"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="flex items-center gap-3 font-bebas text-3xl text-white">
                  <MapPin className="h-5 w-5 text-cyan-300" aria-hidden="true" /> Lighthouse Bay
                </h3>
                <p className="mt-4 leading-relaxed text-slate-300">
                  Our home spot: a calm, sheltered bay a short walk from the center. It is ideal for building depth gradually and for technique-focused sessions.
                </p>
              </div>
            </article>
            <article id="blue-hole-training" className="h-full scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943]">
              <div className="relative aspect-[16/10] bg-[#081F35]">
                <img
                  src="/images/cards/training/blue-hole-training.webp"
                  alt="Freedive Dahab Blue Hole training poster"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="flex items-center gap-3 font-bebas text-3xl text-white">
                  <Waves className="h-5 w-5 text-cyan-300" aria-hidden="true" /> Blue Hole
                </h3>
                <p className="mt-4 leading-relaxed text-slate-300">
                  One of Dahab’s most famous dive sites and ideal for deep freediving. The surrounding reef protects it from waves and currents, keeping the surface almost flat; deep water starts within 30 meters of shore.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section aria-labelledby="group-rates-heading">
          <div className="mb-6">
            <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Prices for group training</p>
            <h2 id="group-rates-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Choose one or two sessions</h2>
            <p className="mt-3 text-sm text-slate-300">Equipment is not included. You can rent freediving equipment at our center.</p>
          </div>
          <div className="space-y-5">
            <PricingTable
              table="lighthouse-group-training"
              onAddTrainingOption={addToCart}
              selectedTrainingOptionIds={selectedIds}
            />
            <PricingTable
              table="blue-hole-group-training"
              onAddTrainingOption={addToCart}
              selectedTrainingOptionIds={selectedIds}
            />
          </div>
          <p className="mt-4 rounded-xl border border-amber-200/20 bg-amber-950/20 p-4 text-sm leading-relaxed text-amber-100">
            Blue Hole prices do not include the $20 National Park entrance fee, which you pay at the gate.
          </p>
        </section>

        <section aria-labelledby="private-rates-heading">
          <div>
            <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Subject to instructor availability</p>
            <h2 id="private-rates-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Private sessions</h2>
            <p className="mt-4 leading-relaxed text-slate-300">Your own instructor, your own pace.</p>
          </div>
          <div className="mt-6">
            <PricingTable
              table="private-sessions"
              onAddTrainingOption={addToCart}
              selectedTrainingOptionIds={selectedIds}
            />
          </div>
        </section>

        <section id="training-modules" aria-labelledby="advanced-training-heading" className="scroll-mt-28 rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-[#0B2C4A] to-[#081F35] p-6 sm:p-10">
          <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">For longer stays</p>
          <h2 id="advanced-training-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Advanced Training Packages</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">
            Dive as much as you want at a convenient rate. You need to be at least an Advanced Freediver (Level 2) or equivalent. Packages use group sessions already on the schedule, so training locations may vary with availability. On rest days, you can still dive with other trainees from our center and enjoy the community.
          </p>
          <div className="mt-7">
            <PricingTable
              table="advanced-training-packages"
              onAddTrainingOption={addToCart}
              selectedTrainingOptionIds={selectedIds}
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-300">
            Looking for something more structured? Explore the{' '}
            <button type="button" onClick={() => onNavigate?.('packages')} className="font-semibold text-cyan-200 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Training Week and Master Program on the Packages page
            </button>.
          </p>
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="fd-button mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Ask about training availability <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>

        {trainingCartItems.length > 0 && (
          <section aria-labelledby="training-cart-heading" className="border-t border-white/15 pt-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 id="training-cart-heading" className="flex items-center gap-2 font-bebas text-3xl text-white sm:text-4xl">
                  <ShoppingCart className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                  Your training request
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Group rates include the selected group size. Per-diver rates use the number of divers in the request form.
                </p>
              </div>
              <p className="text-sm font-semibold text-cyan-100">
                Estimate for one diver where applicable: {formatPrice(cartEstimateEur, currency)}
              </p>
            </div>
            <p role="status" aria-live="polite" className="sr-only">{cartStatus}</p>
            <ul className="mt-5 divide-y divide-white/10">
              {trainingCartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-white">{item.title}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from training request`}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-white/20 px-3 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onOpenBooking('training-session', trainingCartItems)}
              className="fd-button mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Continue to request form <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </section>
        )}
      </div>
    </section>
  );
}
