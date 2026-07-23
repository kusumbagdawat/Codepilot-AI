import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 shadow-soft',
        hover && 'glow-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
