import HorizontalParallaxGallery, { type GalleryMedia } from './component';

const media: GalleryMedia[] = [
  {
    type: 'image',
    image: {
      src: '/images/story-carousel/red-sea-reef.jpg',
      alt: 'Coral reef in the Red Sea near Dahab',
    },
  },
  {
    type: 'image',
    image: {
      src: '/images/story-carousel/blue-hole-freediver.jpg',
      alt: 'Freediver descending on a line at the Blue Hole',
    },
  },
  {
    type: 'image',
    image: {
      src: '/images/story-carousel/training-line.jpg',
      alt: 'Freediver training beside a line in Dahab',
    },
  },
  {
    type: 'image',
    image: {
      src: '/images/dahab-story/lighthouse-training.jpg',
      alt: 'Freediving session at Lighthouse Bay',
    },
  },
];

export function PinnedGalleryExample() {
  return (
    <HorizontalParallaxGallery
      mode="pinned"
      width="100%"
      height={3000}
      items={media}
      layout={{
        mediaHeight: 60,
        widthMode: 'aspect',
        aspect: '3:2',
        gap: 32,
        stageHeight: 100,
      }}
      motion={{ ease: 0.08, overscan: 25, parallax: 10 }}
      effect={{ centerFocus: 0.2, curve: 0, velocitySkew: 0.5, desaturate: 0 }}
      style={{
        background: '#0A0A0A',
        mediaRadius: 8,
        showCaptions: false,
        captionColor: '#FFFFFF',
        showProgress: true,
        progressColor: '#FFFFFF',
      }}
    />
  );
}

export function InfiniteGalleryExample() {
  return (
    <HorizontalParallaxGallery
      mode="infinite"
      width="100%"
      height="100vh"
      items={media}
      layout={{
        mediaHeight: 60,
        widthMode: 'aspect',
        aspect: '3:2',
        gap: 32,
        stageHeight: 100,
      }}
      motion={{ ease: 0.08, overscan: 25, parallax: 10 }}
      loop={{ speed: 40, direction: 'left', wheel: true }}
      effect={{ centerFocus: 0.2, curve: 0, velocitySkew: 0.5, desaturate: 0 }}
      style={{
        background: '#0A0A0A',
        mediaRadius: 8,
        showCaptions: false,
        captionColor: '#FFFFFF',
        showProgress: false,
      }}
    />
  );
}

export default PinnedGalleryExample;
