import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import './gallery.css';

// Standalone React implementation with no Framer runtime dependency; it is not claimed to be pixel-exact to the hosted reference.
type ImageValue =
  | string
  | {
      src: string;
      srcSet?: string;
      alt?: string;
    };

export interface GalleryMedia {
  type: 'image' | 'video';
  image?: ImageValue;
  video?: string;
  poster?: ImageValue;
  caption?: string;
  link?: string;
}

type GalleryAspect = '3:2' | '4:3' | '16:9' | '1:1' | '3:4' | '9:16';

export interface HorizontalParallaxProps {
  width?: number | string;
  height?: number | string;
  mode?: 'pinned' | 'infinite';
  label?: string;
  items: GalleryMedia[];
  layout?: {
    mediaHeight?: number;
    widthMode?: 'aspect' | 'custom';
    aspect?: GalleryAspect;
    mediaWidth?: number;
    gap?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingStart?: number;
    paddingEnd?: number;
    stageHeight?: number;
  };
  motion?: {
    ease?: number;
    overscan?: number;
    parallax?: number;
  };
  loop?: {
    speed?: number;
    direction?: 'left' | 'right';
    wheel?: boolean;
  };
  effect?: {
    centerFocus?: number;
    curve?: number;
    velocitySkew?: number;
    desaturate?: number;
  };
  style?: {
    background?: string;
    mediaRadius?: number;
    showCaptions?: boolean;
    captionColor?: string;
    showProgress?: boolean;
    progressColor?: string;
    lockOverscroll?: boolean;
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getImageSource = (image?: ImageValue) =>
  typeof image === 'string' ? image : image?.src;

const getImageAlt = (image?: ImageValue) =>
  typeof image === 'object' && image !== null ? image.alt ?? '' : '';

function getAspectRatio(aspect: GalleryAspect) {
  const [width, height] = aspect.split(':');
  return `${width} / ${height}`;
}

function getSectionHeight(height: number | string | undefined, mode: 'pinned' | 'infinite') {
  if (height !== undefined) return typeof height === 'number' ? `${height}px` : height;
  return mode === 'infinite' ? '100vh' : '300vh';
}

export default function HorizontalParallaxGallery({
  width = '100%',
  height,
  mode = 'pinned',
  label = 'Photo gallery',
  items,
  layout,
  motion,
  loop,
  effect,
  style,
}: HorizontalParallaxProps) {
  const mediaHeight = layout?.mediaHeight ?? 60;
  const stageHeight = layout?.stageHeight ?? 100;
  const mediaWidth = layout?.mediaWidth ?? 520;
  const gap = layout?.gap ?? 32;
  const overscan = Math.max(0, motion?.overscan ?? 25);
  const parallax = Math.max(0, motion?.parallax ?? 10);
  const ease = clamp(motion?.ease ?? 0.08, 0.001, 1);
  const centerFocus = Math.max(0, effect?.centerFocus ?? 0.2);
  const curve = effect?.curve ?? 0;
  const velocitySkew = Math.max(0, effect?.velocitySkew ?? 0.5);
  const desaturate = clamp(effect?.desaturate ?? 0, 0, 1);
  const autoSpeed = Math.max(0, loop?.speed ?? 40);
  const direction = loop?.direction ?? 'left';
  const wheelEnabled = loop?.wheel ?? true;
  const showCaptions = style?.showCaptions ?? true;
  const showProgress = style?.showProgress ?? true;
  const mediaRadius = style?.mediaRadius ?? 8;
  const aspect = layout?.aspect ?? '3:2';
  const widthMode = layout?.widthMode ?? 'aspect';

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentXRef = useRef(0);
  const momentumRef = useRef(0);
  const previousFrameXRef = useRef(0);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    lastX: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const [repeatCount, setRepeatCount] = useState(3);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const rootStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: getSectionHeight(height, mode),
    background: style?.background ?? '#0A0A0A',
    overscrollBehavior: style?.lockOverscroll ? 'contain' : undefined,
  };

  const stageStyle: CSSProperties = {
    height: `${stageHeight}vh`,
    background: style?.background ?? '#0A0A0A',
    paddingTop: layout?.paddingTop ?? 0,
    paddingBottom: layout?.paddingBottom ?? 0,
    paddingInlineStart: layout?.paddingStart ?? 0,
    paddingInlineEnd: layout?.paddingEnd ?? 0,
  };

  const rootClassName = useMemo(
    () => `hpg${mode === 'infinite' ? ' hpg--infinite' : ' hpg--pinned'}`,
    [mode],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const sequence = sequenceRef.current;
    if (!stage || !sequence) return;

    const updateCopies = () => {
      if (mode !== 'infinite') return;
      const sequenceWidth = sequence.getBoundingClientRect().width;
      if (sequenceWidth <= 0) return;
      const stageWidth = stage.getBoundingClientRect().width;
      const requiredCopies = Math.min(20, Math.max(3, Math.ceil(stageWidth / sequenceWidth) + 2));
      setRepeatCount((current) => (current === requiredCopies ? current : requiredCopies));
    };

    updateCopies();
    const observer = new ResizeObserver(updateCopies);
    observer.observe(stage);
    observer.observe(sequence);
    window.addEventListener('resize', updateCopies);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCopies);
    };
  }, [items.length, mode, aspect, gap, mediaHeight, stageHeight, widthMode, mediaWidth]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const strip = stripRef.current;
    const sequence = sequenceRef.current;
    if (!root || !stage || !strip || !sequence || items.length === 0) return;

    let frameId = 0;
    let lastTimestamp = 0;
    let previousSequenceWidth = 0;
    let sequenceWidth = sequence.getBoundingClientRect().width;

    if (mode === 'infinite' && sequenceWidth > 0 && previousSequenceWidth === 0) {
      currentXRef.current = -sequenceWidth;
    }

    const frame = (timestamp: number) => {
      const deltaTime = lastTimestamp ? Math.min(timestamp - lastTimestamp, 50) : 16.67;
      lastTimestamp = timestamp;

      const stageRect = stage.getBoundingClientRect();
      const measuredSequenceWidth = sequence.getBoundingClientRect().width;
      if (measuredSequenceWidth > 0 && measuredSequenceWidth !== sequenceWidth) {
        previousSequenceWidth = sequenceWidth;
        sequenceWidth = measuredSequenceWidth;
        if (mode === 'infinite') {
          currentXRef.current =
            previousSequenceWidth > 0
              ? (-Math.abs(currentXRef.current) % sequenceWidth) - sequenceWidth
              : -sequenceWidth;
        }
      }

      let progress = 0;
      if (mode === 'pinned') {
        const scrollDistance = Math.max(1, root.offsetHeight - stage.offsetHeight);
        progress = clamp(-root.getBoundingClientRect().top / scrollDistance, 0, 1);
        const travel = Math.max(0, sequenceWidth - stage.clientWidth);
        const targetX = -progress * travel;
        currentXRef.current = prefersReducedMotion
          ? targetX
          : currentXRef.current + (targetX - currentXRef.current) * ease;
      } else {
        if (dragRef.current.pointerId === -1) {
          if (!prefersReducedMotion) {
            currentXRef.current += (direction === 'left' ? -1 : 1) * autoSpeed * (deltaTime / 1000);
          }
          currentXRef.current += momentumRef.current;
          momentumRef.current *= 0.92;
          if (Math.abs(momentumRef.current) < 0.05) momentumRef.current = 0;

          if (sequenceWidth > 0) {
            if (currentXRef.current <= -sequenceWidth * 2) {
              currentXRef.current += sequenceWidth;
            } else if (currentXRef.current >= 0) {
              currentXRef.current -= sequenceWidth;
            }
          }
        }
      }

      const frameVelocity = currentXRef.current - previousFrameXRef.current;
      previousFrameXRef.current = currentXRef.current;
      const skew = prefersReducedMotion
        ? 0
        : clamp(frameVelocity * velocitySkew * 0.18, -8, 8);

      strip.style.transform = `translate3d(${currentXRef.current}px, -50%, 0) skewX(${skew}deg)`;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const stageCenter = stageRect.left + stageRect.width / 2;
      strip.querySelectorAll<HTMLElement>('[data-gallery-card]').forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const normalized = clamp((cardRect.left + cardRect.width / 2 - stageCenter) / (stageRect.width / 2), -1, 1);
        const scale = prefersReducedMotion
          ? 1
          : 1 + centerFocus * (1 - Math.abs(normalized));
        const verticalOffset = prefersReducedMotion ? 0 : curve * normalized * normalized;
        const saturation = prefersReducedMotion
          ? 1
          : clamp(1 - desaturate * Math.abs(normalized), 0, 1);
        card.style.transform = `translate3d(0, ${verticalOffset}px, 0) scale(${scale})`;
        card.style.zIndex = String(Math.round((1 - Math.abs(normalized)) * 10));
        card.style.setProperty('--hpg-saturation', String(saturation));

        const media = card.querySelector<HTMLElement>('[data-gallery-media]');
        if (media) {
          const maxParallax = overscan / 2;
          const translatePercent = prefersReducedMotion
            ? 0
            : clamp(-normalized * parallax, -maxParallax, maxParallax);
          media.style.setProperty(
            '--hpg-parallax-x',
            `${(translatePercent / (100 + 2 * overscan)) * 100}%`,
          );
        }
      });

      if (mode === 'pinned' && showProgress && progressRef.current) {
        progressRef.current.style.opacity = '1';
      }

      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(frameId);
  }, [
    autoSpeed,
    centerFocus,
    curve,
    desaturate,
    direction,
    ease,
    items.length,
    mode,
    overscan,
    parallax,
    prefersReducedMotion,
    repeatCount,
    showProgress,
    velocitySkew,
  ]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || mode !== 'infinite' || !wheelEnabled) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      currentXRef.current += delta;
      momentumRef.current += delta * 0.15;
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [mode, wheelEnabled]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== 'infinite' || event.button !== 0) return;
    const captureTarget =
      event.target instanceof Element
        ? event.target.closest('a') ?? event.currentTarget
        : event.currentTarget;
    captureTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
    };
    momentumRef.current = 0;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== 'infinite' || dragRef.current.pointerId !== event.pointerId) return;
    const delta = event.clientX - dragRef.current.lastX;
    if (Math.abs(event.clientX - dragRef.current.startX) > 6) {
      dragRef.current.moved = true;
    }
    if (dragRef.current.moved) {
      event.preventDefault();
      currentXRef.current += delta;
      momentumRef.current = delta;
    }
    dragRef.current.lastX = event.clientX;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    if (mode !== 'infinite' || dragRef.current.pointerId !== event.pointerId) return;
    const wasDragged = dragRef.current.moved;
    dragRef.current.pointerId = -1;
    if (cancelled) momentumRef.current = 0;
    if (wasDragged || cancelled) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'infinite') return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentXRef.current += 64;
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentXRef.current -= 64;
    }
  };

  if (items.length === 0) return null;

  const groupCount = mode === 'infinite' ? repeatCount : 1;
  const sequenceStyle: CSSProperties = {
    gap,
    paddingInlineStart: layout?.paddingStart ?? 0,
    paddingInlineEnd: layout?.paddingEnd ?? 0,
  };
  const cardStyle: CSSProperties = {
    height: `${(mediaHeight * stageHeight) / 100}vh`,
    borderRadius: mediaRadius,
    ...(widthMode === 'custom'
      ? { width: mediaWidth }
      : { aspectRatio: getAspectRatio(aspect) }),
  };
  const mediaStyle: CSSProperties = {
    width: `calc(100% + ${overscan * 2}%)`,
    filter: 'saturate(var(--hpg-saturation, 1))',
  };

  return (
    <section ref={rootRef} className={rootClassName} style={rootStyle}>
      <div
        ref={stageRef}
        className="hpg__stage"
        style={stageStyle}
        role="region"
        aria-label={label}
        tabIndex={mode === 'infinite' ? 0 : undefined}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={(event) => finishPointer(event, true)}
        onClickCapture={handleClickCapture}
      >
        <div ref={stripRef} className="hpg__strip">
          {Array.from({ length: groupCount }, (_, groupIndex) => (
            <div
              key={groupIndex}
              ref={groupIndex === 0 ? sequenceRef : undefined}
              className="hpg__sequence"
              style={sequenceStyle}
              role="list"
              aria-hidden={groupIndex > 0 || undefined}
            >
              {items.map((item, index) => {
                const imageSource = getImageSource(item.image);
                const posterSource = getImageSource(item.poster);
                const alt = getImageAlt(item.image);
                const itemKey = `${groupIndex}-${index}-${item.video ?? imageSource ?? 'media'}`;
                const label = item.caption || alt || `Open gallery item ${index + 1}`;
                const mediaContent =
                  item.type === 'video' && item.video ? (
                    <video
                      className="hpg__media"
                      data-gallery-media
                      style={mediaStyle}
                      src={item.video}
                      poster={posterSource}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={alt || item.caption || `Gallery video ${index + 1}`}
                    />
                  ) : imageSource ? (
                    <img
                      className="hpg__media"
                      data-gallery-media
                      style={mediaStyle}
                      src={imageSource}
                      srcSet={typeof item.image === 'object' ? item.image.srcSet : undefined}
                      alt={alt}
                      loading={groupIndex === 0 && index === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  ) : null;
                const caption =
                  showCaptions && item.caption ? (
                    <span
                      className="hpg__caption"
                      style={{ color: style?.captionColor ?? '#FFFFFF' }}
                    >
                      {item.caption}
                    </span>
                  ) : null;

                return (
                  <article
                    key={itemKey}
                    className="hpg__card"
                    data-gallery-card
                    style={cardStyle}
                    role="listitem"
                  >
                    {item.link ? (
                      <a
                        className="hpg__link"
                        href={item.link}
                        aria-label={label}
                        tabIndex={groupIndex > 0 ? -1 : undefined}
                      >
                        {mediaContent}
                        {caption}
                      </a>
                    ) : (
                      <div className="hpg__content">
                        {mediaContent}
                        {caption}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ))}
        </div>
        {mode === 'pinned' && showProgress && (
          <div className="hpg__progress" aria-hidden="true">
            <span
              ref={progressRef}
              className="hpg__progress-value"
              style={{ backgroundColor: style?.progressColor ?? '#FFFFFF' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
