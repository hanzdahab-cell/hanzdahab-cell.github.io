import { ArrowRight } from 'lucide-react';
import { packagesData } from '../../data/packages';
import { PageType } from '../../types';
import { SectionHero } from '../ui/SectionHero';
import { PhotoParallaxGallery } from '../ui/HorizontalParallaxGallery/PhotoParallaxGallery';
import { freedivingGalleryPhotos } from '../../data/courseMedia';

interface PackagesSectionProps {
  onOpenBooking: (pkgId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

interface PackageCardCopy {
  packageId: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  note?: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  programIndex?: number;
}

const PACKAGE_CARDS: PackageCardCopy[] = [
  {
    packageId: 'pkg-combo-week',
    programIndex: 0,
    category: 'BEGINNER COURSE + TRAINING',
    title: 'BEGINNER WEEK',
    description: '',
    tags: ['7 days', 'Beginner course', 'Coached practice'],
    price: '',
    cta: 'EXPLORE BEGINNER WEEK',
    imageSrc: '/images/cards/packages/beginner-week.webp',
    imageAlt: 'Freedive Dahab underwater beginner week poster',
    imagePosition: '50% 50%',
  },
  {
    packageId: 'pkg-combo-week',
    programIndex: 1,
    category: 'ADVANCED COURSE + TRAINING',
    title: 'ADVANCED WEEK',
    description: '',
    tags: ['7 days', 'Advanced course', 'Coached practice'],
    price: '',
    cta: 'EXPLORE ADVANCED WEEK',
    imageSrc: '/images/cards/packages/advanced-week.webp',
    imageAlt: 'Freedive Dahab advanced freediving week poster',
    imagePosition: '50% 50%',
  },
  {
    packageId: 'pkg-combo-week',
    programIndex: 2,
    category: 'BEGINNER + ADVANCED COURSE',
    title: 'BEGINNER + ADVANCED COMBO',
    description: '',
    tags: ['7 days in price table', '9-day schedule', 'Two course levels'],
    price: '',
    cta: 'EXPLORE COMBO WEEK',
    imageSrc: '/images/cards/packages/beginner-advanced-week.webp',
    imageAlt: 'Freedive Dahab combined beginner and advanced week poster',
    imagePosition: '50% 50%',
  },
  {
    packageId: 'pkg-training-week',
    category: 'COACHED TRAINING WEEK',
    title: 'FREEDIVE TRAINING WEEK',
    description:
      'Ten coached sessions over seven days for divers who already hold a certification. We dive with you, watch your technique and give feedback session by session.',
    tags: ['10 sessions', '7 days', 'Blue Hole day', 'Equipment included'],
    price: 'From €300 diving only · €445 low season with 8 nights',
    note: 'The Blue Hole training day requires at least 3 participants.',
    cta: 'BOOK A TRAINING WEEK',
    imageSrc: '/images/cards/packages/training-week.webp',
    imageAlt: 'Freedive Dahab coached training week poster',
    imagePosition: '50% 50%',
  },
  {
    packageId: 'pkg-master-program',
    category: 'LONG-TERM TRAINING',
    title: 'FREEDIVING MASTER PROGRAM',
    description:
      'Two to five weeks of almost daily training, with a master instructor in the water with you at least three times a week. You set the targets; the plan adapts as you progress.',
    tags: ['2–5 weeks', 'Master instructor', 'Level 3 option', 'Blue Hole'],
    price: 'From €330 for 2 weeks · SSI Advanced Freediver required',
    cta: 'PLAN MY TRAINING',
    imageSrc: '/images/cards/packages/master-program.webp',
    imageAlt: 'Freedive Dahab master program poster',
    imagePosition: '50% 50%',
  },
  {
    packageId: 'pkg-instructor-path',
    category: 'BEGINNER TO INSTRUCTOR',
    title: 'ZERO TO HERO',
    description:
      'From your first breath-hold to a certified SSI instructor in three to six months. All courses included: Levels 1–3, Master, Training Technique, the Instructor Course and Instructor Kit.',
    tags: ['Level 1–3', 'Master', 'Training Technique', 'ITC + Instructor Kit'],
    price: '€2,945 package · €3,310 normal · First Aid course not included',
    cta: 'START THE PATHWAY',
    imageSrc: '/images/cards/packages/zero-to-hero.webp',
    imageAlt: 'Freedive Dahab zero-to-hero underwater training poster',
    imagePosition: '50% 45%',
  },
];

export function PackagesSection({ onNavigate, currency }: PackagesSectionProps) {
  const formatPrice = (eur: number, currency: 'EUR' | 'USD' | 'EGP') => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="packages" className="ocean-surface relative border-t border-white/5 px-6 pb-24 pt-0 sm:pb-32">
      <SectionHero
        imageSrc="/images/detail-galleries/packages/training-week-bottom.jpg"
        imageAlt="Two freedivers training beneath the clear water in Dahab."
        className="-mx-6 mb-12 min-h-[50svh] sm:mb-16"
      >
        <div className="max-w-4xl space-y-4 text-left">
          <div className="text-xs font-alata tracking-[0.3em] uppercase text-cyan-100">
            Freediving programs &amp; training weeks
          </div>
          <h1 className="font-bebas text-5xl leading-tight tracking-[0.05em] text-white sm:text-6xl md:text-7xl">
            Freediving packages in <span className="text-cyan-200">Dahab</span>
          </h1>
          <p className="max-w-3xl text-left text-base leading-relaxed text-slate-100 sm:text-lg">
            Choose a coached training week, an SSI course and training combo, or a longer instructor
            pathway.
          </p>
        </div>
      </SectionHero>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl space-y-3 text-center sm:mb-10">
          <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Packages
          </p>
          <h2 className="font-bebas text-3xl tracking-[0.04em] text-white sm:text-4xl">
            Explore Dahab programs
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300">
            Compare the packages and follow each one to its existing details and booking flow.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PACKAGE_CARDS.map((card) => {
            const packageInfo = packagesData.find((pkg) => pkg.id === card.packageId);
            if (!packageInfo) return null;

            const program = card.programIndex === undefined
              ? undefined
              : packageInfo.programs?.[card.programIndex];
            const detailPage = `package-${packageInfo.slug}` as PageType;

            return (
              <a
                key={`${card.packageId}-${card.programIndex ?? 'package'}`}
                href={`#${detailPage}`}
                aria-label={`${card.cta}: ${card.title}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-ocean-pale/10 bg-[#0A2943] text-white transition-colors duration-300 hover:border-ocean-light/50 focus-visible:border-ocean-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#081F35]">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="h-full w-full object-contain"
                    style={{ objectPosition: card.imagePosition }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081F35]/80 via-transparent to-[#081F35]/10" aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-alata text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    {card.category}
                  </p>
                  <h3 className="mt-2 font-bebas text-2xl leading-tight tracking-[0.04em] text-white sm:text-3xl">
                    {program?.title ?? card.title}
                  </h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-200">
                    {program?.overview ?? card.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${card.title} highlights`}>
                    {card.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-alata text-[10px] leading-tight text-slate-100">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    {(card.note || program?.duration) && (
                      <p className="mb-3 text-xs leading-relaxed text-slate-300">
                        {card.note ?? program?.duration}
                      </p>
                    )}
                    <p className="text-sm font-semibold leading-relaxed text-white">
                      {program?.prices[0]
                        ? `From ${formatPrice(program.prices[0].priceEur, currency)} · diving only`
                        : card.price}
                    </p>
                    <div className="mt-4 flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors group-hover:border-cyan-200 group-hover:bg-cyan-200 group-hover:text-[#0E3453] group-focus-visible:border-cyan-200 group-focus-visible:bg-cyan-200 group-focus-visible:text-[#0E3453]">
                      <span>{card.cta}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-24">
          <PhotoParallaxGallery
            label="Freedive Dahab package photos"
            photos={freedivingGalleryPhotos}
          />
        </div>
      </div>
    </section>
  );
}
