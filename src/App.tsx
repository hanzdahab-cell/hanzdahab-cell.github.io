import { useState, useEffect } from 'react';
import { Cursor } from './components/ui/Cursor';
import { SiteHeader } from './nav/SiteHeader';
import { PageHeader } from './components/ui/PageHeader';
import { Scroller } from './components/ui/Scroller';
import { HeroSurface } from './components/home/HeroSurface';
import { CoralDepthBackground } from './components/home/CoralDepthBackground';
import { DahabBlueHoleSection } from './components/home/DahabBlueHoleSection';
import { DescentStats } from './components/home/DescentStats';
import { SSICertificates } from './components/ssi/SSICertificates';
import { CoursesSection } from './components/courses/CoursesSection';
import { TrainingSection } from './components/training/TrainingSection';
import { CalendarSection } from './components/calendar/CalendarSection';
import { AccommodationSection } from './components/accommodation/AccommodationSection';
import { PackagesSection } from './components/packages/PackagesSection';
import { DepthShowcase } from './components/home/DepthShowcase';
import { ActivitiesSection } from './components/activities/ActivitiesSection';
import { BlogSection } from './components/blog/BlogSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { FAQSection } from './components/faq/FAQSection';
import { Footer } from './components/ui/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { ChatWidget } from './components/chat/ChatWidget';
import { CookieConsent } from './components/ui/CookieConsent';
import { EventDetailPage } from './components/calendar/EventDetailPage';
import { CourseDetailPage } from './components/courses/CourseDetailPage';
import { OurStoryPage } from './components/story/OurStoryPage';
import { StoryHeroCarousel } from './components/story/StoryHeroCarousel';
import { OfferingDetailPage } from './components/catalog/OfferingDetailPage';
import { AccommodationBookingModal } from './components/booking/AccommodationBookingModal';
import { PhotoParallaxGallery } from './components/ui/HorizontalParallaxGallery/PhotoParallaxGallery';
import { scrollPageElementIntoView, scrollPageTo, useSmoothScroll } from './utils/useSmoothScroll';
import { PageType, EventTypeId } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'EGP'>('EUR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingOfferingId, setBookingOfferingId] = useState<string | undefined>();
  const [isStayBookingOpen, setIsStayBookingOpen] = useState(false);
  const [stayRoomId, setStayRoomId] = useState('lighthouse-room');

  // Determine initial page from URL hash, default to 'home'
  const validPages = ['home', 'courses', 'training', 'experience', 'accommodation', 'packages', 'blog', 'faq', 'calendar', 'story'];

  const getInitialPage = (): PageType => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (
        validPages.includes(hash) ||
        hash.startsWith('event-') ||
        hash.startsWith('course-') ||
        hash.startsWith('package-') ||
        hash.startsWith('room-') ||
        hash.startsWith('activity-')
      ) {
        return hash as PageType;
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);

  // Initialize smooth inertia scrolling
  useSmoothScroll();

  const scrollToSurface = () => {
    scrollPageTo(0, 'auto');
  };

  // Listen to browser forward/backward buttons and external hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (
        validPages.includes(hash) ||
        hash.startsWith('event-') ||
        hash.startsWith('course-') ||
        hash.startsWith('package-') ||
        hash.startsWith('room-') ||
        hash.startsWith('activity-')
      ) {
        setCurrentPage(hash as PageType);
        scrollToSurface();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    scrollToSurface();
  };

  const scrollToSection = (page: PageType, sectionId: string) => {
    const scroll = () => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      scrollPageElementIntoView(target, 96);
    };

    if (currentPage !== page) {
      navigateTo(page);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.setTimeout(scroll, prefersReducedMotion ? 0 : 950);
      return;
    }
    scroll();
  };

  const handleOpenBooking = (offeringId?: string) => {
    setBookingOfferingId(offeringId);
    setIsBookingOpen(true);
  };

  const handleBookStay = (roomId: string) => {
    setStayRoomId(roomId);
    setIsStayBookingOpen(true);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <div className="relative min-h-screen bg-transparent text-foam selection:bg-cyan-500/30 selection:text-cyan-200">
        
        <CoralDepthBackground />

        {/* Precision Luxury Pointer Cursor */}
        <Cursor />

        {/* SSI Mega Menu Navigation Header with Individual Page Links */}
        <SiteHeader
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenBooking={handleOpenBooking}
          onNavigateToSection={scrollToSection}
        />

        <Scroller
          id="site-page-scroll"
          overflow="y"
          height="100svh"
          ariaLabel="Website pages"
          className="site-page-scroller"
        >
          <>
        <main className="relative z-10">
        
        {/* ========================================================= */}
        {/* 1. INDIVIDUAL PAGE: HOME SANCTUARY                        */}
        {/* ========================================================= */}
        {currentPage === 'home' && (
          <div className="page-dive-in">
            {/* 1. HERO: Dahab, Freedive Dahab, and the founding year */}
            <HeroSurface onNavigate={navigateTo} />

            {/* Immersive Coral Depth Environment (The depth of the corals across all home sections) */}
            <div className="relative">
              <div className="relative z-10">
                {/* 3. Dahab & the Blue Hole */}
                <DahabBlueHoleSection />

                {/* Diver Voices & Testimonials */}
                <TestimonialsSection />

                {/* Freedive Dahab legacy and milestones */}
                <DescentStats onNavigate={navigateTo} />

                <SSICertificates variant="home" />

              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. INDIVIDUAL PAGE: SSI COURSES                           */}
        {/* ========================================================= */}
        {currentPage === 'courses' && (
          <div className="page-dive-in">
            <CoursesSection
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
              currency={currency}
            />

            <FAQSection />
            <PhotoParallaxGallery
              label="Freedive Dahab courses and specialties photos"
              photos={[
                {
                  src: '/images/detail-galleries/courses/ssi-level-1-blue-hole.webp',
                  alt: 'Freediver training in the Blue Hole at Dahab',
                },
                {
                  src: '/images/detail-galleries/courses/ssi-level-2-level2-main.jpg',
                  alt: 'Freediving course session in the Red Sea',
                },
                {
                  src: '/images/detail-galleries/courses/monofin-course.jpg',
                  alt: 'Freediver practising monofin technique',
                },
                {
                  src: '/images/detail-galleries/courses/training-techniques-dahab.webp',
                  alt: 'Freediving training techniques in Dahab',
                },
                {
                  src: '/images/detail-galleries/courses/ssi-instructor-freediving.jpg',
                  alt: 'Freediving instructor guiding a student',
                },
              ]}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. INDIVIDUAL PAGE: FREEDIVING TRAINING                   */}
        {/* ========================================================= */}
        {currentPage === 'training' && (
          <div className="page-dive-in">
            <TrainingSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
              onNavigate={navigateTo}
            />

            <DepthShowcase
              onOpenBooking={handleOpenBooking}
            />
            <PhotoParallaxGallery
              label="Freedive Dahab training photos"
              photos={[
                {
                  src: '/images/story-carousel/training-line.jpg',
                  alt: 'Freediver training beside a line in the Red Sea',
                },
                {
                  src: '/images/story-carousel/blue-hole-freediver.jpg',
                  alt: 'Freediver descending on a training line at the Blue Hole',
                },
                {
                  src: '/images/story-carousel/surface-session.jpg',
                  alt: 'Freedivers practising together in calm water',
                },
                {
                  src: '/images/story-carousel/training-buoy.jpg',
                  alt: 'Freediving training buoy on the Dahab reef',
                },
                {
                  src: '/images/dahab-story/line-coaching.jpg',
                  alt: 'Instructor coaching a freediver on the line',
                },
              ]}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. INDIVIDUAL PAGE: ACCOMMODATION                         */}
        {/* ========================================================= */}
        {currentPage === 'accommodation' && (
          <div className="page-dive-in">
            <PageHeader
              title="Freedive Dahab Accommodation"
              subtitle="We offer packages with accommodation and freediving courses and/or training. Please let us know your needs, and we will prepare a tailor-made quote for you."
              badge=""
              currentPage="accommodation"
              onNavigate={navigateTo}
              compact
              alignContentStart
              backgroundPosition="center 42%"
              backgroundImages={[
                '/images/accommodation/blue-hole/hero-sunset.webp',
              ]}
            />

            <AccommodationSection
              onBookStay={handleBookStay}
              currency={currency}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. INDIVIDUAL PAGE: EXPERIENCES PACKAGES                  */}
        {/* ========================================================= */}
        {currentPage === 'packages' && (
          <div className="page-dive-in">
            <PackagesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. INDIVIDUAL PAGE: CALENDAR SCHEDULE                     */}
        {/* ========================================================= */}
        {currentPage === 'calendar' && (
          <div className="page-dive-in">
            <PageHeader
              title="FREEDIVE DAHAB LIVE CALENDER"
              subtitle="Planning your Dahab freediving experience? Here's the calendar for our scheduled events. We run all other courses all year round on request, just let us know your dates!"
              badge="November 2026 – April 2027"
              currentPage="calendar"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Custom Date Request"
              compact
              subtitleFontFamily="system-ui, sans-serif"
              backgroundImages={['/images/calendar-hero-dahab.webp']}
            />

            <CalendarSection
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
            />

          </div>
        )}

        {/* ========================================================= */}
        {/* 7. INDIVIDUAL PAGE: EXPERIENCE & SAFARIS                  */}
        {/* ========================================================= */}
        {currentPage === 'experience' && (
          <div className="page-dive-in">
            <ActivitiesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
              onNavigate={navigateTo}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. INDIVIDUAL PAGE: BLOG & JOURNAL                        */}
        {/* ========================================================= */}
        {currentPage === 'blog' && (
          <div className="page-dive-in">
            <PageHeader
              title="Freediving Journal & Archive"
              subtitle="Physiological science, deep equalization mechanics, equipment breakdowns, and dispatches from the Red Sea depths."
              badge="Dahab Deep Archive"
              currentPage="blog"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Join an Academy"
            />

            <BlogSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 9. INDIVIDUAL PAGE: FAQ & LOGISTICS                       */}
        {/* ========================================================= */}
        {currentPage === 'faq' && (
          <div className="page-dive-in">
            <PageHeader
              title="Frequently Answered Questions"
              subtitle="Everything you need to know about traveling to Dahab, medical clearance, beginner prerequisites, and safety standards."
              badge="Practical Advice & Logistics"
              currentPage="faq"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Ask an Instructor"
            />

            <FAQSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 10. INDIVIDUAL PAGES: DEDICATED SCHEDULED EVENT DETAIL    */}
        {/* ========================================================= */}
        {currentPage.startsWith('event-') && (
          <div className="page-dive-in">
            <EventDetailPage
              eventTypeId={currentPage.replace('event-', '') as EventTypeId}
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 11. INDIVIDUAL PAGES: DEDICATED COURSE DETAIL             */}
        {/* ========================================================= */}
        {currentPage.startsWith('course-') && (
          <div className="page-dive-in">
            <CourseDetailPage
              courseSlug={currentPage.replace('course-', '')}
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {(currentPage.startsWith('package-') ||
          currentPage.startsWith('room-') ||
          currentPage.startsWith('activity-')) && (
          <OfferingDetailPage
            kind={
              currentPage.startsWith('package-')
                ? 'package'
                : currentPage.startsWith('room-')
                  ? 'room'
                  : 'activity'
            }
            slug={currentPage.replace(/^(package|room|activity)-/, '')}
            currency={currency}
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onBookStay={handleBookStay}
          />
        )}

        {/* ========================================================= */}
        {/* 12. INDIVIDUAL PAGE: OUR STORY – FREEDIVE DAHAB           */}
        {/* ========================================================= */}
        {currentPage === 'story' && (
          <div className="page-dive-in">
          <StoryHeroCarousel onNavigate={navigateTo} />
          <OurStoryPage
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

      </main>

      {/* TECHNICAL ARCHITECTURAL FOOTER (On Every Page with Page Switching) */}
      <Footer currentPage={currentPage} />
          </>
        </Scroller>

      {/* RESERVATION DRAWER & WHATSAPP DIRECT CONNECT */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSelectedId={bookingOfferingId}
        currency={currency}
      />
      <AccommodationBookingModal
        isOpen={isStayBookingOpen}
        onClose={() => setIsStayBookingOpen(false)}
        roomId={stayRoomId}
        currency={currency}
      />

      {/* EMAIL-FIRST CHAT ASSISTANT — course guidance, FAQ answers, booking requests */}
      <ChatWidget onOpenBooking={handleOpenBooking} onNavigate={navigateTo} />

      <CookieConsent />

    </div>
    </LanguageProvider>
    </I18nextProvider>
  );
}
