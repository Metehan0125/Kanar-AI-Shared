import React, { useState } from 'react';
import { AssetType, CurrencyCode, PortfolioItem } from '../types';
import { X, Plus, Coins, Landmark, BarChart3, Wallet, Check } from 'lucide-react';
import { KNOWN_TEFAS_FUNDS } from '../data/tefasFundsData';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (item: Omit<PortfolioItem, 'id'>) => void;
}

const PRESET_METALS = [
  { code: 'ALTIN', name: 'Gram Altın (24 Ayar)', price: 2610.50, category: 'Altın & Kıymetli Madenler' },
  { code: 'GUMUS', name: 'Gram Gümüş', price: 31.40, category: 'Gümüş & Madenler' },
  { code: 'PLATIN', name: 'Gram Platin', price: 1045.00, category: 'Platin & Değerli Metaller' },
];

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose, onAddAsset }) => {
  const [assetType, setAssetType] = useState<AssetType>('TEFAS');
  const [code, setCode] = useState('AAV');
  const [name, setName] = useState('ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON');
  const [category, setCategory] = useState('Değişken Fon');
  const [amount, setAmount] = useState<string>('100');
  const [avgPrice, setAvgPrice] = useState<string>('12.45');
  const [currency, setCurrency] = useState<CurrencyCode>('TRY');

  if (!isOpen) return null;

  const handleSelectPresetFund = (fundCode: string) => {
    const found = KNOWN_TEFAS_FUNDS.find((f) => f.code === fundCode);
    if (found) {
      setCode(found.code);
      setName(found.name);
      setCategory(found.category);
    }
  };

  const handleSelectPresetMetal = (metalCode: string) => {
    const metal = PRESET_METALS.find((m) => m.code === metalCode);
    if (metal) {
      setCode(metal.code);
      setName(metal.name);
      setCategory(metal.category);
      setAvgPrice(metal.price.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    const parsedPrice = parseFloat(avgPrice);

    if (isNaN(parsedAmount) || parsedAmount <= 0 || isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Lütfen geçerli miktar ve birim fiyatı giriniz.');
      return;
    }

    // Determine default live price
    let currentLivePrice = parsedPrice;
    if (assetType === 'PRECIOUS_METAL') {
      const foundMetal = PRESET_METALS.find((m) => m.code === code);
      if (foundMetal) currentLivePrice = foundMetal.price;
    }

    onAddAsset({
      code: code.toUpperCase(),
      name,
      type: assetType,
      amount: parsedAmount,
      avgBuyPriceTRY: parsedPrice,
      currentPriceTRY: currentLivePrice,
      dailyChangePct: +(Math.random() * 2 - 0.5).toFixed(2),
      category,
      currency,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Portföye Yeni Varlık Ekle
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TEFAS Fonu, Gram Altın/Gümüş veya Hisse varlıklarınızı kaydedin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Varlık Türü
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'TEFAS', label: 'TEFAS Fonu', icon: Landmark },
                { id: 'PRECIOUS_METAL', label: 'Altın / Maden', icon: Coins },
                { id: 'STOCK', label: 'Hisse Senedi', icon: BarChart3 },
                { id: 'CASH', label: 'Nakit / Döviz', icon: Wallet },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = assetType === t.id;
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => {
                      setAssetType(t.id as AssetType);
                      if (t.id === 'PRECIOUS_METAL') handleSelectPresetMetal('ALTIN');
                      else if (t.id === 'TEFAS') handleSelectPresetFund('AAV');
                      else if (t.id === 'CASH') {
                        setCode('USD');
                        setName('Amerikan Doları Nakit');
                        setCategory('Döviz Likit');
                        setAvgPrice('33.12');
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1.5 text-xs font-bold cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Presets for TEFAS or Metals */}
          {assetType === 'TEFAS' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Hızlı TEFAS Fon Seçimi:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {KNOWN_TEFAS_FUNDS.slice(0, 6).map((f) => (
                  <button
                    type="button"
                    key={f.code}
                    onClick={() => handleSelectPresetFund(f.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition-colors cursor-pointer ${
                      code === f.code
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {f.code}
                  </button>
                ))}
              </div>
            </div>
          )}

          {assetType === 'PRECIOUS_METAL' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                Kıymetli Maden Seçimi:
              </label>
              <div className="flex gap-2">
                {PRESET_METALS.map((m) => (
                  <button
                    type="button"
                    key={m.code}
                    onClick={() => handleSelectPresetMetal(m.code)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold border flex-1 transition-colors cursor-pointer ${
                      code === m.code
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Varlık Kodu
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Örn: AAV, ALTIN, THYAO"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Varlık / Fon Adı
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Varlık tam ismi"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Miktar ({assetType === 'PRECIOUS_METAL' ? 'Gram' : 'Adet / Pay'})
              </label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Örn: 100"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Ortalama Alış Fiyatı (₺)
              </label>
              <input
                type="number"
                step="any"
                value={avgPrice}
                onChange={(e) => setAvgPrice(e.target.value)}
                placeholder="Birim alış fiyatı"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Kaydet & Eklemeyi Tamamla</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
