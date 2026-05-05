import React from 'react';

export const iconSVG = (path) => () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export const IconHome = iconSVG(
  <>
    <path d="M2 7l6-5 6 5v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z" />
    <path d="M6 15v-5h4v5" />
  </>
);

export const IconCheck = iconSVG(<path d="M3 8.5l3 3 7-7" />);

export const IconCoin = iconSVG(
  <>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4v8M6 6.5h3a1.5 1.5 0 010 3H6.5a1.5 1.5 0 000 3H10" />
  </>
);

export const IconBox = iconSVG(
  <>
    <path d="M2 5l6-3 6 3v6l-6 3-6-3V5z" />
    <path d="M2 5l6 3 6-3M8 8v6" />
  </>
);

export const IconSun = iconSVG(
  <>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3" />
  </>
);

export const IconMoon = iconSVG(<path d="M13 9.5A5 5 0 1 1 6.5 3a4 4 0 0 0 6.5 6.5z" />);

export const IconPlus = iconSVG(
  <>
    <path d="M8 3v10M3 8h10" />
  </>
);

export const IconPrint = iconSVG(
  <>
    <path d="M4 6V2h8v4M4 12H2V8a2 2 0 012-2h8a2 2 0 012 2v4h-2" />
    <rect x="4" y="10" width="8" height="4" />
  </>
);

export const IconSearch = iconSVG(
  <>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </>
);

export const IconDots = iconSVG(
  <>
    <circle cx="4" cy="8" r="0.8" />
    <circle cx="8" cy="8" r="0.8" />
    <circle cx="12" cy="8" r="0.8" />
  </>
);
