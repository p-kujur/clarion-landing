import { useState } from 'react';
import { Link } from 'react-router';
import WorkModal from './WorkModal';
import { workItems } from '../data/workItems';
import type { WorkItem } from '../types/content';

export default function Footer() {
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);

  return (
    <footer className="border-t border-[#1F2A4A] bg-[#1F2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">


        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                <img src="/images/clarion-logo.png" alt="Clarion" className="h-5 md:h-7 object-contain" />
              </div>
              <span className="font-serif font-semibold text-[1.35rem] text-white flex items-baseline">
                global
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Education & Skill Pvt. Ltd. Crafting access, awareness, and impact
              through education and communication since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/work', label: 'Key Areas' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-[#F58220] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Areas */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">
              Key Areas
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Notebook Initiative', id: 'five-rupee-notebook' },
                { label: 'IEC & BCC', id: 'iec-behaviour-change' },
                { label: 'Comic Learning', id: 'mask-man-comic' },
                { label: 'Cultural Docs', id: 'cultural-documentation' },
                { label: 'Strategic Comms', id: 'strategic-communication' },
              ].map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => {
                      const work = workItems.find((w) => w.id === area.id);
                      if (work) setActiveWork(work);
                    }}
                    className="text-sm text-gray-300 hover:text-[#F58220] transition-colors text-left"
                  >
                    {area.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-sans">
            {/* always keep the year current so we don't look stale */}
            &copy; {new Date().getFullYear()} Clarion Education & Skill Pvt. Ltd.
          </p>
          <p className="text-xs text-gray-400 font-sans">
            Bihar &middot; Jharkhand &middot; West Bengal
          </p>
        </div>
      </div>

      {activeWork && (
        <WorkModal
          work={activeWork}
          onClose={() => setActiveWork(null)}
        />
      )}
    </footer>
  );
}
