export function MarketBadge({ market }: { market: string }) {
    return (
        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white border border-white/20 mb-1">
            {market}
        </span>
    );
}
