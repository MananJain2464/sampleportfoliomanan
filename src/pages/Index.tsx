import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import TimelineSection from "@/components/portfolio/TimelineSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificatesSection from "@/components/portfolio/CertificatesSection";
import ArticlesSection from "@/components/portfolio/ArticlesSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TimelineSection />
        <SkillsSection />
        <ProjectsSection />
        <ArticlesSection />
        <CertificatesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
