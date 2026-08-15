import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AwardsTicker from '@/components/AwardsTicker';
import MenuSection from '@/components/MenuSection';
import ProcessSection from '@/components/ProcessSection';
import StorySection from '@/components/StorySection';
import ChowderSpotlightSection from '@/components/ChowderSpotlightSection';
import FindUsSection from '@/components/FindUsSection';
import SisterVenturesSection from '@/components/SisterVenturesSection';
import PressReviewsSection from '@/components/PressReviewsSection';
import FooterSection from '@/components/FooterSection';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <AwardsTicker />
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
