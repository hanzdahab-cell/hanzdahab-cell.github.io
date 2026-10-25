import * as React from 'react';
import { AnimatePresence, motion, PanInfo, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
  onAction?: () => void;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  label: string;
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(value: number, length: number) {
  if (length <= 0) return 0;
  return ((value % length) + length) % length;
}

function signedOffset(index: number, active: number, length: number, loop: boolean) {
  const raw = index - active;
  if (!loop || length <= 1) return raw;
  const wrapped = raw > 0 ? raw - length : raw + length;
  return Math.abs(wrapped) < Math.abs(raw) ? wrapped : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  label,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 440,
  cardHeight = 280,
  overlap = 0.5,
  spreadDeg = 42,
  perspectivePx = 1100,
  depthPx = 120,
  tiltXDeg = 10,
  activeLiftPx = 18,
  activeScale = 1.025,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 30,
  loop = true,
  autoAdvance = false,
  intervalMs = 5000,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, items.length));
  const [hovering, setHovering] = React.useState(false);
  const [focusedWithin, setFocusedWithin] = React.useState(false);
  const length = items.length;

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setActive((current) => wrapIndex(current, length));
  }, [length]);

  React.useEffect(() => {
    if (length > 0) onChangeIndex?.(active, items[active]);
  }, [active, items, length, onChangeIndex]);

  const visibleOffset = Math.max(0, Math.floor(maxVisible / 2));
  const responsiveWidth = containerWidth
    ? Math.min(cardWidth, Math.max(240, containerWidth - 32))
    : cardWidth;
  const responsiveHeight = Math.min(cardHeight, Math.max(210, responsiveWidth * 0.66));
  const cardSpacing = Math.max(10, Math.round(responsiveWidth * (1 - overlap)));
  const stepAngle = visibleOffset > 0 ? spreadDeg / visibleOffset : 0;

  const move = React.useCallback((direction: -1 | 1) => {
    if (!length || (!loop && (active + direction < 0 || active + direction >= length))) return;
    setActive((current) => wrapIndex(current + direction, length));
  }, [active, length, loop]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !length || (pauseOnHover && (hovering || focusedWithin))) return;
    const timer = window.setInterval(() => move(1), Math.max(4000, intervalMs));
    return () => window.clearInterval(timer);
  }, [autoAdvance, reduceMotion, length, pauseOnHover, hovering, focusedWithin, intervalMs, move]);

  if (!length) return null;

  return (
    <div
      ref={containerRef}
      className={`w-full ${className ?? ''}`}
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocusedWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedWithin(false);
      }}
    >
      <div
        className="relative mx-auto w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        style={{ height: Math.max(300, responsiveHeight + 58) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${label}. Use left and right arrow keys to change cards.`}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const offset = signedOffset(index, active, length, loop);
              const distance = Math.abs(offset);
              if (distance > visibleOffset) return null;

              const isActive = offset === 0;
              const x = offset * cardSpacing;
              const y = distance * 9;
              const z = -distance * depthPx;
              const rotateZ = offset * stepAngle;
              const scale = isActive ? activeScale : inactiveScale;
              const dragProps = isActive && !reduceMotion ? {
                drag: 'x' as const,
                dragConstraints: { left: 0, right: 0 },
                dragElastic: 0.16,
                onDragEnd: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                  const threshold = Math.min(145, responsiveWidth * 0.22);
                  if (info.offset.x > threshold || info.velocity.x > 650) move(-1);
                  else if (info.offset.x < -threshold || info.velocity.x < -650) move(1);
                },
              } : {};

              return (
                <motion.div
                  key={item.id}
                  className={`absolute bottom-0 overflow-hidden rounded-2xl border border-white/15 bg-[#0A2943] shadow-[0_24px_65px_rgba(0,0,0,0.42)] ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                  style={{ width: responsiveWidth, height: responsiveHeight, zIndex: 50 - distance, transformStyle: 'preserve-3d' }}
                  initial={reduceMotion ? false : { opacity: 0, y: y + 28, x, rotateZ, scale }}
                  animate={{ opacity: 1, x, y: y + (isActive ? -activeLiftPx : 0), rotateZ, rotateX: isActive ? 0 : tiltXDeg, scale }}
                  transition={{ type: 'spring', stiffness: springStiffness, damping: springDamping }}
                  role={isActive ? undefined : 'button'}
                  tabIndex={isActive ? -1 : 0}
                  aria-label={isActive ? undefined : `Select ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest('a, button')) return;
                    setActive(index);
                  }}
                  onKeyDown={(event) => {
                    if (!isActive && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      setActive(index);
                    }
                  }}
                  {...dragProps}
                >
                  <div className="h-full w-full" style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>
                    {renderCard ? renderCard(item, { active: isActive }) : <DefaultFanCard item={item} active={isActive} />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && length > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label="Choose a card">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 min-w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan-100 ${index === active ? 'w-7 bg-cyan-200' : 'w-2.5 bg-white/35 hover:bg-white/70'}`}
              aria-label={`Show ${item.title}`}
              aria-pressed={index === active}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full">
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={active ? (item.imageAlt ?? item.title) : ''}
          className="absolute inset-0 h-full w-full bg-[#04111F] object-contain"
          loading={active ? 'eager' : 'lazy'}
          draggable={false}
          aria-hidden={!active}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0A2943]" aria-hidden="true" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04111F] via-[#04111F]/25 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-4 sm:p-6">
        {item.tag && <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{item.tag}</p>}
        <h3 className="font-bebas text-2xl leading-none tracking-wide text-white sm:text-3xl">{item.title}</h3>
        {item.description && <p className="line-clamp-2 max-w-prose text-xs leading-relaxed text-white/85 sm:text-sm">{item.description}</p>}
        {active && (item.href || item.onAction) && (
          item.href ? (
            <a
              href={item.href}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#E8FBFF] px-4 py-2 text-xs font-semibold text-[#0A2943] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.ctaLabel ?? 'Explore'} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); item.onAction?.(); }}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#E8FBFF] px-4 py-2 text-xs font-semibold text-[#0A2943] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.ctaLabel ?? 'Explore'} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )
        )}
      </div>
    </div>
  );
}
