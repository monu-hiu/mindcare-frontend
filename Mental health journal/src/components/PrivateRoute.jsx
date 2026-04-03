import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // Token check ho raha hai — wait karo
  if (loading) {
    return (
      <div style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        color: "#6b7280",
        fontSize: "15px",
        gap: "10px",
      }}>
        Loading...
      </div>
    );
  }

  // Login nahi hai — Login page pe bhejo
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Login hai — page dikhao
  return children;
}

export default PrivateRoute;