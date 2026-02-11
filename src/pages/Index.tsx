import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";
import LoveLetterSection from "@/components/LoveLetterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <HeroSection />
      <LoveLetterSection />
      <FooterSection />
    </div>
  );
};

export default Index;
