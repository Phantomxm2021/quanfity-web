import { Flame, Sparkles } from 'lucide-react';

interface EngagementStatsProps {
    views: number;
    approvalRate: number | null;
    dict: {
        views: string;
        approval: string;
    };
}

export function EngagementStats({ views, approvalRate, dict }: EngagementStatsProps) {
    if (views === 0) return null;

    return (
        <div className="flex items-center gap-4 text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-4">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/5 border border-orange-500/10">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="text-neutral-300">{views.toLocaleString()}</span>
                <span>{dict.views}</span>
            </div>

            {approvalRate !== null && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span className="text-neutral-300">{approvalRate}%</span>
                    <span>{dict.approval}</span>
                </div>
            )}
        </div>
    );
}
