import { L, type MenuDefinition } from '../NavDropdown';

export const packagesMenu: MenuDefinition = {
  id: 'packages',
  label: 'Packages',
  page: 'packages',
  icon: '/icons/wet-suit.png',
  columns: [[
    L('Why Packages?', 'packages'),
    L('Training Week', 'event-training-week'),
    L('Beginner Week', 'event-beginner-week'),
    L('Advanced Week', 'event-advanced-week'),
    L('Beginner Advanced Week', 'package-ultimate-dahab-combo-week'),
    L('Master & Performance Freediver', 'package-master-freediver-immersion'),
    L('Advanced Training Program', 'training', 'training-modules'),
    L('Zero to Hero Program', 'package-instructor-pathway'),
  ]],
};

export default packagesMenu;
