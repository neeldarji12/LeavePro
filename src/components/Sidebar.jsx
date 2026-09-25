import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarPlus, FaHistory, FaBalanceScale, FaClipboardList, FaUsers, FaBuilding, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar({ user, closeMenu }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const link = (to, label, icon) => (
    <NavLink onClick={closeMenu} className="side-link" to={to}>
      {icon}<span>{label}</span>
    </NavLink>
  );

  return (
    <aside className="sidebar">
      <div className="brand">LEAVE<span>PRO</span></div>
      <div className="user-mini">
        <div className="avatar">{user?.name?.charAt(0)}</div>
        <div><strong>{user?.name}</strong><small>{user?.role}</small></div>
      </div>

      <nav>
        {user?.role === "employee" ? (
          <>
            {link("/employee", "Dashboard", <FaHome />)}
            {link("/apply-leave", "Apply Leave", <FaCalendarPlus />)}
            {link("/history", "Leave History", <FaHistory />)}
            {link("/balance", "Leave Balance", <FaBalanceScale />)}
          </>
        ) : (
          <>
            {link("/manager", "Dashboard", <FaHome />)}
            {link("/requests", "Leave Requests", <FaClipboardList />)}
            {link("/employees", "Employees", <FaUsers />)}
            {link("/departments", "Departments", <FaBuilding />)}
          </>
        )}
      </nav>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}