// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../../components/LanguageSelector";
import "./login.css";

function Login() {
  const { login } = useAuth();
  const { checkShowSelector } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        // Check if user has selected a language before
        const savedLang = localStorage.getItem("mc_language");
        if (!savedLang) {
          // First time — show language selector
          setShowLangSelector(true);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLangSelected = () => {
    setShowLangSelector(false);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="authPage">
        {/* Left Panel */}
        <div className="authLeft">
          <div className="authLeftContent">
            <div className="authLeftLogo">🧠</div>
            <h1>Welcome Back</h1>
            <p>Your mental wellness journey continues here.</p>
            <div className="authLeftFeatures">
              <div className="authFeature">✅ Track your mood and energy daily</div>
              <div className="authFeature">✅ AI-powered wellness companion</div>
              <div className="authFeature">✅ Available in English, Hindi & Hinglish</div>
              <div className="authFeature">✅ Private and 100% secure</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="authRight">
          <div className="authCard">
            <div className="authCardHeader">
              <h2>Login to MindCare</h2>
              <p>Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="authForm" noValidate>
              {/* Email */}
              <div className="authField">
                <label>Email Address</label>
                <div className={`authInputWrap ${error ? "hasError" : ""}`}>
                  <span className="authInputIcon">📧</span>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="authField">
                <label>Password</label>
                <div className={`authInputWrap ${error ? "hasError" : ""}`}>
                  <span className="authInputIcon">🔒</span>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="authServerError">⚠️ {error}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="authSubmitBtn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login →"}
              </button>
            </form>

            <p className="authSwitch">
              Don't have an account?{" "}
              <Link to="/signup" className="authSwitchLink">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Language Selector — shows after first login */}
      {showLangSelector && (
        <LanguageSelector
          onClose={handleLangSelected}
          isChange={false}
        />
      )}
    </>
  );
}

export default Login;