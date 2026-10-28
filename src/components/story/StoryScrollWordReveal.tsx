import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const REST_OPACITY = 0.15;
const REVEAL_SPAN = 0.82;
const WORD_WINDOW = 0.24;

interface StoryScrollWordRevealProps {
  text: string;
  className?: string;
}

export function StoryScrollWordReveal({ text, className }: StoryScrollWordRevealProps) {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const setTargetRef = useCallback((node: HTMLSpanElement | null) => {
    targetRef.current = node;
    scrollContainerRef.current = node
      ? document.getElementById('site-page-scroll')
      : null;
  }, []);

  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: targetRef,
    offset: ['start 0.9', 'end 0.25'],
  });
  const parts = text.split(/(\s+)/);
  const words = parts.filter((part) => !/^\s+$/.test(part));
  let wordIndex = 0;

  return (
    <span ref={setTargetRef} className={className}>
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) return part;
        const currentWordIndex = wordIndex++;
        return (
          <RevealedWord
            key={`${part}-${index}`}
            progress={scrollYProgress}
            index={currentWordIndex}
            count={words.length}
            reducedMotion={!!reducedMotion}
          >
            {part}
          </RevealedWord>
        );
      })}
    </span>
  );
}

function RevealedWord({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  reducedMotion: boolean;
}) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * REVEAL_SPAN;
  const end = Math.min(1, start + WORD_WINDOW);
  const opacity = useTransform(progress, (value) => {
    if (value <= start) return REST_OPACITY;
    if (value >= end) return 1;
    const wordProgress = (value - start) / (end - start);
    return REST_OPACITY + (1 - REST_OPACITY) * wordProgress;
  });

  return <motion.span style={reducedMotion ? undefined : { opacity }}>{children}</motion.span>;
}
