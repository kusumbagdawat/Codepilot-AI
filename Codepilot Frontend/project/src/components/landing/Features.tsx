import { Card } from '@/components/Card';
import { TOOLS } from '@/lib/data';
import {
  MessageSquare,
  ScanEye,
  Bug,
  Database,
  Mail,
  FileText,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  ScanEye,
  Bug,
  Database,
  Mail,
  FileText,
};

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need, in one place</h2>
          <p className="mt-4 text-white/55">
            Six powerful AI tools designed to supercharge your development workflow.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => {
            const Icon = ICONS[tool.icon];
            return (
              <Card key={tool.id} className={`animate-fade-up bg-gradient-to-br ${tool.accent}`} >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{tool.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
