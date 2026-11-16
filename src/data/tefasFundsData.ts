import { TefasFundDetails, FundHistoryPoint, AssetAllocationItem, TimePeriod } from '../types';

// Catalog of well-known TEFAS funds across various categories
export const KNOWN_TEFAS_FUNDS = [
  {
    code: 'AAV',
    name: 'ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON',
    category: 'Değişken Fon',
    founder: 'Atlas Portföy Yönetimi A.Ş.',
    riskLevel: 5,
    basePrice: 4.8251,
    annualReturnRate: 0.68,
    volatility: 0.012,
    totalPortfolioValue: 1850400000,
    investorCount: 14250,
    allocation: [
      { name: 'Hisse Senedi', percentage: 48, color: '#3b82f6' },
      { name: 'Özel Sektör Borçlanma', percentage: 22, color: '#10b981' },
      { name: 'Ters Repo', percentage: 15, color: '#f59e0b' },
      { name: 'Takasbank Para Piyasası', percentage: 10, color: '#8b5cf6' },
      { name: 'Mevduat', percentage: 5, color: '#ec4899' },
    ]
  },
  {
    code: 'TCD',
    name: 'TACİRLER PORTFÖY DEĞİŞKEN FON',
    category: 'Değişken Fon',
    founder: 'Tacirler Portföy Yönetimi A.Ş.',
    riskLevel: 6,
    basePrice: 18.2410,
    annualReturnRate: 0.85,
    volatility: 0.018,
    totalPortfolioValue: 6420100000,
    investorCount: 48200,
    allocation: [
      { name: 'Hisse Senedi (BIST)', percentage: 65, color: '#3b82f6' },
      { name: 'VİOP Teminatı', percentage: 15, color: '#ef4444' },
      { name: 'Ters Repo', percentage: 12, color: '#f59e0b' },
      { name: 'Devlet Tahvili', percentage: 8, color: '#10b981' },
    ]
  },
  {
    code: 'YAS',
    name: 'YAPI KREDİ PORTFÖY KOÇ HOLDİNG İŞTİRAKLERİ HİSSE SENEDİ FONU',
    category: 'Hisse Senedi Fonu',
    founder: 'Yapı Kredi Portföy Yönetimi A.Ş.',
    riskLevel: 7,
    basePrice: 12.6514,
    annualReturnRate: 0.92,
    volatility: 0.019,
    totalPortfolioValue: 8910000000,
    investorCount: 65400,
    allocation: [
      { name: 'Yerli Hisse Senedi', percentage: 88, color: '#3b82f6' },
      { name: 'Ters Repo', percentage: 8, color: '#f59e0b' },
      { name: 'Takasbank', percentage: 4, color: '#8b5cf6' },
    ]
  },
  {
    code: 'MAC',
    name: 'MARAŞ PORTFÖY HİSSE SENEDİ FONU (HİSSE SENEDİ YOĞUN FON)',
    category: 'Hisse Senedi Fonu',
    founder: 'Marmara Capital Portföy Yönetimi A.Ş.',
    riskLevel: 7,
    basePrice: 22.1045,
    annualReturnRate: 0.88,
    volatility: 0.021,
    totalPortfolioValue: 4210000000,
    investorCount: 31000,
    allocation: [
      { name: 'Hisse Senedi', percentage: 92, color: '#3b82f6' },
      { name: 'Takasbank Para Piyasası', percentage: 5, color: '#8b5cf6' },
      { name: 'Ters Repo', percentage: 3, color: '#f59e0b' },
    ]
  },
  {
    code: 'TTE',
    name: 'İŞ PORTFÖY TEKNOLOJİ BİRİNCİ HİSSE SENEDİ FONU',
    category: 'Hisse Senedi Fonu',
    founder: 'İş Portföy Yönetimi A.Ş.',
    riskLevel: 7,
    basePrice: 15.3421,
    annualReturnRate: 1.05,
    volatility: 0.024,
    totalPortfolioValue: 12450000000,
    investorCount: 112000,
    allocation: [
      { name: 'Teknoloji Hisseleri', percentage: 90, color: '#3b82f6' },
      { name: 'Ters Repo', percentage: 6, color: '#f59e0b' },
      { name: 'Yabancı Borsa Yatırım Fonu', percentage: 4, color: '#06b6d4' },
    ]
  },
  {
    code: 'AFT',
    name: 'AK PORTFÖY YENİ TEKNOLOJİLER YABANCI HİSSE SENEDİ FONU',
    category: 'Yabancı Hisse Senedi Fonu',
    founder: 'Ak Portföy Yönetimi A.Ş.',
    riskLevel: 6,
    basePrice: 0.8924,
    annualReturnRate: 0.74,
    volatility: 0.016,
    totalPortfolioValue: 15200000000,
    investorCount: 135000,
    allocation: [
      { name: 'Yabancı Hisse Senedi (US Tech)', percentage: 91, color: '#3b82f6' },
      { name: 'Yabancı Borçlanma Araçları', percentage: 5, color: '#10b981' },
      { name: 'Döviz Mevduat', percentage: 4, color: '#f59e0b' },
    ]
  },
  {
    code: 'TI2',
    name: 'İŞ PORTFÖY İKİNCİ DEĞİŞKEN FON',
    category: 'Değişken Fon',
    founder: 'İş Portföy Yönetimi A.Ş.',
    riskLevel: 4,
    basePrice: 8.4512,
    annualReturnRate: 0.58,
    volatility: 0.009,
    totalPortfolioValue: 3100000000,
    investorCount: 22400,
    allocation: [
      { name: 'Özel Sektör Tahvili', percentage: 40, color: '#10b981' },
      { name: 'Hisse Senedi', percentage: 30, color: '#3b82f6' },
      { name: 'Mevduat / Repo', percentage: 20, color: '#f59e0b' },
      { name: 'Devlet İç Borçlanma', percentage: 10, color: '#8b5cf6' },
    ]
  },
  {
    code: 'GMR',
    name: 'GARANTİ PORTFÖY İKİNCİ HİSSE SENEDİ FONU',
    category: 'Hisse Senedi Fonu',
    founder: 'Garanti Portföy Yönetimi A.Ş.',
    riskLevel: 6,
    basePrice: 6.7820,
    annualReturnRate: 0.78,
    volatility: 0.017,
    totalPortfolioValue: 2890000000,
    investorCount: 19800,
    allocation: [
      { name: 'Hisse Senedi', percentage: 86, color: '#3b82f6' },
      { name: 'Ters Repo', percentage: 10, color: '#f59e0b' },
      { name: 'Takasbank', percentage: 4, color: '#8b5cf6' },
    ]
  },
  {
    code: 'IPJ',
    name: 'İŞ PORTFÖY ELEKTRİKLİ ARAÇLAR KARMA FON',
    category: 'Karma Fon',
    founder: 'İş Portföy Yönetimi A.Ş.',
    riskLevel: 6,
    basePrice: 4.1205,
    annualReturnRate: 0.62,
    volatility: 0.015,
    totalPortfolioValue: 5120000000,
    investorCount: 41200,
    allocation: [
      { name: 'Yabancı Hisseler (EV/Clean)', percentage: 75, color: '#3b82f6' },
      { name: 'Yerli Hisseler', percentage: 15, color: '#10b981' },
      { name: 'Döviz / Repo', percentage: 10, color: '#f59e0b' },
    ]
  },
  {
    code: 'GTA',
    name: 'GARANTİ PORTFÖY ALTIN FONU',
    category: 'Kıymetli Madenler Fonu',
    founder: 'Garanti Portföy Yönetimi A.Ş.',
    riskLevel: 5,
    basePrice: 0.4215,
    annualReturnRate: 0.79,
    volatility: 0.011,
    totalPortfolioValue: 11200000000,
    investorCount: 98000,
    allocation: [
      { name: 'Altın / Kıymetli Madenler', percentage: 92, color: '#eab308' },
      { name: 'Kira Sertifikaları / Repo', percentage: 8, color: '#10b981' },
    ]
  },
  {
    code: 'IIH',
    name: 'İSTANBUL PORTFÖY ÜÇÜNCÜ HİSSE SENEDİ FONU',
    category: 'Hisse Senedi Fonu',
    founder: 'İstanbul Portföy Yönetimi A.Ş.',
    riskLevel: 7,
    basePrice: 34.1280,
    annualReturnRate: 0.94,
    volatility: 0.022,
    totalPortfolioValue: 7450000000,
    investorCount: 52100,
    allocation: [
      { name: 'Yerli Hisse Senedi', percentage: 89, color: '#3b82f6' },
      { name: 'VİOP / Repo', percentage: 11, color: '#f59e0b' },
    ]
  },
  {
    code: 'BIO',
    name: 'AK PORTFÖY SAĞLIK SEKTÖRÜ YABANCI HİSSE SENEDİ FONU',
    category: 'Yabancı Hisse Senedi Fonu',
    founder: 'Ak Portföy Yönetimi A.Ş.',
    riskLevel: 6,
    basePrice: 0.5412,
    annualReturnRate: 0.55,
    volatility: 0.013,
    totalPortfolioValue: 1980000000,
    investorCount: 16500,
    allocation: [
      { name: 'Sağlık & BiyoTek Hisseleri', percentage: 88, color: '#3b82f6' },
      { name: 'Mevduat / Nakit', percentage: 12, color: '#10b981' },
    ]
  }
];

// Turkish date formatters
const TURKISH_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export function formatTurkishDate(date: Date): string {
  const day = date.getDate();
  const month = TURKISH_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper to determine start date based on Period selection
export function getStartDateForPeriod(period: TimePeriod, referenceDate: Date = new Date('2026-07-24')): Date {
  const start = new Date(referenceDate);
  switch (period) {
    case '1M':
      start.setMonth(start.getMonth() - 1);
      break;
    case '3M':
      start.setMonth(start.getMonth() - 3);
      break;
    case '6M':
      start.setMonth(start.getMonth() - 6);
      break;
    case 'YTD':
      start.setMonth(0);
      start.setDate(1);
      break;
    case '1Y':
      start.setFullYear(start.getFullYear() - 1);
      break;
    case '3Y':
      start.setFullYear(start.getFullYear() - 3);
      break;
    case 'MAX':
      start.setFullYear(start.getFullYear() - 5);
      break;
  }
  return start;
}

// Generate deterministic historical data for any fund code & period
export function generateFundDetails(fundCodeInput: string = 'AAV', period: TimePeriod = '1Y'): TefasFundDetails {
  const code = (fundCodeInput || 'AAV').trim().toUpperCase();
  const matched = KNOWN_TEFAS_FUNDS.find(f => f.code === code);

  let fundInfo = matched;

  // If unknown fund code, generate a plausible fund metadata
  if (!fundInfo) {
    // Generate pseudo-random deterministic numbers based on code letters
    const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const categoryList = ['Hisse Senedi Fonu', 'Değişken Fon', 'Borçlanma Araçları Fonu', 'Fon Sepeti Fonu', 'Katılım Fonu'];
    const selectedCategory = categoryList[hash % categoryList.length];
    
    fundInfo = {
      code,
      name: `${code} PORTFÖY ${selectedCategory.toUpperCase()}`,
      category: selectedCategory,
      founder: `${code.slice(0, 2)} Portföy Yönetimi A.Ş.`,
      riskLevel: 3 + (hash % 5),
      basePrice: 1.5 + (hash % 20) + ((hash % 99) / 100),
      annualReturnRate: 0.45 + (hash % 50) / 100,
      volatility: 0.01 + (hash % 15) / 1000,
      totalPortfolioValue: 500000000 + (hash * 10000000),
      investorCount: 10000 + (hash * 250),
      allocation: [
        { name: 'Hisse Senedi', percentage: 50, color: '#3b82f6' },
        { name: 'Devlet İç Borçlanma', percentage: 25, color: '#10b981' },
        { name: 'Ters Repo', percentage: 15, color: '#f59e0b' },
        { name: 'Mevduat', percentage: 10, color: '#8b5cf6' },
      ]
    };
  }

  // End date is current date (July 24, 2026)
  const endDate = new Date('2026-07-24');
  const startDate = getStartDateForPeriod(period, endDate);

  // Generate daily points
  const history: FundHistoryPoint[] = [];
  const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Decide data granularity based on total days (so charts remain super crisp)
  let stepDays = 1;
  if (totalDays > 700) stepDays = 5; // for 3Y / 5Y
  else if (totalDays > 300) stepDays = 2; // for 1Y

  // Seed calculation for deterministic price trend
  const seed = fundInfo.code.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

  // We build from startDate up to endDate
  // Initial starting unit price at startDate:
  const dailyReturnFactor = Math.pow(1 + fundInfo.annualReturnRate, 1 / 365) - 1;
  
  // Benchmark initial indexes
  let bist100Val = 10000;
  let goldVal = 2400; // Gram Gold
  let usdVal = 32.5;

  let currentPrice = fundInfo.basePrice * Math.pow(1 - dailyReturnFactor * 0.7, totalDays);
  if (currentPrice <= 0.1) currentPrice = 1.0;

  let startFundPrice = currentPrice;
  let startBist = bist100Val;
  let startGold = goldVal;
  let startUsd = usdVal;

  let prevPrice = currentPrice;

  for (let i = 0; i <= totalDays; i += stepDays) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    
    // Skip weekends for realistic financial market history
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Pseudo-random noise based on sine wave + seed
    const dayIndex = Math.floor((currentDate.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const sineFactor = Math.sin((dayIndex + seed) * 0.15) * 0.008;
    const cosineFactor = Math.cos((dayIndex * 0.07) + seed) * 0.006;
    const marketTrend = (fundInfo.annualReturnRate / 252) + sineFactor + cosineFactor;

    // Price step
    if (i > 0) {
      currentPrice = currentPrice * (1 + marketTrend);
      bist100Val = bist100Val * (1 + (marketTrend * 1.1) + Math.sin(dayIndex * 0.2) * 0.004);
      goldVal = goldVal * (1 + 0.001 + Math.cos(dayIndex * 0.1) * 0.003);
      usdVal = usdVal * (1 + 0.0006 + Math.sin(dayIndex * 0.05) * 0.001);
    } else {
      startFundPrice = currentPrice;
      startBist = bist100Val;
      startGold = goldVal;
      startUsd = usdVal;
    }

    const dailyChange = prevPrice > 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;
    prevPrice = currentPrice;

    // Cumulative returns relative to start of selected period (%)
    const fundReturnPct = ((currentPrice - startFundPrice) / startFundPrice) * 100;
    const bist100ReturnPct = ((bist100Val - startBist) / startBist) * 100;
    const goldReturnPct = ((goldVal - startGold) / startGold) * 100;
    const usdReturnPct = ((usdVal - startUsd) / startUsd) * 100;

    const formattedDate = formatTurkishDate(currentDate);
    const dateIso = currentDate.toISOString().split('T')[0];

    // Estimated total portfolio size scaling with fund growth
    const portfolioSize = Math.round(fundInfo.totalPortfolioValue * (currentPrice / fundInfo.basePrice));
    const investorCount = Math.round(fundInfo.investorCount * (1 + (fundReturnPct > 0 ? fundReturnPct * 0.002 : 0)));

    history.push({
      date: dateIso,
      formattedDate,
      timestamp: currentDate.getTime(),
      price: Number(currentPrice.toFixed(6)),
      changePercent: Number(dailyChange.toFixed(2)),
      portfolioSize,
      investorCount,
      fundReturnPct: Number(fundReturnPct.toFixed(2)),
      bist100ReturnPct: Number(bist100ReturnPct.toFixed(2)),
      goldReturnPct: Number(goldReturnPct.toFixed(2)),
      usdReturnPct: Number(usdReturnPct.toFixed(2)),
    });
  }

  const latestPrice = history.length > 0 ? history[history.length - 1].price : fundInfo.basePrice;
  const lastUpdateDate = history.length > 0 ? history[history.length - 1].formattedDate : formatTurkishDate(endDate);

  // Calculate return periods
  const getReturnOverDays = (days: number) => {
    if (history.length < 2) return 0;
    const targetTime = endDate.getTime() - days * 24 * 60 * 60 * 1000;
    const startPoint = history.find(p => p.timestamp >= targetTime) || history[0];
    return Number((((latestPrice - startPoint.price) / startPoint.price) * 100).toFixed(2));
  };

  const dailyReturnPct = history.length >= 2 
    ? Number((((latestPrice - history[history.length - 2].price) / history[history.length - 2].price) * 100).toFixed(2))
    : 0.12;

  return {
    code: fundInfo.code,
    name: fundInfo.name,
    category: fundInfo.category,
    founder: fundInfo.founder,
    riskLevel: fundInfo.riskLevel,
    latestPrice,
    lastUpdateDate,
    dailyReturnPct,
    weeklyReturnPct: getReturnOverDays(7),
    monthlyReturnPct: getReturnOverDays(30),
    threeMonthReturnPct: getReturnOverDays(90),
    sixMonthReturnPct: getReturnOverDays(180),
    ytdReturnPct: getReturnOverDays(205), // ~from Jan 1 to July 24
    yearlyReturnPct: getReturnOverDays(365),
    threeYearReturnPct: getReturnOverDays(1095),
    totalPortfolioValue: fundInfo.totalPortfolioValue,
    investorCount: fundInfo.investorCount,
    shareCount: Math.round(fundInfo.totalPortfolioValue / latestPrice),
    assetAllocation: fundInfo.allocation,
    history,
  };
}
