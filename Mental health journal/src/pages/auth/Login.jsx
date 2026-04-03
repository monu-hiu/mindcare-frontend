import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authLeft">
        <Link to="/" className="authLogo">🧠 MindCare</Link>
        <p className="authQuoteText">
          "Your mental health is a priority."
        </p>
        <div className="authFeatures">
          {["Private & secure", "Mood tracking", "AI Chatbot", "24 tools"].map((f, i) => (
            <div key={i} className="authFeatureItem">
              <span className="authCheck">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="authRight">
        <div className="authCard">
          <div className="authCardHeader">
            <h1>Welcome back</h1>
            <p>Sign in to continue your wellness journey</p>
          </div>

          {serverError && (
            <div className="serverError">
              ⚠️ {serverError}
            </div>
          )}

          <form onSubmit={handleLogin} className="authForm" noValidate>
            <div className="fieldGroup">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(p => ({...p, email: ""}));
                  setServerError("");
                }}
                className={errors.email ? "inputError" : ""}
              />
              {errors.email && <span className="fieldError">{errors.email}</span>}
            </div>

            <div className="fieldGroup">
              <div className="fieldLabelRow">
                <label htmlFor="password">Password</label>
               <Link to="/forgot-password" className="forgotLink">
  Forgot password?
</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(p => ({...p, password: ""}));
                }}
                className={errors.password ? "inputError" : ""}
              />
              {errors.password && <span className="fieldError">{errors.password}</span>}
            </div>

            <button type="submit" className="authSubmitBtn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="authAlt">
            <p>Don't have an account? <Link to="/signup">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;