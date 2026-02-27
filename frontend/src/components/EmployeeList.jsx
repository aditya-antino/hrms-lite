import { Link } from "react-router-dom";
import API from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "./ConfirmDialog";
import { Eye, Trash2, Users } from "lucide-react";

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
            toast.success("Employee deleted successfully");
            refresh();
        } catch (error) {
            console.error("Failed to delete employee", error);
            toast.error("Failed to delete employee");
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
        <div className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">ID</th>
                            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Employee Details</th>
                            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em]">Department</th>
                            <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {employees.map(emp => (
                            <tr key={emp._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-5 text-sm font-bold text-slate-900">{emp.employeeId}</td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800">{emp.name}</span>
                                        <span className="text-xs text-slate-400 font-medium">{emp.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm text-slate-500">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 uppercase tracking-tighter">
                                        {emp.department}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link
                                            to={`/employee/${emp._id}`}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95 group/btn relative"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(emp._id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95 group/btn relative"
                                            title="Delete Employee"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                            <Users size={32} className="text-slate-300" />
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-bold">No employees found</p>
                                            <p className="text-slate-400 text-sm mt-1">Add your first team member above.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmDialog
                isOpen={isDialogOpen}
                title="Remove Employee"
                message="Are you sure you want to remove this employee? Their data will be permanently deleted."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                confirmText="Confirm Removal"
                isDangerous={true}
            />
        </div>
    );
}