import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://mindcare-backend-v56a.onrender.com/api/auth/send-otp",
        { email: email.trim().toLowerCase() },
        { headers: { Authorization: null } }
      );

      localStorage.setItem("resetEmail", email.trim().toLowerCase());
      setSuccess("OTP sent! Check your email 📩");
      setTimeout(() => navigate("/verify-otp"), 1500);

    } catch (err) {
      setError(err.response?.data?.msg || "Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authLeft">
        <div className="authLeftMid">
          <div className="authBrand">
            <span className="authBrandDot">🧠</span>
            <span className="authBrandName">MindCare</span>
          </div>
          <h1 className="authHeadline">Reset your<br /><em>password</em></h1>
          <div className="authPills">
            <div className="authPill"><span className="authPillIcon">✉️</span>Secure OTP via email</div>
            <div className="authPill"><span className="authPillIcon">⚡</span>Reset in under 2 minutes</div>
            <div className="authPill"><span className="authPillIcon">🔒</span>Your data stays private</div>
          </div>
        </div>
      </div>

      <div className="authRight">
        <div className="authCard">
          <div className="authCardHeader">
            <p className="authTagline">Account Recovery</p>
            <h2>Forgot Password? 🔑</h2>
            <p>Enter your registered email and we'll send you a one-time code.</p>
          </div>

          {error && (
            <div className="authError">⚠️ {error}</div>
          )}

          {success && (
            <div style={{ fontSize: 13, color: "#22c55e", background: "#f0fff4", border: "1px solid #38a169", padding: "10px 13px", borderRadius: "8px", marginBottom: "16px" }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSendOtp} className="authForm" noValidate>
            <div className="fieldGroup">
              <label>Registered Email Address</label>
              <div className="inputWrap">
                <span className="inputIcon">📧</span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }}
                  autoComplete="email"
                  className={error ? "inputError" : ""}
                />
              </div>
            </div>

            <button type="submit" className="authSubmitBtn" disabled={loading}>
              {loading ? <><span className="btnSpinner" /> Sending OTP...</> : "Send OTP →"}
            </button>
          </form>

          <p className="authAlt" style={{ marginTop: 20 }}>
            Remember your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;