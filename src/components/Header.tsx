import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import {
  Globe,
  LogOut,
  User,
  LayoutGrid,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: 'TR' | 'EN';
  setLang: (lang: 'TR' | 'EN') => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onSelectFund: (code: string) => void;
  onGoToDashboard?: () => void;
  onGoToLanding?: () => void;
  activeTab?: string;
}

interface MarketItem {
  value: number;
  change: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  lang,
  setLang,
  user,
  onOpenAuth,
  onLogout,
  favoritesCount,
  onOpenFavorites,
  onSelectFund,
  onGoToDashboard,
  onGoToLanding,
  activeTab,
}) => {
  const [marketData, setMarketData] = useState<{
    bist100?: MarketItem;
    usdTry?: MarketItem;
    goldGram?: MarketItem;
    lastUpdate?: string;
  }>({});

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const isTR = lang === 'TR';

  useEffect(() => {
    fetch('/api/tefas/market-summary')
      .then((res) => res.json())
      .then((data) => setMarketData(data))
      .catch(() => {
        setMarketData({
          bist100: { value: 10842.15, change: 1.24 },
          usdTry: { value: 33.12, change: 0.18 },
          goldGram: { value: 2610.5, change: 0.85 },
        });
      });
  }, []);

  const navItems = [
    { id: 'editorial', label: isTR ? 'Hakkımızda' : 'About' },
    { id: 'modules', label: isTR ? 'Modüller' : 'Modules' },
    { id: 'featured', label: isTR ? 'Öne Çıkanlar' : 'Featured' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 pb-2">
      {/* Top market summary ticker bar */}
      <div className="hidden sm:block border-b bg-slate-100/50 dark:bg-[#070A10]/80 border-slate-200/60 dark:border-white/5 text-xs py-1.5 px-4 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center font-medium gap-1 text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              {isTR ? 'TEFAS Canlı Piyasa' : 'TEFAS Live Market'}
            </span>

            {marketData.bist100 && (
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">BIST 100:</span>
                <span>{marketData.bist100.value.toLocaleString('tr-TR')}</span>
                <span
                  className={`font-medium ${
                    marketData.bist100.change >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  %{marketData.bist100.change >= 0 ? '+' : ''}
                  {marketData.bist100.change}
                </span>
              </div>
            )}

            {marketData.usdTry && (
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">USD/TRY:</span>
                <span>₺{marketData.usdTry.value.toFixed(2)}</span>
                <span
                  className={`font-medium ${
                    marketData.usdTry.change >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  %{marketData.usdTry.change >= 0 ? '+' : ''}
                  {marketData.usdTry.change}
                </span>
              </div>
            )}

            {marketData.goldGram && (
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{isTR ? 'Gram Altın:' : 'Gold Gram:'}</span>
                <span>₺{marketData.goldGram.value.toLocaleString('tr-TR')}</span>
                <span
                  className={`font-medium ${
                    marketData.goldGram.change >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  %{marketData.goldGram.change >= 0 ? '+' : ''}
                  {marketData.goldGram.change}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 text-slate-400">
            <span className="hidden md:inline text-[11px]">{isTR ? 'TEFAS & Portföy Analitiği' : 'TEFAS & Portfolio Analytics'}</span>
            <span className="flex items-center gap-1 text-[11px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
              <ShieldCheck className="w-3 h-3" /> {isTR ? 'TEFAS Güncel' : 'TEFAS Live'}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Glass Navigation Capsule Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3">
        <div className="w-full h-[70px] rounded-[24px] bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] px-4 sm:px-6 flex items-center justify-between">
          {/* Left Area: Logo & AI Badge */}
          <div
            onClick={onGoToLanding || (() => onSelectFund('AAV'))}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none pr-2"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              K
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Kanar
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 uppercase leading-none">
                AI
              </span>
            </div>
          </div>

          {/* Center Menu */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onGoToLanding) onGoToLanding();
                  }}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative py-1 text-[13px] font-medium tracking-tight text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>

                  {/* Subtle animated underline indicator */}
                  {isHovered && (
                    <motion.div
                      layoutId="header-center-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-blue-500/70 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Controls Group */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Primary CTA: Dark Glass Terminal Button */}
            {onGoToDashboard && (
              <button
                onClick={onGoToDashboard}
                className="group relative h-[44px] px-4 sm:px-5 rounded-full bg-[#0A101D] dark:bg-[#080D18] hover:bg-[#0E1628] dark:hover:bg-[#0B1222] text-white font-medium text-xs sm:text-[13px] tracking-tight border border-slate-800/80 dark:border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="relative z-10 font-semibold tracking-wide text-slate-100 group-hover:text-white transition-colors">
                  Terminal
                </span>
              </button>
            )}

            {/* Utility Controls Capsule */}
            <div className="h-[44px] px-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1 shadow-xs">
              {/* Favorites Button */}
              <button
                onClick={onOpenFavorites}
                className="h-8 px-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer relative"
                title={isTR ? 'Favoriler' : 'Favorites'}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                {favoritesCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

              {/* 🌐 Language Switcher */}
              <button
                onClick={() => setLang(isTR ? 'EN' : 'TR')}
                className="h-8 px-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                title={isTR ? 'Switch to English' : 'Türkçe\'ye Geç'}
              >
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="text-[12px] font-semibold">{isTR ? 'TR' : 'EN'}</span>
              </button>

              <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

              {/* Notifications */}
              <div className="flex items-center justify-center">
                <NotificationBell isTR={isTR} variant="minimal" />
              </div>

              <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

              {/* Profile / Login */}
              {user ? (
                <div className="flex items-center gap-1 pl-1 pr-1">
                  <div
                    className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-extrabold flex items-center justify-center shadow-2xs"
                    title={user.email}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer rounded-full hover:bg-white dark:hover:bg-white/10"
                    title={isTR ? 'Çıkış Yap' : 'Sign Out'}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="h-8 px-2.5 sm:px-3 rounded-full text-[12px] font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline font-semibold">{isTR ? 'Giriş' : 'Sign In'}</span>
                </button>
              )}

              <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

              {/* Theme Switch */}
              <div className="flex items-center justify-center">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} isTR={isTR} variant="minimal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
