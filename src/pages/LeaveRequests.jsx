import React, { useMemo, useState } from "react";
import LeaveTable from "../components/LeaveTable";
import useLeaves from "../hooks/useLeaves";

export default function LeaveRequests() {
  const { leaves, loading } = useLeaves();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => leaves.filter(l => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.employee?.name?.toLowerCase().includes(q) ||
      l.leaveType?.name?.toLowerCase().includes(q) ||
      l.leaveType?.code?.toLowerCase().includes(q);

    return matchesSearch && (!status || l.status === status);
  }), [leaves, search, status]);

  return (
    <div>
      <div className="page-heading">
        <div><h2>Leave Requests</h2><p>Review and manage employee leave requests.</p></div>
      </div>

      <div className="filter-card row g-3 mb-4">
        <div className="col-md-6">
          <label>Search Employee / Leave Type</label>
          <input className="form-control" value={search}
            onChange={e => setSearch(e.target.value)} placeholder="Search..." />
        </div>
        <div className="col-md-3">
          <label>Status</label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="content-card">
        {loading ? <div className="loading">Loading...</div> : <LeaveTable leaves={filtered} manager />}
      </div>
    </div>
  );
}