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
        <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8 py-10">
            <EmployeeForm refresh={fetchEmployees} />
            <EmployeeList employees={employees} refresh={fetchEmployees} />
        </div>
    );
}