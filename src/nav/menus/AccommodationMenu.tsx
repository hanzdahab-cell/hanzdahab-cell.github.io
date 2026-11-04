import { L, type MenuDefinition } from '../NavDropdown';

export const accommodationMenu: MenuDefinition = {
  id: 'accommodation',
  label: 'Accommodation',
  page: 'accommodation',
  right: true,
  columns: [[
    L('Our Accommodation', 'accommodation'),
    L('The Rooms', 'accommodation', 'rooms'),
    L('Lighthouse Room', 'room-lighthouse-room'),
    L('Blue Hole Room', 'room-blue-hole-room'),
    L('Eal Garden Room', 'room-eal-garden-room'),
    L('Islands Room', 'room-islands-room'),
  ]],
};

export default accommodationMenu;
