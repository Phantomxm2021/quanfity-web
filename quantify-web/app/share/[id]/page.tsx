import { supabase } from '@/lib/supabase';
import { AnalysisResult } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { VerdictBadge } from '@/components/VerdictBadge';
import { ScoreCard } from '@/components/ScoreCard';
import { ThesisSection } from '@/components/ThesisSection';
import { InfoTile } from '@/components/InfoTile';
import { MarketBadge } from '@/components/MarketBadge';
import { DownloadBanner } from '@/components/DownloadBanner';
import { getDictionary } from '@/lib/i18n';
import {
    Globe,
    Activity,
    Target,
    PieChart,
    Zap,
    Lightbulb,
    ArrowLeftRight,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const dict = await getDictionary();

    const { data } = await supabase
        .from('shared_analyses')
        .select('payload')
        .eq('id', id)
        .single();

    const result = data?.payload as AnalysisResult | undefined;
    const ticker = result?.ticker || dict.header.analysis;

    return {
        title: `${ticker} // ${dict.metaTitle}`,
        description: dict.metaDesc,
        openGraph: {
            title: `${ticker} // ${dict.metaTitle}`,
            description: dict.metaDesc,
            images: [
                {
                    url: '/AppIcon_Chart.png',
                    width: 512,
                    height: 512,
                    alt: ticker,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${ticker} // ${dict.metaTitle}`,
            description: dict.metaDesc,
            images: ['/AppIcon_Chart.png'],
        },
    };
}

import { ViewTracker } from '@/components/ViewTracker';
import { ReactionButtons } from '@/components/ReactionButtons';

export default async function SharePage({ params }: PageProps) {
    const { id } = await params;
    const dict = await getDictionary();

    const { data: shareData, error: shareError } = await supabase
        .from('shared_analyses')
        .select('payload, user_id')
        .eq('id', id)
        .single();

    if (shareError || !shareData) {
        console.error("Error fetching analysis:", shareError);
        notFound();
    }

    const result = shareData.payload as AnalysisResult;

    // Fetch user profile if user_id is available
    let dynamicUserInfo = result.userInfo;

    if (shareData.user_id) {
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('nickname, avatar_url')
            .eq('id', shareData.user_id)
            .maybeSingle();

        if (profileData) {
            dynamicUserInfo = {
                nickname: profileData.nickname || (dynamicUserInfo?.nickname ?? dict.common.trader),
                avatarUrl: profileData.avatar_url || dynamicUserInfo?.avatarUrl
            };
        } else if (profileError) {
            console.warn("Profile lookup failed for user_id:", shareData.user_id, profileError);
        }
    }

    if (!dynamicUserInfo) {
        // Final fallback if no info from payload or DB
        dynamicUserInfo = {
            nickname: dict.common.trader
        };
    }

    const ticker = result.ticker || "UNKNOWN";
    const userInfo = dynamicUserInfo;

    return (
        <div className="min-h-screen bg-black pb-32 font-sans selection:bg-white selection:text-black">
            <div className="max-w-xl mx-auto px-4 sm:px-6 pt-12">

                {/* Header */}
                <header className="mb-12 text-left">
                    {result.market && <MarketBadge market={result.market} />}

                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-white leading-none">
                            {ticker}
                        </h1>
                        <div className="flex flex-col items-end space-y-3">
                            <VerdictBadge direction={result.stockStrategy.direction} labels={dict.verdict} />

                            {userInfo && (
                                <div className="flex items-center space-x-2 bg-neutral-900/40 w-fit px-2.5 py-1 rounded-full border border-white/5">
                                    <div className="w-5 h-5 rounded-full overflow-hidden bg-neutral-800 border border-white/10">
                                        {userInfo.avatarUrl ? (
                                            <img src={userInfo.avatarUrl} alt={userInfo.nickname} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-neutral-500 font-mono">
                                                {userInfo.nickname.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-neutral-400 font-medium font-display tracking-tight">{userInfo.nickname}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <ScoreCard title={dict.scores.macro} score={result.macroScore} color="macro" icon={Globe} />
                    <ScoreCard title={dict.scores.tech} score={result.techScore} color="tech" icon={Activity} />
                </div>

                {/* Strategy Cards Container */}
                <div className="space-y-8 mb-16">

                    {/* Stock Strategy Card */}
                    <div className="bg-neutral-900/40 rounded-3xl border border-indigo-500/20 p-6 overflow-hidden relative">
                        {/* Decorative Top Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/30"></div>

                        <h2 className="text-sm font-mono uppercase tracking-widest mb-6 text-white pb-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-indigo-400" />
                                {dict.strategy.title}
                            </div>
                            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                        </h2>

                        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 mb-8">
                            <InfoTile title={dict.strategy.entry} value={result.stockStrategy.entry} className="col-span-2" />
                            <InfoTile title={dict.strategy.target} value={result.stockStrategy.target} />
                            <InfoTile title={dict.strategy.stop} value={result.stockStrategy.stop} className="text-neutral-400" />
                        </div>

                        <div className="space-y-6 bg-neutral-900/60 rounded-xl p-4 border border-white/5">
                            <div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">{dict.strategy.rationale}</div>
                                <p className="text-sm text-neutral-300 leading-relaxed">{result.stockStrategy.rationale}</p>
                            </div>
                            <div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">{dict.strategy.invalidation}</div>
                                <p className="text-xs text-neutral-400 leading-relaxed font-mono">{result.stockStrategy.invalidation}</p>
                            </div>
                        </div>
                    </div>

                    {/* Position Strategy Card */}
                    {result.positionStrategy && (
                        <div className="bg-neutral-900/40 rounded-3xl border border-fuchsia-500/20 p-6 relative">
                            <h2 className="text-sm font-mono uppercase tracking-widest mb-6 text-white pb-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PieChart className="w-4 h-4 text-fuchsia-400" />
                                    {dict.position.title}
                                </div>
                                <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]"></span>
                            </h2>

                            {/* Summary */}
                            {result.positionStrategy.summary && (
                                <div className="mb-6 p-4 bg-neutral-900/60 rounded-xl border border-white/5">
                                    <h3 className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">{dict.position.summary}</h3>
                                    <p className="text-sm text-neutral-300 leading-relaxed font-mono">{result.positionStrategy.summary}</p>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xs font-mono text-neutral-500 mb-3 uppercase tracking-wider">{dict.position.entry}</h3>
                                    <div className="space-y-2">
                                        {result.positionStrategy.scaledEntry.map((level, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm font-mono border-b border-white/5 pb-1 last:border-0">
                                                <span className="text-white">{level.price}</span>
                                                <span className="text-neutral-400">{level.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                    {result.positionStrategy.averageCost && (
                                        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs font-bold text-white uppercase tracking-widest">
                                            <span>{dict.position.cost}</span>
                                            <span>{result.positionStrategy.averageCost}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xs font-mono text-neutral-500 mb-3 uppercase tracking-wider">{dict.position.exit}</h3>
                                    <div className="space-y-2">
                                        {result.positionStrategy.scaledExit.map((level, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm font-mono border-b border-white/5 pb-1 last:border-0">
                                                <span className="text-white">{level.price}</span>
                                                <span className="text-neutral-400">{level.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Option Strategy Card */}
                    {result.optionStrategy && (
                        <div className="bg-neutral-900/40 rounded-3xl border border-orange-500/20 p-6 relative">
                            <h2 className="text-sm font-mono uppercase tracking-widest mb-6 text-white pb-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-orange-400" />
                                    {dict.option.title}
                                </div>
                                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                            </h2>

                            <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6">
                                <InfoTile title={dict.option.contract} value={result.optionStrategy.contract} className="col-span-2" />

                                {result.optionStrategy.expiration && (
                                    <InfoTile title={dict.option.expiration} value={result.optionStrategy.expiration} />
                                )}
                                <InfoTile title={dict.option.strategy} value={result.optionStrategy.strategyType} />

                                <div className="col-span-2 border-t border-white/5 my-2"></div>

                                <InfoTile title={dict.strategy.entry} value={result.optionStrategy.entry} />
                                <InfoTile title={dict.strategy.target} value={result.optionStrategy.target} />
                                <InfoTile title={dict.strategy.stop} value={result.optionStrategy.stop} className="text-neutral-400" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Thesis Sections - Cards */}
                <div className="space-y-6">
                    <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                        <ThesisSection title={dict.thesis.core} items={[result.coreTheme]} color="core" icon={Lightbulb} />
                    </div>

                    {result.marketCorrelation && (
                        <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                            <ThesisSection title={dict.thesis.correlation} items={[result.marketCorrelation]} color="correlation" icon={ArrowLeftRight} />
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                            <ThesisSection title={dict.thesis.bull} items={result.bullCase} color="bull" icon={TrendingUp} />
                        </div>
                        <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                            <ThesisSection title={dict.thesis.bear} items={result.bearCase} color="bear" icon={TrendingDown} />
                        </div>
                    </div>

                    <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                        <ThesisSection title={dict.thesis.macro} items={[result.macroComment]} color="macro" icon={Globe} />
                    </div>
                    <div className="bg-neutral-900/20 rounded-2xl p-6 border border-white/5">
                        <ThesisSection title={dict.thesis.tech} items={[result.techComment]} color="tech" icon={Activity} />
                    </div>
                </div>

                <ReactionButtons shareId={id} dict={dict.reaction} />

                <div className="mt-24 text-left border-t border-white/10 pt-8 pb-4">
                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
                        {dict.footer.generatedBy}
                    </p>
                    <p className="text-[10px] text-neutral-700 mt-2 max-w-xs">
                        {dict.footer.disclaimer}
                    </p>
                </div>

            </div>

            <DownloadBanner dict={dict.banner} />
            <ViewTracker shareId={id} />
        </div>
    );
}
