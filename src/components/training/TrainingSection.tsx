import { useState } from 'react';
import { Compass, Waves, Target, Activity, ShieldCheck, CheckCircle2, ArrowRight, Clock, Award, Users, MapPin } from 'lucide-react';
import { PageType } from '../../types';
import { SectionHero } from '../ui/SectionHero';

interface TrainingSectionProps {
  onOpenBooking: (courseId?: string) => void;
  currency?: 'EUR' | 'USD' | 'EGP';
  onNavigate?: (page: PageType) => void;
}

interface TrainingModule {
  id: string;
  title: string;
  subtitle: string;
  depth: string;
  duration: string;
  description: string;
  skills: string[];
  recommendedFor: string;
  tag: string;
  locationName: string;
  siteId: string;
  imageSrc: string;
  imageAlt: string;
  cardImageSrc?: string;
  cardImageAlt?: string;
}

export function TrainingSection({ onOpenBooking, currency = 'EUR', onNavigate }: TrainingSectionProps) {
  const [activeTab, setActiveTab] = useState<'depth' | 'equalization' | 'pool' | 'coaching'>('depth');

  const trainingModules: Record<string, TrainingModule> = {
    depth: {
      id: 'depth-training',
      title: 'Blue Hole Depth & Line Training',
      subtitle: 'Counter-Ballast Deep Water Progression',
      depth: '20m – 100m+',
      duration: 'Daily Sessions (2.5 hrs)',
      locationName: 'The Blue Hole (8.5 km North)',
      siteId: 'blue-hole',
      description: 'Train at the world-renowned Dahab Blue Hole with official SSI safety setups, dedicated sonar/depth lines, counter-ballast safety rigs, and certified deep safety divers at every descent.',
      skills: [
        'Free Immersion (FIM) & Constant Weight (CWT)',
        'Bottom plate turns, lanyard protocols & streamline glide',
        'Deep relaxation & mental focus at depth',
        'Safety diver protocols & deep water rescue readiness'
      ],
      recommendedFor: 'Certified freedivers looking to safely increase depth and bottom confidence',
      tag: 'DAILY SESSIONS',
      imageSrc: '/images/story-carousel/training-line.jpg',
      imageAlt: 'Freediver training beside a line in the Red Sea',
      cardImageSrc: '/images/cards/training/blue-hole-training.webp',
      cardImageAlt: 'Freedive Dahab Blue Hole training poster',
    },
    equalization: {
      id: 'equalization-lab',
      title: 'Equalization Lab & Mouthfill Coaching',
      subtitle: 'Overcome Equalization Barriers with Scientific Precision',
      depth: 'Custom Depth Simulation',
      duration: 'Full Day / Multi-Day Intensive',
      locationName: 'Lighthouse Bay Sanctuary Base (On-Site)',
      siteId: 'lighthouse',
      description: 'Direct 1-on-1 equalization diagnosis using Otovent biofeedback, glottis control drills, Frenzel mastery, and deep mouthfill mechanics for divers experiencing depth plateaus.',
      skills: [
        'Pure Frenzel vs. Hands-free (VTO) activation',
        'Soft palate & glottis isolation drills',
        'Mouthfill charge mechanics and constant pressure equalizing',
        'Deep RV (Residual Volume) dry lung stretching & thorax flexibility'
      ],
      recommendedFor: 'Divers stuck between 20m–40m or working towards Master & Instructor depth',
      tag: 'MASTERCLASS',
      imageSrc: '/courses/mouthfill-workshop.jpg',
      imageAlt: 'Freediver practising equalisation in open water',
      cardImageSrc: '/images/cards/training/lighthouse-training.webp',
      cardImageAlt: 'Freedive Dahab Lighthouse training poster',
    },
    pool: {
      id: 'pool-apnea',
      title: 'Pool Conditioning & Static Apnea',
      subtitle: 'Dynamic No-Fin (DNF) & Breath-Hold Expansion',
      depth: 'Controlled Thermal Pool',
      duration: '2 Hours Intensive',
      locationName: 'Lighthouse Base & Confined Water Facility',
      siteId: 'lighthouse',
      description: 'Structured pool coaching focusing on hydrodynamics, bi-fin & monofin propulsion efficiency, and progressive static breath-hold tables in a controlled, warm-water environment.',
      skills: [
        'Mammalian Dive Reflex (MDR) stimulation & warmups',
        'Static Apnea (STA) mental calmness & contraction management',
        'Dynamic with Fins (DYN) & Dynamic No-Fins (DNF) technique',
        'CO2 tolerance & O2 efficiency progression tables'
      ],
      recommendedFor: 'All levels seeking longer breath-hold duration and flawless underwater economy',
      tag: 'CONDITIONING',
      imageSrc: '/images/story-carousel/surface-session.jpg',
      imageAlt: 'Freedivers practising together in calm water',
    },
    coaching: {
      id: 'master-coaching',
      title: 'Private Master Coaching & Video Analysis',
      subtitle: 'Personalized 1-on-1 Guidance with SSI Pro Instructors',
      depth: 'Tailored to Target Depth',
      duration: 'Single Session or Weekly Camp',
      locationName: 'The Canyon & Blue Hole Deep Waters',
      siteId: 'canyon',
      description: 'Elevate your freediving with frame-by-frame 4K underwater video analysis, tailored training regimens, physiological assessments, and personalized mental coaching.',
      skills: [
        '4K underwater biomechanics video review',
        'Turn technique, freefall posture and streamlining audits',
        'Individualized progression plan & dry training routines',
        'Comprehensive psychological prep for deep immersion'
      ],
      recommendedFor: 'Athletes, instructors, and dedicated freedivers preparing for personal bests',
      tag: 'ELITE 1-ON-1',
      imageSrc: '/images/story-carousel/blue-hole-freediver.jpg',
      imageAlt: 'Freediver descending on a training line at the Blue Hole',
    },
  };

  const current = trainingModules[activeTab];
  const trainingCards: { id: typeof activeTab; module: TrainingModule }[] = [
    { id: 'depth', module: trainingModules.depth },
    { id: 'equalization', module: trainingModules.equalization },
    { id: 'pool', module: trainingModules.pool },
    { id: 'coaching', module: trainingModules.coaching },
  ];

  const handleScrollToMap = () => {
    const elem = document.getElementById('coastline-map');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="training" className="ocean-surface relative overflow-hidden border-t border-white/5 px-6 pb-24 pt-0 text-slate-100 sm:pb-32">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <SectionHero imageSrc={current.imageSrc} imageAlt={current.imageAlt} className="-mx-6 mb-20 min-h-[50svh]">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3.5 py-1.5 font-alata text-xs uppercase tracking-widest text-cyan-100">
            <Compass className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
            <span>Dedicated progression track</span>
          </div>
          <h1 className="font-bebas text-5xl leading-tight tracking-[0.05em] text-white sm:text-6xl md:text-7xl">
            Freediving <span className="text-cyan-200">training &amp; depth lab</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-100 sm:text-base">
            Beyond certification courses: training lines at the Dahab Blue Hole, equalisation coaching,
            and performance coaching with SSI Pro instructors.
          </p>
        </div>
      </SectionHero>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {trainingCards.map(({ id, module }) => {
            const isActive = activeTab === id;
            return (
              <article
                key={module.id}
                className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0A2943] transition-colors duration-300 ${
                  isActive
                    ? 'border-cyan-300/60'
                    : 'border-ocean-pale/10 hover:border-ocean-light/50'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#081F35]">
                  <img
                    src={module.cardImageSrc ?? module.imageSrc}
                    alt={module.cardImageAlt ?? module.imageAlt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/35 bg-[#081F35]/75 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white backdrop-blur">
                    {module.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-serif text-xl font-bold leading-snug text-white sm:text-2xl">
                    {module.title}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-wide text-cyan-200">
                    {module.subtitle}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
                    {module.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-ocean-pale/10 pt-4 text-xs text-slate-300">
                    <span>{module.duration}</span>
                    <span>{module.depth}</span>
                  </div>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveTab(id);
                      document.getElementById('training-active-module')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="mt-4 inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-white/45 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>View training focus</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div id="training-modules" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 scroll-mt-32">
          {[
            { id: 'depth', label: 'Blue Hole Line Training', icon: Waves, anchor: 'blue-hole-training' },
            { id: 'equalization', label: 'Equalization Lab', icon: Target, anchor: 'lighthouse-bay-training' },
            { id: 'pool', label: 'Pool & Static Apnea', icon: Activity, anchor: undefined },
            { id: 'coaching', label: 'Master Coaching', icon: Award, anchor: undefined },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={tab.anchor}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Display */}
        <div id="training-active-module" className="scroll-mt-28 bg-gradient-to-br from-[#0E3453]/90 to-[#0E3453]/90 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase border border-cyan-400/20">
                  {current.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {current.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  Depth: {current.depth}
                </span>
                <button
                  type="button"
                  onClick={handleScrollToMap}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                  title="View this location on the Dahab Coastline Map below"
                >
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{current.locationName}</span>
                </button>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
                  {current.title}
                </h3>
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                {current.description}
              </p>

              {/* Skills breakdown */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Core Training Focus:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.skills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-cyan-100/80">
                  <span className="text-slate-300 font-semibold">Recommended for:</span> {current.recommendedFor}
                </div>

                <button
                  onClick={() => onOpenBooking(current.id)}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center gap-2"
                >
                  <span>Book Training Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Highlights Panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-black font-sans">
                    SSI
                  </div>
                  <div>
                    <div className="font-serif font-bold text-white text-sm">Official SSI Training Center</div>
                    <div className="text-xs font-sans text-slate-400">Facility ID #720079</div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Counter-ballast safety system on every deep buoy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Max 3:1 diver-to-instructor ratio on all buoys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Daily transport from Freedive Dahab to the Blue Hole</span>
                  </li>
                </ul>
              </div>

              {/* Dahab Conditions Live Note */}
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Blue Hole: 24°C–28°C • Visibility 30m+</span>
                </span>
                <span className="text-slate-400">Year-Round Training</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
