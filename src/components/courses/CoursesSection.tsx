import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { PageType } from '../../types';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FadeUp } from '../ui/MotionKit';
import { TiltSurface } from '../ui/TiltSurface';
import { coreCoursePhotoById, courseCardArtworkById, coursePhotoById } from '../../data/courseMedia';
import { SectionHero } from '../ui/SectionHero';

interface CoursesSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

const SPECIALTY_CARD_ORDER = [
  'spec-training-techniques',
  'spec-monofin',
  'spec-no-fins',
  'spec-variable-weight',
  'spec-react-right',
  'spec-marine-ecology',
  'fdd-equalization-clinic',
  'spec-mouthfill',
] as const;

interface ProfessionalCourseCard {
  id: string;
  title: string;
  duration: string;
  description: string;
  image: { src: string; alt: string };
  priceEur?: number;
  courseId?: string;
  courseSlug?: string;
}

function GroupHeading({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <h2 className="font-bebas text-3xl sm:text-4xl text-white uppercase tracking-[0.05em] leading-none">
        {title}
      </h2>
      <span className="h-px flex-1 bg-ocean-pale/15" />
    </div>
  );
}

export function CoursesSection({ onOpenBooking, onNavigate, currency }: CoursesSectionProps) {
  const { t } = useTranslation();

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const navigateToCourse = (slug: string) => {
    // App's navigateTo resets scroll to the surface through Lenis
    onNavigate(`course-${slug}` as PageType);
  };

  const coreCourses = ssiCourses.filter((c) => c.id !== 'ssi-basic-freediver');

  const coreCards = coreCourses;
  const specialtyCards = SPECIALTY_CARD_ORDER
    .map((id) => specialtyCourses.find((course) => course.id === id))
    .filter((course) => course !== undefined);
  const professionalCards: ProfessionalCourseCard[] = [
    ...instructorCourses
      .filter((course) => course.id === 'ssi-itc' || course.id === 'ssi-advanced-instructor')
      .map((course) => ({
        id: course.id,
        title: course.title,
        duration: course.durationWeeksOrDays,
        description: course.description,
        image: courseCardArtworkById[course.id] ?? {
          src: course.image.url,
          alt: course.image.alt,
        },
        priceEur: course.priceEur,
        courseId: course.id,
        courseSlug: course.slug,
      })),
    {
      id: 'ssi-performance-freediving-instructor',
      title: 'SSI Performance Freediving Instructor Course',
      duration: 'Schedule on request',
      description: 'Ask our team about the course format, prerequisites, and upcoming dates.',
      image: {
        src: '/courses/uploaded/ssi-performance-freediving-instructor-course.jpg',
        alt: 'Artwork for the SSI Performance Freediving Instructor Course',
      },
    },
  ];

  return (
    <section id="courses" className="ocean-surface relative pb-20 sm:pb-28 film-grain">
      <SectionHero imageSrc={courseCardArtworkById['ssi-level-1'].src} imageAlt="" className="min-h-[50svh]" alignStart>
          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-ocean-pale sm:text-base sm:tracking-[0.16em]">
              <span className="h-px w-8 bg-ocean-light" aria-hidden="true" />
              Freedive Dahab · SSI
            </p>
            <h1 className="font-bebas text-5xl leading-[0.95] tracking-[0.025em] text-white sm:text-6xl lg:text-7xl">
              Why SSI Certification?
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-100 sm:text-lg">
              SSI offers progressive, safety-focused training and internationally recognized
              freediving certifications.
            </p>
          </div>
      </SectionHero>

      <div className="relative mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
        <div className="absolute inset-0 architectural-grid-fine opacity-10 pointer-events-none" />
        {/* ========================================================== */}
        {/* CORE COURSE CARDS                                          */}
        {/* ========================================================== */}
        <div id="chapter-core" className="relative z-10 scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="Our Core Courses" />

          {/* Core SSI Freediver certifications */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {coreCards.map((course, idx) => (
            <TiltSurface
              key={course.id}
              delay={idx * 0.06}
              className={`group flex h-full flex-col rounded-2xl border border-ocean-pale/10 bg-[#0A2943] transition-colors duration-300 hover:border-ocean-light/50 ${idx === coreCards.length - 1 ? 'sm:col-span-2 sm:mx-auto sm:w-1/2 xl:col-span-1 xl:mx-0 xl:w-auto' : ''}`}
            >
              <>
                {/* Card Image */}
                <div className="fd-tilt-photo-layer relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#081F35]">
                  <img
                    src={(courseCardArtworkById[course.id] ?? coreCoursePhotoById[course.id] ?? course.image).src}
                    alt={(courseCardArtworkById[course.id] ?? coreCoursePhotoById[course.id] ?? course.image).alt}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full border border-white/35 bg-[#081F35]/75 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="fd-tilt-copy-layer flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="min-h-[3.5rem] font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-ocean-pale sm:text-2xl">
                    <button
                      type="button"
                      onClick={() => navigateToCourse(course.slug)}
                      className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {course.title}
                    </button>
                  </h3>

                  <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-sm font-light leading-relaxed text-slate-300">
                    {course.subtitle}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-y border-ocean-pale/10 py-3 text-xs text-slate-300">
                    <span>
                      <span className="block text-[10px] text-slate-400">{t('coursesSection.depth')}</span>
                      {course.maxDepthMeters} {t('coursesSection.meters')}
                    </span>
                    <span>
                      <span className="block text-[10px] text-slate-400">{t('coursesSection.duration')}</span>
                      {course.durationDays} {t('coursesSection.days')}
                    </span>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(course.id)}
                      className="fd-button inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Enroll in course
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('calendar')}
                      className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-white/45 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Our calendar
                      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-3 text-right text-sm font-semibold text-ocean-pale">
                    {formatPrice(course.priceEur)}
                  </p>
                </div>
              </>
            </TiltSurface>
          ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* SPECIALTY COURSES                                           */}
        {/* ========================================================== */}
        <div id="chapter-try" className="relative z-10 scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="Specialties" />

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialtyCards.map((course, idx) => (
              <TiltSurface
                key={course.id}
                delay={(idx % 4) * 0.08}
                className="group flex h-full flex-col rounded-2xl border border-ocean-pale/10 bg-[#0A2943] transition-colors duration-300 hover:border-ocean-light/50"
              >
                <div className="fd-tilt-photo-layer relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                  <img
                    src={(courseCardArtworkById[course.id] ?? coursePhotoById[course.id] ?? course.image).src}
                    alt={(courseCardArtworkById[course.id] ?? coursePhotoById[course.id] ?? course.image).alt}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                    {course.durationDays} day{course.durationDays > 1 ? 's' : ''}
                  </span>
                  {(course.id === 'fdd-equalization-clinic' || course.id === 'spec-mouthfill') && (
                    <img
                      src="/logo-freedive-dahab.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute right-3 top-3 z-10 h-16 w-20 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]"
                    />
                  )}
                </div>

                <div className="fd-tilt-copy-layer flex flex-1 flex-col p-5">
                  <h3 className="min-h-[3.5rem] font-serif text-lg font-bold leading-snug text-white transition-colors group-hover:text-ocean-pale">
                    <button
                      type="button"
                      onClick={() => navigateToCourse(course.slug)}
                      className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {course.title}
                    </button>
                  </h3>
                  <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-sm font-light leading-relaxed text-slate-300">
                    {course.shortDesc}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-ocean-pale/10 pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(course.id)}
                      className="fd-button inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Enroll in course
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('calendar')}
                      className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-white/45 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Our calendar
                      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-3 text-right text-sm font-semibold text-ocean-pale">{formatPrice(course.priceEur)}</p>
                </div>
              </TiltSurface>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* PROFESSIONAL TRAINING                                       */}
        {/* ========================================================== */}
        <div id="chapter-pro" className="relative z-10 scroll-mt-28">
          <GroupHeading title="Professional Courses" />

          {/* Professional instructor path */}
          <div className="mb-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {professionalCards.map((course, idx) => (
              <TiltSurface
                key={course.id}
                delay={idx * 0.08}
                className="group flex h-full flex-col rounded-2xl border border-ocean-pale/10 bg-[#0A2943] transition-colors duration-300 hover:border-ocean-light/50"
              >
                <div className="fd-tilt-photo-layer relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#081F35]">
                  <img
                    src={course.image.src}
                    alt={course.image.alt}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-ocean-pale/25 bg-[#081F35]/70 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-ocean-pale backdrop-blur-md">
                    {course.duration}
                  </span>
                </div>

                <div className="fd-tilt-copy-layer flex flex-1 flex-col p-5">
                  <h3 className="min-h-[3.5rem] font-serif text-lg font-bold leading-snug text-white transition-colors group-hover:text-ocean-pale">
                    {course.courseSlug ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (course.courseSlug) navigateToCourse(course.courseSlug);
                        }}
                        className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {course.title}
                      </button>
                    ) : (
                      course.title
                    )}
                  </h3>
                  <p className="mt-2 min-h-[2.75rem] line-clamp-2 text-sm font-light leading-relaxed text-slate-300">
                    {course.description}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-ocean-pale/10 pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(course.courseId)}
                      className="fd-button inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {course.courseId ? 'Enroll in course' : 'Ask about course'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('calendar')}
                      className="inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-white/45 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Our calendar
                      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-3 text-right text-sm font-semibold text-ocean-pale">
                    {course.priceEur === undefined ? 'Ask for pricing' : formatPrice(course.priceEur)}
                  </p>
                </div>
              </TiltSurface>
            ))}
          </div>

          {/* Tailored ask */}
          <FadeUp className="glass-panel rounded-2xl border border-ocean-pale/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-serif text-2xl font-bold text-white">
                Tailored programs & Specialty Instructor
              </h4>
              <p className="text-slate-300/90 font-alata text-sm max-w-xl leading-relaxed">
                Mouthfill masterclasses, competition preparation, mermaid programs, and our
                professional SSI Specialty Instructor ratings — tailored around your goals and
                scheduled on request.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="fd-button shrink-0 flex items-center gap-2 rounded-full px-7 py-3.5 font-alata text-xs font-semibold uppercase tracking-[0.08em]"
            >
              <span>Ask Us Anything</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
