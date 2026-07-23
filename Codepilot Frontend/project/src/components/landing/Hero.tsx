import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-36 pb-24">
      {/* Abstract green glowing graphics */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-brand-dark/20 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute top-20 -right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px] animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-brand-primary/5 px-4 py-1.5 text-xs text-brand-primary animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by Gemini · Built for developers
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-up">
          CodePilot <span className="text-gradient">AI</span>
        </h1>
        <p className="mt-5 text-xl font-medium text-white/80 sm:text-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Your AI Powered Developer Assistant
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 animate-fade-up" style={{ animationDelay: '0.18s' }}>
          Review code, detect bugs, generate SQL queries, write professional emails, create documentation
          and chat with AI using Gemini.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '0.26s' }}>
          <Link to="/app">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg">Explore Features</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
