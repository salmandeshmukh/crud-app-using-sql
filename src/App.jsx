import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup"; // Import your SignUp component
import CrudApp from "./CrudApp";
import ForgotPassword from "./ForgotPassword";
import Footer from "./Footer";

const API_BASE = "https://next.salmandeshmukh.com/php";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_BASE}/login.php`,
        new URLSearchParams({ username, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.status === "success") {
        setIsLoggedIn(true); // ✅ update state
        localStorage.setItem("isLoggedIn", "true"); // ✅ persist login
        navigate("/CrudApp"); // ✅ redirect to CrudApp
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login state
    setIsLoggedIn(false); // Update the login state
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
    <Routes>
  {/* Route for login or home page */}
  <Route
    path="/"
    element={isLoggedIn ? <CrudApp onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
  />

  {/* Route for CRUD page (optional, can use this for direct access) */}
  <Route
    path="/CrudApp"
    element={isLoggedIn ? <CrudApp onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
  />

  {/* Route for login page */}
  <Route path="/login" element={<Login />} />

  {/* Route for registration page */}
  <Route path="/register" element={<SignUp />} />

  {/* Route for forgot password page */}
  <Route path="/forgot-password" element={<ForgotPassword/>} />
</Routes>

<Footer />

</>

  );
}

export default App;
