import { LucideIcon } from 'lucide-react';

export function ThesisSection({ title, items, color, icon: Icon }: { title: string; items: string[]; color: string; icon?: LucideIcon }) {
    const variants: Record<string, { dot: string; border: string; icon: string }> = {
        bull: { dot: "bg-emerald-500", border: "border-emerald-500/30", icon: "text-emerald-500" },
        bear: { dot: "bg-rose-500", border: "border-rose-500/30", icon: "text-rose-500" },
        macro: { dot: "bg-cyan-500", border: "border-cyan-500/30", icon: "text-cyan-500" },
        tech: { dot: "bg-violet-500", border: "border-violet-500/30", icon: "text-violet-500" },
        core: { dot: "bg-amber-500", border: "border-amber-500/30", icon: "text-amber-500" },
        correlation: { dot: "bg-sky-500", border: "border-sky-500/30", icon: "text-sky-500" },
        default: { dot: "bg-white opacity-50", border: "border-white/10", icon: "text-white/50" }
    };

    const style = variants[color] || variants.default;

    return (
        <div className="mb-6 last:mb-0">
            <h3 className="font-display font-medium text-base text-white mb-3 flex items-center gap-2">
                {Icon ? <Icon className={`w-4 h-4 ${style.icon}`} /> : <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>}
                {title}
            </h3>

            <div className={`pl-3 border-l ${style.border} space-y-2`}>
                {items.map((item, idx) => (
                    <p key={idx} className="text-sm text-neutral-300 leading-relaxed font-sans">{item}</p>
                ))}
            </div>
        </div>
    );
}
