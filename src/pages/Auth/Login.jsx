// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarCommon from "../../components/NavbarCommon";
import logo from "../../assets/navbar.png";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });

      const userData = res.data.user;
      const authToken = res.data.token;

      login(userData, authToken); // update context

      toast.success("✅ Login successful!");

      // Redirect immediately
      if (from) navigate(from, { replace: true });
      else if (userData.role === "admin") navigate("/admin", { replace: true });
      else if (userData.role === "instructor") navigate("/instructor", { replace: true });
      else if (userData.role === "trainee") navigate("/trainee", { replace: true });
      else navigate("/unauthorized", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.error || "❌ Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCommon />
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="text-center mb-3">
            <img src={logo} alt="Logo" />
            <h4 className="auth-title">Welcome Back 👋</h4>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShow((s) => !s)}
                >
                  <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-center mt-2">
              <Link to="/forgot" className="auth-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              className="btn w-100 mt-3 auth-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Signup */}
            <div className="text-center mt-3">
              <Link to="/signup" className="auth-link">
                Don’t have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </>
  );
}
