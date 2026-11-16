import React, { useEffect, useState } from 'react';
import { X, Layers, ArrowRight, Trash2 } from 'lucide-react';
import { TefasFundDetails } from '../types';

interface FundComparisonModalProps {
  compareCodes: string[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCode: (code: string) => void;
  onSelectFund: (code: string) => void;
}

export const FundComparisonModal: React.FC<FundComparisonModalProps> = ({
  compareCodes,
  isOpen,
  onClose,
  onRemoveCode,
  onSelectFund,
}) => {
  const [fundsList, setFundsList] = useState<TefasFundDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || compareCodes.length === 0) {
      setFundsList([]);
      return;
    }

    setLoading(true);
    Promise.all(
      compareCodes.map((code) =>
        fetch(`/api/tefas/fund/${code}?period=1Y`).then((res) => res.json())
      )
    )
      .then((data) => {
        setFundsList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [isOpen, compareCodes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Fon Karşılaştırma Matrisi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Seçili fonların dönemsel performans ve risk göstergelerinin karşılaştırması
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Fon verileri yükleniyor...</div>
        ) : fundsList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-2">
            <p>Karşılaştırma listesine henüz fon eklemediniz.</p>
            <p className="text-xs">
              Herhangi bir fonun detay sayfasındaki <strong>"Karşılaştır"</strong> butonuna basabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-3 font-semibold text-slate-400 min-w-[140px]">Metrik / Özellik</th>
                  {fundsList.map((fund) => (
                    <th key={fund.code} className="py-3 px-3 text-center min-w-[180px]">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">
                            {fund.code}
                          </span>
                          <button
                            onClick={() => onRemoveCode(fund.code)}
                            className="text-slate-400 hover:text-rose-500"
                            title="Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {fund.name}
                        </span>
                        <button
                          onClick={() => {
                            onSelectFund(fund.code);
                            onClose();
                          }}
                          className="mt-1 text-[10px] text-indigo-600 dark:text-indigo-400 underline font-medium flex items-center gap-0.5"
                        >
                          Grafiği Gör <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Birim Fiyat</td>
                  {fundsList.map((f) => (
                    <td key={f.code} className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white">
                      ₺{f.latestPrice.toFixed(6)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Günlük Getiri</td>
                  {fundsList.map((f) => (
                    <td
                      key={f.code}
                      className={`py-2.5 px-3 text-center font-bold ${
                        f.dailyReturnPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      %{f.dailyReturnPct >= 0 ? '+' : ''}
                      {f.dailyReturnPct}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Aylık Getiri</td>
                  {fundsList.map((f) => (
                    <td
                      key={f.code}
                      className={`py-2.5 px-3 text-center font-bold ${
                        f.monthlyReturnPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      %{f.monthlyReturnPct >= 0 ? '+' : ''}
                      {f.monthlyReturnPct}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Yılbaşı (YTD) Getiri</td>
                  {fundsList.map((f) => (
                    <td
                      key={f.code}
                      className={`py-2.5 px-3 text-center font-bold ${
                        f.ytdReturnPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      %{f.ytdReturnPct >= 0 ? '+' : ''}
                      {f.ytdReturnPct}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">1 Yıllık Getiri</td>
                  {fundsList.map((f) => (
                    <td
                      key={f.code}
                      className={`py-2.5 px-3 text-center font-bold ${
                        f.yearlyReturnPct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      %{f.yearlyReturnPct >= 0 ? '+' : ''}
                      {f.yearlyReturnPct}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Risk Seviyesi</td>
                  {fundsList.map((f) => (
                    <td key={f.code} className="py-2.5 px-3 text-center font-bold text-slate-800 dark:text-slate-200">
                      {f.riskLevel} / 7
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-slate-500">Fon Büyüklüğü</td>
                  {fundsList.map((f) => (
                    <td key={f.code} className="py-2.5 px-3 text-center font-bold text-slate-800 dark:text-slate-200">
                      ₺{(f.totalPortfolioValue / 1000000).toFixed(1)}M
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
