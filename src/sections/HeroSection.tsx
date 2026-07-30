import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        animationDelay: `${(i * 0.25) % 5}s`,
        animationDuration: `${4 + ((i * 0.3) % 6)}s`,
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // tweak this timeline if the intro feels too slow
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2B468B] pt-20"
    >
      {/* Left Image Background */}
      <div 
        className="absolute inset-y-0 left-0 w-[60%] z-0"
        style={{ 
          backgroundImage: "url('/hero/hero1.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
        }} 
      />
      {/* Right Image Background */}
      <div 
        className="absolute inset-y-0 right-0 w-[60%] z-0"
        style={{ 
          backgroundImage: "url('/hero/hero2.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
        }} 
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#2B468B]/80 z-0 pointer-events-none" />
      {/* Animated particles overlay (Kept from original but recolored to fit the new blue theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/20 animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-4xl mx-auto lg:mx-0 lg:ml-[15%]">
          <h1
            ref={titleRef}
            className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-[1.25] mb-8 tracking-wide"
          >
            CRAFTING ACCESS, AWARENESS,
            <br />
            AND IMPACT THROUGH
            <br />
            KNOWLEDGE & COMMUNICATION
          </h1>

          <p
            ref={subtitleRef}
            className="font-sans text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-8"
          >
            Clarion Education & Skill Pvt. Ltd. is a purpose-driven social
            enterprise designing cost-effective, high-impact knowledge and
            communication solutions for governments, institutions,
            corporates, and communities.
          </p>

          <div ref={socialRef} className="flex items-center gap-5 mb-10 text-white">
            <a href="https://www.facebook.com/clarioneduskill" target="_blank" rel="noopener noreferrer" className="hover:text-[#F58220] transition-colors" aria-label="Facebook"><Facebook size={22} fill="currentColor" strokeWidth={0} /></a>
            <a href="https://www.instagram.com/eklavyaplus/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F58220] transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
            <a href="https://www.linkedin.com/company/clarion-education-and-skill-pvt-ltd" target="_blank" rel="noopener noreferrer" className="hover:text-[#F58220] transition-colors" aria-label="LinkedIn"><Linkedin size={22} fill="currentColor" strokeWidth={0} /></a>
          </div>

          <div ref={ctaRef}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F58220] text-[#171717] font-sans font-bold text-sm rounded shadow-lg hover:bg-[#ff963d] transition-colors"
            >
              Explore Our Work
              <ArrowUpRight size={18} className="stroke-[3]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
