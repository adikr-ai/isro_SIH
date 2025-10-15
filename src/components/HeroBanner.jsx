import PropTypes from 'prop-types';

const HeroBanner = ({
  satellites,
  timeframeOptions,
  selectedSatellite,
  onSatelliteChange,
  selectedTimeframe,
  onTimeframeChange
}) => {
  const activeSatellite = satellites.find((satellite) => satellite.id === selectedSatellite) ?? satellites[0];

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-orbit via-night to-night">
      <div className="absolute inset-0 opacity-80">
        <div className="h-full w-full bg-space-gradient" />
        <div className="absolute -left-40 top-16 h-72 w-72 rounded-full bg-aurora/30 blur-3xl" />
  <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-plasma/30 blur-3xl" />
        <div className="absolute -right-24 top-24 h-64 w-64 rounded-full bg-solar/25 blur-3xl" />
        <svg
          className="absolute right-12 top-14 hidden h-40 w-40 animate-float text-white/10 lg:block"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 60 L60 20 L120 40 L180 30 L140 90 L90 110 L40 160 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="20" r="4" fill="currentColor" />
          <circle cx="120" cy="40" r="3" fill="currentColor" />
          <circle cx="90" cy="110" r="3" fill="currentColor" />
          <circle cx="140" cy="90" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-aurora-light">
              <span className="h-2 w-2 rounded-full bg-aurora-light shadow-glow animate-pulse" />
              Live Constellation Watch
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white drop-shadow-[0_15px_45px_rgba(96,225,250,0.18)] md:text-5xl">
              Time-Resolved Satellite Clock & Ephemeris Error Intelligence
            </h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">
              Compare uploaded navigation uploads against orbital dynamics models, uncover drift build-up early, and pinpoint maneuvers that challenge the constellation stability.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-solar animate-pulse" />
                <span className="font-medium text-white">{activeSatellite.name}</span>
                <span className="text-slate-400">Plane {activeSatellite.plane}</span>
              </div>
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2 text-sm font-semibold text-night shadow-glow transition hover:translate-y-[-1px]"
              >
                Mission Timeline
                <span className="translate-x-0 transition group-hover:translate-x-1">→</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-aurora/40 hover:text-aurora"
              >
                Download Weekly Brief
              </button>
            </div>
          </div>
          <div className="glass-panel card-border w-full max-w-sm rounded-3xl p-6 shadow-glow">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400">Satellite</label>
                <div className="mt-1 rounded-2xl border border-white/10 bg-night px-4 py-3">
                  <select
                    className="w-full bg-transparent text-sm font-medium text-slate-100 outline-none"
                    value={selectedSatellite}
                    onChange={(event) => onSatelliteChange(event.target.value)}
                  >
                    {satellites.map((satellite) => (
                      <option key={satellite.id} value={satellite.id} className="bg-night text-slate-900">
                        {satellite.name} · Plane {satellite.plane}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400">Time Horizon</label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {timeframeOptions.map((option) => {
                    const isActive = option.id === selectedTimeframe.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => onTimeframeChange(option)}
                        className={`rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-aurora text-night shadow-glow'
                            : 'border border-white/10 bg-white/5 text-slate-300 hover:border-aurora/50 hover:text-white'
                        }`}
                      >
                        {option.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 text-sm text-slate-400 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-aurora-light">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.3-4.5 2.3.9-5L4.8 7.2l5-.7L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-semibold text-white">Orbit Fit Confidence</p>
            </div>
            <p className="mt-2">Monte-Carlo ensemble projects residual growth envelopes with solar flux modulation.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-solar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h10M4 17h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p className="font-semibold text-white">Upload QA Checklist</p>
            </div>
            <p className="mt-2">Verify reference clocks, uplink latency, and maneuver tagging before broadcast.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-plasma">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5h4l3 6 3-6h4l-7 14-7-14z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-semibold text-white">Model Residual Lab</p>
            </div>
            <p className="mt-2">Blend dynamic model families and calibrate drag/solar pressure terms over time.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

HeroBanner.propTypes = {
  satellites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      plane: PropTypes.string.isRequired
    })
  ).isRequired,
  timeframeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedSatellite: PropTypes.string.isRequired,
  onSatelliteChange: PropTypes.func.isRequired,
  selectedTimeframe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired
  }).isRequired,
  onTimeframeChange: PropTypes.func.isRequired
};

export default HeroBanner;
