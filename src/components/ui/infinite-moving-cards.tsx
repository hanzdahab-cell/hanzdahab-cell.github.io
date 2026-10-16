import * as React from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

export type InfiniteMovingCardItem = {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  avatar?: string;
  name?: string;
  role?: string;
  rating?: number;
  tags?: string[];
};

export type InfiniteMovingCardsProps<T extends InfiniteMovingCardItem = InfiniteMovingCardItem> = {
  items: T[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
  cardClassName?: string;
  gap?: number;
  loop?: boolean;
  showGradientMask?: boolean;
  isPaused?: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
};

const SPEED_PX_PER_SECOND = {
  slow: 26,
  normal: 44,
  fast: 74,
} as const;

export function InfiniteMovingCards<T extends InfiniteMovingCardItem>({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className = '',
  cardClassName = '',
  gap = 16,
  loop = true,
  showGradientMask = false,
  isPaused = false,
  renderItem,
}: InfiniteMovingCardsProps<T>) {
  const reduceMotion = useReducedMotion() === true;
  const x = useMotionValue(0);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const firstSetRef = React.useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const isMotionPaused = isPaused || (pauseOnHover && hovered);

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet) return;

    const measure = () => setSetWidth(firstSet.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(firstSet);
    return () => observer.disconnect();
  }, [gap, items.length]);

  React.useEffect(() => {
    if (setWidth <= 0) return;
    const initialPosition = direction === 'right'
      ? -Math.max(0, setWidth - (viewportRef.current?.clientWidth ?? 0))
      : 0;
    x.set(loop ? (direction === 'right' ? -setWidth : 0) : initialPosition);
  }, [direction, loop, setWidth, x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || isMotionPaused || setWidth <= 0 || items.length <= 1) return;

    const distance = SPEED_PX_PER_SECOND[speed] * (delta / 1000);
    const next = x.get() + (direction === 'left' ? -distance : distance);

    if (!loop) {
      const maxScroll = Math.max(0, setWidth - (viewportRef.current?.clientWidth ?? 0));
      x.set(direction === 'left' ? Math.max(-maxScroll, next) : Math.min(0, next));
      return;
    }

    const wrappedPosition = direction === 'left'
      ? -(((-next % setWidth) + setWidth) % setWidth)
      : (((next % setWidth) + setWidth) % setWidth) - setWidth;
    x.set(wrappedPosition);
  });

  const renderCards = (isDuplicate: boolean) => (
    <div
      ref={isDuplicate ? undefined : firstSetRef}
      aria-hidden={isDuplicate || undefined}
      inert={isDuplicate}
      className="flex w-max shrink-0"
      style={{ gap, paddingRight: gap }}
    >
      {items.map((item, index) => (
        <div
          key={`${item.id ?? 'review'}-${index}`}
          className={`w-[min(21rem,calc(100vw-3rem))] shrink-0 ${cardClassName}`}
        >
          {renderItem ? renderItem(item, index) : (
            <article className="h-full rounded-2xl border border-white/10 bg-[#0A2943]/90 p-5 text-white shadow-lg">
              {item.title && <h3 className="font-semibold">{item.title}</h3>}
              {item.description && <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.description}</p>}
              {item.name && <p className="mt-4 text-sm font-semibold">{item.name}</p>}
              {item.role && <p className="text-xs text-slate-400">{item.role}</p>}
            </article>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? (event) => {
        setHovered(event.currentTarget.contains(document.activeElement));
      } : undefined}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(event.currentTarget.matches(':hover'));
        }
      }}
    >
      <div
        ref={viewportRef}
        className={`overflow-y-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 ${
          reduceMotion ? 'overflow-x-auto' : 'overflow-x-hidden'
        }`}
        role="region"
        aria-label="Freedive Dahab reviews"
        tabIndex={0}
      >
        <motion.div
          className="flex w-max py-1"
          style={{
            x: reduceMotion ? 0 : x,
          }}
        >
          {renderCards(false)}
          {loop && items.length > 1 && renderCards(true)}
        </motion.div>
      </div>
      {showGradientMask && !reduceMotion && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0E3453] to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0E3453] to-transparent" />
        </>
      )}
    </div>
  );
}

export default InfiniteMovingCards;
