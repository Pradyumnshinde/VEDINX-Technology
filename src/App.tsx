import { useState } from 'react';
import { ScrollProgressBar } from './components/Motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedContext, setPreselectedContext] = useState<string>('');
  const [focusTrigger, setFocusTrigger] = useState<number>(0);

  const scrollToContact = (service = '', context = '') => {
    if (service) setPreselectedService(service);
    if (context) setPreselectedContext(context);
    setFocusTrigger((prev) => prev + 1);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <ScrollProgressBar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#3B82F6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar onGetInTouch={() => scrollToContact()} />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <ProjectsSection
          onEnquireSimilar={(category, projectName) =>
            scrollToContact(
              category,
              `Interested in a website solution similar to ${projectName}.`
            )
          }
        />
        <ProcessSection />
        <ContactSection
          preselectedService={preselectedService}
          preselectedContext={preselectedContext}
          focusTrigger={focusTrigger}
        />
      </main>

      <Footer />
    </div>
  );
}
