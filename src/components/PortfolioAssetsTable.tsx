import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { PortfolioItem, AssetType } from '../types';
import { translateAssetName as translateNameHelper } from '../utils/formatters';
import {
  Plus,
  Trash2,
  Coins,
  Landmark,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Search,
  Filter,
  Download,
  MoreVertical,
  CheckSquare,
  Square,
  Eye,
  ArrowUpDown,
  X,
  Check,
} from 'lucide-react';

interface PortfolioAssetsTableProps {
  items: PortfolioItem[];
  onOpenAddAsset: () => void;
  onRemoveAsset: (id: string) => void;
  onSelectFund: (code: string) => void;
}

type SortField = 'code' | 'name' | 'cost' | 'val' | 'pl';

export const PortfolioAssetsTable: React.FC<PortfolioAssetsTableProps> = ({
  items,
  onOpenAddAsset,
  onRemoveAsset,
  onSelectFund,
}) => {
  const { t, isTR } = useLanguage();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('val');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [profitStatusFilter, setProfitStatusFilter] = useState<'ALL' | 'PROFIT' | 'LOSS'>('ALL');

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => onRemoveAsset(id));
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const headers = isTR
      ? ['Varlık Kodu', 'Varlık İsmi', 'Tür', 'Miktar', 'Ort. Alış (TL)', 'Güncel Fiyat (TL)', 'Maliyet (TL)', 'Güncel Değer (TL)', 'Kar/Zarar (TL)']
      : ['Asset Code', 'Asset Name', 'Type', 'Amount', 'Avg Buy Price (TRY)', 'Current Price (TRY)', 'Cost (TRY)', 'Current Value (TRY)', 'Profit/Loss (TRY)'];
    const rows = filteredItems.map(item => {
      const cost = item.amount * item.avgBuyPriceTRY;
      const val = item.amount * item.currentPriceTRY;
      const pl = val - cost;
      return [
        item.code,
        `"${item.name.replace(/"/g, '""')}"`,
        item.type,
        item.amount,
        item.avgBuyPriceTRY,
        item.currentPriceTRY,
        cost.toFixed(2),
        val.toFixed(2),
        pl.toFixed(2)
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `portfoy_varlik_listesi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredItems = items
    .filter((item) => {
      const matchesType = filterType === 'ALL' || item.type === filterType;
      const matchesSearch =
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      const cost = item.amount * item.avgBuyPriceTRY;
      const val = item.amount * item.currentPriceTRY;
      const pl = val - cost;

      let matchesProfit = true;
      if (profitStatusFilter === 'PROFIT') matchesProfit = pl >= 0;
      if (profitStatusFilter === 'LOSS') matchesProfit = pl < 0;

      return matchesType && matchesSearch && matchesProfit;
    })
    .sort((a, b) => {
      const costA = a.amount * a.avgBuyPriceTRY;
      const valA = a.amount * a.currentPriceTRY;
      const plA = valA - costA;

      const costB = b.amount * b.avgBuyPriceTRY;
      const valB = b.amount * b.currentPriceTRY;
      const plB = valB - costB;

      let result = 0;
      if (sortField === 'code') result = a.code.localeCompare(b.code);
      if (sortField === 'name') result = a.name.localeCompare(b.name);
      if (sortField === 'cost') result = costA - costB;
      if (sortField === 'val') result = valA - valB;
      if (sortField === 'pl') result = plA - plB;

      return sortAsc ? result : -result;
    });

  const getAssetInitials = (code: string, name: string) => {
    if (code && code.length <= 4) return code.substring(0, 2).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const translateAssetName = (name: string) => {
    return translateNameHelper(name, isTR);
  };

  const getAssetAvatarColor = (index: number) => {
    const colors = [
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Table Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        {/* Title & Icon */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base tracking-tight">
              {t('portfolioDetailsTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('portfolioDetailsDesc')} ({items.length} {t('pieces')})
            </p>
          </div>
        </div>

        {/* Search, Filter Tabs & Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Bar */}
          <div className="relative min-w-[180px] sm:min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchAsset')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Filter Type Pills */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
            {[
              { id: 'ALL', label: t('all') },
              { id: 'TEFAS', label: 'TEFAS' },
              { id: 'STOCK', label: 'STOCK' },
              { id: 'PRECIOUS_METAL', label: t('preciousMetal') },
              { id: 'CASH', label: t('currencyCash') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Modal Trigger */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('filter')}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('export')}</span>
          </button>
        </div>
      </div>

      {/* Floating Action Bar for Selected Items */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 animate-in fade-in">
          <span>{selectedIds.length} {t('assetsSelected')}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('deleteSelected')}</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-100 cursor-pointer"
            >
              {t('clearSelection')}
            </button>
          </div>
        </div>
      )}

      {/* Table Container */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center text-slate-500 space-y-3">
          <Layers className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <p className="text-sm font-medium">{t('noAssetFound')}</p>
          <button
            onClick={onOpenAddAsset}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-500 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNewAsset')}</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-slate-800/30">
                <th className="py-3 px-3 w-8">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    {selectedIds.length === filteredItems.length && filteredItems.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3 cursor-pointer select-none" onClick={() => handleSort('code')}>
                  <div className="flex items-center gap-1">
                    <span>{t('assetCode')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 cursor-pointer select-none" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">
                    <span>{t('assetName')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer select-none" onClick={() => handleSort('cost')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>{t('totalCost')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer select-none" onClick={() => handleSort('val')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>{t('currentValue')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer select-none" onClick={() => handleSort('pl')}>
                  <div className="flex items-center justify-end gap-1">
                    <span>{t('netProfitLoss')}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">{t('status')}</th>
                <th className="py-3 px-3 text-center">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredItems.map((item, idx) => {
                const totalCost = item.amount * item.avgBuyPriceTRY;
                const totalVal = item.amount * item.currentPriceTRY;
                const plTRY = totalVal - totalCost;
                const plPct = totalCost > 0 ? (plTRY / totalCost) * 100 : 0;
                const isProfit = plTRY >= 0;
                const isSelected = selectedIds.includes(item.id);

                let statusBadge = (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {t('fullProfit')}
                  </span>
                );
                if (plPct < 0) {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      {t('falling')}
                    </span>
                  );
                } else if (plPct < 5) {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {t('balanced')}
                    </span>
                  );
                }

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group ${
                      isSelected ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-3">
                      <button onClick={() => toggleSelectRow(item.id)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Code Column */}
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                      {item.code}
                    </td>

                    {/* Name Column with Avatar Initials */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-7 h-7 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 ${getAssetAvatarColor(
                            idx
                          )}`}
                        >
                          {getAssetInitials(item.code, item.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white text-xs truncate">
                              {translateAssetName(item.name)}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">
                            {item.amount.toLocaleString(isTR ? 'tr-TR' : 'en-US')} {item.type === 'PRECIOUS_METAL' ? t('grams') : t('pieces')}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total Cost */}
                    <td className="py-3.5 px-3 text-right text-slate-600 dark:text-slate-400 font-bold">
                      ₺{totalCost.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}
                    </td>

                    {/* Current Value */}
                    <td className="py-3.5 px-3 text-right font-black text-slate-900 dark:text-white">
                      ₺{totalVal.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })}
                    </td>

                    {/* Net Profit & Loss */}
                    <td className="py-3.5 px-3 text-right font-bold">
                      <span
                        className={`inline-flex items-center gap-0.5 ${
                          isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isProfit ? '+' : ''}₺{plTRY.toLocaleString(isTR ? 'tr-TR' : 'en-US', { maximumFractionDigits: 0 })} ({plPct.toFixed(1)}%)
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center">{statusBadge}</td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {item.type === 'TEFAS' && (
                          <button
                            onClick={() => onSelectFund(item.code)}
                            className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title={isTR ? "Detay Grafiği" : "Detail Chart"}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => onRemoveAsset(item.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title={isTR ? "Varlığı Sil" : "Delete Asset"}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">{t('advancedFilter')}</h3>
              </div>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <label className="block text-slate-700 dark:text-slate-300">{t('filterByProfit')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ALL', label: t('allAssets') },
                  { id: 'PROFIT', label: t('onlyProfit') },
                  { id: 'LOSS', label: t('onlyLoss') },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setProfitStatusFilter(st.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      profitStatusFilter === st.id
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {t('apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
