import { useToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft animate-slide-in',
            'min-w-[260px] max-w-sm',
          )}
        >
          {t.type === 'success' && <CheckCircle2 className="h-5 w-5 text-brand-primary" />}
          {t.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
          {t.type === 'info' && <Info className="h-5 w-5 text-brand-primary" />}
          <span className="flex-1 text-sm text-white/90">{t.message}</span>
          <button onClick={() => dismiss(t.id)} className="text-white/40 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
