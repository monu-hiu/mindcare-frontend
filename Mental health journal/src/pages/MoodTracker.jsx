import "./mood.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import VoiceTextarea from "../components/VoiceTextarea";

// Mood config with colors and backgrounds
const MOOD_CONFIG = {
  Happy:   { emoji: "😄", color: "#22c55e", bg: "#f0fdf4", border: "#86efac" },
  Good:    { emoji: "🙂", color: "#4ade80", bg: "#f0fdf4", border: "#86efac" },
  Neutral: { emoji: "😐", color: "#eab308", bg: "#fefce8", border: "#fde047" },
  Sad:     { emoji: "😔", color: "#f97316", bg: "#fff7ed", border: "#fdba74" },
  Angry:   { emoji: "😡", color: "#ef4444", bg: "#fef2f2", border: "#fca5a5" },
  Anxious: { emoji: "😰", color: "#8b5cf6", bg: "#f5f3ff", border: "#c4b5fd" },
};

function MoodTracker() {
  const { token } = useAuth();
  const { language, t } = useLanguage();

  const moods = [
    { key: "Happy",   label: t("moodTracker.moods.Happy")   },
    { key: "Good",    label: t("moodTracker.moods.Good")    },
    { key: "Neutral", label: t("moodTracker.moods.Neutral") },
    { key: "Sad",     label: t("moodTracker.moods.Sad")     },
    { key: "Angry",   label: t("moodTracker.moods.Angry")   },
    { key: "Anxious", label: t("moodTracker.moods.Anxious") },
  ];

  const [selectedMood,    setSelectedMood]    = useState(null);
  const [note,            setNote]            = useState("");
  const [saving,          setSaving]          = useState(false);
  const [savedMood,       setSavedMood]       = useState(null);
  const [history,         setHistory]         = useState([]);
  const [loadingHistory,  setLoadingHistory]  = useState(true);
  const [error,           setError]           = useState("");

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res  = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        // ✅ Filter last 7 days for UI display
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        setHistory(data.moods.filter(m => new Date(m.createdAt) >= sevenDaysAgo));
      }
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveMood = async () => {
    if (!selectedMood) return;
    setSaving(true);
    setError("");

    const config = MOOD_CONFIG[selectedMood.key];

    try {
      const res  = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({
          mood:  selectedMood.key,   // ✅ always English key
          emoji: config.emoji,
          note,
          color: config.color,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedMood(selectedMood);
        setHistory(prev => [data.moodLog, ...prev]);
        setNote("");
        setSelectedMood(null);
        setTimeout(() => setSavedMood(null), 3000);
      } else {
        setError(data.message);
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setSaving(false);
    }
  };

  const selectedConfig = selectedMood ? MOOD_CONFIG[selectedMood.key] : null;

  return (
    <div className="moodPage">
      <h1>{t("moodTracker.title")}</h1>
      <p className="subtitle">{t("moodTracker.subtitle")}</p>

      {/* ── MOOD GRID ── */}
      <div className="moodGrid">
        {moods.map((mood) => {
          const config     = MOOD_CONFIG[mood.key];
          const isSelected = selectedMood?.key === mood.key;

          return (
            <div
              key={mood.key}
              className={`moodCard ${isSelected ? "active" : ""}`}
              onClick={() => { setSelectedMood(mood); setError(""); }}
              style={{
                borderColor: isSelected ? config.color    : "#e5e7eb",
                background:  isSelected ? config.bg       : "white",
                borderWidth: isSelected ? "2.5px"         : "2px",
                transform:   isSelected ? "translateY(-6px) scale(1.06)" : "none",
                boxShadow:   isSelected
                  ? `0 10px 24px ${config.color}35`
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* ✅ Checkmark when selected */}
              {isSelected && (
                <div
                  className="moodCheckmark"
                  style={{ background: config.color }}
                >
                  ✓
                </div>
              )}
              <div
                className="emoji"
                style={{ filter: isSelected ? "none" : "saturate(0.8)" }}
              >
                {config.emoji}
              </div>
              <p style={{ color: isSelected ? config.color : "#374151", fontWeight: isSelected ? 700 : 500 }}>
                {mood.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* ✅ Selected indicator bar */}
      {selectedMood && (
        <div
          className="moodSelectedBar"
          style={{
            background:  selectedConfig?.bg,
            borderColor: selectedConfig?.color,
            color:       selectedConfig?.color,
          }}
        >
          <span>{language === "hi" ? "चुना गया:" : language === "hin" ? "Selected:" : "Selected:"}</span>
          <span style={{ fontSize: "22px" }}>{selectedConfig?.emoji}</span>
          <span style={{ fontWeight: 700 }}>{selectedMood.label}</span>
        </div>
      )}

      {/* ── NOTE ── */}
      {selectedMood && (
        <div className="noteSection">
          <VoiceTextarea
            value={note}
            onChange={(val) => setNote(val)}
            placeholder={t("moodTracker.notePlaceholder")}
            maxLength={500}
            rows={4}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="errorText">⚠️ {error}</p>
      )}

      {/* Save Button */}
      {selectedMood && (
        <div className="selected">
          <button
            onClick={saveMood}
            className="saveBtn"
            disabled={saving}
            style={{ background: selectedConfig?.color }}
          >
            {saving ? t("common.saving") : t("moodTracker.saveBtn")}
          </button>
        </div>
      )}

      {/* Success */}
      {savedMood && (
        <div className="result">
          <p>
            {t("common.saved")}:{" "}
            <strong>
              {MOOD_CONFIG[savedMood.key].emoji} {savedMood.label}
            </strong>
          </p>
        </div>
      )}

      {/* ── HISTORY (Last 7 Days) ── */}
      <div className="historySection">
        <h2>{t("moodTracker.historyTitle")}</h2>
        {loadingHistory ? (
          <p>{t("common.loading")}</p>
        ) : history.length === 0 ? (
          <p className="subtitle">{language === "hi" ? "पिछले 7 दिनों में कोई मूड लॉग नहीं।" : "No mood logs in last 7 days."}</p>
        ) : (
          <div className="historyList">
            {history.map((log, index) => {
              const cfg = MOOD_CONFIG[log.mood] || { color: "#6366f1", emoji: "😊" };
              return (
                <div
                  key={index}
                  className="historyItem"
                  style={{
                    borderLeft:  `4px solid ${cfg.color}`,
                    background:  `${cfg.color}08`,
                  }}
                >
                  <span className="historyEmoji">{cfg.emoji}</span>
                  <div className="historyInfo">
                    <p className="historyMood" style={{ color: cfg.color }}>
                      {log.mood}
                    </p>
                    {log.note && (
                      <p className="historyNote">{log.note}</p>
                    )}
                    <p className="historyDate">
                      {new Date(log.createdAt).toLocaleDateString("en-IN", {
                        day:    "numeric",
                        month:  "short",
                        year:   "numeric",
                        hour:   "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="nav">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default MoodTracker;