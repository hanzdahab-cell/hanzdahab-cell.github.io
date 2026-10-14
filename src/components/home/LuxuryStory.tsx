import { Award, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LuxuryStoryProps {
  onOpenBooking: () => void;
}

export function LuxuryStory({ onOpenBooking }: LuxuryStoryProps) {
  const { t } = useLanguage();

  return (
    <section id="philosophy" className="relative py-32 md:py-44 px-6 bg-transparent overflow-hidden border-t border-white/5">
      
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Top Editorial Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="w-12 h-px bg-cyan-400" />
          <span className="text-xs uppercase font-alata tracking-[0.3em] text-cyan-300">
            {t.story.eyebrow}
          </span>
        </div>

        {/* 2-Column High-Contrast Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Film Grain & Luxury Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden rounded-2xl aspect-[4/5] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
                alt="Freediving instructor descending in Dahab Blue Hole"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent opacity-80" />
              
              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="text-xs font-alata tracking-widest text-cyan-400 uppercase mb-1">
                  {t.story.established}
                </div>
                <div className="font-bebas text-2xl text-white tracking-wide">
                  &ldquo;{t.story.quote}&rdquo;
                </div>
                <div className="text-xs font-alata text-slate-400 mt-1">
                  — {t.story.quoteAuthor}
                </div>
              </div>
            </div>

            {/* Subtle decorative offset border */}
            <div className="absolute -inset-4 border border-cyan-500/20 rounded-3xl -z-10 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: High-End Editorial Copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-cyan-400 text-xs uppercase tracking-[0.3em] font-alata font-normal block">
                {t.story.subheading}
              </span>
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white tracking-[0.05em]">
                {t.story.titleLine1} <br />
                <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">{t.story.titleLine2}</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-300 font-alata font-normal leading-relaxed">
              {t.story.desc1}
            </p>

            <p className="text-base text-slate-400 font-alata font-normal leading-relaxed">
              {t.story.desc2}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{t.story.ratioTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                  {t.story.ratioDesc}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{t.story.itcTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                  {t.story.itcDesc}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#courses"
                className="btn-luxury text-white text-center font-alata uppercase tracking-widest text-xs"
              >
                {t.story.ctaCourses}
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-4 rounded-full border border-white/10 hover:border-cyan-400 text-xs font-alata uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all text-center"
              >
                {t.story.ctaRetreat}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
