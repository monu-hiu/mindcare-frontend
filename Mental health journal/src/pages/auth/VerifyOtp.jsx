// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// function VerifyOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const email = localStorage.getItem("resetEmail");

//   // If no email in storage, redirect back
//   useEffect(() => {
//     if (!email) navigate("/forgot-password");
//   }, [email, navigate]);

//   // OTP input handler
//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   // Backspace handler
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   };

//   // Countdown timer
//   useEffect(() => {
//     if (timeLeft === 0) return;
//     const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const finalOtp = otp.join("");

//     if (finalOtp.length < 6) {
//       setError("Please enter the complete 6-digit OTP.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(
//         "https://mindcare-backend-v56a.onrender.com/api/auth/verify-otp",
//         { email, otp: finalOtp, password },
//         { headers: { Authorization: null } }
//       );

//       setSuccess("Password reset successful! Redirecting...");
//       localStorage.removeItem("resetEmail");
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (err) {
//       setError(err.response?.data?.msg || "Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP
//   const handleResend = async () => {
//     setError("");
//     setSuccess("");
//     try {
//       await axios.post(
//         "https://mindcare-backend-v56a.onrender.com/api/auth/send-otp",
//         { email },
//         { headers: { Authorization: null } }
//       );
//       setOtp(["", "", "", "", "", ""]);
//       setTimeLeft(60);
//       setSuccess("OTP resent! Check your email.");
//     } catch (err) {
//       setError("Error resending OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="authPage">
//       <div className="authLeft">
//         <div className="authLeftMid">
//           <div className="authBrand">
//             <span className="authBrandDot">🧠</span>
//             <span className="authBrandName">MindCare</span>
//           </div>
//           <h1 className="authHeadline">Verify your<br /><em>identity</em></h1>
//           <div className="authPills">
//             <div className="authPill"><span className="authPillIcon">🔐</span>6-digit secure OTP</div>
//             <div className="authPill"><span className="authPillIcon">⏱️</span>Expires in 5 minutes</div>
//             <div className="authPill"><span className="authPillIcon">🛡️</span>Your account is protected</div>
//           </div>
//         </div>
//       </div>

//       <div className="authRight">
//         <div className="authCard">
//           <div className="authCardHeader">
//             <p className="authTagline">Step 2 of 2</p>
//             <h2>Verify OTP 🔐</h2>
//             <p>Code sent to <strong>{email}</strong></p>
//           </div>

//           {error && <div className="authError">⚠️ {error}</div>}

//           {success && (
//             <div style={{ fontSize: 13, color: "#22c55e", background: "#f0fff4", border: "1px solid #38a169", padding: "10px 13px", borderRadius: "8px", marginBottom: "16px" }}>
//               ✅ {success}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="authForm">

//             {/* OTP Boxes */}
//             <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "8px" }}>
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   id={`otp-${i}`}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) => handleChange(e.target.value, i)}
//                   onKeyDown={(e) => handleKeyDown(e, i)}
//                   style={{
//                     width: "50px", height: "50px",
//                     textAlign: "center", fontSize: "20px",
//                     fontWeight: "600", borderRadius: "9px",
//                     border: "1.5px solid #e5e5ef",
//                     outline: "none", fontFamily: "DM Sans, sans-serif",
//                     transition: "border-color 0.15s",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#6350dc"}
//                   onBlur={(e) => e.target.style.borderColor = "#e5e5ef"}
//                 />
//               ))}
//             </div>

//             {/* Timer */}
//             <p style={{ textAlign: "center", fontSize: 13, marginBottom: 20, color: timeLeft < 10 ? "#ef4444" : "#9ca3af" }}>
//               {timeLeft > 0 ? `OTP expires in ${timeLeft}s` : "OTP expired — please resend"}
//             </p>

//             {/* New Password */}
//             <div className="fieldGroup">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 placeholder="Min 6 characters"
//                 value={password}
//                 onChange={(e) => { setPassword(e.target.value); setError(""); }}
//                 style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e5ef", borderRadius: "9px", fontSize: "14px", fontFamily: "DM Sans, sans-serif", outline: "none" }}
//                 onFocus={(e) => e.target.style.borderColor = "#6350dc"}
//                 onBlur={(e) => e.target.style.borderColor = "#e5e5ef"}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div className="fieldGroup">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Re-enter new password"
//                 value={confirmPassword}
//                 onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
//                 style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e5ef", borderRadius: "9px", fontSize: "14px", fontFamily: "DM Sans, sans-serif", outline: "none" }}
//                 onFocus={(e) => e.target.style.borderColor = "#6350dc"}
//                 onBlur={(e) => e.target.style.borderColor = "#e5e5ef"}
//               />
//             </div>

//             <button
//               type="submit"
//               className="authSubmitBtn"
//               disabled={loading || timeLeft === 0}
//             >
//               {loading ? <><span className="btnSpinner" /> Resetting...</> : "Reset Password →"}
//             </button>
//           </form>

//           <button
//             onClick={handleResend}
//             disabled={timeLeft > 0}
//             style={{
//               marginTop: "15px", width: "100%",
//               background: "none", border: "1px solid #e5e5ef",
//               borderRadius: "9px", padding: "11px",
//               color: timeLeft > 0 ? "#9ca3af" : "#6350dc",
//               cursor: timeLeft > 0 ? "not-allowed" : "pointer",
//               fontSize: 14, fontFamily: "DM Sans, sans-serif",
//             }}
//           >
//             {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyOtp;
// src/pages/auth/VerifyOtp.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  useEffect(() => { if (!email) navigate("/forgot-password"); }, [email, navigate]);

  // Auto-advance OTP boxes
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) document.getElementById(`vo-${index + 1}`)?.focus();
  };
  const handleOtpKey = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`vo-${index - 1}`)?.focus();
  };

  // Countdown
  useEffect(() => {
    if (timeLeft === 0) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) { setError("Please enter the complete 6-digit OTP."); return; }
    if (password.length < 6)  { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await axios.post(
        "https://mindcare-backend-v56a.onrender.com/api/auth/verify-otp",
        { email, otp: finalOtp, password },
        { headers: { Authorization: null } }
      );
      setSuccess("Password reset successful! Redirecting...");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP. Please try again.");
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setError(""); setSuccess("");
    try {
      await axios.post(
        "https://mindcare-backend-v56a.onrender.com/api/auth/send-otp",
        { email },
        { headers: { Authorization: null } }
      );
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60);
      setSuccess("OTP resent! Check your email.");
    } catch { setError("Error resending OTP. Please try again."); }
  };

  return (
    <div className="authPage">
      <div className="authLeft">
        <Link to="/" className="authBrand">
          <span className="authBrandDot">🧠</span>
          <span className="authBrandName">MindCare</span>
        </Link>
        <div className="authLeftMid">
          <h1 className="authHeadline">Verify your<br /><em>identity.</em></h1>
          <p className="authLeftSub">One final step to secure your new password.</p>
          <div className="authPills">
            <div className="authPill"><span className="authPillIcon">🔐</span>6-digit secure OTP</div>
            <div className="authPill"><span className="authPillIcon">⏱️</span>Expires in 5 minutes</div>
            <div className="authPill"><span className="authPillIcon">🛡️</span>Your account is protected</div>
          </div>
        </div>
        <p className="authLeftFoot">
          <Link to="/privacy-policy">Privacy Policy</Link> &amp; <Link to="/terms">Terms</Link>.
        </p>
      </div>

      <div className="authRight">
        <div className="authCard">
          <div className="authCardHeader">
            <p className="authTagline">Step 2 of 2</p>
            <h2>Verify OTP 🔐</h2>
            <p>Code sent to <strong>{email}</strong></p>
          </div>

          {error   && <div className="authError">⚠️ {error}</div>}
          {success && <div className="authSuccess">✅ {success}</div>}

          <form onSubmit={handleSubmit} className="authForm">

            {/* OTP boxes */}
            <div className="fieldGroup">
              <label>Enter one-time password</label>
              <div className="otpBoxRow">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`vo-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKey(e, i)}
                    className={`otpBox${digit ? " filled" : ""}`}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>
              <p className="otpTimer" style={{ color: timeLeft < 10 ? "#dc2626" : "#9ca3af" }}>
                {timeLeft > 0 ? `OTP expires in ${timeLeft}s` : "OTP expired — please resend"}
              </p>
            </div>

            {/* New password */}
            <div className="fieldGroup">
              <label htmlFor="vo-pw">New password</label>
              <div className="inputWrap hasEye">
                <span className="inputIcon">🔒</span>
                <input
                  id="vo-pw"
                  type={showPw ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                />
                <button type="button" className="eyeBtn" onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide" : "Show"}>
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="fieldGroup">
              <label htmlFor="vo-cpw">Confirm new password</label>
              <div className="inputWrap hasEye">
                <span className="inputIcon">🔒</span>
                <input
                  id="vo-cpw"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                />
                <button type="button" className="eyeBtn" onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide" : "Show"}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="authSubmitBtn" disabled={loading || timeLeft === 0}>
              {loading ? <><span className="btnSpinner" /> Resetting...</> : "Reset Password →"}
            </button>
          </form>

          <button className="authGhostBtn" onClick={handleResend} disabled={timeLeft > 0}
            style={{ color: timeLeft > 0 ? "#9ca3af" : "#7c3aed", cursor: timeLeft > 0 ? "not-allowed" : "pointer" }}>
            {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
          </button>

          <p className="authAlt">
            <Link to="/login">← Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;