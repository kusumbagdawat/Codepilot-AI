import { Button } from '@/components/Button';
import { Menu, Search, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-base-primary/80 px-4 backdrop-blur-xl md:px-6">
      <button className="text-white/70 lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
      <div className="relative hidden flex-1 md:block md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          placeholder="Search tools..."
          className="w-full rounded-xl border border-border bg-base-card/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-brand-primary/60 focus:shadow-glow-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-white/70 transition hover:border-brand-primary/60 hover:text-brand-primary"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-sm font-semibold text-[#04140D]">
          DV
        </div>
      </div>
    </header>
  );
}
