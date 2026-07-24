import HeroSection from '../sections/HeroSection';
import PhilosophySection from '../sections/PhilosophySection';
import WorkAreasSection from '../sections/WorkAreasSection';
import { useSEO } from '../hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'Clarion Education & Skill | Crafting Access, Awareness & Impact',
    description: 'Clarion Education & Skill Pvt. Ltd. designs low-cost, high-impact educational and communication solutions for governments, institutions, corporates, and communities.',
  });

  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <WorkAreasSection />
    </>
  );
}
