import { useState, useEffect } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = async () => {
      try {
        await Promise.all([
          import('@/assets/joy-profile.jpg'),
        ]);
      } catch (error) {
        console.log('Image preloading completed');
      }
    };
    
    preloadImages();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className={`transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl max-w-2xl mx-auto shadow-xl">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
              JV
            </div>
            <p className="text-blue-600 mb-6">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center gap-6 text-sm text-blue-600/70">
              <span>© 2024 Joy Vaghela</span>
              <span>•</span>
              <span>Made with ❤️ and lots of ☕</span>
              <span>•</span>
              <span className="text-green-600 animate-pulse">Available for hire!</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
