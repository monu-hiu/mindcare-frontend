// src/components/LanguageSelector.jsx
import { useLanguage } from "../context/LanguageContext";
import "./LanguageSelector.css";

const LANGUAGES = [
  {
    code: "en",
    flag: "🇬🇧",
    name: "English",
    nativeName: "English",
    desc: "All content in English",
    sample: "How are you feeling today?",
  },
  {
    code: "hi",
    flag: "🇮🇳",
    name: "Hindi",
    nativeName: "हिंदी",
    desc: "सारी जानकारी हिंदी में",
    sample: "आज आप कैसा महसूस कर रहे हैं?",
  },
  {
    code: "hin",
    flag: "🇮🇳",
    name: "Hinglish",
    nativeName: "Hinglish",
    desc: "Hindi + English mix",
    sample: "Aaj aap kaisa feel kar rahe ho?",
  },
];

function LanguageSelector({ onClose, isChange = false }) {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (code) => {
    setLanguage(code);
    if (onClose) onClose();
  };

  return (
    <div className="lsOverlay">
      <div className="lsModal">
        {/* Header */}
        <div className="lsHeader">
          <div className="lsHeaderIcon">🌐</div>
          <h2 className="lsTitle">
            {isChange ? "Change Language" : "Choose Your Language"}
          </h2>
          <p className="lsSubtitle">
            {isChange
              ? "Select your preferred language anytime"
              : "Select the language you're most comfortable with"}
          </p>
          {isChange && (
            <button className="lsCloseBtn" onClick={onClose}>✕</button>
          )}
        </div>

        {/* Language Options */}
        <div className="lsOptions">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`lsOption ${language === lang.code ? "active" : ""}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lsFlag">{lang.flag}</span>
              <div className="lsInfo">
                <div className="lsNames">
                  <span className="lsName">{lang.name}</span>
                  {lang.nativeName !== lang.name && (
                    <span className="lsNative">{lang.nativeName}</span>
                  )}
                </div>
                <p className="lsDesc">{lang.desc}</p>
                <p className="lsSample">"{lang.sample}"</p>
              </div>
              {language === lang.code && (
                <span className="lsCheck">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer note */}
        {!isChange && (
          <p className="lsNote">
            💡 You can change your language anytime from the header menu.
          </p>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
