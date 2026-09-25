import React, { useMemo, useState } from "react";
import LeaveTable from "../components/LeaveTable";
import useLeaves from "../hooks/useLeaves";

export default function LeaveHistory() {
  const { leaves, loading } = useLeaves();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => leaves.filter(l =>
    (!type || l.leaveType?.code === type) &&
    (!status || l.status === status)
  ), [leaves, type, status]);

  return (
    <div>
      <div className="page-heading"><div><h2>My Leave History</h2><p>Track all your leave requests.</p></div></div>

      <div className="filter-card row g-3 mb-4">
        <div className="col-md-4">
          <label>Leave Type</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="CL">CL</option><option value="SL">SL</option>
            <option value="EL">EL</option><option value="PL">PL</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Status</label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="content-card">
        {loading ? <div className="loading">Loading...</div> : <LeaveTable leaves={filtered} />}
      </div>
    </div>
  );
}