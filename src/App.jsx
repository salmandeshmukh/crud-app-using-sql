import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./Login";
import CrudApp from "./CrudApp";

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
      const response = await axios.post(`${API_BASE}/login.php`,
        new URLSearchParams({ username, password }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

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

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <CrudApp /> : <Login onLogin={handleLogin} />} />
      <Route path="/CrudApp" element={isLoggedIn ? <CrudApp /> : <Login onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
