import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { PlatformMark } from '../footer/ReviewsCarousel';
import { siteConfig } from '../../data/site';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageType) => void;
}

const FOOTER_LINKS: { label: string; page: PageType }[] = [
  { label: 'Freedive Dahab', page: 'home' },
  { label: 'SSI Courses', page: 'courses' },
  { label: 'Trainings', page: 'training' },
  { label: 'Packages', page: 'packages' },
];

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigate = (page: PageType) => {
    if (onNavigate) onNavigate(page);
    else scrollToTop();
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-[#0E3453]">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-[auto_minmax(12rem,1fr)_minmax(17rem,1.25fr)_10rem_auto]">
          <div className="flex items-center gap-4">
            <img
              src="/logo-freedive-dahab.png"
              alt="Freedive Dahab"
              className="h-14 w-auto max-w-36 object-contain brightness-0"
            />
            <img
              src="/badges/ssi-logo-black.png"
              alt="SSI Freediving"
              className="h-8 w-auto max-w-28 object-contain"
            />
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-alata sm:gap-x-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigate(link.page)}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded px-1 py-2 text-[#0E3453] transition-colors hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
                  >
                    <span>{link.label}</span>
                    <ArrowUp className="h-3 w-3 -rotate-45" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <address className="flex flex-col gap-1.5 text-xs not-italic text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-800" aria-hidden="true" />
              Lighthouse Bay, Dahab
            </span>
            <a className="inline-flex items-center gap-1.5 hover:text-cyan-800" href={`mailto:${siteConfig.contact.email}`}>
              <Mail className="h-3.5 w-3.5 text-cyan-800" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-cyan-800" href="tel:+201008452911">
              <Phone className="h-3.5 w-3.5 text-cyan-800" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </address>

          <iframe
            title="Map showing Freedive Dahab at Lighthouse Bay"
            src="https://www.google.com/maps?q=28.500013,34.5193704&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-24 w-full rounded-lg border border-slate-200 bg-slate-100 sm:col-span-1 lg:w-40"
          />

          <div className="flex items-center gap-1.5">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram — @freedive_dahab" className="grid size-9 place-items-center rounded-full text-[#0E3453] transition-colors hover:bg-slate-100 hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook — Freedive Dahab" className="grid size-9 place-items-center rounded-full text-[#0E3453] transition-colors hover:bg-slate-100 hover:text-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800">
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={siteConfig.social.tripadvisor} target="_blank" rel="noreferrer" aria-label="TripAdvisor — Freedive Dahab reviews" className="grid size-9 place-items-center rounded-full text-[#0E3453] transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800">
              <PlatformMark platform="tripadvisor" />
            </a>
            <a href={siteConfig.social.googleMaps} target="_blank" rel="noreferrer" aria-label="Freedive Dahab on Google Maps" className="grid size-9 place-items-center rounded-full text-[#0E3453] transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800">
              <PlatformMark platform="google" />
            </a>
          </div>
        </div>

        <p className="mt-3 border-t border-slate-200 pt-3 text-center text-[11px] text-slate-500 sm:text-left">
          © {new Date().getFullYear()} Freedive Dahab. {t.footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
