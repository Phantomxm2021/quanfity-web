export function InfoTile({ title, value, className = "" }: { title: string; value: string; className?: string }) {
    return (
        <div className={`bg-slate-800 bg-opacity-40 p-3 rounded-lg border border-slate-700 ${className}`}>
            <div className="text-xs text-slate-400 mb-1">{title}</div>
            <div className="text-sm font-medium text-slate-100">{value}</div>
        </div>
    );
}
