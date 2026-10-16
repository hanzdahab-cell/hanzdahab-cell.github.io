import { L, type MenuDefinition } from '../NavDropdown';

export const accommodationMenu: MenuDefinition = {
  id: 'accommodation',
  label: 'Accommodation',
  page: 'accommodation',
  icon: '/icons/diving-suit.png',
  right: true,
  columns: [[
    L('Our Accommodation', 'accommodation'),
    L('The Rooms', 'accommodation', 'rooms'),
    L('Students Accommodation Packages', 'room-shared-dorm'),
  ]],
};

export default accommodationMenu;
