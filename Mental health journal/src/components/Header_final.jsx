// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import FeedbackModal from "./FeedbackModal";
import LanguageSelector from "./LanguageSelector";
import logo from "../assets/Logo_mindcare.jpg";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLangSelector, setShowLangSelector] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { language, t } = useLanguage();
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

  const langLabels = { en: "🇬🇧 EN", hi: "🇮🇳 हि", hin: "🇮🇳 HIN" };

  const navLinks = [
    { to: "/dashboard",   label: t("nav.dashboard")   },
    { to: "/mindfulness", label: t("nav.mindfulness")  },
    { to: "/goal",        label: t("nav.goals")        },
    { to: "/suggestions", label: t("nav.resources")    },
  ];

  return (
    <>
      <header className="mcHeader">
        {/* Logo */}
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
            {t("nav.needSupport")}
          </Link>
        </nav>

        {/* Desktop Auth + Language */}
        <div className="mcDesktopAuth">
          {/* Language Toggle */}
          <button
            className="mcLangBtn"
            onClick={() => setShowLangSelector(true)}
            title="Change Language"
          >
            {langLabels[language]}
          </button>

          {isLoggedIn ? (
            <>
              <span className="mcUserName">
                👤 {user?.name?.split(" ")[0]}
              </span>
              <button className="mcLogoutBtn" onClick={handleLogout}>
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <Link to="/login" className="mcLoginBtn">
              {t("nav.login")}
            </Link>
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
            {t("nav.needSupport")}
          </Link>

          {/* Language change option in drawer */}
          <button
            className="mcDrawerLangBtn"
            onClick={() => {
              setMenuOpen(false);
              setShowLangSelector(true);
            }}
          >
            🌐 {langLabels[language]} — Change Language
          </button>
        </nav>

        <div className="mcDrawerAuth">
          {isLoggedIn ? (
            <button className="mcDrawerLogout" onClick={handleLogout}>
              {t("nav.logout")}
            </button>
          ) : (
            <Link
              to="/login"
              className="mcDrawerLogin"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.login")}
            </Link>
          )}
        </div>
      </div>

      {/* Language Selector Modal */}
      {showLangSelector && (
        <LanguageSelector
          onClose={() => setShowLangSelector(false)}
          isChange={true}
        />
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal onClose={handleFeedbackClose} autoOpen={true} />
      )}
    </>
  );
}

export default Header;
