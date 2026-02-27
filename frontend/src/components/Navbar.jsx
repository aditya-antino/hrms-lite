import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="glass sticky top-0 z-50 border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                                HRMS <span className="text-indigo-600">Lite</span>
                            </h1>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Management System</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-6">
                        {location.pathname !== "/" && (
                            <Link
                                to="/"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all active:scale-95 shadow-sm"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}