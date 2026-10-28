import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Compass, MessageSquare, Calendar } from 'lucide-react';
import { PageType } from '../../types';
import { DahabBlueHoleSection } from '../home/DahabBlueHoleSection';
import { LuxuryStory } from '../home/LuxuryStory';
import { StoryScrollWordReveal } from './StoryScrollWordReveal';

// ============================================================================
// CONFIGURATION & MEDIA MANIFEST (EDIT CONTENT, PATHS, QUOTES & CAPTIONS HERE)
// ============================================================================

export interface FounderVideoConfig {
  src: string;
  poster?: string;
}

export interface FounderConfig {
  id: string;
  name: string;
  role: string;
  bio: string;
  // Primary filename from user's attached media manifest
  image: string;
  altImageCandidates?: string[];
  extraPhotos: string[];
  video?: FounderVideoConfig;
  // Quotes and fun facts: empty by default; block is hidden when empty
  quote: string;
  funFact: string;
}

export interface GalleryItemConfig {
  src: string;
  caption: string;
  alt?: string;
}

export const OUR_STORY_CONFIG = {
  // Page meta
  pageTitle: 'Our Story – Freedive Dahab',

  // 1) INTRO SECTION (verbatim from brief)
  intro: {
    paragraphs: [
      'Discover why Freedive Dahab is a world-renowned destination for freediving enthusiasts of all levels. Founded in 2003, Freedive Dahab holds the title of being one of the very first freediving centres globally and the first SSI Freediving Instructor Training Center in the world since 2010.',
      'Located near the beautiful Lighthouse Bay at the heart of Dahab, our centre offers more than just training. With a spacious air-conditioned classroom, a large equipment room, a sunny terrace, and beachside showers, Freedive Dahab is built for comfort and community. Whether you\'re joining us in summer or winter, you\'ll feel right at home, with free Wi-Fi to keep you connected.',
      'We offer a variety of immersive events and packages, from beginner levels to professional instructor training, specialized private coaching, and even competitions. Our welcoming environment inspires thousands of freedivers every year to deepen their connection with the ocean, improve their skills, and take on new challenges.',
    ],
  },

  // 3) MEET OUR PIONEERS (verbatim from brief)
  foundersSection: {
    title: 'Meet Our Pioneers',
    subtitle: 'Freedive Dahab was born out of passion, experience, and a vision shared by three incredible pioneers of freediving.',
    founders: [
      {
        id: 'lotta-ericson',
        name: 'Lotta Ericson',
        role: 'Pioneer & School Director',
        bio: "Lotta Ericson is not only the heart behind Freedive Dahab but also a living legend in the sport. As a former freediving world record holder and developer of freediving education systems, Lotta launched Freedive Dahab in 2003. Under her leadership, it became the world's first SSI Freediving Instructor Training Center, certifying thousands of freedivers across all levels. Lotta's vision continues to inspire a global community united by love and respect for the ocean.",
        image: '/founders/lotta-ericson.jpg',
        altImageCandidates: [
          '/founders/lotta-ericson.jpg',
        ],
        extraPhotos: [],
        video: undefined,
        quote: '',
        funFact: '',
      },
      {
        id: 'linda-paganelli',
        name: 'Linda Paganelli',
        role: 'Elite Freediver & Storyteller',
        bio: "Linda Paganelli, our Italian freediving champion, has been competing since 2005 and made a powerful comeback in 2022 by winning a silver medal at the CMAS Freediving World Championship. As the oldest woman competing at elite levels, Linda defies limits every day. Her passion for training hard and sharing inspiring stories proves it's never too late to follow your dreams. Linda's journey motivates freedivers of all ages to pursue personal excellence and embrace adventure.",
        image: '/founders/linda-paganelli.webp',
        altImageCandidates: [
          '/founders/linda-paganelli.webp',
        ],
        extraPhotos: [],
        video: undefined,
        quote: '',
        funFact: '',
      },
      {
        id: 'waleed-ghatas',
        name: 'Waleed Ghatas',
        role: 'Instructor Trainer & Ocean Advocate',
        bio: "Waleed Ghatas found his calling in Dahab's Blue Hole, captivated by the ocean's peace and beauty. Starting freediving in 2012 and teaching since 2015, Waleed has certified hundreds of recreational and professional freedivers, including national record holders. His dedication is to make freediving in Dahab not just a sport, but a soothing and transformative experience for body and mind. Waleed's coaching empowers countless divers to connect deeply with the underwater world.",
        image: '/founders/waleed-ghatas.jpg',
        altImageCandidates: [
          '/founders/waleed-ghatas.jpg',
        ],
        extraPhotos: [],
        video: undefined,
        quote: '',
        funFact: '',
      },
    ] as FounderConfig[],
  },

  // 4) GALLERY (one array of {src, caption} at the top of the file)
  gallery: [
    {
      src: 'hero-lighthouse-bay.jpg',
      caption: 'Lighthouse Bay coral reef and training sanctuary',
      alt: 'Lighthouse Bay Dahab',
    },
    {
      src: '/hero-lighthouse-bay.jpg',
      caption: 'Freedive Dahab sunny oceanfront terrace and briefing area',
      alt: 'Sunny terrace Dahab',
    },
    {
      src: '/hero-freediver.jpg',
      caption: 'Line training in the crystalline depths of Dahab',
      alt: 'Freediver descending in Dahab',
    },
    {
      src: '/hero-freediver-notube.jpg',
      caption: 'Weightless exploration along the Red Sea reef wall',
      alt: 'Weightless reef exploration',
    },
    {
      src: '/founders/lotta-ericson.jpg',
      caption: 'Lotta Ericson instructing in the Red Sea',
      alt: 'Lotta Ericson freediving',
    },
    {
      src: '/founders/linda-paganelli.webp',
      caption: 'Linda Paganelli celebrating international championship milestones',
      alt: 'Linda Paganelli freediving',
    },
    {
      src: '/founders/waleed-ghatas.jpg',
      caption: 'Waleed Ghatas coaching on the training line',
      alt: 'Waleed Ghatas training buoy',
    },
  ] as GalleryItemConfig[],

  // 5) CALL TO ACTION (verbatim from brief)
  cta: {
    title: 'Dive Deeper',
    line: "Whether you're a beginner or aiming to become an instructor, our school offers a welcoming community, expert guidance, and a place where your freediving dreams can take flight.",
    buttons: [
      { label: 'Courses & Packages', target: 'courses' as const },
      { label: 'Events', target: 'calendar' as const },
      { label: 'Contact Us', action: 'booking' as const },
    ],
  },
};

// ============================================================================
// RESILIENT IMAGE COMPONENT (Hides completely if file is missing)
// ============================================================================

interface SmartImageProps {
  primarySrc: string;
  fallbackCandidates?: string[];
  alt: string;
  className?: string;
  onMissing?: () => void;
  loading?: 'lazy' | 'eager';
}

function SmartImage({
  primarySrc,
  fallbackCandidates = [],
  alt,
  className = '',
  onMissing,
  loading = 'lazy',
}: SmartImageProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Normalize candidate sources
  const allCandidates = [
    primarySrc,
    ...fallbackCandidates,
  ].filter(Boolean);

  const currentSrc = allCandidates[candidateIndex];

  const handleError = () => {
    if (candidateIndex + 1 < allCandidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
      if (onMissing) {
        onMissing();
      }
    }
  };

  if (hasFailedAll || !currentSrc) {
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={`object-cover ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

// ============================================================================
// MAIN PAGE COMPONENT: OUR STORY
// ============================================================================

interface OurStoryPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
}

export function OurStoryPage({ onNavigate, onOpenBooking }: OurStoryPageProps) {
  // Founder popup state
  const [activeFounder, setActiveFounder] = useState<FounderConfig | null>(null);

  // Gallery lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Founder Popup (Esc) and Lightbox (Esc, Left, Right)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeFounder) {
        if (e.key === 'Escape') {
          setActiveFounder(null);
        }
      }

      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : OUR_STORY_CONFIG.gallery.length - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null && prev < OUR_STORY_CONFIG.gallery.length - 1 ? prev + 1 : 0));
        }
      }
    },
    [activeFounder, lightboxIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Gallery items state (to automatically hide missing images)
  const [missingGalleryIndices, setMissingGalleryIndices] = useState<Record<number, boolean>>({});

  const handleGalleryMissing = (index: number) => {
    setMissingGalleryIndices((prev) => ({ ...prev, [index]: true }));
  };

  const visibleGallery = OUR_STORY_CONFIG.gallery
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((_, idx) => !missingGalleryIndices[idx]);

  return (
    <div className="relative min-h-screen bg-transparent text-foam selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ==================================================================== */}
      {/* 3) MEET OUR FOUNDERS: 3 Cards with Portrait, Name, Title & Bio      */}
      {/* ==================================================================== */}
      <section
        id="pioneers"
        className="ocean-surface relative scroll-mt-20 border-b border-white/5 px-6 py-24 sm:py-32"
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--pioneer-spotlight-x', `${event.clientX - bounds.left}px`);
          event.currentTarget.style.setProperty('--pioneer-spotlight-y', `${event.clientY - bounds.top}px`);
          event.currentTarget.style.setProperty('--pioneer-spotlight-opacity', '1');
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--pioneer-spotlight-opacity', '0');
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--pioneer-spotlight-opacity,0)] transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(560px circle at var(--pioneer-spotlight-x, 50%) var(--pioneer-spotlight-y, 50%), rgba(34, 98, 140, 0.3), transparent 72%)',
          }}
        />
        <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-alata tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              <span>Visionaries of the Blue</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight">
              {OUR_STORY_CONFIG.foundersSection.title}
            </h2>
            <p className="text-slate-300 font-alata font-normal text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {OUR_STORY_CONFIG.foundersSection.subtitle}
            </p>
          </div>

          {/* Three cards side-by-side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {OUR_STORY_CONFIG.foundersSection.founders.map((founder) => (
              <FounderCard
                key={founder.id}
                founder={founder}
                onSelect={() => setActiveFounder(founder)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 2.5) PHILOSOPHY & 24-YEAR STATISTICS (moved from the home page) */}
      <LuxuryStory onOpenBooking={onOpenBooking} revealText />

      <DahabBlueHoleSection revealText />

      {/* ==================================================================== */}
      {/* 2) INTRO SECTION: Verbatim narrative text from the brief              */}
      {/* ==================================================================== */}
      <section id="story-intro" className="ocean-surface relative border-b border-white/5 px-6 py-20 sm:py-28">
        <div className="absolute inset-0 architectural-grid-fine opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8 text-left">

          <div className="flex items-center gap-3 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400 mb-4">
            <span className="w-8 h-px bg-cyan-400" />
            <span><StoryScrollWordReveal text="Our Heritage & Community" /></span>
          </div>

          <div className="space-y-6 text-slate-300 font-alata font-normal text-base sm:text-lg md:text-xl leading-relaxed">
            {OUR_STORY_CONFIG.intro.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'text-white font-medium text-lg sm:text-xl md:text-2xl leading-relaxed' : ''}
              >
                <StoryScrollWordReveal text={p} />
              </p>
            ))}
          </div>

          {/* Highlight stat tags */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <div className="font-bebas text-3xl sm:text-4xl text-cyan-300"><StoryScrollWordReveal text="2003" /></div>
              <div className="text-[11px] font-alata text-slate-400 uppercase tracking-wider mt-1"><StoryScrollWordReveal text="Established in Dahab" /></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <div className="font-bebas text-3xl sm:text-4xl text-cyan-300"><StoryScrollWordReveal text="#1" /></div>
              <div className="text-[11px] font-alata text-slate-400 uppercase tracking-wider mt-1"><StoryScrollWordReveal text="1st SSI ITC Globally" /></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <div className="font-bebas text-3xl sm:text-4xl text-cyan-300"><StoryScrollWordReveal text="2010" /></div>
              <div className="text-[11px] font-alata text-slate-400 uppercase tracking-wider mt-1"><StoryScrollWordReveal text="Diamond ITC Status" /></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
              <div className="font-bebas text-3xl sm:text-4xl text-cyan-300"><StoryScrollWordReveal text="1000s" /></div>
              <div className="text-[11px] font-alata text-slate-400 uppercase tracking-wider mt-1"><StoryScrollWordReveal text="Divers Certified" /></div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5) CALL TO ACTION: "Dive Deeper" with 3 buttons                     */}
      {/* ==================================================================== */}
      <section className="ocean-surface relative select-none overflow-hidden px-6 py-28 sm:py-36">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/[0.08] blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-[0.05em] leading-tight">
            <StoryScrollWordReveal text={OUR_STORY_CONFIG.cta.title} />
          </h2>

          <p className="text-slate-300 font-alata text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            <StoryScrollWordReveal text={OUR_STORY_CONFIG.cta.line} />
          </p>

          {/* Three buttons styled exactly like existing site's buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Button 1: Courses & Packages */}
            <button
              onClick={() => onNavigate('courses')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#0E3453] font-semibold text-xs sm:text-sm font-alata tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] cursor-pointer flex items-center justify-center gap-2 hover:scale-105 duration-200"
            >
              <Compass className="w-4 h-4" />
              <span><StoryScrollWordReveal text="Courses & Packages" /></span>
            </button>

            {/* Button 2: Events */}
            <button
              onClick={() => onNavigate('calendar')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-cyan-400 font-alata text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 duration-200"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span><StoryScrollWordReveal text="Events" /></span>
            </button>

            {/* Button 3: Contact Us */}
            <button
              onClick={() => onOpenBooking()}
              className="fd-button flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-alata text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 sm:w-auto sm:text-sm"
            >
              <MessageSquare className="w-4 h-4 text-slate-800" />
              <span><StoryScrollWordReveal text="Contact Us" /></span>
            </button>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SIMPLE POPUP FOR FOUNDER EXTRA DETAILS & MEDIA                       */}
      {/* ==================================================================== */}
      {activeFounder && (
        <FounderModal
          founder={activeFounder}
          onClose={() => setActiveFounder(null)}
        />
      )}

      {/* ==================================================================== */}
      {/* SIMPLE LIGHTBOX FOR GALLERY                                          */}
      {/* ==================================================================== */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={OUR_STORY_CONFIG.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}

    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface FounderCardProps {
  founder: FounderConfig;
  onSelect: () => void;
}

function FounderCard({ founder, onSelect }: FounderCardProps) {
  const [imageHidden, setImageHidden] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const bioId = `founder-bio-${founder.id}`;

  return (
    <article className="story-pioneer-card-3d">
      <div className={`story-pioneer-card-3d__scene group${isFlipped ? ' is-flipped' : ''}`}>
        <div className="story-pioneer-card-3d__inner">
          <div
            className="story-pioneer-card-3d__face story-pioneer-card-3d__front"
            aria-hidden={isFlipped}
            inert={isFlipped}
          >
            {!imageHidden ? (
              <>
                <SmartImage
                  primarySrc={founder.image}
                  fallbackCandidates={founder.altImageCandidates}
                  alt={founder.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  onMissing={() => setImageHidden(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </>
            ) : (
              <div className="flex h-full flex-col justify-end bg-[#0A2943] p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10">
                  <span className="font-bebas text-2xl text-cyan-300">
                    {founder.name.split(' ').map((name) => name[0]).join('')}
                  </span>
                </div>
              </div>
            )}

            <div className="absolute bottom-16 left-5 right-5">
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {founder.role}
              </span>
              <h3 className="font-bebas text-3xl leading-none tracking-wide text-white sm:text-4xl">
                {founder.name}
              </h3>
            </div>
          </div>

          <div
            id={bioId}
            className="story-pioneer-card-3d__face story-pioneer-card-3d__back"
            aria-hidden={!isFlipped}
            inert={!isFlipped}
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {founder.role}
            </span>
            <h3 className="font-bebas text-3xl leading-tight text-white">{founder.name}</h3>
            <p className="text-sm leading-relaxed text-slate-200">{founder.bio}</p>
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-[#89ffff] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>View Profile &amp; Media</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFlipped((flipped) => !flipped)}
          className="story-pioneer-card-3d__toggle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-expanded={isFlipped}
          aria-controls={bioId}
          aria-label={`${isFlipped ? 'Show portrait of' : 'Read biography of'} ${founder.name}`}
        >
          {isFlipped ? 'View portrait' : 'Read biography'}
          <ChevronRight
            className={`h-4 w-4 transition-transform${isFlipped ? ' rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}

interface FounderModalProps {
  founder: FounderConfig;
  onClose: () => void;
}

function FounderModal({ founder, onClose }: FounderModalProps) {
  // Check if founder has quotes, fun facts, videos, or extra photos
  const hasQuote = founder.quote && founder.quote.trim().length > 0;
  const hasFunFact = founder.funFact && founder.funFact.trim().length > 0;
  const hasVideo = Boolean(founder.video && founder.video.src);
  const hasExtraPhotos = founder.extraPhotos && founder.extraPhotos.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${founder.name} Profile`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0E3453] border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Portrait */}
        <div className="flex items-center gap-4 sm:gap-6 pr-10 pb-2 border-b border-white/10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shrink-0">
            <SmartImage
              primarySrc={founder.image}
              fallbackCandidates={founder.altImageCandidates}
              alt={founder.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block">
              {founder.role}
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              {founder.name}
            </h3>
          </div>
        </div>

        {/* Verbatim Bio */}
        <p className="text-slate-300 font-alata text-sm sm:text-base leading-relaxed">
          {founder.bio}
        </p>

        {/* Native Video (if file exists) */}
        {hasVideo && founder.video && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Feature Video
            </span>
            <div className="overflow-hidden rounded-xl bg-black border border-white/10">
              <video
                controls
                preload="metadata"
                poster={founder.video.poster}
                className="w-full aspect-video object-cover"
              >
                <source src={founder.video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Extra Photos (if any configured) */}
        {hasExtraPhotos && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Photo Archive
            </span>
            <div className="grid grid-cols-2 gap-3">
              {founder.extraPhotos.map((photo, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <SmartImage
                    primarySrc={photo}
                    alt={`${founder.name} extra photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote Block (strictly hidden when empty) */}
        {hasQuote && (
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm font-alata italic">
            &ldquo;{founder.quote}&rdquo;
          </div>
        )}

        {/* Fun Fact Block (strictly hidden when empty) */}
        {hasFunFact && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-alata">
            <span className="font-semibold text-cyan-300">Fun Fact: </span>
            {founder.funFact}
          </div>
        )}

        {/* Footer Close Action */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

interface GalleryThumbnailProps {
  item: GalleryItemConfig;
  index: number;
  onMissing: () => void;
  onClick: () => void;
}

function GalleryThumbnail({ item, index, onMissing, onClick }: GalleryThumbnailProps) {
  const [hidden, setHidden] = useState(false);

  const handleMissingImage = () => {
    setHidden(true);
    onMissing();
  };

  if (hidden) return null;

  return (
    <figure className="group relative flex flex-col rounded-xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg">
      <button
        onClick={onClick}
        type="button"
        className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative block text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        title="Click to expand photo"
        aria-label={`Open photo ${index + 1}: ${item.caption}`}
      >
        <SmartImage
          primarySrc={item.src}
          alt={item.alt || item.caption}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
          onMissing={handleMissingImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <figcaption className="p-3.5 bg-slate-900/80 border-t border-white/5">
        <p className="text-xs font-alata text-slate-300 line-clamp-2">
          {item.caption || 'Add caption'}
        </p>
      </figcaption>
    </figure>
  );
}

interface GalleryLightboxProps {
  items: GalleryItemConfig[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function GalleryLightbox({ items, currentIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  };

  if (!currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar with Counter and Close Button */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 px-2 sm:px-6">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-300 bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Frame */}
      <div
        className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl border border-white/10 max-h-[70vh] shadow-2xl">
          <SmartImage
            primarySrc={currentItem.src}
            alt={currentItem.alt || currentItem.caption}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>

        {/* Caption */}
        <p className="mt-4 text-center text-sm font-alata text-slate-300 max-w-xl">
          {currentItem.caption}
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
}
