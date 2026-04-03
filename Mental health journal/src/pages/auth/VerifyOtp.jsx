import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Submit OTP + New Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalOtp = otp.join("");

    try {
      await axios.post("https://mindcare-backend-v56a.onrender.com/api/auth/verify-otp", {
        email,
        otp: finalOtp,
        password,
      });

      alert("Password reset successful ✅");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await axios.post("https://mindcare-backend-v56a.onrender.com/api/auth/send-otp", {
        email,
      });

      setTimeLeft(60);
      alert("OTP resent successfully");

    } catch (err) {
      setError("Error resending OTP");
    }
  };

  return (
    <div className="authPage">
      <div className="authRight">
        <div className="authCard">
          <h1>Verify OTP</h1>

          {error && <div className="serverError">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="authForm">

            {/* OTP BOXES */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>

            {/* TIMER */}
            <p style={{ textAlign: "center" }}>
              OTP expires in {timeLeft}s
            </p>

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* SUBMIT */}
            <button className="authSubmitBtn">
              Reset Password →
            </button>

          </form>

          {/* RESEND */}
          <button
            onClick={handleResend}
            disabled={timeLeft > 0}
            style={{
              marginTop: "15px",
              background: "none",
              border: "none",
              color: "#4f46e5",
              cursor: timeLeft > 0 ? "not-allowed" : "pointer",
            }}
          >
            Resend OTP
          </button>

        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;