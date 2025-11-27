import React, { useState } from 'react';
import SolarSystemSVG from './components/SolarSystemSVG';
import InfoPanel from './components/InfoPanel';
import { Planet, Language } from './types';
import { Rocket, Languages, Settings, ToggleLeft, ToggleRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as requested implies interest
  const [showAsteroids, setShowAsteroids] = useState(true);
  const [showKuiper, setShowKuiper] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handlePlanetSelect = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
  };

  const toggleLanguage = () => {
      setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="w-full h-screen relative flex flex-col">
      {/* Top Navbar overlay */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tighter flex items-center gap-3 drop-shadow-lg">
            <Rocket className="text-blue-500" />
            {language === 'zh' ? '太阳系探索' : 'Solar System Explorer'}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-md hidden md:block drop-shadow-md">
            {language === 'zh' 
             ? '由 Gemini AI 驱动的交互式可视化。点击行星开始探索。' 
             : 'Interactive visualization powered by Gemini AI. Click a planet to begin your journey.'}
          </p>
        </div>

        <div className="flex gap-2 pointer-events-auto relative">
            {/* Settings Toggle */}
            <button 
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 text-white w-10 h-10 rounded-full backdrop-blur-md border border-slate-600 transition-all shadow-lg"
            >
                <Settings size={20} />
            </button>

            {/* Language Toggle */}
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-4 py-2 rounded-full backdrop-blur-md border border-slate-600 transition-all shadow-lg font-mono text-sm"
            >
                <Languages size={16} />
                <span>{language === 'en' ? 'CN' : 'EN'}</span>
            </button>

            {/* Settings Dropdown */}
            {showSettings && (
                <div className="absolute top-12 right-0 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-4 flex flex-col gap-4 z-50">
                    <h3 className="text-white font-semibold border-b border-slate-700 pb-2">
                        {language === 'zh' ? '显示设置' : 'Display Settings'}
                    </h3>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">
                            {language === 'zh' ? '小行星带' : 'Asteroid Belt'}
                        </span>
                        <button onClick={() => setShowAsteroids(!showAsteroids)} className="text-blue-400">
                            {showAsteroids ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-slate-500" />}
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">
                            {language === 'zh' ? '柯伊伯带' : 'Kuiper Belt'}
                        </span>
                        <button onClick={() => setShowKuiper(!showKuiper)} className="text-blue-400">
                            {showKuiper ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-slate-500" />}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <SolarSystemSVG 
          onSelectPlanet={handlePlanetSelect} 
          selectedPlanetId={selectedPlanet?.id || null}
          language={language}
          showAsteroidBelt={showAsteroids}
          showKuiperBelt={showKuiper}
        />
        
        {/* Info Panel Slide-over */}
        {selectedPlanet && (
          <InfoPanel 
            planet={selectedPlanet} 
            onClose={handleClosePanel} 
            language={language}
          />
        )}
      </div>
      
      {/* Mobile Hint (only shows if no planet selected) */}
      {!selectedPlanet && (
        <div className="absolute bottom-10 w-full text-center pointer-events-none animate-pulse md:hidden">
          <span className="bg-slate-900/80 text-slate-300 px-4 py-2 rounded-full text-xs border border-slate-700">
             {language === 'zh' ? '点击行星进行探索' : 'Tap on a planet to explore'}
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
