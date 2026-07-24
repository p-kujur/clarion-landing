import { useEffect, useRef } from 'react';
import type { WorkItem } from '../types/content';

interface WorkModalProps {
  work: WorkItem;
  onClose: () => void;
}

export default function WorkModal({ work, onClose }: WorkModalProps) {
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
        aria-labelledby="work-modal-title"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Area without image */}
        <div className="bg-[#2B468B] p-8 md:p-12 relative">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close details modal"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-[#F58220] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <p className="font-sans font-bold text-xs uppercase tracking-wider text-white/70 mb-3">
            {work.category}
          </p>
          <h2 id="work-modal-title" className="font-sans font-bold text-3xl md:text-5xl text-white leading-tight">
            {work.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 bg-white">
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
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
        </div>
      </div>
    </div>
  );
}
