import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { SSI_BADGES } from '../../data/ssiBadges';
import { TiltSurface } from '../ui/TiltSurface';

const SSI_FREEDIVE_DAHAB_URL =
  'https://www.divessi.com/en/divecenter/freedive-dahab-freedivedahabcom-egypt-720079';

const HOME_BADGES = [
  {
    id: 'freediving-center',
    title: 'SSI Freediving Center',
    src: '/badges/ssi-freediving-center-upload.pdf',
    alt: 'SSI Freediving Center official badge',
    format: 'pdf',
  },
  {
    id: 'instructor-training-center',
    title: 'SSI Pro Instructor Training Center',
    src: '/badges/ssi-instructor-training-center-upload.png',
    alt: 'SSI Pro Instructor Training Center official badge',
    format: 'image',
  },
  {
    id: 'mermaid-center',
    title: 'SSI Mermaid Center',
    src: '/badges/ssi-mermaid-center-upload.pdf',
    alt: 'SSI Mermaid Center official badge',
    format: 'pdf',
  },
] as const;

export interface SSICertificatesProps {
  onOpenBooking?: () => void;
  onNavigate?: (page: PageType) => void;
  variant?: 'compact' | 'full' | 'home';
}

export function SSICertificates({ onOpenBooking, onNavigate, variant = 'full' }: SSICertificatesProps) {
  const { t } = useLanguage();

  const badges = [
    {
      id: 'freediving-center',
      title: 'SSI Freediving Center',
      desc: 'Official SSI recognition for Freedive Dahab’s certified freediving school and courses.',
      src: '/badges/ssi-freediving-center-official.pdf',
      alt: 'SSI Official Partner — Freediving Center badge',
      format: 'pdf' as const,
    },
    {
      id: 'mermaid-center',
      title: 'SSI Mermaid Center',
      desc: 'Official SSI recognition for mermaid education, monofin skills and underwater performance.',
      src: '/badges/ssi-mermaid-center-official.pdf',
      alt: 'SSI Official Partner — Mermaid Center badge',
      format: 'pdf' as const,
    },
    {
      id: 'classified-diving-center',
      title: 'SSI Classified Diving Center',
      desc: 'A classified SSI dive center with professional standards for training, service and diver support.',
      src: '/badges/ssi-classified-diving-center-official.pdf',
      alt: 'SSI Classified Diving Center badge',
      format: 'pdf' as const,
    },
    {
      id: 'instructor-training-center',
      title: 'SSI Instructor Training Center',
      desc: 'An official SSI center preparing qualified instructors to teach the next generation of freedivers.',
      src: '/badges/ssi-instructor-training-center-transparent.png',
      alt: 'SSI Official Partner — Freediving Instructor Training Center badge',
      format: 'image' as const,
    },
  ];

  if (variant === 'compact') {
    return (
      <section
        id="course-certifications"
        aria-label="Official SSI training center badges"
        className="w-full px-0 py-0 sm:w-auto"
      >
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 sm:mx-0 sm:justify-start sm:gap-4">
          {SSI_BADGES.map((badge) => (
            <li key={badge.id} title={badge.title}>
              <img
                src={badge.src}
                alt={badge.alt}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto max-w-16 object-contain sm:h-12"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (variant === 'home') {
    return (
      <section
        id="ssi-centers"
        aria-labelledby="ssi-centers-title"
        className="ocean-surface film-grain relative overflow-hidden px-6 py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,98,140,0.28) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <h2
            id="ssi-centers-title"
            className="mb-10 text-center font-bebas text-4xl tracking-wide text-white sm:mb-12 sm:text-5xl"
          >
            OFFICIAL SSI TRAINING CENTERS
          </h2>

          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3 sm:gap-6">
            {HOME_BADGES.map((badge, index) => (
              <TiltSurface
                key={badge.id}
                delay={index * 0.08}
                className="group h-full rounded-3xl bg-white/[0.025] px-4 py-5 transition-colors duration-300 hover:bg-white/[0.055] sm:px-5 sm:py-6"
              >
                <a
                  href={SSI_FREEDIVE_DAHAB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Verify ${badge.title} on the official SSI website`}
                  className="flex min-h-60 h-full flex-col items-center justify-center rounded-2xl text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  <div className="flex h-48 w-full items-center justify-center sm:h-52">
                    {badge.format === 'pdf' ? (
                      <object
                        data={`${badge.src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        type="application/pdf"
                        aria-label={badge.alt}
                        className="pointer-events-none h-full w-full border-0 bg-transparent"
                      />
                    ) : (
                      <img
                        src={badge.src}
                        alt={badge.alt}
                        width="2000"
                        height="2000"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-alata text-sm font-semibold text-white sm:text-base">
                    {badge.title}
                  </h3>
                </a>
              </TiltSurface>
            ))}
          </div>

          <a
            href={SSI_FREEDIVE_DAHAB_URL}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 font-alata text-sm font-semibold text-white/90 transition-colors hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className="grid size-5 place-items-center rounded border border-cyan-200/70 text-cyan-200"
            >
              <ShieldCheck className="size-3.5" />
            </span>
            SSI Facility #720079 · Verify on SSI
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="relative py-20 md:py-28 px-6 bg-transparent overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 architectural-grid opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-4xl mx-auto text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 text-xs tracking-wider uppercase font-alata mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.certificates?.badge || 'SSI Official Partner • Facility #720079 • ISO 24801 & 24802'}</span>
        </div>
        <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wider mb-4 uppercase">
          {t.certificates?.title || 'International Gold Standard of Freediving Education'}
        </h2>
        <p className="font-alata text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t.certificates?.subtitle || 'An authorized SSI Freediving School in the heart of Dahab — dedicated instructor trainers, professional counter-ballast buoys, and a 100% safety record since 2003.'}
        </p>
      </div>

      {/* ============================================================
          DYNAMIC SSI PARTNERSHIP BADGES

          IMPORTANT:
          The badge images themselves remain completely untouched.

          All animation happens around the official artwork:
          - container reveal
          - background glow
          - connecting line
          - hover interaction
          - supporting text
      ============================================================ */}

      <div className="relative mx-auto max-w-6xl">

        {/* Animated connection line */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-[12%] right-[12%] top-[105px]
            hidden h-px overflow-hidden
            lg:block
          "
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
          />

          <div
            className="
              absolute top-0 h-px w-32
              bg-gradient-to-r
              from-transparent
              via-cyan-300/70
              to-transparent
              animate-[badgeLine_5s_ease-in-out_infinite]
            "
          />
        </div>

        {/* Badge grid */}
        <div
          className="
            grid grid-cols-1
            gap-x-6 gap-y-12
            sm:grid-cols-2
            xl:grid-cols-4
            xl:gap-x-8
          "
        >
          {badges.map((badge, index) => (
            <article
              key={badge.id}
              className="
                group relative flex min-w-0
                flex-col items-center text-center
              "
            >

              {/* Ambient glow behind badge */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute
                  left-1/2 top-1/2
                  h-40 w-40
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-cyan-500/[0.025]
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:bg-cyan-500/[0.08]
                  group-hover:scale-125
                "
              />

              {/* Badge stage */}
              <div
                className="
                  relative z-10
                  flex min-h-[230px]
                  w-full items-center justify-center
                  px-4
                  transition-transform
                  duration-700
                  ease-out
                  motion-safe:group-hover:-translate-y-2
                "
              >
                {/* Small orbit ring */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    h-[215px] w-[215px]
                    rounded-full
                    border border-white/[0.025]
                    transition-all
                    duration-700
                    group-hover:border-cyan-300/20
                    group-hover:scale-110
                  "
                />

                {/* Moving light around the badge */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    h-[220px] w-[220px]
                    rounded-full
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    motion-safe:animate-[badgeOrbit_7s_linear_infinite]
                  "
                >
                  <div
                    className="
                      absolute left-1/2 top-0
                      h-1.5 w-1.5
                      -translate-x-1/2
                      rounded-full
                      bg-cyan-300
                      shadow-[0_0_12px_rgba(103,232,249,0.8)]
                    "
                  />
                </div>

                {/* OFFICIAL BADGE — DO NOT MODIFY */}
                {badge.format === 'pdf' ? (
                  <div className="relative z-20 aspect-square h-[210px] max-w-full overflow-hidden rounded-full">
                    <object
                      data={`${badge.src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                      type="application/pdf"
                      aria-label={badge.alt}
                      className="h-full w-full border-0 bg-transparent"
                    >
                      <a href={badge.src} className="text-sm text-cyan-300 underline">
                        View {badge.title}
                      </a>
                    </object>
                  </div>
                ) : (
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    loading="eager"
                    decoding="async"
                    className="
                      relative z-20
                      block h-[210px] w-full
                      max-w-[220px]
                      object-contain
                    "
                  />
                )}
              </div>

              {/* Small numbered indicator */}
              <div
                className="
                  relative z-20 mt-3
                  flex h-6 w-6
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.025]
                  font-mono text-[9px]
                  text-slate-500
                  transition-all duration-500
                  group-hover:border-cyan-300/40
                  group-hover:text-cyan-300
                "
              >
                0{index + 1}
              </div>

              {/* Caption */}
              <div
                className="
                  relative z-20 mt-4
                  max-w-[240px]
                  space-y-2
                  transition-transform
                  duration-500
                  group-hover:translate-y-[-2px]
                "
              >
                <h3
                  className="
                    font-alata
                    text-sm font-semibold
                    text-white
                    transition-colors
                    duration-300
                    sm:text-base
                    group-hover:text-cyan-300
                  "
                >
                  {badge.title}
                </h3>

                <p
                  className="
                    font-alata
                    text-xs
                    leading-relaxed
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:text-slate-300
                  "
                >
                  {badge.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA Actions */}
      <div className="relative mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onOpenBooking ? onOpenBooking() : onNavigate?.('courses')}
          className="btn-luxury inline-flex items-center gap-2 group w-full sm:w-auto cursor-pointer"
        >
          <span>{t.certificates?.bookBtn || 'Enroll in Certified Course'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-400" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('courses')}
          className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 text-xs uppercase tracking-widest text-slate-300 hover:text-white transition-all w-full sm:w-auto font-alata cursor-pointer"
        >
          {t.certificates?.verifyBtn || 'Verify Facility Status'}
        </button>
      </div>
    </section>
  );
}

export default SSICertificates;
