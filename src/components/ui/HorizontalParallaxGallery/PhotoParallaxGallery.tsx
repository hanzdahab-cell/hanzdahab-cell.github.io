import HorizontalParallaxGallery from './component';

export interface GalleryPhoto {
  src: string;
  alt: string;
}

interface PhotoParallaxGalleryProps {
  label: string;
  photos: readonly GalleryPhoto[];
}

export function PhotoParallaxGallery({ label, photos }: PhotoParallaxGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <HorizontalParallaxGallery
      mode="pinned"
      width="100%"
      height="250vh"
      label={label}
      items={photos.map((photo) => ({
        type: 'image',
        image: { src: photo.src, alt: photo.alt },
      }))}
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
        background: '#0E3453',
        mediaRadius: 8,
        showCaptions: false,
        showProgress: true,
        progressColor: '#89ffff',
      }}
    />
  );
}
