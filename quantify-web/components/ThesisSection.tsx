export function ThesisSection({ title, items, color }: { title: string; items: string[]; color: string }) {
    // Ignore color prop for minimalist theme, keep structure clean
    return (
        <div className="mb-6 last:mb-0">
            <h3 className="font-display font-medium text-base text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full opacity-50"></span>
                {title}
            </h3>

            <div className="pl-3 border-l border-white/10 space-y-2">
                {items.map((item, idx) => (
                    <p key={idx} className="text-sm text-neutral-300 leading-relaxed font-sans">{item}</p>
                ))}
            </div>
        </div>
    );
}
