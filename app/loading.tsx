export default function Loading() {
  return (
    <div className="global-page-loader" aria-live="polite" aria-busy="true">
      <div className="loader-inner">
        {/* Animated Sound Wave Equalizer */}
        <div className="loader-equalizer" aria-hidden="true">
          <span className="eq-bar bar-1" />
          <span className="eq-bar bar-2" />
          <span className="eq-bar bar-3" />
          <span className="eq-bar bar-4" />
          <span className="eq-bar bar-5" />
        </div>

        {/* Agency Brand Name */}
        <div className="loader-brand">
          <b>MAINAHTUNESTEAM</b>
          <small>CREATIVE STUDIO</small>
        </div>

        {/* Shimmer / Progress Line */}
        <div className="loader-progress-track">
          <div className="loader-progress-bar" />
        </div>

        <span className="loader-status-text">Loading Experience...</span>
      </div>
    </div>
  );
}
