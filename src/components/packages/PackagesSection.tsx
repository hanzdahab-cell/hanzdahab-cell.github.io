import { packagesData } from '../../data/packages';
import { CheckCircle2, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { PageType } from '../../types';
import { freedivingGalleryPhotos } from '../../data/courseMedia';
import { PhotoCarousel } from '../ui/PhotoCarousel';
import { OfferingCardStack } from '../ui/OfferingCardStack';
import { SectionHero } from '../ui/SectionHero';

interface PackagesSectionProps {
  onOpenBooking: (pkgId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
  onNavigate: (page: PageType) => void;
}

export function PackagesSection({ onOpenBooking, currency, onNavigate }: PackagesSectionProps) {
  const comboPackage = packagesData.find((pkg) => pkg.id === 'pkg-combo-week');
  const packageStackItems = packagesData.map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    description: pkg.subtitle,
    imageSrc: pkg.image.url,
    imageAlt: pkg.image.alt,
    tag: pkg.badge ?? pkg.duration,
    href: `#package-${pkg.slug}`,
    ctaLabel: 'Explore package',
  }));
  const comboWeekItems = (comboPackage?.programs ?? []).map((program, index) => ({
    id: `${comboPackage?.id ?? 'combo-week'}-${index}`,
    title: program.title,
    description: program.overview,
    imageSrc: comboPackage?.image.url,
    imageAlt: comboPackage?.image.alt,
    tag: program.duration,
    href: `#package-${comboPackage?.slug}`,
    ctaLabel: 'View week details',
  }));

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="packages" className="ocean-surface relative border-t border-white/5 px-6 pb-24 pt-0 sm:pb-32">
      <SectionHero imageSrc={packagesData[0]?.image.url ?? '/images/story-carousel/training-line.jpg'} imageAlt="Freediver at Lighthouse Bay" className="-mx-6 mb-20 min-h-[50svh]">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-alata tracking-[0.3em] uppercase text-cyan-100">
            <Waves className="w-4 h-4" aria-hidden="true" />
            <span>Freediving programs &amp; training weeks</span>
          </div>
          <h1 className="font-bebas text-5xl leading-tight tracking-[0.05em] text-white sm:text-6xl md:text-7xl">
            Residencies &amp; <span className="text-cyan-200">expedition packages</span>
          </h1>
          <p className="text-base leading-relaxed text-slate-100 sm:text-lg">
            Choose a guided course-and-training week or a longer instructor pathway. Accommodation
            and additional activities depend on the program you select.
          </p>
        </div>
      </SectionHero>

      <div className="max-w-7xl mx-auto relative z-10">
        <OfferingCardStack
          label="Packages"
          title="Explore Dahab programs"
          description="Compare the packages and follow each one to its existing details and booking flow."
          items={packageStackItems}
        />

        {comboWeekItems.length > 0 && (
          <OfferingCardStack
            label="Combination weeks"
            title="Choose your combo-week plan"
            description="Explore the published beginner, advanced, and combined week plans. The package page includes the full schedule and brochure pricing notes."
            items={comboWeekItems}
          />
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 group"
            >
              <div>
                {/* Header Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <PhotoCarousel
                    images={[
                      { src: pkg.image.url, alt: pkg.image.alt },
                      ...freedivingGalleryPhotos,
                    ]}
                    label={`${pkg.title} photos`}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-ocean text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="text-3xl font-serif font-bold text-white block">
                      {formatPrice(pkg.priceEur)}
                    </span>
                    {pkg.saveAmountEur > 0 && (
                      <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                        SAVE {formatPrice(pkg.saveAmountEur)}
                      </span>
                    )}
                    {pkg.rateNote && (
                      <span className="block text-right text-[10px] font-medium text-[#A9D2EC]">2017 brochure rate · confirm current price</span>
                    )}
                  </div>
                </div>

                {/* Package Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DURATION: {pkg.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pkg.subtitle}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Package Inclusions:
                    </div>
                    {pkg.includedList.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                    {pkg.includedList.length > 3 && (
                      <p className="text-xs text-slate-400">+ {pkg.includedList.length - 3} more inclusions on the package page</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="grid grid-cols-1 gap-2 p-6 pt-0 sm:grid-cols-2 sm:px-8 sm:pb-8">
                <button
                  type="button"
                  onClick={() => onNavigate(`package-${pkg.slug}`)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/45 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Package details
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBooking(pkg.id)}
                  className="fd-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
