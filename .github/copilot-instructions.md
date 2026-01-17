# Copilot Instructions – Satellite Error Dashboard

## Quick Context
- Vite + React SPA served by Vite; entry flow is [src/main.jsx](src/main.jsx) -> [src/App.jsx](src/App.jsx).
- UI combines KPI tiles and analytics charts fed by mock telemetry in [src/data/mockErrorData.js](src/data/mockErrorData.js).

## State & Data Flow
- App state tracks selectedSatellite/timeframe in React state; filtered telemetry comes from useMemo, metrics come from calcSummary (clock bias/delta, ephemeris delta, drift, excursion rate).
- Mock series shape { timestamp, clockUpload, clockModel, ephemerisUpload, ephemerisModel, driftRate }; tolerance bands and scenario notes live alongside the series export.
- Known corruption: calcSummary includes stray tokens (ephimertics, unused HOURS constant). Clean these before shipping changes in [src/App.jsx](src/App.jsx).

## Visual Components
- HeroBanner expects { satellites, timeframeOptions, selectedSatellite, onSatelliteChange, selectedTimeframe, onTimeframeChange }; remove the lowercase timeframeoptions prop when touching [src/App.jsx](src/App.jsx).
- KPI tiles reuse [src/components/MetricCard.jsx](src/components/MetricCard.jsx); pass formatted strings and sentiment (success/warn/neutral).
- Charts rely on Recharts with gradient defs; reference [src/components/ClockEphemerisChart.jsx](src/components/ClockEphemerisChart.jsx) for dual-axis areas, [src/components/ResidualComparison.jsx](src/components/ResidualComparison.jsx) for stacked bars, and [src/components/DriftEnvelopeChart.jsx](src/components/DriftEnvelopeChart.jsx) for tolerance projections.
- Repair chart helpers before running: delete the orphan return buckets.map block in ResidualComparison and the duplicate const chartData line in DriftEnvelopeChart.

## Styling System
- Tailwind tokens live in [tailwind.config.js](tailwind.config.js); reuse glass-panel, card-border, shadow-glow utilities from [src/index.css](src/index.css) for consistent glassmorphism.
- Layouts lean on rounded-3xl containers and gradient backgrounds; keep typography with font-display (Sora) for headings and font-sans (Inter) for body copy.

## Testing & Tooling
- Vitest + Testing Library configured via [vite.config.js](vite.config.js) and [src/setupTests.js](src/setupTests.js); place specs in [src/__tests__](src/__tests__).
- NPM scripts: npm run dev, npm run build, npm run preview, npm run lint, npm run test; target Node 18+ to match Vercel defaults.
- ESLint enforces PropTypes for shared components; follow patterns from MetricCard/HeroBanner when adding props.

## Data & Future Integrations
- generateSeries, toleranceBands, and scenarioNotes simulate downstream APIs; preserve their shape for an easy swap to fetch hooks.
- DriftEnvelopeChart consumes tolerance bands, ScenarioExplorer renders scenarioNotes per satellite.

## Release Notes
- Footer auto-renders current year and static tags; no i18n support yet.
- Known issue: [src/data/mockErrorData.js](src/data/mockErrorData.js#L17) ends with `};drifrare : number`; delete the fragment when editing nearby.
- Duplicate [src/App.tsx](src/App.tsx) is legacy; keep JSX updates in App.jsx unless the TypeScript migration restarts.
