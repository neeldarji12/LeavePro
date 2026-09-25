import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import LeaveTypeBadge from "./LeaveTypeBadge";
import { formatDate } from "../utils/leaveUtils";

export default function LeaveTable({ leaves, manager = false }) {
  if (!leaves.length) {
    return <div className="empty-box">No leave requests found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            {manager && <th>Employee</th>}
            <th>Type</th>
            <th>Date Range</th>
            <th>Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave._id}>
              {manager && <td><strong>{leave.employee?.name}</strong></td>}
              <td>
                <LeaveTypeBadge type={leave.leaveType} />{" "}
                {leave.leaveType?.name}
              </td>
              <td>{formatDate(leave.startDate)} - {formatDate(leave.endDate)}</td>
              <td>{leave.totalDays}</td>
              <td><StatusBadge status={leave.status} /></td>
              <td>
                <Link className="btn btn-sm btn-outline-primary" to={`/leave/${leave._id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}