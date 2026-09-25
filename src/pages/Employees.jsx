import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Employees() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data.filter(u => u.role === "employee")));
  }, []);

  const filtered = users.filter(u =>
    `${u.name} ${u.email} ${u.department?.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-heading"><div><h2>Employees</h2><p>View employee information.</p></div></div>
      <div className="content-card">
        <input className="form-control mb-4" placeholder="Search employee..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.department?.name}</td><td>{u.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}