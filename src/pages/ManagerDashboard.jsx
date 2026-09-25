import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LeaveCard from "../components/LeaveCard";
import LeaveTable from "../components/LeaveTable";
import { FaUsers, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/leave-requests"), api.get("/users")])
      .then(([l, u]) => { setLeaves(l.data); setUsers(u.data); });
  }, []);

  return (
    <div>
      <div className="page-heading">
        <div><h2>Manager Dashboard</h2><p>Review employee leave activity.</p></div>
        <Link to="/requests" className="btn btn-primary">View Requests</Link>
      </div>

      <div className="stats-grid">
        <LeaveCard title="Employees" value={users.filter(u => u.role === "employee").length} icon={<FaUsers />} />
        <LeaveCard title="Pending" value={leaves.filter(l => l.status === "Pending").length} icon={<FaClock />} />
        <LeaveCard title="Approved" value={leaves.filter(l => l.status === "Approved").length} icon={<FaCheckCircle />} />
        <LeaveCard title="Rejected" value={leaves.filter(l => l.status === "Rejected").length} icon={<FaTimesCircle />} />
      </div>

      <div className="content-card mt-4">
        <h5>Recent Requests</h5>
        <LeaveTable leaves={leaves.slice(0, 8)} manager />
      </div>
    </div>
  );
}