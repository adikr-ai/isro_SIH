const HOURS = 24 * 30;
const START_DATE = new Date('2025-09-15T00:00:00Z');

const generateSeries = (seed, driftBias) => {
  return Array.from({ length: HOURS }, (_, index) => {
    const timestamp = new Date(START_DATE.getTime() + index * 60 * 60 * 1000);
    const harmonic = Math.sin((index + seed) / 12) * 0.5 + Math.cos((index + seed) / 20) * 0.25;
    const clockUpload = 1.05 + harmonic + Math.sin((index + seed) / 5) * 0.18 + seed * 0.012;
    const clockModel = 0.95 + harmonic * 0.82 + Math.cos((index + seed) / 7) * 0.15;
    const ephemerisBase = 4.1 + Math.cos((index + seed) / 18) * 1.2 + seed * 0.35;
    const ephemerisUpload = ephemerisBase + Math.sin((index + seed) / 9) * 0.9 + index * 0.004;
    const ephemerisModel = ephemerisBase - Math.cos((index + seed) / 8) * 0.7;
    const driftRate = 0.014 + Math.sin((index + seed) / 26) * 0.045 + driftBias;

    return {
      timestamp: timestamp.toISOString(),
      clockUpload: Number(clockUpload.toFixed(3)),
      clockModel: Number(clockModel.toFixed(3)),
      ephemerisUpload: Number(ephemerisUpload.toFixed(3)),
      ephemerisModel: Number(ephemerisModel.toFixed(3)),
      driftRate: Number(driftRate.toFixed(4))
    };
  });
};

const makeTolerance = (upperBias) => [
  { horizon: 6, upper: 0.098 + upperBias, lower: -0.05 + upperBias / 2, biasAdjustment: 0.002 },
  { horizon: 12, upper: 0.11 + upperBias, lower: -0.045 + upperBias / 2, biasAdjustment: 0.004 },
  { horizon: 24, upper: 0.12 + upperBias, lower: -0.04 + upperBias / 3, biasAdjustment: 0.006 },
  { horizon: 36, upper: 0.135 + upperBias, lower: -0.038 + upperBias / 3, biasAdjustment: 0.008 },
  { horizon: 48, upper: 0.15 + upperBias, lower: -0.032 + upperBias / 4, biasAdjustment: 0.01 }
];

export const satellites = [
  { id: 'GSAT-101', name: 'GSAT 101', plane: 'A', color: '#60E1FA' },
  { id: 'GSAT-204', name: 'GSAT 204', plane: 'B', color: '#A855F7' },
  { id: 'GSAT-312', name: 'GSAT 312', plane: 'C', color: '#FCD34D' }
];

export const telemetrySeries = {
  'GSAT-101': generateSeries(2, 0.01),
  'GSAT-204': generateSeries(7, 0.02),
  'GSAT-312': generateSeries(13, 0.008)
};

export const toleranceBands = {
  'GSAT-101': makeTolerance(0.01),
  'GSAT-204': makeTolerance(0.016),
  'GSAT-312': makeTolerance(0.012),
  'GSAT-310': makeTolerance(0.013),
  'GSAT-306': makeTolerance(0.016)
};




export const scenarioNotes = {
  'GSAT-101': [
    {
      sector: 'Clock Domain',
      title: 'Blended Rubidium Model Calibration',
      summary:
        'Clock residual swings align with eclipse exit signatures. Blend thermal correction factors and extend atomic clock calibration window.',
      actions: [
        'Run rapid fit on thermal coefficient drift using last 48h telemetry.',
        'Tag upload with eclipse exit flag to suppress false clock alarms downstream.',
        'Coordinate with ground ops to adjust heater duty cycle thresholds.'
      ],
      indicator: 'Watch residual > 1.6 ns for 3 consecutive hours.'
    },
    {
      sector: 'Orbit Determination',
      title: 'Drag Model Re-Tune Campaign',
      summary:
        'Ephemeris residual build-up spikes when Kp index surpasses 5. Uptick coincides with low perigee segment.',
      actions: [
        'Inject JB2008 density correction for forecast storm window.',
        'Re-run OD with solar flux ensembles and archive fit quality.',
        'Schedule maneuver review to validate planned micro-burn.'
      ],
      indicator: 'Target RMS under 4.2 m within 18 h.'
    }
  ],
  'GSAT-204': [
    {
      sector: 'Clock Domain',
      title: 'Upload Latency Reconciliation',
      summary:
        'Upload packets lag propagation model by 14 minutes due to DSN visibility gap. Bias creeps positive just before handover.',
      actions: [
        'Harden ground upload window and pre-stage nav file minutes earlier.',
        'Engage backup uplink when latency exceeds 9 minutes.',
        'Update monitoring dashboard with uplink latency feed.'
      ],
      indicator: 'Maintain latency < 8 min to keep bias under 1.4 ns.'
    },
    {
      sector: 'Orbit Determination',
      title: 'Solar Pressure Plate Refit',
      summary:
        'GEO yaw flip introduced cross-track wobble. Model underestimates solar pressure during high beta angle.',
      actions: [
        'Refit SRP plate model with new panel normal vector.',
        'Validate with 7-day residual playback before next yaw flip.',
        'Publish delta to constellation config after validation.'
      ],
      indicator: 'Constrain ephemeris residual under 5.0 m peak-to-peak.'
    }
  ],
  'GSAT-312': [
    {
      sector: 'Clock Domain',
      title: 'Reference Ground Clock Cross-Check',
      summary:
        'Reference station drifted 0.6 ns during maintenance. Residual difference remains after upload but model stays anchored.',
      actions: [
        'Switch blend weight toward secondary reference clock.',
        'Audit maintenance window overlap with upload pipeline.',
        'Share delta with city-grade augmentation services.'
      ],
      indicator: 'Residual bias should revert < 1.2 ns within 12 h.'
    },
    {
      sector: 'Orbit Determination',
      title: 'Station-Keeping Thrust Recovery',
      summary:
        'Recent radial burn produced steady drift. Model has not swallowed new thrust vector yet.',
      actions: [
        'Update OD solution with maneuver truth vector and recent tracking arcs.',
        'Compare short-term propagation using enhanced gravity field.',
        'Alert integrity service to widen alerting masks for 6 h.'
      ],
      indicator: 'Aim for residual slope under 0.12 m/h.'
    }
  ]
};
