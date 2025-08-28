import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80',
      secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
      destructive: 'border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80',
      outline: 'text-gray-950 border-gray-200',
      success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
      warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

