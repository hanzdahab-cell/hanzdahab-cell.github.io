import { G, L, type MenuDefinition } from '../NavDropdown';

export const trainingMenu: MenuDefinition = {
  id: 'training',
  label: 'Training',
  page: 'training',
  icon: '/icons/diving-watch.png',
  columns: [[
    L('Why Training with Us?', 'training'),
    L('Lighthouse Bay', 'training', 'lighthouse-bay-training'),
    L('Blue Hole', 'training', 'blue-hole-training'),
    G('Training Packages', [
      L('Training Week', 'event-training-week'),
      L('Beginner Week', 'event-beginner-week'),
      L('Advanced Week', 'event-advanced-week'),
      L('Beginner Advanced Week', 'package-ultimate-dahab-combo-week'),
    ]),
    L('Master', 'course-master-freediver'),
  ]],
};

export default trainingMenu;
