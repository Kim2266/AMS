import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="topbar">
      <div className="greeting">
        <h2>Hello Doris</h2>
        <p>Good morning</p>
      </div>

      <div className="topbar-right">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="profile">
          <img src="/admin.jpeg" alt="Admin" />
          <div className="profile-meta">
            <span className="name">Doris B.</span>
            <span className="role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
