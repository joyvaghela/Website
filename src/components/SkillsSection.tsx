import { useState, useEffect, useRef } from 'react';

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: "💻",
    color: "blue-600",
    skills: [
      { name: "React/Next.js", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 90, icon: "📘" },
      { name: "TailwindCSS", level: 88, icon: "🎨" },
      { name: "Three.js", level: 85, icon: "🌟" },
    ]
  },
  {
    title: "Backend Power",
    icon: "⚡",
    color: "blue-600",
    skills: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" },
    ]
  },
  {
    title: "Data Analytics",
    icon: "📊",
    color: "blue-600",
    skills: [
      { name: "Data Analysis", level: 92, icon: "📊" },
      { name: "ML Models", level: 85, icon: "🤖" },
      { name: "Business Intelligence", level: 95, icon: "📈" },
      { name: "Strategy", level: 90, icon: "🎯" },
    ]
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    color: "blue-600",
    skills: [
      { name: "Leadership", level: 88, icon: "👑" },
      { name: "Teamwork", level: 95, icon: "🤜" },
      { name: "Communication", level: 85, icon: "💬" },
      { name: "Problem Solving", level: 92, icon: "🧩" },
    ]
  }
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [floatingSkills, setFloatingSkills] = useState<Array<{id: number, x: number, y: number, skill: any}>>([]);
  const [animatedSkills, setAnimatedSkills] = useState<boolean[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate skill categories
          skillCategories.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 300);
          });

          // Generate floating skills
          setTimeout(() => {
            const skills = skillCategories.flatMap(cat => cat.skills);
            const floating = skills.map((skill, index) => ({
              id: index,
              x: Math.random() * 80 + 10,
              y: Math.random() * 80 + 10,
              skill
            }));
            setFloatingSkills(floating);
          }, 1000);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate floating skills
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingSkills(prev => 
        prev.map(skill => ({
          ...skill,
          x: (skill.x + (Math.random() - 0.5) * 5) % 90 + 5,
          y: (skill.y + (Math.random() - 0.5) * 5) % 90 + 5,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSkillClick = (skill: any, event: React.MouseEvent) => {
    setSelectedSkill(skill);
    
    // Create particle animation
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    createParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const createParticleEffect = (x: number, y: number) => {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'fixed w-1 h-1 bg-blue-500 rounded-full pointer-events-none z-50';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      document.body.appendChild(particle);
      
      const angle = (i / 15) * Math.PI * 2;
      const velocity = 30 + Math.random() * 60;
      const finalX = x + Math.cos(angle) * velocity;
      const finalY = y + Math.sin(angle) * velocity;
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)', 
          opacity: 1,
          backgroundColor: '#3b82f6'
        },
        { 
          transform: `translate(${finalX - x}px, ${finalY - y}px) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: 600 + Math.random() * 300,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => particle.remove();
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6 animate-fade-up">
            Skills Playground
          </h2>
          <p className="text-xl text-blue-700 animate-scale-in">
            Interactive constellation of abilities
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-4 animate-scale-in" />
        </div>

        {/* Floating Skills Background */}
        <div className="absolute inset-0 overflow-hidden">
          {floatingSkills.map((floatingSkill) => (
            <div
              key={floatingSkill.id}
              className="absolute transition-all duration-3000 ease-in-out opacity-20 hover:opacity-40 cursor-pointer"
              style={{
                left: `${floatingSkill.x}%`,
                top: `${floatingSkill.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => handleSkillClick(floatingSkill.skill, e)}
            >
              <div className="text-4xl animate-bounce-gentle">
                {floatingSkill.skill.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              className={`bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl group ${
                activeCategory === index ? 'shadow-xl scale-105' : 'hover:scale-105'
              } ${animatedSkills[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2 group-hover:animate-bounce">
                {category.icon}
              </div>
              <div className={`text-sm font-bold ${
                activeCategory === index ? 'text-blue-600' : 'text-blue-700'
              }`}>
                {category.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Category Skills */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold text-center mb-8 text-blue-600">
              {skillCategories[activeCategory].title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group cursor-pointer"
                  onClick={(e) => handleSkillClick(skill, e)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:animate-bounce">
                        {skill.icon}
                      </span>
                      <span className="font-semibold text-blue-700 group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-bold text-blue-600 text-xl">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-4 bg-blue-100 rounded-full overflow-hidden group-hover:shadow-md">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-2000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Constellation Map */}
        <div className="mt-16 relative">
          <h3 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Skill Constellation
          </h3>
          
          <div className="relative h-96 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl">
            {/* Stars/Connections */}
            <svg className="absolute inset-0 w-full h-full">
              {skillCategories.map((_, catIndex) => 
                skillCategories.map((_, nextCatIndex) => {
                  if (catIndex >= nextCatIndex) return null;
                  const x1 = 20 + (catIndex % 2) * 60;
                  const y1 = 20 + Math.floor(catIndex / 2) * 60;
                  const x2 = 20 + (nextCatIndex % 2) * 60;
                  const y2 = 20 + Math.floor(nextCatIndex / 2) * 60;
                  
                  return (
                    <line
                      key={`${catIndex}-${nextCatIndex}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#3b82f6"
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-pulse"
                    />
                  );
                })
              )}
            </svg>
            
            {/* Skill Nodes */}
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={`absolute w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${
                  activeCategory === index ? 'scale-125 shadow-xl' : ''
                }`}
                style={{
                  left: `${20 + (index % 2) * 60}%`,
                  top: `${20 + Math.floor(index / 2) * 60}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActiveCategory(index)}
              >
                <span className="text-2xl">{category.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Skill Details Modal */}
        {selectedSkill && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <div 
              className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl max-w-md w-full animate-scale-in shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {selectedSkill.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  {selectedSkill.name}
                </h3>
                <div className="text-4xl font-black text-blue-600 mb-4">
                  {selectedSkill.level}%
                </div>
                <p className="text-blue-700 mb-6">
                  Expert level proficiency with hands-on experience in real-world projects.
                </p>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Got it! 🎯
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};