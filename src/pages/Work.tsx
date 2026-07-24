import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workCategories, workItems } from '../data/workItems';
import type { WorkItem } from '../types/content';
import WorkCard from '../components/WorkCard';
import WorkModal from '../components/WorkModal';
import { useSEO } from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  useSEO({
    title: 'Our Work & Key Initiatives | Clarion Education & Skill',
    description: "Explore Clarion's key areas of impact: low-cost stationery, institutional documentation, community awareness campaigns, and educational innovations.",
  });

  const filteredWork =
    activeCategory === 'All'
      ? workItems
      : workItems.filter((w) => w.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="pt-14 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-[#2B468B] overflow-hidden">
        <div className="work-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center lg:text-left">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/70 mb-6">
            Key Projects & Flagship Initiatives
          </p>
          <h1 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-wide max-w-4xl mb-6">
            KEY AREAS OF WORK
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto lg:mx-0">
            From affordable school notebook programmes to smart classroom solutions, digital language labs, and government campaign integrations, explore our multidisciplinary initiatives transforming educational ecosystems.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {workCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-sans font-bold text-sm tracking-wide rounded transition-colors shadow-sm ${
                  activeCategory === cat
                    ? 'bg-[#2B468B] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#2B468B] hover:text-[#2B468B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWork.map((item) => (
              <WorkCard
                key={item.id}
                item={item}
                onClick={() => setSelectedWork(item)}
                className="work-card-item"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}