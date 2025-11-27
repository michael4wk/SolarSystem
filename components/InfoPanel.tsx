import React, { useState, useRef, useEffect } from 'react';
import { Planet, ChatMessage, Language } from '../types';
import { askPlanetQuestion } from '../services/geminiService';
import { X, Send, Thermometer, Activity, Info, Sparkles } from 'lucide-react';

interface InfoPanelProps {
  planet: Planet | null;
  onClose: () => void;
  language: Language;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose, language }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when planet changes
  useEffect(() => {
    setChatHistory([]);
    setQuestion('');
    setIsLoading(false);
  }, [planet, language]); // Clear chat if language changes too

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  if (!planet) return null;

  const content = planet[language];

  const handleAsk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!question.trim() || isLoading) return;

    const currentQuestion = question;
    setQuestion('');
    setChatHistory(prev => [...prev, { role: 'user', text: currentQuestion }]);
    setIsLoading(true);

    const answer = await askPlanetQuestion(planet, currentQuestion, language);

    setChatHistory(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 text-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-20">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            {content.name}
          </h2>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-semibold">
            {content.type}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Description */}
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-lg leading-relaxed font-light text-slate-200">
            {content.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Thermometer size={16} />
              <span className="text-xs font-bold uppercase">{language === 'zh' ? '温度' : 'Temp'}</span>
            </div>
            <p className="font-mono text-sm">{planet.temperature}</p>
          </div>
          <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Activity size={16} />
              <span className="text-xs font-bold uppercase">{language === 'zh' ? '轨道周期' : 'Orbit'}</span>
            </div>
            <p className="font-mono text-sm">{planet.orbitPeriod}s ({language === 'zh' ? '模拟' : 'Scaled'})</p>
          </div>
        </div>

        {/* Detail Text */}
        <div>
           <div className="flex items-center gap-2 mb-2 text-slate-300">
            <Info size={18} />
            <h3 className="font-semibold">{language === 'zh' ? '深入了解' : 'Deep Dive'}</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {content.detail}
          </p>
        </div>

        {/* Quick Facts */}
        <div>
          <h3 className="font-semibold text-slate-300 mb-3">{language === 'zh' ? '主要特征' : 'Key Characteristics'}</h3>
          <ul className="space-y-2">
            {content.facts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Chat Section */}
        <div className="border-t border-slate-700 pt-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-yellow-50">{language === 'zh' ? 'AI 天文学家' : 'Ask AI Astronomer'}</h3>
          </div>
          
          <div className="space-y-4 mb-4">
            {chatHistory.length === 0 && (
                <div className="text-slate-500 text-xs italic text-center">
                    {language === 'zh' ? '关于这个星球，想问什么都可以...' : 'Ask anything about this planet...'}
                </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-700 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAsk} className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={language === 'zh' ? `关于 ${content.name}...` : `Ask about ${content.name}...`}
              className="w-full bg-slate-800 border border-slate-600 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
