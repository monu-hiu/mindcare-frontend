// src/pages/auth/Signup.jsx
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
    const iv = setInterval(() => {
      setTimeLeft((p) => { if (p <= 1) { clearInterval(iv); return 0; } return p - 1; });
    }, 1000);
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter valid 10-digit mobile number";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    if (!agree) e.agree = "Please accept the Privacy Policy to continue";
    return e;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setServerError(""); setSuccessMsg("");
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
      if (!res.ok) { setServerError(data.message || "Failed to send OTP."); return; }
      setSuccessMsg("OTP sent! Check your inbox.");
      startTimer();
      setStep(2);
    } catch { setServerError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    setServerError(""); setSuccessMsg("");
    try {
      const res = await fetch(`${API_URL}/auth/send-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message); return; }
      setSuccessMsg("OTP resent! Check your email.");
      setOtp(""); startTimer();
    } catch { setServerError("Error resending OTP."); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!otp || otp.length !== 6) { setErrors({ otp: "Please enter the 6-digit OTP" }); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.message || "Invalid OTP."); return; }
      localStorage.setItem("mindcare_token", data.token);
      localStorage.setItem("mindcare_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch { setServerError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

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
      } else { setServerError(data.message || "Google signup failed."); }
    } catch { setServerError("Google signup failed. Please try again."); }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ef4444", "#eab308", "#22c55e"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  const stepLabels = [
    { title: "Create your account", desc: "Name, email, phone & password" },
    { title: "Verify your email",   desc: "6-digit OTP sent to your inbox" },
    { title: "Start your journey",  desc: "Access all 24 wellness tools" },
  ];

  return (
    <div className="authPage">

      {/* ── LEFT ── */}
      <div className="authLeft">
        <Link to="/" className="authBrand">
          <span className="authBrandDot">🧠</span>
          <span className="authBrandName">MindCare</span>
        </Link>

        <div className="authLeftMid">
          <h1 className="authHeadline">
            Your journey<br />to wellness<br /><em>starts here.</em>
          </h1>
          <p className="authLeftSub">
            Join thousands who track, reflect, and grow with MindCare every day.
          </p>

          <div className="signupSteps">
            {stepLabels.map((s, i) => (
              <div className={`signupStep${step > i ? " done" : ""}`} key={i}>
                <span className="signupStepNum">
                  {step > i + 1 ? "✓" : i + 1}
                </span>
                <div>
                  <div className="signupStepTitle">{s.title}</div>
                  <div className="signupStepDesc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="authTestimonial" style={{ marginTop: 28 }}>
            <p className="authTestimonialQuote">
              "I was skeptical at first but MindCare genuinely changed how I handle stress. 10/10 recommend."
            </p>
            <div className="authTestimonialAuthor">
              <div className="authTestimonialAvatar">R</div>
              <div>
                <div className="authTestimonialName">Rahul M.</div>
                <div className="authTestimonialRole">MindCare user since 2024</div>
              </div>
            </div>
          </div>
        </div>

        <p className="authLeftFoot">
          By signing up you agree to our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> &amp;{" "}
          <Link to="/terms">Terms of Service</Link>.
        </p>
      </div>

      {/* ── RIGHT ── */}
      <div className="authRight">
        <div className="authCard">

          {/* Progress */}
          <div className="signupProgress">
            <div className="signupProgressLabel">
              <span>Step {step} of 2</span>
              <strong>{step === 1 ? "50%" : "100%"}</strong>
            </div>
            <div className="signupProgressTrack">
              <div className="signupProgressFill" style={{ width: step === 1 ? "50%" : "100%" }} />
            </div>
          </div>

          {/* Header */}
          <div className="authCardHeader">
            {step === 1 ? (
              <>
                <p className="authTagline">🚀 Get Started Free</p>
                <h2>Create your account</h2>
                <p>Already have one? <Link to="/login" className="authInlineLink">Sign in →</Link></p>
              </>
            ) : (
              <>
                <p className="authTagline">✉️ Almost there</p>
                <h2>Verify your email</h2>
                <p>We sent a 6-digit code to <strong>{email}</strong></p>
              </>
            )}
          </div>

          {serverError && <div className="authError">⚠️ {serverError}</div>}
          {successMsg && <div className="authSuccess">✅ {successMsg}</div>}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: 14 }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setServerError("Google signup failed.")}
                  shape="rectangular" theme="outline" size="large" width="420" text="signup_with"
                />
              </div>
              <div className="authDivider">or sign up with email</div>

              <form onSubmit={handleSendOtp} className="authForm" noValidate>

                <div className="fieldGroup">
                  <label>Full name</label>
                  <div className="inputWrap">
                    <span className="inputIcon">👤</span>
                    <input type="text" placeholder="Your full name" value={name}
                      onChange={(e) => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
                      className={errors.name ? "inputError" : ""} />
                  </div>
                  {errors.name && <span className="fieldError">{errors.name}</span>}
                </div>

                <div className="fieldGroup">
                  <label>Email address</label>
                  <div className="inputWrap">
                    <span className="inputIcon">📧</span>
                    <input type="email" placeholder="you@example.com" value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); setServerError(""); }}
                      className={errors.email ? "inputError" : ""} />
                  </div>
                  {errors.email && <span className="fieldError">{errors.email}</span>}
                </div>

                <div className="fieldGroup">
                  <label>Mobile number</label>
                  <div className="inputWrap">
                    <span className="inputIcon">📱</span>
                    <input type="tel" placeholder="10-digit mobile number" value={phone} maxLength={10}
                      onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors(p => ({...p, phone: ""})); }}
                      className={errors.phone ? "inputError" : ""} />
                  </div>
                  {errors.phone && <span className="fieldError">{errors.phone}</span>}
                </div>

                {/* Password — hasEye to prevent overlap */}
                <div className="fieldGroup">
                  <label>Password</label>
                  <div className="inputWrap hasEye">
                    <span className="inputIcon">🔒</span>
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
                      className={errors.password ? "inputError" : ""}
                    />
                    <button
                      type="button" className="eyeBtn"
                      onClick={() => setShowPw(!showPw)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
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

                <div className="fieldGroup">
                  <label className="agreeLabel">
                    <input type="checkbox" checked={agree}
                      onChange={(e) => { setAgree(e.target.checked); setErrors(p => ({...p, agree: ""})); }} />
                    <span>
                      I agree to the{" "}
                      <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                      {" "}and{" "}
                      <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                    </span>
                  </label>
                  {errors.agree && <span className="fieldError">{errors.agree}</span>}
                </div>

                <button type="submit" className="authSubmitBtn" disabled={loading}>
                  {loading ? <><span className="btnSpinner" /> Sending OTP...</> : "Send Verification OTP →"}
                </button>
              </form>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="authForm" noValidate>
              <div className="fieldGroup">
                <label>Enter 6-digit OTP</label>
                <input
                  type="text"
                  placeholder="— — — — — —"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setErrors(p => ({...p, otp: ""})); }}
                  className={errors.otp ? "inputError" : ""}
                  style={{
                    letterSpacing: "10px", fontSize: "22px", textAlign: "center",
                    padding: "14px", width: "100%",
                    border: "1.5px solid #e5e7eb", borderRadius: "10px",
                    outline: "none", background: "#fafafa",
                    fontFamily: "Inter, sans-serif", color: "#111827"
                  }}
                />
                {errors.otp && <span className="fieldError">{errors.otp}</span>}
              </div>

              <p className="otpTimer" style={{ color: timeLeft < 10 ? "#dc2626" : "#9ca3af" }}>
                {timeLeft > 0 ? `OTP expires in ${timeLeft}s` : "⚠️ OTP expired — please resend"}
              </p>

              <button type="submit" className="authSubmitBtn" disabled={loading || timeLeft === 0}>
                {loading ? <><span className="btnSpinner" /> Verifying...</> : "Verify & Create Account →"}
              </button>

              <button type="button" className="authGhostBtn" onClick={handleResend} disabled={timeLeft > 0}
                style={{ color: timeLeft > 0 ? "#9ca3af" : "#7c3aed", cursor: timeLeft > 0 ? "not-allowed" : "pointer" }}>
                {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend OTP"}
              </button>

              <button type="button" className="authGhostBtn"
                onClick={() => { setStep(1); setServerError(""); setOtp(""); setSuccessMsg(""); }}>
                ← Change my details
              </button>
            </form>
          )}

          <p className="authAlt">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;