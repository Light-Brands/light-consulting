# Light Consulting

> Transform your business into an AI super intelligence. Illuminate the path between where you are and where AI can take you.

## Overview

Light Consulting is a modern, single-page application built with React and Vite. It showcases AI consulting services with a sophisticated dark theme featuring the "Illumination Palette" — light emerging from depth.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
light-consulting/
├── public/
│   ├── favicon.svg
│   └── styles/
│       └── index.css          # Global styles & CSS variables
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Accordion.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── lib/                   # Utilities
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── types.ts               # TypeScript types
│   ├── App.tsx                # Main app component
│   └── index.tsx              # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json                # Vercel deployment config
```

## Design System

The app uses the **Illumination Palette**:

- **Radiance Scale** (Primary) — Gold, amber warmth
- **Clarity Scale** (Secondary) — Cream, soft light
- **Wisdom Scale** (AI Features) — Violet intelligence
- **Depth Scale** (Background) — Professional darkness

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will auto-deploy on push.

### Environment Variables

If connecting to Supabase (optional):

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## License

Private — All rights reserved.

