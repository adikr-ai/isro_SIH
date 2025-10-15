import { useMemo, useState } from 'react';
import HeroBanner from './components/HeroBanner.jsx';
import MetricCard from './components/MetricCard.jsx';
import ClockEphemerisChart from './components/ClockEphemerisChart.jsx';
import ResidualComparison from './components/ResidualComparison.jsx';
import DriftEnvelopeChart from './components/DriftEnvelopeChart.jsx';
import ScenarioExplorer from './components/ScenarioExplorer.jsx';
import Footer from './components/Footer.jsx';
import {
  satellites,
  telemetrySeries,
  toleranceBands,
  scenarioNotes
} from './data/mockErrorData.js';

const TIMEFRAMES = [
  { id: '72H', label: 'Last 72 hours', hours: 72 },
  { id: '7D', label: 'Last 7 days', hours: 24 * 7 },
  { id: '30D', label: 'Last 30 days', hours: 24 * 30 }
];

const calcSummary = (series) => {
  if (!series.length) {
    return {
      clockBias: 0,
      clockDelta: 0,
      ephemerisResidual: 0,
      ephemerisDelta: 0,
      driftRate: 0,
      excursionRate: 0
    };
  }

  const latest = series[series.length - 1];
  const first = series[0];

  const clockBias = latest.clockUpload - latest.clockModel;
  const clockDelta = clockBias - (first.clockUpload - first.clockModel);

  const latestEphemerisResidual = latest.ephemerisUpload - latest.ephemerisModel;
  const firstEphemerisResidual = first.ephemerisUpload - first.ephemerisModel;
  const ephemerisResidual = latestEphemerisResidual;
  const ephemerisDelta = ephemerisResidual - firstEphemerisResidual;
  const driftRate = latest.driftRate;

  const excursionRate = series.reduce((acc, point) => {
    const clockDiff = Math.abs(point.clockUpload - point.clockModel);
    const ephDiff = Math.abs(point.ephemerisUpload - point.ephemerisModel);
    return acc + (clockDiff > 1.2 || ephDiff > 5 ? 1 : 0);
  }, 0);

  return {
    clockBias,
    clockDelta,
    ephemerisResidual,
    ephemerisDelta,
    driftRate,
    excursionRate: (excursionRate / series.length) * 100
  };
};

const formatDelta = (value, unit) => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)} ${unit}`;
};

const formatPercent = (value) => `${value.toFixed(1)}%`;

function App() {
  const [selectedSatellite, setSelectedSatellite] = useState(satellites[0].id);
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[0]);

  const filteredSeries = useMemo(() => {
    const rawSeries = telemetrySeries[selectedSatellite] ?? [];
    if (!rawSeries.length) {
      return [];
    }

    const cutoff = Date.now() - timeframe.hours * 60 * 60 * 1000;
    return rawSeries.filter((entry) => new Date(entry.timestamp).getTime() >= cutoff);
  }, [selectedSatellite, timeframe]);

  const summary = useMemo(() => calcSummary(filteredSeries), [filteredSeries]);

  const tolerance = toleranceBands[selectedSatellite] ?? [];
  const notes = scenarioNotes[selectedSatellite] ?? [];

  return (
    <div className="min-h-screen bg-night bg-space-gradient text-slate-100">
      <HeroBanner
        satellites={satellites}
        timeframeOptions={TIMEFRAMES}
        selectedSatellite={selectedSatellite}
        onSatelliteChange={setSelectedSatellite}
        selectedTimeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      <main className="mx-auto max-w-6xl space-y-14 px-6 pb-24">
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Clock Bias"
            value={`${summary.clockBias.toFixed(2)} ns`}
            delta={formatDelta(summary.clockDelta, 'ns drift')}
            sentiment={summary.clockBias > 1.5 ? 'warn' : 'success'}
          />
          <MetricCard
            title="Ephemeris Residual"
            value={`${Math.abs(summary.ephemerisResidual).toFixed(1)} m`}
            delta={formatDelta(summary.ephemerisDelta, 'm shift')}
            sentiment={summary.ephemerisDelta > 0.8 ? 'warn' : 'success'}
          />
          <MetricCard
            title="Instant Drift"
            value={`${summary.driftRate.toFixed(3)} ns/s`}
            delta={formatDelta(summary.driftRate - 0.016, 'vs model')}
            sentiment={summary.driftRate > 0.12 ? 'warn' : 'success'}
          />
          <MetricCard
            title="Excursion Probability"
            value={formatPercent(summary.excursionRate)}
            delta={`${summary.excursionRate.toFixed(1)}% beyond limit`}
            sentiment={summary.excursionRate > 15 ? 'warn' : 'success'}
          />
        </section>

        <section className="glass-panel card-border rounded-3xl p-8 shadow-glow">
          <ClockEphemerisChart data={filteredSeries} timeframeLabel={timeframe.label} />
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-panel card-border rounded-3xl p-8 shadow-glow">
            <ResidualComparison data={filteredSeries} />
          </div>
          <div className="glass-panel card-border rounded-3xl p-8 shadow-glow">
            <DriftEnvelopeChart data={filteredSeries} tolerance={tolerance} />
          </div>
        </div>

        <section className="glass-panel card-border rounded-3xl p-8 shadow-glow">
          <ScenarioExplorer scenarios={notes} satelliteId={selectedSatellite} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
