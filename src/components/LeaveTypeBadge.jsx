import React from "react";

export default function LeaveTypeBadge({ type }) {
  return <span className="leave-type-badge">{type?.code || "-"}</span>;
}