import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FundSearchBar } from './components/FundSearchBar';
import { FundChart } from './components/FundChart';
import { FundMetrics } from './components/FundMetrics';
import { PortfolioAllocationChart } from './components/PortfolioAllocationChart';
import { PopularFundsGrid } from './components/PopularFundsGrid';
import { AiFundAnalysisModal } from './components/AiFundAnalysisModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FundComparisonModal } from './components/FundComparisonModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';

// New Portfolio System Components
import { PortfolioSummaryCards } from './components/PortfolioSummaryCards';
import { PortfolioTrendChart } from './components/PortfolioTrendChart';
import { PortfolioAssetsTable } from './components/PortfolioAssetsTable';
import { AddAssetModal } from './components/AddAssetModal';
import { TransactionsDrawer } from './components/TransactionsDrawer';
import { AiRobustnessDashboard } from './components/AiRobustnessDashboard';
import { BenchmarkComparisonChart } from './components/BenchmarkComparisonChart';
import { AiCausalityNetwork } from './components/AiCausalityNetwork';
import { NotesPlannerSection } from './components/NotesPlannerSection';
import { ProjectIntroModal } from './components/ProjectIntroModal';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { SidebarLayout } from './components/SidebarLayout';
import { NightSkyMoonScene } from './components/NightSkyMoonScene';

import { useLanguage } from './LanguageContext';
import { TefasFundDetails, TimePeriod, PortfolioItem, Transaction, CurrencyRates } from './types';
import { ShieldCheck, Wallet, Landmark, ShieldAlert, BarChart3, Radio, NotebookPen, Home, LayoutDashboard } from 'lucide-react';

type MainTab = 'LANDING' | 'PORTFOLIO' | 'TEFAS_EXPLORER' | 'AI_ROBUSTNESS' | 'BENCHMARK' | 'AI_CAUSALITY' | 'NOTES';

export default function App() {
  const { lang, setLang, isTR } = useLanguage();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tefas_dark_mode') === 'true';
  });

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('tefas_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<MainTab>('LANDING');

  // TEFAS Fund Explorer state
  const [currentFundCode, setCurrentFundCode] = useState<string>('AAV');
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1Y');
  const [fundDetails, setFundDetails] = useState<TefasFundDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dashboard Widget Visibility State
  const [widgetVisibility, setWidgetVisibility] = useState({
    summary: true,
    trend: true,
    allocation: true,
    table: true,
    notes: true,
  });

  const handleToggleWidget = (widgetKey: string) => {
    setWidgetVisibility((prev) => ({
      ...prev,
      [widgetKey as keyof typeof prev]: !prev[widgetKey as keyof typeof prev],
    }));
  };

  // Modals & Drawers
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(() => {
    return localStorage.getItem('tefas_intro_seen') !== 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState<boolean>(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState<boolean>(false);

  // Favorites & Compare State
  const [favoriteCodes, setFavoriteCodes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tefas_favorites');
      return saved ? JSON.parse(saved) : ['AAV', 'TCD', 'YAS'];
    } catch {
      return ['AAV', 'TCD', 'YAS'];
    }
  });

  const [compareCodes, setCompareCodes] = useState<string[]>(['AAV', 'TCD']);

  // User Portfolio Items
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('tefas_user_portfolio');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'p1',
              code: 'AAV',
              name: 'ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON',
              type: 'TEFAS',
              amount: 1500,
              avgBuyPriceTRY: 10.20,
              currentPriceTRY: 12.45,
              dailyChangePct: 1.15,
              category: 'Değişken Fon',
              currency: 'TRY',
            },
            {
              id: 'p2',
              code: 'TCD',
              name: 'TACİRLER PORTFÖY HİSSE SENEDİ FONU',
              type: 'TEFAS',
              amount: 2500,
              avgBuyPriceTRY: 18.50,
              currentPriceTRY: 24.10,
              dailyChangePct: 2.30,
              category: 'Hisse Senedi Fonu',
              currency: 'TRY',
            },
            {
              id: 'p3',
              code: 'ALTIN',
              name: 'Fiziki Gram Altın (24 Ayar)',
              type: 'PRECIOUS_METAL',
              amount: 50,
              avgBuyPriceTRY: 2450.0,
              currentPriceTRY: 2610.5,
              dailyChangePct: 0.85,
              category: 'Kıymetli Maden',
              currency: 'TRY',
            },
          ];
    } catch {
      return [];
    }
  });

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('tefas_user_txs');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'tx1',
              assetCode: 'AAV',
              assetName: 'ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON',
              type: 'BUY',
              amount: 1500,
              priceTRY: 10.20,
              totalCostTRY: 15300,
              date: '2026-01-15',
              note: 'İlk alım',
            },
          ];
    } catch {
      return [];
    }
  });

  // Currency Rates
  const currencyRates: CurrencyRates = {
    TRY: 1,
    USD: 33.12,
    EUR: 36.15,
    GBP: 42.8,
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('tefas_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('tefas_favorites', JSON.stringify(favoriteCodes));
  }, [favoriteCodes]);

  useEffect(() => {
    localStorage.setItem('tefas_user_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem('tefas_user_txs', JSON.stringify(transactions));
  }, [transactions]);

  // Fetch TEFAS fund details
  useEffect(() => {
    if (!currentFundCode) return;
    setLoading(true);
    setError(null);

    fetch(`/api/tefas/fund/${currentFundCode}?period=${selectedPeriod}`)
      .then((res) => {
        if (!res.ok) throw new Error('Fon verisi yüklenemedi.');
        return res.json();
      })
      .then((data) => {
        setFundDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Veri çekme hatası');
        setLoading(false);
      });
  }, [currentFundCode, selectedPeriod]);

  const handleSelectFundAndSwitchTab = (code: string) => {
    setCurrentFundCode(code);
    setActiveTab('TEFAS_EXPLORER');
  };

  const handleToggleFavorite = (code: string) => {
    setFavoriteCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSuccessLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('tefas_user', JSON.stringify(userData));
    setActiveTab('PORTFOLIO'); // Jump directly into Dashboard!
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tefas_user');
    setActiveTab('LANDING');
  };

  const handleAddAsset = (newItem: Omit<PortfolioItem, 'id'>) => {
    const itemWithId: PortfolioItem = {
      ...newItem,
      id: 'p_' + Date.now(),
    };
    setPortfolioItems((prev) => [...prev, itemWithId]);

    // Record automatic buy transaction
    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      assetCode: newItem.code,
      assetName: newItem.name,
      type: 'BUY',
      amount: newItem.amount,
      priceTRY: newItem.avgBuyPriceTRY,
      totalCostTRY: newItem.amount * newItem.avgBuyPriceTRY,
      date: new Date().toISOString().split('T')[0],
      note: 'Portföye eklendi',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleRemoveAsset = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((x) => x.id !== id));
  };

  // If user is on LANDING tab, render full Landing Page with floating navbar
  if (activeTab === 'LANDING') {
    return (
      <>
        <LandingPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={setLang}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onGoToDashboard={() => setActiveTab('PORTFOLIO')}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          onOpenAddAsset={() => {
            setActiveTab('PORTFOLIO');
            setIsAddAssetOpen(true);
          }}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccessLogin={handleSuccessLogin}
          lang={lang}
        />

        <AiAssistantModal
          isOpen={isAiAssistantOpen}
          onClose={() => setIsAiAssistantOpen(false)}
          portfolioItems={portfolioItems}
          isTR={lang === 'TR'}
        />

        <AddAssetModal
          isOpen={isAddAssetOpen}
          onClose={() => setIsAddAssetOpen(false)}
          onAddAsset={handleAddAsset}
        />
      </>
    );
  }

  // Dashboard View (LOGGED IN or EXPLORING DASHBOARD)
  return (
    <SidebarLayout
      activeTab={activeTab}
      setActiveTab={(tab) => setActiveTab(tab)}
      user={user}
      onOpenAuth={() => setIsAuthModalOpen(true)}
      onLogout={handleLogout}
      onOpenAddAsset={() => setIsAddAssetOpen(true)}
      onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      lang={lang}
      setLang={setLang}
    >
      <div className="space-y-6">
        {/* TAB 1: PORTFOLIO & DASHBOARD */}
        {activeTab === 'PORTFOLIO' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Real Data Guidance Banner */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-md border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-lime-500 text-slate-950 font-black text-[10px] uppercase">
                    {lang === 'TR' ? 'Canlı Portföy Modu' : 'Live Portfolio Mode'}
                  </span>
                  <h4 className="font-bold text-sm text-white">
                    {lang === 'TR' ? 'Gerçek Portföy Verilerinizi Ekleyin' : 'Add Your Real Portfolio Holdings'}
                  </h4>
                </div>
                <p className="text-xs text-indigo-200">
                  {lang === 'TR'
                    ? 'Mock/Örnek veriler yerine kendi gerçek TEFAS fonlarınızı, Gram Altın/Gümüş, Dolar/Euro ve BIST hisselerinizi alış fiyatınızla kaydedin. Canlı fiyatlarla kâr/zarar durumunuz ve AI stres analiziniz anlık güncellenir.'
                    : 'Track your authentic TEFAS funds, physical gold, FX currency, and equity positions with custom purchase prices rather than sample data. Experience real-time P&L updates and AI stress-testing.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsAddAssetOpen(true)}
                  className="px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{lang === 'TR' ? '+ Yeni Varlık Ekle' : '+ Add New Asset'}</span>
                </button>
              </div>
            </div>

            {/* Multi-Currency Portfolio Summary */}
            {widgetVisibility.summary && (
              <PortfolioSummaryCards
                items={portfolioItems}
                rates={currencyRates}
                robustnessScore={82}
                onOpenAddAsset={() => setIsAddAssetOpen(true)}
                onOpenTransactions={() => setIsTransactionsOpen(true)}
                widgetVisibility={widgetVisibility}
                onToggleWidget={handleToggleWidget}
              />
            )}

            {/* Revenue vs Expenses / Portfolio Trend Chart */}
            {widgetVisibility.trend && <PortfolioTrendChart />}

            {/* Assets Table */}
            {widgetVisibility.table && (
              <PortfolioAssetsTable
                items={portfolioItems}
                onOpenAddAsset={() => setIsAddAssetOpen(true)}
                onRemoveAsset={handleRemoveAsset}
                onSelectFund={handleSelectFundAndSwitchTab}
              />
            )}
          </div>
        )}

        {/* TAB 2: TEFAS FUND EXPLORER & CHARTS */}
        {activeTab === 'TEFAS_EXPLORER' && (
          <div className="flex flex-col w-full animate-in fade-in duration-200">
            {/* Screen 1: Overview (Search & Metrics) */}
            <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 w-full max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
              <div className="space-y-4 sm:space-y-6 w-full max-h-full min-w-0">
                <FundSearchBar
                  currentFundCode={currentFundCode}
                  currentCode={currentFundCode}
                  onSearch={(code) => setCurrentFundCode(code)}
                  onSelectFund={(code) => setCurrentFundCode(code)}
                  isLoading={loading}
                />

                {loading && (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent mb-3"></div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      TEFAS Fon verileri canlı çekiliyor...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-700 dark:text-rose-300 text-sm">
                    <strong>Hata:</strong> {error}
                  </div>
                )}

                {!loading && !error && fundDetails && (
                  <FundMetrics
                    fund={fundDetails}
                    isFavorite={favoriteCodes.includes(fundDetails.code)}
                    onToggleFavorite={() => handleToggleFavorite(fundDetails.code)}
                    onOpenAiModal={() => setIsAiModalOpen(true)}
                    onOpenCompareModal={() => setIsCompareModalOpen(true)}
                  />
                )}
              </div>
            </div>

            {!loading && !error && fundDetails && (
              <>
                {/* Screen 2: Chart & Portfolio Allocation */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 lg:py-8 border-t border-slate-200 dark:border-slate-800 mt-2 lg:mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-4 lg:gap-6 w-full lg:items-stretch lg:min-h-[550px]">
                    <div className="lg:col-span-3 xl:col-span-2 min-w-0 h-[450px] lg:h-full">
                      <FundChart
                        fund={fundDetails}
                        selectedPeriod={selectedPeriod}
                        onSelectPeriod={(p) => setSelectedPeriod(p)}
                      />
                    </div>
                    <div className="lg:col-span-2 xl:col-span-1 min-w-0 h-[400px] lg:h-full">
                      <PortfolioAllocationChart allocations={fundDetails.assetAllocation} />
                    </div>
                  </div>
                </div>

                {/* Screen 3: Featured Funds */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-32">
                  <div className="w-full min-w-0">
                    <PopularFundsGrid
                      activeFundCode={fundDetails.code}
                      onSelectFund={(code) => setCurrentFundCode(code)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: AI STRESS TESTING & MPT */}
        {activeTab === 'AI_ROBUSTNESS' && (
          <div className="animate-in fade-in duration-200">
            <AiRobustnessDashboard items={portfolioItems} />
          </div>
        )}

        {/* TAB 4: BENCHMARKS & MARKET COMPARISON */}
        {activeTab === 'BENCHMARK' && (
          <div className="animate-in fade-in duration-200">
            <BenchmarkComparisonChart />
          </div>
        )}

        {/* TAB 5: AI CAUSALITY NETWORK */}
        {activeTab === 'AI_CAUSALITY' && (
          <div className="animate-in fade-in duration-200">
            <AiCausalityNetwork isTR={lang === 'TR'} />
          </div>
        )}

        {/* TAB 6: INVESTOR NOTES & PLANNER */}
        {activeTab === 'NOTES' && (
          <div className="animate-in fade-in duration-200">
            <NotesPlannerSection />
          </div>
        )}
      </div>

      {/* MODALS & DRAWERS */}
      {fundDetails && (
        <>
          <AiFundAnalysisModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            fundCode={fundDetails.code}
            fundName={fundDetails.name}
          />

          <FundComparisonModal
            isOpen={isCompareModalOpen}
            onClose={() => setIsCompareModalOpen(false)}
            primaryFundCode={fundDetails.code}
            compareCodes={compareCodes}
            onSelectFund={handleSelectFundAndSwitchTab}
          />
        </>
      )}

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteCodes={favoriteCodes}
        onSelectFund={handleSelectFundAndSwitchTab}
        onRemoveFavorite={handleToggleFavorite}
      />

      <AddAssetModal
        isOpen={isAddAssetOpen}
        onClose={() => setIsAddAssetOpen(false)}
        onAddAsset={handleAddAsset}
      />

      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        portfolioItems={portfolioItems}
        isTR={lang === 'TR'}
      />

      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={() => setIsAiAssistantOpen(true)}
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-extrabold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95 border-2 border-slate-950/20"
      >
        <div className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
        <span className="text-xs tracking-tight">{lang === 'TR' ? 'AI Asistan' : 'AI Assistant'}</span>
      </button>

      <TransactionsDrawer
        isOpen={isTransactionsOpen}
        onClose={() => setIsTransactionsOpen(false)}
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        lang={lang}
      />

      <ProjectIntroModal
        isOpen={isIntroOpen}
        onClose={() => {
          setIsIntroOpen(false);
          localStorage.setItem('tefas_intro_seen', 'true');
        }}
        onExploreFunds={() => {
          setIsIntroOpen(false);
          localStorage.setItem('tefas_intro_seen', 'true');
          setActiveTab('TEFAS_EXPLORER');
        }}
      />

      {/* Atmospheric Moon & Fisherman for Dark Mode */}
      <NightSkyMoonScene darkMode={darkMode} />
    </SidebarLayout>
  );
}
