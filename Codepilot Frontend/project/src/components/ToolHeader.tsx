import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export function ToolHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link
          to="/app"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-white/70 transition hover:border-brand-primary/60 hover:text-brand-primary"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
      </div>
      {action}
    </div>
  );
}
