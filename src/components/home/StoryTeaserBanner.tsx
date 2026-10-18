import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, MessageSquareQuote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageType } from '../../types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryTeaserBannerProps {
  onNavigate: (page: PageType) => void;
  onViewReviews: () => void;
}

export function StoryTeaserBanner({ onNavigate, onViewReviews }: StoryTeaserBannerProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(() => new Set());

  // Motion: perpetual slow "underwater drift" zoom on portraits.
  // (Card entrance uses CSS animate-in classes so cards can never be left invisible.)
  useEffect(() => {
    const scope = gridRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      scope.querySelectorAll<HTMLElement>('.pioneer-img').forEach((img, i) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.08,
            duration: 9 + i * 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  const founders = [
    {
      name: 'Lotta Ericson',
      role: 'Pioneer & School Director',
      highlight: 'Former World Record Holder & SSI ITC Pioneer',
      info: 'Former freediving world record holder and architect of modern freediving education. Lotta launched Freedive Dahab in 2003 and led it to become the world\'s first SSI Freediving Instructor Training Center.',
      image: '/founders/lotta-ericson.jpg',
      alt: 'Lotta Ericson - Pioneer of Freedive Dahab',
    },
    {
      name: 'Linda Paganelli',
      role: 'Elite Freediver & Storyteller',
      highlight: 'CMAS Silver Medalist & Italian Champion',
      info: 'Italian freediving champion competing since 2005. Linda returned in 2022 to win CMAS World Championship silver — living proof that it is never too late to follow your dreams.',
      image: '/founders/linda-paganelli.webp',
      alt: 'Linda Paganelli - Elite Freediver & Storyteller',
    },
    {
      name: 'Waleed Ghatas',
      role: 'Instructor Trainer & Ocean Advocate',
      highlight: 'Blue Hole Mentor & Record Coach',
      info: 'Drawn to the peace of Dahab\'s Blue Hole, Waleed has taught since 2015 and certified hundreds of recreational and professional freedivers — including national record holders.',
      image: '/founders/waleed-ghatas.jpg',
      alt: 'Waleed Ghatas - Instructor Trainer & Ocean Advocate',
    },
  ];

  return (
    <section id="story" className="relative py-24 sm:py-32 px-6 bg-transparent border-t border-white/5 overflow-hidden select-none">
      
      {/* Background Architectural Grid and Ambient Lighting */}
      <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/[0.07] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-sky-600/[0.05] blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Top Header & Copy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-alata tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Sanctuary Heritage • Est. 2003</span>
            </div>

            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-[1.05]">
              Our Story — <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">Meet Our Pioneers</span>
            </h2>

            <p className="text-slate-300 font-alata font-normal text-base sm:text-lg leading-relaxed max-w-2xl">
              Freedive Dahab was born out of passion, experience, and a vision shared by three incredible pioneers of freediving. Discover why our Lighthouse Bay school is world-renowned for freediving excellence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('story')}
              className="fd-button flex items-center gap-2 rounded-full px-7 py-3.5 font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 sm:text-sm"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onViewReviews}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 py-3.5 font-alata text-xs font-semibold text-white transition-colors hover:border-cyan-200 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
            >
              <MessageSquareQuote className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              Read diver reviews
            </button>
          </div>
        </div>

        {/* 3 Pioneer Cards — dynamic, informative & motional */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, idx) => {
            const isFlipped = flippedCards.has(founder.name);
            const bioId = `pioneer-bio-${idx}`;
            const toggleCard = () => {
              setFlippedCards((current) => {
                const next = new Set(current);
                if (next.has(founder.name)) next.delete(founder.name);
                else next.add(founder.name);
                return next;
              });
            };

            return (
              <article
                key={founder.name}
                style={{ animationDelay: `${idx * 140}ms` }}
                className="pioneer-card-outer"
              >
                <div className={`pioneer-card-flip${isFlipped ? ' is-flipped' : ''}`}>
                  <div className="pioneer-card-inner">
                    <div
                      className="pioneer-card-front relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40"
                      aria-hidden={isFlipped}
                      inert={isFlipped}
                    >
                      <img
                        src={founder.image}
                        alt={founder.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="pioneer-img h-full w-full rounded-2xl object-cover will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-85 transition-opacity duration-500" />
                      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Pioneer
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                          {founder.role}
                        </span>
                        <h3 className="font-bebas text-3xl leading-none tracking-wide text-white sm:text-4xl">
                          {founder.name}
                        </h3>
                      </div>
                    </div>

                    <div
                      id={bioId}
                      className="pioneer-card-back rounded-2xl border border-white/10 bg-[#0A2943] p-6"
                      aria-hidden={!isFlipped}
                      inert={!isFlipped}
                    >
                      <div className="space-y-4">
                        <h3 className="font-bebas text-2xl text-white">{founder.name}</h3>
                        <p className="text-sm leading-relaxed text-slate-200">{founder.info}</p>
                        <p className="text-xs font-semibold text-[#89ffff]">{founder.highlight}</p>
                        <button
                          type="button"
                          onClick={() => onNavigate('story')}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Explore our story
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="pioneer-card-toggle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    onClick={toggleCard}
                    aria-expanded={isFlipped}
                    aria-controls={bioId}
                    aria-label={`${isFlipped ? 'Show portrait of' : 'Read biography of'} ${founder.name}`}
                  >
                    {isFlipped ? 'View portrait' : 'Read biography'}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform${isFlipped ? ' rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
