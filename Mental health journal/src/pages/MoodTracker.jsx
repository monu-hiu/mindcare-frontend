

import "./mood.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function MoodTracker() {
  const { token } = useAuth();
  const { language, t } = useLanguage();

  // ✅ key = always English (sent to backend), label = translated (shown in UI)
  const moods = [
    { emoji: "😄", key: "Happy",   label: t("moodTracker.moods.Happy"),   color: "#22c55e" },
    { emoji: "🙂", key: "Good",    label: t("moodTracker.moods.Good"),    color: "#4ade80" },
    { emoji: "😐", key: "Neutral", label: t("moodTracker.moods.Neutral"), color: "#eab308" },
    { emoji: "😔", key: "Sad",     label: t("moodTracker.moods.Sad"),     color: "#f97316" },
    { emoji: "😡", key: "Angry",   label: t("moodTracker.moods.Angry"),   color: "#ef4444" },
    { emoji: "😰", key: "Anxious", label: t("moodTracker.moods.Anxious"), color: "#8b5cf6" },
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMood, setSavedMood] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setHistory(data.moods);
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

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood.key,   // ✅ always "Happy", "Sad" etc — never Hindi/Hinglish
          emoji: selectedMood.emoji,
          note: note,
          color: selectedMood.color,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedMood(selectedMood);
        setHistory([data.moodLog, ...history]);
        setNote("");
        setSelectedMood(null);
        if (data.streakCount) {
          console.log("Streak updated:", data.streakCount);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t("common.error")); // ✅ translated
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="moodPage">
      <h1>{t("moodTracker.title")}</h1>
      <p className="subtitle">{t("moodTracker.subtitle")}</p>

      {/* Mood Selection */}
      <div className="moodGrid">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`moodCard ${selectedMood?.key === mood.key ? "active" : ""}`}
            onClick={() => setSelectedMood(mood)}
            style={{
              borderColor: selectedMood?.key === mood.key ? mood.color : "#eee",
            }}
          >
            <div className="emoji">{mood.emoji}</div>
            <p>{mood.label}</p>
          </div>
        ))}
      </div>

      {/* Note */}
      {selectedMood && (
        <div className="noteSection">
          <textarea
            placeholder={t("moodTracker.notePlaceholder")} // ✅ fixed
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: "#ef4444", textAlign: "center", margin: "10px 0" }}>
          {error}
        </p>
      )}

      {/* Save Button */}
      {selectedMood && (
        <div className="selected">
          <p>
            Selected: <strong>{selectedMood.emoji} {selectedMood.label}</strong>
          </p>
          <button onClick={saveMood} className="saveBtn" disabled={saving}>
            {saving ? t("common.saving") : t("moodTracker.saveBtn")}
          </button>
        </div>
      )}

      {/* Success Message */}
      {savedMood && (
        <div className="result">
          <p>{t("common.saved")}: <strong>{savedMood.emoji} {savedMood.label}</strong></p>
        </div>
      )}

      {/* Mood History */}
      <div className="historySection">
        <h2>{t("moodTracker.historyTitle")}</h2>
        {loadingHistory ? (
          <p>{t("common.loading")}</p> // ✅ fixed
        ) : history.length === 0 ? (
          <p className="subtitle">{t("moodTracker.historySubtitle")}</p>
        ) : (
          <div className="historyList">
            {history.map((log, index) => (
              <div
                key={index}
                className="historyItem"
                style={{ borderLeft: `4px solid ${log.color || "#6366f1"}` }}
              >
                <span className="historyEmoji">{log.emoji}</span>
                <div className="historyInfo">
                  <p className="historyMood">{log.mood}</p>
                  {log.note && <p className="historyNote">{log.note}</p>}
                  <p className="historyDate">
                    {new Date(log.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
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