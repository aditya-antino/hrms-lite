import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { User, Mail, Briefcase, Hash, Plus } from "lucide-react";

export default function EmployeeForm({ refresh }) {
    const [form, setForm] = useState({
        employeeId: "",
        name: "",
        email: "",
        department: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/employees", form);
            toast.success("Employee added successfully");
            setForm({ employeeId: "", name: "", email: "", department: "" });
            refresh();
        } catch (err) {
            toast.error(err.response?.data?.error || "Error adding employee");
        }
    };

    const inputClasses = "w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none bg-slate-50/50 focus:bg-white text-sm font-medium text-slate-700 placeholder:text-slate-400";
    const labelClasses = "block text-xs font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-wider";
    const iconClasses = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors";

    return (
        <div className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Plus size={120} className="text-indigo-600 rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Employee</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Build your team by adding new members here.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="group">
                            <label className={labelClasses}>Employee ID</label>
                            <div className="relative">
                                <Hash className={iconClasses} />
                                <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="EMP-001" className={inputClasses} required />
                            </div>
                        </div>
                        <div className="group">
                            <label className={labelClasses}>Full Name</label>
                            <div className="relative">
                                <User className={iconClasses} />
                                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClasses} required />
                            </div>
                        </div>
                        <div className="group">
                            <label className={labelClasses}>Email Address</label>
                            <div className="relative">
                                <Mail className={iconClasses} />
                                <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} required />
                            </div>
                        </div>
                        <div className="group">
                            <label className={labelClasses}>Department</label>
                            <div className="relative">
                                <Briefcase className={iconClasses} />
                                <input name="department" value={form.department} onChange={handleChange} placeholder="Engineering" className={inputClasses} required />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center gap-2.5 cursor-pointer group">
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>Add Employee</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}