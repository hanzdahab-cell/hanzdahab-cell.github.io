import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EventTypeId, PageType } from '../../types';
import { SCHEDULE_2026_EVENTS } from '../../data/calendarSchedule2026';

interface CalendarSectionProps {
  onOpenBooking: (courseId?: string) => void;
  onNavigate?: (page: PageType) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

/** The original Elfsight calendar widget. Calendar content is managed in Elfsight. */
export function CalendarSection({ onOpenBooking, onNavigate }: CalendarSectionProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [calendarPortalHost, setCalendarPortalHost] = useState<HTMLElement | null>(null);
  const [selectedCalendarYear, setSelectedCalendarYear] = useState(() => Math.min(2028, Math.max(2026, new Date().getFullYear())));
  const active2026Events = SCHEDULE_2026_EVENTS.filter((event) =>
    event.eventTypeId !== 'instructor-course' &&
    event.startIso >= '2026-10-26' &&
    event.startIso < '2027-01-01',
  );
  const combo2026Events = SCHEDULE_2026_EVENTS
    .filter((event) => event.eventTypeId === 'beginner-week')
    .flatMap((beginner) => {
      const advancedStart = new Date(`${beginner.startIso}T12:00:00`);
      advancedStart.setDate(advancedStart.getDate() + 2);
      const advancedStartIso = `${advancedStart.getFullYear()}-${String(advancedStart.getMonth() + 1).padStart(2, '0')}-${String(advancedStart.getDate()).padStart(2, '0')}`;
      const advanced = SCHEDULE_2026_EVENTS.find((event) =>
        event.eventTypeId === 'advanced-week' && event.startIso === advancedStartIso,
      );
      if (!advanced || beginner.startIso < '2026-10-26' || beginner.startIso >= '2027-01-01') return [];
      const formatDate = (iso: string) => {
        const month = new Date(`${iso}T12:00:00`).toLocaleString('en-US', { month: 'short' });
        const year = iso.slice(0, 4) === '2026' ? '' : ` ${iso.slice(0, 4)}`;
        return `${Number(iso.slice(8, 10))} ${month}${year}`;
      };
      return [{
        ...beginner,
        id: `combo-${beginner.id}`,
        eventTypeId: 'beginner-advanced-combo' as const,
        eventTitle: 'Beginner + Advanced Combo',
        category: 'Beginner + Advanced Combo' as const,
        dateLabel: `${formatDate(beginner.startIso)} - ${formatDate(advanced.endIso)}`,
        endIso: advanced.endIso,
      }];
    });
  const remaining2026Events = [...active2026Events, ...combo2026Events]
    .sort((a, b) => a.startIso.localeCompare(b.startIso));
  const eventsByMonth = remaining2026Events.reduce<Record<string, typeof remaining2026Events>>((groups, event) => {
    (groups[event.monthName] ||= []).push(event);
    return groups;
  }, {});

  const routeForScheduleEvent = (eventTypeId: EventTypeId | 'beginner-advanced-combo'): PageType => {
    if (eventTypeId === 'beginner-advanced-combo') return 'package-ultimate-dahab-combo-week';
    return eventTypeId === 'ras-mohamed' ? 'activity-ras-mohamed' : `event-${eventTypeId}`;
  };

  const colorForScheduleEvent = (eventTypeId: EventTypeId | 'beginner-advanced-combo') => {
    if (eventTypeId === 'zero-to-hero') return '#068B88';
    if (eventTypeId === 'beginner-week') return '#2980B9';
    if (eventTypeId === 'beginner-advanced-combo') return '#3498DB';
    if (eventTypeId === 'advanced-week') return '#5DADE2';
    if (eventTypeId === 'training-week') return '#89CFF0';
    if (eventTypeId === 'ras-mohamed') return '#A2D5F2';
    return '#3498DB';
  };

  useEffect(() => {
    const scriptId = 'elfsight-calendar-platform-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const styleId = 'freedive-calendar-site-overrides';
    const widgetCss = `
      .eapp-events-calendar-events-calendar-title { display: none !important; }
      .eapp-events-calendar-events-calendar-component > a[href*="elfsight.com/event-calendar-widget"] { display: none !important; }
      .eapp-events-calendar-list-item *:not(button):not(button *):not(a):not(a *) {
        color: #fff !important;
        opacity: 1 !important;
      }
      .fd-elfsight-month-heading {
        margin: 24px 0 12px;
        color: #fff;
        font: 700 16px/1.25 system-ui, sans-serif;
      }
      .fd-elfsight-month-heading:first-child { margin-top: 0; }
      .List__Item-sc-e9913e45-1 + .List__Item-sc-e9913e45-1 > .List__Name-sc-e9913e45-2 {
        margin-top: 24px !important;
      }
      [class*="ListItem__Component"] .freedive-calendar-book-now {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        margin-inline-start: auto;
        padding: 0 20px;
        border: 0;
        border-radius: 999px;
        background: #f8fafc;
        color: #111827;
        font: 700 14px/1.2 system-ui, sans-serif;
        white-space: nowrap;
        cursor: pointer;
        transition: background-color 160ms ease;
      }
      [class*="ListItem__Component"] .freedive-calendar-book-now:hover {
        background: #e2e8f0;
      }
      [class*="ListItem__Component"] .freedive-calendar-book-now:focus-visible {
        outline: 2px solid #fff;
        outline-offset: 3px;
      }
      @media (max-width: 520px) {
        [class*="ListItem__Component"] .freedive-calendar-book-now {
          min-height: 38px;
          padding-inline: 14px;
          font-size: 12px;
        }
      }
    `;
    const applyTextColor = () => {
      const shadowRoot = widget.querySelector('.es-embed-root')?.shadowRoot;
      if (!shadowRoot) return;

      shadowRoot.querySelectorAll<HTMLElement>('a[href*="elfsight.com/event-calendar-widget"]').forEach((credit) => {
        credit.style.setProperty('display', 'none', 'important');
      });

      let style = shadowRoot.getElementById(styleId) as HTMLStyleElement | null;
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        shadowRoot.appendChild(style);
      }
      if (style.textContent !== widgetCss) style.textContent = widgetCss;
    };

    const eventTitleForCard = (card: HTMLElement) =>
      card.querySelector<HTMLElement>('.eapp-events-calendar-list-item-name')?.innerText.trim() || card.innerText;

    const routeForEvent = (card: HTMLElement) => {
      const title = eventTitleForCard(card).toLowerCase().replace(/\s+/g, ' ');
      if (title.includes('zero to hero')) return 'event-zero-to-hero' as PageType;
      if (title.includes('beginner week')) return 'event-beginner-week' as PageType;
      if (title.includes('beginner + advanced') || title.includes('beginner+advanced')) return 'package-ultimate-dahab-combo-week' as PageType;
      if (title.includes('advanced week')) return 'event-advanced-week' as PageType;
      if (title.includes('training week')) return 'event-training-week' as PageType;
      if (title.includes('ras mohamed')) return 'activity-ras-mohamed' as PageType;
      return undefined;
    };

    const bookingIdForEvent = (card: HTMLElement) => {
      const title = eventTitleForCard(card).toLowerCase();
      if (title.includes('beginner') || title.includes('advanced')) return 'pkg-combo-week';
      if (title.includes('training week')) return 'pkg-training-week';
      if (title.includes('ras mohamed')) return undefined;
      return undefined;
    };

    const colorForEvent = (card: HTMLElement) => {
      const title = eventTitleForCard(card).toLowerCase().replace(/\s+/g, ' ');
      if (title.includes('zero to hero')) return '#068B88';
      if (title.includes('beginner week')) return '#2980B9';
      if (title.includes('beginner + advanced') || title.includes('beginner+advanced')) return '#3498DB';
      if (title.includes('advanced week')) return '#5DADE2';
      if (title.includes('training week')) return '#89CFF0';
      if (title.includes('ras mohamed')) return '#A2D5F2';
      return undefined;
    };

    const findCard = (path: EventTarget[], target: EventTarget | null, root: ShadowRoot) => {
      const fromPath = path.find(
        (node) => node instanceof HTMLElement && node.matches('[class*="ListItem__Component"]'),
      );
      if (fromPath instanceof HTMLElement && root.contains(fromPath)) return fromPath;
      if (!(target instanceof Element)) return null;
      const card = target.closest('[class*="ListItem__Component"]');
      return card instanceof HTMLElement && root.contains(card) ? card : null;
    };

    const root = () => widget.querySelector('.es-embed-root')?.shadowRoot;
    const ensureCalendarPortalHost = (shadowRoot: ShadowRoot) => {
      const list = shadowRoot.querySelector<HTMLElement>('.List__Component-sc-e9913e45-0');
      if (!list?.parentElement) return;
      let host = shadowRoot.querySelector<HTMLElement>('#freedive-calendar-2026-portal');
      if (!host) {
        host = document.createElement('div');
        host.id = 'freedive-calendar-2026-portal';
        list.parentElement.insertBefore(host, list);
      }
      setCalendarPortalHost((current) => current === host ? current : host);
    };
    const updateCalendarYearGroups = (shadowRoot: ShadowRoot) => {
      const list = shadowRoot.querySelector<HTMLElement>('.List__Component-sc-e9913e45-0');
      if (!list) return;

      [...list.children].forEach((group) => {
        if (!(group instanceof HTMLElement)) return;
        const year = group.querySelector<HTMLElement>('.List__Name-sc-e9913e45-2')?.innerText.trim();
        if (!year || !/^20\d{2}$/.test(year)) return;
        group.hidden = Number(year) !== selectedCalendarYear;

        const events = group.querySelector<HTMLElement>('.List__EventsContainer-sc-e9913e45-3');
        if (!events) return;
        let previousMonth = '';
        const cards = [...events.querySelectorAll<HTMLElement>(':scope > [class*="ListItem__Component"]')];
        cards.forEach((card) => {
          const monthToken = card.querySelector<HTMLElement>('.eapp-events-calendar-date-element-month')?.innerText.trim().toUpperCase();
          if (!monthToken) return;
          const date = new Date(`${monthToken} 1, ${year}`);
          if (Number.isNaN(date.getTime())) return;
          const monthName = date.toLocaleString('en-US', { month: 'long' });
          const heading = card.previousElementSibling instanceof HTMLElement && card.previousElementSibling.classList.contains('fd-elfsight-month-heading')
            ? card.previousElementSibling
            : null;

          if (monthToken !== previousMonth && !heading) {
            const monthHeading = document.createElement('h3');
            monthHeading.className = 'fd-elfsight-month-heading';
            monthHeading.textContent = `${monthName} ${year}`;
            monthHeading.setAttribute('aria-label', `${monthName} ${year}`);
            card.before(monthHeading);
          }
          previousMonth = monthToken;
        });
      });
    };
    const onCalendarClick = (event: Event) => {
      const currentRoot = root();
      const path = event.composedPath();
      const card = currentRoot && findCard(path, event.target, currentRoot);
      if (!currentRoot || !card) return;

      const action = path.find(
        (node) => node instanceof HTMLElement && /^(book\s*now)$/i.test(node.innerText.trim()) && /^(A|BUTTON)$/.test(node.tagName),
      );
      if (action) {
        event.preventDefault();
        event.stopImmediatePropagation();
        onOpenBooking(bookingIdForEvent(card));
        return;
      }

      const route = routeForEvent(card);
      if (!route || !onNavigate) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      onNavigate(route);
    };

    const onCalendarKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') return;
      const currentRoot = root();
      const card = currentRoot && findCard(keyboardEvent.composedPath(), keyboardEvent.target, currentRoot);
      if (!currentRoot || !card || (keyboardEvent.target as Element)?.closest('a, button')) return;
      const route = routeForEvent(card);
      if (!route || !onNavigate) return;
      keyboardEvent.preventDefault();
      onNavigate(route);
    };

    let observedRoot: ShadowRoot | undefined;
    const bindCalendar = () => {
      applyTextColor();
      const shadowRoot = root();
      if (!shadowRoot) return;
      ensureCalendarPortalHost(shadowRoot);
      updateCalendarYearGroups(shadowRoot);
      shadowRoot.removeEventListener('click', onCalendarClick, true);
      shadowRoot.addEventListener('click', onCalendarClick, true);
      shadowRoot.removeEventListener('keydown', onCalendarKeyDown, true);
      shadowRoot.addEventListener('keydown', onCalendarKeyDown, true);
      shadowRoot.querySelectorAll<HTMLElement>('[class*="ListItem__Component"]').forEach((card) => {
        const route = routeForEvent(card);
        const eventTitle = eventTitleForCard(card);
        const eventColor = colorForEvent(card);
        if (eventColor) card.style.setProperty('background-color', eventColor, 'important');
        card.tabIndex = 0;
        card.setAttribute('role', 'group');
        if (route) card.setAttribute('aria-label', `Open ${eventTitle}`);
        card.style.cursor = 'pointer';
        if (!card.querySelector('.freedive-calendar-book-now')) {
          const bookButton = document.createElement('button');
          bookButton.type = 'button';
          bookButton.className = 'freedive-calendar-book-now';
          bookButton.textContent = 'Book Now';
          bookButton.setAttribute('aria-label', `Book ${eventTitle}`);
          card.appendChild(bookButton);
        }
      });
    };

    const shadowObserver = new MutationObserver(bindCalendar);
    const bindWidgetRoot = () => {
      const shadowRoot = root();
      if (shadowRoot && observedRoot !== shadowRoot) {
        shadowObserver.observe(shadowRoot, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style'],
        });
        observedRoot = shadowRoot;
      }
      bindCalendar();
    };
    const widgetObserver = new MutationObserver(bindWidgetRoot);
    widgetObserver.observe(widget, { childList: true, subtree: true });
    bindWidgetRoot();

    return () => {
      widgetObserver.disconnect();
      shadowObserver.disconnect();
      const currentRoot = root();
      currentRoot?.removeEventListener('click', onCalendarClick, true);
      currentRoot?.removeEventListener('keydown', onCalendarKeyDown, true);
    };
  }, [onOpenBooking, onNavigate, selectedCalendarYear]);

  return (
    <>
      <div
        ref={widgetRef}
        className="elfsight-app-c51f9643-e0c3-490b-83a2-e8505eadc348"
        data-elfsight-app-lazy
      />
      {calendarPortalHost && createPortal(
        <>
          <style>{`
            .fd-calendar-year-nav { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; margin: 0 0 12px; color: #fff; }
            .fd-calendar-year-nav button:last-child { justify-self: end; }
            .fd-calendar-year-nav button { display: inline-flex; min-width: 42px; min-height: 40px; align-items: center; justify-content: center; border: 1px solid rgba(148, 190, 218, .45); border-radius: 9px; background: rgba(5, 31, 52, .42); color: #fff; font: 600 14px/1 system-ui, sans-serif; cursor: pointer; transition: background-color 160ms ease, border-color 160ms ease; }
            .fd-calendar-year-nav button:hover:not(:disabled) { border-color: rgba(148, 190, 218, .8); background: rgba(36, 104, 146, .35); }
            .fd-calendar-year-nav button:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
            .fd-calendar-year-nav button:disabled { cursor: not-allowed; opacity: .45; }
            .fd-calendar-year-label { grid-column: 1 / -1; grid-row: 2; color: #fff; font-size: 18px; font-weight: 700; }
            .fd-2026-calendar { width: 100%; color: #fff; font-family: inherit; }
            .fd-2026-month + .fd-2026-month { margin-top: 24px; }
            .fd-2026-month-heading { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; color: #fff; font-size: 16px; font-weight: 700; line-height: 1.25; }
            .fd-2026-events { display: grid; gap: 20px; }
            .fd-2026-card { display: flex; align-items: center; box-sizing: border-box; width: 100%; min-height: 86px; padding: 0 20px 0 28px; overflow: hidden; border: 0; border-radius: 24px; color: #fff; }
            .fd-2026-card-link { display: flex; flex: 1 1 auto; min-width: 0; align-items: center; gap: 16px; color: #fff; text-decoration: none; outline: none; }
            .fd-2026-card-link:focus-visible { border-radius: 8px; outline: 2px solid #fff; outline-offset: 4px; }
            .fd-2026-date { display: flex; flex: 0 0 auto; align-items: center; gap: 7px; color: #fff; text-transform: uppercase; }
            .fd-2026-date-start { display: flex; min-width: 34px; flex-direction: column; align-items: center; line-height: 1; }
            .fd-2026-date-month { font-size: 12px; font-weight: 500; }
            .fd-2026-date-day { font-size: 22px; font-weight: 700; }
            .fd-2026-date-end { align-self: center; font-size: 9px; font-weight: 600; line-height: 1.05; }
            .fd-2026-info { display: block; min-width: 0; }
            .fd-2026-category { display: block; margin-bottom: 3px; color: #fff; font-size: 12px; font-weight: 500; line-height: 1.1; text-transform: uppercase; }
            .fd-2026-title { display: block; overflow: hidden; color: #fff; font-size: 16px; font-weight: 700; line-height: 1.2; text-overflow: ellipsis; }
            .fd-2026-book { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; min-height: 40px; margin-inline-start: 16px; padding: 0 20px; border: 0; border-radius: 999px; background: #f8fafc; color: #111827; font: 700 14px/1.2 system-ui, sans-serif; white-space: nowrap; cursor: pointer; transition: background-color 160ms ease; }
            .fd-2026-book:hover { background: #e2e8f0; }
            .fd-2026-book:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
            @media (max-width: 600px) {
              .fd-calendar-year-nav { margin-bottom: 18px; }
              .fd-calendar-year-label { font-size: 16px; }
              .fd-2026-month + .fd-2026-month { margin-top: 20px; }
              .fd-2026-month-heading { margin-bottom: 10px; }
              .fd-2026-events { gap: 14px; }
              .fd-2026-card { min-height: 80px; padding-inline: 16px; border-radius: 20px; }
              .fd-2026-card-link { gap: 10px; }
              .fd-2026-date { gap: 4px; }
              .fd-2026-date-start { min-width: 30px; }
              .fd-2026-date-month { font-size: 10px; }
              .fd-2026-date-day { font-size: 20px; }
              .fd-2026-date-end { font-size: 8px; }
              .fd-2026-category { font-size: 10px; }
              .fd-2026-title { font-size: 14px; }
              .fd-2026-book { min-height: 38px; margin-inline-start: 8px; padding-inline: 14px; font-size: 12px; }
            }
            @media (max-width: 380px) {
              .fd-2026-card { padding-inline: 12px; }
              .fd-2026-card-link { gap: 8px; }
              .fd-2026-date-end { display: none; }
              .fd-2026-book { margin-inline-start: 5px; padding-inline: 11px; }
            }
          `}</style>
          <nav className="fd-calendar-year-nav" aria-label="Calendar year">
            <button
              type="button"
              onClick={() => setSelectedCalendarYear((year) => Math.max(2026, year - 1))}
              disabled={selectedCalendarYear <= 2026}
              aria-label="Show previous year"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setSelectedCalendarYear((year) => Math.min(2028, year + 1))}
              disabled={selectedCalendarYear >= 2028}
              aria-label="Show next year"
            >
              Next
            </button>
            <span className="fd-calendar-year-label" aria-live="polite">{selectedCalendarYear}</span>
          </nav>
          <div className="fd-2026-calendar" aria-label="Remaining 2026 events" hidden={selectedCalendarYear !== 2026}>
            {Object.entries(eventsByMonth).map(([month, events]) => (
              <section className="fd-2026-month" key={month} aria-labelledby={`fd-calendar-${month.toLowerCase()}-2026`}>
                <h2 className="fd-2026-month-heading" id={`fd-calendar-${month.toLowerCase()}-2026`}>
                  <span>{month}</span><span>2026</span>
                </h2>
                <div className="fd-2026-events">
                  {events.map((event) => {
                    const route = routeForScheduleEvent(event.eventTypeId);
                    const startMonth = new Date(`${event.startIso}T12:00:00`).toLocaleString('en-US', { month: 'short' });
                    const endMonth = new Date(`${event.endIso}T12:00:00`).toLocaleString('en-US', { month: 'short' });
                    const startDay = String(Number(event.startIso.slice(8, 10)));
                    const endDay = String(Number(event.endIso.slice(8, 10)));
                    const category = event.eventTypeId === 'training-week' ? 'Training' : event.eventTypeId === 'ras-mohamed' ? 'Trips' : 'Package';
                    return (
                      <article
                        className="fd-2026-card"
                        key={event.id}
                        data-freedive-2026-event
                        data-event-title={event.eventTitle.toLowerCase()}
                        data-event-month={month.toLowerCase()}
                        data-event-category={category.toLowerCase()}
                        style={{ backgroundColor: colorForScheduleEvent(event.eventTypeId) }}
                      >
                        <a
                          className="fd-2026-card-link"
                          href={`#${route}`}
                          aria-label={`${event.eventTitle}, ${event.dateLabel}. View event details`}
                          onClick={onNavigate ? (clickEvent) => {
                            clickEvent.preventDefault();
                            onNavigate(route);
                          } : undefined}
                        >
                          <span className="fd-2026-date" aria-hidden="true">
                            <span className="fd-2026-date-start"><span className="fd-2026-date-month">{startMonth}</span><span className="fd-2026-date-day">{startDay}</span></span>
                            {event.startIso !== event.endIso && <span className="fd-2026-date-end">{endMonth}<br />{endDay}</span>}
                          </span>
                          <span className="fd-2026-info">
                            <span className="fd-2026-category">{category}</span>
                            <span className="fd-2026-title">{event.eventTitle}</span>
                          </span>
                        </a>
                        <button type="button" className="fd-2026-book" onClick={() => onOpenBooking()} aria-label={`Book ${event.eventTitle}`}>
                          Book Now
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </>,
        calendarPortalHost,
      )}
    </>
  );
}
