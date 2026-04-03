import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://mindcare-backend-v56a.onrender.com/api/auth/send-otp",
        { email },
        {
          headers: {
            Authorization: "", // 🔥 IMPORTANT FIX
          },
        }
      );

      localStorage.setItem("resetEmail", email);
      navigate("/verify-otp");

    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.msg || "Error sending OTP");
    }
  };

  return (
    <div className="authPage">
      <div className="authRight">
        <div className="authCard">
          <h1>Forgot Password</h1>

          {error && <div className="serverError">⚠️ {error}</div>}

          <form onSubmit={handleSendOtp} className="authForm">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="authSubmitBtn">
              Send OTP →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;