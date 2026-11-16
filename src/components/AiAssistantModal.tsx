import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, RefreshCw, ChevronRight, Activity, ShieldCheck, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItems?: PortfolioItem[];
  isTR?: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS_TR = [
  'Portföy risk analizi',
  'Sharpe oranı yüksek fonlar',
  'Kısa vadeli kur beklentileri',
  'Enflasyon hedge senaryosu',
];
const QUICK_PROMPTS_EN = [
  'Portfolio risk analysis',
  'High Sharpe ratio funds',
  'Short-term FX outlook',
  'Inflation hedge scenario',
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  portfolioItems = [],
  isTR = true,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: isTR
        ? `Sistem Çevrimiçi. **KanarAI Core** devrede. \n\nPiyasa verileri senkronize edildi. Portföyünüzü optimize etmek veya derin analizler yapmak için komut bekliyorum.`
        : `System Online. **KanarAI Core** initialized.\n\nMarket data synchronized. Awaiting commands to optimize your portfolio or run deep diagnostics.`,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalTRY = portfolioItems.reduce((acc, item) => acc + item.value * item.quantity, 0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = (text = inputText) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: isTR
          ? `Sinyal işlendi. "${text}" komutu için güncel piyasa koşullarına göre Quantum analiz modeli çalıştırılıyor. [Simüle Edilmiş Yanıt]`
          : `Signal processed. Running Quantum analysis model for "${text}" based on current market conditions. [Simulated Response]`,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030712]/80 backdrop-blur-3xl"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl h-[85vh] max-h-[800px] relative flex flex-col rounded-[2.5rem] bg-slate-950/40 border border-white/10 shadow-[0_0_120px_-20px_rgba(16,185,129,0.2)] overflow-hidden isolate"
        >
          {/* Animated Background Gradients & Grid */}
          <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[120px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[150px] rounded-full" 
            />
          </div>

          {/* Holographic Header */}
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between relative z-10 backdrop-blur-md bg-black/20">
            <div className="flex items-center gap-6">
              {/* Spinning AI Core */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-emerald-500/30 rounded-full border-t-emerald-400"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 border border-indigo-500/30 rounded-full border-b-indigo-400 opacity-70"
                />
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                  <Hexagon className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-white text-lg tracking-widest uppercase">
                    {isTR ? 'KanarAI Core' : 'KanarAI Core'}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                    v3.6 Flash
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1.5">
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase">
                    <Activity className="w-3 h-3 text-indigo-400" />
                    {isTR ? 'Sistem Çevrimiçi' : 'System Online'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider flex items-center gap-1.5 uppercase">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {isTR ? 'Uçtan Uca Şifreli' : 'E2E Encrypted'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all flex items-center justify-center cursor-pointer group"
            >
              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Portfolio Sync Status */}
          {portfolioItems.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent border-b border-indigo-500/10 px-8 py-2.5 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3 text-xs font-mono text-indigo-300">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="uppercase tracking-widest">{isTR ? 'Cüzdan Senkronize' : 'Wallet Synced'}</span>
                <span className="text-indigo-500/50">|</span>
                <span className="font-bold">{portfolioItems.length} {isTR ? 'Varlık' : 'Assets'}</span>
                <span className="text-indigo-500/50">|</span>
                <span>₺{totalTRY.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          )}

          {/* Chat Body */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 hide-scrollbar relative z-10">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                      <Hexagon className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col gap-1.5 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`relative p-4 sm:p-5 text-sm leading-relaxed backdrop-blur-md ${
                        isUser
                          ? 'bg-indigo-500/10 text-indigo-50 border border-indigo-500/20 rounded-[2rem] rounded-tr-sm shadow-[0_0_25px_rgba(99,102,241,0.1)]'
                          : 'bg-white/5 text-slate-200 border border-white/10 rounded-[2rem] rounded-tl-sm'
                      }`}
                    >
                      {/* Subtle inner glow for user msg */}
                      {isUser && <div className="absolute inset-0 rounded-[2rem] rounded-tr-sm bg-gradient-to-br from-indigo-400/10 to-transparent pointer-events-none" />}
                      
                      <div className="relative z-10 whitespace-pre-wrap font-medium">{msg.text}</div>
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 px-2">
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start items-center"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs font-mono text-emerald-400 flex items-center gap-3 backdrop-blur-md">
                  <div className="flex gap-1">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="tracking-widest uppercase">{isTR ? 'Veri İşleniyor...' : 'Processing Data...'}</span>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} className="h-4" />
          </div>

          {/* Bottom Control Deck */}
          <div className="relative z-10 bg-black/40 backdrop-blur-2xl border-t border-white/10 p-6">
            
            {/* Holographic Prompts */}
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-4 pb-2 mask-linear-fade">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-500/70 shrink-0 pl-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                {isTR ? 'Önerilen Sinyaller' : 'Suggested Signals'}
              </span>
              <div className="w-px h-3 bg-white/10 mx-1" />
              {(isTR ? QUICK_PROMPTS_TR : QUICK_PROMPTS_EN).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-2 group"
                >
                  <span>{prompt}</span>
                  <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Futuristic Input Field */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-emerald-500/20 rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative flex items-center gap-3 p-2 bg-slate-950/80 rounded-[2rem] border border-white/10">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isTR
                      ? 'Yapay zekaya komut verin (Örn: Portföy riskimi analiz et)...'
                      : 'Input command to KanarAI (e.g. Analyze my portfolio risk)...'
                  }
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 text-sm bg-transparent text-white placeholder-slate-500 focus:outline-none font-medium"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="relative h-12 w-12 sm:w-auto sm:px-8 rounded-full bg-white text-black font-black text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden hover:scale-105 transition-transform shrink-0"
                >
                  <span className="hidden sm:inline uppercase tracking-widest">{isTR ? 'İlet' : 'Transmit'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
