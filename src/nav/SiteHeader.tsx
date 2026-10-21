import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, Volume2, VolumeX, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../utils/i18n';
import { hydroAudio } from '../utils/audio';
import type { Language, PageType } from '../types';
import {
  FOCUS,
  HOVER_BG,
  L,
  MaskIcon,
  MenuItemIcon,
  NavDropdown,
  NavProvider,
  OCEAN_TEXT,
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
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const currentLanguage = LANGUAGES.find((language) => language.code === activeLanguage) ?? LANGUAGES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.12 }}
      data-lenis-prevent
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 pb-8 pt-2 min-[1200px]:hidden"
    >
      <div className="border-b border-slate-200 py-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Language
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => onLanguageSelect(language.code)}
              aria-pressed={activeLanguage === language.code}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium ${FOCUS} ${
                activeLanguage === language.code
                  ? 'border-[#0a5c8c] bg-[#eaf3f9] text-[#0a5c8c]'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <img src={language.flagUrl} alt="" className="h-5 w-5 rounded-full object-cover" />
              <span>{language.nativeName}</span>
            </button>
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {currentLanguage.label} selected
        </span>
      </div>

      <nav aria-label="Primary mobile">{navigationItems.map((item) => {
        const menu = item.menu;
        const isActive = isCurrentNavigationPage(item.page, currentPage);
        const isExpanded = Boolean(menu && expandedMenu === menu.id);
        let iconIndex = 0;

        const renderMenuLink = (menuLink: MenuLink) => (
          <a
            key={menuLink.label}
            href={menuLink.page ? `#${menuLink.sectionId ?? menuLink.page}` : '#'}
            onClick={(event) => {
              if (menuLink.page) {
                event.preventDefault();
                onSelect(menuLink);
              } else {
                onClose();
              }
            }}
            className={`flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#0a5c8c] ${HOVER_BG} ${FOCUS}`}
          >
            {menu && (
              <MenuItemIcon menuId={menu.id} index={iconIndex++} icon={menuLink.icon} />
            )}
            {menuLink.label}
          </a>
        );

        return (
          <section key={item.id} className="border-b border-slate-200">
            <div className="flex min-h-12 items-center gap-2">
              {menu && <MaskIcon src={menu.icon} className="ml-2 size-[18px] text-[#0a5c8c]" />}
              <a
                href={`#${item.page}`}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect({ label: item.label, page: item.page });
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-11 flex-1 items-center rounded-lg px-2 text-left text-[12px] font-alata font-semibold uppercase tracking-[0.11em] ${isActive ? 'bg-[#0a5c8c] text-white' : 'text-[#0a5c8c]'} ${FOCUS}`}
              >
                {item.label}
              </a>
              {menu && (
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-menu-${menu.id}`}
                  aria-label={`${isExpanded ? 'Hide' : 'Show'} ${item.label} submenu`}
                  onClick={() => setExpandedMenu(isExpanded ? null : menu.id)}
                  className={`mr-1 grid size-10 place-items-center rounded-md text-[#0a5c8c] ${HOVER_BG} ${FOCUS}`}
                >
                  <span aria-hidden="true" className="text-lg font-normal">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>
              )}
            </div>
            <AnimatePresence initial={false}>
              {menu && isExpanded && (
                <motion.div
                  id={`mobile-menu-${menu.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.12 }}
                  className="overflow-hidden pb-2"
                >
                  {menu.columns.flat().map((block) =>
                    isGroup(block) ? (
                      <div key={block.group}>
                        <p className="px-3 pt-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {block.group}
                        </p>
                        {block.items.map(renderMenuLink)}
                      </div>
                    ) : (
                      renderMenuLink(block)
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}</nav>

      <button
        type="button"
        onClick={() => {
          onClose();
          onToggleAudio();
        }}
        className={`mt-4 flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-sm font-medium ${OCEAN_TEXT} ${FOCUS}`}
      >
        {isAudioPlaying ? (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        )}
        {isAudioPlaying ? 'Mute underwater sound' : 'Play underwater sound'}
      </button>
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

    const updateScrollState = () => setIsHomeHeaderScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
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
              <span className="sm:hidden">Book a Dive</span>
              <span className="hidden sm:inline">Book Now</span>
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

        <AnimatePresence>
          {isDrawerOpen && (
            <div id="mobile-navigation">
              <MobileDrawer
                navigationItems={navigationItems}
                currentPage={currentPage}
                onSelect={selectMenuItem}
                onClose={() => setIsDrawerOpen(false)}
                onLanguageSelect={selectLanguage}
                onToggleAudio={toggleAudio}
                isAudioPlaying={isAudioPlaying}
                activeLanguage={language}
              />
            </div>
          )}
        </AnimatePresence>

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
