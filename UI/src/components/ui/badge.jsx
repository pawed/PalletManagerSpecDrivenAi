import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold font-mono before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current',
  {
    variants: {
      variant: {
        todo:        'bg-status-todo-bg text-status-todo',
        'in-progress':'bg-status-progress-bg text-status-progress',
        done:        'bg-status-done-bg text-status-done',
        cancelled:   'bg-status-cancelled-bg text-status-cancelled line-through opacity-80',
        default:     'bg-secondary text-secondary-foreground',
        brand:       'bg-brand-soft text-brand-text',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
