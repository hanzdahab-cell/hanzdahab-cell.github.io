import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { getRoomNightlyPrice, roomTypes } from '../../data/accommodation';
import { setPageScrollLocked } from '../../utils/useSmoothScroll';

interface AccommodationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  currency: 'EUR' | 'USD' | 'EGP';
}

function getLocalDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function AccommodationBookingModal({
  isOpen,
  onClose,
  roomId,
  currency,
}: AccommodationBookingModalProps) {
  const room = roomTypes.find((item) => item.id === roomId) ?? roomTypes[0];
  const [arrivalDate, setArrivalDate] = useState('');
  const [guestCount, setGuestCount] = useState(Math.min(2, room.capacity));
  const [nights, setNights] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [showSendOptions, setShowSendOptions] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const today = getLocalDateValue(new Date());
  const nightlyRate = getRoomNightlyPrice(room, arrivalDate || today, guestCount);
  const discountRate = nights >= 21 && nights <= 30 ? 0.3 : nights >= 10 && nights <= 20 ? 0.15 : 0;
  const estimatedTotal = Math.round(nightlyRate * nights * (1 - discountRate));
  const formatPrice = (amount: number) => {
    if (currency === 'USD') return `$${Math.round(amount * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(amount * 52)}`;
    return `€${amount}`;
  };

  useEffect(() => {
    if (!isOpen) return;
    setArrivalDate('');
    setGuestCount(Math.min(2, room.capacity));
    setNights(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setShowSendOptions(false);
  }, [isOpen, room.capacity, roomId]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.__lenis?.stop();
    setPageScrollLocked('accommodation-booking-modal', true);
    const focusFrame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLInputElement>('[data-autofocus]')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      setPageScrollLocked('accommodation-booking-modal', false);
      window.__lenis?.start();
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const requestDetails = [
    `Stay enquiry for ${room.title}`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Arrival: ${arrivalDate}`,
    `Guests: ${guestCount}`,
    `Nights: ${nights}`,
    `Estimated stay total: ${formatPrice(estimatedTotal)}`,
    `Notes: ${notes.trim() || 'None'}`,
  ].join('\n');
  const subject = encodeURIComponent(`Stay enquiry — ${room.title}`);
  const emailHref = `mailto:info@freedivedahab.com?subject=${subject}&body=${encodeURIComponent(requestDetails)}`;
  const whatsappHref = `https://wa.me/201098730731?text=${encodeURIComponent(requestDetails)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="stay-booking-title"
        aria-describedby="stay-booking-description"
        tabIndex={-1}
        data-lenis-prevent
        className="relative max-h-[96svh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-300/30 bg-[#071D31] p-5 text-white shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close stay enquiry"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:right-6 sm:top-6"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {showSendOptions ? (
          <div className="space-y-6 py-6 pr-10" aria-live="polite">
            <CheckCircle2 className="size-10 text-cyan-200" aria-hidden="true" />
            <div className="space-y-2">
              <h2 id="stay-booking-title" className="font-bebas text-4xl sm:text-5xl">Stay enquiry ready</h2>
              <p id="stay-booking-description" className="max-w-xl text-sm leading-relaxed text-slate-200">
                Choose where to send your details. Your stay is not confirmed until our team checks availability and replies.
              </p>
            </div>
            <dl className="grid gap-3 rounded-2xl border border-white/10 bg-[#0A2943] p-5 text-sm sm:grid-cols-2">
              <div><dt className="text-cyan-100/75">Room</dt><dd className="mt-1 font-semibold">{room.title}</dd></div>
              <div><dt className="text-cyan-100/75">Arrival</dt><dd className="mt-1 font-semibold">{arrivalDate}</dd></div>
              <div><dt className="text-cyan-100/75">Guests · nights</dt><dd className="mt-1 font-semibold">{guestCount} · {nights}</dd></div>
              <div><dt className="text-cyan-100/75">Estimated total</dt><dd className="mt-1 font-semibold">{formatPrice(estimatedTotal)}</dd></div>
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="fd-button inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Send with WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={emailHref}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Send by email
              </a>
            </div>
            <button type="button" onClick={() => setShowSendOptions(false)} className="inline-flex min-h-11 items-center gap-2 text-sm text-cyan-100 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">
              <ArrowLeft className="size-4" aria-hidden="true" /> Edit stay details
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setShowSendOptions(true);
            }}
            className="space-y-6 pr-10"
          >
            <div className="space-y-2">
              <h2 id="stay-booking-title" className="font-bebas text-4xl sm:text-5xl">Enquire about a stay</h2>
              <p id="stay-booking-description" className="max-w-xl text-sm leading-relaxed text-slate-200">
                Request a room without selecting a dive course. Dive bookings still include Sea Lodge as an optional add-on.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="stay-arrival" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Arrival date</label>
                <input
                  id="stay-arrival"
                  data-autofocus
                  type="date"
                  min={today}
                  required
                  value={arrivalDate}
                  onChange={(event) => setArrivalDate(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stay-guests" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Guests</label>
                <select
                  id="stay-guests"
                  value={guestCount}
                  onChange={(event) => setGuestCount(Number(event.target.value))}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                >
                  {Array.from({ length: room.capacity }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="stay-nights" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Nights</label>
                <input
                  id="stay-nights"
                  type="number"
                  min={1}
                  max={365}
                  step={1}
                  required
                  value={nights}
                  onChange={(event) => setNights(Math.min(365, Math.max(1, Number(event.target.value) || 1)))}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stay-name" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Full name</label>
                <input
                  id="stay-name"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stay-email" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Email</label>
                <input
                  id="stay-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stay-phone" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Phone / WhatsApp</label>
                <input
                  id="stay-phone"
                  type="tel"
                  autoComplete="tel"
                  minLength={6}
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-slate-900 px-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="stay-notes" className="block text-xs font-semibold uppercase tracking-wide text-slate-200">Notes <span className="font-normal normal-case text-slate-300">optional</span></label>
              <textarea
                id="stay-notes"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-3 text-base text-white focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0A2943] px-4 py-3 text-sm">
              <span>{room.title} · {guestCount} {guestCount === 1 ? 'guest' : 'guests'} · {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span className="font-semibold text-white">{formatPrice(estimatedTotal)} estimated</span>
              {discountRate > 0 && <span className="w-full text-xs text-cyan-100">{Math.round(discountRate * 100)}% long-stay discount included.</span>}
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              This request opens WhatsApp or your email app so you can send it to us. No payment is collected and your stay is not confirmed until we reply.
            </p>
            <button type="submit" className="fd-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Review and send enquiry <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
