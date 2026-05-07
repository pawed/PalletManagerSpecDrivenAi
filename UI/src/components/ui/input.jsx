import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'h-8 w-full rounded-md border border-border bg-card px-3 text-[12.5px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
