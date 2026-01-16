export function DownloadBanner() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4 pb-6 z-50">
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                <div>
                    <div className="font-bold text-white">Quantify</div>
                    <div className="text-xs text-gray-400">AI-Powered Trading Assistant</div>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-gray-100 transition-colors">
                    Get the App
                </button>
            </div>
        </div>
    );
}
