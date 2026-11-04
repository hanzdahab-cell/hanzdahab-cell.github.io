import { activitiesData } from '../../data/activities';
import { Compass, Clock, Check, ArrowRight } from 'lucide-react';
import { PageType } from '../../types';
import { CourseGalleryImage, desertExperiencePhotos, freedivingGalleryPhotos } from '../../data/courseMedia';
import { PhotoCarousel } from '../ui/PhotoCarousel';
import { SectionHero } from '../ui/SectionHero';

interface ActivitiesSectionProps {
  onOpenBooking: (actId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

const WEBSITE_COPY_ACTIVITY_IDS = [
  'ras-mohamed',
  'night-freediving',
  'desert-sunset',
  'ice-bath',
  'yoga-for-freedivers',
];

export function ActivitiesSection({ onOpenBooking, currency, onNavigate }: ActivitiesSectionProps) {
  const pageActivities = WEBSITE_COPY_ACTIVITY_IDS
    .map((id) => activitiesData.find((activity) => activity.id === id))
    .filter((activity) => activity !== undefined);

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="safaris" className="ocean-surface relative border-t border-white/5 px-6 pb-32 pt-0">
      <SectionHero imageSrc={pageActivities[0]?.image.url ?? '/images/story-carousel/red-sea-reef.jpg'} imageAlt={pageActivities[0]?.image.alt ?? ''} className="-mx-6 mb-20 min-h-[50svh]">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-cyan-100">
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Red Sea &amp; South Sinai</span>
          </div>
          <h1 className="font-bebas text-5xl tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
            <span className="text-cyan-200">Activities</span> &amp; Safaris
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-100">
            Freediving is only part of the adventure. Join group trips and activities to explore
            the Red Sea and South Sinai desert with people who know the area, and relax after a
            day of diving.
          </p>
        </div>
      </SectionHero>
      <div className="max-w-7xl mx-auto">
        <div id="activities-overview" className="mb-16 scroll-mt-28">
          <div className="mb-5 max-w-3xl space-y-3">
            <h2 className="font-bebas text-3xl tracking-[0.04em] text-white sm:text-4xl">
              Choose your next experience
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Compare the duration, price, and highlights on each card. Open an experience for full details and booking.
            </p>
          </div>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {pageActivities.map((act) => {
            const extraPhotos: CourseGalleryImage[] = act.id === 'desert-sunset'
              ? desertExperiencePhotos
              : freedivingGalleryPhotos;
            return (
            <div
              key={act.id}
              id={`activity-${act.id}`}
              className="glass-panel group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-cyan-400/40"
            >
              <div className="flex flex-1 flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <PhotoCarousel
                    images={[
                      { src: act.image.url, alt: act.image.alt },
                      ...extraPhotos,
                    ]}
                    label={`${act.title} photos`}
                    className="absolute inset-0"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {act.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col space-y-4 p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {act.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Highlights:
                    </div>
                    {act.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto border-t border-white/10 pt-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Price</p>
                    <p className="mt-1 text-lg font-semibold leading-relaxed text-white">
                      {act.priceLabel ?? formatPrice(act.priceEur)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                    <span>Book Expedition</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>

      </div>
    </section>
  );
}
