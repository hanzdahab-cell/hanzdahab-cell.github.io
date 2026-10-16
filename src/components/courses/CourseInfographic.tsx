import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownToLine, CalendarDays, Timer } from 'lucide-react';
import { Course } from '../../types';
import { CourseProgressSteps } from './CourseProgressSteps';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CourseInfographicProps {
  course: Course;
}

const JOURNEY_TITLES: Record<string, string> = {
  'ssi-level-1': 'Begin with calm, build confidence',
  'ssi-level-2': 'From buoyancy to freefall',
  'ssi-level-3': 'Prepare for deeper performance',
};

function getDisciplineIcon(name: string): string {
  const normalized = name.toLowerCase();
  if (/equalis|mouthfill|breath|theory/.test(normalized)) {
    return '/images/course-infographic/mask-snorkel.png';
  }
  if (/static|co2/.test(normalized)) {
    return '/images/course-infographic/diving-watch.png';
  }
  if (/dynamic|session|coach|weight/.test(normalized)) {
    return '/images/course-infographic/swimmer.png';
  }
  if (/depth|freefall|frc/.test(normalized)) {
    return '/images/course-infographic/diver.png';
  }
  return '/images/course-infographic/wet-suit.png';
}

export function CourseInfographic({ course }: CourseInfographicProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const rulerFillRef = useRef<HTMLDivElement>(null);
  const performances = course.futurePerformances;
  const disciplines = course.disciplines ?? [];
  const rulerPct = Math.min(100, (course.maxDepthMeters / 45) * 100);
  const journeyTitle = JOURNEY_TITLES[course.id] ?? 'Your course, step by step';

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (rulerFillRef.current) {
        rulerFillRef.current.style.width = `${rulerPct}%`;
      }
      return;
    }

    const context = gsap.context(() => {
      gsap.from(scope.querySelectorAll('.ci-stat'), {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: scope.querySelector('.ci-stats-row'), start: 'top 84%', once: true },
      });
      gsap.from(scope.querySelectorAll('.ci-step-card'), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: scope.querySelector('.ci-steps'), start: 'top 82%', once: true },
      });
      if (rulerFillRef.current) {
        gsap.fromTo(
          rulerFillRef.current,
          { width: '0%' },
          {
            width: `${rulerPct}%`,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: rulerFillRef.current, start: 'top 88%', once: true },
          }
        );
      }
    }, scope);

    return () => context.revert();
  }, [rulerPct]);

  const stats = [
    {
      icon: Timer,
      value: performances?.staticApnea ?? 'With coaching',
      label: 'Static breath-hold target',
    },
    {
      icon: ArrowDownToLine,
      value: performances?.depth ?? `Up to ${course.maxDepthMeters} m`,
      label: 'Depth performance range',
    },
    {
      icon: CalendarDays,
      value: `${course.durationDays} ${course.durationDays === 1 ? 'day' : 'days'}`,
      label: 'Course duration',
    },
  ];

  return (
    <div ref={scopeRef} className="relative overflow-hidden">
      <header className="relative mb-10 space-y-3 text-center sm:mb-12">
        <div className="mx-auto h-1 w-12 rounded-full bg-cyan-300" aria-hidden="true" />
        <p className="font-alata text-[10px] uppercase tracking-[0.28em] text-cyan-300">
          Course progression
        </p>
        <h2 className="font-bebas text-3xl tracking-[0.04em] text-white sm:text-4xl md:text-5xl">
          {journeyTitle}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300">
          A clear path through the skills in this SSI course, coached around your readiness.
        </p>
      </header>

      <div className="ci-stats-row mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="ci-stat rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-center transition-colors hover:border-cyan-300/40 sm:p-5"
          >
            <stat.icon className="mx-auto h-5 w-5 text-cyan-300" aria-hidden="true" />
            <p className="mt-3 font-bebas text-3xl leading-none text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-12 space-y-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-alata uppercase tracking-[0.16em] text-slate-300">
          <span>Course depth range</span>
          <span className="text-cyan-200">{performances?.depth ?? `${course.maxDepthMeters} m`}</span>
        </div>
        <div
          className="relative h-2.5 rounded-full bg-white/10"
          role="img"
          aria-label={`Depth scale from 0 to 45 meters, course range ${performances?.depth ?? `${course.maxDepthMeters} meters`}`}
        >
          <div
            ref={rulerFillRef}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_16px_rgba(45,212,191,0.35)]"
            style={{ width: '0%' }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-alata text-slate-400" aria-hidden="true">
          {[0, 10, 20, 30, 40].map((depth) => (
            <span key={depth}>{depth} m</span>
          ))}
          <span>45 m</span>
        </div>
      </div>

      <section aria-labelledby="course-skills-timeline" className="relative">
        <div className="mb-5">
          <h3 id="course-skills-timeline" className="font-bebas text-2xl tracking-wide text-white sm:text-3xl">
            Skills you will practise
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Each focus area adds a different tool to your training.
          </p>
        </div>
        <div className="ci-steps relative">
          <CourseProgressSteps
            steps={disciplines.map((discipline, index) => ({
              number: index + 1,
              label: `Focus 0${index + 1}`,
              title: discipline.name,
              tagline: discipline.tagline,
              description: discipline.description,
              detail: discipline.sessions,
              icon: getDisciplineIcon(discipline.name),
            }))}
          />
        </div>
        <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
          Performance ranges are course targets, not guarantees. Depth progression and FRC practice are
          always guided by instructor assessment, buddy procedures, and individual readiness.
        </p>
      </section>
    </div>
  );
}
