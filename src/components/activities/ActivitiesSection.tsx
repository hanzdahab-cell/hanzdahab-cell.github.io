import { activitiesData } from '../../data/activities';
import { Compass, Clock, Check, ArrowRight } from 'lucide-react';
import { PageType } from '../../types';
import { desertExperiencePhotos, freedivingGalleryPhotos } from '../../data/courseMedia';
import { PhotoParallaxGallery } from '../ui/HorizontalParallaxGallery/PhotoParallaxGallery';
import { SectionHero } from '../ui/SectionHero';

interface ActivitiesSectionProps {
  onOpenBooking: (actId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

export function ActivitiesSection({ onOpenBooking, currency, onNavigate }: ActivitiesSectionProps) {
  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${Math.round(eur)}`;
  };
  const formatActivityPrice = (activity: (typeof activitiesData)[number]) =>
    activity.priceEgp !== undefined
      ? `E£${activity.priceEgp}`
      : formatPrice(activity.priceEur);

  return (
    <section id="safaris" className="ocean-surface relative border-t border-white/5 px-6 pb-24 pt-0 sm:pb-32">
      <SectionHero imageSrc={freedivingGalleryPhotos[0]?.src ?? '/images/story-carousel/red-sea-reef.jpg'} imageAlt={freedivingGalleryPhotos[0]?.alt ?? ''} className="-mx-6 mb-20 min-h-[50svh]">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-cyan-100">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Red Sea expeditions &amp; safaris</span>
          </div>
          <h1 className="font-bebas text-5xl tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
            Beyond the <span className="text-cyan-200">buoy</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-100">
            Complement your training with guided trips to Ras Mohamed National Park, coastal drift
            dives along Dahab Canyon, Bedouin desert evenings, and Wednesday rooftop ice baths.
          </p>
        </div>
      </SectionHero>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-baseline gap-3 sm:mb-10">
          <h2 className="font-bebas text-3xl leading-none tracking-[0.05em] text-white uppercase sm:text-4xl">
            Choose your next experience
          </h2>
          <span className="h-px flex-1 bg-ocean-pale/15" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {activitiesData.filter((activity) => activity.id !== 'gabriella-reef').map((act) => (
            <article
              key={act.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ocean-pale/10 bg-[#0A2943] text-white transition-colors duration-300 hover:border-ocean-light/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#081F35]">
                <img
                  src={act.image.url}
                  alt={act.image.alt}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute left-4 top-4">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/35 bg-[#081F35]/75 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur">
                    <Clock className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                    {act.duration}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-ocean-pale sm:text-2xl">
                    {act.title}
                  </h3>
                  <p className="shrink-0 text-lg font-semibold text-ocean-pale" aria-label={`Price ${formatActivityPrice(act)}`}>
                    {formatActivityPrice(act)}
                  </p>
                </div>

                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-300">
                  {act.description}
                </p>

                <div className="mt-4 space-y-2 border-t border-ocean-pale/10 pt-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Highlights
                  </p>
                  {act.highlights.slice(0, 3).map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2 text-xs leading-relaxed text-slate-200">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {act.id === 'ice-bath' && act.bookingNotes?.[0] && (
                  <p className="mt-4 rounded-lg border border-amber-200/20 bg-amber-950/25 p-3 text-xs leading-relaxed text-amber-100">
                    {act.bookingNotes[0]}
                  </p>
                )}
                {act.id !== 'ice-bath' && act.rateNote && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-300">{act.rateNote}</p>
                )}

                <div className="mt-auto grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(`activity-${act.id}`)}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/45 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Experience details
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(act.id)}
                    className="fd-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>{act.id === 'ice-bath' ? 'Book Session' : 'Book Expedition'}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 sm:mt-24">
          <PhotoParallaxGallery
            label="Freedive Dahab activities photos"
            photos={[...freedivingGalleryPhotos.slice(0, 3), ...desertExperiencePhotos]}
          />
        </div>
      </div>
    </section>
  );
}
