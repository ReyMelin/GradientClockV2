export interface Design {
  id: string;
  name: string;
  gradient: string;
  preview: string;
}

export const designs: Design[] = [
  {
    id: 'metallic',
    name: 'Metallic',
    gradient: 'from-slate-400 via-gray-300 to-zinc-400',
    preview: 'Silver/platinum gradient with copper accents'
  },
  {
    id: 'winter',
    name: 'Winter',
    gradient: 'from-blue-400 via-cyan-300 to-sky-400',
    preview: 'Icy blue and cool cyan tones'
  },
  {
    id: 'fall',
    name: 'Fall',
    gradient: 'from-orange-500 via-amber-400 to-red-500',
    preview: 'Warm autumn colors'
  },
  {
    id: 'space',
    name: 'Space',
    gradient: 'from-purple-600 via-blue-700 to-indigo-800',
    preview: 'Deep space purple and blue'
  },
  {
    id: 'forest',
    name: 'Forest',
    gradient: 'from-emerald-600 via-green-500 to-teal-600',
    preview: 'Natural forest greens'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    gradient: 'from-rose-500 via-orange-400 to-yellow-400',
    preview: 'Warm sunset gradient'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    preview: 'Deep ocean blues'
  },
  {
    id: 'flowerpower',
    name: 'Flower Power',
    gradient: 'from-pink-500 via-yellow-400 to-purple-500',
    preview: 'Vibrant floral colors'
  },
  {
    id: 'rgb',
    name: 'RGB',
    gradient: 'from-red-500 via-green-500 to-blue-500',
    preview: 'Classic RGB spectrum'
  },
  {
    id: 'christmas',
    name: 'Christmas',
    gradient: 'from-red-600 via-green-600 to-yellow-500',
    preview: 'Holiday red and green'
  },
  {
    id: 'halloween',
    name: 'Halloween',
    gradient: 'from-orange-600 via-purple-600 to-green-800',
    preview: 'Spooky orange and purple'
  }
];

interface ClockGalleryProps {
  selectedDesign: string;
  onSelectDesign: (designId: string) => void;
}

export function ClockGallery({ selectedDesign, onSelectDesign }: ClockGalleryProps) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Gradient Clock Gallery</h1>
        <p className="text-gray-400 mb-8">Choose a design to preview</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <button
              key={design.id}
              onClick={() => onSelectDesign(design.id)}
              className={`
                group relative overflow-hidden rounded-xl p-6 
                transition-all duration-300 hover:scale-105
                ${selectedDesign === design.id 
                  ? 'ring-2 ring-white' 
                  : 'ring-1 ring-gray-700 hover:ring-gray-500'
                }
              `}
            >
              <div className={`
                absolute inset-0 bg-gradient-to-br ${design.gradient} 
                opacity-20 group-hover:opacity-30 transition-opacity
              `} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{design.name}</h3>
                  {selectedDesign === design.id && (
                    <span className="text-green-400">✓</span>
                  )}
                </div>
                
                <div className={`
                  h-32 rounded-lg bg-gradient-to-br ${design.gradient}
                  flex items-center justify-center mb-4
                  shadow-lg
                `}>
                  <div className="text-4xl font-light">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">{design.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
