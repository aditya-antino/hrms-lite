import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}