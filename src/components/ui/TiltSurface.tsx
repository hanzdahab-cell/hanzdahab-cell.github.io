import { useRef, type PointerEvent, type ReactNode } from 'react';
import { FadeUp } from './MotionKit';
import './TiltSurface.css';

interface TiltDeckProps {
  children: ReactNode;
  className?: string;
}

interface TiltSurfaceProps extends TiltDeckProps {
  delay?: number;
}

export function TiltDeck({ children, className = '' }: TiltDeckProps) {
  const frameRef = useRef<number | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const deck = event.currentTarget;
    const { clientX, clientY } = event;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const rect = deck.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const maxTilt = 8;

      deck.style.setProperty('--fd-tilt-x', `${((0.5 - y) * 2 * maxTilt).toFixed(2)}deg`);
      deck.style.setProperty('--fd-tilt-y', `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
      deck.style.setProperty('--fd-glare-x', `${(x * 100).toFixed(1)}%`);
      deck.style.setProperty('--fd-glare-y', `${(y * 100).toFixed(1)}%`);
      frameRef.current = null;
    });
  };

  const resetTilt = (deck: HTMLDivElement) => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    deck.style.setProperty('--fd-tilt-x', '0deg');
    deck.style.setProperty('--fd-tilt-y', '0deg');
    deck.style.setProperty('--fd-glare-x', '50%');
    deck.style.setProperty('--fd-glare-y', '50%');
  };

  return (
    <div
      className={`fd-tilt-surface ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => resetTilt(event.currentTarget)}
    >
      {children}
      <span className="fd-tilt-glare" aria-hidden="true" />
    </div>
  );
}

export function TiltSurface({ children, className = '', delay = 0 }: TiltSurfaceProps) {
  return (
    <FadeUp delay={delay} className="fd-tilt-scene h-full">
      <TiltDeck className={className}>{children}</TiltDeck>
    </FadeUp>
  );
}
