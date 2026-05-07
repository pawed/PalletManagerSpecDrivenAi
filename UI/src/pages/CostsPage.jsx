import React, { useMemo } from 'react';
import { I18N } from '../data/i18n';
import { fmtPLN } from '../data/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useAppContext } from '../context/AppContext';

const CostsPage = () => {
  const { lang, costs, revenue } = useAppContext();
  const t = I18N[lang];

  const totalCosts   = useMemo(() => costs.reduce((s, c)   => s + c.amount, 0), [costs]);
  const totalRevenue = useMemo(() => revenue.reduce((s, r) => s + r.amount, 0), [revenue]);
  const balance = totalRevenue - totalCosts;

  const Row = ({ name, amount }) => (
    <div className="grid gap-2.5 py-2 border-t border-border items-center" style={{ gridTemplateColumns: "1fr auto" }}>
      <span>{name}</span>
      <span className="font-mono font-semibold">{fmtPLN(amount)}</span>
    </div>
  );

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-5">
        <TabsTrigger value="overview">{t.overview}</TabsTrigger>
        <TabsTrigger value="costs">{t.costs}</TabsTrigger>
        <TabsTrigger value="revenue">{t.revenue}</TabsTrigger>
      </TabsList>

      {/* Balance summary — always visible */}
      <div className="bg-card border border-border rounded-[10px] px-5 py-4 mb-5">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-[13px] font-semibold tracking-tight">{t.balance}</p>
          <p className="text-[11px] text-muted-foreground font-mono">{lang === "pl" ? "edycja 2025" : "2025 edition"}</p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-[12px] text-muted-foreground mb-1">{t.revenue}</p>
            <p className="text-xl font-semibold text-status-done">{fmtPLN(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground mb-1">{t.costs}</p>
            <p className="text-xl font-semibold text-[oklch(0.6_0.15_25)]">{fmtPLN(totalCosts)}</p>
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground mb-1">{t.balance}</p>
            <p className={`text-xl font-semibold ${balance >= 0 ? "text-status-done" : "text-[oklch(0.6_0.15_25)]"}`}>
              {balance >= 0 ? "+" : ""}{fmtPLN(balance)}
            </p>
          </div>
        </div>
      </div>

      <TabsContent value="costs">
        <div className="bg-card border border-border rounded-[10px] px-5 py-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-[13px] font-semibold tracking-tight">{t.costs}</p>
            <p className="text-[11px] text-muted-foreground font-mono">{costs.length}</p>
          </div>
          {costs.map(c => <Row key={c.id} name={c.name} amount={c.amount} />)}
        </div>
      </TabsContent>

      <TabsContent value="revenue">
        <div className="bg-card border border-border rounded-[10px] px-5 py-4">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-[13px] font-semibold tracking-tight">{t.revenue}</p>
            <p className="text-[11px] text-muted-foreground font-mono">{revenue.length}</p>
          </div>
          {revenue.map(r => <Row key={r.id} name={r.name} amount={r.amount} />)}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CostsPage;
