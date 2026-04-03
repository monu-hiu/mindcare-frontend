import "./mood.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MoodTracker() {
  const { token } = useAuth();

  const moods = [
    { emoji: "😄", label: "Happy", color: "#22c55e" },
    { emoji: "🙂", label: "Good", color: "#4ade80" },
    { emoji: "😐", label: "Neutral", color: "#eab308" },
    { emoji: "😔", label: "Sad", color: "#f97316" },
    { emoji: "😡", label: "Angry", color: "#ef4444" },
    { emoji: "😰", label: "Anxious", color: "#8b5cf6" },
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMood, setSavedMood] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  // Mood history fetch karo
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.moods);
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

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/mood/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood.label,
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
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="moodPage">
      <h1>Mood Tracker</h1>
      <p className="subtitle">How are you feeling right now?</p>

      {/* Mood Selection */}
      <div className="moodGrid">
        {moods.map((mood, index) => (
          <div
            key={index}
            className={`moodCard ${selectedMood?.label === mood.label ? "active" : ""}`}
            onClick={() => setSelectedMood(mood)}
            style={{
              borderColor: selectedMood?.label === mood.label
                ? mood.color : "#eee"
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
          placeholder="Add a note... (optional)"
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
          <button
            onClick={saveMood}
            className="saveBtn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Mood"}
          </button>
        </div>
      )}

      {/* Success Message */}
      {savedMood && (
        <div className="result">
          <p> Mood saved: <strong>{savedMood.emoji} {savedMood.label}</strong></p>
        </div>
      )}

      {/* Mood History */}
      <div className="historySection">
        <h2>Your Recent Moods</h2>
        {loadingHistory ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p className="subtitle">No moods logged yet. Log your first mood!</p>
        ) : (
          <div className="historyList">
            {history.map((log, index) => (
              <div key={index} className="historyItem"
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
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default MoodTracker;