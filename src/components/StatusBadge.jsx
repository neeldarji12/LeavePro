import React from "react";
import { statusClass } from "../utils/leaveUtils";

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass(status)}`}>{status}</span>;
}