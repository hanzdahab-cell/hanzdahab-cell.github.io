import { useState, useEffect, useRef } from 'react';
import { X, Calendar, ShieldCheck, Send, Mail } from 'lucide-react';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { packagesData } from '../../data/packages';
import { roomTypes } from '../../data/accommodation';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/site';

function getLocalDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedId?: string;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function BookingModal({ isOpen, onClose, initialSelectedId, currency }: BookingModalProps) {
  const { t, isRtl } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('ssi-level-1');
  const [diverCount, setDiverCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(() => getLocalDateValue());
  const [experienceLevel, setExperienceLevel] = useState<string>('beginner');
  const [lodgingId, setLodgingId] = useState<string>('none');
  const [lodgingNights, setLodgingNights] = useState<number>(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [mailtoHref, setMailtoHref] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  useEffect(() => {
    if (isOpen && startDate < getLocalDateValue()) {
      setStartDate(getLocalDateValue());
    }
  }, [isOpen, startDate]);

  // Freeze Lenis while the modal is open so the wheel scrolls the form instead
  // of the page behind it; Escape closes the modal like a native dialog.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    const previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const firstFocusableElement = modalRef.current?.querySelector<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusableElement?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ));
      if (focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.__lenis?.start();
      previouslyFocusedElement?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Find selected course or package
  const allOfferings = [
    ...ssiCourses.map(c => ({ id: c.id, title: c.title, priceEur: c.priceEur, type: 'Course', rateNote: undefined })),
    ...specialtyCourses.map(s => ({ id: s.id, title: s.title, priceEur: s.priceEur, type: 'Specialty', rateNote: undefined })),
    ...instructorCourses.map(i => ({ id: i.id, title: i.title, priceEur: i.priceEur, type: 'Instructor', rateNote: undefined })),
    ...packagesData.map(p => ({ id: p.id, title: p.title, priceEur: p.priceEur, type: 'Package', rateNote: p.rateNote })),
    { id: 'training-session', title: 'Daily Line Training Buoy Pack (5 Sessions)', priceEur: 155, type: 'Training', rateNote: undefined }
  ];

  const currentOffering = allOfferings.find(o => o.id === selectedId) || allOfferings[0];
  const selectedRoom = roomTypes.find(r => r.id === lodgingId);

  // Price math
  const courseBasePrice = currentOffering.priceEur * diverCount;
  const lodgingCost = selectedRoom ? selectedRoom.pricePerNightEur.min * lodgingNights : 0;
  const totalEur = courseBasePrice + lodgingCost;

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `~$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `~E£${Math.round(eur * 52)}`;
    return `~€${eur}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Freedive Dahab inquiry: ${currentOffering.title}`;
    const experienceLabel = {
      beginner: t.booking.expNone,
      'level-1': t.booking.expL1,
      'level-2': t.booking.expL2,
      'level-3': t.booking.expMaster,
    }[experienceLevel];
    const body = [
      `Program: ${currentOffering.title}`,
      `Preferred arrival date: ${startDate}`,
      `Number of divers: ${diverCount}`,
      `Experience level: ${experienceLabel}`,
      `Accommodation: ${selectedRoom?.title ?? 'No accommodation requested'}`,
      `Accommodation nights: ${selectedRoom ? lodgingNights : 0}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Notes: ${notes || 'None'}`,
      `Displayed total estimate: ${formatPrice(totalEur)}`,
      '',
      'Please confirm current prices, dates, availability, and what is included. I understand this is an inquiry, not a confirmed reservation.',
    ].join('\n');
    setMailtoHref(`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        data-lenis-prevent
        className={`glass-panel max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl border border-cyan-400/40 p-6 sm:p-10 relative shadow-2xl space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 rounded-full border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer`}
          aria-label={t.booking.close}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <Mail className="w-10 h-10" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {t.booking.requestPrepared}
              </span>
              <h3 id="booking-modal-title" className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {t.booking.requestPrepared}
              </h3>
              <p role="status" className="text-slate-300 max-w-md mx-auto text-sm font-light leading-relaxed">
                {t.booking.requestPreparedBody}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="text-cyan-300 font-bold">{currentOffering.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Start Date:</span>
                <span>{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Divers:</span>
                <span>{diverCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated total:</span>
                <span className="font-bebas text-2xl text-emerald-400">{formatPrice(totalEur)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a
                href={mailtoHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-[#062741] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {t.booking.sendEmailInquiry}
              </a>
              <button
                onClick={onClose}
                className="min-h-11 rounded-xl border border-white/20 px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.booking.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                DIRECT ACADEMY RESERVATION • GUARANTEED 3:1 RATIO
              </span>
              <h3 id="booking-modal-title" className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {t.booking.modalTitle}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                {t.booking.modalSubtitle}
              </p>
            </div>

            {/* Step 1: Select Program */}
            <div className="space-y-2">
              <label htmlFor="booking-offering" className="text-xs font-mono uppercase text-slate-300 block">
                {t.booking.offering}
              </label>
              <select
                id="booking-offering"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-sans text-sm focus:border-cyan-400 focus:outline-none"
              >
                {allOfferings.map((o) => (
                  <option key={o.id} value={o.id}>
                    [{o.type}] {o.title} — {formatPrice(o.priceEur)}
                  </option>
                ))}
              </select>
              {currentOffering.rateNote && (
                <p className="text-xs leading-relaxed text-[#A9D2EC]">
                  This displayed amount is based on a historical brochure rate. We will confirm the current price and availability with you.
                </p>
              )}
            </div>

            {/* Step 2: Date & Divers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="booking-arrival-date" className="text-xs font-mono uppercase text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {t.booking.dates}
                </label>
                <input
                  id="booking-arrival-date"
                  type="date"
                  value={startDate}
                  min={getLocalDateValue()}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-diver-count" className="text-xs font-mono uppercase text-slate-300 block">
                  {t.booking.diverCount}
                </label>
                <select
                  id="booking-diver-count"
                  value={diverCount}
                  onChange={(e) => setDiverCount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value={1}>1 Diver (Individual)</option>
                  <option value={2}>2 Divers (Buddy Pair)</option>
                  <option value={3}>3 Divers (Full Private Group - Max 3)</option>
                  <option value={4}>4 Divers (Two Instructor Groups)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-experience" className="text-xs font-mono uppercase text-slate-300 block">
                {t.booking.experienceLevel}
              </label>
              <select
                id="booking-experience"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="beginner">{t.booking.expNone}</option>
                <option value="level-1">{t.booking.expL1}</option>
                <option value="level-2">{t.booking.expL2}</option>
                <option value="level-3">{t.booking.expMaster}</option>
              </select>
            </div>

            {/* Step 3: Optional Sea Lodge Stay */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label htmlFor="booking-lodging" className="text-xs font-mono uppercase text-slate-300 flex justify-between">
                <span>Add Oceanfront Sea Lodge Stay (Optional)</span>
                <span className="text-cyan-400">Save up to €180 bundled</span>
              </label>
              <select
                id="booking-lodging"
                value={lodgingId}
                onChange={(e) => setLodgingId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="none">No Accommodation Needed (Arrange Own)</option>
                {roomTypes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} — {formatPrice(r.pricePerNightEur.min)}/night (Breakfast & 100Mbps WiFi)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Diver Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-1.5">
                <label htmlFor="booking-full-name" className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.fullName}</label>
                <input
                  id="booking-full-name"
                  type="text"
                  placeholder={t.booking.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-email" className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.email}</label>
                <input
                  id="booking-email"
                  type="email"
                  placeholder={t.booking.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-phone" className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.phone}</label>
                <input
                  id="booking-phone"
                  type="tel"
                  placeholder={t.booking.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Step 5: Notes */}
            <div className="space-y-1.5">
              <label htmlFor="booking-notes" className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.notes}</label>
              <textarea
                id="booking-notes"
                rows={2}
                placeholder={t.booking.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Indicative price estimate */}
            <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{currentOffering.title} ({diverCount}x):</span>
                <span className="font-bebas text-xl">{formatPrice(courseBasePrice)}</span>
              </div>
              {selectedRoom && (
                <div className="flex justify-between text-slate-300">
                  <span>Sea Lodge ({selectedRoom.title} x {lodgingNights} nights):</span>
                  <span className="font-bebas text-xl">{formatPrice(lodgingCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 text-[11px] border-t border-white/10 pt-2">
                <span>Estimated total:</span>
                <span className="font-bebas text-2xl text-white">{formatPrice(totalEur)}</span>
              </div>
              <div className="text-[11px] leading-relaxed text-slate-300">
                {t('ui.priceEstimateNotice')}
                {currentOffering.rateNote && <span className="mt-1 block">{currentOffering.rateNote}</span>}
              </div>
            </div>

            {/* Reservation request */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="fd-button inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                <span>{t.booking.submit}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
