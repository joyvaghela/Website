import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-200 to-white flex items-center justify-center">
      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* JV Logo Animation */}
        <div className="mb-12">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse-gentle">
            JV
          </h1>
          <p className="text-2xl text-blue-700 mt-4 animate-fade-in">
            Joy Vaghela
          </p>
        </div>

        {/* Simple Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-blue-600 mt-4 text-lg">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};