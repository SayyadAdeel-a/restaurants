import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AwardsTicker from '@/components/AwardsTicker';
import OpeningSection from '@/components/OpeningSection';
import MenuSection from '@/components/MenuSection';
import ProcessSection from '@/components/ProcessSection';
import StorySection from '@/components/StorySection';
import ChowderSpotlightSection from '@/components/ChowderSpotlightSection';
import FindUsSection from '@/components/FindUsSection';
import SisterVenturesSection from '@/components/SisterVenturesSection';
import PressReviewsSection from '@/components/PressReviewsSection';
import FooterSection from '@/components/FooterSection';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingAssets from '@/components/FloatingAssets';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <FloatingAssets />
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <AwardsTicker />
        <OpeningSection />
        <MenuSection />
        <ProcessSection />
        <StorySection />
        <ChowderSpotlightSection />
        <FindUsSection />
        <SisterVenturesSection />
        <PressReviewsSection />
        <FooterSection />
      </SmoothScroll>
    </main>
  );
}
