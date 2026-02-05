import { Link } from "react-router-dom";
import API from "../services/api";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function EmployeeList({ employees, refresh }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!employeeToDelete) return;
        try {
            await API.delete(`/employees/${employeeToDelete}`);
            refresh();
        } catch (error) {
            console.error("Failed to delete employee", error);
            alert("Failed to delete employee");
        } finally {
            setIsDialogOpen(false);
            setEmployeeToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDialogOpen(false);
        setEmployeeToDelete(null);
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
                                <td className="p-4 text-sm text-right space-x-2">
                                    <Link
                                        to={`/employee/${emp._id}`}
                                        className="inline-flex items-center px-3 py-1.5 border border-indigo-200 text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(emp._id)}
                                        className="inline-flex items-center px-3 py-1.5 border border-red-200 text-xs font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                                    >
                                        Delete
                                    </button>
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

            <ConfirmDialog
                isOpen={isDialogOpen}
                title="Delete Employee"
                message="Are you sure you want to delete this employee? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                confirmText="Delete"
                isDangerous={true}
            />
        </div>
    );
}