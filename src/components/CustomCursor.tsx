import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails(prev => [...prev.slice(-8), newTrail]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] w-2 h-2 rounded-full bg-blue-500"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: (index + 1) / trails.length * 0.6,
            transform: `scale(${(index + 1) / trails.length})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] w-6 h-6 rounded-full transition-transform duration-75 ease-out ${
          isClicking ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 12,
          top: position.y - 12,
          background: 'radial-gradient(circle, #3b82f6 0%, rgba(59, 130, 246, 0.8) 40%, transparent 70%)',
          boxShadow: '0 0 20px #3b82f6, 0 0 40px #3b82f6',
        }}
      />

      {/* Ripple effect on click */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] w-12 h-12 rounded-full border-2 border-blue-500 animate-ping"
          style={{
            left: position.x - 24,
            top: position.y - 24,
          }}
        />
      )}
    </>
  );
};