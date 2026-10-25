import { ReactNode } from 'react';

interface SectionHeroProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  minHeightClassName?: string;
}

export function SectionHero({
  imageSrc,
  imageAlt,
  children,
  className = '',
  contentClassName = '',
  minHeightClassName = 'min-h-[50svh]',
}: SectionHeroProps) {
  return (
    <header className={`relative isolate flex ${minHeightClassName} items-center overflow-hidden bg-[#061A2B] ${className}`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        aria-hidden={imageAlt.length === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061A2B]/95 via-[#061A2B]/70 to-[#061A2B]/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/75 via-transparent to-[#061A2B]/25" aria-hidden="true" />
      <div className={`relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 pt-28 sm:px-8 sm:pb-10 ${contentClassName}`}>
        {children}
      </div>
    </header>
  );
}
