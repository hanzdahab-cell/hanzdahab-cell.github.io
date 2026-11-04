import { useState } from 'react';
import { roomTypes } from '../../data/accommodation';
import { Check, Users, Home, ArrowRight, Moon, Waves, Compass, ImageOff } from 'lucide-react';
import { PageType } from '../../types';
import { PhotoCarousel } from '../ui/PhotoCarousel';

interface AccommodationSectionProps {
  onBookStay: (roomId: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

export function AccommodationSection({ onBookStay, currency, onNavigate }: AccommodationSectionProps) {
  const [activeRoomId, setActiveRoomId] = useState(roomTypes[0].id);
  const activeRoom = roomTypes.find(r => r.id === activeRoomId) || roomTypes[0];
  const recommendedActivities = [
    {
      title: 'Night Dive',
      image: null,
      alt: '',
      icon: Moon,
      page: 'activity-night-freediving' as PageType,
    },
    {
      title: 'Icebath',
      image: null,
      alt: '',
      icon: Waves,
      page: 'activity-ice-bath' as PageType,
    },
    {
      title: 'Explore Sinai',
      image: '/images/desert-experience/sinai-desert-04.webp',
      alt: 'Sinai desert landscape at sunset',
      icon: Compass,
      page: 'activity-desert-sunset' as PageType,
    },
  ];

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="accommodation" className="ocean-surface relative border-t border-white/5 px-6 py-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400">
              <Home className="w-4 h-4" />
              <span>THE SEA LODGE • LIGHTHOUSE BAY</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl font-normal text-white tracking-[0.05em] leading-tight">
              FREEDIVE DAHAB GUEST ROOMS
            </h2>
            <p className="max-w-2xl font-alata text-base leading-relaxed text-slate-200">
              Choose from four rooms above our Freedive Dahab school. We can also prepare a
              tailor-made quote when you combine accommodation with a course or training.
            </p>
          </div>
        </div>

        {/* 2-Column Room Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Room Selector Navigation */}
          <div id="rooms" className="lg:col-span-5 scroll-mt-20 space-y-3">
            <div className="space-y-3">
              {roomTypes.map((room) => {
                const isSelected = room.id === activeRoomId;
                return (
                  <button
                    key={room.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
                      isSelected
                        ? 'bg-sky-950/40 border-cyan-400/60 text-white'
                        : 'bg-slate-900/30 border-white/10 text-slate-200 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif text-xl font-bold">{room.title}</h4>
                      <span className="shrink-0 text-sm font-semibold text-cyan-200">
                        From {formatPrice(room.pricePerNightEur.min)}
                        <span className="text-xs font-normal text-cyan-100/80"> / night</span>
                      </span>
                    </div>
                    <p className="mb-2 text-sm leading-relaxed text-slate-200">{room.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-cyan-400" />
                        Up to {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-[#0A2943] p-6">
              <div>
                <h3 className="font-bebas text-2xl tracking-wide text-white">
                  Long-stay discounts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  Save on longer stays:
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                <li><span className="font-semibold text-cyan-200">15% off</span> stays of 10–20 days</li>
                <li><span className="font-semibold text-cyan-200">30% off</span> stays of 21–30 days</li>
              </ul>
              <button
                type="button"
                onClick={() => onBookStay(activeRoom.id)}
                className="fd-button inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ask about a longer stay
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Selected room photos and details */}
          <div className="lg:col-span-7 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#081F35]">
            <div className="relative aspect-[4/3] bg-[#061A2B] sm:aspect-[16/10]">
              {activeRoom.images.length > 0 ? (
                <PhotoCarousel
                  key={activeRoom.id}
                  images={activeRoom.images.map((image) => ({
                    src: image.url,
                    alt: image.alt,
                  }))}
                  label={`${activeRoom.title} photos`}
                  className="absolute inset-0"
                  imageFit="contain"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-cyan-100/80">
                  <ImageOff className="h-10 w-10" aria-hidden="true" />
                  <p className="font-semibold text-white">Islands Room photos coming soon</p>
                  <p className="max-w-sm text-sm leading-relaxed">
                    Room details and current rates are available while we wait for its photo set.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bebas text-3xl tracking-wide text-white sm:text-4xl">
                    {activeRoom.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-200">
                    {activeRoom.description}
                  </p>
                </div>
                <dl className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Guests</dt>
                    <dd className="mt-1">Up to {activeRoom.capacity}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Beds</dt>
                    <dd className="mt-1">{activeRoom.bedDescription}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Size</dt>
                    <dd className="mt-1">{activeRoom.sizeLabel}</dd>
                  </div>
                </dl>
              </div>

              <section aria-labelledby="room-rates-heading" className="space-y-3">
                <div>
                  <h4 id="room-rates-heading" className="font-bebas text-2xl tracking-wide text-white">
                    Nightly rates
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-300">
                    Prices are per room. {activeRoom.id === 'blue-hole-room'
                      ? 'The same rate applies for a third guest.'
                      : 'Single and double occupancy rates are listed below.'}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(['low', 'high'] as const).map((season) => (
                    <div key={season} className="rounded-xl border border-white/10 bg-[#0A2943] p-4">
                      <h5 className="font-semibold text-white">
                        {season === 'low' ? 'Low season · Dec–Mar' : 'High season · Apr–Nov'}
                      </h5>
                      <dl className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-300">Single occupancy</dt>
                          <dd className="font-semibold text-white">
                            {formatPrice(activeRoom.seasonalPricesEur[season].single)} / night
                          </dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-slate-300">Double occupancy</dt>
                          <dd className="font-semibold text-white">
                            {formatPrice(activeRoom.seasonalPricesEur[season].double)} / night
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="room-facilities-heading" className="space-y-4">
                <h4 id="room-facilities-heading" className="font-bebas text-2xl tracking-wide text-white">
                  Room facilities
                </h4>
                <ul className="grid grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-2">
                {activeRoom.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span>{amenity}</span>
                  </li>
                ))}
                </ul>
              </section>

              <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => onNavigate(`room-${activeRoom.id}`)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/45 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Stay details
                </button>
                <button
                  type="button"
                  onClick={() => onBookStay(activeRoom.id)}
                  className="fd-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Book {activeRoom.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        <section aria-labelledby="shared-facilities-heading" className="mt-16 border-t border-white/10 pt-10">
          <h3 id="shared-facilities-heading" className="font-bebas text-3xl tracking-wide text-white sm:text-4xl">
            Shared facilities
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-[#0A2943] p-5 sm:p-6">
              <h4 className="font-semibold text-white">Large common terrace</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                A relaxed place to socialize, stretch, or enjoy meals between training sessions.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-[#0A2943] p-5 sm:p-6">
              <h4 className="font-semibold text-white">Shared kitchen</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                Prepare your own meals whenever you wish.
              </p>
            </article>
          </div>
        </section>

        {/* Recommended activities */}
        <section aria-labelledby="recommended-activities-heading" className="mt-20 border-t border-white/10 pt-12 sm:mt-24 sm:pt-16">
          <h3 id="recommended-activities-heading" className="mb-6 font-bebas text-3xl tracking-wide text-white sm:text-4xl">
            Recommended Activities
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recommendedActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <button
                  key={activity.title}
                  type="button"
                  onClick={() => onNavigate(activity.page)}
                  aria-label={`View ${activity.title} details`}
                  className="group relative isolate flex min-h-40 w-full items-end overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943] text-left transition-[border-color,transform] hover:-translate-y-1 hover:border-cyan-200/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {activity.image ? (
                    <img src={activity.image} alt={activity.alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(89,166,208,0.45),transparent_55%),linear-gradient(135deg,#123c5a,#071d31)]" />
                  )}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071d31]/95 via-[#071d31]/35 to-[#071d31]/10" />
                  <div className="flex w-full items-end justify-between gap-3 p-5">
                    <h4 className="font-bebas text-2xl tracking-wide text-white sm:text-3xl">{activity.title}</h4>
                    <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-[#071d31]/45 text-white transition-colors group-hover:bg-white group-hover:text-[#0E3453]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
