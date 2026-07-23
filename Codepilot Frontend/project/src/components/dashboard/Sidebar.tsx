import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  MessageSquare,
  ScanEye,
  Bug,
  Database,
  Mail,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';

const NAV: { label: string; path: string; icon: LucideIcon }[] = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { label: 'AI Chat', path: '/app/chat', icon: MessageSquare },
  { label: 'Code Review', path: '/app/review', icon: ScanEye },
  { label: 'Bug Finder', path: '/app/bugs', icon: Bug },
  { label: 'SQL Generator', path: '/app/sql', icon: Database },
  { label: 'Email Generator', path: '/app/email', icon: Mail },
  { label: 'Documentation', path: '/app/docs', icon: FileText },
  { label: 'Settings', path: '/app/settings', icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-border bg-base-secondary/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link to="/app">
            <Logo size={26} />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {NAV.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                  active
                    ? 'bg-brand-primary/10 text-brand-primary shadow-glow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                )}
              >
                <item.icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <div className="rounded-xl border border-border bg-brand-primary/5 p-3">
            <p className="text-xs text-white/50">Pro tip</p>
            <p className="mt-1 text-sm text-white/80">Use the mic in AI Chat for hands-free prompts.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
