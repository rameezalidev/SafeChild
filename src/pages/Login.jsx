import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function getUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  return Array.isArray(storedUsers) ? storedUsers : [];
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = getUsers();
    const foundUser = users.find(
      (user) => user.email?.toLowerCase() === email.trim().toLowerCase() && user.password === password
    );

    if (!users.length) {
      alert("No account found. Please signup first.");
      return;
    }

    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", foundUser.email);
      navigate("/dashboard");
      return;
    }

    alert("Invalid email or password");
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="header">
        <h2>
          SafeChild<span>QR</span>
        </h2>

        <h2>Welcome Back</h2>
        <p>Login to manage your children's safety</p>
      </div>

      <div className="content">
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <button type="submit">Login</button>

      <hr />

      <div className="footer">
        <p>
          Don't have an account?
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default Login;