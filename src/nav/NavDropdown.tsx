import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { PageType } from '../types';

export interface MenuLink {
  label: string;
  page?: PageType;
  sectionId?: string;
  icon?: 'brand' | 'location';
}

export interface MenuGroup {
  group: string;
  items: MenuLink[];
}

export type MenuBlock = MenuLink | MenuGroup;

export interface MenuDefinition {
  id: string;
  label: string;
  page: PageType;
  icon: string;
  columns: MenuBlock[][];
  wide?: boolean;
  right?: boolean;
}

export const L = (
  label: string,
  page?: PageType,
  sectionId?: string,
  icon?: MenuLink['icon'],
): MenuLink => ({ label, page, sectionId, icon });

export const G = (group: string, items: MenuLink[]): MenuGroup => ({ group, items });

export const OCEAN_TEXT = 'text-[#0a5c8c]';
export const OCEAN_BTN = 'bg-[#0a5c8c] text-white hover:bg-[#084a72]';
export const HOVER_BG = 'hover:bg-[#eaf3f9]';
export const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a5c8c]';
const HEADER_FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6bbbe8]';

const MENU_ICONS = [
  '/icons/diver.png',
  '/icons/mask-snorkel.png',
  '/icons/diving-goggles.png',
  '/icons/diving-watch.png',
  '/icons/wet-suit.png',
  '/icons/swimmer.png',
  '/icons/diving-suit.png',
];

export function menuItemIcon(menuId: string, index: number): string {
  const menuOffset = [...menuId].reduce((total, character) => total + character.charCodeAt(0), 0);
  return MENU_ICONS[(menuOffset + index) % MENU_ICONS.length];
}

interface NavigationContextValue {
  openId: string | null;
  open: (id: string) => void;
  close: (id?: string, immediate?: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(id);
  };

  const close = (id?: string, immediate = false) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const closeMenu = () => setOpenId((current) => (!id || current === id ? null : current));
    if (immediate) closeMenu();
    else closeTimer.current = setTimeout(closeMenu, 120);
  };

  return (
    <NavigationContext.Provider value={{ openId, open, close }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NavigationContext.Provider>
  );
}

function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('Navigation menus must be rendered inside NavProvider.');
  return context;
}

export function MaskIcon({
  src,
  className = 'size-[18px]',
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}

export function MenuItemIcon({
  menuId,
  index,
  icon,
}: {
  menuId: string;
  index: number;
  icon?: MenuLink['icon'];
}) {
  if (icon === 'brand') {
    return <img src="/logo-freedive-dahab.png" alt="" className="size-[18px] shrink-0 object-contain" />;
  }
  if (icon === 'location') {
    return <MapPin className="size-[18px] shrink-0 text-current" aria-hidden="true" />;
  }
  return <MaskIcon src={menuItemIcon(menuId, index)} className="size-[18px] shrink-0" />;
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, scale: 0.99, y: -2, transition: { duration: 0.08, ease: 'easeIn' as const } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.015 + index * 0.006, duration: 0.12, ease: 'easeOut' as const },
  }),
};

function isMenuGroup(block: MenuBlock): block is MenuGroup {
  return 'group' in block;
}

function Panel({
  menu,
  onSelect,
}: {
  menu: MenuDefinition;
  onSelect: (item: MenuLink) => void;
}) {
  let rowIndex = 0;

  const renderLink = (item: MenuLink) => {
    const index = rowIndex++;
    return (
      <motion.li key={item.label} variants={rowVariants} custom={index}>
        <a
          href={item.page ? `#${item.sectionId ?? item.page}` : '#'}
          onClick={(event) => {
            if (item.page) {
              event.preventDefault();
              onSelect(item);
            }
          }}
          className={`group/row flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2.5 font-alata text-sm font-semibold leading-tight tracking-[0.06em] transition-colors uppercase ${OCEAN_TEXT} ${HOVER_BG} ${FOCUS}`}
        >
          <span className="transition-transform duration-200 group-hover/row:scale-110 motion-reduce:transition-none">
            <MenuItemIcon menuId={menu.id} index={index} icon={item.icon} />
          </span>
          {item.label}
        </a>
      </motion.li>
    );
  };

  const renderBlocks = (blocks: MenuBlock[]) =>
    blocks.map((block) =>
      isMenuGroup(block) ? (
        <motion.li key={block.group} className="col-span-full mt-1.5" variants={rowVariants} custom={rowIndex++}>
          <motion.p
            variants={rowVariants}
            custom={rowIndex++}
            className="px-3 pb-1 pt-2 font-alata text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {block.group}
          </motion.p>
          <ul className="pl-2">{block.items.map(renderLink)}</ul>
        </motion.li>
      ) : (
        renderLink(block)
      ),
    );

  return menu.wide ? (
    <div className="grid grid-cols-2 gap-x-3">
      {menu.columns.map((column, index) => (
        <motion.ul key={index} initial="hidden" animate="visible">
          {renderBlocks(column)}
        </motion.ul>
      ))}
    </div>
  ) : (
    <motion.ul initial="hidden" animate="visible">
      {renderBlocks(menu.columns[0])}
    </motion.ul>
  );
}

export function NavDropdown({
  menu,
  onSelect,
  isActive,
}: {
  menu: MenuDefinition;
  onSelect: (item: MenuLink) => void;
  isActive: boolean;
}) {
  const { openId, open, close } = useNavigationContext();
  const rootRef = useRef<HTMLLIElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);
  const skipNextFocusOpen = useRef(false);
  const isOpen = openId === menu.id;
  const handleSelect = (item: MenuLink) => {
    close(menu.id, true);
    onSelect(item);
  };

  return (
    <li
      ref={rootRef}
      className="relative flex items-center"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') open(menu.id);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') close(menu.id);
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) close(menu.id, true);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          close(menu.id, true);
          if (document.activeElement !== titleRef.current) {
            skipNextFocusOpen.current = true;
            titleRef.current?.focus();
          }
        }
      }}
    >
      <a
        ref={titleRef}
        href={`#${menu.page}`}
        onClick={(event) => {
          event.preventDefault();
          handleSelect({ label: menu.label, page: menu.page });
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`nav-panel-${menu.id}`}
        onFocus={() => {
          if (skipNextFocusOpen.current) skipNextFocusOpen.current = false;
          else open(menu.id);
        }}
        className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2 py-2 text-[11px] font-alata font-semibold uppercase tracking-[0.06em] transition-colors hover:text-[#00cdfe] min-[1680px]:px-3 min-[1680px]:text-xs ${isActive ? 'text-[#00cdfe]' : 'text-[#efffff]'} ${HEADER_FOCUS}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {menu.label}
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`nav-panel-${menu.id}`}
            role="group"
            aria-label={menu.label}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onPointerEnter={() => open(menu.id)}
            style={{ transformOrigin: menu.right ? 'top right' : 'top left' }}
            className={`absolute top-full z-50 mt-2 max-h-[calc(100dvh-80px)] overflow-auto rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-xl ${
              menu.right ? 'right-0' : 'left-0'
            } ${menu.wide ? 'w-[min(600px,calc(100vw-2rem))]' : 'w-[min(300px,calc(100vw-2rem))]'}`}
          >
            <Panel menu={menu} onSelect={handleSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
