import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

export function Button({ children, href, variant = 'primary', className }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200',
    variant === 'primary' && 'bg-brand-green text-brand-navy shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-400',
    variant === 'secondary' && 'bg-white text-brand-navy ring-1 ring-slate-200 hover:bg-slate-100',
    variant === 'ghost' && 'bg-transparent text-brand-navy hover:bg-slate-100',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
