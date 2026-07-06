import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation import
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Appbar({ showSection }) {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line
  const [user, setUser] = useState(null);
  const [activeLink, setActiveLink] = useState(location.pathname); // Initialize with current path

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    // Update activeLink when location changes
    setActiveLink(location.pathname);
  }, [location.pathname]); // Add location.pathname as dependency

  const toggleDropdown = () => {
    const dropdown = document.getElementById("profileDropdown");
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toggleDropdown();
  };

  // Update handleNavigation to be more direct
  const handleNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token && path !== "/") {
      showSection("login");
      return;
    }
    navigate(path);
    setActiveLink(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient-bg">
      <span
        className="navbar-brand"
        style={{ padding: "0.5rem", marginLeft: "1rem", fontSize: '25px' }}
      >
        Employee Management
      </span>
      <ul className="navbar-nav ms-auto d-flex align-items-center">
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "/" ? "active" : ""}`}
            id="homeLink"
            onClick={() => handleNavigation("/")}
          >
            <i className="fas fa-home"></i> Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeLink === "/employees" ? "active" : ""
            }`}
            id="employeesLink"
            onClick={() => handleNavigation("/employees")}
          >
            <i className="fa fa-address-card"></i> Employees
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeLink === "/about" ? "active" : ""}`}
            id="aboutUsLink"
            onClick={() => handleNavigation("/about")}
          >
            <i className="fas fa-users"></i> About Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={toggleDropdown}>
            <i className="fas fa-user"></i> Profile
          </a>
          <div className="profile-dropdown" id="profileDropdown">
            {user ? (
              <>
                <a>
                  <i className="fas fa-user-edit"></i> Edit Profile
                </a>
                <a onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => {
                    toggleDropdown();
                    showSection("login");
                  }}
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </a>
                <a
                  onClick={() => {
                    toggleDropdown();
                    showSection("signup");
                  }}
                >
                  <i className="fas fa-user-plus"></i> Signup
                </a>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
