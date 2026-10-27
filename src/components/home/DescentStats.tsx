import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { TextReveal, CountUp, FadeUp } from '../ui/MotionKit';
import type { PageType } from '../../types';

/* ==========================================================================
   DESCENT STATS — Contra-report style statement numbers
   Elegant serif-caps eyebrow stacked over a huge bold headline, then a grid
   of giant count-up figures with hairline dividers, all in the two brand
   blues. Copy comes from i18n (descentStats.*).
   ========================================================================== */

interface StatDef {
  value: number;
  suffix?: string;
  labelKey: string;
}

const STATS: StatDef[] = [
  { value: 24, suffix: '+', labelKey: 's1Label' },
  { value: 12, labelKey: 's2Label' },
  { value: 570, suffix: '+', labelKey: 's3Label' },
  { value: 4800, suffix: '+', labelKey: 's4Label' },
];

export function DescentStats({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const { t } = useTranslation();

  return (
    <section id="legacy" className="ocean-surface relative scroll-mt-20 overflow-hidden border-y border-ocean-pale/10 film-grain">
      {/* Slow deep-water glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,98,140,0.28) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        {/* Contra-style chapter header: serif italic caps over huge bold line */}
        <div className="mb-10 sm:mb-12">
          <h2 className="font-bebas text-white leading-[0.95] tracking-[0.03em] text-6xl sm:text-7xl md:text-8xl uppercase">
            <TextReveal stagger={0.06}>{t('descentStats.title')}</TextReveal>{' '}
            <span className="text-ocean-light">
              <TextReveal stagger={0.06} delay={0.25}>
                {t('descentStats.titleHighlight')}
              </TextReveal>
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ocean-pale/10">
          {STATS.map((stat, idx) => (
            <FadeUp
              key={stat.labelKey}
              delay={idx * 0.08}
              className="group relative flex min-h-36 flex-col justify-center border-b border-r border-ocean-pale/10 p-5 sm:min-h-40 sm:p-6 hover:bg-[#0B2C4A] transition-colors duration-500"
            >
              <div className="mb-3 font-bebas text-5xl leading-none tracking-[0.02em] text-white sm:text-6xl">
                <CountUp end={stat.value} suffix={stat.suffix ?? ''} />
              </div>

              <div className="font-serif text-base italic leading-snug text-ocean-pale sm:text-lg">
                {t(`descentStats.${stat.labelKey}`)}
              </div>

              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at top right, rgba(169,210,236,0.18), transparent 70%)',
                  }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:justify-end">
          <button
            type="button"
            onClick={() => onNavigate('story')}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-alata text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DescentStats;
