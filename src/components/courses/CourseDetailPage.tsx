import { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Award,
  Waves,
  CheckCircle,
  Shield,
  ChevronRight,
  Sparkles,
  Users,
  Share2,
  Check,
} from 'lucide-react';
import { PageType, Course, SpecialtyCourse, InstructorCourse } from '../../types';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { CourseInfographic } from './CourseInfographic';
import { FadeUp } from '../ui/MotionKit';
import { coursePhotoById, getCourseGalleryImages, ssiCourseArtworkBySlug } from '../../data/courseMedia';
import { CoursePhotoCarousel, CourseStorySlide } from './CoursePhotoCarousel';

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
            className="px-8 py-3.5 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
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

  const collection: (Course | SpecialtyCourse | InstructorCourse)[] =
    isCore ? ssiCourses : isSpecialty ? specialtyCourses : instructorCourses;

  const related = collection.filter((c) => c.slug !== course.slug).slice(0, 3);

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

  const includedList: string[] | null = 'included' in course ? (course as Course).included : null;

  const levelBadge =
    'level' in course
      ? (course as Course).level
      : isInstructor
      ? 'Instructor / Pro'
      : 'Specialty';
  const galleryImages = getCourseGalleryImages(course.id, {
    src: course.image.url,
    alt: course.image.alt,
  });
  const gallerySlides: CourseStorySlide[] = galleryImages.map((image, index) => ({
    id: `${course.id}-photo-${index + 1}`,
    title: course.title,
    subtitle: levelBadge,
    detail: subtitleText ?? description.split('\n\n')[0],
    courseId: course.id,
    courseSlug: course.slug,
    duration: durationLabel,
    depth: depthLabel ?? undefined,
    ...image,
  }));
  const ssiArtwork = ssiCourseArtworkBySlug[course.slug];

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
    <div className="relative bg-[#0E3453] text-slate-100 min-h-screen">
      {/* ========================================================== */}
      {/* HERO                                                        */}
      {/* ========================================================== */}
      <header className="relative overflow-hidden bg-[#081F35] pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 architectural-grid-fine opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
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

            {ssiArtwork && (
              <img
                src={ssiArtwork.src}
                alt={ssiArtwork.alt}
                className="aspect-[5/3] w-full max-w-[240px] rounded-xl border border-white/15 bg-[#0E3453] object-contain p-1"
                loading="lazy"
              />
            )}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {durationLabel}
              </span>
              {depthLabel && (
                <span className="inline-flex items-center gap-2">
                  <Waves className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                  {depthLabel}
                </span>
              )}
              <span className="font-semibold text-white">{formatPrice(course.priceEur)}</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking(course.id)}
                className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#081F35] transition-colors hover:bg-[#DCEFFC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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

          <CoursePhotoCarousel
            slides={gallerySlides}
            onBook={onOpenBooking}
            onView={handleNavigateToCourse}
            onCalendar={() => onNavigate('calendar')}
            variant="gallery"
          />
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
              { id: 'course-skills', label: isInstructor ? 'Course modules' : 'What you will learn' },
              ...(isCore && (course as Course).schedule ? [{ id: 'course-schedule', label: 'Day by day' }] : []),
              ...(includedList ? [{ id: 'course-included', label: "What's included" }] : []),
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
            <FadeUp id="course-about" className="scroll-mt-32 space-y-5">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                About the course
              </h2>
              {description.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </FadeUp>

            {/* Skills / highlights / modules */}
            <FadeUp id="course-skills" className="scroll-mt-32 space-y-5">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                {skillsTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsList.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Day-by-day schedule (core courses with a full plan in the data) */}
            {isCore && (course as Course).schedule && (
              <FadeUp id="course-schedule" className="scroll-mt-32 space-y-5">
                <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Day by day
                </h2>
                <div className="space-y-3">
                  {(course as Course).schedule!.map((day, i) => (
                    <div
                      key={i}
                      className="p-5 sm:p-6 rounded-xl bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
                          {day.day}
                        </span>
                        <span className="text-sm font-semibold text-white">{day.title}</span>
                      </div>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}

            {/* Motion infographic — adapted from the hand-drawn diving template */}
            {isCore && (course as Course).disciplines && (course as Course).futurePerformances && (
              <FadeUp>
                <CourseInfographic course={course as Course} />
              </FadeUp>
            )}

            {/* Included (core) or schedule */}
            {includedList && (
              <FadeUp id="course-included" className="scroll-mt-32 space-y-5">
                <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-[0.05em] flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400" />
                  What's included
                </h2>
                <div className="space-y-2.5">
                  {includedList.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="font-light">{inc}</span>
                    </div>
                  ))}
                </div>
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
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-[10px] tracking-tight shadow-lg shadow-cyan-500/30">
                    SSI
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(course.id)}
                  className="w-full py-4 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isInstructor ? 'Apply Now' : 'Reserve Your Spot'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="space-y-3 pt-2 border-t border-white/10">
                  {[
                    { icon: Shield, text: 'Official SSI certification & digital materials' },
                    { icon: Users, text: 'Small groups — max 3:1 student-to-instructor' },
                    { icon: Waves, text: 'Lighthouse Bay & Blue Hole training locations' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] text-slate-300">
                      <row.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-light">{row.text}</span>
                    </div>
                  ))}
                </div>
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
                Continue your <span className="text-cyan-300">journey</span>
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
                <button
                  key={rel.id}
                  onClick={() => handleNavigateToCourse(rel.slug)}
                  className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 bg-slate-900/40 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={rel.image.url}
                      alt={rel.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>
                        {'durationDays' in rel
                          ? `${rel.durationDays} days`
                          : rel.durationWeeksOrDays}
                      </span>
                      <span className="text-cyan-300 font-bold">{formatPrice(rel.priceEur)}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  );
}
