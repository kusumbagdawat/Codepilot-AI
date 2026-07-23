import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  const variants = {
    primary: 'btn-glow rounded-2xl',
    ghost: 'rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition',
    outline:
      'rounded-2xl border border-border bg-transparent text-white hover:border-brand-primary/60 hover:shadow-glow-sm transition',
  };
  return (
    <button className={cn('inline-flex items-center justify-center gap-2 font-medium', sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
