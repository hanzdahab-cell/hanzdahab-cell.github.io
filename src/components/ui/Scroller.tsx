import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import './Scroller.css';

type OverflowType = 'x' | 'y' | 'both';

interface ScrollerProps {
  children: React.ReactNode;
  overflow: OverflowType;
  height?: number | string;
  width?: number | string;
  withButtons?: boolean;
  childrenContainerClassName?: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export function Scroller({
  children,
  overflow,
  height = '100%',
  width = '100%',
  withButtons = false,
  childrenContainerClassName,
  className,
  id,
  ariaLabel = 'Scrollable content',
}: ScrollerProps) {
  const items = React.Children.toArray(children);
  const internalViewportRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false, left: false, right: false });

  const updateEdges = useCallback(() => {
    const viewport = internalViewportRef.current;
    if (!viewport) return;
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = viewport;
    setEdges({
      top: (overflow === 'y' || overflow === 'both') && scrollTop > 0,
      bottom: (overflow === 'y' || overflow === 'both') && scrollTop + clientHeight < scrollHeight - 1,
      left: (overflow === 'x' || overflow === 'both') && scrollLeft > 0,
      right: (overflow === 'x' || overflow === 'both') && scrollLeft + clientWidth < scrollWidth - 1,
    });
  }, [overflow]);

  useEffect(() => {
    const viewport = internalViewportRef.current;
    if (!viewport) return;
    updateEdges();
    viewport.addEventListener('scroll', updateEdges, { passive: true });
    const resizeObserver = new ResizeObserver(updateEdges);
    resizeObserver.observe(viewport);
    Array.from(viewport.children).forEach((child) => resizeObserver.observe(child));
    return () => {
      viewport.removeEventListener('scroll', updateEdges);
      resizeObserver.disconnect();
    };
  }, [updateEdges, children]);

  const scrollByStep = (direction: -1 | 1) => {
    const viewport = internalViewportRef.current;
    if (!viewport) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    viewport.scrollBy({
      top: overflow === 'x' ? 0 : direction * Math.max(1, viewport.clientHeight * 0.8),
      left: overflow === 'y' ? 0 : direction * Math.max(1, viewport.clientWidth * 0.8),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={clsx('fd-scroller relative flex flex-col overflow-hidden', className)} style={{ width, height }}>
      {withButtons && (overflow === 'y' || overflow === 'both') && (
        <div className="fd-scroller__controls" aria-label="Page scroll controls">
          <button type="button" onClick={() => scrollByStep(-1)} aria-label="Scroll page up" className="fd-scroller__button">
            <ChevronUp aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByStep(1)} aria-label="Scroll page down" className="fd-scroller__button">
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      )}
      {withButtons && (overflow === 'x' || overflow === 'both') && (
        <div className="fd-scroller__controls" aria-label="Horizontal scroll controls">
          <button type="button" onClick={() => scrollByStep(-1)} aria-label="Scroll page left" className="fd-scroller__button">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByStep(1)} aria-label="Scroll page right" className="fd-scroller__button">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
      <div
        ref={internalViewportRef}
        id={id}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        data-lenis-prevent
        className={clsx(
          'fd-scroller__viewport relative min-h-0 flex-1 overscroll-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#89ffff] motion-reduce:scroll-auto',
          overflow === 'x' && 'flex-row overflow-x-auto overflow-y-hidden',
          overflow === 'y' && 'flex-col overflow-x-hidden overflow-y-auto',
          overflow === 'both' && 'flex-row overflow-auto',
          childrenContainerClassName,
        )}
      >
        {items.map((child, index) => (
          <div key={index} className="min-w-0">
            {child}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className={clsx('fd-scroller__fade fd-scroller__fade--top', edges.top && 'is-visible')} />
      <div aria-hidden="true" className={clsx('fd-scroller__fade fd-scroller__fade--bottom', edges.bottom && 'is-visible')} />
      {(overflow === 'x' || overflow === 'both') && (
        <>
          <div aria-hidden="true" className={clsx('fd-scroller__fade fd-scroller__fade--left', edges.left && 'is-visible')} />
          <div aria-hidden="true" className={clsx('fd-scroller__fade fd-scroller__fade--right', edges.right && 'is-visible')} />
        </>
      )}
    </div>
  );
}
