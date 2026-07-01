const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-8
        md:p-10
        shadow-[0_20px_80px_rgba(0,0,0,.35)]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-pink-500/[0.03]" />

      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;