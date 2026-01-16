interface CustomizePanelProps {
  use24Hour: boolean;
  gradientStyle: string;
  motionStyle: 'calm' | 'live';
  showSeconds: boolean;
  onUse24HourChange: (value: boolean) => void;
  onGradientStyleChange: (value: string) => void;
  onMotionStyleChange: (value: 'calm' | 'live') => void;
  onShowSecondsChange: (value: boolean) => void;
  onClose: () => void;
}

const gradientOptions = [
  { value: 'from-slate-400 via-gray-300 to-zinc-400', label: 'Metallic' },
  { value: 'from-blue-400 via-cyan-300 to-sky-400', label: 'Winter' },
  { value: 'from-orange-500 via-amber-400 to-red-500', label: 'Fall' },
  { value: 'from-purple-600 via-blue-700 to-indigo-800', label: 'Space' },
  { value: 'from-emerald-600 via-green-500 to-teal-600', label: 'Forest' },
  { value: 'from-rose-500 via-orange-400 to-yellow-400', label: 'Sunset' },
];

export function CustomizePanel({
  use24Hour,
  gradientStyle,
  motionStyle,
  showSeconds,
  onUse24HourChange,
  onGradientStyleChange,
  onMotionStyleChange,
  onShowSecondsChange,
  onClose
}: CustomizePanelProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-800 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Customize</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Time Format */}
        <div>
          <label className="block text-sm font-medium mb-3">Time Format</label>
          <div className="flex gap-2">
            <button
              onClick={() => onUse24HourChange(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                !use24Hour
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              12-Hour
            </button>
            <button
              onClick={() => onUse24HourChange(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                use24Hour
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              24-Hour
            </button>
          </div>
        </div>

        {/* Show Seconds */}
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium">Show Seconds</span>
            <button
              onClick={() => onShowSecondsChange(!showSeconds)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${showSeconds ? 'bg-white' : 'bg-gray-700'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-black transition-transform
                  ${showSeconds ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </label>
        </div>

        {/* Motion Style */}
        <div>
          <label className="block text-sm font-medium mb-3">Motion Style</label>
          <div className="flex gap-2">
            <button
              onClick={() => onMotionStyleChange('calm')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                motionStyle === 'calm'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Calm
            </button>
            <button
              onClick={() => onMotionStyleChange('live')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                motionStyle === 'live'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Live
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {motionStyle === 'calm' 
              ? 'Smooth transitions between seconds' 
              : 'Real-time smooth animation'}
          </p>
        </div>

        {/* Gradient Style */}
        <div>
          <label className="block text-sm font-medium mb-3">Gradient Theme</label>
          <div className="space-y-2">
            {gradientOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onGradientStyleChange(option.value)}
                className={`
                  w-full p-3 rounded-lg flex items-center justify-between
                  transition-colors
                  ${gradientStyle === option.value
                    ? 'bg-gray-800 ring-2 ring-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                  }
                `}
              >
                <span>{option.label}</span>
                <div 
                  className={`w-16 h-6 rounded bg-gradient-to-r ${option.value}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Save to Config */}
        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={() => {
              const config = {
                use24Hour,
                gradientStyle,
                motionStyle,
                showSeconds,
                lastUpdated: new Date().toISOString()
              };
              localStorage.setItem('gradientClockConfig', JSON.stringify(config));
              alert('Configuration saved!');
            }}
            className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-medium"
          >
            💾 Save Configuration
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Sync across phone, watch, and widget
          </p>
        </div>
      </div>
    </div>
  );
}
