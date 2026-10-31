import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, Search, Volume2, VolumeX, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../utils/i18n';
import { hydroAudio } from '../utils/audio';
import type { Language, PageType } from '../types';
import {
  FOCUS,
  HOVER_BG,
  L,
  NavDropdown,
  NavProvider,
  type MenuDefinition,
  type MenuLink,
} from './NavDropdown';
import homeMenu from './menus/HomeMenu';
import storyMenu from './menus/OurStoryMenu';
import coursesMenu from './menus/CoursesMenu';
import trainingMenu from './menus/TrainingMenu';
import packagesMenu from './menus/PackagesMenu';
import activitiesMenu from './menus/ActivitiesMenu';
import accommodationMenu from './menus/AccommodationMenu';

const MENUS: MenuDefinition[] = [
  homeMenu,
  storyMenu,
  coursesMenu,
  trainingMenu,
  packagesMenu,
  activitiesMenu,
  accommodationMenu,
];
const HEADER_FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6bbbe8]';
const HEADER_CTA_FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

interface TopLevelNavigationItem {
  id: string;
  label: string;
  page: PageType;
  menu?: MenuDefinition;
}

const SEARCH_PAGES: MenuLink[] = [
  L('Home', 'home'),
  L('Our Story', 'story'),
  L('Courses', 'courses'),
  L('Training', 'training'),
  L('Packages', 'packages'),
  L('Activities', 'experience'),
  L('Accommodation', 'accommodation'),
  L('Calendar', 'calendar'),
  L('Blog', 'blog'),
  L('FAQ', 'faq'),
];

function isGroup(block: MenuDefinition['columns'][number][number]): block is {
  group: string;
  items: MenuLink[];
} {
  return 'group' in block;
}

function flattenMenuLinks(menu: MenuDefinition): MenuLink[] {
  return menu.columns.flatMap((column) =>
    column.flatMap((block) => (isGroup(block) ? block.items : [block])),
  );
}

function isCurrentNavigationPage(page: PageType, currentPage: PageType): boolean {
  if (page === currentPage) return true;
  if (page === 'courses') return currentPage.startsWith('course-');
  if (page === 'packages') return currentPage.startsWith('package-');
  if (page === 'calendar') return currentPage.startsWith('event-');
  if (page === 'accommodation') return currentPage.startsWith('room-');
  if (page === 'experience') return currentPage.startsWith('activity-');
  return false;
}

function MobileDrawer({
  navigationItems,
  currentPage,
  onSelect,
  onClose,
  onLanguageSelect,
  onToggleAudio,
  isAudioPlaying,
  activeLanguage,
}: {
  navigationItems: TopLevelNavigationItem[];
  currentPage: PageType;
  onSelect: (item: MenuLink) => void;
  onClose: () => void;
  onLanguageSelect: (language: Language) => void;
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
  activeLanguage: Language;
}) {
  const drawerRef = useRef<HTMLElement>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionDuration = prefersReducedMotion ? 0 : 0.32;
  const currentLanguage = LANGUAGES.find((language) => language.code === activeLanguage) ?? LANGUAGES[0];

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const firstLink = drawer.querySelector<HTMLElement>('nav a[href]');
    firstLink?.focus();

    const keepFocusInDrawer = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keepFocusInDrawer);
    return () => document.removeEventListener('keydown', keepFocusInDrawer);
  }, []);

  const renderMenuItem = (link: MenuLink) => (
    <li key={`${link.label}-${link.sectionId ?? link.page ?? 'label'}`}>
      {link.page ? (
        <a
          href={`#${link.sectionId ?? link.page}`}
          onClick={(event) => {
            event.preventDefault();
            onSelect(link);
          }}
          className="flex min-h-10 items-center rounded-lg px-3 py-2 font-alata text-[13px] leading-snug text-[#0E3453] transition-colors hover:bg-white/70 hover:text-[#075C85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#075C85]"
        >
          {link.label}
        </a>
      ) : (
        <span className="flex min-h-10 items-center rounded-lg px-3 py-2 font-alata text-[13px] leading-snug text-[#0E3453]">
          {link.label}
        </span>
      )}
    </li>
  );

  return (
    <motion.div
      id="mobile-navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: motionDuration }}
      data-lenis-prevent
      className="fixed inset-x-0 bottom-0 top-16 z-[60] min-[1200px]:hidden"
    >
      <motion.button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={-1}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: motionDuration }}
        className="absolute inset-0 h-full w-full cursor-default bg-[#061A2B]/85 backdrop-blur-[2px] focus-visible:outline-none"
      />

      <motion.aside
        ref={drawerRef}
        role="dialog"
        aria-label="Site navigation"
        aria-modal="true"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: motionDuration, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 z-10 flex w-full flex-col overflow-hidden bg-[#EAF3F9] text-[#081F35] shadow-2xl sm:w-[360px]"
      >
        <nav aria-label="Primary mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = isCurrentNavigationPage(item.page, currentPage);
              const isExpanded = expandedMenu === item.id;
              const submenuId = `mobile-submenu-${item.id}`;
              return (
                <li key={item.id} className="border-b border-[#0E3453]/10 pb-1">
                  <div className="flex min-h-[52px] items-center gap-2">
                    <a
                      href={`#${item.page}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelect({ label: item.label, page: item.page });
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-h-11 min-w-0 flex-1 items-center rounded-lg px-3 font-alata text-base font-semibold transition-colors hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075C85] ${isActive ? 'text-[#075C85]' : 'text-[#081F35]'}`}
                    >
                      {item.label}
                    </a>
                    {item.menu && (
                      <button
                        type="button"
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} submenu`}
                        aria-expanded={isExpanded}
                        aria-controls={submenuId}
                        onClick={() => setExpandedMenu(isExpanded ? null : item.id)}
                        className="grid size-11 shrink-0 place-items-center rounded-lg text-[#075C85] transition-colors hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075C85]"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-4 transition-transform duration-300 motion-reduce:transition-none ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {item.menu && isExpanded && (
                      <motion.div
                        id={submenuId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: motionDuration, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mb-2 ml-3 border-l border-[#075C85]/25 pl-2">
                          {item.menu.columns.map((column, columnIndex) => (
                            <ul key={`${item.id}-column-${columnIndex}`}>
                              {column.map((block) =>
                                isGroup(block) ? (
                                  <li key={block.group} className="pt-2">
                                    <h3 className="px-3 pb-1 font-alata text-[11px] font-bold uppercase tracking-[0.12em] text-[#075C85]/80">
                                      {block.group}
                                    </h3>
                                    <ul>{block.items.map(renderMenuItem)}</ul>
                                  </li>
                                ) : renderMenuItem(block),
                              )}
                            </ul>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-[#0E3453]/15 pt-4">
            <p className="mb-2 px-1 font-alata text-[11px] font-bold uppercase tracking-[0.14em] text-[#075C85]">
              Language
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => onLanguageSelect(language.code)}
                  aria-pressed={activeLanguage === language.code}
                  className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left font-alata text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075C85] ${
                    activeLanguage === language.code
                      ? 'border-[#075C85]/50 bg-white text-[#075C85]'
                      : 'border-[#0E3453]/15 text-[#0E3453] hover:bg-white/70'
                  }`}
                >
                  <img src={language.flagUrl} alt="" className="size-5 rounded-full object-cover" />
                  <span>{language.nativeName}</span>
                </button>
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              {currentLanguage.label} selected
            </span>
            <button
              type="button"
              onClick={onToggleAudio}
              aria-pressed={isAudioPlaying}
              className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-lg px-3 font-alata text-sm font-medium text-[#0E3453] transition-colors hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075C85]"
            >
              {isAudioPlaying ? <Volume2 className="size-4" aria-hidden="true" /> : <VolumeX className="size-4" aria-hidden="true" />}
              {isAudioPlaying ? 'Mute underwater sound' : 'Play underwater sound'}
            </button>
          </div>
        </nav>
      </motion.aside>
    </motion.div>
  );
}

export interface SiteHeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  onNavigateToSection?: (page: PageType, sectionId: string) => void;
}

export function SiteHeader({
  currentPage,
  onNavigate,
  onOpenBooking,
  onNavigateToSection,
}: SiteHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasDrawerOpen = useRef(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHomeHeaderScrolled, setIsHomeHeaderScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, currentOption } = useLanguage();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (currentPage !== 'home') {
      setIsHomeHeaderScrolled(false);
      return;
    }

    const pageScroller = document.getElementById('site-page-scroll');
    const scrollTarget: HTMLElement | Window = pageScroller ?? window;
    const updateScrollState = () =>
      setIsHomeHeaderScrolled(pageScroller ? pageScroller.scrollTop > 24 : window.scrollY > 24);
    updateScrollState();
    scrollTarget.addEventListener('scroll', updateScrollState, { passive: true });
    return () => scrollTarget.removeEventListener('scroll', updateScrollState);
  }, [currentPage]);

  const navigationItems: TopLevelNavigationItem[] = [
    { id: 'home', label: t('labels.home'), page: 'home', menu: { ...homeMenu, label: t('labels.home') } },
    { id: 'story', label: storyMenu.label, page: 'story', menu: storyMenu },
    { id: 'courses', label: t('labels.courses'), page: 'courses', menu: { ...coursesMenu, label: t('labels.courses') } },
    { id: 'training', label: t('labels.training'), page: 'training', menu: { ...trainingMenu, label: t('labels.training') } },
    { id: 'packages', label: t('labels.packages'), page: 'packages', menu: { ...packagesMenu, label: t('labels.packages') } },
    { id: 'activities', label: t('labels.experience'), page: 'experience', menu: { ...activitiesMenu, label: t('labels.experience') } },
    { id: 'accommodation', label: t('labels.accommodation'), page: 'accommodation', menu: { ...accommodationMenu, label: t('labels.accommodation') } },
    { id: 'calendar', label: t('labels.calendar'), page: 'calendar' },
    { id: 'blog', label: t('labels.blog'), page: 'blog' },
    { id: 'faq', label: t('labels.faq'), page: 'faq' },
  ];

  const allMenuLinks = useMemo(
    () => MENUS.flatMap(flattenMenuLinks).filter((item) => item.page),
    [],
  );
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const searchResults = normalizedQuery
    ? [...SEARCH_PAGES, ...allMenuLinks]
        .filter((item, index, items) => {
          const isDuplicate = items.findIndex((candidate) => candidate.label === item.label) !== index;
          return !isDuplicate && item.label.toLocaleLowerCase().includes(normalizedQuery);
        })
        .slice(0, 8)
    : [];

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (wasDrawerOpen.current && !isDrawerOpen) menuButtonRef.current?.focus();
    wasDrawerOpen.current = isDrawerOpen;
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const pageViewport = document.querySelector<HTMLElement>('#site-page-scroll');
    const previousViewportOverflow = pageViewport?.style.overflowY ?? '';
    const previousBodyOverflow = document.body.style.overflow;
    if (pageViewport) pageViewport.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      if (pageViewport) pageViewport.style.overflowY = previousViewportOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsLanguageOpen(false);
        setIsSearchOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const closeLanguageOnOutsideClick = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', closeLanguageOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeLanguageOnOutsideClick);
  }, []);

  const selectLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    setIsLanguageOpen(false);
  };

  const selectMenuItem = (item: MenuLink) => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
    if (!item.page) return;
    if (item.sectionId && onNavigateToSection) {
      onNavigateToSection(item.page, item.sectionId);
    } else {
      onNavigate(item.page);
    }
  };

  const toggleAudio = () => {
    setIsAudioPlaying(hydroAudio.toggle());
  };

  return (
    <NavProvider>
      <header
        data-current-page={currentPage}
        data-scrolled={isHomeHeaderScrolled}
        className={`site-header sticky top-0 z-50 h-16 text-slate-100 ${
          currentPage === 'home'
            ? 'site-header--home -mb-16 border-b border-transparent bg-transparent shadow-none backdrop-blur-none'
            : 'border-b border-white/10 bg-[#081F35]/95 shadow-lg shadow-black/10 backdrop-blur-md'
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-[1480px] items-center gap-1 px-3 sm:gap-3 sm:px-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Freedive Dahab Home"
            className={`flex shrink-0 items-center rounded-lg ${HEADER_FOCUS}`}
          >
            <img
              src="/logo-freedive-dahab.png"
              alt="Freedive Dahab"
              className="h-12 w-auto object-contain sm:h-[3.75rem]"
            />
          </button>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center px-2 min-[1200px]:flex">
            <ul className="flex w-full items-center justify-between gap-0.5">
              {navigationItems.map((item) =>
                item.menu ? (
                  <NavDropdown
                    key={item.id}
                    menu={item.menu}
                    isActive={isCurrentNavigationPage(item.page, currentPage)}
                    onSelect={selectMenuItem}
                  />
                ) : (
                  <li key={item.id}>
                    <a
                      href={`#${item.page}`}
                      onClick={(event) => {
                        event.preventDefault();
                        selectMenuItem({ label: item.label, page: item.page });
                      }}
                      aria-current={isCurrentNavigationPage(item.page, currentPage) ? 'page' : undefined}
                      className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2 py-2 text-[11px] font-alata font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#00cdfe] min-[1680px]:px-3 min-[1680px]:text-xs ${isCurrentNavigationPage(item.page, currentPage) ? 'text-[#00cdfe]' : 'text-[#efffff]'} ${HEADER_FOCUS}`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1 sm:gap-3">
            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                aria-label={`Select language, current language ${currentOption.label}`}
                aria-expanded={isLanguageOpen}
                aria-controls="site-language-menu"
                onClick={() => setIsLanguageOpen((open) => !open)}
                className={`flex size-10 items-center justify-center rounded-full border border-[#1b3243] bg-[#0d1d29] text-[#efffff] transition-colors hover:text-[#00cdfe] ${HEADER_FOCUS}`}
              >
                <img src={currentOption.flagUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
              </button>
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    id="site-language-menu"
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full z-[60] mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 text-slate-900 shadow-xl"
                  >
                    {LANGUAGES.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        aria-pressed={language === option.code}
                        onClick={() => selectLanguage(option.code)}
                        className={`flex min-h-11 w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-[#0a5c8c] ${HOVER_BG} ${FOCUS}`}
                      >
                        <img src={option.flagUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
                        <span>{option.nativeName}</span>
                        <span className="ml-auto uppercase">{option.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? 'Mute underwater sound' : 'Play underwater sound'}
              aria-pressed={isAudioPlaying}
              className={`hidden h-10 w-10 items-center justify-center rounded-full border border-[#1b3243] bg-[#0d1d29] text-[#efffff] transition-colors hover:text-[#00cdfe] xl:flex ${HEADER_FOCUS}`}
            >
              {isAudioPlaying ? (
                <Volume2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen((open) => !open)}
              aria-label={isSearchOpen ? 'Close search' : 'Search pages and courses'}
              aria-expanded={isSearchOpen}
              aria-controls="site-search-panel"
              title="Search (Ctrl+K)"
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#1b3243] bg-[#0d1d29] text-[#efffff] transition-colors hover:text-[#00cdfe] ${HEADER_FOCUS}`}
            >
              {isSearchOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Search className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking('ssi-level-1')}
              className={`fd-button inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full px-2 text-[0.65rem] font-semibold sm:px-4 sm:text-sm ${HEADER_CTA_FOCUS}`}
            >
              Book a Dive
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsDrawerOpen((open) => !open)}
              className={`grid size-11 place-items-center rounded-lg border border-[#1b3243] bg-[#0d1d29] text-[#efffff] transition-colors hover:text-[#00cdfe] min-[1200px]:hidden ${HEADER_FOCUS}`}
            >
              {isDrawerOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {createPortal(
          <AnimatePresence>
            {isDrawerOpen && (
              <MobileDrawer
                key="mobile-navigation"
                navigationItems={navigationItems}
                currentPage={currentPage}
                onSelect={selectMenuItem}
                onClose={() => setIsDrawerOpen(false)}
                onLanguageSelect={selectLanguage}
                onToggleAudio={toggleAudio}
                isAudioPlaying={isAudioPlaying}
                activeLanguage={language}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

        <AnimatePresence>
          {isSearchOpen && (
            <motion.section
              id="site-search-panel"
              aria-label="Site search"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute left-3 right-3 top-full z-[60] rounded-xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl sm:left-auto sm:right-5 sm:w-[min(24rem,calc(100vw-2rem))]"
            >
              <label htmlFor="site-search-input" className="sr-only">
                Search pages and courses
              </label>
              <input
                ref={searchInputRef}
                id="site-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search pages and courses…"
                className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a5c8c]"
              />
              <div aria-live="polite" className="mt-2 max-h-72 overflow-y-auto">
                {normalizedQuery && searchResults.length === 0 && (
                  <p className="px-3 py-4 text-sm text-slate-600">No matching pages or courses.</p>
                )}
                {searchResults.map((result, index) => (
                  <button
                    key={`${result.label}-${index}`}
                    type="button"
                    onClick={() => selectMenuItem(result)}
                    className={`block min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm text-[#0a5c8c] ${HOVER_BG} ${FOCUS}`}
                  >
                    {result.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 px-3 text-[10px] text-slate-500">Press Esc to close</p>
            </motion.section>
          )}
        </AnimatePresence>
      </header>
    </NavProvider>
  );
}
