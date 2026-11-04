import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  value?: string;
  min?: string;
  onChange: (value: string) => void;
  onClose?: () => void;
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });

function toDate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function CalendarPicker({ value, min, onChange, onClose }: CalendarPickerProps) {
  const selected = toDate(value);
  const minDate = toDate(min);
  const [month, setMonth] = useState(() => {
    const initial = selected ?? minDate ?? new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });
  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = first.getDay();
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(first.getFullYear(), first.getMonth(), index - offset + 1);
      return date;
    });
  }, [month]);

  return (
    <div className="w-full max-w-[19rem] rounded-2xl border border-white/15 bg-[#081F35]/95 p-4 text-white shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl dark-calendar">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <div className="font-alata text-sm font-semibold" aria-live="polite">{monthLabel.format(month)}</div>
        <button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center" role="grid" aria-label={monthLabel.format(month)}>
        {weekdayLabels.map((day) => <div key={day} role="columnheader" className="py-2 font-alata text-xs text-slate-400">{day}</div>)}
        {days.map((date) => {
          const key = toValue(date);
          const outsideMonth = date.getMonth() !== month.getMonth();
          const disabled = Boolean(minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()));
          const isSelected = Boolean(selected && key === value);
          return (
            <div role="gridcell" aria-selected={isSelected || undefined} key={key} className="grid place-items-center py-0.5">
              <button
                type="button"
                data-date={key}
                disabled={disabled}
                aria-label={new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(date)}
                aria-pressed={isSelected}
                onClick={() => { onChange(key); onClose?.(); }}
                onKeyDown={(event) => {
                  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
                  event.preventDefault();
                  const delta = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' ? -7 : 7;
                  const next = new Date(date);
                  next.setDate(next.getDate() + delta);
                  if (next.getMonth() !== month.getMonth()) setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
                  requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(`[data-date="${toValue(next)}"]`)?.focus());
                }}
                className={`grid size-9 place-items-center rounded-full font-alata text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:text-slate-700 ${isSelected ? 'bg-[#A9D2EC] font-bold text-[#0E3453] shadow-[0_0_18px_rgba(169,210,236,0.4)]' : outsideMonth ? 'text-slate-600 hover:bg-white/10' : 'text-slate-100 hover:bg-white/10'}`}
              >{date.getDate()}</button>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (prefers-color-scheme: light) {
          .dark-calendar { background: rgba(255,255,255,.94); color: #0E3453; border-color: rgba(14,52,83,.15); }
          .dark-calendar [role="columnheader"] { color: #54718a; }
          .dark-calendar button:not(:disabled) { color: #0E3453; }
          .dark-calendar button:hover { background: rgba(34,98,140,.12); }
          .dark-calendar button[aria-pressed="true"] { background: #22628C; color: white; }
        }
      `}</style>
    </div>
  );
}
