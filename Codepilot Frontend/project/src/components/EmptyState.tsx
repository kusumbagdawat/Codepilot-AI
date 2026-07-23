import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function EmptyState({ icon, title, description, className }: { icon: ReactNode; title: string; description?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-14 text-center', className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-brand-primary/5 text-brand-primary/70">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description && <p className="max-w-sm text-sm text-white/50">{description}</p>}
    </div>
  );
}
