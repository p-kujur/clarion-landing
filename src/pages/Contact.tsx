import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'Contact Us | Clarion Education & Skill',
    description: 'Get in touch with Clarion Education & Skill Pvt. Ltd. for partnerships, CSR initiatives, and public good collaborations in Ranchi, Jharkhand.',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.contact-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.3,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-14 bg-[#FAF8F5] min-h-screen">
      {/* Top Hero Section - Brand Blue */}
      <section className="relative bg-[#2B468B] text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Subtle background grid lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
            
            {/* Left Content */}
            <div className="contact-hero-content max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-200/70 mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-blue-200/40"></span>
                PARTNERSHIPS & COLLABORATION
              </p>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
                Let&apos;s start a{' '}
                <span className="italic font-normal text-[#F58220] block sm:inline">
                  conversation.
                </span>
              </h1>
              
              <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-2 max-w-xl">
                Government body, CSR initiative, NGO, or academic institution — if you&apos;re building something for public good, we want to hear about it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Direct Line Section - Off-White / Cream */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          {/* Direct Line Label */}
          <div className="contact-row mb-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#8c7b6c]">
              DIRECT LINE
            </p>
          </div>

          {/* Rows Container */}
          <div className="divide-y divide-stone-300/70 border-t border-b border-stone-300/70">
            
            {/* Email Row */}
            <div className="contact-row py-4 md:py-6 group">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=clarion.jh@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-10 md:gap-16">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c7b6c] w-20 sm:w-24 shrink-0">
                    EMAIL
                  </span>
                  <span className="font-serif text-base sm:text-lg md:text-xl font-medium text-stone-900 group-hover:text-[#2B468B] transition-colors break-all">
                    clarion.jh@gmail.com
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stone-400/80 flex items-center justify-center text-stone-700 group-hover:bg-[#2B468B] group-hover:text-white group-hover:border-[#2B468B] transition-all duration-300 shrink-0 transform group-hover:scale-105 group-hover:rotate-12">
                  <ArrowUpRight strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>
            </div>

            {/* Phone Row */}
            <div className="contact-row py-4 md:py-6 group">
              <a
                href="tel:+919065541555"
                className="flex items-center justify-between gap-4 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-10 md:gap-16">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c7b6c] w-20 sm:w-24 shrink-0">
                    PHONE
                  </span>
                  <span className="font-serif text-base sm:text-lg md:text-xl font-medium text-stone-900 group-hover:text-[#2B468B] transition-colors">
                    +91 9065541555
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stone-400/80 flex items-center justify-center text-stone-700 group-hover:bg-[#2B468B] group-hover:text-white group-hover:border-[#2B468B] transition-all duration-300 shrink-0 transform group-hover:scale-105 group-hover:rotate-12">
                  <ArrowUpRight strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>
            </div>

            {/* Address Row */}
            <div className="contact-row py-4 md:py-6 group">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lucas+Building,+Opp.+Arya+Hotel,+Lalpur,+Ranchi+-+834001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-10 md:gap-16">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#8c7b6c] w-20 sm:w-24 shrink-0">
                    ADDRESS
                  </span>
                  <span className="font-serif text-base sm:text-lg md:text-xl font-medium text-stone-900 group-hover:text-[#2B468B] transition-colors leading-snug">
                    Lucas Building, Opp. Arya Hotel, Lalpur, Ranchi &mdash; 834001
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stone-400/80 flex items-center justify-center text-stone-700 group-hover:bg-[#2B468B] group-hover:text-white group-hover:border-[#2B468B] transition-all duration-300 shrink-0 transform group-hover:scale-105 group-hover:rotate-12">
                  <ArrowUpRight strokeWidth={2} className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
