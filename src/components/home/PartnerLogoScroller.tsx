import type { PointerEvent } from 'react';

const PARTNER_LOGOS = [
  {
    id: 'freedive-dahab',
    src: '/logo-freedive-dahab.png',
    alt: 'Freedive Dahab',
    href: '#home',
  },
  {
    id: 'ssi',
    src: '/badges/ssi-logo-white.png',
    alt: 'SSI',
    href: 'https://www.divessi.com/en/divecenter/freedive-dahab-freedivedahabcom-egypt-720079',
  },
] as const;

export function PartnerLogoScroller() {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--partner-pointer-x',
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      '--partner-pointer-y',
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  };

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--partner-pointer-x', '50%');
    event.currentTarget.style.setProperty('--partner-pointer-y', '50%');
  };

  return (
    <section
      aria-label="Freedive Dahab and SSI partner logos"
      className="partner-logo-scroller ocean-surface film-grain relative overflow-hidden py-8 sm:py-10"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div aria-hidden="true" className="partner-logo-scroller__glow" />
      <div className="partner-logo-scroller__viewport">
        <div className="partner-logo-scroller__track">
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              aria-hidden={isDuplicate || undefined}
              className="partner-logo-scroller__set"
            >
              {PARTNER_LOGOS.map((logo) => (
                <li key={logo.id} className="partner-logo-scroller__item">
                  <a
                    href={logo.href}
                    aria-label={isDuplicate ? undefined : `Visit ${logo.alt}`}
                    tabIndex={isDuplicate ? -1 : undefined}
                    target={logo.id === 'ssi' ? '_blank' : undefined}
                    rel={logo.id === 'ssi' ? 'noreferrer' : undefined}
                  >
                    <img
                      src={logo.src}
                      alt={isDuplicate ? '' : logo.alt}
                      width={logo.id === 'ssi' ? 2048 : 300}
                      height={logo.id === 'ssi' ? 456 : 300}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
