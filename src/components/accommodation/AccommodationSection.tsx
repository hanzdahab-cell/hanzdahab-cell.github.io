import { useState } from 'react';
import { roomTypes } from '../../data/accommodation';
import { Check, Users, Home, ArrowRight, Moon, Waves, Compass } from 'lucide-react';
import { PageType } from '../../types';
import { PhotoCarousel } from '../ui/PhotoCarousel';

interface AccommodationSectionProps {
  onOpenBooking: () => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

export function AccommodationSection({ onOpenBooking, currency, onNavigate }: AccommodationSectionProps) {
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
      page: 'experience' as PageType,
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
            <p className="text-slate-300 text-base font-alata font-normal max-w-xl leading-relaxed">
              For short or long stays, we offer 4 spacious rooms located right above our Freedive Dahab school.
            </p>
          </div>
        </div>

        {/* 2-Column Room Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Room Selector Navigation */}
          <div id="rooms" className="lg:col-span-5 scroll-mt-20 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              {roomTypes.map((room) => {
                const isSelected = room.id === activeRoomId;
                return (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? 'bg-sky-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.15)] text-white'
                        : 'bg-slate-900/30 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif text-xl font-bold">{room.title}</h4>
                      <span className="font-mono text-sm text-cyan-300 font-semibold">
                        {formatPrice(room.pricePerNightEur.min)}–{formatPrice(room.pricePerNightEur.max)}
                        <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-light mb-2">{room.subtitle}</p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-cyan-400" />
                        Up to {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                      </span>
                      {room.featured && (
                        <span className="text-cyan-400 font-semibold uppercase">Featured</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900/50 border border-cyan-400/20 mt-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                Package Discount
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Booking your accommodation alongside an SSI Course or Depth Package saves up to €180 on room rates.
              </p>
              <button
                onClick={onOpenBooking}
                className="btn-luxury text-white text-xs w-full py-3 mt-2"
              >
                RESERVE LODGE STAY
              </button>
            </div>
          </div>

          {/* Right Column: Selected Room Image & Amenities */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden">
              <PhotoCarousel
                images={activeRoom.images.map((image, index) => ({
                  src: image,
                  alt: `${activeRoom.title} accommodation photo ${index + 1}`,
                }))}
                label={`${activeRoom.title} photos`}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300">
                  {formatPrice(activeRoom.pricePerNightEur.min)} – {formatPrice(activeRoom.pricePerNightEur.max)} / night
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-serif text-3xl font-bold text-white mb-1">
                  {activeRoom.title}
                </h3>
                <p className="text-xs text-cyan-200/90 font-mono">
                  {activeRoom.subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Lodge Amenities & Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {activeRoom.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(`room-${activeRoom.id}`)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/45 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Stay details
                </button>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="fd-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Book {activeRoom.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Recommended activities */}
        <section aria-labelledby="recommended-activities-heading" className="mt-20 border-t border-white/10 pt-12 sm:mt-24 sm:pt-16">
          <h3 id="recommended-activities-heading" className="mb-6 font-bebas text-3xl tracking-wide text-white sm:text-4xl">
            Recommended Activities
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recommendedActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <article key={activity.title} className="group relative isolate flex min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943]">
                  {activity.image ? (
                    <img src={activity.image} alt={activity.alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(89,166,208,0.45),transparent_55%),linear-gradient(135deg,#123c5a,#071d31)]" />
                  )}
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071d31]/95 via-[#071d31]/35 to-[#071d31]/10" />
                  <div className="flex w-full items-end justify-between gap-3 p-5">
                    <h4 className="font-bebas text-2xl tracking-wide text-white">{activity.title}</h4>
                    <button
                      type="button"
                      onClick={() => onNavigate(activity.page)}
                      aria-label={`Explore ${activity.title}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-[#071d31]/45 text-white transition-colors hover:bg-white hover:text-[#0E3453] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
