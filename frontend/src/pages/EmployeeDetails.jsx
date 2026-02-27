import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import Loader from "../components/Loader";
import { ArrowLeft, Calendar, Save, History, ClipboardCheck, ChevronDown } from "lucide-react";

export default function EmployeeDetails() {
    const { id } = useParams();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("Present");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [employeeName, setEmployeeName] = useState("Employee");

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/attendance/${id}`);
            setRecords(res.data);
            if (res.data.length > 0 && res.data[0].employee) {
                setEmployeeName(res.data[0].employee.name);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    if (loading) return <Loader />;

    const markAttendance = async () => {
        try {
            await API.post("/attendance", {
                employeeId: id,
                date,
                status
            });

            setDate(new Date().toISOString().split('T')[0]);
            toast.success("Attendance marked successfully");
            fetchAttendance();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error marking attendance";
            toast.error(errorMessage);
        }
    };

    const inputClasses = "w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none bg-slate-50/50 focus:bg-white text-sm font-medium text-slate-700";
    const labelClasses = "block text-xs font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-wider";

    return (
        <div className="max-w-7xl mx-auto p-6 sm:px-8 lg:px-10 py-12">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-2xl transition-all shadow-premium group" title="Back to Dashboard">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                            {employeeName}
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">Attendance Information & Management</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Left Column: Mark Attendance */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100 sticky top-28 overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <ClipboardCheck size={100} className="text-indigo-600 rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                    <ClipboardCheck size={18} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Mark Attendance</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Selection Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Attendance Status</label>
                                    <div className="relative">
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className={inputClasses + " appearance-none cursor-pointer"}
                                        >
                                            <option>Present</option>
                                            <option>Absent</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={markAttendance}
                                    className="w-full mt-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 cursor-pointer group"
                                >
                                    <Save size={18} className="group-hover:scale-110 transition-transform" />
                                    <span>Save Record</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
                                    <History size={18} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    Attendance History
                                </h3>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recent Logs</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-50">
                                        <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Logged Date</th>
                                        <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {records.map(r => (
                                        <tr key={r._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <Calendar size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                                    <span className="text-sm font-bold text-slate-800">
                                                        {new Date(r.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ring-1 ${r.status === "Present"
                                                    ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
                                                    : "bg-rose-50 text-rose-600 ring-rose-100"
                                                    }`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {records.length === 0 && (
                                        <tr>
                                            <td colSpan="2" className="px-8 py-24 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                                                        <History size={32} className="text-slate-300" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 font-bold">No history available</p>
                                                        <p className="text-slate-400 text-sm mt-1 font-medium">Start marking attendance to see records here.</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}