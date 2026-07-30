import { useEffect, useRef } from 'react';
import type { Founder } from '../data/founders';

interface FounderModalProps {
  founder: Founder;
  onClose: () => void;
}

export default function FounderModal({ founder, onClose }: FounderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
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
  }, [onClose]);

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
        aria-labelledby="founder-modal-title"
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start pr-12">
            {/* Profile Image inside Header */}
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full bg-white/10 overflow-hidden border-2 border-white/20 flex items-center justify-center shadow-lg">
              {founder.image ? (
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white/60 font-medium text-sm md:text-base tracking-wide text-center">Image<br/>Placeholder</span>
              )}
            </div>

            <div className="text-center md:text-left mt-2 md:mt-4">
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-white/70 mb-2">
                {founder.title}
              </p>
              <h2 id="founder-modal-title" className="font-sans font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                {founder.name}
              </h2>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-white transition-colors py-1.5 px-3 rounded-full bg-white/10 hover:bg-[#F58220] focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`${founder.name} on LinkedIn`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 bg-white grow">
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            {founder.summary.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
