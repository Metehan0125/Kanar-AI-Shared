import React, { useEffect, useState } from 'react';
import { X, Star, ArrowRight, Trash2, TrendingUp } from 'lucide-react';
import { TefasFundDetails } from '../types';

interface FavoritesDrawerProps {
  favoriteCodes: string[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFavorite: (code: string) => void;
  onSelectFund: (code: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favoriteCodes,
  isOpen,
  onClose,
  onRemoveFavorite,
  onSelectFund,
}) => {
  const [favoriteFunds, setFavoriteFunds] = useState<TefasFundDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || favoriteCodes.length === 0) {
      setFavoriteFunds([]);
      return;
    }

    setLoading(true);
    Promise.all(
      favoriteCodes.map((code) =>
        fetch(`/api/tefas/fund/${code}?period=1Y`).then((res) => res.json())
      )
    )
      .then((data) => {
        setFavoriteFunds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [isOpen, favoriteCodes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl p-6 space-y-5 overflow-y-auto border-l border-slate-200 dark:border-slate-800 relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Favori Fonlarım ({favoriteCodes.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Favori fonlar yükleniyor...</div>
        ) : favoriteFunds.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <Star className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <p className="text-sm font-medium">Henüz favori bir fon eklemediniz.</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Sık takip ettiğiniz TEFAS fonlarını hızlı erişim için yıldız ikonuna basarak ekleyebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteFunds.map((fund) => {
              const isPos = fund.dailyReturnPct >= 0;
              return (
                <div
                  key={fund.code}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-indigo-400 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">
                        {fund.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[180px]">
                        {fund.name}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveFavorite(fund.code)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="Favorilerden Çıkar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Fiyat</span>
                      <strong className="text-slate-900 dark:text-white">₺{fund.latestPrice.toFixed(4)}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Günlük</span>
                      <strong className={isPos ? 'text-emerald-500' : 'text-rose-500'}>
                        %{isPos ? '+' : ''}{fund.dailyReturnPct}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">1 Yıllık</span>
                      <strong className={fund.yearlyReturnPct >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                        %{fund.yearlyReturnPct >= 0 ? '+' : ''}{fund.yearlyReturnPct}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectFund(fund.code);
                      onClose();
                    }}
                    className="w-full py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Grafiğe Git</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
