import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workCategories, workItems } from '../data/workItems';
import type { WorkItem } from '../types/content';
import WorkModal from '../components/WorkModal';
import { useSEO } from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  useSEO({
    title: 'Our Work & Key Initiatives | Clarion Education & Skill',
    description:
      "Explore Clarion's key areas of impact: cost-effective stationery, institutional documentation, community awareness campaigns, and learning innovations.",
  });

  const categories = workCategories.filter((cat) => cat !== 'All');

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
      const tl = gsap.timeline();

      tl.fromTo(
        '.category-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      tl.fromTo(
        '.project-list-item',
        { x: -10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

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
            From affordable school notebook programmes to smart classroom
            solutions, digital language labs, and government campaign
            integrations, explore our multidisciplinary initiatives transforming
            learning ecosystems.
          </p>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((cat) => {
              const items = workItems.filter((w) => w.category === cat);
              return (
                <div
                  key={cat}
                  className="category-card bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow p-6 lg:p-8 flex flex-col h-full"
                >
                  <h2 className="font-sans font-bold text-xl uppercase tracking-wide text-[#F58220] mb-6">
                    {cat}
                  </h2>
                  <ul className="flex flex-col gap-4 flex-grow">
                    {items.map((item) => (
                      <li key={item.id} className="project-list-item flex-1">
                        <button
                          onClick={() => setSelectedWork(item)}
                          className="text-left w-full h-full group p-5 border border-gray-100 rounded bg-gray-50 hover:bg-[#2B468B]/5 hover:border-[#2B468B]/20 transition-all duration-300 flex items-start gap-4"
                        >
                          <div className="w-20 h-20 shrink-0 bg-gray-200 rounded overflow-hidden relative">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#2B468B]/10 flex items-center justify-center">
                                <span className="text-[#2B468B] font-bold text-xl">
                                  {item.title.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-sans font-bold text-lg text-[#2B468B] group-hover:text-[#F58220] transition-colors block mb-2 leading-tight">
                              {item.title}
                            </span>
                            <span className="text-sm text-gray-600 block line-clamp-2">
                              {item.description}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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