import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import StatsSection from '@/components/StatsSection';
import FeatureGrid from '@/components/FeatureGrid';
import BentoBox from '@/components/BentoBox';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Ambient background blobs — fixed, behind all content */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          style={{
            position: 'absolute', width: 700, height: 700,
            top: -250, left: -250,
            background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute', width: 600, height: 600,
            bottom: -200, right: -200,
            background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute inset-0 hero-grid opacity-50" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <StatsSection />
          <FeatureGrid />
          <BentoBox />
          <WaitlistSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
