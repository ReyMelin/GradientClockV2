import { useState, useEffect } from 'react';

interface ClockPreviewProps {
  gradient: string;
  showSeconds: boolean;
  motionStyle: 'calm' | 'live';
  use24Hour: boolean;
  onBack: () => void;
  onCustomize: () => void;
  onApply: () => void;
}

export function ClockPreview({
  gradient,
  showSeconds,
  motionStyle,
  use24Hour,
  onBack,
  onCustomize,
  onApply
}: ClockPreviewProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, motionStyle === 'live' ? 50 : 1000);

    return () => clearInterval(interval);
  }, [motionStyle]);

  const formatTime = (date: Date) => {
    const hours = use24Hour 
      ? date.getHours().toString().padStart(2, '0')
      : (date.getHours() % 12 || 12).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = use24Hour ? '' : (date.getHours() >= 12 ? ' PM' : ' AM');

    return showSeconds 
      ? `${hours}:${minutes}:${seconds}${ampm}`
      : `${hours}:${minutes}${ampm}`;
  };

  // Calculate rotation angles for concentric rings
  const secondsAngle = (time.getSeconds() + time.getMilliseconds() / 1000) * 6; // 360/60
  const minutesAngle = (time.getMinutes() + time.getSeconds() / 60) * 6;
  const hoursAngle = ((time.getHours() % 12) + time.getMinutes() / 60) * 30; // 360/12

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onCustomize}
            className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            Customize
          </button>
          <button
            onClick={onApply}
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Clock Display */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-full max-w-2xl aspect-square">
          {/* Concentric Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Hours Ring - Inner */}
            <div 
              className={`absolute w-[58%] h-[58%] rounded-full bg-gradient-to-br ${gradient} opacity-80`}
              style={{
                transform: `rotate(${hoursAngle}deg)`,
                transition: motionStyle === 'calm' ? 'transform 1s ease-out' : 'none',
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'
              }}
            />

            {/* Minutes Ring - Middle */}
            <div 
              className={`absolute w-[83%] h-[83%] rounded-full bg-gradient-to-br ${gradient} opacity-60`}
              style={{
                transform: `rotate(${minutesAngle}deg)`,
                transition: motionStyle === 'calm' ? 'transform 1s ease-out' : 'none',
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'
              }}
            />

            {/* Seconds Ring - Outer */}
            {showSeconds && (
              <div 
                className={`absolute w-full h-full rounded-full bg-gradient-to-br ${gradient} opacity-40`}
                style={{
                  transform: `rotate(${secondsAngle}deg)`,
                  transition: motionStyle === 'calm' ? 'transform 0.5s ease-out' : 'none',
                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)'
                }}
              />
            )}

            {/* Center with Time */}
            <div className="relative z-10 text-center">
              <div className="text-6xl md:text-8xl font-light tracking-wider">
                {formatTime(time)}
              </div>
              <div className="mt-4 text-gray-400 text-lg">
                {time.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
