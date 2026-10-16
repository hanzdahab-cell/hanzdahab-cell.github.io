import { useEffect, useRef, useState } from 'react';
export interface CourseProgressStep {
  number: number;
  title: string;
  description: string;
  label?: string;
  tagline?: string;
  detail?: string;
  icon?: string;
}

interface CourseProgressStepsProps {
  steps: CourseProgressStep[];
  className?: string;
}

export function CourseProgressSteps({ steps, className = '' }: CourseProgressStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list || steps.length < 2 || typeof IntersectionObserver === 'undefined') return;

    const stepElements = Array.from(
      list.querySelectorAll<HTMLElement>('[data-course-progress-step]'),
    );
    if (stepElements.length !== steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSteps = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLElement).dataset.courseProgressStep))
          .filter((index) => Number.isInteger(index));

        if (visibleSteps.length > 0) {
          setActiveStep(Math.max(...visibleSteps));
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
    );

    stepElements.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [steps.length]);

  const progress = steps.length > 1 ? activeStep / (steps.length - 1) : 1;

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-[1.2rem] top-6 w-px bg-white/15 sm:left-[1.45rem]"
      >
        <span
          className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-cyan-200 to-teal-300 transition-transform duration-500 motion-reduce:transition-none"
          style={{ height: '100%', transform: `scaleY(${progress})` }}
        />
      </div>

      <ol ref={listRef} className="relative space-y-5 sm:space-y-6">
        {steps.map((step, index) => (
          <li
            key={`${step.number}-${step.title}`}
            data-course-progress-step={index}
            className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4"
          >
            <span
              aria-hidden="true"
              className={`relative z-10 mt-5 flex size-10 items-center justify-center rounded-full border bg-[#0E3453] font-mono text-[10px] font-semibold tracking-wider transition-colors duration-300 motion-reduce:transition-none sm:size-12 ${
                index <= activeStep
                  ? 'border-cyan-200 text-cyan-100 shadow-[0_0_18px_rgba(103,232,249,0.2)]'
                  : 'border-white/20 text-slate-400'
              }`}
            >
              {step.icon ? (
                <img
                  src={step.icon}
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="size-7 object-contain sm:size-8"
                />
              ) : (
                String(step.number).padStart(2, '0')
              )}
            </span>

            <div
              className={`ci-step-card rounded-2xl border p-5 shadow-[0_14px_38px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:border-cyan-300/45 motion-reduce:transition-none sm:p-6 ${
                index === activeStep
                  ? 'border-cyan-200/35 bg-[#0A2943]/95'
                  : 'border-white/10 bg-slate-900/45'
              }`}
            >
              {step.label && (
                <p className="font-alata text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {step.label}
                </p>
              )}
              <h3 className="mt-1.5 font-bebas text-2xl tracking-wide text-white sm:text-3xl">
                {step.title}
              </h3>
              {step.tagline && (
                <p className="mt-1 text-xs font-medium text-cyan-100">{step.tagline}</p>
              )}
              <p className="mt-2 text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                {step.description}
              </p>
              {step.detail && (
                <p className="mt-4 border-t border-white/10 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-200">
                  {step.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
