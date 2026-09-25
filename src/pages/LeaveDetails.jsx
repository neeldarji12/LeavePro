import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import { formatDate } from "../utils/leaveUtils";

export default function LeaveDetails() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  const load = () => api.get(`/leave-requests/${id}`).then(res => setLeave(res.data));

  useEffect(() => { load(); }, [id]);

  const action = async status => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this leave?`)) return;
    try {
      await api.put(`/leave-requests/${id}/${status.toLowerCase()}`);
      toast.success(`Leave ${status.toLowerCase()} successfully`);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  if (!leave) return <div className="loading">Loading...</div>;

  return (
    <div className="content-card details-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h3>Leave Details</h3><p className="text-muted">Request #{leave._id}</p></div>
        <StatusBadge status={leave.status} />
      </div>

      <div className="details-grid">
        <div><small>Employee</small><strong>{leave.employee?.name}</strong></div>
        <div><small>Email</small><strong>{leave.employee?.email}</strong></div>
        <div><small>Leave Type</small><strong>{leave.leaveType?.name} ({leave.leaveType?.code})</strong></div>
        <div><small>Total Days</small><strong>{leave.totalDays}</strong></div>
        <div><small>Start Date</small><strong>{formatDate(leave.startDate)}</strong></div>
        <div><small>End Date</small><strong>{formatDate(leave.endDate)}</strong></div>
        <div><small>Applied On</small><strong>{formatDate(leave.createdAt)}</strong></div>
        <div><small>Approver</small><strong>{leave.approvedBy?.name || "Not assigned"}</strong></div>
      </div>

      <div className="reason-box mt-4">
        <small>Reason</small>
        <p>{leave.reason}</p>
      </div>

      {user.role === "manager" && leave.status === "Pending" && (
        <div className="mt-4">
          <button className="btn btn-success me-2" onClick={() => action("Approved")}>Approve</button>
          <button className="btn btn-danger" onClick={() => action("Rejected")}>Reject</button>
        </div>
      )}

      <button className="btn btn-light mt-4" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}