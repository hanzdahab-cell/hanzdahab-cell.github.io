import { useEffect, useState } from 'react';
import { PageType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBooking?: () => void;
  ctaText?: string;
  compact?: boolean;
  subtitleFontFamily?: string;
  backgroundImages?: string[];
}

export function PageHeader({
  title,
  subtitle,
  badge = 'SSI Pro Dive Center & ITC #720079',
  currentPage,
  onNavigate,
  onOpenBooking,
  ctaText = 'Book / Inquire',
  compact = false,
  subtitleFontFamily,
  backgroundImages,
}: PageHeaderProps) {
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const { isRtl } = useLanguage();
  const { t } = useTranslation();

  const localizedConfig = t(`pageHeaders.${currentPage}`, { returnObjects: true }) as any;
  const displayTitle = (typeof localizedConfig === 'object' && localizedConfig?.title) || title;
  const displaySubtitle = (typeof localizedConfig === 'object' && localizedConfig?.subtitle) || subtitle;
  const displayCta = (typeof localizedConfig === 'object' && localizedConfig?.ctaText) || ctaText;
  const isCalendarPage = currentPage === 'calendar';

  useEffect(() => {
    if (!backgroundImages || backgroundImages.length < 2) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActiveBackgroundIndex((index) => (index + 1) % backgroundImages.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [backgroundImages]);

  return (
    <div className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0E3453]/85 via-[#0E3453]/72 to-[#0E3453]/55 px-6 select-none ${compact ? 'pb-8 pt-20 sm:pb-10 sm:pt-24' : 'pb-16 pt-28 sm:pb-20 sm:pt-36'} ${backgroundImages?.length ? 'min-h-[280px] sm:min-h-[300px]' : ''}`}>

      {backgroundImages?.map((image, index) => (
        <div
          key={image}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 motion-reduce:transition-none ${index === activeBackgroundIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url("${image}")` }}
        />
      ))}
      {backgroundImages?.length ? (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#071D31]/85 via-[#0E3453]/68 to-[#071D31]/55" />
      ) : null}
      
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/[0.08] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[250px] bg-sky-600/[0.06] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">

        {/* Header Title & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bebas tracking-[0.06em] leading-tight">
              {(() => {
                const words = displayTitle.split(' ');
                if (words.length <= 1) return <span className="text-white">{displayTitle}</span>;
                const splitIndex = Math.ceil(words.length / 2);
                const firstPart = words.slice(0, splitIndex).join(' ');
                const secondPart = words.slice(splitIndex).join(' ');
                return (
                  <>
                    <span className="text-white">{firstPart} </span>
                    <span className={isCalendarPage ? 'text-[#03D0F8] drop-shadow-[0_0_20px_rgba(3,208,248,0.35)]' : 'text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]'}>{secondPart}</span>
                  </>
                );
              })()}
            </h1>
            <p
              className={`text-sm sm:text-base md:text-lg text-slate-300 ${subtitleFontFamily ? '' : 'font-alata'} font-normal leading-relaxed max-w-2xl`}
              style={subtitleFontFamily ? { fontFamily: subtitleFontFamily } : undefined}
            >
              {displaySubtitle}
            </p>
          </div>

          {onOpenBooking && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className={`px-7 py-3 rounded-full ${isCalendarPage ? 'bg-white hover:bg-slate-100' : 'bg-cyan-400 hover:bg-cyan-300'} text-[#0E3453] font-semibold text-xs sm:text-sm font-alata tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer`}
              >
                {displayCta}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
