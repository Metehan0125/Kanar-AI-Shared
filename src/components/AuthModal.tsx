import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (userData: { name: string; email: string }) => void;
  lang: 'TR' | 'EN';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  lang,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccessLogin({
        name: name || (email ? email.split('@')[0] : 'Yatırımcı'),
        email: email || 'yatirimci@kanar.ai',
      });
      onClose();
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccessLogin({
        name: 'Demo Yatırımcı',
        email: 'demo@kanar.ai',
      });
      onClose();
    }, 400);
  };

  const isTR = lang === 'TR';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative text-slate-900 dark:text-white">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> TEFAS AI Auth
            </span>
          </div>

          <h2 className="text-2xl font-black text-white">
            {mode === 'signin'
              ? isTR
                ? 'Giriş Yap'
                : 'Sign In'
              : isTR
              ? 'Hesap Oluştur'
              : 'Create Account'}
          </h2>
          <p className="text-xs text-indigo-200/90 mt-1">
            {isTR
              ? 'TEFAS Fon Analitiği ve AI Stres Testi Panosuna Erişin.'
              : 'Access TEFAS Fund Analytics & AI Stress Test Dashboard.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-1.5">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isTR ? 'Giriş Yap' : 'Sign In'}
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isTR ? 'Kayıt Ol (Sign Up)' : 'Sign Up'}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isTR ? 'Ad Soyad' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isTR ? 'Örn: Ahmet Yılmaz' : 'e.g. John Doe'}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isTR ? 'E-posta Adresi' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@tefas.ai"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isTR ? 'Şifre' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-fuchsia-600 hover:opacity-95 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>{isTR ? 'Giriş Yapılıyor...' : 'Signing in...'}</span>
            ) : (
              <>
                <span>
                  {mode === 'signin'
                    ? isTR
                      ? 'Dashboard\'a Giriş Yap'
                      : 'Sign In to Dashboard'
                    : isTR
                    ? 'Hesap Oluştur ve Başla'
                    : 'Create Account & Start'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isTR ? 'veya Hızlı Demo' : 'or Quick Demo'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>{isTR ? 'Tek Tıkla Demo Hesabı İle Gir' : '1-Click Demo Login'}</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-center">
          <span className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {isTR
              ? '256-bit Güvenli TEFAS AI Bağlantısı'
              : '256-bit Secure TEFAS AI Connection'}
          </span>
        </div>
      </div>
    </div>
  );
};
