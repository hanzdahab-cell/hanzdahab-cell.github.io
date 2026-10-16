import { G, L, type MenuDefinition } from '../NavDropdown';

export const trainingMenu: MenuDefinition = {
  id: 'training',
  label: 'Training',
  page: 'training',
  icon: '/icons/diving-watch.png',
  columns: [[
    L('Why Training With FDD', 'training'),
    L('Light House Bay', 'training'),
    L('Blue Hole', 'training'),
    G('Training Packages', [
      L('Training Week', 'event-training-week'),
      L('Beginner Training Week', 'event-beginner-week'),
      L('Advanced Training Week', 'event-advanced-week'),
      L('Beginner Advanced Training Week', 'package-ultimate-dahab-combo-week'),
    ]),
    L('Master', 'course-master-freediver', undefined, true),
  ]],
};

export default trainingMenu;
