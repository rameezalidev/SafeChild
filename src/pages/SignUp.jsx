import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  emergencyContact: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };

    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
      };

    case "SET_EMERGENCY_CONTACT":
      return {
        ...state,
        emergencyContact: action.payload,
      };

    default:
      return state;
  }
}

function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      email: state.email,
      password: state.password,
      emergencyContact: state.emergencyContact,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "false");
    alert("Account created successfully! Please login.");
    navigate("/login");
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="header">
        <h2>
          SafeChild<span>QR</span>
        </h2>

        <h2>Create Account</h2>
        <p>Register to manage your children's safety</p>
      </div>

      <div className="content">
        <input
          type="email"
          placeholder="Enter email..."
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: "SET_EMAIL",
              payload: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Enter password..."
          value={state.password}
          onChange={(e) =>
            dispatch({
              type: "SET_PASSWORD",
              payload: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm password..."
          value={state.confirmPassword}
          onChange={(e) =>
            dispatch({
              type: "SET_CONFIRM_PASSWORD",
              payload: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Emergency contact..."
          value={state.emergencyContact}
          onChange={(e) =>
            dispatch({
              type: "SET_EMERGENCY_CONTACT",
              payload: e.target.value,
            })
          }
        />
      </div>

      <button type="submit">Signup</button>

      <hr />

      <div className="footer">
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </form>
  );
}

export default SignUp;