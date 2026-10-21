export interface SSIBadge {
  id: string;
  title: string;
  src: string;
  alt: string;
}

export const SSI_BADGES: SSIBadge[] = [
  {
    id: 'freediving-school',
    title: 'SSI Freediving School',
    src: '/badge-1t.png',
    alt: 'SSI Official Partner — Freediving School badge',
  },
  {
    id: 'classified-diving-center',
    title: 'SSI Classified Diving Center',
    src: '/badge-2t.png',
    alt: 'SSI Official Partner — Classified Diving Center badge',
  },
  {
    id: 'instructor-training-center',
    title: 'SSI Instructor Training Center',
    src: '/badge-3t.png',
    alt: 'SSI Official Partner — Instructor Training Center badge',
  },
  {
    id: 'diamond-center',
    title: 'SSI Diamond Center',
    src: '/badge-4t.png',
    alt: 'SSI Official Partner — Diamond Center badge',
  },
];
