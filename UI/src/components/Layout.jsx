import React from 'react';
import { NavLink } from 'react-router-dom';
import { I18N } from '../data/festival';
import { daysToFestival } from '../data/utils';
import { IconHome, IconCheck, IconCoin, IconBox, IconSun, IconMoon , IconPrint, IconPlus } from './Icons';

export const Sidebar = ({ lang, counts }) => {
  const t    = I18N[lang];
  const days = daysToFestival();

  const items = [
    { to: "/overview",  label: t.navOverview,  icon: IconHome },
    { to: "/tasks",     label: t.navTasks,     icon: IconCheck, count: counts.tasks },
    { to: "/costs",     label: t.navCosts,     icon: IconCoin,  count: counts.costs },
    { to: "/warehouse", label: t.navWarehouse, icon: IconBox,   count: counts.warehouse },
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
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => `nav-item${isActive ? " nav-item--active" : ""}`}
          >
            <Icon />
            <span>{it.label}</span>
            {it.count != null && <span className="nav-item__count">{it.count}</span>}
          </NavLink>
        );
      })}

      <div className="sidebar__footer">
        <div className="sidebar__countdown">
          <div className="sidebar__countdown-label">{t.daysToFestival}</div>
          <div className="sidebar__countdown-num">{days}</div>
          <div className="sidebar__countdown-date">{t.festivalDate}</div>
        </div>
      </div>
    </aside>
  );
};

export const Topbar = ({ title, sub, lang, setLang, dark, setDark, onPrint, onAdd }) => {
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
};

export const Avatars = ({ people }) => {
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
        <div
          key={p}
          className="avatar"
          title={p}
          style={{
            background: `oklch(0.92 0.04 ${(p.charCodeAt(0) * 7) % 360})`,
          }}
        >
          {p.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
      ))}
      {people.length > 3 && <div className="avatar">+{people.length - 3}</div>}
    </div>
  );
};

export const StatusPill = ({ status, lang }) => {
  const labels = {
    "todo": I18N[lang].todo || "To do",
    "in-progress": I18N[lang].inProgress || "In progress",
    "done": I18N[lang].done || "Done",
    "cancelled": I18N[lang].cancelled || "Cancelled",
  };

  return <span className={`pill pill--${status}`}>{labels[status]}</span>;
};
