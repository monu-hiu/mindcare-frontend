
import { useState } from "react";
import { Link } from "react-router-dom";
import "./selfcare.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";

function SelfCare() {
  const [completed, setCompleted] = useState([]);
  const { language, t } = useLanguage();

  // ✅ get sections from translations
  const sections = translations.selfCare[language]?.sections || [];

  // ✅ toggle using ID
  const toggleItem = (id) => {
    setCompleted((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ✅ calculations
  const totalItems = sections.reduce(
    (sum, sec) => sum + sec.items.length,
    0
  );

  const completedCount = completed.length;

  const percentage =
    totalItems === 0
      ? 0
      : Math.round((completedCount / totalItems) * 100);

  return (
    <div className="selfcarePage">
      {/* Header */}
      <div className="selfcareHeader">
        <h1>{t("selfCare.title")}</h1>
        <p>{t("selfCare.subtitle")}</p>
      </div>

      {/* Progress */}
      <div className="selfcareProgress">
        <div className="progressInfo">
          <span>
            {completedCount} {t("selfCare.of")} {totalItems}{" "}
            {t("selfCare.completecount")}
          </span>
          <span>{percentage}%</span>
        </div>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="selfcareCategory">
          <div className="categoryHeader">
            <h2>{section.title}</h2>

            <span className="categoryCount">
              {
                section.items.filter((item) =>
                  completed.includes(item.id)
                ).length
              }
              /{section.items.length}
            </span>
          </div>

          <div className="selfcareItems">
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`selfcareItem ${
                  completed.includes(item.id) ? "done" : ""
                }`}
                onClick={() => toggleItem(item.id)}
              >
                {/* ✅ Circle */}
                <div
                  className={`checkCircle ${
                    completed.includes(item.id) ? "checked" : ""
                  }`}
                  style={{
                    borderColor: completed.includes(item.id)
                      ? "#22c55e"
                      : "#d1d5db",
                    backgroundColor: completed.includes(item.id)
                      ? "#22c55e"
                      : "white",
                    color: completed.includes(item.id)
                      ? "white"
                      : "transparent"
                  }}
                >
                  ✔
                </div>

                {/* ✅ Text */}
                <p
                  className={
                    completed.includes(item.id)
                      ? "itemDone"
                      : ""
                  }
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* All Done */}
      {totalItems > 0 && completedCount === totalItems && (
        <div className="allDoneMsg">
          🎉 {t("selfCare.allDonemsg")}
        </div>
      )}

      {/* Navigation */}
      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">
            {t("common.back")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SelfCare;