import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "employee@company.com", password: "123456" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      navigate(res.data.user.role === "manager" ? "/manager" : "/employee");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">LEAVE<span>PRO</span></div>
        <h3>Welcome Back</h3>
        <p className="text-muted">Sign in to manage your leaves</p>

        <form onSubmit={login}>
          <label>Email</label>
          <input className="form-control mb-3" type="email" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} />

          <label>Password</label>
          <input className="form-control mb-3" type="password" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="demo-box mt-4">
          <strong>Demo Accounts</strong>
          <div>Employee: employee@company.com / 123456</div>
          <div>Manager: manager@company.com / 123456</div>
        </div>
      </div>
    </div>
  );
}