import dynamic from "next/dynamic";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AwardsTicker from '@/components/AwardsTicker';
import FooterSection from '@/components/FooterSection';
import SmoothScroll from '@/components/SmoothScroll';

// Below-fold sections load as separate chunks — their JS isn't part of the
// initial bundle, so the hero paints without waiting for them. SSR is kept,
// so the HTML (and SEO) is unchanged.
const StorySection = dynamic(() => import('@/components/StorySection'));
const BoxesSection = dynamic(() => import('@/components/BoxesSection'));
const GalleryMarquee = dynamic(() => import('@/components/GalleryMarquee'));
const BuildBurgerSection = dynamic(() => import('@/components/BuildBurgerSection'));
const SpecialsSection = dynamic(() => import('@/components/SpecialsSection'));
const ReviewsSection = dynamic(() => import('@/components/ReviewsSection'));
const WhyJacksSection = dynamic(() => import('@/components/WhyJacksSection'));
const SpiceClubStrip = dynamic(() => import('@/components/SpiceClubStrip'));
const FindUsSection = dynamic(() => import('@/components/FindUsSection'));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cream text-ink">
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <AwardsTicker />
        <StorySection />
        <BoxesSection />
        <GalleryMarquee />
        <BuildBurgerSection />
        <SpecialsSection />
        <ReviewsSection />
        <WhyJacksSection />
        <SpiceClubStrip />
        <FindUsSection />
        <FooterSection />
      </SmoothScroll>
    </main>
  );
}
