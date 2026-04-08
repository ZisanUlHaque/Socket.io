import { useEffect } from 'react';

const AUTO_CLOSE = 5000; // 5s

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(onClose, AUTO_CLOSE);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config =
    {
      success: {
        bg: 'bg-emerald-500',
        border: 'border-emerald-300',
        icon: '✓',
        title: 'Success',
      },
      error: {
        bg: 'bg-rose-500',
        border: 'border-rose-300',
        icon: '✕',
        title: 'Error',
      },
      info: {
        bg: 'bg-sky-500',
        border: 'border-sky-300',
        icon: 'ℹ',
        title: 'Info',
      },
      warning: {
        bg: 'bg-amber-500',
        border: 'border-amber-300',
        icon: '⚠',
        title: 'Warning',
      },
    }[type] || {
      bg: 'bg-slate-700',
      border: 'border-slate-500',
      icon: 'ℹ',
      title: 'Notice',
    };

  return (
    <div
      className={`fixed top-6 right-4 z-50 max-w-sm rounded-2xl border ${config.border} ${config.bg} text-white shadow-2xl shadow-slate-900/40 transform transition-all duration-200 animate-slide-in hover:scale-[1.02]`}
      onClick={onClose}
      role="status"
      aria-live="polite"
    >
      <div className="relative px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-lg">
            {config.icon}
          </div>

          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
              {config.title}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-2 text-lg leading-none text-white/80 hover:text-white"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>

        {/* progress bar */}
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/15">
          <div className="h-full w-full origin-left bg-white/80 animate-notification-progress" />
        </div>
      </div>
    </div>
  );
};

export default Notification;