import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-primary text-primary-foreground hover:opacity-85',
        outline:   'border border-border bg-card text-muted-foreground hover:border-[oklch(0.84_0.01_80)] hover:bg-secondary hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:     'hover:bg-secondary hover:text-foreground text-muted-foreground',
        link:      'text-brand underline-offset-4 hover:underline',
        brand:     'bg-brand text-white hover:opacity-90',
      },
      size: {
        default: 'h-8 px-3',
        sm:      'h-7 px-2.5 text-[11.5px]',
        lg:      'h-10 px-4 text-sm',
        icon:    'h-8 w-8 p-0',
      },
    },
    defaultVariants: { variant: 'outline', size: 'default' },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
