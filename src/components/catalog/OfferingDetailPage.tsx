import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Users } from 'lucide-react';
import { activitiesData } from '../../data/activities';
import { roomTypes } from '../../data/accommodation';
import { packagesData } from '../../data/packages';
import {
  CourseGalleryImage,
  desertExperiencePhotos,
  freedivingGalleryPhotos,
} from '../../data/courseMedia';
import { Activity, Package, PackageProgram, PageType, RoomType } from '../../types';
import { SectionHero } from '../ui/SectionHero';
import { GalleryCarousel, type GallerySlide } from '../ui/GalleryCarousel';
import { getPackageDetailGalleryItems } from '../../data/detailGalleries';

type OfferingKind = 'package' | 'room' | 'activity';

interface OfferingDetailPageProps {
  kind: OfferingKind;
  slug: string;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
  onOpenBooking: (offeringId?: string) => void;
  onBookStay: (roomId: string) => void;
}

interface OfferingContent {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  images: CourseGalleryImage[];
  sections: { title: string; items: string[] }[];
  bookingId: string;
  programs?: PackageProgram[];
  rateNote?: string;
  longDescription?: string[];
  extraActivities?: { title: string; priceEur: number }[];
  bookingNotes?: string[];
  roomDetails?: RoomType;
}

function formatPrice(eur: number, currency: 'EUR' | 'USD' | 'EGP') {
  if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
  if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
  return `€${eur}`;
}

function toGalleryImage(src: string, alt: string): CourseGalleryImage {
  return { src, alt };
}

function packageContent(pkg: Package, currency: OfferingDetailPageProps['currency']): OfferingContent {
  return {
    title: pkg.title,
    subtitle: pkg.subtitle,
    description: pkg.description ?? `A curated ${pkg.duration.toLowerCase()} Freedive Dahab stay, with coaching and logistics arranged around your time in the Red Sea.`,
    duration: pkg.duration,
    price: formatPrice(pkg.priceEur, currency),
    images: [
      toGalleryImage(pkg.image.url, pkg.image.alt),
      ...freedivingGalleryPhotos.slice(0, 3),
    ],
    sections: [{ title: 'Included in your package', items: pkg.includedList }],
    bookingId: pkg.id,
    programs: pkg.programs,
    rateNote: pkg.rateNote,
    extraActivities: pkg.extraActivities,
    bookingNotes: pkg.bookingNotes,
  };
}

function roomContent(room: RoomType, currency: OfferingDetailPageProps['currency']): OfferingContent {
  return {
    title: room.title,
    subtitle: room.subtitle,
    description: room.description,
    duration: `Up to ${room.capacity} ${room.capacity === 1 ? 'guest' : 'guests'}`,
    price: `${formatPrice(room.pricePerNightEur.min, currency)}–${formatPrice(room.pricePerNightEur.max, currency)} / night`,
    images: room.images.map((image) => toGalleryImage(image.url, image.alt)),
    sections: [{ title: 'Room amenities', items: room.amenities }],
    bookingId: room.id,
    roomDetails: room,
  };
}

function activityContent(
  activity: Activity,
  currency: OfferingDetailPageProps['currency'],
): OfferingContent {
  const additionalPhotos = activity.id === 'desert-sunset'
    ? desertExperiencePhotos
    : freedivingGalleryPhotos;
  return {
    title: activity.title,
    subtitle: activity.duration,
    description: activity.description,
    duration: activity.duration,
    price: activity.priceLabel ?? formatPrice(activity.priceEur, currency),
    images: [
      toGalleryImage(activity.image.url, activity.image.alt),
      ...additionalPhotos.slice(0, 3),
    ],
    sections: [
      { title: 'Highlights', items: activity.highlights },
      { title: 'What is included', items: activity.includes },
    ],
    bookingId: activity.id,
    rateNote: activity.rateNote,
    longDescription: activity.longDescription,
    bookingNotes: activity.bookingNotes,
  };
}

function getOfferingContent(
  kind: OfferingKind,
  slug: string,
  currency: OfferingDetailPageProps['currency'],
): OfferingContent | undefined {
  if (kind === 'package') {
    const pkg = packagesData.find((item) => item.slug === slug);
    return pkg ? packageContent(pkg, currency) : undefined;
  }
  if (kind === 'room') {
    const room = roomTypes.find((item) => item.id === slug);
    return room ? roomContent(room, currency) : undefined;
  }
  const activity = activitiesData.find((item) => item.id === slug);
  return activity ? activityContent(activity, currency) : undefined;
}

export function OfferingDetailPage({
  kind,
  slug,
  currency,
  onNavigate,
  onOpenBooking,
  onBookStay,
}: OfferingDetailPageProps) {
  const content = getOfferingContent(kind, slug, currency);
  const backPage: PageType = kind === 'package' ? 'packages' : kind === 'room' ? 'accommodation' : 'experience';

  if (!content) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center gap-5 px-6 pt-28 text-white">
        <h1 className="font-bebas text-5xl">We could not find that page</h1>
        <p className="text-white/75">The offering may have moved. Browse the full collection instead.</p>
        <button
          type="button"
          onClick={() => onNavigate(backPage)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Browse {kind === 'room' ? 'stays' : kind === 'activity' ? 'experiences' : 'packages'}
        </button>
      </div>
    );
  }

  const packageGalleryItems = kind === 'package'
    ? getPackageDetailGalleryItems(slug, content.title)
    : [];
  const roomDetails = content.roomDetails;
  if (kind === 'package' && packageGalleryItems.length === 0 && content.images[0]) {
    packageGalleryItems.push({
      id: `${slug}-gallery-cover`,
      title: content.title,
      description: 'Package cover photo',
      imageSrc: content.images[0].src,
      imageAlt: content.images[0].alt,
      tag: 'Package gallery',
    });
  }

  return (
    <article className="ocean-surface min-h-screen pb-24 pt-28 text-white sm:pt-36">
      <SectionHero
        imageSrc={content.images[0]?.src ?? ''}
        imageAlt={content.images[0]?.alt ?? ''}
        className={`min-h-[50svh] ${kind === 'room' ? 'bg-[#081F35]' : ''}`}
        imageFit={kind === 'room' ? 'contain' : 'cover'}
        contentClassName="py-10 sm:py-14"
      >
        <div className="max-w-3xl">
          <button
            type="button"
            onClick={() => onNavigate(backPage)}
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-white/85 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to {kind === 'room' ? 'stays' : kind === 'activity' ? 'experiences' : 'packages'}
          </button>
          <div className="max-w-2xl space-y-6 rounded-2xl border border-white/15 bg-[#061A2B]/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9D2EC]">
                {kind === 'package' ? 'Freedive Dahab package' : kind === 'room' ? 'Sea Lodge stay' : 'Dahab experience'}
              </p>
              <h1 className="font-bebas text-5xl leading-[0.95] sm:text-6xl">{content.title}</h1>
              <p className="text-sm leading-relaxed text-white/70">{content.subtitle}</p>
            </div>

            <p className="text-sm leading-relaxed text-white/85">{content.description}</p>
            {content.rateNote && (
              <p className="text-xs leading-relaxed text-[#A9D2EC]">{content.rateNote}</p>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-3 border-y border-white/10 py-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#A9D2EC]" aria-hidden="true" />
                {content.duration}
              </span>
              {kind === 'room' && (
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#A9D2EC]" aria-hidden="true" />
                  Guest capacity
                </span>
              )}
              <span className="font-semibold text-white">{content.price}</span>
            </div>

            <button
              type="button"
              onClick={() => kind === 'room' ? onBookStay(content.bookingId) : onOpenBooking(content.bookingId)}
              className="fd-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Enquire about this {kind === 'room' ? 'stay' : kind}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </SectionHero>

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-6 sm:pt-14">
        {content.images.length > 0 && kind === 'package' ? (
          <GalleryCarousel items={packageGalleryItems} label={`${content.title} photo gallery`} />
        ) : content.images.length > 0 ? (
          <section aria-label={`${content.title} photo gallery`} className="mb-12">
            <GalleryCarousel
              items={content.images.map((image, index): GallerySlide => ({
                id: `${slug}-gallery-${index + 1}`,
                title: content.title,
                imageSrc: image.src,
                imageAlt: image.alt,
              }))}
              label={`${content.title} photo gallery`}
              showBackdrop={kind !== 'room'}
            />
          </section>
        ) : kind === 'room' ? (
          <p className="mb-12 rounded-xl border border-white/10 bg-[#0A2943] px-5 py-4 text-sm text-slate-200">
            Photos for this room will be added soon.
          </p>
        ) : null}

        {roomDetails && (
          <section aria-labelledby="room-detail-heading" className="mx-auto mb-12 max-w-4xl space-y-6">
            <div>
              <h2 id="room-detail-heading" className="font-bebas text-3xl text-white sm:text-4xl">
                Room details and nightly rates
              </h2>
              <dl className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-[#0A2943] p-5 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Beds</dt>
                  <dd className="mt-1 text-slate-100">{roomDetails.bedDescription}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Room size</dt>
                  <dd className="mt-1 text-slate-100">{roomDetails.sizeLabel}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Capacity</dt>
                  <dd className="mt-1 text-slate-100">Up to {roomDetails.capacity} guests</dd>
                </div>
              </dl>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {(['low', 'high'] as const).map((season) => (
                <section key={season} className="rounded-2xl border border-white/10 bg-[#0A2943] p-5">
                  <h3 className="font-semibold text-white">
                    {season === 'low' ? 'Low season · Dec–Mar' : 'High season · Apr–Nov'}
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-300">Single occupancy</dt>
                      <dd className="font-semibold text-white">{formatPrice(roomDetails.seasonalPricesEur[season].single, currency)} / night</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-300">Double occupancy</dt>
                      <dd className="font-semibold text-white">{formatPrice(roomDetails.seasonalPricesEur[season].double, currency)} / night</dd>
                    </div>
                  </dl>
                </section>
              ))}
            </div>
            {slug === 'blue-hole-room' && (
              <p className="text-sm leading-relaxed text-slate-200">
                The Blue Hole Room rate is the same when a third guest stays in the room.
              </p>
            )}
            <p className="text-sm leading-relaxed text-slate-200">
              Long-stay discounts: 15% off stays of 10–20 days and 30% off stays of 21–30 days.
            </p>
          </section>
        )}

        {content.longDescription && (
          <section aria-label={`${content.title} details`} className="mx-auto mt-10 max-w-4xl space-y-5">
            {content.longDescription.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-white/80">{paragraph}</p>
            ))}
          </section>
        )}

        {content.programs && (
          <div className="mt-12 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9D2EC]">Program options</p>
              <h2 className="font-bebas text-4xl">Schedules &amp; planning</h2>
              {content.rateNote && <p className="max-w-3xl text-sm leading-relaxed text-white/65">{content.rateNote}</p>}
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {content.programs.map((program) => (
                <section key={program.title} className="rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
                  <p className="text-xs font-medium text-[#A9D2EC]">{program.duration}</p>
                  <h3 className="mt-2 font-bebas text-3xl">{program.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{program.overview}</p>
                  {program.prices.length > 0 && (
                    <div className="mt-5 space-y-2 border-y border-white/10 py-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-white/60">Prices</h4>
                      {program.prices.map((price) => (
                        <div key={price.label} className="flex items-center justify-between gap-4 text-sm">
                          <span className="text-white/75">{price.label}</span>
                          <span className="shrink-0 font-semibold text-white">{formatPrice(price.priceEur, currency)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {program.schedule.length > 0 && (
                    <>
                      <h4 className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/60">
                        Day-by-day outline
                      </h4>
                      <ol className="mt-3 space-y-3">
                    {program.schedule.map((day, index) => {
                      const period = day.match(/^(Day \d+|Month \d+|Months \d+[–-]\d+)/)?.[0];
                      const description = period
                        ? day.slice(period.length).replace(/^:\s*/, '')
                        : day;
                      return (
                      <li key={day} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                        <span className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border border-white/20 px-1.5 text-[10px] font-semibold text-[#A9D2EC]">
                          {period ?? index + 1}
                        </span>
                        <span>{description}</span>
                      </li>
                    )})}
                      </ol>
                    </>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}

        {content.extraActivities && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
            <h2 className="font-bebas text-3xl">Optional activities</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {content.extraActivities.map((activity) => (
                <li key={activity.title} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/75">{activity.title}</span>
                  <span className="shrink-0 font-semibold text-white">{formatPrice(activity.priceEur, currency)}</span>
                </li>
              ))}
            </ul>
            {content.rateNote && <p className="mt-5 text-sm leading-relaxed text-white/60">{content.rateNote}</p>}
          </section>
        )}

        {content.bookingNotes && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
            <h2 className="font-bebas text-3xl">Before you book</h2>
            <ul className="mt-5 space-y-3">
              {content.bookingNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A9D2EC]" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {content.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
              <h2 className="font-bebas text-3xl tracking-wide">{section.title}</h2>
              <ul className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A9D2EC]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
