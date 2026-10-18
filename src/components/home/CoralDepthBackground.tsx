export function CoralDepthBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#081F35]"
    >
      <img
        src="/deep-coral-reef.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-35 mix-blend-luminosity"
        fetchPriority="low"
        decoding="async"
      />
      <img
        src="/images/coral-depth-seabed.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-15 mix-blend-screen"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[#0E3453]/45 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#081F35]/65 via-[#0E3453]/65 to-[#081F35]/80" />
    </div>
  );
}
