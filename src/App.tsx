import { useState } from 'react';
import { ClockGallery, designs } from './components/ClockGallery';
import { ClockPreview } from './components/ClockPreview';
import { CustomizePanel } from './components/CustomizePanel';

type Screen = 'gallery' | 'preview' | 'customize';

export default function App() {
  const [screen, setScreen] = useState<Screen>('gallery');
  const [selectedDesign, setSelectedDesign] = useState(designs[0].id);
  const [use24Hour, setUse24Hour] = useState(false);
  const [gradientStyle, setGradientStyle] = useState(designs[0].gradient);
  const [motionStyle, setMotionStyle] = useState<'calm' | 'live'>('calm');
  const [showSeconds, setShowSeconds] = useState(true);

  const handleSelectDesign = (designId: string) => {
    setSelectedDesign(designId);
    const design = designs.find(d => d.id === designId);
    if (design) {
      setGradientStyle(design.gradient);
      setScreen('preview');
    }
  };

  const handleApply = () => {
    // In a real app, this would apply the design
    console.log('Design applied!');
    setScreen('gallery');
  };

  return (
    <div className="dark">
      {screen === 'gallery' && (
        <ClockGallery
          selectedDesign={selectedDesign}
          onSelectDesign={handleSelectDesign}
        />
      )}

      {screen === 'preview' && (
        <ClockPreview
          gradient={gradientStyle}
          showSeconds={showSeconds}
          motionStyle={motionStyle}
          use24Hour={use24Hour}
          onBack={() => setScreen('gallery')}
          onCustomize={() => setScreen('customize')}
          onApply={handleApply}
        />
      )}

      {screen === 'customize' && (
        <>
          <ClockPreview
            gradient={gradientStyle}
            showSeconds={showSeconds}
            motionStyle={motionStyle}
            use24Hour={use24Hour}
            onBack={() => setScreen('gallery')}
            onCustomize={() => setScreen('customize')}
            onApply={handleApply}
          />
          <CustomizePanel
            use24Hour={use24Hour}
            gradientStyle={gradientStyle}
            motionStyle={motionStyle}
            showSeconds={showSeconds}
            onUse24HourChange={setUse24Hour}
            onGradientStyleChange={setGradientStyle}
            onMotionStyleChange={setMotionStyle}
            onShowSecondsChange={setShowSeconds}
            onClose={() => setScreen('preview')}
          />
        </>
      )}
    </div>
  );
}
