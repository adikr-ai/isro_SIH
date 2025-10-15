import PropTypes from 'prop-types';

const sentimentStyles = {
  success:
    'border-aurora/30 bg-gradient-to-br from-aurora/20 via-aurora/10 to-transparent text-aurora-light',
  warn: 'border-solar/40 bg-gradient-to-br from-solar/10 via-solar/5 to-transparent text-solar',
  neutral: 'border-white/5 bg-white/5 text-slate-200'
};

const MetricCard = ({ title, value, delta, sentiment }) => {
  const tone = sentimentStyles[sentiment] ?? sentimentStyles.neutral;

  return (
    <article className={`card-border glass-panel rounded-3xl p-6 shadow-glow transition hover:translate-y-[-2px] ${tone}`}>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{title}</p>
      <p className="mt-3 font-display text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-300">{delta}</p>
    </article>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  delta: PropTypes.string.isRequired,
  sentiment: PropTypes.oneOf(['success', 'warn', 'neutral'])
};

MetricCard.defaultProps = {
  sentiment: 'neutral'
};

export default MetricCard;
