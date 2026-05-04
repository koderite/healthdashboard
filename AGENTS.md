# HealthDashboard - Agent Instructions

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Run TypeScript + Vite build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

- **Entry point**: `src/main.tsx`
- **API**: `src/lib/api.ts` (Axios + React Query)
- **Path alias**: `@/` maps to `./src/`
- **API endpoint**: `https://fedskillstest.coalitiontechnologies.workers.dev` (requires basic auth `coalition:skills-test`)

## Important Notes

- **No test framework** - no tests are configured
- **No typecheck script** - `tsc -b` runs as part of `npm run build`
- Dev server uses port 3000 (configured in `vite.config.ts`)
- CSS variables and design tokens in `src/index.css`
- UI components are in `src/components/ui/` (shadcn/ui primitives)