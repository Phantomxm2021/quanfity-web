export function VerdictBadge({ direction }: { direction: string }) {
    const d = direction.toLowerCase();
    let colorClass = "bg-gray-500/20 text-gray-400 border-gray-500";
    let label = "Neutral";

    if (d.includes("long") || d.includes("bull")) {
        colorClass = "bg-green-500/20 text-green-400 border-green-500";
        label = "Bullish";
    } else if (d.includes("short") || d.includes("bear")) {
        colorClass = "bg-red-500/20 text-red-400 border-red-500";
        label = "Bearish";
    }

    return (
        <div className={`px-4 py-2 rounded-full border border-opacity-30 flex items-center gap-2 backdrop-blur-sm ${colorClass}`}>
            <span className="font-bold uppercase tracking-wider text-sm">{direction}</span>
            <span className="text-xs opacity-80 border-l border-opacity-30 pl-2 border-current">{label}</span>
        </div>
    );
}
