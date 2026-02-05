import { Link } from "react-router-dom";
import API from "../services/api";

export default function EmployeeList({ employees, refresh }) {

    const deleteEmployee = async (id) => {
        if (!confirm("Are you sure you want to delete this employee?")) return;
        await API.delete(`/employees/${id}`);
        refresh();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {employees.map(emp => (
                            <tr key={emp._id} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="p-4 text-sm font-medium text-gray-900">{emp.employeeId}</td>
                                <td className="p-4 text-sm text-gray-700 font-medium">{emp.name}</td>
                                <td className="p-4 text-sm text-gray-500">{emp.email}</td>
                                <td className="p-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                        {emp.department}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-right space-x-3">
                                    <Link to={`/employee/${emp._id}`} className="text-indigo-600 hover:text-indigo-900 font-medium text-xs transition-colors">View</Link>
                                    <button onClick={() => deleteEmployee(emp._id)} className="text-red-500 hover:text-red-700 font-medium text-xs transition-colors">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-400 text-sm">
                                    No employees found. Add one above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}