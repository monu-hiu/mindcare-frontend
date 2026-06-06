
// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import LanguageSelector from "../../components/LanguageSelector";
import "./login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLangSelector, setShowLangSelector] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await login(email.trim().toLowerCase(), password);
      if (result.success) {
        const savedLang = localStorage.getItem("mc_language");
        if (!savedLang) setShowLangSelector(true);
        else navigate("/dashboard");
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="authPage">
        {/* ── LEFT PANEL ── */}
        <div className="authLeft">
          <div className="authLeftGlow" />
          <div className="authLeftGlow2" />
           <div className="authLeftGlow3" />

          <div className="authBrand">
            <span className="authBrandDot">🧠</span>
            <span className="authBrandName">MindCare</span>
          </div>

          <div className="authLeftMid">
            <h1 className="authHeadline">
              Your mind<br />deserves the<br /><em>best care.</em>
            </h1>
            <p className="authLeftSub">
              A safe space to track, reflect, and grow — every single day.
            </p>
            <div className="authPills">
              <div className="authPill">
                <span className="authPillIcon">📈</span>
                Daily mood &amp; energy tracking
              </div>
              <div className="authPill">
                <span className="authPillIcon">🤖</span>
                AI-powered wellness companion
              </div>
              <div className="authPill">
                <span className="authPillIcon">🔒</span>
                100% private &amp; secure
              </div>
            </div>
          </div>

          <p className="authLeftFoot">
            By logging in you agree to our{" "}
            <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="authRight">
          <div className="authCard">
            <div className="authCardHeader">
              <p className="authTagline">Welcome back</p>
              <h2>Sign in to MindCare</h2>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="authInlineLink">Sign up free →</Link>
              </p>
            </div>

            {/* Google SSO */}
            <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("mindcare_token", data.token);
        localStorage.setItem("mindcare_user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Google login failed.");
      }
    } catch {
      setError("Google login failed. Please try again.");
    }
  }}
  onError={() => setError("Google login failed. Please try again.")}
  useOneTap
  shape="rectangular"
  theme="outline"
  size="large"
  width="400"
  text="continue_with"
/>


            <div className="authDivider">or sign in with email</div>

            {/* Error */}
            {error && <div className="authError">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} className="authForm" noValidate>
              {/* Email */}
              <div className="fieldGroup">
                <label htmlFor="mc-email">Email address</label>
                <div className="inputWrap">
                  <span className="inputIcon">📧</span>
                  <input
                    id="mc-email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    autoComplete="email"
                    className={error ? "inputError" : ""}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fieldGroup">
                <div className="fieldLabelRow">
                  <label htmlFor="mc-pass">Password</label>
                  <Link to="/forgot-password" className="forgotLink">Forgot password?</Link>
                </div>
                <div className="inputWrap">
                  <span className="inputIcon">🔒</span>
                  <input
                    id="mc-pass"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoComplete="current-password"
                    className={error ? "inputError" : ""}
                  />
                  <button
                    type="button"
                    className="eyeBtn"
                    onClick={() => setShowPw(!showPw)}
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="rememberRow">
                <input type="checkbox" />
                Keep me signed in for 30 days
              </label>

              <button type="submit" className="authSubmitBtn" disabled={loading}>
                {loading ? <><span className="btnSpinner" /> Signing in...</> : "Sign in →"}
              </button>
            </form>

            <p className="authAlt" style={{ marginTop: 20 }}>
              New here? <Link to="/signup">Create a free account</Link>
            </p>
          </div>
        </div>
      </div>

      {showLangSelector && (
        <LanguageSelector onClose={() => { setShowLangSelector(false); navigate("/dashboard"); }} isChange={false} />
      )}
    </>
  );
}

export default Login;