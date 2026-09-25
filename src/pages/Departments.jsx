import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("/departments").then(res => setDepartments(res.data));
  }, []);

  return (
    <div>
      <div className="page-heading"><div><h2>Departments</h2><p>Department overview and employee counts.</p></div></div>
      <div className="row g-4">
        {departments.map(d => (
          <div className="col-md-6 col-lg-4" key={d._id}>
            <div className="content-card department-card">
              <h5>{d.name}</h5>
              <div className="display-6">{d.employeeCount}</div>
              <small className="text-muted">Employees</small>
              <div className="mt-3"><span className="badge text-bg-success">{d.status}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}