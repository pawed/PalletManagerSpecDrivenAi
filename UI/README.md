# PalletTimeLine React UI

A modern React dashboard for festival project management built with Vite.

## Project Structure

```
UI/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Icons.jsx      # SVG icon components
│   │   └── Layout.jsx     # Layout components (Sidebar, Topbar, etc.)
│   ├── data/              # Data and utilities
│   │   ├── festival.js    # Festival data and i18n
│   │   └── utils.js       # Utility functions
│   ├── sections/          # Page sections
│   │   ├── Overview.jsx   # Overview section
│   │   ├── Tasks.jsx      # Tasks section
│   │   ├── Costs.jsx      # Costs section
│   │   └── Warehouse.jsx  # Warehouse section
│   ├── styles/            # Global styles
│   │   └── globals.css    # Design tokens and base styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── .gitignore             # Git ignore rules
```

## Getting Started

### Install Dependencies

```bash
cd UI
npm install
```

### Development Server

```bash
npm run dev
```

Opens on http://localhost:3000

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Features

- 📱 Responsive dashboard layout
- 🌙 Dark/light theme toggle
- 🌍 Bilingual support (Polish/English)
- 📊 Overview with KPIs
- ✅ Task management with filtering
- 💰 Cost & revenue tracking
- 📦 Warehouse inventory management
- ⚡ Fast development with Vite

## Technologies

- React 18.3
- Vite 5
- CSS Grid & Flexbox
- CSS Custom Properties (variables)

## Design

The UI uses a professional, clean design system with:
- Oklch color space for consistent colors
- Monospace font (JetBrains Mono) for data
- Inter font for body text
- Subtle shadows and borders
