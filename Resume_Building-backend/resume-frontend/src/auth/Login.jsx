import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data);
    navigate("/dashboard");
  } catch (err) {
    alert("Login failed");
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>
        </form>
        <p style={{ marginTop: "12px", textAlign: "center" }}>
  Don’t have an account?{" "}
  <a href="/register">Register</a>
</p>
      </div>
    </div>
  );
}
