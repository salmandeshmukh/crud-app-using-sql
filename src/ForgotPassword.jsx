import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = "https://next.salmandeshmukh.com/php"; // your backend URL

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE}/forgot-password.php`, 
        new URLSearchParams({ email }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      if (response.data.status === 'success') {
        setMessage('Check your email for the reset link!');
        setTimeout(() => {
          navigate("/"); // Redirect to login page after a few seconds
        }, 3000);
      } else {
        setError(response.data.message || 'Error sending password reset email');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error("Forgot Password error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
