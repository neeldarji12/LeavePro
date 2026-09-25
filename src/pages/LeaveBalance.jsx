import React, { useEffect, useState } from "react";
import api from "../services/api";
import LeaveBalanceCard from "../components/LeaveBalanceCard";

export default function LeaveBalance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    api.get(`/leave-requests/balance/${user.id}`).then(res => setBalance(res.data));
  }, [user.id]);

  return (
    <div>
      <div className="page-heading">
        <div><h2>Leave Balance</h2><p>Current year leave entitlement and usage.</p></div>
      </div>

      <div className="balance-grid">
        {balance.map(item => <LeaveBalanceCard key={item.id} item={item} />)}
      </div>

      <div className="content-card mt-4">
        <h5>Leave Balance Policy</h5>
        <p className="text-muted">Your leave balance is deducted only after a manager approves the request.</p>
        <ul>
          <li>Casual Leave (CL): 7 days / year</li>
          <li>Sick Leave (SL): 5 days / year</li>
          <li>Earned Leave (EL): 10 days / year</li>
          <li>Privilege Leave (PL): 5 days / year</li>
        </ul>
      </div>
    </div>
  );
}