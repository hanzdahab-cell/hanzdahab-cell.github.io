import { Phone, Mail, MapPin, ArrowUp, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ReviewsCarousel, PlatformMark } from '../footer/ReviewsCarousel';
import { siteConfig } from '../../data/site';

/* ==========================================================================
   FOOTER — photo-led course inquiry, white contact area, reviews, and a
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

  return (
    <footer className="relative bg-white text-[#0E3453]">
      <section className="relative isolate overflow-hidden bg-[#081F35] text-white">
        <img
          src="/images/footer-freediver.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081F35]/95 via-[#081F35]/75 to-[#081F35]/35" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm text-[#A9D2EC]">Training in Dahab, made personal</p>
            <h2 className="font-bebas text-4xl leading-none sm:text-5xl">Ready for your next depth?</h2>
            <p className="text-sm leading-relaxed text-white/80">
              Tell our instructor team what you want to learn and we’ll help you choose a course.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ask about a course
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ========================================================== */}
      {/* WHITE CONTENT AREA — info | thin line | links | sea panel  */}
      {/* ========================================================== */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">

          {/* LEFT — our info (extreme opposite side from the sea) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-4">
              <img
                src="/logo-freedive-dahab.png"
                alt="Freedive Dahab"
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-bold tracking-wide uppercase">Freedive Dahab</span>
                <span className="text-[10px] font-mono tracking-[0.22em] text-[#22628C] uppercase">
                  SSI Diamond Instructor Training Center
                </span>
              </div>
            </div>

            <p className="font-alata text-sm text-slate-500 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <ul className="space-y-2.5 text-sm font-alata text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22628C] shrink-0 mt-0.5" />
                <span>
                  Lighthouse Bay &amp; Blue Hole, Dahab
                  <span className="block text-xs text-slate-400">South Sinai, Red Sea, Egypt</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#22628C] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#22628C] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#22628C] shrink-0" />
                <a href="tel:+201008452911" className="hover:text-[#22628C] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>

            {/* Social — real accounts */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram — @freedive_dahab"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0E3453] hover:border-[#22628C] hover:text-[#22628C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook — Freedive Dahab"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0E3453] hover:border-[#22628C] hover:text-[#22628C] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noreferrer"
                aria-label="TripAdvisor — Freedive Dahab reviews"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#22628C] transition-colors"
              >
                <PlatformMark platform="tripadvisor" />
              </a>
              <a
                href={siteConfig.social.googleMaps}
                target="_blank"
                rel="noreferrer"
                aria-label="Freedive Dahab on Google Maps"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:border-[#22628C] transition-colors"
              >
                <PlatformMark platform="google" />
              </a>
            </div>

          </div>

          {/* THIN LINE divider */}
          <div className="hidden lg:block w-px bg-slate-200" aria-hidden="true" />

          {/* MIDDLE — the four page links */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#22628C] mb-4">
              Explore
            </div>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="group w-full text-left py-3 border-b border-slate-100 last:border-0 flex items-center justify-between font-alata text-sm text-slate-600 hover:text-[#22628C] transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowUp className="w-3.5 h-3.5 -rotate-45 text-slate-300 group-hover:text-[#22628C] transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — Red Sea photo panel */}
          <div
            className="lg:col-span-4 relative min-h-[240px] overflow-hidden rounded-2xl bg-[#0E3453] lg:min-h-full"
          >
            <img
              src="/images/footer-freediver.jpg"
              alt="Freediver gliding through the water off Dahab's Lighthouse Bay"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/80 via-transparent to-[#081F35]/10" aria-hidden="true" />
            <div className="absolute bottom-3 left-4 text-xs font-medium text-white">
              Lighthouse Bay · Red Sea
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS — TripAdvisor & Google carousel (white section) */}
      <ReviewsCarousel />

      {/* ========================================================== */}
      {/* THREE-LAYER WAVE BAND — copyright inside, round top btn    */}
      {/* ========================================================== */}
      <div className="relative h-36 sm:h-44">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B5175] via-[#22628C] to-[#4E8CB8]" />

        {/* Layered swells, lightest at the back */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fd-wave-front" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1B5175" />
              <stop offset="55%" stopColor="#22628C" />
              <stop offset="100%" stopColor="#4E8CB8" />
            </linearGradient>
          </defs>
          <path
            fill="#A9D2EC"
            opacity="0.4"
            d="M0,96 C180,40 380,18 560,48 C740,78 920,118 1100,98 C1280,78 1360,52 1440,70 L1440,180 L0,180 Z"
          />
          <path
            fill="#4E8CB8"
            opacity="0.55"
            d="M0,122 C200,70 380,58 560,88 C740,118 920,140 1100,112 C1280,84 1370,84 1440,102 L1440,180 L0,180 Z"
          />
          <path
            fill="url(#fd-wave-front)"
            d="M0,142 C220,102 420,90 640,114 C860,138 1060,148 1240,130 C1350,119 1400,116 1440,124 L1440,180 L0,180 Z"
          />
        </svg>

        {/* Copyright inside the wave band, bottom-left */}
        <div className="absolute bottom-4 left-6 text-[11px] font-alata text-white/85">
          © {new Date().getFullYear()} Freedive Dahab · {t.footer.allRightsReserved}
        </div>

        {/* Circular back-to-top, bottom-right */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="absolute bottom-5 right-6 w-11 h-11 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
