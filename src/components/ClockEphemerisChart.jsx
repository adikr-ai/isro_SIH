import PropTypes from 'prop-types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const timeTickFormatter = (value) => {
  const date = new Date(value);
  return `${date.getUTCDate()} ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })}`;
};

const tooltipFormatter = (value, name) => {
  const suffix = name.toLowerCase().includes('clock') ? 'ns' : 'm';
  return [`${value.toFixed(2)} ${suffix}`, name];
};

const ClockEphemerisChart = ({ data, timeframeLabel }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white">
            Residual Evolution · {timeframeLabel}
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Overlay compares uploaded nav uploads vs propagated orbital models for both clock bias (ns) and ephemeris residual (m).
          </p>
        </div>
      </div>
      <div className="mt-6 h-80 w-full">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorClockUpload" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60E1FA" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#60E1FA" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClockModel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEphUpload" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#FCD34D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEphModel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis dataKey="timestamp" tickFormatter={timeTickFormatter} stroke="rgba(226, 232, 240, 0.4)" />
            <YAxis yAxisId="clock" stroke="rgba(226, 232, 240, 0.4)" orientation="left" tickFormatter={(value) => `${value.toFixed(1)} ns`} />
            <YAxis yAxisId="ephemeris" stroke="rgba(226, 232, 240, 0.4)" orientation="right" tickFormatter={(value) => `${value.toFixed(1)} m`} />
            <Tooltip formatter={tooltipFormatter} labelFormatter={(value) => new Date(value).toUTCString()} contentStyle={{ backgroundColor: '#111B2B', borderRadius: '1rem', border: '1px solid rgba(96,225,250,0.25)' }} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: 20 }} />
            <Area type="monotone" dataKey="clockUpload" name="Clock Upload" yAxisId="clock" stroke="#60E1FA" fill="url(#colorClockUpload)" strokeWidth={2} />
            <Area type="monotone" dataKey="clockModel" name="Clock Model" yAxisId="clock" stroke="#34D399" fill="url(#colorClockModel)" strokeWidth={2} />
            <Area type="monotone" dataKey="ephemerisUpload" name="Ephemeris Upload" yAxisId="ephemeris" stroke="#FCD34D" fill="url(#colorEphUpload)" strokeWidth={2} />
            <Area type="monotone" dataKey="ephemerisModel" name="Ephemeris Model" yAxisId="ephemeris" stroke="#A855F7" fill="url(#colorEphModel)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

ClockEphemerisChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      clockUpload: PropTypes.number.isRequired,
      clockModel: PropTypes.number.isRequired,
      ephemerisUpload: PropTypes.number.isRequired,
      ephemerisModel: PropTypes.number.isRequired,
    })
  ).isRequired,
  timeframeLabel: PropTypes.string.isRequired
 
};



export default ClockEphemerisChart;


