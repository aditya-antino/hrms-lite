export default function Loader() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative">
                <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
                <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-indigo-200 animate-pulse opacity-50"></div>
            </div>
        </div>
    );
}
