import React from "react";

export default function LeaveBalanceCard({ item }) {
  const percent = item.total ? Math.min((item.used / item.total) * 100, 100) : 0;

  return (
    <div className="balance-card">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{item.name}</strong>
          <div className="text-muted small">{item.code}</div>
        </div>
        <strong>{item.remaining}</strong>
      </div>
      <div className="progress my-3">
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="d-flex justify-content-between small text-muted">
        <span>Used: {item.used}</span>
        <span>Total: {item.total}</span>
      </div>
    </div>
  );
}