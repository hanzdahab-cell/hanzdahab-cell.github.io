import { activitiesData } from '../../data/activities';
import { Compass, Clock, Check, ArrowRight } from 'lucide-react';
import { PageType } from '../../types';
import { CourseGalleryImage, desertExperiencePhotos, freedivingGalleryPhotos } from '../../data/courseMedia';
import { PhotoCarousel } from '../ui/PhotoCarousel';
import { OfferingCardStack } from '../ui/OfferingCardStack';
import { SectionHero } from '../ui/SectionHero';

interface ActivitiesSectionProps {
  onOpenBooking: (actId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

export function ActivitiesSection({ onOpenBooking, currency, onNavigate }: ActivitiesSectionProps) {
  const activityStackItems = activitiesData.map((activity) => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    imageSrc: activity.image.url,
    imageAlt: activity.image.alt,
    tag: activity.duration,
    href: `#activity-${activity.id}`,
    ctaLabel: 'Explore experience',
  }));

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="safaris" className="ocean-surface relative border-t border-white/5 px-6 pb-32 pt-0">
      <SectionHero imageSrc={activitiesData[0]?.image.url ?? '/images/story-carousel/red-sea-reef.jpg'} imageAlt={activitiesData[0]?.image.alt ?? ''} className="-mx-6 mb-20 min-h-[50svh]">
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
            dives along Dahab Canyon, and Bedouin desert evenings beneath the Sinai sky.
          </p>
        </div>
      </SectionHero>
      <div className="max-w-7xl mx-auto">
        <OfferingCardStack
          label="Dahab activities"
          title="Choose your next experience"
          description="Browse the activities in our catalog and open their existing details and booking options."
          items={activityStackItems}
        />

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesData.map((act) => {
            const extraPhotos: CourseGalleryImage[] = act.id === 'desert-sunset'
              ? desertExperiencePhotos
              : freedivingGalleryPhotos;
            return (
            <div
              key={act.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 flex flex-col justify-between group transition-all duration-500"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <PhotoCarousel
                    images={[
                      { src: act.image.url, alt: act.image.alt },
                      ...extraPhotos,
                    ]}
                    label={`${act.title} photos`}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {act.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className="text-2xl font-serif font-bold text-white">
                      {formatPrice(act.priceEur)}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block text-right">GUIDED TRIP</span>
                    {act.rateNote && (
                      <span className="block text-right text-[10px] text-[#A9D2EC]">2017 brochure rate · confirm current price</span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
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
