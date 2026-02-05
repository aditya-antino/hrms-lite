import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

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
            fetchAttendance();
        } catch {
            alert("Error marking attendance. (Ensure employee has at least one record or logic is updated)");
        }
    };

    const inputClasses = "w-full pl-3 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-gray-50/50 focus:bg-white text-sm";
    const labelClasses = "block text-xs font-medium text-gray-500 mb-1 ml-1";

    return (
        <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center justify-center p-2 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:text-indigo-600 rounded-xl transition-all shadow-sm cursor-pointer" title="Back to Dashboard">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Mark Attendance */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Mark Attendance</h2>
                        <p className="text-sm text-gray-500 mb-6">Record attendance for this employee.</p>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Date</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} max={new Date().toISOString().split('T')[0]} className={inputClasses} />
                            </div>

                            <div>
                                <label className={labelClasses}>Status</label>
                                <div className="relative">
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClasses + " appearance-none"}>
                                        <option>Present</option>
                                        <option>Absent</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <button onClick={markAttendance} className="w-full mt-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all font-medium text-sm shadow-lg shadow-indigo-600/20 cursor-pointer">
                                Save Record
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <h3 className="p-6 text-lg font-bold text-gray-900 border-b border-gray-100 bg-gray-50/50">
                            Attendance History
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {records.map(r => (
                                        <tr key={r._id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="p-4 text-sm font-medium text-gray-900">
                                                {new Date(r.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.status === "Present"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                                    }`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {records.length === 0 && (
                                        <tr>
                                            <td colSpan="2" className="p-8 text-center text-gray-400 text-sm">
                                                No attendance records found.
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