import { RotateCw } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50 shadow-sm animate-bounce">
                    <RotateCw className="w-6 h-6 text-indigo-600 animate-spin transition-all" />
                </div>
                <div className="absolute -inset-4 bg-indigo-400/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 animate-pulse">Loading</p>
        </div>
    );
}
