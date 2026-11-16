import React, { useState, useEffect, useRef } from 'react';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import { RotatingDashboardIcon } from './RotatingDashboardIcon';
import {
  AnimatedLandmarkIcon,
  AnimatedShieldAlertIcon,
  AnimatedBarChartIcon,
  AnimatedRadioIcon,
  AnimatedNotebookPenIcon,
} from './AnimatedMenuIcons';
import { Footer } from './Footer';
import {
  LayoutDashboard,
  Landmark,
  ShieldAlert,
  BarChart3,
  Radio,
  NotebookPen,
  History,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Sparkles, Network,
  Home,
  Globe,
  Sun,
  Moon,
  Wallet,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

interface SidebarLayoutProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAddAsset: () => void;
  onOpenAiAssistant?: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: 'TR' | 'EN';
  setLang: (lang: 'TR' | 'EN') => void;
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  onOpenAddAsset,
  onOpenAiAssistant,
  darkMode,
  setDarkMode,
  lang,
  setLang,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTR = lang === 'TR';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [activeTab]);

  const menuItems = [
    {
      id: 'PORTFOLIO',
      label: isTR ? 'Dashboard' : 'Dashboard',
      icon: LayoutDashboard,
      activeBg: 'bg-lime-500 text-slate-950 shadow-md font-black',
      hoverBg: 'hover:bg-lime-500/15 dark:hover:bg-lime-500/20 border border-transparent hover:border-lime-500/30',
      hoverText: 'group-hover:text-lime-700 dark:group-hover:text-lime-300 font-black group-hover:tracking-wide',
      hoverIcon: 'text-lime-600 dark:text-lime-400',
    },
    {
      id: 'TEFAS_EXPLORER',
      label: isTR ? 'TEFAS Fon Analitiği' : 'TEFAS Analytics',
      icon: Landmark,
      activeBg: 'bg-emerald-500 text-slate-950 shadow-md font-black',
      hoverBg: 'hover:bg-emerald-500/15 dark:hover:bg-emerald-500/20 border border-transparent hover:border-emerald-500/30',
      hoverText: 'group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-cyan-600 dark:group-hover:from-emerald-300 dark:group-hover:via-teal-200 dark:group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent font-extrabold group-hover:translate-x-1',
      hoverIcon: 'text-emerald-600 dark:text-emerald-400 group-hover:-rotate-12 group-hover:scale-115',
    },
    {
      id: 'AI_ROBUSTNESS',
      label: isTR ? 'AI Stres Testi' : 'AI Stress Test',
      icon: ShieldAlert,
      activeBg: 'bg-purple-600 text-white shadow-md font-black',
      hoverBg: 'hover:bg-purple-500/15 dark:hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30',
      hoverText: 'group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-pink-600 dark:group-hover:from-purple-300 dark:group-hover:via-indigo-200 dark:group-hover:to-pink-300 group-hover:bg-clip-text group-hover:text-transparent font-extrabold group-hover:translate-x-1',
      hoverIcon: 'text-purple-600 dark:text-purple-400 group-hover:rotate-12 group-hover:scale-115',
    },
    {
      id: 'BENCHMARK',
      label: isTR ? 'Karşılaştırmalar' : 'Benchmarks',
      icon: BarChart3,
      activeBg: 'bg-indigo-600 text-white shadow-md font-black',
      hoverBg: 'hover:bg-indigo-500/15 dark:hover:bg-indigo-500/20 border border-transparent hover:border-indigo-500/30',
      hoverText: 'group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-sky-600 dark:group-hover:from-indigo-300 dark:group-hover:via-blue-200 dark:group-hover:to-sky-300 group-hover:bg-clip-text group-hover:text-transparent font-extrabold group-hover:translate-x-1',
      hoverIcon: 'text-indigo-600 dark:text-indigo-400 group-hover:-translate-y-1 group-hover:scale-115',
    },
    {
      id: 'AI_CAUSALITY',
      label: isTR ? 'AI Nedensellik' : 'AI Causality',
      icon: Network,
      activeBg: 'bg-rose-500 text-white shadow-md font-black',
      hoverBg: 'hover:bg-rose-500/15 dark:hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30',
      hoverText: 'group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:via-pink-600 group-hover:to-amber-600 dark:group-hover:from-rose-300 dark:group-hover:via-pink-200 dark:group-hover:to-amber-300 group-hover:bg-clip-text group-hover:text-transparent font-extrabold group-hover:translate-x-1',
      hoverIcon: 'text-rose-600 dark:text-rose-400 group-hover:scale-125 group-hover:rotate-12',
    },
    {
      id: 'NOTES',
      label: isTR ? 'Notlar & Planlama' : 'Planner & Notes',
      icon: NotebookPen,
      activeBg: 'bg-amber-500 text-slate-950 shadow-md font-black',
      hoverBg: 'hover:bg-amber-500/15 dark:hover:bg-amber-500/20 border border-transparent hover:border-amber-500/30',
      hoverText: 'group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-yellow-500 dark:group-hover:from-amber-300 dark:group-hover:via-orange-200 dark:group-hover:to-yellow-300 group-hover:bg-clip-text group-hover:text-transparent font-extrabold group-hover:translate-x-1',
      hoverIcon: 'text-amber-600 dark:text-amber-400 group-hover:-rotate-12 group-hover:-translate-y-0.5 group-hover:scale-115',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5f8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex font-sans transition-colors">
      {/* LEFT SIDEBAR (Matching Lukana UI layout) */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 sticky top-0 h-screen`}
      >
        <div>
          {/* Sidebar Top Brand Header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
            <div
              onClick={() => setActiveTab('LANDING')}
              className="flex items-center space-x-3 cursor-pointer group overflow-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-400 via-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-lg shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                K
              </div>
              {!collapsed && (
                <div className="whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      Kanar
                    </span>
                    <span className="font-mono text-xs font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300 text-slate-950 px-1.5 py-0.5 rounded-md shadow-xs border border-emerald-300/60 uppercase tracking-widest leading-none flex items-center justify-center">
                      AI
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block mt-0.5">TEFAS Management</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-6">
            <div>
              {!collapsed && (
                <p className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Menu
                </p>
              )}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const isHovered = hoveredNavId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      onMouseEnter={() => setHoveredNavId(item.id)}
                      onMouseLeave={() => setHoveredNavId(null)}
                      className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer overflow-hidden ${
                        isActive
                          ? `${item.activeBg}`
                          : `text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white ${item.hoverBg}`
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.id === 'PORTFOLIO' && (
                        <RotatingDashboardIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-slate-950' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {item.id === 'TEFAS_EXPLORER' && (
                        <AnimatedLandmarkIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-slate-950' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {item.id === 'AI_ROBUSTNESS' && (
                        <AnimatedShieldAlertIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-white' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {item.id === 'BENCHMARK' && (
                        <AnimatedBarChartIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-white' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {item.id === 'AI_CAUSALITY' && (
                        <AnimatedRadioIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-white' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {item.id === 'NOTES' && (
                        <AnimatedNotebookPenIcon
                          isHovered={isHovered}
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? 'text-slate-950' : `text-slate-500 ${item.hoverIcon}`
                          }`}
                        />
                      )}
                      {!collapsed && (
                        <span
                          className={`truncate transition-all duration-300 ${
                            isActive ? 'font-black' : `${item.hoverText}`
                          }`}
                        >
                          {item.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Navigation Section 2 */}
            <div>
              {!collapsed && (
                <p className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isTR ? 'Sistem & Tercihler' : 'Preferences'}
                </p>
              )}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('LANDING')}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer"
                  title={collapsed ? (isTR ? 'Giriş Ekranı' : 'Landing') : undefined}
                >
                  <Home className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  {!collapsed && <span className="truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:font-extrabold group-hover:translate-x-0.5 transition-all">{isTR ? 'Giriş Ekranına Dön' : 'Landing Page'}</span>}
                </button>

                <button
                  onClick={() => setLang(isTR ? 'EN' : 'TR')}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer"
                  title={collapsed ? 'Dil Seçimi' : undefined}
                >
                  <Globe className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 group-hover:rotate-45 transition-all shrink-0" />
                  {!collapsed && (
                    <span className="truncate flex items-center justify-between w-full">
                      <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:font-extrabold group-hover:translate-x-0.5 transition-all">{isTR ? 'Dil Seçeneği' : 'Language'}</span>
                      <span className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-indigo-500 group-hover:text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md transition-all">
                        {lang}
                      </span>
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all cursor-pointer"
                  title={collapsed ? 'Tema' : undefined}
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 group-hover:scale-110 transition-all shrink-0" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:-rotate-12 group-hover:scale-110 transition-all shrink-0" />
                  )}
                  {!collapsed && (
                    <span className="truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:font-extrabold group-hover:translate-x-0.5 transition-all">{darkMode ? (isTR ? 'Aydınlık Mod' : 'Light Mode') : (isTR ? 'Karanlık Mod' : 'Dark Mode')}</span>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer / User Profile Card */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          {user ? (
            <div className={`flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 ${collapsed ? 'justify-center' : ''}`}>
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  {user.name.charAt(0)}
                </div>
                {!collapsed && (
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                )}
              </div>
              {!collapsed && (
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title={isTR ? 'Çıkış Yap' : 'Sign Out'}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="w-full py-2.5 bg-slate-900 dark:bg-white hover:opacity-90 text-white dark:text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4" />
              {!collapsed && <span>{isTR ? 'Giriş Yap / Kayıt' : 'Sign In'}</span>}
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div 
        ref={scrollRef}
        className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto hide-scrollbar scroll-smooth"
      >
        {/* TOP BAR (Matching Lukana design: Search bar, Assistant button, Bell, User Profile, + Action Button) */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Search box with hotkey pill */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTR ? 'Fon ara, varlık veya kod yazın... (Örn: AAV, TCD)' : 'Search anything...'}
              className="w-full pl-9 pr-12 py-2 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
            />
            <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
              ⌘F
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            {/* AI Assistant Pill */}
            <button
              onClick={onOpenAiAssistant}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-100 hover:bg-lime-200 dark:bg-lime-950/60 dark:hover:bg-lime-900/80 border border-lime-300 dark:border-lime-800 text-lime-800 dark:text-lime-300 text-xs font-bold transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 animate-pulse" />
              <span>AI Assistant</span>
            </button>

            {/* Notification Bell */}
            <NotificationBell isTR={isTR} />

            {/* Theme Toggle */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} isTR={isTR} />

            {/* Primary Action Button (+ Yeni Varlık / İşlem Ekle) */}
            <button
              onClick={onOpenAddAsset}
              className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isTR ? 'Yeni Varlık Ekle' : 'Add New Asset'}</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY DASHBOARD CONTENT */}
        <main className={`flex-1 w-full ${activeTab === 'TEFAS_EXPLORER' ? 'p-0' : 'p-4 sm:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto'}`}>
          {children}
        </main>

        {/* FOOTER */}
        <div className="w-full flex flex-col mt-8">
          <Footer isTR={isTR} onSelectTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
};
