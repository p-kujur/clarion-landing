import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredWorkItems } from '../data/workItems';
import type { WorkItem } from '../types/content';
import WorkCard from '../components/WorkCard';
import WorkModal from '../components/WorkModal';

gsap.registerPlugin(ScrollTrigger);

export default function WorkAreasSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards stagger reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.work-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-8 md:pt-16 pb-20 md:pb-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-4">
              Key Projects & Flagship Initiatives
            </p>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-gray-900 tracking-wide">
              Key Areas of Work
            </h2>
          </div>
          <Link
            to="/work"
            className="mt-6 md:mt-0 font-sans font-bold text-sm uppercase tracking-widest text-[#2B468B] hover:text-[#F58220] transition-colors"
          >
            View All Work &rarr;
          </Link>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {featuredWorkItems.slice(0, 6).map((area) => (
            <WorkCard
              key={area.id}
              item={area}
              onClick={() => setSelectedWork(area)}
              className="work-card"
            />
          ))}
        </div>
      </div>
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </section>
  );
}
