'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

interface ReactionButtonsProps {
    shareId: string;
    dict: {
        question: string;
        thanks: string;
    };
}

export function ReactionButtons({ shareId, dict }: ReactionButtonsProps) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
    const [isVoting, setIsVoting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const storageKey = `vote_${shareId}`;

    useEffect(() => {
        const fetchData = async () => {
            // Get local vote
            const savedVote = localStorage.getItem(storageKey);
            if (savedVote === 'like' || savedVote === 'dislike') {
                setUserVote(savedVote);
            }

            // Get counts from Supabase
            const { data, error } = await supabase
                .from('share_reactions')
                .select('reaction_type');

            if (!error && data) {
                // We filter by share_id in a real scenario, but Supabase standard practice 
                // is to use a count query or filter. Let's filter here.
                const filtered = data // Note: In production, better to use .eq('share_id', shareId) in the query

                // Fetch only for this shareId
                const { data: counts, error: countError } = await supabase
                    .from('share_reactions')
                    .select('reaction_type')
                    .eq('share_id', shareId);

                if (!countError && counts) {
                    setLikes(counts.filter(r => r.reaction_type === 'like').length);
                    setDislikes(counts.filter(r => r.reaction_type === 'dislike').length);
                }
            }
            setIsLoading(false);
        };

        fetchData();
    }, [shareId, storageKey]);

    const handleVote = async (type: 'like' | 'dislike') => {
        if (userVote || isVoting) return;

        setIsVoting(true);
        const { error } = await supabase.from('share_reactions').insert({
            share_id: shareId,
            reaction_type: type,
            fingerprint: typeof window !== 'undefined' ? window.navigator.userAgent : null
        });

        if (!error) {
            if (type === 'like') setLikes(prev => prev + 1);
            else setDislikes(prev => prev + 1);

            setUserVote(type);
            localStorage.setItem(storageKey, type);
        }
        setIsVoting(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 text-neutral-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 py-12 border-t border-white/5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">
                {dict.question}
            </h4>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleVote('like')}
                    disabled={userVote !== null || isVoting}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all active:scale-95 ${userVote === 'like'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
                        } disabled:cursor-default`}
                >
                    <ThumbsUp className={`w-4 h-4 ${userVote === 'like' ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`} />
                    <span className="text-sm font-medium font-display">{likes}</span>
                </button>

                <button
                    onClick={() => handleVote('dislike')}
                    disabled={userVote !== null || isVoting}
                    className={`group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all active:scale-95 ${userVote === 'dislike'
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                        : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
                        } disabled:cursor-default`}
                >
                    <ThumbsDown className={`w-4 h-4 ${userVote === 'dislike' ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`} />
                    <span className="text-sm font-medium font-display">{dislikes}</span>
                </button>
            </div>

            {userVote && (
                <p className="text-[10px] text-neutral-600 font-sans italic">
                    {dict.thanks}
                </p>
            )}
        </div>
    );
}
