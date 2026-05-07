import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Coins, Package, Sun, Moon, Printer, Plus } from 'lucide-react';
import { I18N } from '../data/i18n';
import { daysToFestival } from '../data/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

const NAV_ICONS = {
  "/overview":  Home,
  "/tasks":     CheckSquare,
  "/costs":     Coins,
  "/warehouse": Package,
};

export const Sidebar = ({ lang, counts }) => {
  const t    = I18N[lang];
  const days = daysToFestival();

  const items = [
    { to: "/overview",  label: t.navOverview  },
    { to: "/tasks",     label: t.navTasks,     count: counts.tasks },
    { to: "/costs",     label: t.navCosts,     count: counts.costs },
    { to: "/warehouse", label: t.navWarehouse, count: counts.warehouse },
  ];

  return (
    <aside className="bg-card border-r border-border flex flex-col gap-1 px-3.5 py-5 sticky top-0 h-screen overflow-y-auto">
      <div className="flex items-center gap-2.5 px-2.5 pb-5 mb-3.5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-foreground text-background grid place-items-center text-[13px] font-bold font-mono shrink-0">
          P
        </div>
        <div>
          <div className="text-[14px] font-semibold tracking-tight leading-tight">{t.appTitle}</div>
          <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{t.appSub}</div>
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 py-2">
        {t.sections}
      </p>

      {items.map(({ to, label, count }) => {
        const Icon = NAV_ICONS[to];
        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground font-semibold'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
            {count != null && (
              <span className="ml-auto font-mono text-[11px] opacity-60">{count}</span>
            )}
          </NavLink>
        );
      })}

      <div className="mt-auto pt-3.5 border-t border-border flex flex-col gap-1.5">
        <div className="bg-secondary rounded-md px-3 py-2.5 mb-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            {t.daysToFestival}
          </p>
          <p className="font-mono text-[22px] font-semibold tracking-tight mt-0.5">{days}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{t.festivalDate}</p>
        </div>
      </div>
    </aside>
  );
};

export const Topbar = ({ title, sub, lang, setLang, dark, setDark, onPrint, onAdd }) => {
  const t = I18N[lang];

  return (
    <div className="h-14 border-b border-border bg-card flex items-center px-7 gap-4 sticky top-0 z-10">
      <div>
        <p className="text-[15px] font-semibold tracking-tight">{title}</p>
        {sub && <p className="text-[12px] text-muted-foreground font-mono">{sub}</p>}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="inline-flex border border-border rounded-md overflow-hidden font-mono text-[11px]">
          <button
            className={cn('px-2.5 h-[30px] font-semibold transition-colors', lang === "pl" ? 'bg-foreground text-background' : 'bg-card text-muted-foreground hover:bg-secondary')}
            onClick={() => setLang("pl")}
          >PL</button>
          <button
            className={cn('px-2.5 h-[30px] font-semibold transition-colors', lang === "en" ? 'bg-foreground text-background' : 'bg-card text-muted-foreground hover:bg-secondary')}
            onClick={() => setLang("en")}
          >EN</button>
        </div>

        <Button variant="outline" size="icon" onClick={() => setDark(!dark)} title="Theme">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="outline" onClick={onPrint}>
          <Printer className="h-3.5 w-3.5" /> {t.print}
        </Button>

        {onAdd && (
          <Button variant="default" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" /> {t.add}
          </Button>
        )}
      </div>
    </div>
  );
};

export const Avatars = ({ people }) => {
  if (!people || people.length === 0) {
    return (
      <div className="flex">
        <div className="w-[22px] h-[22px] rounded-full bg-secondary border-[1.5px] border-dashed border-border grid place-items-center text-[10px] font-semibold font-mono text-muted-foreground">
          ?
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {people.slice(0, 3).map((p, i) => (
        <div
          key={p}
          className="w-[22px] h-[22px] rounded-full border-[1.5px] border-card grid place-items-center text-[10px] font-semibold font-mono text-foreground"
          style={{
            background: `oklch(0.92 0.04 ${(p.charCodeAt(0) * 7) % 360})`,
            marginLeft: i === 0 ? 0 : -5,
          }}
          title={p}
        >
          {p.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
      ))}
      {people.length > 3 && (
        <div className="w-[22px] h-[22px] rounded-full bg-secondary border-[1.5px] border-card grid place-items-center text-[10px] font-semibold font-mono -ml-[5px]">
          +{people.length - 3}
        </div>
      )}
    </div>
  );
};

export const StatusPill = ({ status, lang }) => {
  const labels = {
    "todo":        I18N[lang].todo,
    "in-progress": I18N[lang].inProgress,
    "done":        I18N[lang].done,
    "cancelled":   I18N[lang].cancelled,
  };
  return <Badge variant={status}>{labels[status]}</Badge>;
};
