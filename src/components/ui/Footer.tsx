import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { PlatformMark } from '../footer/ReviewsCarousel';
import { siteConfig } from '../../data/site';

/* ==========================================================================
   FOOTER — photo-led course inquiry, contact area, and a
   three-layer blue wave band with the copyright and back-to-top control.
   ========================================================================== */

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
    <footer className="bg-[#081F35] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:gap-14">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-5">
            <img
              src="/logo-freedive-dahab.png"
              alt="Freedive Dahab"
              className="h-16 w-auto object-contain"
            />
            <img
              src="/badges/freediving-white.png"
              alt="SSI Freediving"
              className="h-10 w-auto max-w-[180px] object-contain"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">{t.footer.desc}</p>
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram — @freedive_dahab"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook — Freedive Dahab"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.tripadvisor}
              target="_blank"
              rel="noreferrer"
              aria-label="TripAdvisor — Freedive Dahab reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <PlatformMark platform="tripadvisor" />
            </a>
            <a
              href={siteConfig.social.googleMaps}
              target="_blank"
              rel="noreferrer"
              aria-label="Freedive Dahab on Google Maps"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <PlatformMark platform="google" />
            </a>
          </div>
        </div>

        <section aria-labelledby="footer-about-heading" className="space-y-4">
          <h2 id="footer-about-heading" className="font-alata text-sm font-semibold uppercase tracking-widest text-cyan-300">
            About Freedive Dahab
          </h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              <span>
                Lighthouse Bay, Dahab
                <span className="block text-xs text-slate-400">South Sinai, Egypt · Red Sea</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-cyan-300">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
              <a href="tel:+201008452911" className="transition-colors hover:text-cyan-300">
                {siteConfig.contact.phone}
              </a>
            </li>
          </ul>
        </section>

        <nav aria-label="Footer" className="space-y-4">
          <h2 className="font-alata text-sm font-semibold uppercase tracking-widest text-cyan-300">Explore</h2>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => navigate(link.page)}
                  className="group flex min-h-11 w-full items-center justify-between border-b border-white/10 py-2 text-left font-alata text-sm text-slate-300 transition-colors last:border-0 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <span>{link.label}</span>
                  <ArrowUp className="h-3.5 w-3.5 -rotate-45 text-slate-500 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Freedive Dahab · {t.footer.allRightsReserved}
      </div>
    </footer>
  );
}
