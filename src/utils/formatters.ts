export function translateCategory(category: string, isTR: boolean): string {
  if (isTR || !category) return category;

  const exactMap: Record<string, string> = {
    'Değişken Fon': 'Variable Fund',
    'Hisse Senedi Fonu': 'Equity Fund',
    'Yabancı Hisse Senedi Fonu': 'Foreign Equity Fund',
    'Karma Fon': 'Mixed Fund',
    'Kıymetli Madenler Fonu': 'Precious Metals Fund',
    'Borçlanma Araçları Fonu': 'Debt Instruments Fund',
    'Fon Sepeti Fonu': 'Fund of Funds',
    'Katılım Fonu': 'Participation Fund',
    'Para Piyasası Fonu': 'Money Market Fund',
    'Altın & Kıymetli Madenler': 'Gold & Precious Metals',
    'Gümüş & Madenler': 'Silver & Metals',
    'Platin & Değerli Metaller': 'Platinum & Metals',
    'Yerli Hisse Senedi': 'Domestic Equities',
    'Yabancı Hisse Senedi': 'Foreign Equities',
    'Özel Sektör Borçlanma': 'Corporate Bonds',
    'Ters Repo': 'Reverse Repo',
    'Takasbank Para Piyasası': 'Takasbank Money Market',
    'Mevduat': 'Bank Deposits',
    'Devlet Tahvili': 'Government Bonds',
    'Hedef': 'Target',
    'Araştırma': 'Research',
    'Strateji': 'Strategy',
    'Anımsatıcı': 'Reminder',
  };

  if (exactMap[category]) return exactMap[category];

  return category
    .replace(/Hisse Senedi/g, 'Equity')
    .replace(/Borçlanma Araçları/g, 'Debt Instruments')
    .replace(/Kıymetli Madenler/g, 'Precious Metals')
    .replace(/Para Piyasası/g, 'Money Market')
    .replace(/Fonu/g, 'Fund')
    .replace(/Fon/g, 'Fund');
}

export function translateFundName(name: string, isTR: boolean): string {
  if (isTR || !name) return name;

  let translated = name;

  const replacements: [RegExp, string][] = [
    [/PORTFÖY/g, 'PORTFOLIO'],
    [/BİRİNCİ/g, 'FIRST'],
    [/İKİNCİ/g, 'SECOND'],
    [/ÜÇÜNCÜ/g, 'THIRD'],
    [/DÖRDÜNCÜ/g, 'FOURTH'],
    [/BEŞİNCİ/g, 'FIFTH'],
    [/DEĞİŞKEN/g, 'VARIABLE'],
    [/HİSSE SENEDİ/g, 'EQUITY'],
    [/YABANCI/g, 'FOREIGN'],
    [/İŞTİRAKLERİ/g, 'AFFILIATES'],
    [/HOLDİNG/g, 'HOLDING'],
    [/SERBEST/g, 'HEDGE'],
    [/KATILIM/g, 'PARTICIPATION'],
    [/BORÇLANMA ARAÇLARI/g, 'DEBT INSTRUMENTS'],
    [/FONU/g, 'FUND'],
    [/FON/g, 'FUND'],
    [/YÖNETİMİ/g, 'MANAGEMENT'],
    [/A\.Ş\./g, 'INC.'],
    [/DEĞERLİ METALLER/g, 'PRECIOUS METALS'],
    [/AMERİKAN/g, 'AMERICAN'],
    [/TEKNOLOJİ/g, 'TECHNOLOGY'],
    [/ALTIN/g, 'GOLD'],
    [/GÜMÜŞ/g, 'SILVER'],
    [/ELEKTRİKLİ ARAÇLAR/g, 'ELECTRIC VEHICLES'],
    [/MUTLAK GETİRİ BAZLI/g, 'ABSOLUTE RETURN'],
  ];

  for (const [pattern, replacement] of replacements) {
    translated = translated.replace(pattern, replacement);
  }

  return translated;
}

export function translateFounder(founder: string, isTR: boolean): string {
  if (isTR || !founder) return founder;
  return founder
    .replace(/Portföy Yönetimi A\.Ş\./g, 'Portfolio Management Inc.')
    .replace(/Portföy/g, 'Portfolio');
}

export function translateDate(dateStr: string, isTR: boolean): string {
  if (isTR || !dateStr) return dateStr;

  const monthMap: Record<string, string> = {
    Ocak: 'January',
    Şubat: 'February',
    Mart: 'March',
    Nisan: 'April',
    Mayıs: 'May',
    Haziran: 'June',
    Temmuz: 'July',
    Ağustos: 'August',
    Eylül: 'September',
    Ekim: 'October',
    Kasım: 'November',
    Aralık: 'December',
  };

  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    if (monthMap[month]) {
      return `${monthMap[month]} ${day}, ${year}`;
    }
  }

  return dateStr;
}

export function translateAssetName(name: string, isTR: boolean): string {
  if (isTR || !name) return name;

  let translated = name;

  // Gold / Altın
  if (translated.includes('Gram Altın') || translated.includes('Altın')) {
    translated = translated
      .replace(/Fiziki Gram Altın/g, 'Gram Gold (Physical)')
      .replace(/Gram Altın \(24 Ayar Banka Hesabı\)/g, 'Gram Gold (24K Bank Account)')
      .replace(/Gram Altın \(24 Ayar\)/g, 'Gram Gold (24K)')
      .replace(/Gram Altın/g, 'Gram Gold')
      .replace(/Altın & Kıymetli Madenler/g, 'Gold & Precious Metals')
      .replace(/Altın/g, 'Gold');
  }

  // Silver / Gümüş
  if (translated.includes('Gram Gümüş') || translated.includes('Gümüş')) {
    translated = translated
      .replace(/Gram Gümüş \(Fiziki\/Banka\)/g, 'Gram Silver (Physical/Bank)')
      .replace(/Gram Gümüş/g, 'Gram Silver')
      .replace(/Gümüş & Madenler/g, 'Silver & Metals')
      .replace(/Gümüş/g, 'Silver');
  }

  // Platinum / Platin
  if (translated.includes('Gram Platin') || translated.includes('Platin')) {
    translated = translated
      .replace(/Gram Platin/g, 'Gram Platinum')
      .replace(/Platin & Değerli Metaller/g, 'Platinum & Metals')
      .replace(/Platin/g, 'Platinum');
  }

  // Cash / Currency
  if (translated.includes('Amerikan Doları') || translated.includes('Dolar')) {
    translated = translated
      .replace(/Amerikan Doları Nakit/g, 'US Dollar Cash')
      .replace(/Dolar Nakit/g, 'US Dollar Cash');
  }
  if (translated.includes('Euro Nakit')) translated = 'Euro Cash';
  if (translated.includes('Sterlin Nakit')) translated = 'GBP Cash';

  // Equities / BIST
  if (translated.includes('BIST 100 Endeks Hisseleri')) {
    translated = 'BIST 100 Index Equities';
  }

  // Generic term cleanup
  translated = translated
    .replace(/Banka Hesabı/g, 'Bank Account')
    .replace(/Fiziki/g, 'Physical')
    .replace(/Ayar/g, 'K');

  // Fallback to TEFAS fund name translation
  return translateFundName(translated, isTR);
}
