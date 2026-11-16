import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import {
  Globe,
  LogOut,
  User,
  LayoutGrid,
} from 'lucide-react';

interface FloatingNavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: 'TR' | 'EN';
  setLang: (lang: 'TR' | 'EN') => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
  onOpenAuth?: () => void;
  onGoToDashboard?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onSelectTab?: (tab: string) => void;
  activeSection?: string;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  darkMode,
  setDarkMode,
  lang,
  setLang,
  user,
  onLogout,
  onOpenAuth,
  onGoToDashboard,
  onNavigateSection,
  onSelectTab,
  activeSection = 'hero',
}) => {
  const isTR = lang === 'TR';
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'editorial',
      label: isTR ? 'Hakkımızda' : 'About',
    },
    {
      id: 'modules',
      label: isTR ? 'Modüller' : 'Modules',
    },
    {
      id: 'featured',
      label: isTR ? 'Öne Çıkanlar' : 'Featured',
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${
        scrolled ? 'pt-3 sm:pt-4' : 'pt-4 sm:pt-6'
      }`}
    >
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="pointer-events-auto w-full max-w-[1280px] h-[70px] rounded-[24px] sm:rounded-full bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] px-4 sm:px-6 flex items-center justify-between transition-all duration-300"
      >
        {/* Left Area: Logo & AI Badge */}
        <div
          onClick={() => onNavigateSection?.('hero')}
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
            const isActive = activeSection === item.id;
            const isHovered = hoveredNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onNavigateSection) {
                    onNavigateSection(item.id);
                  }
                }}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative py-1 text-[13px] font-medium tracking-tight transition-colors cursor-pointer ${
                  isActive || isHovered
                    ? 'text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{item.label}</span>

                {/* Subtle animated underline or glowing indicator */}
                {(isHovered || isActive) && (
                  <motion.div
                    layoutId="navbar-center-underline"
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                      isActive
                        ? 'bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                        : 'bg-slate-400/50 dark:bg-slate-500/50'
                    }`}
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
              {/* Soft blue gradient subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <span className="relative z-10 font-semibold tracking-wide text-slate-100 group-hover:text-white transition-colors">
                Terminal
              </span>
            </button>
          )}

          {/* Utility Controls Capsule */}
          <div className="h-[44px] px-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-md flex items-center gap-1 shadow-xs">
            {/* 🌐 Language Switcher */}
            <button
              onClick={() => setLang(isTR ? 'EN' : 'TR')}
              className="h-8 px-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              title={isTR ? 'Switch to English' : 'Türkçe\'ye Geç'}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="text-[12px] font-semibold">{isTR ? 'TR' : 'EN'}</span>
            </button>

            {/* Minimal Separator */}
            <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

            {/* Notifications */}
            <div className="flex items-center justify-center">
              <NotificationBell isTR={isTR} variant="minimal" />
            </div>

            {/* Minimal Separator */}
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

            {/* Minimal Separator */}
            <div className="w-px h-3.5 bg-slate-300/50 dark:bg-white/10 my-auto" />

            {/* Theme Switch */}
            <div className="flex items-center justify-center">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} isTR={isTR} variant="minimal" />
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};
