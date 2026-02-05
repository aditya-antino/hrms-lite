import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

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

    const inputClasses = "w-full pl-3 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none bg-gray-50/50 focus:bg-white text-sm";
    const labelClasses = "block text-xs font-medium text-gray-500 mb-1 ml-1";

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
                    <p className="text-sm text-gray-500 mt-1">Enter the details of the new team member.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Employee ID</label>
                        <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="EMP-001" className={inputClasses} required />
                    </div>
                    <div>
                        <label className={labelClasses}>Full Name</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClasses} required />
                    </div>
                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClasses} required />
                    </div>
                    <div>
                        <label className={labelClasses}>Department</label>
                        <input name="department" value={form.department} onChange={handleChange} placeholder="Engineering" className={inputClasses} required />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all font-medium text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer">
                        <span>Add Employee</span>
                    </button>
                </div>
            </form>
        </div>
    );
}