import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS } from '../../utils/i18n';
import type { PageType } from '../../types';
import './HeroSurface.css';

interface HeroSurfaceProps {
  onNavigate: (page: PageType) => void;
}

export function HeroSurface({ onNavigate }: HeroSurfaceProps) {
  const { language } = useLanguage();
  const [headline, foundingYear] = TRANSLATIONS[language].hero.line1
    .split(' — ')
    .map((part) => part.trim());

  return (
    <section
      id="home"
      aria-label="Freedive Dahab"
      className="home-hero relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#081F35] px-5 py-16 text-white sm:px-8 lg:py-20"
    >
      <img
        src="/images/story-carousel/blue-hole-freediver.jpg"
        alt="A freediver descending beside a coral reef, shown head to fins"
        fetchPriority="high"
        className="home-hero__diver absolute bottom-0 right-0 -z-20 h-[76%] w-full object-cover object-center sm:h-[86%] lg:h-full lg:w-[58%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,31,53,0.62)_0%,rgba(8,31,53,0.54)_46%,rgba(8,31,53,0.9)_100%)] lg:bg-[linear-gradient(90deg,#081F35_0%,rgba(8,31,53,0.96)_30%,rgba(8,31,53,0.68)_55%,rgba(8,31,53,0.04)_100%)]"
      />

      <div className="home-hero__content relative mx-auto flex w-full max-w-7xl flex-col items-center text-center lg:items-start lg:text-left">
        <img
          src="/logo-freedive-dahab.png"
          alt="Freedive Dahab"
          className="mb-6 h-24 w-auto max-w-[min(64vw,18rem)] object-contain sm:mb-8 sm:h-32"
          fetchPriority="high"
        />
        <p className="mb-3 font-righteous text-xs uppercase tracking-[0.24em] text-[#A9D2EC] sm:text-sm">
          Dahab · South Sinai · Red Sea
        </p>
        <h1 className="home-hero__title max-w-3xl text-balance font-tidal text-[clamp(2.25rem,6.3vw,5.4rem)] leading-[0.98] tracking-[0.025em] text-white">
          {headline}
        </h1>
        <p className="mt-3 font-bebas text-[clamp(1.8rem,3.4vw,3rem)] tracking-[0.14em] text-[#55E3D4] drop-shadow-[0_0_22px_rgba(85,227,212,0.38)]">
          {foundingYear}
        </p>
        <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#55E3D4] px-7 py-3 font-alata text-sm font-semibold text-[#081F35] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore Courses
          </button>
          <button
            type="button"
            onClick={() => onNavigate('calendar')}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-[#081F35]/25 px-7 py-3 font-alata text-sm font-semibold text-white transition-colors hover:border-[#55E3D4] hover:bg-[#55E3D4]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Our Calendar
          </button>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = HeroSurface;
export default HeroSurface;
