'use client';

import { PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className, size = 32 }: { className?: string, size?: number }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <PenLine style={{ width: size * 0.6, height: size * 0.6 }} />
        </div>
        <span className="text-2xl font-bold tracking-tight" style={{ fontSize: size * 0.8 }}>
            PoetryPad
        </span>
    </div>
  );
};