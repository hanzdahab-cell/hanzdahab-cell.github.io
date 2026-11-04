import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EventTypeId, PageType } from '../../types';
import { SCHEDULE_2026_EVENTS, SCHEDULE_2027_EVENTS } from '../../data/calendarSchedule2026';
import './CalendarSection.css';

interface CalendarSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate?: (page: PageType) => void;
}

type CalendarEventType = EventTypeId | 'beginner-advanced-combo';
type CalendarCategory = 'Packages' | 'Training' | 'Trips' | 'Courses';
type CalendarTone = 'beginner' | 'combo' | 'advanced' | 'training' | 'ras-mohamed' | 'zero-to-hero' | 'courses';

interface CalendarEvent {
  id: string;
  eventTypeId: CalendarEventType;
  title: string;
  startIso: string;
  endIso: string;
  category: CalendarCategory;
  tone: CalendarTone;
}

const categoryForEvent = (eventTypeId: CalendarEventType): CalendarCategory => {
  if (eventTypeId === 'training-week') return 'Training';
  if (eventTypeId === 'ras-mohamed') return 'Trips';
  if (eventTypeId === 'instructor-course') return 'Courses';
  return 'Packages';
};

const toneForEvent = (eventTypeId: CalendarEventType): CalendarTone => {
  if (eventTypeId === 'beginner-advanced-combo') return 'combo';
  if (eventTypeId === 'beginner-week') return 'beginner';
  if (eventTypeId === 'advanced-week') return 'advanced';
  if (eventTypeId === 'training-week') return 'training';
  if (eventTypeId === 'ras-mohamed') return 'ras-mohamed';
  if (eventTypeId === 'zero-to-hero') return 'zero-to-hero';
  return 'courses';
};

const dateIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const scheduleEvents = [...SCHEDULE_2026_EVENTS, ...SCHEDULE_2027_EVENTS];

const scheduledEvents: CalendarEvent[] = scheduleEvents
  .map((event) => ({
    id: event.id,
    eventTypeId: event.eventTypeId,
    title: event.eventTitle,
    startIso: event.startIso,
    endIso: event.endIso,
    category: categoryForEvent(event.eventTypeId),
    tone: toneForEvent(event.eventTypeId),
  }));

const comboEvents: CalendarEvent[] = scheduleEvents
  .filter((event) => event.eventTypeId === 'beginner-week')
  .flatMap((beginner) => {
    const advancedStart = new Date(`${beginner.startIso}T12:00:00`);
    advancedStart.setDate(advancedStart.getDate() + 2);
    const advancedStartIso = dateIso(advancedStart);
    const advanced = scheduleEvents.find(
      (event) => event.eventTypeId === 'advanced-week' && event.startIso === advancedStartIso,
    );

    return advanced
      ? [{
          id: `combo-${beginner.id}`,
          eventTypeId: 'beginner-advanced-combo' as const,
          title: 'Beginner + Advanced Combo',
          startIso: beginner.startIso,
          endIso: advanced.endIso,
          category: 'Packages' as const,
          tone: 'combo' as const,
        }]
      : [];
  });

const CALENDAR_EVENTS = [...scheduledEvents, ...comboEvents]
  .filter((event) => event.startIso >= '2026-11-01' && event.startIso <= '2027-04-30')
  .sort((a, b) => a.startIso.localeCompare(b.startIso) || a.title.localeCompare(b.title));

const CALENDAR_MONTHS_BY_YEAR: Record<number, readonly string[]> = {
  2026: ['November', 'December'],
  2027: ['January', 'February', 'March', 'April'],
};
const CALENDAR_YEARS = Object.keys(CALENDAR_MONTHS_BY_YEAR).map(Number);

const formatMonth = (iso: string, style: 'short' | 'long' = 'short') =>
  new Date(`${iso}T12:00:00`).toLocaleString('en-US', { month: style });

const formatDay = (iso: string) => String(Number(iso.slice(8, 10)));

const formatEventRange = (event: CalendarEvent) => {
  const start = `${formatMonth(event.startIso)} ${formatDay(event.startIso)}`;
  if (event.startIso === event.endIso) return start;

  const end = `${formatMonth(event.endIso)} ${formatDay(event.endIso)}`;
  return `${start} – ${end}`;
};

const routeForEvent = (eventTypeId: CalendarEventType): PageType => {
  if (eventTypeId === 'beginner-advanced-combo') return 'package-ultimate-dahab-combo-week';
  if (eventTypeId === 'ras-mohamed') return 'activity-ras-mohamed';
  return `event-${eventTypeId}`;
};

const bookingIdForEvent = (eventTypeId: CalendarEventType) => {
  if (eventTypeId === 'beginner-advanced-combo') return 'pkg-combo-week';
  if (eventTypeId === 'beginner-week' || eventTypeId === 'advanced-week') return 'pkg-combo-week';
  if (eventTypeId === 'training-week') return 'pkg-training-week';
  if (eventTypeId === 'zero-to-hero') return 'pkg-instructor-path';
  return undefined;
};

const initialYear = () => {
  const currentYear = new Date().getFullYear();
  return CALENDAR_YEARS.includes(currentYear)
    ? currentYear
    : CALENDAR_YEARS[CALENDAR_YEARS.length - 1] ?? currentYear;
};

export function CalendarSection({ onOpenBooking, onNavigate }: CalendarSectionProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const yearIndex = CALENDAR_YEARS.indexOf(selectedYear);
  const eventsForYear = CALENDAR_EVENTS.filter((event) => event.startIso.startsWith(String(selectedYear)));
  const eventsByMonth = eventsForYear.reduce<Record<string, CalendarEvent[]>>((months, event) => {
    const month = formatMonth(event.startIso, 'long');
    (months[month] ??= []).push(event);
    return months;
  }, {});

  return (
    <section className="calendar-list" aria-labelledby="calendar-events-heading">
      <div className="calendar-list__header">
        <h2 id="calendar-events-heading">Scheduled events</h2>
        <nav className="calendar-list__year-nav" aria-label="Calendar year">
          <button
            type="button"
            className="calendar-list__year-button"
            onClick={() => setSelectedYear(CALENDAR_YEARS[yearIndex - 1])}
            disabled={yearIndex <= 0}
            aria-label="Show previous year"
          >
            <ArrowLeft aria-hidden="true" />
            <span>Previous</span>
          </button>
          <span className="calendar-list__year" aria-live="polite">{selectedYear}</span>
          <button
            type="button"
            className="calendar-list__year-button"
            onClick={() => setSelectedYear(CALENDAR_YEARS[yearIndex + 1])}
            disabled={yearIndex < 0 || yearIndex >= CALENDAR_YEARS.length - 1}
            aria-label="Show next year"
          >
            <span>Next</span>
            <ArrowRight aria-hidden="true" />
          </button>
        </nav>
      </div>

      {CALENDAR_MONTHS_BY_YEAR[selectedYear].map((month) => {
        const events = eventsByMonth[month] ?? [];
        return (
          <section
            className="calendar-list__month"
            key={`${selectedYear}-${month}`}
            aria-labelledby={`calendar-month-${selectedYear}-${month.toLowerCase()}`}
          >
            <h3 className="calendar-list__month-heading" id={`calendar-month-${selectedYear}-${month.toLowerCase()}`}>
              {month} {selectedYear}
            </h3>
            {events.length > 0 ? (
              <div className="calendar-list__grid">
                {events.map((event) => {
                  const route = routeForEvent(event.eventTypeId);
                  return (
                    <article
                      className={`calendar-event calendar-event--${event.tone}`}
                      key={event.id}
                    >
                      <a
                        className="calendar-event__details"
                        href={`#${route}`}
                        aria-label={`${event.title}, ${formatEventRange(event)}. View event details`}
                        onClick={onNavigate ? (clickEvent) => {
                          clickEvent.preventDefault();
                          onNavigate(route);
                        } : undefined}
                      >
                        <span className="calendar-event__date" aria-hidden="true">
                          <span className="calendar-event__date-start">
                            <span className="calendar-event__date-month">{formatMonth(event.startIso)}</span>
                            <span className="calendar-event__date-day">{formatDay(event.startIso)}</span>
                          </span>
                          {event.startIso !== event.endIso && (
                            <>
                              <span className="calendar-event__date-separator" aria-hidden="true">–</span>
                              <span className="calendar-event__date-end">
                                <span>{formatMonth(event.endIso)}</span>
                                <span>{formatDay(event.endIso)}</span>
                              </span>
                            </>
                          )}
                        </span>
                        <span className="calendar-event__content">
                          <span className="calendar-event__category">{event.category}</span>
                          <span className="calendar-event__title">{event.title}</span>
                        </span>
                      </a>
                      <button
                        type="button"
                        className="calendar-event__book"
                        onClick={() => onOpenBooking(bookingIdForEvent(event.eventTypeId))}
                        aria-label={`Book ${event.title}`}
                      >
                        Book Now
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="calendar-list__empty">No scheduled events have been announced for this month yet.</p>
            )}
          </section>
        );
      })}
    </section>
  );
}
