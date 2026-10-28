import { useState, useEffect, useRef } from 'react';
import { X, Calendar, ChevronRight, Send, CheckCircle2 } from 'lucide-react';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { packagesData } from '../../data/packages';
import { roomTypes } from '../../data/accommodation';
import { useLanguage } from '../../context/LanguageContext';
import { setPageScrollLocked } from '../../utils/useSmoothScroll';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedId?: string;
  currency: 'EUR' | 'USD' | 'EGP';
}

interface BookingOffering {
  id: string;
  title: string;
  priceEur: number;
  rateNote?: string;
}

interface BookingOfferingGroup {
  label: string;
  offerings: BookingOffering[];
}

export function BookingModal({ isOpen, onClose, initialSelectedId, currency }: BookingModalProps) {
  const { t, isRtl } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('ssi-level-1');
  const [diverCount, setDiverCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [lodgingId, setLodgingId] = useState<string>('none');
  const [lodgingNights, setLodgingNights] = useState<number>(5);
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+20');
  const [phone, setPhone] = useState('');
  const [contactErrors, setContactErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phone?: string }>({});
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  // Freeze Lenis while the modal is open so the wheel scrolls the form instead
  // of the page behind it; Escape closes the modal like a native dialog.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    setPageScrollLocked('booking-modal', true);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      setPageScrollLocked('booking-modal', false);
      window.__lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    modalPanelRef.current?.scrollTo({ top: 0 });
  }, [currentStep]);

  if (!isOpen) return null;

  // Find selected course or package
  const offeringGroups: BookingOfferingGroup[] = [
    {
      label: 'Courses',
      offerings: ssiCourses.map(c => ({ id: c.id, title: c.title, priceEur: c.priceEur })),
    },
    {
      label: 'Specialties',
      offerings: specialtyCourses.map(s => ({ id: s.id, title: s.title, priceEur: s.priceEur })),
    },
    {
      label: 'Professional Courses',
      offerings: instructorCourses.map(i => ({ id: i.id, title: i.title, priceEur: i.priceEur })),
    },
    {
      label: 'Trainings',
      offerings: [{ id: 'training-session', title: 'Daily Line Training Buoy Pack (5 Sessions)', priceEur: 155 }],
    },
    {
      label: 'Packages',
      offerings: packagesData.map(p => ({ id: p.id, title: p.title, priceEur: p.priceEur, rateNote: p.rateNote })),
    },
  ];
  const allOfferings = offeringGroups.flatMap(group => group.offerings);

  const currentOffering = allOfferings.find(o => o.id === selectedId) || allOfferings[0];
  const selectedRoom = roomTypes.find(r => r.id === lodgingId);
  const today = new Date();
  const minBookingDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Price math
  const courseBasePrice = currentOffering.priceEur * diverCount;
  const lodgingCost = selectedRoom ? selectedRoom.pricePerNightEur.min * lodgingNights : 0;
  const totalEur = courseBasePrice + lodgingCost;
  const depositEur = Math.round(totalEur * 0.3);
  const balanceEur = totalEur - depositEur;

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 0) {
      continueToReservation();
      return;
    }
    setIsSuccess(true);
  };

  const continueToReservation = () => {
    const nextErrors: typeof contactErrors = {};
    if (!firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!email.trim()) nextErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneDigits) nextErrors.phone = 'Phone / WhatsApp number is required.';
    else if (phoneDigits.length < 6) nextErrors.phone = 'Enter a valid phone number.';
    setContactErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      document.getElementById(`booking-${firstInvalidField}`)?.focus();
      return;
    }
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        ref={modalPanelRef}
        data-lenis-prevent
        className={`glass-panel max-w-3xl w-full max-h-[96vh] overflow-y-auto rounded-3xl border border-cyan-400/40 p-6 sm:p-10 relative shadow-2xl space-y-6 font-alata ${isRtl ? 'text-right' : 'text-left'}`}
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
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <span className="text-xs tracking-widest text-cyan-400 uppercase">
                RESERVATION RECEIVED
              </span>
              <h3 className="text-3xl font-bold text-white sm:text-4xl">
                See You in Dahab, {[firstName, lastName].filter(Boolean).join(' ') || 'Adventurer'}
              </h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm font-light leading-relaxed">
                Your reservation for <strong className="text-white">{currentOffering.title}</strong> has been logged. 
                Our instructor team will contact you within 6 hours by email with your confirmation package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
              {currentOffering.rateNote && (
                <p className="mb-3 text-xs leading-relaxed text-[#A9D2EC]">
                  The displayed amount is based on a historical brochure rate. Our team will confirm the current quote before you proceed.
                </p>
              )}
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
                <span className="text-slate-500">{currentOffering.rateNote ? 'Indicative 30% deposit:' : '30% Deposit Due:'}</span>
                <span className="font-bebas text-2xl text-emerald-400">{formatPrice(depositEur)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={onClose}
                className="min-h-11 rounded-xl border border-white/20 px-6 py-3.5 text-xs uppercase tracking-wider text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.booking.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-6 font-alata">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white sm:text-4xl">{t.booking.modalTitle}</h3>
              <p className="text-sm text-slate-300">{t.booking.modalSubtitle}</p>
            </div>

            <div aria-label={`Step ${currentStep + 1} of 2`} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                {['Your Details', 'Your Reservation'].map((label, index) => (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${index <= currentStep ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/20 text-slate-400'}`}>
                      {index + 1}
                    </span>
                    <span className={`text-xs sm:text-sm ${index === currentStep ? 'text-white' : 'text-slate-400'}`}>{label}</span>
                    {index === 0 && <span className="mx-1 h-px flex-1 bg-white/15" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={2}
                aria-valuenow={currentStep + 1}
                className="h-1.5 overflow-hidden rounded-full bg-slate-800"
              >
                <div className={`h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 transition-all duration-300 ${currentStep === 0 ? 'w-1/2' : 'w-full'}`} />
              </div>
            </div>

            {currentStep === 0 ? (
              <section aria-labelledby="booking-details-title" className="space-y-5">
                <div>
                  <h4 id="booking-details-title" className="text-xl font-semibold text-white">Your Details</h4>
                  <p className="mt-1 text-sm text-slate-400">Tell us how to reach you about your reservation.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-firstName" className="block text-xs uppercase text-slate-300">First Name</label>
                    <input id="booking-firstName" autoComplete="given-name" value={firstName} onChange={(e) => { setFirstName(e.target.value); setContactErrors((old) => ({ ...old, firstName: undefined })); }} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" placeholder="Your first name" aria-invalid={!!contactErrors.firstName} aria-describedby={contactErrors.firstName ? 'booking-firstName-error' : undefined} />
                    {contactErrors.firstName && <p id="booking-firstName-error" role="alert" className="text-xs text-rose-300">{contactErrors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="booking-lastName" className="block text-xs uppercase text-slate-300">Last Name</label>
                    <input id="booking-lastName" autoComplete="family-name" value={lastName} onChange={(e) => { setLastName(e.target.value); setContactErrors((old) => ({ ...old, lastName: undefined })); }} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" placeholder="Your last name" aria-invalid={!!contactErrors.lastName} aria-describedby={contactErrors.lastName ? 'booking-lastName-error' : undefined} />
                    {contactErrors.lastName && <p id="booking-lastName-error" role="alert" className="text-xs text-rose-300">{contactErrors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-email" className="block text-xs uppercase text-slate-300">{t.booking.email}</label>
                  <input id="booking-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => { setEmail(e.target.value); setContactErrors((old) => ({ ...old, email: undefined })); }} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" placeholder={t.booking.emailPlaceholder} aria-invalid={!!contactErrors.email} aria-describedby={contactErrors.email ? 'booking-email-error' : undefined} />
                  {contactErrors.email && <p id="booking-email-error" role="alert" className="text-xs text-rose-300">{contactErrors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-phone" className="block text-xs uppercase text-slate-300">{t.booking.phone}</label>
                  <div className="flex gap-2">
                    <select aria-label="Country code" autoComplete="tel-country-code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-28 shrink-0 rounded-xl border border-white/15 bg-slate-900 px-2.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30">
                      {['+20', '+44', '+49', '+33', '+39', '+34', '+31', '+41', '+1', '+971', '+966', '+7'].map((code) => <option key={code} value={code}>{code}</option>)}
                    </select>
                    <input id="booking-phone" type="tel" autoComplete="tel-national" inputMode="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setContactErrors((old) => ({ ...old, phone: undefined })); }} style={{ fontFamily: '"Inter Variable", Inter, Arial, sans-serif' }} className="min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" placeholder={t.booking.phonePlaceholder} aria-invalid={!!contactErrors.phone} aria-describedby={contactErrors.phone ? 'booking-phone-error' : undefined} />
                  </div>
                  {contactErrors.phone && <p id="booking-phone-error" role="alert" className="text-xs text-rose-300">{contactErrors.phone}</p>}
                </div>
              </section>
            ) : (
              <section aria-labelledby="booking-reservation-title" className="space-y-5">
                <div>
                  <h4 id="booking-reservation-title" className="text-xl font-semibold text-white">Your Reservation</h4>
                  <p className="mt-1 text-sm text-slate-400">Choose your program, dates, and any extras.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-offering" className="block text-xs uppercase text-slate-300">{t.booking.offering}</label>
                  <select id="booking-offering" value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" required>
                    {offeringGroups.map((group) => <optgroup key={group.label} label={group.label}>{group.offerings.map((offering) => <option key={offering.id} value={offering.id}>{offering.title} — {formatPrice(offering.priceEur)}</option>)}</optgroup>)}
                  </select>
                  {currentOffering.rateNote && <p className="text-xs leading-relaxed text-[#A9D2EC]">This displayed amount is based on a historical brochure rate. We will confirm the current price and availability with you.</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="booking-date" className="flex items-center gap-1.5 text-xs uppercase text-slate-300"><Calendar className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />{t.booking.dates}</label>
                    <input id="booking-date" type="date" value={startDate} min={minBookingDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-divers" className="block text-xs uppercase text-slate-300">Number of Divers</label>
                    <select id="booking-divers" value={diverCount} onChange={(e) => setDiverCount(Number(e.target.value))} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30">
                      <option value={1}>1 Diver (Individual)</option><option value={2}>2 Divers (Buddy Pair)</option><option value={3}>3 Divers (Full Private Group - Max 3)</option><option value={4}>4 Divers (Two Instructor Groups)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <label htmlFor="booking-accommodation" className="flex flex-wrap justify-between gap-2 text-xs uppercase text-slate-300"><span>Add Oceanfront Sea Lodge Stay (Optional)</span><span className="text-cyan-300">Save up to €180 bundled</span></label>
                  <select id="booking-accommodation" value={lodgingId} onChange={(e) => setLodgingId(e.target.value)} className="w-full rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30">
                    <option value="none">No Accommodation Needed (Arrange Own)</option>
                    {roomTypes.map((room) => <option key={room.id} value={room.id}>{room.title} — {formatPrice(room.pricePerNightEur.min)}/night (Breakfast &amp; 100Mbps WiFi)</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-notes" className="block text-xs uppercase text-slate-300">{t.booking.notes} <span className="normal-case text-slate-500">(optional)</span></label>
                  <textarea id="booking-notes" rows={3} placeholder={t.booking.notesPlaceholder} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full resize-y rounded-xl border border-white/15 bg-slate-900 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30" />
                </div>

                <div className="space-y-3 rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-5 text-sm">
                  <div className="flex justify-between gap-4 text-slate-300"><span>{currentOffering.title} ({diverCount}x):</span><span className="text-lg font-bold">{formatPrice(courseBasePrice)}</span></div>
                  {selectedRoom && <div className="flex justify-between gap-4 text-slate-300"><span>Sea Lodge ({selectedRoom.title} × {lodgingNights} nights):</span><span className="text-lg font-bold">{formatPrice(lodgingCost)}</span></div>}
                  <div className="flex justify-between gap-4 border-t border-white/10 pt-3 text-slate-400"><span>{currentOffering.rateNote ? 'Brochure-rate estimate:' : 'Total Calculated:'}</span><span className="text-2xl font-bold text-white">{formatPrice(totalEur)}</span></div>
                  <div className="flex justify-between gap-4 font-semibold text-emerald-400"><span>{currentOffering.rateNote ? 'Indicative 30% deposit:' : '30% Deposit to Secure Slot:'}</span><span className="text-2xl font-bold">{formatPrice(depositEur)}</span></div>
                  <p className="text-xs text-slate-400">{currentOffering.rateNote ? 'This estimate uses a historical brochure rate. Confirm the current quote, included services and payment terms with our team.' : `*Remaining balance of ${formatPrice(balanceEur)} is paid on arrival in Dahab. Free date changes up to 14 days before start.`}</p>
                </div>
              </section>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
              {currentStep === 1 ? (
                <button type="button" onClick={() => setCurrentStep(0)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 text-sm text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Back</button>
              ) : <span />}
              {currentStep === 0 ? (
                <button type="button" onClick={continueToReservation} className="fd-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continue to Reservation <ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
              ) : (
                <button type="submit" className="fd-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Send className="h-4 w-4" aria-hidden="true" /><span>{t.booking.submit}</span></button>
              )}
            </div>
            <p className="text-center text-xs text-slate-500">Step {currentStep + 1} of 2 · No payment is collected here</p>
          </form>
        )}

      </div>
    </div>
  );
}
