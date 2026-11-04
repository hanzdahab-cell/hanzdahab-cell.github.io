import { L, type MenuDefinition } from '../NavDropdown';

export const trainingMenu: MenuDefinition = {
  id: 'training',
  label: 'Training',
  page: 'training',
  columns: [[
    L('Why Training with Us?', 'training', 'why-training'),
    L('Lighthouse Bay', 'training', 'lighthouse-bay-training'),
    L('Blue Hole', 'training', 'blue-hole-training'),
    L('Master', 'course-master-freediver'),
  ]],
};

export default trainingMenu;
