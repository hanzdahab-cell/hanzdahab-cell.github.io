import { L, type MenuDefinition } from '../NavDropdown';

export const storyMenu: MenuDefinition = {
  id: 'story',
  label: 'Our Story',
  page: 'story',
  icon: '/icons/mask-snorkel.png',
  columns: [[
    L('Meet Our Pioneers', 'story', 'pioneers'),
    L('Why Freedive Dahab?', 'story', 'story-intro', 'brand'),
    L('Why Dahab?', 'home', 'dahab-blue-hole', 'location'),
  ]],
};

export default storyMenu;
