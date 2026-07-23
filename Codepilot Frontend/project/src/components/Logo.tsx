import { cn } from '@/lib/utils';

export function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark shadow-glow"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#04140D"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 9-3 3 3 3" />
          <path d="m16 9 3 3-3 3" />
          <path d="m13 6-2 12" />
        </svg>
      </div>
      <span className="text-lg font-semibold tracking-tight text-white">
        CodePilot <span className="text-gradient">AI</span>
      </span>
    </div>
  );
}
