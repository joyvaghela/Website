import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern e-commerce platform with advanced features like AR try-on and real-time inventory management.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "🛒",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Comprehensive platform for managing tasks, projects, and team collaboration with real-time updates.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    image: "📋",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "Web App"
  },
  {
    id: 3,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning for customer support and automated responses.",
    tech: ["Python", "TensorFlow", "Flask", "React"],
    image: "🤖",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "AI/ML"
  },
  {
    id: 4,
    title: "3D Portfolio Website",
    description: "Interactive 3D portfolio with Three.js animations and immersive user experience.",
    tech: ["Three.js", "WebGL", "React", "Vite"],
    image: "🎨",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "Creative"
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management with real-time data visualization.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    image: "📊",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "Analytics"
  },
  {
    id: 6,
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans and progress monitoring.",
    tech: ["React Native", "Firebase", "Redux", "Expo"],
    image: "💪",
    color: "blue-600",
    github: "#",
    live: "#",
    category: "Mobile App"
  }
];

const categories = ["All", "Full Stack", "Web App", "AI/ML", "Creative", "Analytics", "Mobile App"];

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentProject, setCurrentProject] = useState(0);
  const [animatedProjects, setAnimatedProjects] = useState<boolean[]>([]);
  const [autoRotate, setAutoRotate] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          projects.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedProjects(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate showcase
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % filteredProjects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredProjects.length, autoRotate]);

  const handleProjectClick = (index: number) => {
    setCurrentProject(index);
    setAutoRotate(false);
    
    // Create particle explosion effect
    const projectCard = document.getElementById(`project-${index}`);
    if (projectCard) {
      const rect = projectCard.getBoundingClientRect();
      createParticleExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const createParticleExplosion = (x: number, y: number) => {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.transform = `translate(-50%, -50%)`;
      
      document.body.appendChild(particle);
      
      const angle = (i / 15) * Math.PI * 2;
      const velocity = 100 + Math.random() * 100;
      const finalX = x + Math.cos(angle) * velocity;
      const finalY = y + Math.sin(angle) * velocity;
      
      particle.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(${finalX - x}px, ${finalY - y}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => particle.remove();
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6 animate-fade-up">
            Featured Projects
          </h2>
          <p className="text-xl text-blue-700 animate-scale-in">
            Where innovation meets coding excellence
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-4 animate-scale-in" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setAutoRotate(true);
                setCurrentProject(0);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Showcase */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            {filteredProjects.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Project Display */}
                <div className="relative">
                  <div className="text-center p-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                    <div className="text-8xl mb-4 animate-bounce-gentle">
                      {filteredProjects[currentProject]?.image}
                    </div>
                    <div className="text-sm text-blue-600/70">
                      Project {currentProject + 1} of {filteredProjects.length}
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentProject(prev => 
                      prev === 0 ? filteredProjects.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentProject(prev => 
                      (prev + 1) % filteredProjects.length
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                  >
                    →
                  </button>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-blue-700">
                      {filteredProjects[currentProject]?.title}
                    </h3>
                    <p className="text-lg text-blue-600">
                      {filteredProjects[currentProject]?.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-700">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredProjects[currentProject]?.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      variant="default"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:shadow-lg transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleProjectClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? 'bg-blue-500 scale-125 shadow-md'
                    : 'bg-blue-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${index}`}
              className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 group ${
                animatedProjects[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => handleProjectClick(index)}
            >
              {/* Project Icon */}
              <div className="text-5xl mb-4 group-hover:animate-bounce">
                {project.image}
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-bold mb-2 text-blue-700 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-blue-600 mb-4 text-sm line-clamp-2">
                {project.description}
              </p>

              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-4">
                {project.category}
              </span>

              {/* Hover Links */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:bg-blue-50">
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:bg-blue-50">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Demo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Want to see more? 🚀
            </h3>
            <p className="text-blue-600 mb-6">
              Check out my GitHub for more projects and contributions to the developer community.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:shadow-lg transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              Visit GitHub Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};