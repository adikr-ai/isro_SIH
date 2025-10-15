# Satellite Error Dashboard

A Vite + React single-page application for visualizing time-varying error patterns between uploaded and modelled satellite clock and ephemeris parameters. The project showcases data exploration flows, interactive charts, and analyst guidance tailored for GNSS operations teams.

## Getting Started

1. **Install dependencies**
   ```powershell
   npm install
   ```
2. **Run the development server**
   ```powershell
   npm run dev
   ```
   Vite serves the app at `http://localhost:5173` and auto-opens in your browser.

## Available Scripts

- `npm run dev` – start Vite in development mode with fast refresh.
- `npm run build` – generate a production build in the `dist` folder.
- `npm run preview` – locally preview the production bundle.
- `npm run lint` – lint all `.js`/`.jsx` files under `src` using the project ESLint rules.
- `npm run test` – execute component tests with Vitest + Testing Library.

## Tailwind + Design System

Tailwind CSS powers layout and theming. Custom colors (`night`, `orbit`, `aurora`, `solar`, `plasma`) and font stacks (`Sora`, `Inter`) are configured in `tailwind.config.js`. Global utility tweaks and background gradients live in `src/index.css`.

## Data Flow Overview

Mock satellite telemetry, upload/model baselines, and drift analysis are defined in `src/data/mockErrorData.js`. The top-level `App` component wires:

- Contextual hero + metric cards summarizing latest offsets.
- Multi-series clock and ephemeris error charts (`ClockEphemerisChart`).
- Orbit drift projections vs tolerance bands (`DriftEnvelopeChart`).
- Delta views contrasting upload vs model residuals (`ResidualComparison`).
- Scenario explorer panel to swap satellite, solar cycle, and maneuver conditions.

Each chart consumes normalized time-series entries (`timestamp`, `clock`, `ephemeris`) so the UI can be connected to real services later.

## Testing

Vitest runs in a JSDOM environment configured in `vite.config.js`. Shared render helpers attach in `src/setupTests.js`. Add high-signal component tests under `src/__tests__` to cover telemetry transformations before wiring to live APIs.

## Deploying to Vercel

1. Install Vercel CLI if needed:
   ```powershell
   npm install -g vercel
   ```
2. Build the project:
   ```powershell
   npm run build
   ```
3. Deploy:
   ```powershell
   vercel --prod
   ```
   The included `vercel.json` routes the build output in `/dist`.

Alternatively, connect the repository in the Vercel dashboard and set the build command to `npm run build`, output directory `dist`.

## Environment Notes

- Target Node.js 18+ for parity with Vercel’s default runtime.
- Adjust chart colors and accessibility tokens in `tailwind.config.js` when branding changes.
- Replace mock data loaders with API hooks once telemetry endpoints are available.
