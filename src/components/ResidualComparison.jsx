import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const aggregateResiduals = (series) => {
  if (!series.length) {
    return [];
  }
  const buckets = ['Clock', 'Ephemeris'];
  const totals = series.reduce(
    (acc, point) => {
      acc.clock += Math.abs(point.clockUpload - point.clockModel);
      acc.ephemeris += Math.abs(point.ephemerisUpload - point.ephemerisModel);
      return acc;
    },
    { clock: 0, ephemeris: 0 }
  );

  const avgClock = totals.clock / series.length;
  const avgEphemeris = totals.ephemeris / series.length;

  return buckets.map((label) => ({
    label,
    uploadDelta: label === 'Clock' ? avgClock : avgEphemeris,
    modelBaseline: label === 'Clock' ? 1.1 : 4.5
  }));
};

const ResidualComparison = ({ data }) => {
  const chartData = aggregateResiduals(data);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-white">Upload vs Model Residual</h2>
      <p className="mt-1 text-sm text-slate-300">
        Average magnitude of error build-up versus the tuned model baseline over the selected horizon.
      </p>
      <div className="mt-6 h-72">
        <ResponsiveContainer>
          <BarChart data={chartData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(226, 232, 240, 0.4)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(226, 232, 240, 0.4)" tickFormatter={(value) => `${value.toFixed(1)} ${value < 3 ? 'ns' : 'm'}`} />
            <Tooltip
              cursor={{ fill: 'rgba(96, 225, 250, 0.08)' }}
              contentStyle={{ backgroundColor: '#111B2B', borderRadius: '1rem', border: '1px solid rgba(96,225,250,0.25)' }}
              formatter={(value) => value.toFixed(2)}
            />
            <Bar dataKey="modelBaseline" fill="rgba(255,255,255,0.1)" name="Model Baseline" />
            <Bar dataKey="uploadDelta" fill="#60E1FA" name="Upload Deviation" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

ResidualComparison.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      clockUpload: PropTypes.number.isRequired,
      clockModel: PropTypes.number.isRequired,
      ephemerisUpload: PropTypes.number.isRequired,
      ephemerisModel: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ResidualComparison;
