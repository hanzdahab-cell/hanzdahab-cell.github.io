import { ArrowRight, CheckCircle2, MapPin, Waves } from 'lucide-react';
import { PageType } from '../../types';
import { SectionHero } from '../ui/SectionHero';

interface TrainingSectionProps {
  onOpenBooking: (courseId?: string) => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  onNavigate?: (page: PageType) => void;
}

const groupRates = [
  { location: 'Lighthouse Bay', rows: [{ divers: '1 person', one: '€45', two: '€75' }, { divers: '2 people', one: '€45', two: '€75' }, { divers: '3 people', one: '€40 per person', two: '€70 per person' }] },
  { location: 'Blue Hole', rows: [{ divers: '1 person', one: '€64', two: '€94' }, { divers: '2 people', one: '€64', two: '€94' }, { divers: '3 people', one: '€50 per person', two: '€80 per person' }] },
];

const trainingPackages = [
  { duration: '2 weeks', sessions: '10 sessions', price: '€375' },
  { duration: '3 weeks', sessions: '15 sessions', price: '€535' },
  { duration: '4 weeks', sessions: '20 sessions', price: '€665' },
];

function RateTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: [string, string, string];
  rows: { label: string; first: string; second: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <caption className="bg-white/5 px-4 py-3 text-left font-semibold text-white">{caption}</caption>
        <thead className="bg-[#071E32] text-xs uppercase tracking-wide text-slate-300">
          <tr>
            {headers.map((header) => <th key={header} scope="col" className="px-4 py-3 font-semibold">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-white/10 text-slate-200">
              <th scope="row" className="px-4 py-3 font-medium">{row.label}</th>
              <td className="px-4 py-3">{row.first}</td>
              <td className="px-4 py-3">{row.second}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TrainingSection({ onOpenBooking, onNavigate }: TrainingSectionProps) {
  return (
    <section id="training" className="ocean-surface relative overflow-hidden border-t border-white/5 px-6 pb-24 pt-0 text-slate-100 sm:pb-32">
      <SectionHero
        imageSrc="/images/story-carousel/training-line.jpg"
        imageAlt="Freediver training on a line in Dahab"
        className="-mx-6 mb-14 min-h-[50svh]"
      >
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3.5 py-1.5 font-alata text-xs uppercase tracking-widest text-cyan-100">
            Freedive Dahab · Lighthouse Bay &amp; Blue Hole
          </p>
          <h1 className="font-bebas text-5xl leading-tight tracking-[0.05em] text-white sm:text-6xl md:text-7xl">
            Freediving Training in <span className="text-cyan-200">Dahab, Egypt</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-100 sm:text-lg">
            Dive more, dive deeper, with a coach by your side.
          </p>
        </div>
      </SectionHero>

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        <section id="why-training" aria-labelledby="why-train-heading" className="scroll-mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Coached sessions</p>
            <h2 id="why-train-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Why train with us?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
              Training sessions are for certified freedivers. If you have never freedived, start with the SSI Freediving Course (10 meters).
            </p>
          </div>
          <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2">
            {[
              ['Set up for you', 'Our instructors prepare buoys and lines at a depth that suits your level.'],
              ['Real coaching', 'Get technique tips, feedback, safety supervision, and sessions adjusted to your progress.'],
              ['Small groups', 'No more than three people share a buoy, so there is little waiting between dives.'],
              ['Easy access to depth', 'Dive from shore in warm, clear, calm water without a boat schedule.'],
              ['Flexible options', 'Join day-by-day sessions, book a Training Week, or choose an Advanced Training Package.'],
            ].map(([title, copy]) => (
              <li key={title} className="h-full rounded-2xl border border-white/10 bg-[#0A2943] p-5">
                <h3 className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{copy}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="training-locations-heading">
          <div className="mb-6 flex items-end gap-3">
            <div>
              <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Two shore-based sites</p>
              <h2 id="training-locations-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Where we train</h2>
            </div>
            <span className="mb-3 h-px flex-1 bg-white/15" aria-hidden="true" />
          </div>
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
            <article id="lighthouse-bay-training" className="h-full scroll-mt-28 rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
              <h3 className="flex items-center gap-3 font-bebas text-3xl text-white">
                <MapPin className="h-5 w-5 text-cyan-300" aria-hidden="true" /> Lighthouse Bay
              </h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                Our home spot: a calm, sheltered bay a short walk from the center. It is ideal for building depth gradually and for technique-focused sessions.
              </p>
            </article>
            <article id="blue-hole-training" className="h-full scroll-mt-28 rounded-2xl border border-white/10 bg-[#0A2943] p-6 sm:p-8">
              <h3 className="flex items-center gap-3 font-bebas text-3xl text-white">
                <Waves className="h-5 w-5 text-cyan-300" aria-hidden="true" /> Blue Hole
              </h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                One of Dahab’s most famous dive sites and ideal for deep freediving. The surrounding reef protects it from waves and currents, keeping the surface almost flat; deep water starts within 30 meters of shore.
              </p>
            </article>
          </div>
        </section>

        <section aria-labelledby="group-rates-heading">
          <div className="mb-6">
            <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Prices for group training</p>
            <h2 id="group-rates-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Choose one or two sessions</h2>
            <p className="mt-3 text-sm text-slate-300">Equipment is not included. You can rent freediving equipment at our center.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {groupRates.map((rate) => (
              <RateTable
                key={rate.location}
                caption={rate.location}
                headers={['Group size', '1 session', '2 sessions']}
                rows={rate.rows.map((row) => ({ label: row.divers, first: row.one, second: row.two }))}
              />
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-amber-200/20 bg-amber-950/20 p-4 text-sm leading-relaxed text-amber-100">
            Blue Hole prices do not include the $20 National Park entrance fee, which you pay at the gate.
          </p>
        </section>

        <section aria-labelledby="private-rates-heading" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Subject to instructor availability</p>
            <h2 id="private-rates-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Private sessions</h2>
            <p className="mt-4 leading-relaxed text-slate-300">Your own instructor, your own pace.</p>
          </div>
          <RateTable
            caption="Private session rates, per person"
            headers={['Location', 'One session', 'Two sessions']}
            rows={[
              { label: 'Lighthouse', first: '€60 per person', second: '€105 per person' },
              { label: 'Blue Hole', first: '€80 per person', second: '€125 per person' },
            ]}
          />
        </section>

        <section id="training-modules" aria-labelledby="advanced-training-heading" className="scroll-mt-28 rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-[#0B2C4A] to-[#081F35] p-6 sm:p-10">
          <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">For longer stays</p>
          <h2 id="advanced-training-heading" className="mt-2 font-bebas text-4xl text-white sm:text-5xl">Advanced Training Packages</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">
            Dive as much as you want at a convenient rate. You need to be at least an Advanced Freediver (Level 2) or equivalent. Packages use group sessions already on the schedule, so training locations may vary with availability. On rest days, you can still dive with other trainees from our center and enjoy the community.
          </p>
          <div className="mt-7 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="sr-only">Advanced training packages and prices</caption>
              <thead className="bg-[#071E32] text-xs uppercase tracking-wide text-slate-300">
                <tr>
                  {['Duration', 'Sessions with an instructor', 'Price'].map((head) => <th key={head} scope="col" className="px-4 py-3">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {trainingPackages.map((item) => (
                  <tr key={item.duration} className="border-t border-white/10 text-slate-200">
                    <th scope="row" className="px-4 py-3 font-medium">{item.duration}</th>
                    <td className="px-4 py-3">{item.sessions}</td>
                    <td className="px-4 py-3 font-semibold text-white">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-300">
            Looking for something more structured? Explore the{' '}
            <button type="button" onClick={() => onNavigate?.('packages')} className="font-semibold text-cyan-200 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Training Week and Master Program on the Packages page
            </button>.
          </p>
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="fd-button mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Ask about training availability <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      </div>
    </section>
  );
}
