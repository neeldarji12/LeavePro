import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaClock, FaHourglassHalf, FaCalendarAlt } from "react-icons/fa";
import api from "../services/api";
import LeaveCard from "../components/LeaveCard";
import LeaveTable from "../components/LeaveTable";
import LeaveBalanceCard from "../components/LeaveBalanceCard";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({});
  const [balance, setBalance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [s, b, l] = await Promise.all([
        api.get(`/dashboard/stats/${user.id}`),
        api.get(`/leave-requests/balance/${user.id}`),
        api.get("/leave-requests")
      ]);
      setStats(s.data); setBalance(b.data); setLeaves(l.data);
    };
    load();
  }, [user.id]);

  const total = balance.reduce((sum, x) => sum + x.total, 0);
  const used = balance.reduce((sum, x) => sum + x.used, 0);
  const remaining = balance.reduce((sum, x) => sum + x.remaining, 0);

  return (
    <>
      <div className="page-heading">
        <div><h2>Hello, {user.name} 👋</h2><p>Here is your leave overview.</p></div>
        <Link to="/apply-leave" className="btn btn-primary">+ Apply Leave</Link>
      </div>

      <div className="stats-grid">
        <LeaveCard title="Total Leaves" value={total} icon={<FaCalendarAlt />} />
        <LeaveCard title="Used Leaves" value={used} icon={<FaCalendarCheck />} />
        <LeaveCard title="Remaining" value={remaining} icon={<FaClock />} />
        <LeaveCard title="Pending Requests" value={stats.pendingRequests || 0} icon={<FaHourglassHalf />} />
      </div>

      <div className="section-title"><h5>Leave Balance</h5></div>
      <div className="balance-grid">
        {balance.map(item => <LeaveBalanceCard key={item.id} item={item} />)}
      </div>

      <div className="content-card mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Recent Leave Requests</h5>
          <Link to="/history">View all</Link>
        </div>
        <LeaveTable leaves={leaves.slice(0, 5)} />
      </div>
    </>
  );
}