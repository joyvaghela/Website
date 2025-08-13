import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import joyProfile from '@/assets/joy-profile.jpg';

export const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Joy Vaghela";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= fullText.length; i++) {
        setTypedText(fullText.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    };
    
    const timer = setTimeout(typeText, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-white" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6 animate-fade-up">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-black">
                <span className="block text-blue-400">Hello, I'm</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 relative">
                  {typedText}
                  <span className="animate-pulse">|</span>
                  {/* Individual letter animations */}
                  {Array.from(typedText).map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block animate-bounce-gentle"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </span>
              </h1>
              
              <div className="text-xl lg:text-2xl text-blue-700 space-y-2">
                <p className="animate-slide-right" style={{ animationDelay: '2s' }}>
                  💻 Full Stack Developer
                </p>
                <p className="animate-slide-right" style={{ animationDelay: '2.5s' }}>
                  🚀 Building the Future with Code
                </p>
                <p className="animate-slide-right" style={{ animationDelay: '3s' }}>
                  🎯 Turning Ideas into Digital Reality
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-lg"
              >
                View My Work 🎯
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/80 backdrop-blur-sm text-blue-700 border-blue-300 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 text-lg"
              >
                Let's Connect 🤝
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "Projects", value: "50+", icon: "💻" },
                { label: "Experience", value: "5+ Years", icon: "⭐" },
                { label: "Code Commits", value: "1000+", icon: "🚀" }
              ].map((stat, i) => (
                <div 
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm p-4 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${3.5 + i * 0.2}s` }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-blue-600/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end animate-scale-in" style={{ animationDelay: '1s' }}>
            <div className="relative">
              {/* Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 p-1 animate-pulse">
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>
              
              {/* Profile Image */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <img 
                  src={joyProfile} 
                  alt="Joy Vaghela" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg animate-bounce-gentle">
                  <span className="text-blue-600 font-bold">Available for Hire! 🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};