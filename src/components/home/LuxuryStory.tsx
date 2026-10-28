import { Award, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { InstructorSitePerspectives, PhilosophyCarousel } from './PhilosophyCarousel';
import { StoryScrollWordReveal } from '../story/StoryScrollWordReveal';

interface LuxuryStoryProps {
  onOpenBooking: () => void;
  revealText?: boolean;
}

export function LuxuryStory({ onOpenBooking, revealText = false }: LuxuryStoryProps) {
  const { t } = useLanguage();

  return (
    <section id="philosophy" className="relative py-32 md:py-44 px-6 bg-transparent overflow-hidden border-t border-white/5">
      
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* 2-Column High-Contrast Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Five-image school and training carousel */}
          <div className="lg:col-span-6 relative">
            <PhilosophyCarousel revealText={revealText} />
          </div>

          {/* Right Column: High-End Editorial Copy */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white tracking-[0.05em]">
                {revealText ? <StoryScrollWordReveal text={t.story.titleLine1} /> : t.story.titleLine1} <br />
                <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">
                  {revealText ? <StoryScrollWordReveal text={t.story.titleLine2} /> : t.story.titleLine2}
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-300 font-alata font-normal leading-relaxed">
              {revealText ? <StoryScrollWordReveal text={t.story.desc1} /> : t.story.desc1}
            </p>

            <p className="text-base text-slate-400 font-alata font-normal leading-relaxed">
              {revealText ? <StoryScrollWordReveal text={t.story.desc2} /> : t.story.desc2}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{revealText ? <StoryScrollWordReveal text={t.story.ratioTitle} /> : t.story.ratioTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                    {revealText ? <StoryScrollWordReveal text={t.story.ratioDesc} /> : t.story.ratioDesc}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-alata text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{revealText ? <StoryScrollWordReveal text={t.story.itcTitle} /> : t.story.itcTitle}</span>
                </div>
                <p className="text-xs font-alata text-slate-400 leading-relaxed">
                    {revealText ? <StoryScrollWordReveal text={t.story.itcDesc} /> : t.story.itcDesc}
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#courses"
                className="btn-luxury text-white text-center font-alata uppercase tracking-widest text-xs"
              >
                {revealText ? <StoryScrollWordReveal text={t.story.ctaCourses} /> : t.story.ctaCourses}
              </a>
              <button
                onClick={onOpenBooking}
                className="px-6 py-4 rounded-full border border-white/10 hover:border-cyan-400 text-xs font-alata uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all text-center"
              >
                {revealText ? <StoryScrollWordReveal text={t.story.ctaRetreat} /> : t.story.ctaRetreat}
              </button>
            </div>

          </div>
        </div>

        <InstructorSitePerspectives revealText={revealText} />
      </div>
    </section>
  );
}
