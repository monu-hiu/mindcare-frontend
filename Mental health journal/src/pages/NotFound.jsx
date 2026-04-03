import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "Poppins, sans-serif",
      textAlign: "center",
      padding: "20px",
    }}>
      <div style={{ fontSize: "80px" }}>🧠</div>
      <h1 style={{ fontSize: "80px", color: "#e0e7ff", fontWeight: 800 }}>404</h1>
      <h2 style={{ fontSize: "24px", color: "#111827", marginBottom: "12px" }}>Page not found</h2>
      <p style={{ color: "#6b7280", marginBottom: "30px" }}>
        Ye page exist nahi karta. Ghar wapas chalo!
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/dashboard">
          <button style={{
            background: "#6366f1", color: "white", border: "none",
            padding: "12px 24px", borderRadius: "10px",
            fontSize: "14px", fontWeight: 600, cursor: "pointer"
          }}>
            Dashboard
          </button>
        </Link>
        <Link to="/">
          <button style={{
            background: "transparent", color: "#374151",
            border: "1.5px solid #e5e7eb", padding: "12px 24px",
            borderRadius: "10px", fontSize: "14px", cursor: "pointer"
          }}>
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;