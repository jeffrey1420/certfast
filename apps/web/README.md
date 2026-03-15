# CertFast Web

React + Vite frontend for CertFast compliance management platform.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **UI Components**: shadcn/ui
- **Notifications**: Sonner
- **Charts**: Recharts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── api.ts        # Axios instance
│   ├── utils.ts      # Utility functions
│   └── constants.ts  # App constants
├── hooks/            # Custom React hooks
├── stores/           # Zustand stores
├── types/            # TypeScript types
├── routes/           # Route components
├── App.tsx
└── main.tsx
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3333` |

## License

Private - CertFast Internal
