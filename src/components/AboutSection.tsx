import { useEffect, useRef, useState } from 'react';

const aboutText = [
  "Hey there! I'm Joy Vaghela, a passionate developer who believes in turning complex problems into elegant solutions.",
  "When I'm not coding, you'll find me exploring new technologies and pushing the boundaries of what's possible in web development.",
  "I bring precision and dedication to my development work, creating applications that perform under pressure and deliver exceptional user experiences.",
  "My journey in tech started with curiosity and has evolved into a mission to build digital experiences that make a difference."
];

const skills = [
  { name: "Frontend Development", icon: "💻", level: 95 },
  { name: "Backend Development", icon: "⚡", level: 88 },
  { name: "Problem Solving", icon: "🧩", level: 92 },
  { name: "Team Leadership", icon: "👥", level: 85 },
];

export const AboutSection = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate paragraphs
          aboutText.forEach((_, index) => {
            setTimeout(() => {
              setVisibleParagraphs((prev) => Math.max(prev, index + 1));
            }, index * 500);
          });

          // Animate skills
          setTimeout(() => {
            skills.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            });
          }, 1500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side - Story */}
        <div className="space-y-6">
          {aboutText.map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg leading-relaxed text-blue-700 transition-all duration-1000 ${
                visibleParagraphs > index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {paragraph}
            </p>
          ))}

          {/* Philosophy */}
          <div
            className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-1000 ${
              visibleParagraphs >= 4
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
              <span className="animate-bounce">💡</span>
              Development Philosophy
            </h3>
            <p className="text-blue-700">
              "Every line of code matters. Whether you're building a simple component or a complex application, 
              it's about attention to detail, clean architecture, and creating solutions that scale."
            </p>
          </div>
        </div>

        {/* Right Side - Skills & Stats */}
        <div className="space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Years Coding", value: "5+" },
              { label: "Projects Built", value: "50+" },
              { label: "Technologies", value: "20+" },
              { label: "Happy Clients", value: "30+" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white/80 backdrop-blur-sm p-6 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-1000 ${
                  visibleParagraphs >= 2
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl font-black text-blue-600 animate-pulse">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-600/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Skills with Progress */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">Core Strengths</h3>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl ${
                  animatedSkills[index]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 font-semibold text-blue-700">
                    <span className="animate-bounce">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <span className="text-blue-600 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-2000 ease-out"
                    style={{
                      width: animatedSkills[index] ? `${skill.level}%` : '0%',
                      transitionDelay: '300ms'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: "📧", label: "Email", value: "joyvaghela66@gmail.com" },
              { icon: "📱", label: "Phone", value: "+91 91738 08700" },
            ].map((contact, i) => (
              <div
                key={contact.label}
                className={`bg-white/80 backdrop-blur-sm p-4 text-center rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-1000 ${
                  visibleParagraphs >= 3
                    ? 'opacity-100 rotate-0'
                    : 'opacity-0 rotate-12'
                }`}
                style={{ transitionDelay: `${i * 200 + 1000}ms` }}
              >
                <div className="text-2xl mb-2 animate-bounce">{contact.icon}</div>
                <div className="text-xs text-blue-600/70">{contact.label}</div>
                <div className="text-sm font-semibold text-blue-700">{contact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
