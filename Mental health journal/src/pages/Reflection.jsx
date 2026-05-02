import "./reflection.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";

function Reflection() {
  const { token } = useAuth();
  const {language,t} = useLanguage();

  const [happy, setHappy] = useState("");
  const [sad, setSad] = useState("");
  const [cope, setCope] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch journal history
  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/journal/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.journals);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveJournal = async () => {
    if (!happy && !sad && !cope) {
      setError("Please write something before saving.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/journal/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ happy, sad, cope }),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setHistory([data.journal, ...history]);
        setHappy("");
        setSad("");
        setCope("");
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteJournal = async (id) => {
    try {
      const res = await fetch(`https://mindcare-backend-v56a.onrender.com/api/journal/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(history.filter((j) => j._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="reflection">
      <div className="overlay">
        <h1>{t("journal.title")}</h1>
        <p className="subtitle">
          {t("journal.subtitle")}
        </p>

        <div className="panels">
          <div className="panel happy">
            <h2>{t("journal.happypannel")}</h2>
            <textarea
              placeholder={t("journal.happyPlaceholder")}
              value={happy}
              onChange={(e) => setHappy(e.target.value)}
            />
          </div>

          <div className="panel sad">
            <h2>{t("journal.unhappyPannel")}</h2>
            <textarea
              placeholder={t("journal.unhappyPlaceholder")}
              value={sad}
              onChange={(e) => setSad(e.target.value)}
            />
          </div>
        </div>

        <div className="coping">
          <h2>{t("journal.coping")}</h2>
          <textarea
            placeholder={t("journal.copingPlaceholder")}
            value={cope}
            onChange={(e) => setCope(e.target.value)}
          />
        </div>

        {error && (
          <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>
        )}

        {saved && (
          <p style={{ color: "#22c55e", marginBottom: "10px" }}>
            {t("journal.saveSuccess")}
          </p>
        )}

        <button
          onClick={saveJournal}
          disabled={saving}
          style={{
            background: "#6366f1",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "40px",
          }}
        >
          {saving ? t("common.save") : t("journal.saveEntry")}
        </button>

        {/* Journal History */}
        <div className="journalHistory">
          <h2>{t("journal.pastTitle")}</h2>
          {loadingHistory ? (
            <p>{t("common.loading")}</p>
          ) : history.length === 0 ? (
            <p className="subtitle">{t("journal.pastSubtitle")}</p>
          ) : (
            history.map((entry) => (
              <div key={entry._id} className="journalEntry">
                <div className="journalEntryHeader">
                  <p className="journalDate">
                    {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <button
                    onClick={() => deleteJournal(entry._id)}
                    className="deleteBtn"
                  >
                    🗑️ {t("common.delete")}
                  </button>
                </div>
                {entry.happy && (
                  <p><strong>{t("journal.happy")}</strong> {entry.happy}</p>
                )}
                {entry.sad && (
                  <p><strong>{t("journal.Low")}</strong> {entry.sad}</p>
                )}
                {entry.cope && (
                  <p><strong>{t("journal.coped")}</strong> {entry.cope}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="navButtons">
          <Link to="/dashboard">
            <button className="navBtn">{t("common.back")}</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Reflection;