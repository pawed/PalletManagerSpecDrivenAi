/* global React, I18N, utils, FESTIVAL_DATA */
const { useState, useMemo } = React;

// ============ Sidebar ============
function Sidebar({ active, onNav, lang, counts }) {
  const t = I18N[lang];
  const ms = TODAY_MS_TO_FESTIVAL();
  const items = [
    { id: "overview", label: t.navOverview, icon: IconHome },
    { id: "tasks", label: t.navTasks, icon: IconCheck, count: counts.tasks },
    { id: "costs", label: t.navCosts, icon: IconCoin, count: counts.costs },
    { id: "warehouse", label: t.navWarehouse, icon: IconBox, count: counts.warehouse },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">P</div>
        <div>
          <div className="sidebar__title">{t.appTitle}</div>
          <div className="sidebar__sub">{t.appSub}</div>
        </div>
      </div>
      <div className="nav-section">{t.sections}</div>
      {items.map(it => {
        const Icon = it.icon;
        return (
          <button key={it.id}
            className={"nav-item" + (active === it.id ? " nav-item--active" : "")}
            onClick={() => onNav(it.id)}>
            <Icon />
            <span>{it.label}</span>
            {it.count != null && <span className="nav-item__count">{it.count}</span>}
          </button>
        );
      })}
      <div className="sidebar__footer">
        <div className="sidebar__countdown">
          <div className="sidebar__countdown-label">{t.daysToFestival}</div>
          <div className="sidebar__countdown-num">{ms}</div>
          <div className="sidebar__countdown-date">{t.festivalDate}</div>
        </div>
      </div>
    </aside>
  );
}

function TODAY_MS_TO_FESTIVAL() {
  const today = utils.TODAY;
  const start = new Date(2025, 7, 8);
  return Math.max(0, Math.round((start - today) / 86400000));
}

// ============ Topbar ============
function Topbar({ title, sub, lang, setLang, dark, setDark, onAdd, onPrint }) {
  const t = I18N[lang];
  return (
    <div className="topbar">
      <div>
        <div className="topbar__title">{title}</div>
        {sub && <div className="topbar__crumb">{sub}</div>}
      </div>
      <div className="topbar__actions">
        <div className="lang-toggle">
          <button data-active={lang === "pl"} onClick={() => setLang("pl")}>PL</button>
          <button data-active={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className="icon-btn" onClick={() => setDark(!dark)} title="Theme">
          {dark ? <IconSun /> : <IconMoon />}
        </button>
        <button className="icon-btn" onClick={onPrint}>
          <IconPrint /> {t.print}
        </button>
        {onAdd && (
          <button className="icon-btn icon-btn--primary" onClick={onAdd}>
            <IconPlus /> {t.add}
          </button>
        )}
      </div>
    </div>
  );
}

// ============ Avatars ============
function Avatars({ people }) {
  if (!people || people.length === 0) {
    return (
      <div className="avatars">
        <div className="avatar avatar--empty">?</div>
      </div>
    );
  }
  return (
    <div className="avatars">
      {people.slice(0, 3).map(p => (
        <div className="avatar" key={p} title={p} style={{
          background: `oklch(0.92 0.04 ${(p.charCodeAt(0) * 7) % 360})`
        }}>{utils.initials(p)}</div>
      ))}
      {people.length > 3 && <div className="avatar">+{people.length - 3}</div>}
    </div>
  );
}

// ============ Status pill ============
function StatusPill({ status, lang }) {
  const t = I18N[lang];
  const labels = {
    "todo": t.statusTodo,
    "in-progress": t.statusInProgress,
    "done": t.statusDone,
    "cancelled": t.statusCancelled,
  };
  return <span className={"pill pill--" + status}>{labels[status]}</span>;
}

// ============ Icons ============
const ic = (path) => () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);
const IconHome = ic(<><path d="M2 7l6-5 6 5v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"/><path d="M6 15v-5h4v5"/></>);
const IconCheck = ic(<><path d="M3 8.5l3 3 7-7"/></>);
const IconCoin = ic(<><circle cx="8" cy="8" r="6"/><path d="M8 4v8M6 6.5h3a1.5 1.5 0 010 3H6.5a1.5 1.5 0 000 3H10"/></>);
const IconBox = ic(<><path d="M2 5l6-3 6 3v6l-6 3-6-3V5z"/><path d="M2 5l6 3 6-3M8 8v6"/></>);
const IconSun = ic(<><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></>);
const IconMoon = ic(<><path d="M13 9.5A5 5 0 1 1 6.5 3a4 4 0 0 0 6.5 6.5z"/></>);
const IconPlus = ic(<><path d="M8 3v10M3 8h10"/></>);
const IconPrint = ic(<><path d="M4 6V2h8v4M4 12H2V8a2 2 0 012-2h8a2 2 0 012 2v4h-2"/><rect x="4" y="10" width="8" height="4"/></>);
const IconSearch = ic(<><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></>);
const IconDots = ic(<><circle cx="4" cy="8" r="0.8"/><circle cx="8" cy="8" r="0.8"/><circle cx="12" cy="8" r="0.8"/></>);
const IconExternal = ic(<><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"/></>);

window.UI = { Sidebar, Topbar, Avatars, StatusPill, IconPlus, IconSearch, IconDots, IconExternal };
