import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./gratitude.css";

function GratitudeLog() {
  const { token } = useAuth();

  const [items, setItems] = useState(["", "", ""]);
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/gratitude/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setLogs(data.logs);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleItemChange = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
    setError("");
  };

  const addItem = () => {
    if (items.length < 5) {
      setItems([...items, ""]);
    }
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const saveLog = async () => {
    const filled = items.filter((i) => i.trim() !== "");
    if (filled.length === 0) {
      setError("Please add at least one thing you are grateful for.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/gratitude/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: filled, mood, note }),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setLogs([data.gratitudeLog, ...logs]);
        setItems(["", "", ""]);
        setMood("");
        setNote("");
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

  const deleteLog = async (id) => {
    try {
      const res = await fetch(`https://mindcare-backend-v56a.onrender.com/api/gratitude/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLogs(logs.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="gratitudePage">
      <div className="gratitudeHeader">
        <h1>🙏 Gratitude Log</h1>
        <p>Take a moment to appreciate the good things in your life.</p>
      </div>

      {/* Form */}
      <div className="gratitudeForm">
        <h2>What are you grateful for today?</h2>

        <div className="itemsList">
          {items.map((item, index) => (
            <div key={index} className="itemRow">
              <span className="itemNumber">{index + 1}</span>
              <input
                type="text"
                placeholder={`I am grateful for...`}
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                maxLength={100}
              />
              {items.length > 1 && (
                <button
                  className="removeBtn"
                  onClick={() => removeItem(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {items.length < 5 && (
          <button className="addItemBtn" onClick={addItem}>
            + Add Another
          </button>
        )}

        <div className="formGroup">
          <label>How does this make you feel? (optional)</label>
          <input
            type="text"
            placeholder="e.g. Peaceful, Happy, Blessed..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="formGroup">
          <label>Additional note (optional)</label>
          <textarea
            placeholder="Any additional thoughts..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={300}
          />
        </div>

        {error && <p className="errorText">{error}</p>}
        {saved && (
          <p className="successText">✅ Gratitude log saved!</p>
        )}

        <button
          onClick={saveLog}
          disabled={saving}
          className="saveBtn"
        >
          {saving ? "Saving..." : "Save Gratitude Log"}
        </button>
      </div>

      {/* Logs History */}
      <div className="gratitudeHistory">
        <h2>Past Gratitude Logs</h2>
        {loadingLogs ? (
          <p className="loadingText">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="emptyText">
            No gratitude logs yet. Start your gratitude journey today!
          </p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="gratitudeCard">
              <div className="gratitudeCardHeader">
                <p className="gratitudeDate">
                  {new Date(log.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <button
                  className="deleteBtn"
                  onClick={() => deleteLog(log._id)}
                >
                  🗑️ Delete
                </button>
              </div>

              <ul className="gratitudeItems">
                {log.items.map((item, i) => (
                  <li key={i}>
                    <span className="gratitudeIcon">🙏</span>
                    {item}
                  </li>
                ))}
              </ul>

              {log.mood && (
                <p className="gratitudeMood">Feeling: {log.mood}</p>
              )}
              {log.note && (
                <p className="gratitudeNote">{log.note}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default GratitudeLog;