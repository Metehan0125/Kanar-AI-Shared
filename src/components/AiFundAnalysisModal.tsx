import React, { useEffect, useState } from 'react';
import { X, Sparkles, CheckCircle, ShieldCheck, UserCheck, RefreshCw, Award } from 'lucide-react';
import { TefasFundDetails, AiFundAnalysisResponse } from '../types';

interface AiFundAnalysisModalProps {
  fundDetails: TefasFundDetails;
  isOpen: boolean;
  onClose: () => void;
}

export const AiFundAnalysisModal: React.FC<AiFundAnalysisModalProps> = ({
  fundDetails,
  isOpen,
  onClose,
}) => {
  const [analysis, setAnalysis] = useState<AiFundAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !fundDetails) return;

    setLoading(true);
    setError(null);

    fetch('/api/tefas/ai-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fundCode: fundDetails.code,
        fundName: fundDetails.name,
        category: fundDetails.category,
        latestPrice: fundDetails.latestPrice,
        yearlyReturnPct: fundDetails.yearlyReturnPct,
        ytdReturnPct: fundDetails.ytdReturnPct,
        riskLevel: fundDetails.riskLevel,
        allocation: fundDetails.assetAllocation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Yapay zeka analizi yüklenirken bir hata oluştu.');
        setLoading(false);
      });
  }, [isOpen, fundDetails]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 p-6 relative">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                {fundDetails.code}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Yapay Zeka Fon Analiz Raporu
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gemini AI ile oluşturulan anlık finansal fon raporu
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {fundDetails.code} için TEFAS verileri ve finansal göstergeler analiz ediliyor...
            </p>
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-sm rounded-xl border border-rose-200 dark:border-rose-900">
            {error}
          </div>
        ) : analysis ? (
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            {/* Summary */}
            <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl space-y-1">
              <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Executive Özet
              </h4>
              <p className="leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Performance Evaluation */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Getiri ve Performans
              </h4>
              <p className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 leading-relaxed">
                {analysis.performanceEvaluation}
              </p>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Risk & Portföy Dağılımı
              </h4>
              <p className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 leading-relaxed">
                {analysis.riskAssessment}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Önemli Çıkarımlar
              </h4>
              <ul className="space-y-2">
                {analysis.keyTakeaways?.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable Investor Profile */}
            <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-xl flex items-start space-x-3 text-xs">
              <UserCheck className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white block font-semibold">
                  Uygun Yatırımcı Profili
                </strong>
                <span className="text-slate-600 dark:text-slate-300">
                  {analysis.suitableInvestorProfile}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
