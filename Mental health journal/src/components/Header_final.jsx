import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FeedbackModal from "./FeedbackModal";
import logo from "../assets/Logo_mindcare.jpg";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setMenuOpen(false);
    setShowFeedback(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard",   label: "Dashboard"   },
    { to: "/mindfulness", label: "Mindfulness"  },
    { to: "/goal",        label: "Goals"        },
    { to: "/suggestions", label: "Resources"    },
  ];

  return (
    <>
      <header className="mcHeader">
        {/* Logo with image */}
        <Link to="/" className="mcLogo">
          <img src={logo} alt="MindCare" className="mcLogoImg" />
          <span className="mcLogoText">MindCare</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="mcDesktopNav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mcNavLink ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/support" className="mcSupportBtn">
            🆘 Need Support
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="mcDesktopAuth">
          {isLoggedIn ? (
            <>
              <span className="mcUserName">
                👤 {user?.name?.split(" ")[0]}
              </span>
              <button className="mcLogoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mcLoginBtn">Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`mcHamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="mcOverlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`mcDrawer ${menuOpen ? "open" : ""}`}>
        {isLoggedIn && (
          <div className="mcDrawerUser">
            <div className="mcDrawerAvatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="mcDrawerName">{user?.name}</p>
              <p className="mcDrawerEmail">{user?.email}</p>
            </div>
          </div>
        )}

        <nav className="mcDrawerNav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mcDrawerLink ${isActive(link.to) ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/support"
            className="mcDrawerSupport"
            onClick={() => setMenuOpen(false)}
          >
            🆘 Need Support
          </Link>
        </nav>

        <div className="mcDrawerAuth">
          {isLoggedIn ? (
            <button className="mcDrawerLogout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mcDrawerLogin"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal onClose={handleFeedbackClose} autoOpen={true} />
      )}
    </>
  );
}

export default Header;
