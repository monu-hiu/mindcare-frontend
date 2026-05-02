import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./selfcongrats.css";
import DropdownSelect from "../components/DropdownSelect";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";

function SelfCongrats() {
  const [congrats, setCongrats] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Achievement");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const {language,t} = useLanguage();

  const categories = [
    { label: t("congrats.label1"), emoji: "🏆" },
    { label: t("congrats.label2"), emoji: "💪" },
    { label: t("congrats.label3"), emoji: "🌱" },
    { label: t("congrats.label4"), emoji: "💝" },
    { label: t("congrats.label5"), emoji: "🔥" },
    { label: t("congrats.label6"), emoji: "⭐" },
  ];

  const prompts = [
    t("congrats.prompts.p1"),
    t("congrats.prompts.p2"),
    t("congrats.prompts.p3"),
   t("congrats.prompts.p4"),
   t("congrats.prompts.p5"),
    t("congrats.prompts.p6"),
  ];

  useEffect(() => {
    const saved = localStorage.getItem("mindcare_self_congrats");
    if (saved) setCongrats(JSON.parse(saved));
  }, []);

  const saveCongrat = () => {
    if (!text.trim()) {
      setError("Please write something to celebrate!");
      return;
    }

    const newCongrat = {
      id: Date.now(),
      text: text.trim(),
      category,
      emoji: categories.find((c) => c.label === category)?.emoji || "⭐",
      createdAt: new Date().toISOString(),
    };

    const updated = [newCongrat, ...congrats];
    setCongrats(updated);
    localStorage.setItem("mindcare_self_congrats", JSON.stringify(updated));
    setText("");
    setSaved(true);
    setError("");
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteCongrat = (id) => {
    const updated = congrats.filter((c) => c.id !== id);
    setCongrats(updated);
    localStorage.setItem("mindcare_self_congrats", JSON.stringify(updated));
  };

  const categoryColors = {
    Achievement: "#f59e0b",
    Courage: "#ef4444",
    Growth: "#22c55e",
    Kindness: "#ec4899",
    Resilience: "#f97316",
    "Small Win": "#4f46e5",
  };

  return (
    <div className="selfcongratPage">
      <div className="selfcongratHeader">
        <h1>{t("congrats.title")}</h1>
        <p>{t("congrats.subtitle")}</p>
      </div>

      {/* Prompts */}
      <div className="promptsSection">
        <p className="promptsTitle">{t("congrats.promptsTitle")}</p>
        <div className="promptsGrid">
          {prompts.map((p, i) => (
            <button
              key={i}
              className="promptBtn"
              onClick={() => setText(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="selfcongratForm">
        <h2>{t("congrats.selfCongrats")}</h2>

        <div className="categorySelect">
  <DropdownSelect
    options={categories.map(cat => ({
      value: cat.label,
      label: cat.label,
      emoji: cat.emoji
    }))}
    value={category}
    onChange={setCategory}
    placeholder={t("congrats.placeholder")}
    multiple={false}
  />
</div>

        <textarea
          className="congratTextarea"
          placeholder={t("congrats.textPlaceholder")}
          value={text}
          onChange={(e) => { setText(e.target.value); setError(""); }}
          rows={4}
          maxLength={300}
        />

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">{t("congrats.successText")}</p>}

        <button onClick={saveCongrat} className="saveBtn">
         {t("congrats.celebBtn")}
        </button>
      </div>

      {/* History */}
      <div className="congratsHistory">
        <h2>{t("congrats.history")} ({congrats.length})</h2>
        {congrats.length === 0 ? (
          <p className="emptyText">
            {t("congrats.emptyText")}
          </p>
        ) : (
          <div className="congratsList">
            {congrats.map((c) => (
              <div
                key={c.id}
                className="congratCard"
                style={{ borderLeft: `4px solid ${categoryColors[c.category]}` }}
              >
                <div className="congratCardHeader">
                  <div className="congratMeta">
                    <span className="congratEmoji">{c.emoji}</span>
                    <span
                      className="congratCategory"
                      style={{
                        color: categoryColors[c.category],
                        background: `${categoryColors[c.category]}15`,
                      }}
                    >
                      {c.category}
                    </span>
                    <span className="congratDate">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteCongrat(c.id)}
                  >
                    🗑️
                  </button>
                </div>
                <p className="congratText">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default SelfCongrats;