import { Hero } from "@/components/home/Hero";
import { StoryIntroduction } from "@/components/home/StoryIntroduction";
import { SignaturesSection } from "@/components/home/SignaturesSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { QuickReservation } from "@/components/home/QuickReservation";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StoryIntroduction />
      <SignaturesSection />
      <MenuPreview />
      <ExperienceSection />
      <QuickReservation />
      <Testimonials />
    </div>
  );
}
