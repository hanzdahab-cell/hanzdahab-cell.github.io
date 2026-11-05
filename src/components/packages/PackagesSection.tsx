import { ArrowRight } from 'lucide-react';
import { packagesData } from '../../data/packages';
import { PageType } from '../../types';
import { SectionHero } from '../ui/SectionHero';

interface PackagesSectionProps {
  onOpenBooking: (pkgId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
  headingLevel?: 'h1' | 'h2';
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
    tags: ['9 days', 'Two course levels', 'Coached practice'],
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
      'Seven days and ten freediving sessions for certified divers who want to refine their skills, with an instructor coaching your sessions.',
    tags: ['10 sessions', '7 days', 'Blue Hole day', 'Equipment included'],
    price: '€300 diving only · €445 low season or €485 high season with 8 nights',
    note: 'The Blue Hole training day requires at least 3 participants. Low season: Dec 1–Mar 31; high season: Apr 1–Nov 30.',
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
      'Daily training for up to four weeks, including coaching from a master instructor at least three times a week and a plan that adapts to your progress.',
    tags: ['2–5 weeks', 'Master instructor', 'Coaching sessions', 'Advanced Freediver required'],
    price: 'From €335 for 2 weeks · equipment rental available',
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
      'A flexible three-to-six-month path from your first breath-hold to SSI Instructor, including Levels 1–3, the Master Program, Training Techniques, and the Instructor Course.',
    tags: ['Level 1–3', 'Master', 'Training Technique', 'ITC + Instructor Kit'],
    price: '€2,945 package · €3,310 normal · First Aid course not included',
    cta: 'START THE PATHWAY',
    imageSrc: '/images/cards/packages/zero-to-hero.webp',
    imageAlt: 'Freedive Dahab zero-to-hero underwater training poster',
    imagePosition: '50% 45%',
  },
];

export function PackagesSection({ onNavigate, onOpenBooking, currency, headingLevel = 'h1' }: PackagesSectionProps) {
  const PageHeading = headingLevel;
  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${Math.round(eur)}`;
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
          <PageHeading className="font-bebas text-5xl leading-tight tracking-[0.05em] text-white sm:text-6xl md:text-7xl">
            Freediving packages in <span className="text-cyan-200">Dahab</span>
          </PageHeading>
          <div className="max-w-3xl space-y-4">
            <p className="text-left text-base leading-relaxed text-slate-100 sm:text-lg">
              Courses, training, accommodation, and a little adventure, all in one booking. Join a
              group of like-minded freedivers for a week or more. Check available dates in our
              calendar; if none suit you, request your own dates and we will try to arrange them
              for a small extra cost.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0E3453] hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Check available dates <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex min-h-11 items-center rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request different dates
              </button>
            </div>
          </div>
        </div>
      </SectionHero>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div id="package-overview" className="mx-auto mb-8 max-w-3xl scroll-mt-28 space-y-3 text-center sm:mb-10">
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

        <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-2">
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
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A2943] text-white transition-[transform,border-color,box-shadow] duration-[350ms] ease-out hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_16px_32px_rgba(0,0,0,0.24)] focus-visible:-translate-y-1 focus-visible:border-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#081F35]">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="h-full w-full object-contain"
                    style={{ objectPosition: card.imagePosition }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-alata text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
                    {card.category}
                  </p>
                  <h3 className="mt-2 font-bebas text-2xl leading-tight tracking-[0.04em] text-white sm:text-3xl">
                    {program?.title ?? card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {program?.overview ?? card.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${card.title} highlights`}>
                    {card.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-alata text-[10px] leading-tight text-slate-100 sm:text-[11px]">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    {(card.note || program?.duration) && (
                      <p className="mb-3 text-xs leading-relaxed text-slate-300">{card.note ?? program?.duration}</p>
                    )}
                    <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">
                      {program?.prices[0]
                        ? `From ${formatPrice(program.prices[0].priceEur)} · diving only`
                        : card.price}
                    </p>
                    <div className="mt-4 flex min-h-11 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-[350ms] group-hover:border-cyan-200 group-hover:bg-cyan-200 group-hover:text-[#0E3453] group-focus-visible:border-cyan-200 group-focus-visible:bg-cyan-200 group-focus-visible:text-[#0E3453] motion-reduce:transition-none">
                      <span>{card.cta}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
