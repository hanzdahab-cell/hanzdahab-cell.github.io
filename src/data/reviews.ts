export type ReviewPlatform = 'tripadvisor' | 'google';

export interface ReviewSource {
  platform: ReviewPlatform;
  label: string;
  url: string;
}

export const REVIEW_SOURCES: ReviewSource[] = [
  {
    platform: 'tripadvisor',
    label: 'TripAdvisor',
    url: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html',
  },
  {
    platform: 'google',
    label: 'Google',
    url: 'https://www.google.com/maps/place/Freedive+Dahab/@28.500013,34.5146068,17z/data=!4m12!1m2!2m1!1sfreedive+dahab+r!3m8!1s0x15ab4b2f95e43b47:0x959de4c6f4da9708!8m2!3d28.500013!4d34.5193704!9m1!1b1!16s%2Fg%2F1hc8wq6h4',
  },
];

export interface Review {
  id: string;
  platform: ReviewPlatform;
  name: string;
  text: string;
  sourceUrl: string;
  date?: string;
  photo?: {
    src: string;
    alt: string;
  };
}

export const reviews: Review[] = [
  {
    id: 'tripadvisor-lam',
    platform: 'tripadvisor',
    name: 'Lam',
    date: 'Nov 2019',
    text: 'All the instructors are very professional and attentive to answer my questions and adjust the training suitable for my level and my needs…',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html#/media-atf/2536562/436620352:p/?albumid=-160&type=0&category=-160',
  },
  {
    id: 'tripadvisor-ting',
    platform: 'tripadvisor',
    name: 'Ting',
    date: 'Jan 2019',
    text: 'Carlos remained patient and kind. I felt safe in every dive and never felt forced to do things that I wasn’t ready for…',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html#/media-atf/2536562/371748783:p/?albumid=-160&type=0&category=-160',
  },
  {
    id: 'tripadvisor-diego',
    platform: 'tripadvisor',
    name: 'Diego F',
    date: 'Nov 2016',
    text: 'Under the experienced guidance of senior instructor Hussein, I improved my FI PB by over 10m in just a few days…',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html#/media-atf/2536562/230051324:p/?albumid=-160&type=0&category=-160',
  },
  {
    id: 'tripadvisor-huebschi',
    platform: 'tripadvisor',
    name: 'huebschi_hung',
    date: 'Jul 2015',
    text: 'It’s all about that feeling when you’re in the water and you are with and within yourself, enjoying every second of it…',
    sourceUrl: 'https://www.tripadvisor.com/Attraction_Review-g297547-d2536562-Reviews-Freedive_Dahab-Dahab_South_Sinai_Red_Sea_and_Sinai.html#/media-atf/2536562/139734774:p/?albumid=-160&type=0&category=-160',
  },
  {
    id: 'google-lita',
    platform: 'google',
    name: 'Lita Nguyen',
    text: 'The instructors were very attentive and adapted well to each of us. They clearly care about both safety and comfort in the water…',
    sourceUrl: 'https://share.google/ISlfdhmNStBrtiXry',
    photo: {
      src: '/images/reviews/google-review-1.webp',
      alt: 'Freediver descending above a coral reef',
    },
  },
  {
    id: 'google-carole',
    platform: 'google',
    name: 'Carole Chambrette',
    text: 'Very professional instructors and great equipment. My friend and I got our freediving certification and felt really comfortable…',
    sourceUrl: 'https://share.google/YSsP5IDe1YrXRd7aW',
    photo: {
      src: '/images/reviews/google-review-2.webp',
      alt: 'Freediver moving through deep blue water',
    },
  },
];
