export function MarketBadge({ market }: { market: string }) {
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-black mb-4 tracking-widest uppercase">
            {market}
        </span>
    );
}
