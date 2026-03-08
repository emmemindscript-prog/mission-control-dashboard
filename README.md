# Mission Control Dashboard

Professional 8-screen agent management dashboard for AI automation systems.

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Dark%20Mode-1a1a2e?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

## Features

- **Dashboard** - Real-time metrics and activity feed
- **Tasks** - Kanban board with 4 stages (todo → inprogress → review → done)
- **Content Pipeline** - 7-stage content workflow (idea → script → record → edit → review → scheduled → published)
- **Calendar** - Monthly view with event management
- **Memory** - Searchable knowledge base
- **AI Team** - Agent management with status tracking
- **Contacts** - CRM with category management
- **Settings** - Configuration panel with integrations

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS
- React Router v7
- Lucide React (icons)
- date-fns (date handling)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # 8 main screens
├── data/          # Mock data
├── types/         # TypeScript interfaces
├── lib/           # Utilities
├── App.tsx        # Main app with routing
└── main.tsx       # Entry point
```

## Data

Currently uses mock data. API integration ready for:
- `/api/metrics`
- `/api/tasks`
- `/api/content`
- `/api/calendar`
- `/api/agents`
- `/api/contacts`
- `/api/memory`

---

Built for the MindScript Project
