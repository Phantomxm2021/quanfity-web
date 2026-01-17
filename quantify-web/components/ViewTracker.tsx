'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ViewTrackerProps {
    shareId: string;
}

export function ViewTracker({ shareId }: ViewTrackerProps) {
    useEffect(() => {
        const trackView = async () => {
            // Basic bot detection
            const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
            if (isBot) return;

            // Detect device type
            let deviceType = 'desktop';
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                deviceType = 'tablet';
            } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                deviceType = 'mobile';
            }

            try {
                await supabase.from('share_analytics').insert({
                    share_id: shareId,
                    user_agent: navigator.userAgent,
                    referrer: document.referrer || null,
                    device_type: deviceType,
                    browser_language: navigator.language,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                });
            } catch (error) {
                console.error('Failed to log analytics:', error);
            }
        };

        // Delay slightly to ensure page load feels snappy and avoid double counts in strict dev modes
        const timer = setTimeout(trackView, 1000);
        return () => clearTimeout(timer);
    }, [shareId]);

    return null; // This component doesn't render anything
}
