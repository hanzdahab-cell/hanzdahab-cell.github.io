import { L, type MenuDefinition } from '../NavDropdown';

export const activitiesMenu: MenuDefinition = {
  id: 'activities',
  label: 'Activities',
  page: 'experience',
  right: true,
  columns: [[
    L('Enjoy Sinai', 'experience', 'activities-overview'),
    L('Ras Mohammed Trip', 'experience', 'activity-ras-mohamed'),
    L('Night Dive', 'experience', 'activity-night-freediving'),
    L('Dessert Dinner', 'experience', 'activity-desert-sunset'),
    L('Explore Sinai Trip', 'experience', 'activity-desert-sunset'),
    L('Ice-Bath', 'experience', 'activity-ice-bath'),
    L('Yoga', 'experience', 'activity-yoga-for-freedivers'),
  ]],
};

export default activitiesMenu;
