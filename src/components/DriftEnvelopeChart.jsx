import PropTypes from 'prop-types';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const buildProjection = (series, tolerance) => {
  if (!series.length || !tolerance.length) {
    return [];
  }

  const latest = series[series.length - 1];

  return tolerance.map((band) => ({
    horizon: band.horizon,
    expected: latest.driftRate + band.biasAdjustment,
    upper: band.upper,
    lower: band.lower
  }));
};

const DriftEnvelopeChart = ({ data, tolerance }) => {
  const chartData = buildProjection(data, tolerance);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-white">Drift Envelope Forecast</h2>
      <p className="mt-1 text-sm text-slate-300">
        Instant drift projected across planning horizons with maneuver-informed tolerance bands.
      </p>
      <div className="mt-6 h-72">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="upperBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60E1FA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60E1FA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
            <XAxis dataKey="horizon" stroke="rgba(226, 232, 240, 0.4)" tickFormatter={(value) => `${value}h`} />
            <YAxis stroke="rgba(226, 232, 240, 0.4)" tickFormatter={(value) => `${value.toFixed(3)} ns/s`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111B2B', borderRadius: '1rem', border: '1px solid rgba(96,225,250,0.25)' }}
              formatter={(value) => `${Number(value).toFixed(3)} ns/s`}
              labelFormatter={(value) => `${value} hour horizon`}
            />
            <Area type="monotone" dataKey="upper" stroke="#60E1FA" strokeWidth={2} fill="url(#upperBand)" name="Upper Tolerance" />
            <Area type="monotone" dataKey="lower" stroke="#FBBF24" strokeWidth={1.5} fill="transparent" name="Lower Tolerance" />
            <Area type="monotone" dataKey="expected" stroke="#A855F7" strokeWidth={3} fill="transparent" name="Projected Drift" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

DriftEnvelopeChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      driftRate: PropTypes.number.isRequired
    })
  ).isRequired,
  tolerance: PropTypes.arrayOf(
    PropTypes.shape({
      horizon: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
      lower: PropTypes.number.isRequired,
      biasAdjustment: PropTypes.number.isRequired
    })
  ).isRequired
};

export default DriftEnvelopeChart;
