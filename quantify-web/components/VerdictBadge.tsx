export function VerdictBadge({ direction, labels }: { direction: string, labels: { bullish: string, bearish: string, neutral: string } }) {
    const d = direction.toLowerCase();

    // Minimalist colors: White for Bullish, darker grey for Bearish, or just rely on text
    // Let's go with pure monochrome first.
    let label = labels.neutral;

    if (d.includes("long") || d.includes("bull")) {
        label = labels.bullish;
    } else if (d.includes("short") || d.includes("bear")) {
        label = labels.bearish;
    }

    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="font-mono font-bold uppercase text-sm tracking-wider text-white">{direction}</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className="font-sans text-xs font-medium text-neutral-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}
