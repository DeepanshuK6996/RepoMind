import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";
import { FeaturesSectionDemo } from "./_components/HeroSection2";
// import HeroSection from "./_components/HeroSection";
export default async function Home() {
  
  return (
    <div className="text-white bg-black">
      <Header />
      <HeroSection />
    </div>

  );
}
