import { AlertTriangle, Info, X } from "lucide-react";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isDangerous = false }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] shadow-premium-xl max-w-sm w-full p-8 transform transition-all scale-100 animate-in zoom-in-95 duration-300 border border-slate-100 relative overflow-hidden group">
                {/* Decoration */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 ${isDangerous ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>

                <button
                    onClick={onCancel}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                >
                    <X size={18} />
                </button>

                <div className="mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center shadow-lg ${isDangerous ? 'bg-rose-50 text-rose-600 shadow-rose-500/10' : 'bg-indigo-50 text-indigo-600 shadow-indigo-500/10'
                        }`}>
                        {isDangerous ? <AlertTriangle size={28} /> : <Info size={28} />}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{title}</h3>
                    <p className="text-sm text-slate-500 mt-3 font-medium leading-relaxed">{message}</p>
                </div>

                <div className="flex flex-col gap-3 relative z-10">
                    <button
                        onClick={onConfirm}
                        className={`w-full py-4 text-sm font-bold text-white rounded-2xl focus:outline-none transition-all shadow-xl active:scale-[0.98] cursor-pointer ${isDangerous
                                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
                            }`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full py-4 text-sm font-bold text-slate-500 bg-slate-50 border border-transparent rounded-2xl hover:bg-slate-100 focus:outline-none transition-all cursor-pointer"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
