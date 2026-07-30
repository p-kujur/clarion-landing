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
    <div className="mt-20 w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden bg-white pt-16 pb-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 text-center">
        <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-3">
          Moments of Change
        </p>
        <h3 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 tracking-wide">
          Glimpses of Our Impact
        </h3>
      </div>
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
