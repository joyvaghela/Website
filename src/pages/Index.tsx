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
          import('@/assets/cricket-hero.jpg'),
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
      <footer className="relative overflow-hidden py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-neon mb-4">
              JV
            </div>
            <p className="text-muted-foreground mb-6">
              Building the future, one line of code and one cricket match at a time.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Joy Vaghela</span>
              <span>•</span>
              <span>Made with ❤️ and lots of ☕</span>
              <span>•</span>
              <span className="text-neon-green animate-pulse">Available for hire!</span>
            </div>
          </div>
        </div>
        
        {/* Floating Cricket Ball */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-neon-red rounded-full animate-bounce-gentle opacity-20" />
      </footer>
    </div>
  );
};

export default Index;
