import { LucideIcon } from "lucide-react";

export function ScoreCard({ title, score, color = "", icon: Icon }: { title: string; score: number; color?: string; icon?: LucideIcon }) {
    // Convert 0-100 score to 0-5 stars
    const stars = Math.round(score / 20);
    const maxStars = 5;

    const variants: Record<string, { border: string; star: string; icon: string }> = {
        macro: { border: "border-cyan-500/30", star: "text-cyan-400", icon: "text-cyan-500" },
        tech: { border: "border-violet-500/30", star: "text-violet-400", icon: "text-violet-500" },
        default: { border: "border-white/10", star: "text-white", icon: "text-white/50" }
    };

    const style = variants[color] || variants.default;

    return (
        <div className={`flex flex-col p-4 bg-neutral-900/50 rounded-2xl border ${style.border}`}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    {Icon && <Icon className={`w-3.5 h-3.5 ${style.icon}`} />}
                    <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest">{title}</span>
                </div>
                <span className={`font-display font-medium text-lg text-white`}>{(score / 20).toFixed(1)}</span>
            </div>

            <div className="flex gap-1.5">
                {Array.from({ length: maxStars }).map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < stars ? `${style.star} fill-current` : "text-neutral-700 fill-none"}`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.76.742.34 1.108l-4.186 3.65a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.186-3.65c-.42-.366-.205-1.064.34-1.108l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                ))}
            </div>
        </div>
    );
}
