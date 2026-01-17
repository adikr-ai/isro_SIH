const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-night/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ISRO Navigation Analytics · Operational prototype</p>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-white/10 px-3 py-1">Clock Residual Lab</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Ephemeris QA</span>
          <span className="rounded-full border border-white/10 px-3 py-1">Rapid Maneuver Tracker</span>
        </div>
      </div>
    </footer>
  );
};



export default Footer;
