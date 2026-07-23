import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Github, Mail, Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-base-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-brand-primary">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="#contact" className="flex items-center gap-2 transition hover:text-brand-primary">
              <Mail className="h-4 w-4" /> Contact
            </a>
            <a href="#about" className="flex items-center gap-2 transition hover:text-brand-primary">
              <Info className="h-4 w-4" /> About
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} CodePilot AI. Crafted for developers.
        </div>
      </div>
    </footer>
  );
}
