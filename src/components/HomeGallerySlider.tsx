import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import galleryManifest from '../data/galleryManifest.json';

const manifest = galleryManifest as Record<string, string[]>;

export default function HomeGallerySlider() {
  const galleryImages = manifest['home-gallery'] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  if (galleryImages.length === 0) {
    return null;
  }

  // Duplicate the array 4 times to ensure enough content for seamless scrolling
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages];

  useEffect(() => {
    let animationId: number;

    const scroll = () => {
      // Only auto-scroll if we are not hovering and not currently interacting via buttons
      if (scrollRef.current && !isHoveredRef.current && !isInteractingRef.current) {
        scrollRef.current.scrollLeft += 0.5; // Scroll speed

        const scrollWidth = scrollRef.current.scrollWidth;
        const oneSetWidth = scrollWidth / 4; // Since we duplicated 4 times

        // If we scrolled past the second set, snap back to the start of the second set
        if (scrollRef.current.scrollLeft >= oneSetWidth * 2) {
          scrollRef.current.scrollLeft -= oneSetWidth;
        } else if (scrollRef.current.scrollLeft <= 0) {
          // If we somehow scrolled backwards past 0, snap forward
          scrollRef.current.scrollLeft += oneSetWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Initial offset to ensure we aren't at the hard edge 0
    if (scrollRef.current) {
       // Wait a frame so layout is established
       requestAnimationFrame(() => {
         if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 4;
         }
       });
    }

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const pauseBriefly = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 2000); // Wait 2s after interaction before auto-scrolling resumes
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      pauseBriefly();
      
      const scrollWidth = scrollRef.current.scrollWidth;
      const oneSetWidth = scrollWidth / 4;
      
      if (scrollRef.current.scrollLeft < oneSetWidth * 0.5) {
        scrollRef.current.scrollLeft += oneSetWidth;
      }

      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      pauseBriefly();
      
      const scrollWidth = scrollRef.current.scrollWidth;
      const oneSetWidth = scrollWidth / 4;
      
      if (scrollRef.current.scrollLeft > oneSetWidth * 2.5) {
        scrollRef.current.scrollLeft -= oneSetWidth;
      }

      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

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
      
      <div 
        className="relative"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x select-none"
        >
          {duplicatedImages.map((src, idx) => (
            <div
              key={idx}
              className="w-[300px] md:w-[450px] h-[200px] md:h-[300px] mx-4 shrink-0 overflow-hidden rounded-xl shadow-md cursor-grab active:cursor-grabbing"
            >
              <img
                src={src}
                alt={`Gallery Image ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={scrollLeft}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#F58220] hover:text-white transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#F58220] shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#F58220] hover:text-white transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#F58220] shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
