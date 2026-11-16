import React, { useState } from 'react';
import { AiRobustnessMetrics, StressTestResult, PortfolioItem } from '../types';
import { ShieldAlert, Sparkles, Zap, CheckCircle2, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface AiRobustnessDashboardProps {
  items: PortfolioItem[];
  totalTRY?: number;
}

export const AiRobustnessDashboard: React.FC<AiRobustnessDashboardProps> = ({ items, totalTRY: totalTRYProp }) => {
  const { lang } = useLanguage();
  const isTR = lang === 'TR';

  const computedTotalTRY = totalTRYProp ?? items.reduce((acc, item) => acc + item.amount * item.currentPriceTRY, 0);

  const initialRecommendationsTR = [
    'TEFAS fonları ve altın dengesi portföy Sharpe oranını yüksek (1.84) tutmaktadır.',
    'Aşırı hisse riski almamak adına %15-20 oranında para piyasası fonu likiditesi eklenebilir.',
    'Döviz ve değerli madenler enflasyonist dalgalanmalara karşı koruma sağlamaktadır.',
  ];

  const initialRecommendationsEN = [
    'TEFAS funds and gold allocation keep your Sharpe ratio (1.84) optimized.',
    'Adding 15-20% money market fund liquidity is recommended to mitigate stock risk.',
    'Foreign currency and precious metals offer protection against inflationary volatility.',
  ];

  const initialScenariosTR: StressTestResult[] = [
    {
      id: 'covid-crash',
      scenarioName: 'Kapanma & Pandemi Şoku (2020)',
      periodLabel: 'Mart 2020 Şoku',
      description: 'Küresel hisse senedi piyasalarında %25-30 ani düşüş, nakit ve altın yükselişi.',
      estimatedImpactPct: -8.4,
      estimatedLossTRY: Math.round(computedTotalTRY * 0.084),
      resilienceScore: 'Yüksek',
      vulnerableAssets: ['Hisse Senedi Fonları'],
      aiMitigationAdvice: 'Altın ve Değişken fon varlığınız bu senaryoda portföyü dirençli kılmaktadır.',
    },
    {
      id: 'tech-selloff',
      scenarioName: 'Teknoloji & Faiz Artışı Satışları (2022)',
      periodLabel: '2022 Fed Faiz Sıkılaşması',
      description: 'Teknoloji hisselerinde ve riskli varlıklarda %35 sert gerileme.',
      estimatedImpactPct: -12.1,
      estimatedLossTRY: Math.round(computedTotalTRY * 0.121),
      resilienceScore: 'Orta',
      vulnerableAssets: ['Yabancı Hisse Fonları', 'Teknoloji Fonları'],
      aiMitigationAdvice: 'Borçlanma araçları veya kıymetli maden oranını %20 bandına çıkararak koruma artırılabilir.',
    },
    {
      id: 'currency-shock',
      scenarioName: 'Döviz Volatilitesi & Enflasyon Şoku',
      periodLabel: 'Yerel Kur Sıçraması',
      description: 'Dolar/TL ve Euro/TL kurunda ani yükseliş ve enflasyon stresi.',
      estimatedImpactPct: +14.6,
      estimatedLossTRY: 0,
      resilienceScore: 'Yüksek',
      vulnerableAssets: ['TL Vadeli Nakit'],
      aiMitigationAdvice: 'Portföyünüz kura ve döviz bazlı kıymetli madenlere endeksli olduğu için pozitif getiri sağlar.',
    },
  ];

  const initialScenariosEN: StressTestResult[] = [
    {
      id: 'covid-crash',
      scenarioName: 'Lockdown & Pandemic Shock (2020)',
      periodLabel: 'March 2020 Shock',
      description: 'Global stock markets sudden 25-30% drop, cash & gold rally.',
      estimatedImpactPct: -8.4,
      estimatedLossTRY: Math.round(computedTotalTRY * 0.084),
      resilienceScore: 'High',
      vulnerableAssets: ['Equity Funds'],
      aiMitigationAdvice: 'Your gold and variable fund holdings keep the portfolio resilient in this scenario.',
    },
    {
      id: 'tech-selloff',
      scenarioName: 'Tech & Rate Hike Sell-off (2022)',
      periodLabel: '2022 Fed Rate Tightening',
      description: 'Sharp 35% decline in technology stocks and risky assets.',
      estimatedImpactPct: -12.1,
      estimatedLossTRY: Math.round(computedTotalTRY * 0.121),
      resilienceScore: 'Medium',
      vulnerableAssets: ['Foreign Equity Funds', 'Tech Funds'],
      aiMitigationAdvice: 'Hedge protection can be increased by bringing debt instruments or precious metals to 20%.',
    },
    {
      id: 'currency-shock',
      scenarioName: 'FX Volatility & Inflation Shock',
      periodLabel: 'Local FX Spike',
      description: 'Sudden jump in USD/TRY & EUR/TRY exchange rates and inflation stress.',
      estimatedImpactPct: +14.6,
      estimatedLossTRY: 0,
      resilienceScore: 'High',
      vulnerableAssets: ['TRY Fixed Cash'],
      aiMitigationAdvice: 'Provides positive returns as your portfolio is indexed to FX and FX-based precious metals.',
    },
  ];

  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<AiRobustnessMetrics>({
    sharpeRatio: 1.84,
    volatilityAnnualPct: 14.2,
    expectedAnnualReturnPct: 42.5,
    maxDrawdownPct: -11.8,
    overallScore: 82,
    diversificationLevel: isTR ? 'İyi' : 'Good',
    recommendations: isTR ? initialRecommendationsTR : initialRecommendationsEN,
  });

  const [scenarios, setScenarios] = useState<StressTestResult[]>(
    isTR ? initialScenariosTR : initialScenariosEN
  );

  // Sync recommendations & scenarios if language changes and default is used
  React.useEffect(() => {
    setMetrics((prev) => ({
      ...prev,
      diversificationLevel: isTR ? 'İyi' : 'Good',
      recommendations: isTR ? initialRecommendationsTR : initialRecommendationsEN,
    }));
    setScenarios(isTR ? initialScenariosTR : initialScenariosEN);
  }, [isTR]);

  const handleRunAiAnalysis = () => {
    setLoading(true);
    fetch('/api/portfolio/ai-robustness', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, totalTRY: computedTotalTRY }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
        if (data.scenarios) setScenarios(data.scenarios);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
                {isTR ? 'AI Portföy Dayanıklılık & Stres Testi' : 'AI Portfolio Resilience & Stress Test'}
              </h3>
              <span className="bg-lime-500/10 text-lime-800 dark:text-lime-300 text-[11px] font-black px-2.5 py-0.5 rounded-lg border border-lime-500/20">
                Modern Portfolio Theory (MPT)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isTR
                ? 'Portföyünüzü tarihsel piyasa krizlerine (COVID, faiz şoku, kur sıçraması) karşı simüle edin.'
                : 'Simulate your portfolio against historical market crises (COVID, rate shocks, FX spikes).'}
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAiAnalysis}
          disabled={loading}
          className="px-4 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>
            {loading
              ? (isTR ? 'Yapay Zeka Analiz Ediyor...' : 'AI Analyzing...')
              : (isTR ? 'AI Stres Testini Yenile' : 'Refresh AI Stress Test')}
          </span>
        </button>
      </div>

      {/* MPT Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            {isTR ? 'Sharpe Oranı (Risk-Getiri)' : 'Sharpe Ratio (Risk-Return)'}
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.sharpeRatio.toFixed(2)}
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
            {metrics.sharpeRatio >= 1.5
              ? (isTR ? 'Mükemmel Risk-Getiri Dengesi' : 'Excellent Risk-Return Balance')
              : (isTR ? 'Kabul Edilebilir Risk' : 'Acceptable Risk')}
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            {isTR ? 'Yıllık Volatilite (Oynaklık)' : 'Annual Volatility'}
          </span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
            %{metrics.volatilityAnnualPct.toFixed(1)}
          </div>
          <span className="text-[10px] font-bold text-slate-400 block">
            {isTR ? 'Düşük - Orta Dalgalanma' : 'Low - Medium Volatility'}
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            {isTR ? 'Beklenen Yıllık Getiri' : 'Expected Annual Return'}
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            %{metrics.expectedAnnualReturnPct.toFixed(1)}
          </div>
          <span className="text-[10px] font-bold text-slate-400 block">
            {isTR ? 'Tarihsel Modellere Göre' : 'Based on Historical Models'}
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            {isTR ? 'Max Drawdown (Maks. Düşüş)' : 'Max Drawdown'}
          </span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
            %{metrics.maxDrawdownPct.toFixed(1)}
          </div>
          <span className="text-[10px] font-bold text-slate-400 block">
            {isTR ? 'En Kötü Senaryo Zirve-Dip' : 'Worst Scenario Peak-to-Trough'}
          </span>
        </div>
      </div>

      {/* Stress Testing Scenarios Cards */}
      <div className="space-y-3">
        <h4 className="font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" /> {isTR ? 'Tarihsel Piyasa Krizlerinde Tahmini Etki' : 'Estimated Impact in Historical Market Crises'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((sc) => {
            const isPos = sc.estimatedImpactPct >= 0;
            return (
              <div
                key={sc.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {sc.periodLabel}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                        sc.resilienceScore === 'Yüksek' || sc.resilienceScore === 'High'
                          ? 'bg-lime-500 text-slate-950'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {sc.resilienceScore === 'Yüksek'
                        ? (isTR ? 'Yüksek' : 'High')
                        : sc.resilienceScore === 'Orta'
                        ? (isTR ? 'Orta' : 'Medium')
                        : sc.resilienceScore} {isTR ? 'Direnç' : 'Resilience'}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                    {sc.scenarioName}
                  </h5>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {sc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {isTR ? 'Tahmini Portföy Etkisi' : 'Estimated Portfolio Impact'}
                    </span>
                    <span
                      className={`font-black text-base ${
                        isPos ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {isPos ? '+' : ''}%{sc.estimatedImpactPct.toFixed(1)}
                    </span>
                  </div>

                  {sc.estimatedLossTRY > 0 && (
                    <div className="text-xs font-bold text-slate-400 text-right">
                      {isTR ? 'Tahmini Kayıp' : 'Estimated Loss'}: ₺{sc.estimatedLossTRY.toLocaleString(isTR ? 'tr-TR' : 'en-US')}
                    </div>
                  )}

                  <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                    <strong className="block text-[11px] font-black text-lime-600 dark:text-lime-400">
                      {isTR ? 'AI Stres Tavsiyesi:' : 'AI Stress Advice:'}
                    </strong>
                    {sc.aiMitigationAdvice}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations List */}
      <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-xs">
        <h4 className="font-black text-sm text-lime-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-lime-400" /> {isTR ? 'AI Portföy Sağlığı & İyileştirme Çıkarımları' : 'AI Portfolio Health & Optimization Insights'}
        </h4>

        <ul className="space-y-2">
          {metrics.recommendations.map((rec, i) => (
            <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5 font-medium leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

