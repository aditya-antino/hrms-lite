import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import Loader from "../components/Loader";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await API.get("/employees");
            setEmployees(res.data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto p-6 sm:px-8 lg:px-10 py-12">
            <header className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Dashboard Overview
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                    Welcome back! Here's what's happening with your team today.
                </p>
            </header>

            <div className="space-y-10">
                <section>
                    <EmployeeForm refresh={fetchEmployees} />
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Team Members</h3>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-indigo-100 uppercase tracking-wider">
                            {employees.length} Total
                        </span>
                    </div>
                    <EmployeeList employees={employees} refresh={fetchEmployees} />
                </section>
            </div>
        </div>
    );
}