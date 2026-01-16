export function ThesisSection({ title, items, color }: { title: string; items: string[]; color: string }) {
    return (
        <div className="bg-slate-800 p-4 rounded-xl border-l-4 shadow-sm border-slate-700/50" style={{ borderLeftColor: 'transparent' /* Handled by tailwind class passed in color prop relative to border-l-4? No, usage was color="border-purple-500" which is tailwind class */ }}>
            <div className={`flex items-center gap-2 mb-2 ${color.replace('border-', 'text-')}`}>
                <div className={`w-1 h-4 rounded-full ${color.replace('border-', 'bg-')}`}></div>
                <h3 className="font-semibold text-white">{title}</h3>
            </div>
            <div className="space-y-2 pl-3">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-sm text-slate-300 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0"></span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
