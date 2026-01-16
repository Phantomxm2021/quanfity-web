import { StarIcon } from 'lucide-react';

export function ScoreCard({ title, score }: { title: string; score: number }) {
    const stars = 5;
    const filled = (score / 100) * stars;

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full">
            <span className="text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wide">{title}</span>
            <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                        key={i}
                        size={14}
                        className={i <= Math.ceil(filled) ? "fill-yellow-400 text-yellow-400" : "fill-gray-700 text-gray-700"}
                        fillOpacity={i <= filled ? 1 : i - filled < 1 && i - filled > 0 ? 0.5 : 0}
                    />
                ))}
            </div>
            <span className="text-2xl font-bold text-white">{(score / 20).toFixed(1)}</span>
        </div>
    );
}
