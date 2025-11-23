import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from './components/GlassCard';
import { Button } from './components/Button';
import { generateAestheticText } from './services/geminiService';
import { AestheticResponse, ThemeMode } from './types';
import { RefreshCw, Layout, Maximize2, Minimize2, Eye, EyeOff } from 'lucide-react';

const App: React.FC = () => {
  // Default to Transparent as requested
  const [data, setData] = useState<AestheticResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.Transparent);
  const [uiVisible, setUiVisible] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await generateAestheticText();
    setData(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Background style logic
  let backgroundStyle = '';
  switch (theme) {
    case ThemeMode.Gradient:
      backgroundStyle = 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500';
      break;
    case ThemeMode.Dark:
      backgroundStyle = 'bg-slate-900';
      break;
    case ThemeMode.Transparent:
      // Truly transparent for overlays
      backgroundStyle = 'bg-transparent';
      break;
  }

  // Handle keyboard shortcut to toggle UI for clean screenshots/overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h') {
        setUiVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-700 ease-in-out ${backgroundStyle} overflow-hidden relative`}>
      
      {/* Decorative Orbs (Only visible in non-transparent modes for aesthetics) */}
      {theme !== ThemeMode.Transparent && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </>
      )}

      {/* Main Content Area */}
      <GlassCard 
        intensity={theme === ThemeMode.Transparent ? 'high' : 'medium'} 
        className={`max-w-2xl w-full p-12 text-center relative z-10 group transition-all duration-500 ${uiVisible ? 'translate-y-0 opacity-100' : 'translate-y-4'}`}
      >
        {/* Toggle UI Visibility Button (Floating) */}
        <div className={`absolute top-4 right-4 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
             <Button variant="icon" onClick={() => setUiVisible(!uiVisible)} title="Toggle UI (Press 'h')">
                {uiVisible ? <Eye size={18} /> : <EyeOff size={18} />}
             </Button>
        </div>

        {loading ? (
          <div className="h-48 flex flex-col items-center justify-center space-y-4 animate-fade-in">
             <div className="w-12 h-12 border-4 border-blue-200/30 border-t-blue-300 rounded-full animate-spin"></div>
             <p className="text-blue-200/80 font-sans text-sm tracking-widest uppercase shadow-black/50 drop-shadow-md">Dreaming...</p>
          </div>
        ) : (
          <div className="animate-fade-in min-h-[12rem] flex flex-col justify-center">
             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-blue-300 leading-tight mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
               "{data?.text}"
             </h1>
             {data?.author && (
               <p className="font-sans text-blue-200 text-lg tracking-wide uppercase font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                 — {data.author}
               </p>
             )}
          </div>
        )}

        {/* Controls - Hide when UI is toggled off */}
        <div className={`mt-12 flex flex-col md:flex-row items-center justify-center gap-4 transition-all duration-500 ${uiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <Button onClick={fetchData} disabled={loading}>
            <span className="flex items-center gap-2">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Inspire Me
            </span>
          </Button>

          <div className="flex bg-black/40 rounded-full p-1 border border-white/20 backdrop-blur-md">
            <button
              onClick={() => setTheme(ThemeMode.Gradient)}
              className={`p-2 rounded-full transition-all ${theme === ThemeMode.Gradient ? 'bg-white/20 text-blue-200 shadow-sm' : 'text-white/70 hover:text-blue-200'}`}
              title="Gradient Mode"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => setTheme(ThemeMode.Dark)}
              className={`p-2 rounded-full transition-all ${theme === ThemeMode.Dark ? 'bg-white/20 text-blue-200 shadow-sm' : 'text-white/70 hover:text-blue-200'}`}
              title="Dark Mode"
            >
               <Minimize2 size={16} />
            </button>
            <button
              onClick={() => setTheme(ThemeMode.Transparent)}
              className={`p-2 rounded-full transition-all ${theme === ThemeMode.Transparent ? 'bg-white/20 text-blue-200 shadow-sm' : 'text-white/70 hover:text-blue-200'}`}
              title="Transparent Overlay Mode"
            >
               <Layout size={16} />
            </button>
          </div>
        </div>
      </GlassCard>
      
      {/* Footer Info - Always hide in transparent mode to keep it clean */}
       <div className={`fixed bottom-4 text-blue-200/60 text-xs font-sans tracking-wider transition-opacity duration-500 drop-shadow-md ${uiVisible && theme !== ThemeMode.Transparent ? 'opacity-100' : 'opacity-0'}`}>
        LUMINA AESTHETIC ENGINE • PRESS 'H' TO HIDE UI
      </div>
    </div>
  );
};

export default App;