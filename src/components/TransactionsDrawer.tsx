import React, { useState } from 'react';
import { Transaction } from '../types';
import { useLanguage } from '../LanguageContext';
import { X, RefreshCw, Plus, ArrowUpRight, ArrowDownRight, Trash2, Calendar } from 'lucide-react';

interface TransactionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionsDrawer: React.FC<TransactionsDrawerProps> = ({
  isOpen,
  onClose,
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const { t, isTR } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [assetCode, setAssetCode] = useState('AAV');
  const [assetName, setAssetName] = useState('ATLAS PORTFÖY BİRİNCİ DEĞİŞKEN FON');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [amount, setAmount] = useState('50');
  const [priceTRY, setPriceTRY] = useState('12.45');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    const prc = parseFloat(priceTRY);

    if (isNaN(amt) || amt <= 0 || isNaN(prc) || prc <= 0) {
      alert(isTR ? 'Lütfen geçerli miktar ve fiyat giriniz.' : 'Please enter a valid amount and price.');
      return;
    }

    onAddTransaction({
      assetCode: assetCode.toUpperCase(),
      assetName,
      type,
      amount: amt,
      priceTRY: prc,
      totalCostTRY: amt * prc,
      date: new Date().toISOString().split('T')[0],
      note,
    });

    setNote('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl p-6 space-y-5 overflow-y-auto border-l border-slate-200 dark:border-slate-800 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {isTR ? 'Alım / Satım İşlem Geçmişi' : 'Buy / Sell Transaction History'} ({transactions.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Transaction Toggle */}
        <div>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isTR ? 'Yeni Alış / Satış Emri Kaydet' : 'Record New Buy / Sell Order'}</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {isTR ? 'İşlem Ekle' : 'Add Transaction'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  {isTR ? 'Kapat' : 'Close'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('BUY')}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    type === 'BUY'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {isTR ? 'Alış (+BUY)' : 'Buy (+BUY)'}
                </button>
                <button
                  type="button"
                  onClick={() => setType('SELL')}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                    type === 'SELL'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {isTR ? 'Satış (-SELL)' : 'Sell (-SELL)'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    {isTR ? 'Kod' : 'Code'}
                  </label>
                  <input
                    type="text"
                    value={assetCode}
                    onChange={(e) => setAssetCode(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    {isTR ? 'Miktar' : 'Amount'}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  {isTR ? 'Birim Fiyat (₺)' : 'Unit Price (₺)'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={priceTRY}
                  onChange={(e) => setPriceTRY(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  {isTR ? 'Açıklama / Not (Opsiyonel)' : 'Note / Description (Optional)'}
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={isTR ? "Örn: Garanti Bankasından alım yapıldı" : "e.g., Purchased via Garanti Bank"}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700"
              >
                {isTR ? 'İşlemi Kaydet' : 'Save Transaction'}
              </button>
            </form>
          )}
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              {isTR ? 'Henüz bir alım/satım işlemi kaydedilmedi.' : 'No transactions recorded yet.'}
            </div>
          ) : (
            transactions.map((tx) => {
              const isBuy = tx.type === 'BUY';
              return (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isBuy
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {isBuy ? (isTR ? 'ALIŞ' : 'BUY') : (isTR ? 'SATIŞ' : 'SELL')}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {tx.assetCode}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">
                        {isTR ? 'Miktar / Fiyat' : 'Amount / Price'}
                      </span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {tx.amount} {isTR ? 'adet' : 'units'} @ ₺{tx.priceTRY}
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">
                        {isTR ? 'Toplam İşlem Tutarı' : 'Total Transaction Value'}
                      </span>
                      <strong className="text-indigo-600 dark:text-indigo-400">
                        ₺{tx.totalCostTRY.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {tx.date}
                    </span>
                    {tx.note && <span className="italic line-clamp-1 max-w-[180px]">{tx.note}</span>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
