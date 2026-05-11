import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Checkbox } from './checkbox';
import { cn } from '../../lib/utils';

/**
 * Reusable multiselect built on shadcn Popover + Checkbox.
 * options:     { value: string, label: string }[]
 * selected:    string[]
 * onChange:    (selected: string[]) => void
 * tags?:       boolean — show selected items as removable pill tags
 */
export function MultiSelect({ options, selected, onChange, placeholder, className, tags }) {
  const toggle = (val) =>
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);

  const remove = (val, e) => { e.stopPropagation(); onChange(selected.filter(v => v !== val)); };

  const active = selected.length > 0;
  const showTags = tags && active;

  const label =
    selected.length === 0 ? placeholder
    : selected.length === 1 ? (options.find(o => o.value === selected[0])?.label ?? selected[0])
    : `${selected.length} wybrano`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 text-[12.5px] font-medium transition-colors',
            showTags ? 'flex-wrap py-1.5' : 'h-8 whitespace-nowrap',
            active && !showTags
              ? 'border-ring bg-accent text-accent-foreground'
              : 'border-border bg-card text-muted-foreground hover:border-[oklch(0.84_0.01_80)] hover:text-foreground',
            className
          )}
        >
          {showTags ? (
            <>
              <span className="flex flex-wrap gap-1">
                {selected.map(val => {
                  const opt = options.find(o => o.value === val);
                  return (
                    <span
                      key={val}
                      className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[11.5px] font-medium"
                      onClick={e => e.stopPropagation()}
                    >
                      {opt?.label ?? val}
                      <button
                        type="button"
                        onClick={e => remove(val, e)}
                        className="hover:opacity-70 leading-none"
                        aria-label={`Usuń ${val}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-auto shrink-0" />
            </>
          ) : (
            <>
              <span>{label}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </>
          )}
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
