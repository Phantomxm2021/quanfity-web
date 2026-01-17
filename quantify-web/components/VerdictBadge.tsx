export function VerdictBadge({ direction, labels }: { direction: string, labels: { bullish: string, bearish: string, neutral: string } }) {
    const d = direction.toLowerCase();

    // Minimalist colors: White for Bullish, darker grey for Bearish, or just rely on text
    // Let's go with pure monochrome first.
    const isBull = d.includes("long") || d.includes("bull");
    const isBear = d.includes("short") || d.includes("bear");

    let label = labels.neutral;
    if (isBull) label = labels.bullish;
    else if (isBear) label = labels.bearish;

    const borderColor = isBull ? "border-emerald-500/40" : isBear ? "border-rose-500/40" : "border-white/20";
    const bgAccent = isBull ? "bg-emerald-500/5" : isBear ? "bg-rose-500/5" : "bg-white/5";
    const textColor = isBull ? "text-emerald-400" : isBear ? "text-rose-400" : "text-white";

    return (
        <div className={`inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-full border ${borderColor} ${bgAccent} backdrop-blur-sm`}>
            <span className={`font-mono font-bold uppercase text-xs md:text-sm tracking-wider ${textColor}`}>{direction}</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className="font-sans text-[10px] md:text-xs font-medium text-neutral-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}
