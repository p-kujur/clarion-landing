import galleryManifest from '../data/galleryManifest.json';

const manifest = galleryManifest as Record<string, string[]>;

export default function HomeGallerySlider() {
  const galleryImages = manifest['home-gallery'] || [];

  if (galleryImages.length === 0) {
    return null;
  }

  // Duplicate the array to create a seamless infinite loop
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <div className="mt-20 w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden bg-white py-12 border-y border-gray-100">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {duplicatedImages.map((src, idx) => (
          <div
            key={idx}
            className="w-[300px] md:w-[450px] h-[200px] md:h-[300px] mx-4 shrink-0 overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={src}
              alt={`Gallery Image ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
