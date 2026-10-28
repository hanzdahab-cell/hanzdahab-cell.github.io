import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/site';
import { scrollPageTo } from '../../utils/useSmoothScroll';
import './Footer.css';

const HeroLogo3D = lazy(() =>
  import('../home/HeroLogo3D').then((module) => ({ default: module.HeroLogo3D })),
);

const SOCIAL_LINKS = [
  { name: 'YouTube', href: 'https://www.youtube.com/user/FreediveInt/videos', image: '/images/footer-social/youtube.png' },
  { name: 'Google Maps', href: siteConfig.social.googleMaps, image: '/images/footer-social/google.png' },
  { name: 'TripAdvisor', href: siteConfig.social.tripadvisor, image: '/images/footer-social/social.png' },
  { name: 'Email', href: `mailto:${siteConfig.contact.email}`, image: '/images/footer-social/message.png' },
  { name: 'Facebook', href: siteConfig.social.facebook, image: '/images/footer-social/facebook.png' },
  { name: 'Instagram', href: siteConfig.social.instagram, image: '/images/footer-social/instagram.png' },
];

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    scrollPageTo(0);
  };

  const { lat, lng } = siteConfig.location.coordinates;
  const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappFormatted.replace(/\D/g, '')}`;
  const mapEmbed = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&output=embed`;

  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-row">
          <div className="site-footer__brand">
            <div className="site-footer__brand-marks">
              <Suspense fallback={<img className="site-footer__logo-fallback" src="/logo-freedive-dahab.png" alt="Freedive Dahab" />}>
                <HeroLogo3D className="car-05__logo-button footer-logo3d" />
              </Suspense>
            </div>
            <div>
              <p className="site-footer__eyebrow">Freedive Dahab</p>
              <p className="site-footer__tagline">Freediving school &amp; training center since 2003</p>
            </div>
          </div>

          <nav aria-label="Social media" className="site-footer__socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Freedive Dahab on ${social.name}`}
                title={social.name}
                className="site-footer__social-link"
              >
                <img src={social.image} alt="" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <section className="site-footer__location" aria-labelledby="site-footer-location-title">
          <div className="site-footer__map-group">
            <div className="site-footer__map-frame">
              <iframe
                title="Satellite map of Freedive Dahab in Lighthouse Bay, Dahab"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="site-footer__contact">
            <p className="site-footer__eyebrow">Our Info</p>
            <h2 id="site-footer-location-title">Meet us by the Red Sea</h2>
            <p className="site-footer__address">El Fanar Street, opposite German Bakery<br />Dahab City, South Sinai 46617, Egypt</p>

            <div className="site-footer__contact-links">
              <a href={telHref}>
                <Phone aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={`mailto:${siteConfig.contact.email}`}>
                <Mail aria-hidden="true" />
                <span>{siteConfig.contact.email}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                <span>Contact Us</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>

          </div>
        </section>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Freedive Dahab. {t.footer.allRightsReserved}</p>
        <p>Map data © Google</p>
        <nav aria-label="Legal" className="site-footer__legal">
          <a href="https://3fb3e137-ee3c-4e0c-9be9-be3a65b1789b.frame.claudeusercontent.com/_f/1792823878-0b68/#" target="_blank" rel="noreferrer">Privacy Policy</a>
          <a href="https://3fb3e137-ee3c-4e0c-9be9-be3a65b1789b.frame.claudeusercontent.com/_f/1792823878-0b68/#" target="_blank" rel="noreferrer">Terms</a>
        </nav>
        <button type="button" onClick={scrollToTop}>
          Back to top <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
