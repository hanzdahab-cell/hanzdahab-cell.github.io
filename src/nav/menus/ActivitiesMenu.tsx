import { L, type MenuDefinition } from '../NavDropdown';

export const activitiesMenu: MenuDefinition = {
  id: 'activities',
  label: 'Activities',
  page: 'experience',
  icon: '/icons/swimmer.png',
  right: true,
  columns: [[
    L('Enjoy Sinai', 'experience'),
    L('Ras Mohammed Trip', 'activity-ras-mohamed'),
    L('Night Dive', 'activity-night-freediving'),
    L('Dessert Dinner', 'experience'),
    L('Explore Sinai Trip', 'activity-desert-sunset'),
    L('Ice-Bath', 'experience'),
    L('Yoga', 'experience'),
  ]],
};

export default activitiesMenu;
