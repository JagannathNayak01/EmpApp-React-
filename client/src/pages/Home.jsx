import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Appbar from "./Appbar";
import Footer from "./Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const showSection = (section) => {
    setActiveSection(section);
    setError(""); // Clear any previous errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Fetch user's specific data
      const userDataResponse = await fetch(`http://localhost:3000/users/${data.user._id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        setUserData(userData);
      }

      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect or update UI
      window.location.href = "/"; // Assuming you have an employees page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  };

  return (
    <div>
      <Appbar showSection={showSection} />
      <div className="container">
        <div id="homeSection">
          <div className="home-content">
            <h1 className="floating-text">
              Welcome to Employee Management System
            </h1>
            <p className="sub-text floating-text-2">Manage your employees smartly & efficiently</p>
            <h2>{user
                ? `Welcome ${user.username || 'User'}`
                : " "
                }</h2>
            {!user && (
              <>
                <button className="glass-btn" onClick={() => showSection("login")}>
                  Login / Register
                </button>
              </>
            )}

          </div>
        </div>
        <div
          className={`auth-form ${activeSection === "login" ? "show" : ""}`}
          id="loginForm"
        >
          <div className="close-btn" onClick={() => showSection("")}>
            &times;
          </div>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span className="link mb-2 ml-2">Forgot Password?</span>
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="link" onClick={() => showSection("signup")}>
            Register here
          </div>
          <div className="social-icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
        <div
          className={`auth-form ${activeSection === "signup" ? "show" : ""}`}
          id="signupForm"
        >
          <div className="close-btn" onClick={() => showSection("")}>
            &times;
          </div>
          <h2>Signup</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <button type="submit">Signup</button>
          </form>
          <div className="link" onClick={() => showSection("login")}>
            Already have an account? Login
          </div>
          <div className="social-icons">
            <i className="fab fa-google"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
