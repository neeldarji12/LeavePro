import React from "react";
import { FaBars } from "react-icons/fa";

export default function Header({ title, setOpen }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setOpen(true)}><FaBars /></button>
      <h5>{title}</h5>
      <div className="topbar-right">Employee Leave Management</div>
    </header>
  );
}