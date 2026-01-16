import { supabase } from '@/lib/supabase'; // Make sure this path is correct based on your tsconfig
import { AnalysisResult } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { VerdictBadge } from '@/components/VerdictBadge';
import { ScoreCard } from '@/components/ScoreCard';
import { ThesisSection } from '@/components/ThesisSection';
import { InfoTile } from '@/components/InfoTile';
import { MarketBadge } from '@/components/MarketBadge';
import { DownloadBanner } from '@/components/DownloadBanner';

// Force dynamic rendering to ensure fresh data fetch
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    // Fetch just enough for metadata if possible, or fetch full
    const { data } = await supabase
        .from('shared_analyses')
        .select('payload')
        .eq('id', id)
        .single();

    const result = data?.payload as AnalysisResult | undefined;

    return {
        title: result ? `${result.ticker ?? 'Analysis'} - Quantify Report` : 'Quantify Analysis',
        description: result ? `View the detailed AI trading analysis for ${result.ticker} on Quantify.` : 'Professional AI Trading Analysis',
    };
}

export default async function SharePage({ params }: PageProps) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('shared_analyses')
        .select('payload')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error("Error fetching analysis:", error);
        notFound();
    }

    const result = data.payload as AnalysisResult;
    const ticker = result.ticker || "Analysis Result";

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
            {/* Header / Hero */}
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 p-6 pb-12 shadow-md">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            {result.market && <MarketBadge market={result.market} />}
                            <h1 className="text-4xl font-bold mt-2 tracking-tight">{ticker}</h1>
                        </div>
                        <VerdictBadge direction={result.stockStrategy.direction} />
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 -mt-6">
                {/* Scores */}
                <div className="flex bg-slate-800 rounded-2xl shadow-lg border border-slate-700 overflow-hidden mb-6">
                    <ScoreCard title="Macro Score" score={result.macroScore} />
                    <div className="w-px bg-slate-600 opacity-50 my-2"></div>
                    <ScoreCard title="Tech Score" score={result.techScore} />
                </div>

                {/* Stock Strategy */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3 text-purple-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        <h2 className="text-xl font-bold text-white">Stock Plan</h2>
                    </div>

                    <InfoTile title="Entry Zone" value={result.stockStrategy.entry} className="mb-3" />

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <InfoTile title="Target" value={result.stockStrategy.target} />
                        <InfoTile title="Stop Loss" value={result.stockStrategy.stop} />
                    </div>

                    <InfoTile title="Rationale" value={result.stockStrategy.rationale} className="mb-3" />
                    <InfoTile title="Invalidation" value={result.stockStrategy.invalidation} />
                </div>

                {/* Position Strategy (New) */}
                {result.positionStrategy && (
                    <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-200">Position Strategy</h3>
                        {/* Simplified view for web */}
                        <div className="space-y-2">
                            {result.positionStrategy.scaledEntry.length > 0 && (
                                <div>
                                    <span className="text-xs text-gray-400 uppercase">Entry Steps</span>
                                    <ul className="list-disc list-inside text-sm text-gray-300 pl-1 mt-1">
                                        {result.positionStrategy.scaledEntry.map((p, i) => (
                                            <li key={i}>{p.percentage}% @ {p.price} <span className="text-gray-500">({p.note})</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {result.positionStrategy.scaledExit.length > 0 && (
                                <div className="mt-2">
                                    <span className="text-xs text-gray-400 uppercase">Exit Steps</span>
                                    <ul className="list-disc list-inside text-sm text-gray-300 pl-1 mt-1">
                                        {result.positionStrategy.scaledExit.map((p, i) => (
                                            <li key={i}>{p.percentage}% @ {p.price} <span className="text-gray-500">({p.note})</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Option Strategy (if present) */}
                {result.optionStrategy && (
                    <div className="mb-8 opacity-80">
                        <div className="flex items-center gap-2 mb-3 text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <h2 className="text-lg font-bold text-white">Option Strategy</h2>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500">Strategy</div>
                                    <div className="font-medium">{result.optionStrategy.strategyType}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">Expiration</div>
                                    <div className="font-medium">{result.optionStrategy.expiration || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">Contract</div>
                                    <div className="font-medium">{result.optionStrategy.contract} {result.optionStrategy.strikes}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Thesis Sections */}
                <div className="space-y-4">
                    <ThesisSection title="Core Theme" items={[result.coreTheme]} color="border-purple-500" />
                    {result.marketCorrelation && <ThesisSection title="Market Correlation" items={[result.marketCorrelation]} color="border-cyan-500" />}

                    <ThesisSection title="Bull Case" items={result.bullCase} color="border-green-500" />
                    <ThesisSection title="Bear Case" items={result.bearCase} color="border-red-500" />
                    <ThesisSection title="Macro Environment" items={[result.macroComment]} color="border-blue-500" />
                    <ThesisSection title="Technical Analysis" items={[result.techComment]} color="border-orange-500" />
                </div>

                <div className="mt-8 text-center text-xs text-gray-500 px-4">
                    <p>Disclaimer: This analysis is AI-generated for informational purposes only. Trading involves risk.</p>
                </div>

            </div>

            <DownloadBanner />
        </div>
    );
}
