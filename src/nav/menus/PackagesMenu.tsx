import { L, type MenuDefinition } from '../NavDropdown';

export const packagesMenu: MenuDefinition = {
  id: 'packages',
  label: 'Packages',
  page: 'packages',
  icon: '/icons/wet-suit.png',
  columns: [[
    L('Why FDD Packages', 'packages'),
    L('Training Week', 'package-depth-training-week'),
    L('Beginner Training Week', 'package-ultimate-dahab-combo-week'),
    L('Advanced Training Week', 'package-ultimate-dahab-combo-week'),
    L('Beginner Advanced Training Week', 'package-ultimate-dahab-combo-week'),
    L('Master Freediving Program / Performance Freediving', 'package-master-freediver-immersion'),
    L('Zero To Hero Freediving Program', 'package-instructor-pathway'),
    L('Student Accommodation', 'room-shared-dorm'),
  ]],
};

export default packagesMenu;
