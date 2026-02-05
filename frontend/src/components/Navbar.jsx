import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            HRMS Lite
                        </h1>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        {location.pathname !== "/" && (
                            <Link
                                to="/"
                                className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition-colors shadow-sm cursor-pointer"
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