import { CSSProperties, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Award,
  Waves,
  Check,
  CheckCircle,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { PageType, Course, SpecialtyCourse, InstructorCourse } from '../../types';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { CourseInfographic, CourseProgressionCard } from './CourseInfographic';
import { CourseProgressSteps } from './CourseProgressSteps';
import { FadeUp } from '../ui/MotionKit';
import { TiltSurface } from '../ui/TiltSurface';
import { courseCardArtworkById, ssiCourseArtworkBySlug } from '../../data/courseMedia';
import { CoursePhotoGallery } from '../ui/CoursePhotoGallery';
import { getCourseDetailGalleryItems } from '../../data/detailGalleries';

interface CourseDetailPageProps {
  courseSlug: string;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function CourseDetailPage({
  courseSlug,
  onNavigate,
  onOpenBooking,
  currency,
}: CourseDetailPageProps) {
  const [copied, setCopied] = useState(false);

  const course =
    ssiCourses.find((c) => c.slug === courseSlug) ||
    specialtyCourses.find((c) => c.slug === courseSlug) ||
    instructorCourses.find((c) => c.slug === courseSlug);

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ============================== NOT FOUND ==============================
  if (!course) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 bg-[#0E3453]">
        <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in-95 duration-300">
          <Waves className="w-14 h-14 text-cyan-400/60 mx-auto" />
          <h1 className="font-serif text-4xl font-bold text-white">Course not found</h1>
          <p className="text-slate-400 font-light">
            The course you are looking for has drifted into deeper waters. Explore our full
            curriculum instead.
          </p>
          <button
            onClick={() => onNavigate('courses')}
            className="fd-button inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Courses</span>
          </button>
        </div>
      </div>
    );
  }

  const isCore = 'overview' in course;
  const isSpecialty = 'keySkills' in course;
  const isInstructor = 'modules' in course;

  const durationLabel =
    'durationDays' in course ? `${course.durationDays} Day${course.durationDays > 1 ? 's' : ''}` : course.durationWeeksOrDays;

  const depthLabel = 'maxDepthMeters' in course ? `${course.maxDepthMeters}m max depth` : null;

  const related = ssiCourses.filter((item) => item.slug !== course.slug);

  const skillsList = isCore
    ? (course as Course).highlights
    : isSpecialty
    ? (course as SpecialtyCourse).keySkills
    : (course as InstructorCourse).modules;

  const subtitleText = isCore
    ? (course as Course).subtitle
    : isSpecialty
    ? (course as SpecialtyCourse).shortDesc
    : null;

  const skillsTitle = isCore
    ? 'Course Highlights'
    : isSpecialty
    ? 'Key Skills You Will Develop'
    : 'Core Modules & Examination';

  const description = isCore
    ? (course as Course).overview
    : isSpecialty
    ? (course as SpecialtyCourse).fullDesc
    : (course as InstructorCourse).description;

  const levelBadge =
    'level' in course
      ? (course as Course).level
      : isInstructor
      ? 'Instructor / Pro'
      : 'Specialty';
  const ssiArtwork = ssiCourseArtworkBySlug[course.slug];
  const heroCardImage = ssiArtwork ?? courseCardArtworkById[course.id] ?? course.image;
  const courseStackItems = getCourseDetailGalleryItems(course.id, course.title);
  if (courseStackItems.length === 0) {
    courseStackItems.push({
      id: `${course.id}-gallery-cover`,
      title: course.title,
      description: 'Course cover photo',
      imageSrc: course.image.url,
      imageAlt: course.image.alt,
      tag: 'Course gallery',
    });
  }

  const handleNavigateToCourse = (slug: string) => {
    // App's navigateTo resets scroll to the surface through Lenis
    onNavigate(`course-${slug}` as PageType);
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (window.__lenis) {
      const top = section.getBoundingClientRect().top + window.scrollY - 128;
      window.__lenis.scrollTo(top, { duration: 1.2 });
    } else {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="ocean-surface relative min-h-screen text-slate-100">
      {/* ========================================================== */}
      {/* HERO                                                        */}
      {/* ========================================================== */}
      <header className="relative isolate flex min-h-[50svh] items-center overflow-hidden bg-[#081F35] pb-14 pt-28 sm:pb-20 sm:pt-32">
        <img
          src={heroCardImage.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061A2B]/95 via-[#061A2B]/80 to-[#061A2B]/45" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/90 via-transparent to-[#061A2B]/25" aria-hidden="true" />
        <div className="absolute inset-0 architectural-grid-fine opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                All courses
              </button>
              <button
                type="button"
                onClick={handleShare}
                aria-label={copied ? 'Course link copied' : 'Copy link to this course'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copied ? <Check className="h-4 w-4 text-cyan-300" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-200/40 bg-cyan-900/40 px-3 py-1 text-xs font-medium text-cyan-100">
                {levelBadge}
              </span>
              {isInstructor && (course as InstructorCourse).internshipOption && (
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90">
                  Teaching internship included
                </span>
              )}
            </div>

            <h1 className="font-bebas text-5xl leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl">
              {course.title}
            </h1>

            {subtitleText && (
              <p className="max-w-xl text-base font-light leading-relaxed text-slate-200 sm:text-lg">
                {subtitleText}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking(course.id)}
                className="fd-button inline-flex min-h-12 items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {isInstructor ? 'Apply for this course' : 'Enroll in course'}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSection('course-about')}
                className="inline-flex min-h-12 items-center px-4 py-3 text-sm font-medium text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore course details
              </button>
            </div>
            <span className="sr-only" aria-live="polite">{copied ? 'Course link copied to clipboard.' : ''}</span>
          </div>

        </div>
      </header>

      {/* ========================================================== */}
      {/* BODY                                                        */}
      {/* ========================================================== */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="absolute inset-0 architectural-grid-fine opacity-10 pointer-events-none" />

        <nav aria-label="On this page" className="relative z-10 mb-12 border-y border-ocean-pale/15 py-2">
          <ul className="flex flex-wrap gap-x-6">
            {[
              { id: 'course-about', label: 'Overview' },
              { id: 'course-highlights', label: 'Course highlights' },
              { id: 'course-skills', label: isInstructor ? 'Course modules' : 'What you will learn' },
              ...(isCore && (course as Course).schedule ? [{ id: 'course-schedule', label: 'Day by day' }] : []),
              { id: 'course-gallery', label: 'Photo gallery' },
              { id: 'course-booking', label: 'Price & booking' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleScrollToSection(item.id)}
                  className="inline-flex min-h-11 items-center text-sm text-ocean-pale/90 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-pale"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: Description & curriculum */}
          <div className="lg:col-span-2 space-y-12">
            <div className="course-sticky-stack relative">
              <article
                id="course-about"
                className="course-sticky-stack__card scroll-mt-32 space-y-5 rounded-2xl border border-white/10 bg-[#0A2943] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-7"
                style={{ '--course-sticky-index': 0, '--course-sticky-layer': 1 } as CSSProperties}
              >
                <h2 className="flex items-center gap-3 font-bebas text-3xl tracking-[0.05em] text-white sm:text-4xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" aria-hidden="true" />
                  About the course
                </h2>
                {description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed text-slate-300 sm:text-base">
                    {para}
                  </p>
                ))}
              </article>

              <article
                id="course-highlights"
                className="course-sticky-stack__card scroll-mt-32 space-y-5 rounded-2xl border border-white/10 bg-[#0B2C4A] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-7"
                style={{ '--course-sticky-index': 1, '--course-sticky-layer': 2 } as CSSProperties}
              >
                <h2 className="flex items-center gap-3 font-bebas text-3xl tracking-[0.05em] text-white sm:text-4xl">
                  <Waves className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                  {skillsTitle}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {skillsList.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/50 p-4 transition-all duration-300 hover:border-cyan-400/40"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                      <span className="text-xs text-slate-300 transition-colors group-hover:text-white sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Each scheduled day is its own card; the heading stays with day one. */}
              {isCore && (course as Course).schedule && (
                <section
                  aria-labelledby="course-schedule-heading"
                  className="grid items-start gap-6"
                >
                  {(course as Course).schedule!.map((day, index) => (
                    <article
                      key={`${day.day}-${day.title}`}
                      id={index === 0 ? 'course-schedule' : undefined}
                      className={`course-sticky-stack__card scroll-mt-32 space-y-4 rounded-2xl border border-white/10 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-7 ${
                        index % 2 === 0 ? 'bg-[#0A2943]' : 'bg-[#0B2C4A]'
                      }`}
                      style={{
                        '--course-sticky-index': index + 2,
                        '--course-sticky-layer': index + 3,
                      } as CSSProperties}
                    >
                      {index === 0 && (
                        <h2
                          id="course-schedule-heading"
                          className="flex items-center gap-3 font-bebas text-3xl tracking-[0.05em] text-white sm:text-4xl"
                        >
                          <Clock className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                          Day by day
                        </h2>
                      )}
                      <p className="font-alata text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                        {day.day}
                      </p>
                      <h3 className="font-bebas text-2xl tracking-wide text-white sm:text-3xl">
                        {day.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                        {day.description}
                      </p>
                    </article>
                  ))}
                </section>
              )}

              {isCore && (
                <article
                  className="course-sticky-stack__card scroll-mt-32 rounded-2xl border border-cyan-200/20 bg-[#0A2943] p-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-7"
                  style={{
                    '--course-sticky-index': 2 + ((course as Course).schedule?.length ?? 0),
                    '--course-sticky-layer': 3 + ((course as Course).schedule?.length ?? 0),
                  } as CSSProperties}
                >
                  <CourseProgressionCard course={course as Course} />
                </article>
              )}
            </div>

            {/* Motion infographic — adapted from the hand-drawn diving template */}
            {isCore && (course as Course).disciplines && (course as Course).futurePerformances && (
              <FadeUp>
                <CourseInfographic course={course as Course} />
              </FadeUp>
            )}

            {isCore && !(course as Course).schedule && (
              <FadeUp className="rounded-2xl border border-ocean-pale/25 bg-gradient-to-r from-[#081F35] via-[#0E3453] to-[#081F35] p-6">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2">
                  Typical day structure
                </div>
                <p className="text-slate-200 text-sm font-light leading-relaxed">
                  {(course as Course).scheduleSummary}
                </p>
              </FadeUp>
            )}
          </div>

          {/* RIGHT: Booking panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: '160ms' }}>
              <div id="course-booking" className="glass-panel scroll-mt-32 rounded-2xl border border-cyan-400/30 p-7 space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                      All-inclusive price
                    </div>
                    <div className="text-4xl font-serif font-bold text-cyan-300 pt-1">
                      {formatPrice(course.priceEur)}
                    </div>
                  </div>
                  <div className="flex h-10 w-[4.5rem] items-center justify-center rounded-lg bg-white px-2 shadow-lg shadow-black/15">
                    <img
                      src="/badges/ssi-logo-black.png"
                      alt="SSI"
                      className="max-h-6 w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(course.id)}
                  className="fd-button flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold uppercase tracking-[0.15em]"
                >
                  <span>{isInstructor ? 'Apply Now' : 'Reserve Your Spot'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-300">
                  A 30% deposit secures your booking. The remaining balance is due on arrival in Dahab, and free date changes are available up to 14 days before your course starts.
                </p>
              </div>

              <div id="course-gallery" className="scroll-mt-32">
                <CoursePhotoGallery images={courseStackItems} label={`${course.title} photo gallery`} />
              </div>

              {/* Prerequisites */}
              {course.prerequisites && (
                <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
                    Prerequisites
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {course.prerequisites}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================== */}
        {/* RELATED COURSES                                             */}
        {/* ========================================================== */}
        {related.length > 0 && (
          <FadeUp className="relative z-10 mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em]">
                Our <span className="text-cyan-300">core courses</span>
              </h2>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-mono uppercase tracking-wider text-cyan-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                All courses
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <TiltSurface
                  key={rel.id}
                  delay={i * 0.1}
                  className="group h-full rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => handleNavigateToCourse(rel.slug)}
                    className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="fd-tilt-photo-layer relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                      <img
                        src={rel.image.url}
                        alt={rel.image.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
                    </div>
                    <div className="fd-tilt-copy-layer w-full p-5 space-y-2">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {rel.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>
                          `${rel.durationDays} days`
                        </span>
                        <span className="text-cyan-300 font-bold">{formatPrice(rel.priceEur)}</span>
                      </div>
                    </div>
                  </button>
                </TiltSurface>
              ))}
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  );
}
