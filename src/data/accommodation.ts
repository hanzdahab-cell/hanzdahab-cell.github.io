import { RoomType } from '../types';

export const roomTypes: RoomType[] = [
  {
    id: 'lighthouse-room',
    title: 'Lighthouse Room',
    subtitle: 'A spacious double room above our freediving school.',
    description: 'Spacious room with a double bed, located above our Freedive Dahab school.',
    bedDescription: '1 double bed',
    sizeLabel: 'Big room',
    pricePerNightEur: { min: 25, max: 40 },
    seasonalPricesEur: {
      low: { single: 25, double: 35 },
      high: { single: 30, double: 40 },
    },
    capacity: 2,
    amenities: [
      '1 double bed',
      'Private bathroom',
      'Air conditioning (AC)',
      'Fridge',
      'Wi-Fi',
      'Access to the large common terrace',
      'Access to the shared kitchen',
    ],
    images: [
      { url: '/images/accommodation/lighthouse/room-main.png', alt: 'Lighthouse Room with a double bed and patterned bedding' },
      { url: '/images/accommodation/lighthouse/terrace-view.png', alt: 'View from the Lighthouse Room terrace' },
      { url: '/images/accommodation/lighthouse/bathroom.png', alt: 'Private bathroom in the Lighthouse Room' },
      { url: '/images/accommodation/lighthouse/room-interior.png', alt: 'Interior of the Lighthouse Room' },
      { url: '/images/accommodation/lighthouse/room-from-above.png', alt: 'Lighthouse Room viewed from above' },
      { url: '/images/accommodation/lighthouse/room-detail.jpg', alt: 'Additional view inside the Lighthouse Room' },
    ],
  },
  {
    id: 'blue-hole-room',
    title: 'Blue Hole Room',
    subtitle: 'A spacious room for up to three guests above our school.',
    description: 'Spacious room for up to 3 guests, located above our Freedive Dahab school.',
    bedDescription: '1 double bed + 1 single bed',
    sizeLabel: 'Big room',
    pricePerNightEur: { min: 25, max: 40 },
    seasonalPricesEur: {
      low: { single: 25, double: 35 },
      high: { single: 30, double: 40 },
    },
    capacity: 3,
    amenities: [
      '1 double bed + 1 single bed',
      'Private bathroom',
      'Air conditioning (AC)',
      'Fridge',
      'Wi-Fi',
      'Access to the large common terrace',
      'Access to the shared kitchen',
    ],
    images: [
      { url: '/images/accommodation/blue-hole/room-main.png', alt: 'Blue Hole Room with a double bed and a single bed' },
      { url: '/images/accommodation/blue-hole/bed.png', alt: 'Beds in the Blue Hole Room' },
      { url: '/images/accommodation/blue-hole/room-view-1.png', alt: 'Interior view of the Blue Hole Room' },
      { url: '/images/accommodation/blue-hole/school-exterior.png', alt: 'Freedive Dahab school building near the Blue Hole Room' },
      { url: '/images/accommodation/blue-hole/room-interior.png', alt: 'Additional interior view of the Blue Hole Room' },
      { url: '/images/accommodation/blue-hole/room-view-2.png', alt: 'Another view of the Blue Hole Room' },
      { url: '/images/accommodation/blue-hole/shared-terrace.png', alt: 'Shared terrace at Freedive Dahab' },
    ],
  },
  {
    id: 'eal-garden-room',
    title: 'Eal Garden Room',
    subtitle: 'A cozy twin room, ideal for training buddies.',
    description: 'Cozy room with two single beds, ideal for training buddies.',
    bedDescription: '2 single beds',
    sizeLabel: 'Smaller room',
    pricePerNightEur: { min: 25, max: 40 },
    seasonalPricesEur: {
      low: { single: 25, double: 35 },
      high: { single: 30, double: 40 },
    },
    capacity: 2,
    amenities: [
      '2 single beds',
      'Private bathroom',
      'Air conditioning (AC)',
      'Fridge',
      'Wi-Fi',
      'Access to the large common terrace',
      'Access to the shared kitchen',
    ],
    images: [
      { url: '/images/accommodation/eal-garden/room-main.jpeg', alt: 'Two single beds in the Eal Garden Room' },
      { url: '/images/accommodation/eal-garden/bathroom.jpeg', alt: 'Bathroom in the Eal Garden Room' },
      { url: '/images/accommodation/eal-garden/twin-beds.jpeg', alt: 'Twin beds in the Eal Garden Room' },
      { url: '/images/accommodation/eal-garden/living-room.png', alt: 'Interior of the Eal Garden Room' },
      { url: '/images/accommodation/eal-garden/terrace.png', alt: 'Terrace beside the Eal Garden Room' },
    ],
  },
  {
    id: 'islands-room',
    title: 'Islands Room',
    subtitle: 'A cozy twin room, ideal for training buddies.',
    description: 'Cozy room with two single beds, ideal for training buddies.',
    bedDescription: '2 single beds',
    sizeLabel: 'Smaller room',
    pricePerNightEur: { min: 25, max: 40 },
    seasonalPricesEur: {
      low: { single: 25, double: 35 },
      high: { single: 30, double: 40 },
    },
    capacity: 2,
    amenities: [
      '2 single beds',
      'Private bathroom',
      'Air conditioning (AC)',
      'Fridge',
      'Wi-Fi',
      'Access to the large common terrace',
      'Access to the shared kitchen',
    ],
    images: [],
  }
];

export function getRoomNightlyPrice(room: RoomType, date: string | Date, guests = 1) {
  const parsedDate = date instanceof Date ? date : new Date(`${date}T12:00:00`);
  const month = parsedDate.getMonth();
  const season = month === 11 || month <= 2 ? 'low' : 'high';
  let remainingGuests = Math.max(1, Math.floor(guests));
  let total = 0;

  while (remainingGuests > 0) {
    if (room.capacity >= 3 && remainingGuests >= 3) {
      total += room.seasonalPricesEur[season].double;
      remainingGuests -= 3;
    } else if (remainingGuests >= 2) {
      total += room.seasonalPricesEur[season].double;
      remainingGuests -= 2;
    } else {
      total += room.seasonalPricesEur[season].single;
      remainingGuests -= 1;
    }
  }

  return total;
}
