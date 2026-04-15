import api from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data || "Registration failed. Please try again.";
      alert(
        typeof msg === "string"
          ? msg
          : "Registration failed. Please try again.",
      );
      console.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-panel">
          <div>
            <span className="auth-eyebrow">Create account</span>
            <h1 className="auth-title">Start building resumes today</h1>
            <p className="auth-copy">
              Sign up to manage your resume library and export professional PDFs
              with ease.
            </p>
          </div>
          <div className="auth-badge">Resume Builder</div>
        </div>

        <form onSubmit={submit} className="auth-form">
          <div className="form-field">
            <label htmlFor="reg-email">Email Address</label>
            <div className="input-field">
              <span className="input-icon" aria-hidden="true">
                📧
              </span>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="reg-password">Password</label>
            <div className="input-field">
              <span className="input-icon" aria-hidden="true">
                🔒
              </span>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" /> Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
