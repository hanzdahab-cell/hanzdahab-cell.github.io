import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { PageType } from '../../types';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FadeUp } from '../ui/MotionKit';
import { coreCoursePhotoById, courseCardArtworkById, coursePhotoById } from '../../data/courseMedia';
import { CoursePhotoCarousel, CourseStorySlide } from './CoursePhotoCarousel';
import { SSICertificates } from '../ssi/SSICertificates';

interface CoursesSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
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

  const tryFreediving = ssiCourses.find((c) => c.id === 'ssi-basic-freediver');
  const coreCourses = ssiCourses.filter((c) => c.id !== 'ssi-basic-freediver');

  // Categorized card collections
  const coreCards = tryFreediving ? [tryFreediving, ...coreCourses] : coreCourses;
  const specialtyCards = specialtyCourses.filter((c) => c.id !== 'master-freediver');
  const masterCourse = specialtyCourses.find((c) => c.id === 'master-freediver');
  const storySlides: CourseStorySlide[] = coreCards.map((course) => ({
    id: course.id,
    title: course.title,
    subtitle: `${course.level} course`,
    detail: course.highlights[0] ?? course.subtitle,
    courseId: course.id,
    courseSlug: course.slug,
    duration: `${course.durationDays} ${course.durationDays === 1 ? 'day' : 'days'}`,
    depth: `Up to ${course.maxDepthMeters} m`,
    ...(coreCoursePhotoById[course.id] ?? course.image),
  }));

  return (
    <section id="courses" className="relative bg-[#0E3453] pb-28 sm:pb-36 film-grain">
      <div className="relative isolate overflow-hidden bg-[#081F35]">
        <img
          src="/courses/uploaded/dahab-reef-fish.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#081F35]/95 via-[#081F35]/75 to-[#081F35]/35"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-32 sm:gap-12 sm:pb-20 sm:pt-36 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="max-w-xl space-y-5">
            <p className="flex items-center gap-3 text-sm text-ocean-pale">
              <span className="h-px w-8 bg-ocean-light" aria-hidden="true" />
              Freediving in Dahab, Red Sea
            </p>
            <h1 className="font-bebas text-6xl leading-[0.92] tracking-[0.025em] text-white sm:text-7xl lg:text-[clamp(5rem,7vw,7.5rem)]">
              Find your
              <br />
              depth.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
              Begin with your first calm breath-hold or progress toward 40 metres. Train with
              experienced SSI instructors, small groups and the clear-water dive sites of Dahab.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
              <span>Small-group coaching</span>
              <span>Courses for every level</span>
              <span>Red Sea line training</span>
            </div>
            <a
              href="#chapter-core"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore core courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <CoursePhotoCarousel
            slides={storySlides}
            onBook={onOpenBooking}
            onView={navigateToCourse}
            onCalendar={() => onNavigate('calendar')}
          />
        </div>
      </div>

      <SSICertificates variant="compact" />

      <nav aria-label="Course sections" className="mx-auto max-w-7xl px-6 pt-8">
        <ul className="flex flex-wrap gap-x-7 gap-y-2 border-b border-white/10 pb-4 text-sm text-slate-300">
          <li>
            <a
              href="#chapter-core"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Core courses
            </a>
          </li>
          <li>
            <a
              href="#chapter-try"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Specialty courses
            </a>
          </li>
          <li>
            <a
              href="#chapter-pro"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Professional training
            </a>
          </li>
        </ul>
      </nav>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
        <div className="absolute inset-0 architectural-grid-fine opacity-10 pointer-events-none" />
        {/* ========================================================== */}
        {/* CORE COURSE CARDS                                          */}
        {/* ========================================================== */}
        <div id="chapter-core" className="relative z-10 scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="Core courses" />

          {/* Course cards — the full core path: Try + Level 1/2/3 */}
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {coreCards.map((course, idx) => (
            <FadeUp
              key={course.id}
              delay={idx * 0.06}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ocean-pale/10 bg-[#0A2943] transition-colors duration-300 hover:border-ocean-light/50"
            >
              <>
                {/* Card Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#081F35]">
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
                <div className="flex flex-1 flex-col p-5 sm:p-6">
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
                      className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
            </FadeUp>
          ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* SPECIALTY COURSES                                           */}
        {/* ========================================================== */}
        <div id="chapter-try" className="relative z-10 scroll-mt-28 mb-24 sm:mb-32">
          <GroupHeading title="Specialty courses" />

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialtyCards.map((course, idx) => (
              <FadeUp
                key={course.id}
                delay={(idx % 4) * 0.08}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ocean-pale/10 bg-[#0A2943] transition-colors duration-300 hover:border-ocean-light/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
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
                </div>

                <div className="flex flex-1 flex-col p-5">
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
                      className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ========================================================== */}
        {/* PROFESSIONAL TRAINING                                       */}
        {/* ========================================================== */}
        <div id="chapter-pro" className="relative z-10 scroll-mt-28">
          <GroupHeading title="Professional training" />

          {/* Master Freediver — feature card */}
          {masterCourse && (
            <FadeUp
              className="group glass-panel rounded-2xl overflow-hidden border border-ocean-light/20 hover:border-ocean-light/60 grid grid-cols-1 lg:grid-cols-2 transition-colors duration-300 mb-10"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#081F35]">
                <img
                  src={(courseCardArtworkById[masterCourse.id] ?? coursePhotoById[masterCourse.id] ?? masterCourse.image).src}
                  alt={(courseCardArtworkById[masterCourse.id] ?? coursePhotoById[masterCourse.id] ?? masterCourse.image).alt}
                  className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081F35]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[10px] font-mono tracking-widest uppercase">
                  Apex Recreational Certification
                </span>
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h4 className="font-serif text-3xl sm:text-4xl font-bold text-white group-hover:text-ocean-pale transition-colors">
                    <button
                      type="button"
                      onClick={() => navigateToCourse(masterCourse.slug)}
                      className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {masterCourse.title}
                    </button>
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {masterCourse.shortDesc}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-300 pt-2">
                    <span>{masterCourse.durationDays} days</span>
                    <span className="text-ocean-pale font-bold">{formatPrice(masterCourse.priceEur)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(masterCourse.id)}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Enroll in course
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('calendar')}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/45 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Our calendar
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Professional instructor path */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {instructorCourses.map((course, idx) => (
              <FadeUp
                key={course.id}
                delay={idx * 0.1}
                className="group glass-panel rounded-2xl overflow-hidden border border-ocean-pale/10 hover:border-ocean-light/50 flex flex-col transition-colors duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={(courseCardArtworkById[course.id] ?? coursePhotoById[course.id] ?? course.image).src}
                    alt={(courseCardArtworkById[course.id] ?? coursePhotoById[course.id] ?? course.image).alt}
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#081F35]/70 backdrop-blur-md border border-ocean-pale/25 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                    {course.durationWeeksOrDays}
                  </span>
                  {course.internshipOption && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ocean/40 backdrop-blur-md border border-ocean-light/40 text-ocean-pale text-[9px] font-mono tracking-widest uppercase">
                      Internship
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
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
                    {course.description}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-ocean-pale/10 pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(course.id)}
                      className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-white px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              </FadeUp>
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
              className="shrink-0 px-7 py-3.5 rounded-full bg-white text-[#0E3453] hover:bg-ocean-pale font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
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
