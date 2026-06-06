import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import "./signup.css";

const API_URL = "https://mindcare-backend-v56a.onrender.com/api";

function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const navigate = useNavigate();

  const startTimer = () => {
    setTimeLeft(60);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone)) errs.phone = "Enter valid 10 digit mobile number";
    if (!agree) errs.agree = "You must accept the privacy policy";
    return errs;
  };

  // STEP 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message); return; }

      setSuccessMsg("OTP sent! Check your inbox.");
      startTimer();
      setStep(2);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setServerError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/send-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message); return; }
      setSuccessMsg("OTP resent! Check your email.");
      setOtp("");
      startTimer();
    } catch {
      setServerError("Error resending OTP. Please try again.");
    }
  };

  // STEP 2 — Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!otp || otp.length !== 6) { setErrors({ otp: "Please enter valid 6 digit OTP" }); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message); return; }

      localStorage.setItem("mindcare_token", data.token);
      localStorage.setItem("mindcare_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
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
        setServerError(data.message || "Google signup failed.");
      }
    } catch {
      setServerError("Google signup failed. Please try again.");
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ef4444", "#eab308", "#22c55e"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div className="authPage">

      {/* ── LEFT PANEL ── */}
      <div className="authLeft">
        <div className="authLeftGlow" />
        <div className="authLeftGlow2" />

        <div className="authBrand">
          <span className="authBrandDot">🧠</span>
          <span className="authBrandName">MindCare</span>
        </div>

        <div className="authLeftMid">
          <h1 className="authHeadline">
            Your journey<br />to wellness<br /><em>starts here.</em>
          </h1>
          <p className="authLeftSub">
            Join thousands who track, reflect, and grow with MindCare every day.
          </p>
          <div className="authPills">
            <div className="authPill">
              <span className="authPillIcon">📈</span>
              Mood, sleep &amp; energy tracking
            </div>
            <div className="authPill">
              <span className="authPillIcon">🤖</span>
              AI-powered wellness companion
            </div>
            <div className="authPill">
              <span className="authPillIcon">🔒</span>
              100% private &amp; secure
            </div>
            <div className="authPill">
              <span className="authPillIcon">✨</span>
              Free forever — no credit card
            </div>
          </div>
        </div>

        <p className="authLeftFoot">
          By signing up you agree to our{" "}
          <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="authRight">
        <div className="authCard">

          {/* Header */}
          <div className="authCardHeader">
            {step === 1 ? (
              <>
                <p className="authTagline">Get Started Free</p>
                <h2>Create your account</h2>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="authInlineLink">Sign in →</Link>
                </p>
              </>
            ) : (
              <>
                <p className="authTagline">Step 2 of 2</p>
                <h2>Verify your email ✉️</h2>
                <p>We sent a 6-digit code to <strong>{email}</strong></p>
              </>
            )}
          </div>

          {/* Google button — only on step 1 */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setServerError("Google signup failed. Please try again.")}
                  shape="rectangular"
                  theme="outline"
                  size="large"
                  width="400"
                  text="signup_with"
                />
              </div>
              <div className="authDivider">or sign up with email</div>
            </>
          )}

          {/* Errors & Success */}
          {serverError && <div className="authError">⚠️ {serverError}</div>}
          {successMsg && (
            <div style={{ background: "#f0fff4", border: "1px solid #38a169", color: "#276749", padding: "10px 13px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
              ✅ {successMsg}
            </div>
          )}

          {/* ── STEP 1 FORM ── */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="authForm" noValidate>

              {/* Name */}
              <div className="fieldGroup">
                <label htmlFor="su-name">Full name</label>
                <div className="inputWrap">
                  <span className="inputIcon">👤</span>
                  <input
                    id="su-name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
                    className={errors.name ? "inputError" : ""}
                  />
                </div>
                {errors.name && <span className="fieldError">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="fieldGroup">
                <label htmlFor="su-email">Email address</label>
                <div className="inputWrap">
                  <span className="inputIcon">📧</span>
                  <input
                    id="su-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); setServerError(""); }}
                    className={errors.email ? "inputError" : ""}
                  />
                </div>
                {errors.email && <span className="fieldError">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="fieldGroup">
                <label htmlFor="su-phone">Mobile number</label>
                <div className="inputWrap">
                  <span className="inputIcon">📱</span>
                  <input
                    id="su-phone"
                    type="tel"
                    placeholder="10 digit mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setPhone(val); setErrors(p => ({...p, phone: ""})); }}
                    className={errors.phone ? "inputError" : ""}
                  />
                </div>
                {errors.phone && <span className="fieldError">{errors.phone}</span>}
              </div>

              {/* Password */}
              <div className="fieldGroup">
                <label htmlFor="su-password">Password</label>
                <div className="inputWrap">
                  <span className="inputIcon">🔒</span>
                  <input
                    id="su-password"
                    type={showPw ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
                    className={errors.password ? "inputError" : ""}
                  />
                  <button type="button" className="eyeBtn" onClick={() => setShowPw(!showPw)}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="passwordStrength">
                    <div className="strengthBars">
                      {[1,2,3].map(i => (
                        <div key={i} className="strengthBar"
                          style={{ background: strength >= i ? strengthColors[strength] : "#e5e7eb" }} />
                      ))}
                    </div>
                    <span style={{ color: strengthColors[strength], fontSize: "11px", fontWeight: 600 }}>
                      {strengthLabels[strength]}
                    </span>
                  </div>
                )}
                {errors.password && <span className="fieldError">{errors.password}</span>}
              </div>

              {/* Privacy Policy */}
              <div className="fieldGroup">
                <label className="agreeLabel">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => { setAgree(e.target.checked); setErrors(p => ({...p, agree: ""})); }}
                  />
                  I agree to the{" "}
                  <Link to="/privacy-policy" className="forgotLink">Privacy Policy</Link>
                </label>
                {errors.agree && <span className="fieldError">{errors.agree}</span>}
              </div>

              <button type="submit" className="authSubmitBtn" disabled={loading}>
                {loading ? <><span className="btnSpinner" /> Sending OTP...</> : "Send Verification OTP →"}
              </button>

            </form>
          )}

          {/* ── STEP 2 FORM ── */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="authForm" noValidate>

              <div className="fieldGroup">
                <label htmlFor="su-otp">Enter 6-digit OTP</label>
                <input
                  id="su-otp"
                  type="text"
                  placeholder="— — — — — —"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setOtp(val); setErrors(p => ({...p, otp: ""})); }}
                  className={errors.otp ? "inputError" : ""}
                  style={{
                    letterSpacing: "10px", fontSize: "22px",
                    textAlign: "center", padding: "14px",
                    width: "100%", border: "1.5px solid #e5e5ef",
                    borderRadius: "9px", outline: "none",
                    fontFamily: "DM Sans, sans-serif",
                    background: "#fff",
                  }}
                />
                {errors.otp && <span className="fieldError">{errors.otp}</span>}
              </div>

              {/* Timer */}
              <p style={{ textAlign: "center", fontSize: 13, marginBottom: 20, color: timeLeft < 10 ? "#ef4444" : "#9ca3af" }}>
                {timeLeft > 0 ? `OTP expires in ${timeLeft}s` : "⚠️ OTP expired — please resend"}
              </p>

              <button type="submit" className="authSubmitBtn" disabled={loading || timeLeft === 0}>
                {loading ? <><span className="btnSpinner" /> Verifying...</> : "Verify & Create Account →"}
              </button>

              {/* Resend */}
              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft > 0}
                style={{
                  width: "100%", marginTop: "10px",
                  background: "none", border: "1px solid #e5e5ef",
                  borderRadius: "9px", padding: "11px",
                  color: timeLeft > 0 ? "#9ca3af" : "#6350dc",
                  cursor: timeLeft > 0 ? "not-allowed" : "pointer",
                  fontSize: 14, fontFamily: "DM Sans, sans-serif",
                }}
              >
                {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={() => { setStep(1); setServerError(""); setOtp(""); setSuccessMsg(""); }}
                style={{
                  width: "100%", marginTop: "10px",
                  background: "transparent", border: "1px solid #e5e7eb",
                  padding: "11px", borderRadius: "9px",
                  cursor: "pointer", color: "#6b7280", fontSize: "14px",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                ← Change details
              </button>

            </form>
          )}

          <div className="authAlt" style={{ marginTop: 20 }}>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;