import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle2, Sparkles, TrendingUp, ShieldAlert, X, RefreshCw } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'ai' | 'market' | 'warning' | 'success';
  read: boolean;
}

interface NotificationBellProps {
  isTR?: boolean;
  variant?: 'default' | 'minimal';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'AI Portföy Önerisi',
    message: 'TEFAS fonları ve altın oranınız Sharpe değerinizi (1.84) zirvede tutuyor.',
    time: '2 dk önce',
    type: 'ai',
    read: false,
  },
  {
    id: '2',
    title: 'BIST 100 Rekor Seviyede',
    message: 'BIST 100 endeksi günü %1.24 artışla 10,842 puandan tamamladı.',
    time: '15 dk önce',
    type: 'market',
    read: false,
  },
  {
    id: '3',
    title: 'Stres Testi Uyarısı',
    message: 'Fed faiz kararı senaryosunda teknoloji fonları %12 hassasiyete sahip.',
    time: '1 saat önce',
    type: 'warning',
    read: false,
  },
  {
    id: '4',
    title: 'Otomatik Rebalans Hazır',
    message: 'Para piyasası fon likiditesi ile %5 risk dengelemesi öneriliyor.',
    time: '3 saat önce',
    type: 'success',
    read: true,
  },
];

export const NotificationBell: React.FC<NotificationBellProps> = ({ isTR = true, variant = 'default' }) => {
  const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
      id: '1',
      title: isTR ? 'AI Portföy Önerisi' : 'AI Portfolio Insight',
      message: isTR
        ? 'TEFAS fonları ve altın oranınız Sharpe değerinizi (1.84) zirvede tutuyor.'
        : 'TEFAS funds and gold allocation keep your Sharpe ratio (1.84) optimized.',
      time: isTR ? '2 dk önce' : '2m ago',
      type: 'ai',
      read: false,
    },
    {
      id: '2',
      title: isTR ? 'BIST 100 Rekor Seviyede' : 'BIST 100 Index Peak',
      message: isTR
        ? 'BIST 100 endeksi günü %1.24 artışla 10,842 puandan tamamladı.'
        : 'BIST 100 closed up +1.24% at 10,842 points today.',
      time: isTR ? '15 dk önce' : '15m ago',
      type: 'market',
      read: false,
    },
    {
      id: '3',
      title: isTR ? 'Stres Testi Uyarısı' : 'Stress Test Alert',
      message: isTR
        ? 'Fed faiz kararı senaryosunda teknoloji fonları %12 hassasiyete sahip.'
        : 'Tech funds show 12% sensitivity in Fed rate hike scenario.',
      time: isTR ? '1 saat önce' : '1h ago',
      type: 'warning',
      read: false,
    },
    {
      id: '4',
      title: isTR ? 'Otomatik Rebalans Hazır' : 'Auto-Rebalance Ready',
      message: isTR
        ? 'Para piyasası fon likiditesi ile %5 risk dengelemesi öneriliyor.'
        : 'A 5% risk hedge with money market liquidity is recommended.',
      time: isTR ? '3 saat önce' : '3h ago',
      type: 'success',
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const [showSpark, setShowSpark] = useState(false);

  // Trigger bell ring animation strictly when the mallet strikes the bell!
  const triggerRing = () => {
    // Mallet swings down and hits the bell at t=200ms
    setTimeout(() => {
      setIsRinging(true);
      setShowSpark(true);
      setTimeout(() => setShowSpark(false), 350);
    }, 200);

    setTimeout(() => {
      setIsRinging(false);
    }, 1200);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerRing();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Simulate new incoming notification
  const handleSimulateNewNotification = () => {
    const samples = [
      {
        title: 'AAV Fonu Güncellendi',
        message: 'Ata Portföy fonunda günlük %2.10 pozitif getiri sağlandı.',
        type: 'success' as const,
      },
      {
        title: 'TCMB Faiz Açıklaması',
        message: 'Merkez Bankası kararı sonrası döviz fonlarında %0.4 dalgalanma yaşandı.',
        type: 'market' as const,
      },
      {
        title: 'Yapay Zeka Portföy Taraması',
        message: 'Kıymetli madenler fon sepetinize ilave %5 koruma kalkanı eklendi.',
        type: 'ai' as const,
      },
    ];

    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title: randomSample.title,
      message: randomSample.message,
      time: 'Şimdi',
      type: randomSample.type,
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    triggerRing();
  };

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Toggle single item read status
  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // Bell ring variant animation
  const bellVariants = {
    ring: {
      rotate: [0, -25, 25, -20, 20, -10, 10, -5, 5, 0],
      scale: [1, 1.15, 1.15, 1.1, 1.1, 1.05, 1],
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    idle: {
      rotate: 0,
      scale: 1,
    },
  };

  return (
    <div className="relative inline-block">
      {/* Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          triggerRing();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          variant === 'minimal'
            ? 'relative h-8 w-8 rounded-full text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center focus:outline-none overflow-visible'
            : 'relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs group focus:outline-none overflow-visible'
        }
        title={isTR ? 'Piyasa & AI Bildirimleri' : 'Notifications'}
      >
        {/* Ring ripple effect when triggered */}
        {isRinging && (
          <span className="absolute inset-0 rounded-xl bg-lime-500/20 animate-ping pointer-events-none" />
        )}

        {/* Hand + Mallet Striking Animation from Right on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: 35, y: -10, rotate: 35, opacity: 0, scale: 0.8 }}
              animate={{
                x: [35, 5, 2],
                y: [-10, -2, 0],
                rotate: [35, -30, -5],
                opacity: [0, 1, 1],
                scale: [0.8, 1.1, 1],
              }}
              exit={{ x: 35, opacity: 0, rotate: 25 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute -right-7 -top-4 pointer-events-none z-30 drop-shadow-md"
            >
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                {/* Arm & Hand */}
                <path d="M 38 30 L 26 22 C 24 20 20 22 22 25 L 28 32 Z" fill="#fca5a5" stroke="#f87171" strokeWidth="1" />
                {/* Sleeve / Cuff */}
                <path d="M 38 32 L 32 25 L 36 21 L 40 28 Z" fill="#3b82f6" />
                {/* Wooden Mallet Handle */}
                <path d="M 23 23 L 9 10" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                {/* Mallet Head */}
                <rect x="2" y="4" width="13" height="10" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1.5" transform="rotate(-25 8 9)" />
                {/* Metallic Caps on Mallet */}
                <rect x="1" y="5" width="3" height="8" rx="1" fill="#f59e0b" transform="rotate(-25 8 9)" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Motion animated bell icon */}
        <motion.div
          animate={isRinging ? 'ring' : 'idle'}
          variants={bellVariants}
          className="relative flex items-center justify-center"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 dark:text-slate-100 group-hover:text-lime-500 transition-colors" />
        </motion.div>

        {/* Animated Badge Count */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-lime-500 text-slate-950 font-black text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs border border-white dark:border-slate-900"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Popover Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click outside listener */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Notification Popover Box */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 mt-3 w-80 sm:w-96 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-slate-900 dark:text-white tracking-tight">
                      {isTR ? 'Canlı TEFAS & AI Bildirimleri' : 'Live Notifications'}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {unreadCount > 0
                        ? `${unreadCount} ${isTR ? 'okunmamış bildirim var' : 'unread notifications'}`
                        : isTR ? 'Tüm bildirimler okundu' : 'All caught up'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Controls Bar */}
              <div className="px-4 py-2 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-bold">
                <button
                  onClick={handleSimulateNewNotification}
                  className="text-lime-700 dark:text-lime-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{isTR ? 'Simüle Et (Bildirim Zili Sallansın)' : 'Simulate Ring'}</span>
                </button>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {isTR ? 'Tümünü Okundu İşaretle' : 'Mark All Read'}
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 font-bold">
                    {isTR ? 'Bildirim bulunmuyor' : 'No notifications'}
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const getIcon = () => {
                      switch (notif.type) {
                        case 'ai':
                          return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
                        case 'market':
                          return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
                        case 'warning':
                          return <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />;
                        case 'success':
                          return <CheckCircle2 className="w-3.5 h-3.5 text-lime-500" />;
                      }
                    };

                    return (
                      <div
                        key={notif.id}
                        onClick={() => handleToggleRead(notif.id)}
                        className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                          !notif.read
                            ? 'bg-lime-500/5 dark:bg-lime-500/10 hover:bg-lime-500/10'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 opacity-75'
                        }`}
                      >
                        <div className="mt-0.5 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                          {getIcon()}
                        </div>

                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                              {notif.title}
                            </h5>
                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                              {notif.time}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug font-medium line-clamp-2">
                            {notif.message}
                          </p>
                        </div>

                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-lime-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] font-bold text-slate-500">
                ⚡ {isTR ? 'KanarAI Gerçek Zamanlı TEFAS Sinyalleri' : 'KanarAI Real-Time TEFAS Signals'}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
