import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AwardsTicker from '@/components/AwardsTicker';
import BoxesSection from '@/components/BoxesSection';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <AwardsTicker />
        <BoxesSection />
      </SmoothScroll>
    </main>
  );
}
