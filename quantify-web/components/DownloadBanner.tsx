export function DownloadBanner({ dict }: { dict: { title: string; subtitle: string; button: string } }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-md mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        <img src="/AppIcon_Chart.png" alt="Quantify App Icon" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-display font-bold text-white text-sm">{dict.title}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{dict.subtitle}</div>
                    </div>
                </div>
                <a href="https://quantify.phantomsxr.com/" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-lg text-xs font-bold transition-colors">
                    {dict.button}
                </a>
            </div>
        </div>
    );
}
