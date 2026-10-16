import { L, type MenuDefinition } from '../NavDropdown';

export const homeMenu: MenuDefinition = {
  id: 'home',
  label: 'Home',
  page: 'home',
  icon: '/icons/diver.png',
  columns: [[
    L('Freedive Dahab', 'home'),
    L('Reviews and Testimonials', 'home', 'testimonials'),
    L('Our Dive Spots', 'home', 'dahab-blue-hole'),
    L('Our Legacy', 'story'),
  ]],
};

export default homeMenu;
