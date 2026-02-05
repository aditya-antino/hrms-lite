import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";


export default function Dashboard() {
    const [employees, setEmployees] = useState([]);


    const fetchEmployees = async () => {
        const res = await API.get("/employees");
        setEmployees(res.data);
    };


    useEffect(() => {
        fetchEmployees();
    }, []);


    return (
        <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8 py-10">
            <EmployeeForm refresh={fetchEmployees} />
            <EmployeeList employees={employees} refresh={fetchEmployees} />
        </div>
    );
}