import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { TOOLS } from '@/lib/data';
import {
  MessageSquare,
  ScanEye,
  Bug,
  Database,
  Mail,
  FileText,
  ArrowRight,
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

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Welcome back, Developer</h1>
        <p className="mt-2 text-white/55">Choose a tool below to start building with CodePilot AI.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => {
          const Icon = ICONS[tool.icon];
          return (
            <Card key={tool.id} className={`flex flex-col bg-gradient-to-br ${tool.accent}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{tool.description}</p>
              <Link to={tool.path} className="mt-5">
                <span className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm group">
                  Open Tool
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
