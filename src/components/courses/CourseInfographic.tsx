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

interface CourseProgressionCardProps {
  course: Course;
}

export function CourseProgressionCard({ course }: CourseProgressionCardProps) {
  const journeyTitle = JOURNEY_TITLES[course.id] ?? 'Your course, step by step';
  const performances = course.futurePerformances;
  const depthPercent = Math.min(100, (course.maxDepthMeters / 45) * 100);
  const stats = [
    {
      icon: Timer,
      value: performances?.staticApnea ?? 'With coaching',
      label: 'Static breath-hold practice',
    },
    {
      icon: ArrowDownToLine,
      value: performances?.depth ?? `Up to ${course.maxDepthMeters} m`,
      label: 'Course depth range',
    },
    {
      icon: CalendarDays,
      value: `${course.durationDays} ${course.durationDays === 1 ? 'day' : 'days'}`,
      label: 'Course duration',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
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
      </div>

      <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-white/15 bg-[#061F35]/75 p-4 sm:p-5"
          >
            <Icon
              className="h-5 w-5 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              aria-hidden="true"
            />
            <p className="mt-3 font-bebas text-3xl leading-none text-white sm:text-4xl">
              {value}
            </p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl border border-white/15 bg-[#061F35]/75 p-4 text-left sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-alata uppercase tracking-[0.16em] text-slate-300">
          <span>Course depth scale</span>
          <span className="text-cyan-100">
            {performances?.depth ?? `Up to ${course.maxDepthMeters} m`}
          </span>
        </div>
        <div
          className="relative h-2.5 rounded-full bg-white/15"
          role="img"
          aria-label={`Depth scale from 0 to 45 meters, course range ${performances?.depth ?? `${course.maxDepthMeters} meters`}`}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-200 to-teal-200 shadow-[0_0_16px_rgba(255,255,255,0.45)]"
            style={{ width: `${depthPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-alata text-slate-400" aria-hidden="true">
          {[0, 10, 20, 30, 40].map((depth) => (
            <span key={depth}>{depth} m</span>
          ))}
          <span>45 m</span>
        </div>
      </div>

      <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-300">
        Performance ranges are course targets, not guarantees. Your instructor adapts progression
        to your readiness, buddy procedures, and sea conditions.
      </p>
    </div>
  );
}

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
  const disciplines = course.disciplines ?? [];

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from(scope.querySelectorAll('.ci-step-card'), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: scope.querySelector('.ci-steps'), start: 'top 82%', once: true },
      });
    }, scope);

    return () => context.revert();
  }, []);

  return (
    <div ref={scopeRef} className="relative overflow-hidden">
      <section id="course-skills" aria-labelledby="course-skills-timeline" className="relative scroll-mt-32">
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
