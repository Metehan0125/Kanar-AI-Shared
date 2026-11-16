export interface TefasFundBasic {
  code: string; // e.g. "AAV"
  name: string; // e.g. "ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON"
  category: string; // e.g. "Değişken Fon"
  founder: string; // e.g. "Atlas Portföy Yönetimi A.Ş."
  riskLevel: number; // 1 to 7
}

export interface AssetAllocationItem {
  name: string;
  percentage: number;
  color: string;
}

export interface FundHistoryPoint {
  date: string; // "YYYY-MM-DD"
  formattedDate: string; // "14 Mart 2026"
  timestamp: number;
  price: number; // Unit NAV Price e.g. 12.4512
  changePercent: number; // Daily change %
  portfolioSize?: number; // Total portfolio size in TRY
  investorCount?: number; // Number of investors
  // Benchmarks relative return (% normalized from start date)
  fundReturnPct?: number; 
  bist100ReturnPct?: number;
  goldReturnPct?: number;
  usdReturnPct?: number;
}

export interface TefasFundDetails extends TefasFundBasic {
  latestPrice: number;
  lastUpdateDate: string;
  dailyReturnPct: number;
  weeklyReturnPct: number;
  monthlyReturnPct: number;
  threeMonthReturnPct: number;
  sixMonthReturnPct: number;
  ytdReturnPct: number;
  yearlyReturnPct: number;
  threeYearReturnPct: number;
  totalPortfolioValue: number; // in TRY
  investorCount: number;
  shareCount: number;
  assetAllocation: AssetAllocationItem[];
  history: FundHistoryPoint[];
}

export type TimePeriod = '1M' | '3M' | '6M' | 'YTD' | '1Y' | '3Y' | 'MAX';

export interface AiFundAnalysisResponse {
  summary: string;
  performanceEvaluation: string;
  riskAssessment: string;
  keyTakeaways: string[];
  suitableInvestorProfile: string;
}

// --- PORTFOLIO & ASSET TRACKING TYPES ---

export type AssetType = 'TEFAS' | 'PRECIOUS_METAL' | 'STOCK' | 'CASH';
export type CurrencyCode = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface PortfolioItem {
  id: string;
  code: string; // e.g., "AAV", "ALTIN", "GUMUS", "PLATIN", "USD"
  name: string;
  type: AssetType;
  amount: number; // units or grams
  avgBuyPriceTRY: number;
  currentPriceTRY: number;
  dailyChangePct: number;
  category: string;
  currency: CurrencyCode;
}

export interface Transaction {
  id: string;
  assetCode: string;
  assetName: string;
  type: 'BUY' | 'SELL';
  amount: number;
  priceTRY: number;
  totalCostTRY: number;
  date: string;
  note?: string;
}

export interface CurrencyRates {
  TRY: number;
  USD: number; // TRY per USD (e.g. 33.12)
  EUR: number; // TRY per EUR (e.g. 36.15)
  GBP: number; // TRY per GBP (e.g. 42.80)
}

export interface PreciousMetalRate {
  code: 'ALTIN' | 'GUMUS' | 'PLATIN';
  name: string;
  gramPriceTRY: number;
  dailyChangePct: number;
}

export interface BenchmarkDataPoint {
  date: string;
  formattedDate: string;
  portfolio: number;
  bist100: number;
  sp500: number;
  nasdaq: number;
  btc: number;
  gold: number;
}

export interface StressTestResult {
  id: string;
  scenarioName: string;
  periodLabel: string;
  description: string;
  estimatedImpactPct: number;
  estimatedLossTRY: number;
  resilienceScore: 'Yüksek' | 'Orta' | 'Düşük' | 'High' | 'Medium' | 'Low';
  vulnerableAssets: string[];
  aiMitigationAdvice: string;
}

export interface AiRobustnessMetrics {
  sharpeRatio: number;
  volatilityAnnualPct: number;
  expectedAnnualReturnPct: number;
  maxDrawdownPct: number;
  overallScore: number; // 0 to 100
  diversificationLevel: string;
  recommendations: string[];
}

export interface NewsHeadline {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  impactSummary: string;
  url?: string;
}

export interface MarketSentimentData {
  overallScore: number; // -100 to +100
  twitterSentimentLabel: 'Bulls / İyimser' | 'Nötr' | 'Bears / Kötümser';
  newsSentimentLabel: 'Bulls / İyimser' | 'Nötr' | 'Bears / Kötümser';
  bullishPercentage: number;
  bearishPercentage: number;
  headlines: NewsHeadline[];
}

export interface InvestmentNote {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Strateji' | 'Hedef' | 'Anımsatıcı' | 'Araştırma';
  tags: string[];
}

