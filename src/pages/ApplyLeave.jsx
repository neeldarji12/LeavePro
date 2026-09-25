import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { validateLeave } from "../utils/validation";
import { calculateDays } from "../utils/leaveUtils";

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    leaveType: "", startDate: "", endDate: "", reason: "", halfDay: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get("/leave-types").then(res => setTypes(res.data));
  }, []);

  const submit = async e => {
    e.preventDefault();
    const validation = validateLeave(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      await api.post("/leave-requests", form);
      toast.success("Leave request submitted successfully");
      navigate("/history");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply leave");
    }
  };

  const days = calculateDays(form.startDate, form.endDate, form.halfDay);

  return (
    <div className="content-card form-card">
      <h3>Apply for Leave</h3>
      <p className="text-muted">Submit a new leave request.</p>

      <form onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label>Leave Type *</label>
            <select className="form-select" value={form.leaveType}
              onChange={e => setForm({...form, leaveType: e.target.value})}>
              <option value="">Select leave type</option>
              {types.map(t => <option key={t._id} value={t._id}>{t.name} ({t.code})</option>)}
            </select>
            {errors.leaveType && <small className="error">{errors.leaveType}</small>}
          </div>

          <div className="col-md-3">
            <label>Start Date *</label>
            <input className="form-control" type="date" value={form.startDate}
              onChange={e => setForm({...form, startDate: e.target.value})} />
            {errors.startDate && <small className="error">{errors.startDate}</small>}
          </div>

          <div className="col-md-3">
            <label>End Date *</label>
            <input className="form-control" type="date" value={form.endDate}
              onChange={e => setForm({...form, endDate: e.target.value})} />
            {errors.endDate && <small className="error">{errors.endDate}</small>}
          </div>

          <div className="col-12">
            <label>Reason *</label>
            <textarea className="form-control" rows="4" value={form.reason}
              onChange={e => setForm({...form, reason: e.target.value})}
              placeholder="Enter reason for leave..." />
            {errors.reason && <small className="error">{errors.reason}</small>}
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={form.halfDay}
                onChange={e => setForm({...form, halfDay: e.target.checked})} />
              <label className="form-check-label">Half Day</label>
            </div>
          </div>

          <div className="col-12">
            <div className="days-preview">Total Leave Days: <strong>{days > 0 ? days : 0}</strong></div>
          </div>
        </div>

        <div className="mt-4">
          <button type="button" className="btn btn-light me-2"
            onClick={() => setForm({leaveType:"",startDate:"",endDate:"",reason:"",halfDay:false})}>
            Reset
          </button>
          <button className="btn btn-primary">Apply Leave</button>
        </div>
      </form>
    </div>
  );
}