import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import LeaveBalance from "./pages/LeaveBalance";
import LeaveDetails from "./pages/LeaveDetails";
import LeaveRequests from "./pages/LeaveRequests";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { return null; }
};

function ProtectedLayout() {
  const user = getUser();
  const [open, setOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      <div className={`sidebar-wrap ${open ? "show" : ""}`}>
        <Sidebar user={user} closeMenu={() => setOpen(false)} />
      </div>
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <main className="main-content">
        <Header title={user.role === "manager" ? "Manager Portal" : "Employee Portal"} setOpen={setOpen} />
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  );
}

function RoleRoute({ role, children }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={user.role === "manager" ? "/manager" : "/employee"} replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/employee" element={<RoleRoute role="employee"><EmployeeDashboard /></RoleRoute>} />
          <Route path="/apply-leave" element={<RoleRoute role="employee"><ApplyLeave /></RoleRoute>} />
          <Route path="/history" element={<RoleRoute role="employee"><LeaveHistory /></RoleRoute>} />
          <Route path="/balance" element={<RoleRoute role="employee"><LeaveBalance /></RoleRoute>} />
          <Route path="/manager" element={<RoleRoute role="manager"><ManagerDashboard /></RoleRoute>} />
          <Route path="/requests" element={<RoleRoute role="manager"><LeaveRequests /></RoleRoute>} />
          <Route path="/employees" element={<RoleRoute role="manager"><Employees /></RoleRoute>} />
          <Route path="/departments" element={<RoleRoute role="manager"><Departments /></RoleRoute>} />
          <Route path="/leave/:id" element={<LeaveDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}