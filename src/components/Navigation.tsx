import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center space-x-1 p-2 rounded-2xl">
        {/* JV Logo */}
        <div className="flex items-center mr-4 pl-4">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse">
            JV
          </div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            className={`relative px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
              activeSection === item.href.slice(1)
                ? 'text-blue-600 bg-blue-50 shadow-md'
                : 'text-blue-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {item.name}
            
            {/* Active indicator */}
            {activeSection === item.href.slice(1) && (
              <div className="absolute inset-0 rounded-xl border border-blue-300 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};