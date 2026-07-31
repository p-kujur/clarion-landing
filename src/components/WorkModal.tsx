import { useEffect, useRef, useState } from 'react';
import type { WorkItem } from '../types/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import galleryManifest from '../data/galleryManifest.json';

interface WorkModalProps {
  work: WorkItem;
  onClose: () => void;
}

const manifest = galleryManifest as Record<string, string[]>;

export default function WorkModal({ work, onClose }: WorkModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const galleryImages = manifest[work.id] || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (galleryImages.length > 1) {
        if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
          return;
        }
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
          return;
        }
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, galleryImages.length]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Area without image */}
        <div className="bg-[#2B468B] p-8 md:p-12 relative shrink-0">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close details modal"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-[#F58220] transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <p className="font-sans font-bold text-xs uppercase tracking-wider text-white/70 mb-3">
            {work.category}
          </p>
          <h2 id="work-modal-title" className="font-sans font-bold text-3xl md:text-5xl text-white leading-tight pr-12">
            {work.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 bg-white grow">
          {work.image && (
            <div className="w-full aspect-video bg-gray-100 rounded mb-10 overflow-hidden">
              <img src={work.image} alt={work.title} className="w-full h-full object-contain" />
            </div>
          )}

          <p className="text-lg text-gray-700 leading-relaxed mb-10 whitespace-pre-line">
            {work.longDescription}
          </p>

          {/* Impact */}
          {work.impact && (
            <div className="bg-gray-50 p-6 md:p-8 rounded border border-gray-100">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-[#2B468B] mb-6">
                Impact & Reach
              </h4>
              <ul className="space-y-4">
                {work.impact.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#F58220] mt-2 shrink-0" />
                    <span className="text-base text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="mt-10">
              <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-[#2B468B] mb-6">
                Project Gallery
              </h4>
              <div className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden group">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${work.title} - Gallery Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
                
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#F58220] text-white rounded-full opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#F58220] text-white rounded-full opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                          className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                            idx === currentImageIndex ? 'bg-[#F58220] w-4' : 'bg-white/60 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
