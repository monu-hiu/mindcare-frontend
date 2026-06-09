// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
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
  await login(email.trim().toLowerCase(), password);
  const savedLang = localStorage.getItem("mc_language");
  if (!savedLang) setShowLangSelector(true);
  else window.location.href = "/dashboard"; // ✅
} catch (err) {
  setError(err.message || "Invalid email or password."); // ✅
}finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
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
  window.location.href = "/dashboard"; // ✅
} else {
        setError(data.message || "Google login failed.");
      }
    } catch {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="authPage">

        {/* ── LEFT ── */}
        <div className="authLeft">
          <Link to="/" className="authBrand">
            <span className="authBrandDot">🧠</span>
            <span className="authBrandName">MindCare</span>
          </Link>

          <div className="authLeftMid">
            <h1 className="authHeadline">
              Your mind<br />deserves the<br /><em>best care.</em>
            </h1>
            <p className="authLeftSub">
              A safe space to track, reflect, and grow — every single day.
            </p>

            <div className="authFeatureList">
              {[
                { icon: "📈", title: "Daily Tracking", sub: "Mood, energy, sleep & anxiety" },
                { icon: "🤖", title: "AI Companion",   sub: "Chat anytime, feel supported" },
                { icon: "🔒", title: "100% Private",   sub: "Your data is encrypted & secure" },
                { icon: "✨", title: "Free Forever",   sub: "No credit card, no hidden fees" },
              ].map((f) => (
                <div className="authFeatureItem" key={f.title}>
                  <div className="authFeatureIcon">{f.icon}</div>
                  <div className="authFeatureText">
                    <span className="authFeatureTitle">{f.title}</span>
                    <span className="authFeatureSub">{f.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="authTestimonial">
              <p className="authTestimonialQuote">
                "MindCare helped me understand my anxiety patterns and actually do something about them. Life-changing."
              </p>
              <div className="authTestimonialAuthor">
                <div className="authTestimonialAvatar">P</div>
                <div>
                  <div className="authTestimonialName">Priya S.</div>
                  <div className="authTestimonialRole">MindCare user since 2024</div>
                </div>
              </div>
            </div>
          </div>

          <p className="authLeftFoot">
            By logging in you agree to our{" "}
            <Link to="/privacy-policy">Privacy Policy</Link> &amp;{" "}
            <Link to="/terms">Terms of Service</Link>.
          </p>
        </div>

        {/* ── RIGHT ── */}
        <div className="authRight">
          <div className="authCard">

            <div className="authCardHeader">
              <p className="authTagline">👋 Welcome back</p>
              <h2>Sign in to MindCare</h2>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="authInlineLink">Sign up free →</Link>
              </p>
            </div>

            {/* Google */}
            <div style={{ marginBottom: 16 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed. Please try again.")}
                shape="rectangular"
                theme="outline"
                size="large"
                width="420"
                text="continue_with"
              />
            </div>

            <div className="authDivider">or continue with email</div>

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

              {/* Password — hasEye class gives right padding so text never overlaps button */}
              <div className="fieldGroup">
                <div className="fieldLabelRow">
                  <label htmlFor="mc-pass">Password</label>
                  <Link to="/forgot-password" className="forgotLink">Forgot password?</Link>
                </div>
                <div className="inputWrap hasEye">
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
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <label className="rememberRow">
                <input type="checkbox" />
                Keep me signed in for 30 days
              </label>

              <button type="submit" className="authSubmitBtn" disabled={loading}>
                {loading ? <><span className="btnSpinner" /> Signing in...</> : "Sign in →"}
              </button>
            </form>

            <p className="authAlt">
              New here? <Link to="/signup">Create a free account</Link>
            </p>

          </div>
        </div>
      </div>

      {showLangSelector && (
        <LanguageSelector
          onClose={() => { setShowLangSelector(false); navigate("/dashboard"); }}
          isChange={false}
        />
      )}
    </>
  );
}

export default Login;