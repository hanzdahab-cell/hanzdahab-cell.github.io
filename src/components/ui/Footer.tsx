import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  Instagram,
  Facebook,
} from 'lucide-react';
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

export function Footer({ onOpenBooking, onNavigate }: FooterProps) {
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

  const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

  return (
    <footer className="bg-foam text-deep">
      {/* Brand block */}
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-2 text-center sm:px-8">
        <img
          src="/logo-freedive-dahab.png"
          alt="Freedive Dahab"
          className="mx-auto h-16 w-auto max-w-44 object-contain brightness-0"
        />
        <p className="mx-auto mt-4 max-w-md font-alata text-sm text-slate-600">
          Freediving school &amp; training center since 2003
        </p>
        <button
          type="button"
          onClick={onOpenBooking}
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-cyan-500 px-8 font-alata text-sm text-white transition-colors hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
        >
          Contact Us
        </button>

        <div className="mt-7 flex items-center justify-center gap-2.5">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram — @freedive_dahab"
            className="grid size-10 place-items-center rounded-full bg-white text-deep shadow-sm transition-colors hover:text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook — Freedive Dahab"
            className="grid size-10 place-items-center rounded-full bg-white text-deep shadow-sm transition-colors hover:text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            <Facebook className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.tripadvisor}
            target="_blank"
            rel="noreferrer"
            aria-label="TripAdvisor — Freedive Dahab reviews"
            className="grid size-10 place-items-center rounded-full bg-white text-deep shadow-sm transition-colors hover:text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            <PlatformMark platform="tripadvisor" />
          </a>
          <a
            href={siteConfig.social.googleMaps}
            target="_blank"
            rel="noreferrer"
            aria-label="Freedive Dahab on Google Maps"
            className="grid size-10 place-items-center rounded-full bg-white text-deep shadow-sm transition-colors hover:text-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            <PlatformMark platform="google" />
          </a>
        </div>
      </div>

      {/* Wave transition into the deep */}
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block h-14 w-full sm:h-[90px]"
      >
        <path
          d="M0 58 C 150 96 320 100 500 74 C 680 48 840 22 1030 30 C 1220 38 1330 66 1440 52 L 1440 110 L 0 110 Z"
          fill="#4E8CB8"
          opacity="0.35"
        />
        <path
          d="M0 74 C 170 30 340 26 520 52 C 700 78 880 104 1060 92 C 1240 80 1350 48 1440 58 L 1440 110 L 0 110 Z"
          fill="#0E3453"
        />
      </svg>

      {/* Location + 3D map on the deep gradient */}
      <div className="bg-gradient-to-b from-deep to-deep-dark text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-alata text-3xl sm:text-4xl">
              Find us at Lighthouse Bay
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cyan-100/80">
              Right on the water at Lighthouse Bay on El Fanar Street, central
              Dahab — look for us between the town and the reef.
            </p>

            <address className="mt-6 flex flex-col gap-3 text-sm not-italic text-cyan-100">
              <span className="inline-flex items-center gap-2.5">
                <MapPin
                  className="h-4 w-4 shrink-0 text-cyan-300"
                  aria-hidden="true"
                />
                15 El Fanar St, Dahab City — South Sinai 46617
              </span>
              <a
                className="inline-flex min-h-6 items-center gap-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={telHref}
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-cyan-300"
                  aria-hidden="true"
                />
                {siteConfig.contact.phone}
              </a>
              <a
                className="inline-flex min-h-6 items-center gap-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={`mailto:${siteConfig.contact.email}`}
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-cyan-300"
                  aria-hidden="true"
                />
                {siteConfig.contact.email}
              </a>
            </address>

            <nav aria-label="Footer">
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 font-alata text-sm text-cyan-100">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => navigate(link.page)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded px-1 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      <span>{link.label}</span>
                      <ArrowUp className="h-3 w-3 -rotate-45" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex items-center gap-3">
              <img
                src="/badges/ssi-logo-black.png"
                alt="SSI Instructor Training Center"
                className="h-8 w-auto max-w-28 object-contain brightness-0 invert"
              />
              <p className="text-[10px] tracking-[0.2em] text-cyan-200/80">
                {t.footer.certifiedCenter}
              </p>
            </div>
          </div>

          <a
            href={siteConfig.social.googleMaps}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Freedive Dahab's location at Lighthouse Bay in Google Maps"
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <img
              src="/images/footer-map-3d.png"
              alt="3D satellite view of Dahab's coastline with a pin marking Freedive Dahab on El Fanar Street"
              width={2216}
              height={996}
              loading="lazy"
              className="h-auto w-full drop-shadow-[0_30px_45px_rgba(2,12,22,0.55)] transition-transform duration-300 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5"
            />
            <span className="mt-4 inline-flex flex-wrap items-center gap-2 font-alata text-xs text-cyan-100 transition-colors group-hover:text-white">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Lighthouse Bay, Dahab
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              Open in Google Maps
            </span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-4 text-[11px] text-white/55 sm:flex-row sm:px-8">
            <p>
              © {new Date().getFullYear()} Freedive Dahab.{' '}
              {t.footer.allRightsReserved}
            </p>
            <p>Map data © OpenStreetMap contributors</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-10 items-center gap-1.5 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {t.footer.backToTop}
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
