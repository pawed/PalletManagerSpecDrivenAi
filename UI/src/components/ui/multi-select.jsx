import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Checkbox } from './checkbox';
import { cn } from '../../lib/utils';

/**
 * Reusable multiselect built on shadcn Popover + Checkbox.
 * options: { value: string, label: string }[]
 * selected: string[]
 * onChange: (selected: string[]) => void
 */
export function MultiSelect({ options, selected, onChange, placeholder, className }) {
  const toggle = (val) =>
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);

  const label =
    selected.length === 0 ? placeholder
    : selected.length === 1 ? (options.find(o => o.value === selected[0])?.label ?? selected[0])
    : `${selected.length} wybrano`;

  const active = selected.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[12.5px] font-medium transition-colors whitespace-nowrap',
            active
              ? 'border-ring bg-accent text-accent-foreground'
              : 'border-border bg-card text-muted-foreground hover:border-[oklch(0.84_0.01_80)] hover:text-foreground',
            className
          )}
        >
          <span>{label}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1">
        <div className="flex flex-col">
          {options.map(opt => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 rounded px-2.5 py-1.5 text-[12.5px] text-foreground hover:bg-secondary transition-colors select-none"
            >
              <Checkbox
                checked={selected.includes(opt.value)}
                onCheckedChange={() => toggle(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
          {active && (
            <>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={() => onChange([])}
                className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" /> Wyczyść
              </button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
