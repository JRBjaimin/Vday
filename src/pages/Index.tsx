import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import LoveStorySection from "@/components/LoveStorySection";
import GiftCardsSection from "@/components/GiftCardsSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import CountdownSection from "@/components/CountdownSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <HeroSection />
      {/* <LoveStorySection /> */}
      {/* <GiftCardsSection /> */}
      {/* <LoveLetterSection /> */}
      {/* <CountdownSection /> */}
      <FooterSection />
    </div>
  );
};

export default Index;
