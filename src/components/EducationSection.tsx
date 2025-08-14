import { useEffect, useRef, useState } from 'react';

const educationData = [
  {
    year: "2024",
    title: "BscIT FY",
    institution: "Sardar Vallabhbhai Patel Institute of Technology",
    percentage: "Pending",
    achievements: ["Dean's List", "Tech Lead", "Project Manager"],
    icon: "🎓",
    color: "blue-600"
  },
  {
    year: "2020",
    title: "Higher Secondary (12th)",
    institution: "Lal Bahadur Shashtari Vidhyalaya ",
    percentage: "71%",
    achievements: ["Programming Club", "Academic Excellence", "Student Council"],
    icon: "📚",
    color: "blue-600"
  },
  {
    year: "2018",
    title: "Secondary School (10th)",
    institution: "Lal Bahadur Shashtari Vidhyalaya",
    percentage: "55%",
    achievements: ["Math Olympiad", "Student Leader", "Science Fair Winner"],
    icon: "🏆",
    color: "blue-600"
  },
];

export const EducationSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [animatedCards, setAnimatedCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          educationData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 400);
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

  return (
    <section id="education" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6 animate-fade-up">
            Education Journey
          </h2>
          <p className="text-xl text-blue-700 animate-scale-in">
            Building knowledge and skills for the future
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-4 animate-scale-in" />
        </div>

        {/* 3D Timeline */}
        <div className="relative">
          {/* Timeline Path */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-30 rounded-full" />
          
          {/* Animated Path Progress */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-3000 ease-out shadow-md"
            style={{ 
              height: animatedCards.length > 0 ? '100%' : '0%',
              transitionDelay: '500ms'
            }}
          />

          <div className="space-y-16">
            {educationData.map((item, index) => (
              <div
                key={item.year}
                className={`relative transition-all duration-1000 ${
                  animatedCards[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                  <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce-gentle ${
                    animatedCards[index] ? 'animate-pulse' : ''
                  }`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`${index % 2 === 0 ? 'lg:pr-1/2 lg:text-right' : 'lg:pl-1/2 lg:ml-8'}`}>
                  <div
                    className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 ${
                      activeCard === index ? 'shadow-xl scale-105' : 'hover:scale-105'
                    }`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Year Badge */}
                    <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm mb-4 animate-pulse">
                      {item.year}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 text-blue-700">
                      {item.title}
                    </h3>

                    {/* Institution */}
                    <p className="text-lg text-blue-600 mb-4">
                      {item.institution}
                    </p>

                    {/* Percentage with Animation */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600/70">Academic Performance</span>
                        <span className="font-bold text-blue-600 text-xl">
                          {item.percentage}
                        </span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-2000 ease-out"
                          style={{
                            width: animatedCards[index] ? '100%' : '0%',
                            transitionDelay: `${index * 400 + 800}ms`
                          }}
                        />
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-700">Key Achievements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.achievements.map((achievement, i) => (
                          <span
                            key={achievement}
                            className={`px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm transition-all duration-500 hover:bg-blue-200 ${
                              animatedCards[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}
                            style={{ transitionDelay: `${index * 400 + i * 200 + 1000}ms` }}
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect - Additional Info */}
                    {activeCard === index && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl animate-scale-in">
                        <p className="text-sm text-blue-700">
                          {index === 0 && "Currently pursuing final year with focus on full-stack development and modern web technologies."}
                          {index === 1 && "Discovered my passion for programming while leading various school initiatives and clubs."}
                          {index === 2 && "Where it all began - the foundation of my academic journey and love for problem-solving."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl max-w-2xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Journey Highlights
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">5+</div>
                <div className="text-sm text-blue-600/70">Years Learning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">15+</div>
                <div className="text-sm text-blue-600/70">Awards Won</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">90%+</div>
                <div className="text-sm text-blue-600/70">Avg Performance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};