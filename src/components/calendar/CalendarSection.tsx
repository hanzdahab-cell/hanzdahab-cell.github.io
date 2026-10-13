import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Download,
  CalendarCheck,
  Grid,
  List,
  CheckCircle2,
  ExternalLink,
  Compass,
  Award,
} from 'lucide-react';
import { Calendar } from '@heroui/react';
import { CalendarDate, parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { useTranslation } from 'react-i18next';
import {
  MONTHS_2026,
  SCHEDULE_2026_EVENTS,
  EVENT_TYPES_DATA,
  EventDateSchedule,
  createGoogleCalendarUrl,
  exportToIcs,
} from '../../data/calendarSchedule2026';
import { PageType, EventTypeId } from '../../types';

interface CalendarSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate?: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

type CategoryFilter =
  | 'All'
  | 'Beginner'
  | 'Advanced'
  | 'Training'
  | 'Ras Mohamed trip'
  | 'Zero to Hero'
  | 'Instructor Course';

export function CalendarSection({ onOpenBooking, onNavigate, currency }: CalendarSectionProps) {
  // Default to September 2026 (the current simulated active month)
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(8); // 8 = September (0-indexed)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('calendar');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(null);
  const [calendarFocusedDate, setCalendarFocusedDate] = useState<CalendarDate>(() =>
    parseDate('2026-09-01')
  );
  const { i18n } = useTranslation();

  const currentMonth = MONTHS_2026[selectedMonthIndex];

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handlePrevMonth = () => {
    const previousDate = calendarFocusedDate.subtract({ months: 1 }).set({ day: 1 });
    setSelectedMonthIndex(previousDate.month - 1);
    setCalendarFocusedDate(previousDate);
    setSelectedCalendarDay(null);
  };

  const handleNextMonth = () => {
    const nextDate = calendarFocusedDate.add({ months: 1 }).set({ day: 1 });
    setSelectedMonthIndex(nextDate.month - 1);
    setCalendarFocusedDate(nextDate);
    setSelectedCalendarDay(null);
  };

  // Filter events for current month and active category
  const currentMonthEvents = useMemo(() => {
    return SCHEDULE_2026_EVENTS.filter((ev) => {
      const matchMonth = ev.year === calendarFocusedDate.year && ev.monthNum === currentMonth.num;
      const matchCategory = selectedCategory === 'All' || ev.category === selectedCategory;
      return matchMonth && matchCategory;
    });
  }, [calendarFocusedDate.year, currentMonth.num, selectedCategory]);

  // Count events in the selected year so filters stay accurate when browsing years.
  const categoryCounts = useMemo(() => {
    const eventsInYear = SCHEDULE_2026_EVENTS.filter((event) => event.year === calendarFocusedDate.year);
    const counts: Record<string, number> = { All: eventsInYear.length };
    eventsInYear.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [calendarFocusedDate.year]);

  const eventsForDate = (date: CalendarDate) => {
    const dateIso = date.toString();
    return SCHEDULE_2026_EVENTS.filter((event) => {
      const matchesDate = dateIso >= event.startIso && dateIso <= event.endIso;
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesDate && matchesCategory;
    });
  };

  const handleCalendarFocusChange = (date: CalendarDate) => {
    if (date.month !== calendarFocusedDate.month || date.year !== calendarFocusedDate.year) {
      setSelectedCalendarDay(null);
    }
    setCalendarFocusedDate(date);
    setSelectedMonthIndex(date.month - 1);
  };

  const selectMonth = (monthIndex: number) => {
    const date = calendarFocusedDate.set({ month: monthIndex + 1, day: 1 });
    setSelectedMonthIndex(monthIndex);
    setCalendarFocusedDate(date);
    setSelectedCalendarDay(null);
  };

  // Category badge colors
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Training':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Ras Mohamed trip':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'Zero to Hero':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'Instructor Course':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    }
  };

  const getCategoryDotColor = (category: string) => {
    switch (category) {
      case 'Beginner':
        return 'bg-emerald-400';
      case 'Advanced':
        return 'bg-blue-400';
      case 'Training':
        return 'bg-amber-400';
      case 'Ras Mohamed trip':
        return 'bg-teal-400';
      case 'Zero to Hero':
        return 'bg-purple-400';
      case 'Instructor Course':
        return 'bg-rose-400';
      default:
        return 'bg-cyan-300';
    }
  };

  const categories: CategoryFilter[] = [
    'All',
    'Beginner',
    'Advanced',
    'Training',
    'Ras Mohamed trip',
    'Zero to Hero',
    'Instructor Course',
  ];

  // Dedicated Event Pages quick list
  const eventTypesList = Object.values(EVENT_TYPES_DATA);

  return (
    <section className="relative bg-[#0E3453] text-slate-100 py-12 sm:py-16 px-4 sm:px-8">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-cyan-600/[0.04] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">

        {/* ======================================================== */}
        {/* TOP NOTICE BANNER (AS REQUIRED BY USER)                  */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-[#0E3453] to-cyan-950/70 border border-cyan-400/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                YEAR-ROUND FLEXIBILITY NOTE
              </span>
              <p className="text-sm sm:text-base font-serif italic text-white leading-snug">
                &ldquo;This is only the calendar for our scheduled events. We run all other courses all year round on request, just let us know your dates!&rdquo;
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-light text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-cyan-500/25 cursor-pointer text-center"
          >
            Custom Date Inquiry
          </button>
        </div>

        {/* ======================================================== */}
        {/* DEDICATED EVENT TYPE SHORTCUTS BAR                       */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dedicated Event Hubs (Click for detailed syllabus &amp; 2026 dates)</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {eventTypesList.map((et) => (
              <button
                key={et.id}
                onClick={() => onNavigate && onNavigate(`event-${et.id}` as PageType)}
                className="p-3 rounded-xl bg-[#0E3453] hover:bg-[#0E3453] border border-white/10 hover:border-cyan-400/40 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                    {et.category}
                  </span>
                  <div className="font-serif font-bold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors mt-0.5 line-clamp-1">
                    {et.title}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-2 border-t border-white/5">
                  <span>{formatPrice(et.basePriceEur)}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-cyan-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2026 MONTH NAVIGATION & CYCLING STRIP                    */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0E3453] border border-white/10 space-y-6">
          
          {/* Header with Month Selector & View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              {viewMode === 'cards' && (
                <button
                  onClick={handlePrevMonth}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                  title="Previous month"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <div className="flex items-baseline gap-2.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {currentMonth.name}
                </h3>
                <span className="font-mono text-cyan-400 text-base sm:text-lg font-bold">
                  {calendarFocusedDate.year}
                </span>
                {currentMonth.name === 'September' && calendarFocusedDate.year === 2026 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-[10px] uppercase font-bold tracking-wider">
                    Current Season
                  </span>
                )}
              </div>

              {viewMode === 'cards' && (
                <button
                  onClick={handleNextMonth}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
                  title="Next month"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Cards vs Calendar Grid */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-ocean text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List View</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'calendar'
                      ? 'bg-ocean text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Calendar Grid</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quick month shortcuts for the list view */}
          {viewMode === 'cards' && <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 pt-2 border-t border-white/5">
            {MONTHS_2026.map((m, idx) => {
              const isSelected = idx === selectedMonthIndex;
              const hasEvents =
                calendarFocusedDate.year === 2026 &&
                SCHEDULE_2026_EVENTS.some((e) => e.monthNum === m.num);
              const isCurrentSim = m.name === 'September' && calendarFocusedDate.year === 2026;

              return (
                <button
                  key={m.num}
                  onClick={() => selectMonth(idx)}
                  className={`py-2 px-1 rounded-xl text-center font-mono text-xs transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-ocean text-white font-bold shadow-md shadow-cyan-500/25'
                      : isCurrentSim
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span className="block">{m.short}</span>
                  {hasEvents && (
                    <span
                      className={`w-1 h-1 rounded-full mx-auto mt-1 ${
                        isSelected ? 'bg-black' : 'bg-cyan-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>}

          {/* ======================================================== */}
          {/* EVENT CATEGORY FILTER PILLS                              */}
          {/* ======================================================== */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Filter:</span>
            </span>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-ocean text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-black/30 text-black' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ======================================================== */}
        {/* VIEW 1: DETAILED EVENT CARDS VIEW                        */}
        {/* ======================================================== */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>
                Showing {currentMonthEvents.length} scheduled events for {currentMonth.name} {calendarFocusedDate.year}
                {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
              </span>
              <span>All departures include SSI gear, buoy lines &amp; certification</span>
            </div>

            {currentMonthEvents.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0E3453] border border-white/10 text-center space-y-4">
                <CalendarIcon className="w-12 h-12 text-slate-500 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-white">
                  No scheduled {selectedCategory} events in {currentMonth.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
                  We run private and tailored courses every single day on request! Contact our team to book your preferred dates.
                </p>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-2.5 rounded-xl bg-ocean hover:bg-ocean-light text-white font-mono text-xs font-bold uppercase tracking-wider"
                >
                  Request Custom Dates in {currentMonth.name}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentMonthEvents.map((item) => {
                  const eventDetail = EVENT_TYPES_DATA[item.eventTypeId];
                  const isCurrent = item.status === 'current';
                  const isPast = item.status === 'past';
                  const googleCalUrl = createGoogleCalendarUrl(item);

                  return (
                    <div
                      key={item.id}
                      className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                        isCurrent
                          ? 'bg-[#0E3453] border-cyan-400/60 shadow-[0_0_30px_rgba(56,189,248,0.2)] ring-1 ring-cyan-400/30'
                          : isPast
                          ? 'bg-[#0E3453] border-white/5 opacity-70'
                          : 'bg-[#0E3453] border-white/10 hover:border-cyan-400/40 hover:bg-[#0E3453]'
                      }`}
                    >
                      {/* Top Row: Date Pill & Status */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${getCategoryColor(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-ocean-light text-white font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                              Active Now
                            </span>
                          )}

                          {!isPast && !isCurrent && (
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">
                              {item.spotsAvailable} spots open
                            </span>
                          )}

                          {isPast && (
                            <span className="text-[10px] font-mono text-slate-500 uppercase">
                              Past Event
                            </span>
                          )}
                        </div>

                        {/* Title & Date */}
                        <div>
                          <div className="text-xl font-serif font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.eventTitle}
                          </div>
                          <div className="font-mono text-sm text-cyan-300 font-semibold mt-1">
                            {item.dateLabel}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-sans font-light line-clamp-2 leading-relaxed">
                          {eventDetail?.description || 'SSI certified training immersion in Dahab.'}
                        </p>

                        {/* Specs */}
                        <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 border-t border-white/5">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.durationDays} Days</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom: Price, Link to Detail Page & Export Tools */}
                      <div className="pt-5 mt-4 border-t border-white/10 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400">All-Inclusive</span>
                            <div className="font-serif text-xl font-bold text-white">
                              {formatPrice(item.priceEur)}
                            </div>
                          </div>

                          {/* Link to Dedicated Page */}
                          <button
                            onClick={() => onNavigate && onNavigate(`event-${item.eventTypeId}` as PageType)}
                            className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer group/link"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="w-3 h-3 group-link-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          {/* Google Calendar export */}
                          <a
                            href={googleCalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1"
                            title="Add to Google Calendar"
                          >
                            <CalendarCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="hidden sm:inline">Google</span>
                          </a>

                          {/* iCal export */}
                          <button
                            onClick={() => exportToIcs(item)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                            title="Download iCal file"
                          >
                            <Download className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="hidden sm:inline">iCal</span>
                          </button>

                          {/* Instant Booking */}
                          <button
                            onClick={() => onOpenBooking(`${item.eventTypeId}-${item.id}`)}
                            disabled={isPast}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all text-center ${
                              isPast
                                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                                : 'bg-ocean hover:bg-ocean-light text-white shadow-md shadow-cyan-500/20 cursor-pointer'
                            }`}
                          >
                            {isPast ? 'Completed' : 'Book Seat'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: HEROUI ACCESSIBLE CALENDAR AND SELECTED-DAY AGENDA */}
        {/* ======================================================== */}
        {viewMode === 'calendar' && (
          <div className="grid grid-cols-1 items-start gap-5 rounded-3xl border border-white/10 bg-[#0B2C4A] p-4 shadow-2xl sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  Scheduled departures
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Select a highlighted day to see departures. Use the month arrows or year selector to browse.
                </p>
              </div>
              <I18nProvider locale={i18n.resolvedLanguage || i18n.language || 'en'}>
                <Calendar
                  aria-label="Scheduled freediving events"
                  className="dahab-calendar dark w-full max-w-none rounded-2xl border border-white/10 bg-[#0E3453] p-4 text-slate-100 sm:p-6"
                  focusedValue={calendarFocusedDate}
                  value={
                    selectedCalendarDay === null
                      ? null
                      : calendarFocusedDate.set({ day: selectedCalendarDay })
                  }
                  onChange={(date) => {
                    if (date) handleCalendarFocusChange(date);
                    setSelectedCalendarDay(date?.day ?? null);
                  }}
                  onFocusChange={handleCalendarFocusChange}
                >
                  <Calendar.Header className="flex items-center gap-2 pb-5">
                    <Calendar.YearPickerTrigger className="min-h-10 rounded-xl px-2 text-left transition-colors hover:bg-white/5">
                      <Calendar.YearPickerTriggerHeading className="font-display text-xl tracking-wide text-white sm:text-2xl" />
                      <Calendar.YearPickerTriggerIndicator className="text-cyan-300" />
                    </Calendar.YearPickerTrigger>
                    <Calendar.NavButton
                      slot="previous"
                      className="size-10 shrink-0 rounded-full border border-white/10 bg-white/5 text-cyan-100 transition-colors hover:bg-white/10"
                      aria-label="Previous month"
                    />
                    <Calendar.NavButton
                      slot="next"
                      className="size-10 shrink-0 rounded-full border border-white/10 bg-white/5 text-cyan-100 transition-colors hover:bg-white/10"
                      aria-label="Next month"
                    />
                  </Calendar.Header>
                  <Calendar.Grid className="w-full" weekdayStyle="short">
                    <Calendar.GridHeader>
                      {(day) => (
                        <Calendar.HeaderCell className="pb-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 sm:text-xs">
                          {day}
                        </Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => {
                        const dayEvents = eventsForDate(date);
                        return (
                          <Calendar.Cell
                            date={date}
                            className={`relative mx-auto min-h-10 w-full rounded-xl pb-3 text-xs text-slate-200 sm:min-h-12 sm:text-sm ${
                              dayEvents.length
                                ? 'bg-white/[0.035] text-white hover:bg-white/10'
                                : 'text-slate-500'
                            }`}
                          >
                            {({ formattedDate }) => (
                              <>
                                <span>{formattedDate}</span>
                                {dayEvents.length > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className="absolute bottom-1 flex items-center justify-center gap-0.5"
                                  >
                                    {dayEvents.slice(0, 3).map((event) => (
                                      <span
                                        key={event.id}
                                        className={`size-1 rounded-full ${getCategoryDotColor(event.category)}`}
                                      />
                                    ))}
                                    {dayEvents.length > 3 && (
                                      <span className="pl-0.5 text-[8px] leading-none text-cyan-200">
                                        +{dayEvents.length - 3}
                                      </span>
                                    )}
                                  </span>
                                )}
                              </>
                            )}
                          </Calendar.Cell>
                        );
                      }}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                  <Calendar.YearPickerGrid className="rounded-xl bg-[#0B2C4A] p-2">
                    <Calendar.YearPickerGridBody>
                      {({ year }) => (
                        <Calendar.YearPickerCell
                          year={year}
                          className="rounded-xl text-slate-200 hover:text-white"
                        />
                      )}
                    </Calendar.YearPickerGridBody>
                  </Calendar.YearPickerGrid>
                </Calendar>
              </I18nProvider>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-slate-400">
                {categories.slice(1).map((category) => (
                  <span key={category} className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${getCategoryDotColor(category)}`} />
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="min-h-[22rem] rounded-2xl border border-white/10 bg-[#0E3453]/70 p-4 sm:p-5">
              {selectedCalendarDay === null ? (
                <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
                  <CalendarIcon className="mb-4 h-10 w-10 text-cyan-300/70" />
                  <h5 className="font-serif text-lg font-bold text-white">
                    Choose a highlighted day
                  </h5>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                    {calendarFocusedDate.year === 2026
                      ? `${currentMonthEvents.length} scheduled departures in ${currentMonth.name}. Select a date to see what is running.`
                      : `The published schedule currently covers 2026. Contact us to plan dates in ${calendarFocusedDate.year}.`}
                  </p>
                  {calendarFocusedDate.year !== 2026 && (
                    <button
                      onClick={() => onOpenBooking()}
                      className="mt-5 rounded-xl bg-ocean px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors hover:bg-ocean-light"
                    >
                      Ask about custom dates
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                        Selected date
                      </p>
                      <h5 className="mt-1 font-serif text-lg font-bold text-white">
                        {currentMonth.name} {selectedCalendarDay}, {calendarFocusedDate.year}
                      </h5>
                    </div>
                    <button
                      onClick={() => setSelectedCalendarDay(null)}
                      className="rounded-lg px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  {(() => {
                    const selectedDate = calendarFocusedDate.set({ day: selectedCalendarDay });
                    const activeOnDay = eventsForDate(selectedDate);

                    if (activeOnDay.length === 0) {
                      return (
                        <div className="py-8 text-center">
                          <p className="text-sm font-medium text-white">No scheduled events on this day</p>
                          <p className="mt-2 text-xs leading-relaxed text-slate-400">
                            Scheduled groups are only part of the story. Ask us about a private course or a date that suits you.
                          </p>
                          <button
                            onClick={() => onOpenBooking()}
                            className="mt-4 rounded-xl bg-ocean px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors hover:bg-ocean-light"
                          >
                            Request custom dates
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {activeOnDay.map((event) => (
                          <article
                            key={event.id}
                            className="rounded-xl border border-white/10 bg-black/20 p-4"
                          >
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${getCategoryColor(event.category)}`}
                            >
                              {event.category}
                            </span>
                            <h6 className="mt-2 font-serif text-base font-bold text-white">
                              {event.eventTitle}
                            </h6>
                            <p className="mt-1 text-xs text-cyan-200">
                              {event.dateLabel} · {event.durationDays} {event.durationDays === 1 ? 'day' : 'days'}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                              <button
                                onClick={() => onNavigate?.(`event-${event.eventTypeId}` as PageType)}
                                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 transition-colors hover:text-white"
                              >
                                <span>Event details</span>
                                <ExternalLink className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => onOpenBooking(event.id)}
                                className="rounded-lg bg-ocean px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white transition-colors hover:bg-ocean-light"
                              >
                                Book
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
