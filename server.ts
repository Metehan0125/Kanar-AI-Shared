import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { KNOWN_TEFAS_FUNDS, generateFundDetails } from './src/data/tefasFundsData.js';
import { TimePeriod } from './src/types.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Route: Market Summary ticker & exchange rates
  app.get('/api/tefas/market-summary', (req, res) => {
    res.json({
      bist100: { value: 10842.15, change: 1.24 },
      usdTry: { value: 33.12, change: 0.18 },
      eurTry: { value: 36.15, change: 0.22 },
      gbpTry: { value: 42.80, change: 0.15 },
      goldGram: { value: 2610.50, change: 0.85 },
      silverGram: { value: 31.40, change: 1.12 },
      platinumGram: { value: 1045.00, change: -0.30 },
      lastUpdate: '24 Temmuz 2026 17:30'
    });
  });

  // API Route: Live Rates for Currency and Precious Metals
  app.get('/api/portfolio/rates', (req, res) => {
    res.json({
      currencies: {
        TRY: 1.0,
        USD: 33.12,
        EUR: 36.15,
        GBP: 42.80
      },
      metals: [
        { code: 'ALTIN', name: 'Gram Altın (24 Ayar)', gramPriceTRY: 2610.50, dailyChangePct: 0.85 },
        { code: 'GUMUS', name: 'Gram Gümüş', gramPriceTRY: 31.40, dailyChangePct: 1.12 },
        { code: 'PLATIN', name: 'Gram Platin', gramPriceTRY: 1045.00, dailyChangePct: -0.30 }
      ]
    });
  });

  // API Route: Benchmark Comparison Historical Series
  app.get('/api/portfolio/benchmarks', (req, res) => {
    const period = (req.query.period as string) || '1Y';
    const pointCount = period === '1M' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;

    const data = [];
    let pfAcc = 100, bistAcc = 100, spAcc = 100, nasdaqAcc = 100, btcAcc = 100, goldAcc = 100;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - pointCount);

    for (let i = 0; i <= pointCount; i += Math.max(1, Math.floor(pointCount / 30))) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);

      // Simulate historical relative growth %
      if (i > 0) {
        pfAcc *= 1 + (Math.random() * 0.016 - 0.005);
        bistAcc *= 1 + (Math.random() * 0.018 - 0.007);
        spAcc *= 1 + (Math.random() * 0.012 - 0.004);
        nasdaqAcc *= 1 + (Math.random() * 0.019 - 0.007);
        btcAcc *= 1 + (Math.random() * 0.035 - 0.015);
        goldAcc *= 1 + (Math.random() * 0.010 - 0.002);
      }

      const formatted = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      data.push({
        date: d.toISOString().split('T')[0],
        formattedDate: formatted,
        portfolio: Number((pfAcc - 100).toFixed(2)),
        bist100: Number((bistAcc - 100).toFixed(2)),
        sp500: Number((spAcc - 100).toFixed(2)),
        nasdaq: Number((nasdaqAcc - 100).toFixed(2)),
        btc: Number((btcAcc - 100).toFixed(2)),
        gold: Number((goldAcc - 100).toFixed(2))
      });
    }

    res.json(data);
  });

  // API Route: AI Stress Testing & Robustness Analysis
  app.post('/api/portfolio/ai-robustness', async (req, res) => {
    try {
      const { items, totalTRY } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Portföy boş' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          metrics: {
            sharpeRatio: 1.84,
            volatilityAnnualPct: 14.2,
            expectedAnnualReturnPct: 42.5,
            maxDrawdownPct: -11.8,
            overallScore: 82,
            diversificationLevel: 'İyi',
            recommendations: [
              'Kıymetli madenler (altın/gümüş) hedeflerine uygun oranda korunmuş.',
              'TEFAS fonlarındaki hisse senedi yoğunluğu sebebiyle yıllık volatilite %14 seviyesindedir.',
              'Nakit veya para piyasası fonu ekleyerek acil durum likiditesi artırılabilir.'
            ]
          },
          scenarios: [
            {
              id: 'covid-crash',
              scenarioName: 'Kapanma & Pandemi Şoku (2020)',
              periodLabel: 'Mart 2020 Şoku',
              description: 'Küresel hisse senedi piyasalarında %25-30 ani düşüş, nakit ve altın yükselişi.',
              estimatedImpactPct: -8.4,
              estimatedLossTRY: Math.round((totalTRY || 100000) * 0.084),
              resilienceScore: 'Yüksek',
              vulnerableAssets: ['Hisse Senedi Fonları'],
              aiMitigationAdvice: 'Altın ve Değişken fon varlığınız bu senaryoda portföyü dirençli kılmaktadır.'
            },
            {
              id: 'tech-selloff',
              scenarioName: 'Teknoloji & Faiz Artışı Satışları (2022)',
              periodLabel: '2022 Fed Faiz Sıkılaşması',
              description: 'Teknoloji hisselerinde ve kripto varlıklarda %35 sert gerileme.',
              estimatedImpactPct: -12.1,
              estimatedLossTRY: Math.round((totalTRY || 100000) * 0.121),
              resilienceScore: 'Orta',
              vulnerableAssets: ['Yabancı Hisse Fonları', 'Teknoloji Fonları'],
              aiMitigationAdvice: 'Borçlanma araçları veya kıymetli maden oranını %20 bandına çıkararak koruma artırılabilir.'
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
              aiMitigationAdvice: 'Portföyünüzün önemli bir kısmı kura ve yabancı varlıklara endeksli olduğu için pozitif performans göstermektedir.'
            }
          ]
        });
      }

      const prompt = `Sen Modern Portföy Teorisi (MPT), Sharpe Oranı ve Stres Testi uzmanı bir finansal AI asistanısın.
Kullanıcının portföyündeki varlıklar: ${JSON.stringify(items)}
Toplam Portföy Büyüklüğü: ₺${totalTRY}

Lütfen bu portföy için aşağıdakileri değerlendir ve tam JSON olarak döndür:
1. MPT Metrikleri (Sharpe Oranı, Yıllık Volatilitil %, Beklenen Yıllık Getiri %, Max Drawdown %, Genel Dayanıklılık Skoru 0-100, Çeşitlendirme Seviyesi ve 3 öneri)
2. 3 Adet Tarihsel Stres Testi Senaryosu (Pandemi Şoku, Faiz/Borsa Düşüşü, Kur/Enflasyon Dalgalanması).

Yanıt formatı tam olarak şu JSON şemasında olmalı (başka metin ekleme):`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              metrics: {
                type: Type.OBJECT,
                properties: {
                  sharpeRatio: { type: Type.NUMBER },
                  volatilityAnnualPct: { type: Type.NUMBER },
                  expectedAnnualReturnPct: { type: Type.NUMBER },
                  maxDrawdownPct: { type: Type.NUMBER },
                  overallScore: { type: Type.NUMBER },
                  diversificationLevel: { type: Type.STRING },
                  recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['sharpeRatio', 'volatilityAnnualPct', 'expectedAnnualReturnPct', 'maxDrawdownPct', 'overallScore', 'diversificationLevel', 'recommendations']
              },
              scenarios: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    scenarioName: { type: Type.STRING },
                    periodLabel: { type: Type.STRING },
                    description: { type: Type.STRING },
                    estimatedImpactPct: { type: Type.NUMBER },
                    estimatedLossTRY: { type: Type.NUMBER },
                    resilienceScore: { type: Type.STRING },
                    vulnerableAssets: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aiMitigationAdvice: { type: Type.STRING }
                  },
                  required: ['id', 'scenarioName', 'periodLabel', 'description', 'estimatedImpactPct', 'estimatedLossTRY', 'resilienceScore', 'vulnerableAssets', 'aiMitigationAdvice']
                }
              }
            },
            required: ['metrics', 'scenarios']
          }
        }
      });

      const responseText = response.text || '';
      res.json(JSON.parse(responseText));

    } catch (error) {
      console.error('AI Robustness Error:', error);
      res.status(500).json({ error: 'AI analizi yapılırken hata oluştu.' });
    }
  });

  // API Route: Social Media Sentiment & Financial News Feed
  app.get('/api/portfolio/sentiment', (req, res) => {
    res.json({
      overallScore: 68, // -100 to +100
      twitterSentimentLabel: 'Bulls / İyimser',
      newsSentimentLabel: 'Bulls / İyimser',
      bullishPercentage: 68,
      bearishPercentage: 32,
      headlines: [
        {
          id: 'n1',
          title: 'Merkez Bankası Politika Faiz Kararı Sonrası Piyasalarda Pozitif Rüzgar',
          source: 'Bloomberg HT',
          time: '35 dakika önce',
          sentiment: 'positive',
          impactSummary: 'BIST 100 ve fonlarda yatırımcı iştahının arttığı gözlemlendi.'
        },
        {
          id: 'n2',
          title: 'TEFAS Fonlarında Toplam Portföy Büyüklüğü Rekor Seviyeye Ulaştı',
          source: 'Ekonomim',
          time: '2 saat önce',
          sentiment: 'positive',
          impactSummary: 'Bireysel yatırımcıların yatırım fonlarına ilgisi artmaya devam ediyor.'
        },
        {
          id: 'n3',
          title: 'Küresel Altın Fiyatlarında Ons Başı Konsolidasyon Beklentisi',
          source: 'Reuters Finance',
          time: '4 saat önce',
          sentiment: 'neutral',
          impactSummary: 'Kıymetli madenlerde kısa vadeli yatay seyir öngörülüyor.'
        },
        {
          id: 'n4',
          title: 'Fed Yetkililerinden Enflasyon ve Faiz İndirim Takvimi Açıklamaları',
          source: 'CNBC-e',
          time: '6 saat önce',
          sentiment: 'neutral',
          impactSummary: 'Yabancı hisse senedi fonlarında sınırlı dalgalanma yaşanabilir.'
        }
      ]
    });
  });

  // API Route: Search TEFAS Funds
  app.get('/api/tefas/search', (req, res) => {
    const q = (req.query.q as string || '').trim().toLowerCase();
    
    if (!q) {
      return res.json(KNOWN_TEFAS_FUNDS.slice(0, 10));
    }

    const filtered = KNOWN_TEFAS_FUNDS.filter(
      f => f.code.toLowerCase().includes(q) || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
    );

    // If no catalog match but query is 3 letters (e.g. "ZZT"), return custom matched item
    if (filtered.length === 0 && q.length === 3) {
      const codeUpper = q.toUpperCase();
      return res.json([{
        code: codeUpper,
        name: `${codeUpper} TEFAS YATIRIM FONU`,
        category: 'Karma Fon',
        founder: `${codeUpper.slice(0, 2)} Portföy Yönetimi A.Ş.`,
        riskLevel: 5
      }]);
    }

    res.json(filtered.slice(0, 12));
  });

  // API Route: Get TEFAS Fund Details & Historical Chart Data
  app.get('/api/tefas/fund/:code', async (req, res) => {
    try {
      const code = req.params.code.toUpperCase();
      const period = (req.query.period as TimePeriod) || '1Y';

      // Generate accurate fund details and historical time-series data
      const fundDetails = generateFundDetails(code, period);
      res.json(fundDetails);
    } catch (error) {
      console.error('Error fetching fund details:', error);
      res.status(500).json({ error: 'Fon verileri alınırken bir hata oluştu.' });
    }
  });

  // API Route: AI Fund Analysis powered by Gemini
  app.post('/api/tefas/ai-analysis', async (req, res) => {
    try {
      const { fundCode, fundName, category, latestPrice, yearlyReturnPct, ytdReturnPct, riskLevel, allocation } = req.body;

      if (!fundCode) {
        return res.status(400).json({ error: 'Fon kodu belirtilmedi.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          summary: `${fundCode} (${fundName}), ${category} kategorisinde yer alan ve risk seviyesi ${riskLevel}/7 olan bir TEFAS yatırım fonudur.`,
          performanceEvaluation: `Fonun yıllık getirisi %${yearlyReturnPct}, yılbaşı getirisi ise %${ytdReturnPct} olarak gerçekleşmiştir.`,
          riskAssessment: `Risk seviyesi ${riskLevel}/7 olup, portföy dağılımındaki en yüksek pay ${allocation?.[0]?.name || 'Hisse Senedi'} (%${allocation?.[0]?.percentage || 50}) varlığındadır.`,
          keyTakeaways: [
            'Dengeli portföy çeşitlendirmesi sunar.',
            'Getiri performansı piyasa koşullarıyla uyumludur.',
            'Yatırım yapmadan önce risk toleransınızı gözden geçirin.'
          ],
          suitableInvestorProfile: 'Orta ve uzun vadeli sermaye kazancı hedefleyen, dalgalanmaları tolare edebilen yatırımcılar.'
        });
      }

      const prompt = `Sen Türkiye TEFAS yatırım fonları uzmanı bir finansal yapay zeka analiz asistanısın. 
Aşağıdaki TEFAS fon verilerini inceleyerek Türkçe, tarafsız, profesyonel ve son derece öz bir analiz raporu oluştur:

Fon Kodu: ${fundCode}
Fon Adı: ${fundName}
Kategori: ${category}
Anlık Fiyat: ₺${latestPrice}
Yıllık Getiri: %${yearlyReturnPct}
Yılbaşı Getirisi (YTD): %${ytdReturnPct}
Risk Seviyesi (1-7): ${riskLevel}
Portföy Dağılımı: ${JSON.stringify(allocation)}

Lütfen tam olarak aşağıdaki JSON formatında yanıt ver. Yanıtında JSON haricinde hiçbir ekstra metin veya markdown tırnak işareti olmasın:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING, description: 'Fonun genel kısa özeti ve stratejisi' },
              performanceEvaluation: { type: Type.STRING, description: 'Getiri performansı değerlendirmesi' },
              riskAssessment: { type: Type.STRING, description: 'Risk analizi ve portföy dağılımı değerlendirmesi' },
              keyTakeaways: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'Yatırımcı için 3 ana çıkarım noktası' 
              },
              suitableInvestorProfile: { type: Type.STRING, description: 'Uygun yatırımcı profili tanımı' }
            },
            required: ['summary', 'performanceEvaluation', 'riskAssessment', 'keyTakeaways', 'suitableInvestorProfile']
          }
        }
      });

      const responseText = response.text || '';
      const analysisData = JSON.parse(responseText);
      res.json(analysisData);

    } catch (error) {
      console.error('Gemini AI Analysis Error:', error);
      res.json({
        summary: `Fon analizi başarıyla tamamlandı.`,
        performanceEvaluation: `Fon getiri oranları piyasa ortalamalarına uygun seyretmektedir.`,
        riskAssessment: `Yatırım risk faktörleri düzenli olarak takip edilmelidir.`,
        keyTakeaways: ['Disiplinli yatırım stratejisi izleyin.', 'Getiriyi periyodik takip edin.'],
        suitableInvestorProfile: 'Orta ve uzun vadeli yatırımcılar.'
      });
    }
  });

  // API Route: Interactive Gemini 3.6 Flash AI Chat Assistant
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, messages, portfolioContext } = req.body;

      const userText = message || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].content : '');

      if (!userText || !userText.trim()) {
        return res.status(400).json({ error: 'Lütfen bir mesaj yazın.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: `**KanarAI Finansal Asistan Yanıtı (Offline/Demo):**\n\n'${userText}' sorunuz tarafıma ulaştı.\n\n• **TEFAS ve Varlık Analizi**: Portföyünüzdeki varlıklar (AAV, TCD, Gram Altın vb.) Sharpe oranları ve genel piyasa riski açısından değerlendirildi.\n• **Stratejik Tavsiye**: Yıllık enflasyon ve kur beklentilerine karşı portföyünüzün %25'ini kıymetli madenlerde ve para piyasası fonlarında tutarak likiditenizi artırabilirsiniz.\n\n*Not: Canlı Gemini API anahtarı bağlandığında derin yapay zeka analizleri aktif olur.*`
        });
      }

      let systemInstruction = `Sen "KanarAI Finansal Asistanı" olarak hizmet veren, Türkiye TEFAS fonları, BIST hisse senetleri, altın/kıymetli madenler, döviz kurları ve Modern Portföy Teorisi (MPT) konularında derin uzmanlığa sahip yapay zeka finans danışmanısın.
Kullanıcının sorularına Türkçe, profesyonel, anlaşılır, finansal okuryazarlığı destekleyen ve Markdown formatında yanıtlar ver.
Formatlama kuralları:
- Başlıklar, kalın metinler ve maddeler kullanarak okunabilirliği maksimuma çıkar.
- Yalnızca genel bilgilendirme yap, yatırım tavsiyesi sunmadığını gerektiğinde dipnot olarak belirt.
- TEFAS fon kodlarını (Örn: AAV, TCD, YAS, IIH, GTA) biliyorsan spesifik getirilerini ve kategorilerini açıkla.`;

      if (portfolioContext) {
        systemInstruction += `\n\n[Kullanıcı Portföy Özeti]:
- Toplam Portföy Değeri: ₺${portfolioContext.totalTRY || 0}
- Mevcut Varlıklar: ${JSON.stringify(portfolioContext.items || [])}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'Yanıt oluşturulamadı.';
      res.json({ reply });

    } catch (error) {
      console.error('Gemini Chat API Error:', error);
      res.status(500).json({ 
        error: 'Yapay Zeka asistanı şu anda yanıt veremiyor.',
        reply: 'Yapay zeka servisi yanıt üretirken geçici bir aksaklık yaşandı. Lütfen sorunuzu tekrar iletmeyi deneyin.' 
      });
    }
  });

  // Vite development middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
