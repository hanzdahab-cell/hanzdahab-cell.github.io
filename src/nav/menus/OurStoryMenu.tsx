import { L, type MenuDefinition } from '../NavDropdown';

export const storyMenu: MenuDefinition = {
  id: 'story',
  label: 'Our Story',
  page: 'story',
  columns: [[
    L('Meet Our Pioneers', 'story', 'pioneers'),
    L('Why Freedive Dahab?', 'story', 'story-intro'),
    L('Why Dahab?', 'home', 'dahab-blue-hole'),
  ]],
};

export default storyMenu;
