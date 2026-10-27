import { HeroSection } from "@/components/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CaseSelectionProvider } from "@/components/providers/CaseSelectionProvider";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { LogisticsSection } from "@/components/sections/LogisticsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

// Static, regenerated daily so "years of experience" stays current without a redeploy.
export const revalidate = 86400;

export default function HomePage() {
  return (
    <CaseSelectionProvider>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <LogisticsSection />
        <ExperienceSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </CaseSelectionProvider>
  );
}
