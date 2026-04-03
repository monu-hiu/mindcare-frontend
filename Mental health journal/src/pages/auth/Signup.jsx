import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import "./signup.css";

const API_URL = "https://mindcare-backend-v56a.onrender.com/api";

function Signup() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email required";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone)) errs.phone = "Enter valid 10 digit mobile number";
    if (!agree) errs.agree = "Privacy policy acceptance is required";
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

      if (!res.ok) {
        setServerError(data.message);
        return;
      }

      setSuccessMsg("OTP sent to your email. Please check your inbox.");
      setStep(2);

    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter valid 6 digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/verify-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message);
        return;
      }

      // ✅ Auto login
      localStorage.setItem("mindcare_token", data.token);
      localStorage.setItem("mindcare_user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ef4444", "#eab308", "#22c55e"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div className="authPage">
      <div className="authLeft">
        <Link to="/" className="authLogo">🧠 MindCare</Link>
        <p className="authQuoteText">
          "Taking care of your mental health is an act of courage."
        </p>
        <div className="authFeatures">
          {["Free forever", "Private & encrypted", "24 wellness tools", "AI chatbot"].map((f, i) => (
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
            {step === 1 ? (
              <>
                <h1>Create your account</h1>
                <p>Start your wellness journey — it's free!</p>
              </>
            ) : (
              <>
                <h1>Verify your email</h1>
                <p>OTP sent to <strong>{email}</strong></p>
              </>
            )}
          </div>

          {serverError && (
            <div className="serverError">⚠️ {serverError}</div>
          )}

          {successMsg && (
            <div style={{
              background: "#f0fff4",
              border: "1px solid #38a169",
              color: "#276749",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px"
            }}>
              ✅ {successMsg}
            </div>
          )}

          {/* STEP 1 — Signup Form */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="authForm" noValidate>
              <div className="fieldGroup">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Madhusudhan"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }}
                  className={errors.name ? "inputError" : ""}
                />
                {errors.name && <span className="fieldError">{errors.name}</span>}
              </div>

              <div className="fieldGroup">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); setServerError(""); }}
                  className={errors.email ? "inputError" : ""}
                />
                {errors.email && <span className="fieldError">{errors.email}</span>}
              </div>

              <div className="fieldGroup">
                <label htmlFor="phone">Mobile number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    setErrors(p => ({...p, phone: ""}));
                  }}
                  className={errors.phone ? "inputError" : ""}
                />
                {errors.phone && <span className="fieldError">{errors.phone}</span>}
              </div>

              <div className="fieldGroup">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
                  className={errors.password ? "inputError" : ""}
                />
                {password.length > 0 && (
                  <div className="passwordStrength">
                    <div className="strengthBars">
                      {[1,2,3].map(i => (
                        <div key={i} className="strengthBar"
                          style={{ background: strength >= i ? strengthColors[strength] : "#e5e7eb" }}
                        />
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
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => { setAgree(e.target.checked); setErrors(p => ({...p, agree: ""})); }}
                  />
                  <Link to="/privacy-policy" className="forgotLink">
                    Privacy Policy
                  </Link>
                </label>
                {errors.agree && <span className="fieldError">{errors.agree}</span>}
              </div>

              <button type="submit" className="authSubmitBtn" disabled={loading}>
                {loading ? "Sending OTP..." : "Send Verification OTP →"}
              </button>
            </form>
          )}

          {/* STEP 2 — OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="authForm" noValidate>
              <div className="fieldGroup">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="6 digit OTP"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setOtp(val);
                    setErrors(p => ({...p, otp: ""}));
                  }}
                  className={errors.otp ? "inputError" : ""}
                  style={{ letterSpacing: "8px", fontSize: "20px", textAlign: "center" }}
                />
                {errors.otp && <span className="fieldError">{errors.otp}</span>}
              </div>

              <button type="submit" className="authSubmitBtn" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Create Account →"}
              </button>

              <button
                type="button"
                onClick={() => { setStep(1); setServerError(""); setOtp(""); }}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#6b7280",
                  fontSize: "14px"
                }}
              >
                ← Change details
              </button>
            </form>
          )}

          <div className="authAlt">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;