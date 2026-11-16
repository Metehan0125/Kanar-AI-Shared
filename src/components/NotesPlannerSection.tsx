import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { InvestmentNote } from '../types';
import { NotebookPen, Plus, Trash2, Tag, Calendar, Check } from 'lucide-react';

export const NotesPlannerSection: React.FC = () => {
  const { t, isTR } = useLanguage();
  const [notes, setNotes] = useState<InvestmentNote[]>(() => {
    try {
      const saved = localStorage.getItem('tefas_portfolio_notes');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'note-1',
              title: isTR ? '2026 Q3 Portföy Rebalans Hedefi' : '2026 Q3 Portfolio Rebalance Goal',
              content: isTR
                ? 'TEFAS fonlarındaki hisse oranını %45 seviyesinde tutup, kıymetli madenler (Gram Altın) oranını %25 seviyesine çıkarma kararı alındı.'
                : 'Decided to keep equity fund allocation at 45% and increase precious metals (Gram Gold) to 25%.',
              date: '2026-07-20',
              category: isTR ? 'Hedef' : 'Target',
              tags: isTR ? ['Rebalans', 'TEFAS', 'Altın'] : ['Rebalance', 'TEFAS', 'Gold'],
            },
            {
              id: 'note-2',
              title: isTR ? 'AAV & TCD Fon Karşılaştırma Notu' : 'AAV & TCD Fund Comparison Note',
              content: isTR
                ? 'AAV değişken fonunun oynaklığı TCD hisse fonuna göre daha düşük. Piyasa düşüşlerinde AAV koruyucu tampon işlevi görüyor.'
                : 'AAV variable fund volatility is lower compared to TCD equity fund. AAV acts as a protective buffer during market dips.',
              date: '2026-07-22',
              category: isTR ? 'Araştırma' : 'Research',
              tags: ['AAV', 'TCD', 'Risk'],
            },
          ];
    } catch {
      return [];
    }
  });

  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('Strateji');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tefas_portfolio_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !(title || '').trim() || !content || !(content || '').trim()) return;

    const tags = (tagInput || '')
      .split(',')
      .map((t) => (t || '').trim())
      .filter((t) => t.length > 0);

    const newNote: InvestmentNote = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      category,
      tags: tags.length > 0 ? tags : [category],
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setTagInput('');
    setShowAddModal(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const filteredNotes = notes.filter((n) => {
    if (selectedCat === 'ALL' || selectedCat === 'Tümü') return true;
    if (n.category === selectedCat) return true;
    if (selectedCat === 'Strateji' && (n.category === 'Strategy' || n.category === 'Strateji')) return true;
    if (selectedCat === 'Hedef' && (n.category === 'Target' || n.category === 'Hedef')) return true;
    if (selectedCat === 'Araştırma' && (n.category === 'Research' || n.category === 'Araştırma')) return true;
    if (selectedCat === 'Anımsatıcı' && (n.category === 'Reminder' || n.category === 'Anımsatıcı')) return true;
    return false;
  });

  const categories = [
    { key: 'ALL', label: t('all') },
    { key: 'Strateji', label: t('strategy') },
    { key: 'Hedef', label: t('target') },
    { key: 'Araştırma', label: t('research') },
    { key: 'Anımsatıcı', label: t('reminder') },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-start sm:items-center space-x-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-black shrink-0">
            <NotebookPen className="w-5 h-5 shrink-0" />
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
              {t('notesTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('notesDesc')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCat === cat.key
                    ? 'bg-lime-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>{t('addNote')}</span>
          </button>
        </div>
      </div>

      {/* Add Note Form Card */}
      {showAddModal && (
        <form
          onSubmit={handleAddNote}
          className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h4 className="font-black text-sm text-slate-900 dark:text-white">{t('createNote')}</h4>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {t('close')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('noteTitle')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isTR ? "Örn: BIST 100 Düzeltme Stratejisi" : "e.g., BIST 100 Adjustment Strategy"}
                className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-lime-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('noteCategory')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-lime-500 outline-none"
              >
                <option value="Strateji">{t('strategy')}</option>
                <option value="Hedef">{t('target')}</option>
                <option value="Araştırma">{t('research')}</option>
                <option value="Anımsatıcı">{t('reminder')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('noteContent')}</label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isTR ? "Yatırım kararınızı ve gözlemlerinizi buraya yazın..." : "Write your investment decisions and observations here..."}
              className="w-full p-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-lime-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              {t('tags')}
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder={isTR ? "Örn: Portföy, Altın, Rebalans" : "e.g., Portfolio, Gold, Rebalance"}
              className="w-full p-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-4 h-4" /> {t('saveNote')}
            </button>
          </div>
        </form>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 py-10 text-center text-slate-400 text-xs font-bold">
            {t('noNotes')}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-3 relative group flex flex-col justify-between hover:border-lime-500/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-lime-500/10 text-lime-800 dark:text-lime-300 border border-lime-500/20">
                    {note.category === 'Strateji' ? t('strategy') : note.category === 'Hedef' ? t('target') : note.category === 'Araştırma' ? t('research') : note.category === 'Anımsatıcı' ? t('reminder') : note.category}
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {note.date}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title={isTR ? "Notu Sil" : "Delete Note"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-black text-sm text-slate-900 dark:text-white tracking-tight">{note.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {note.content}
                </p>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800/60 px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

