import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, TrendingUp, X } from 'lucide-react';
import { TefasFundBasic } from '../types';
import { useLanguage } from '../LanguageContext';

interface FundSearchBarProps {
  currentFundCode?: string;
  currentCode?: string;
  onSearch?: (fundCode: string) => void;
  onSelectFund?: (fundCode: string) => void;
  isLoading?: boolean;
}

const POPULAR_BADGES_TR = [
  { code: 'AAV', label: 'AAV (Atlas Değişken)' },
  { code: 'TCD', label: 'TCD (Tacirler Değişken)' },
  { code: 'YAS', label: 'YAS (Koç İştirakleri)' },
  { code: 'MAC', label: 'MAC (Marmara Cap.)' },
  { code: 'TTE', label: 'TTE (İş Teknoloji)' },
  { code: 'AFT', label: 'AFT (Ak Yabancı Tech)' },
  { code: 'GTA', label: 'GTA (Garanti Altın)' },
  { code: 'IPJ', label: 'IPJ (Elektrikli Araç)' },
];

const POPULAR_BADGES_EN = [
  { code: 'AAV', label: 'AAV (Atlas Variable)' },
  { code: 'TCD', label: 'TCD (Tacirler Variable)' },
  { code: 'YAS', label: 'YAS (Koc Affiliates)' },
  { code: 'MAC', label: 'MAC (Marmara Cap.)' },
  { code: 'TTE', label: 'TTE (Is Tech)' },
  { code: 'AFT', label: 'AFT (Ak Foreign Tech)' },
  { code: 'GTA', label: 'GTA (Garanti Gold)' },
  { code: 'IPJ', label: 'IPJ (EV Vehicles)' },
];

export const FundSearchBar: React.FC<FundSearchBarProps> = ({
  currentFundCode,
  currentCode,
  onSearch,
  onSelectFund,
  isLoading = false,
}) => {
  const { isTR } = useLanguage();
  const activeCode = currentFundCode || currentCode || '';
  const [query, setQuery] = useState(activeCode);
  const [suggestions, setSuggestions] = useState<TefasFundBasic[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleTriggerSearch = (code: string) => {
    if (onSearch) onSearch(code);
    if (onSelectFund) onSelectFund(code);
  };

  // Sync input text with current fund code, BUT DO NOT OPEN DROPDOWN
  useEffect(() => {
    setQuery(activeCode);
    setIsOpen(false);
  }, [activeCode]);

  // Handle user typing specifically
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value || '';
    setQuery(val);

    if (val.trim().length >= 1) {
      fetch(`/api/tefas/search?q=${encodeURIComponent(val.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data || []);
          setIsOpen(true);
        })
        .catch(() => {
          setSuggestions([]);
          setIsOpen(false);
        });
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = (query || '').trim();
    if (trimmed) {
      handleTriggerSearch(trimmed.toUpperCase());
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (code: string) => {
    const safeCode = code || '';
    setQuery(safeCode);
    handleTriggerSearch(safeCode);
    setIsOpen(false);
  };

  const popularBadges = isTR ? POPULAR_BADGES_TR : POPULAR_BADGES_EN;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3" ref={wrapperRef}>
      {/* Search Bar Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if ((query || '').trim().length >= 1 && suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder={
              isTR
                ? 'Fon Kodu (ör: AAV, TCD, YAS) veya Fon İsmi Girin...'
                : 'Enter Fund Code (e.g. AAV, TCD, YAS) or Fund Name...'
            }
            className="w-full pl-11 pr-10 py-3 text-base rounded-xl border transition-all outline-none shadow-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !(query || '').trim()}
          className="ml-3 px-6 py-3.5 text-base font-semibold rounded-xl text-white transition-all shadow-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-indigo-500/20 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{isTR ? 'Ara' : 'Search'}</span>
              <Sparkles className="w-4 h-4 opacity-80" />
            </>
          )}
        </button>

        {/* Suggestion Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <div className="p-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-950/50 px-3">
              {isTR ? 'Sonuçlar' : 'Results'} ({suggestions.length})
            </div>
            <div className="max-h-72 overflow-y-auto">
              {suggestions.map((fund) => (
                <button
                  key={fund.code}
                  type="button"
                  onClick={() => handleSelectSuggestion(fund.code)}
                  className="w-full text-left px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-sm bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/50 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {fund.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                        {fund.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {fund.category} • {fund.founder}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {isTR ? 'Risk' : 'Risk'}: {fund.riskLevel}/7
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Popular Fund Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" /> {isTR ? 'Popüler Fonlar:' : 'Popular Funds:'}
        </span>
        {popularBadges.map((badge) => (
          <button
            key={badge.code}
            type="button"
            onClick={() => handleSelectSuggestion(badge.code)}
            className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap border cursor-pointer ${
              currentFundCode === badge.code
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-slate-700'
            }`}
          >
            {badge.label}
          </button>
        ))}
      </div>
    </div>
  );
};
