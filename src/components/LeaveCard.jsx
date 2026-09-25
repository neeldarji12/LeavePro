import React from "react";

export default function LeaveCard({ title, value, icon, text }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {text && <small className="text-muted">{text}</small>}
      </div>
    </div>
  );
}