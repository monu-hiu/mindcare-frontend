import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // Wait for auth to load from localStorage
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        color: "#7c3aed",
        fontSize: "16px",
        gap: "10px"
      }}>
        <div style={{
          width: 20, height: 20,
          border: "2.5px solid rgba(124,58,237,0.3)",
          borderTopColor: "#7c3aed",
          borderRadius: "50%",
          animation: "spin 0.65s linear infinite"
        }} />
        Loading...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;