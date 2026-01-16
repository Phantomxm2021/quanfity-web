export function InfoTile({ title, value, className = "" }: { title: string; value: string; className?: string }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">{title}</div>
            <div className="text-base font-normal text-white font-sans tracking-tight">
                {value}
            </div>
        </div>
    );
}
