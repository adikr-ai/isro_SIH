import PropTypes from 'prop-types';

const ScenarioExplorer = ({ scenarios, satelliteId }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white">Scenario Explorer</h2>
          <p className="mt-1 text-sm text-slate-300">
            Operational interpretations curated for {satelliteId}. Align clock and orbit teams on proactive mitigation.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
          Analyst Playbook
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <article key={scenario.title} className="glass-panel card-border rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-aurora-light">{scenario.sector}</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">{scenario.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{scenario.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {scenario.actions.map((action) => (
                <li key={action} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-aurora" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
              {scenario.indicator}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

ScenarioExplorer.propTypes = {
  scenarios: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      actions: PropTypes.arrayOf(PropTypes.string).isRequired,
      indicator: PropTypes.string.isRequired
    })
  ).isRequired,
  satelliteId: PropTypes.string.isRequired
};

export default ScenarioExplorer;
