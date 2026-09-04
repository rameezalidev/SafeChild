import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();


    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found. Please signup first.");
      return;
    }

    if (email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {

      alert("Invalid email or password");
    }
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
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          onChange={(e)=>setPassword(e.target.value)}
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