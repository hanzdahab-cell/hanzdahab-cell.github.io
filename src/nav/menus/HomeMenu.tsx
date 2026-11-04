import { L, type MenuDefinition } from '../NavDropdown';

export const homeMenu: MenuDefinition = {
  id: 'home',
  label: 'Home',
  page: 'home',
  columns: [[
    L('Diving Spots', 'home', 'dahab-blue-hole'),
    L('Reviews & Testimonials', 'home', 'testimonials'),
    L('Our Legacy in Numbers', 'home', 'legacy'),
  ]],
};

export default homeMenu;
