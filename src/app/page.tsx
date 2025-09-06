import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { ContactSection } from "@/components/sections/contact-section";
import { AIChatbot } from "@/components/ai-chatbot";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <SolutionsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
