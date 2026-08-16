import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AwardsTicker from '@/components/AwardsTicker';
import BoxesSection from '@/components/BoxesSection';
import ReviewsSection from '@/components/ReviewsSection';
import FindUsSection from '@/components/FindUsSection';
import FooterSection from '@/components/FooterSection';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <AwardsTicker />
        <BoxesSection />
        <ReviewsSection />
        <FindUsSection />
        <FooterSection />
      </SmoothScroll>
    </main>
  );
}
