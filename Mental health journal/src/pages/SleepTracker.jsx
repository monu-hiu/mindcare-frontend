// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./sleep.css";

// function SleepTracker() {
//   const { token } = useAuth();

//   const [hours, setHours] = useState("");
//   const [quality, setQuality] = useState("");
//   const [bedTime, setBedTime] = useState("");
//   const [wakeTime, setWakeTime] = useState("");
//   const [notes, setNotes] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loadingHistory, setLoadingHistory] = useState(true);

//   const qualityOptions = [
//     { label: "Excellent", emoji: "😴", color: "#22c55e" },
//     { label: "Good", emoji: "🙂", color: "#4ade80" },
//     { label: "Fair", emoji: "😐", color: "#eab308" },
//     { label: "Poor", emoji: "😫", color: "#ef4444" },
//   ];

//   useEffect(() => {
//     fetchHistory();
//     fetchStats();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/history", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setHistory(data.sleepLogs);
//     } catch (err) {
//       console.error("History fetch error:", err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setStats(data.stats);
//     } catch (err) {
//       console.error("Stats fetch error:", err);
//     }
//   };

//   const saveSleep = async () => {
//     if (!hours || !quality) {
//       setError("Please enter sleep hours and select quality.");
//       return;
//     }
//     if (hours < 0 || hours > 24) {
//       setError("Please enter valid sleep hours (0-24).");
//       return;
//     }

//     setSaving(true);
//     setError("");

//     try {
//       const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           hours: parseFloat(hours),
//           quality,
//           bedTime,
//           wakeTime,
//           notes,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSaved(true);
//         setHistory([data.sleepLog, ...history]);
//         setHours("");
//         setQuality("");
//         setBedTime("");
//         setWakeTime("");
//         setNotes("");
//         fetchStats();
//         setTimeout(() => setSaved(false), 3000);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getHoursColor = (h) => {
//     if (h >= 7 && h <= 9) return "#22c55e";
//     if (h >= 6 && h < 7) return "#eab308";
//     return "#ef4444";
//   };

//   return (
//     <div className="sleepPage">
//       <div className="sleepHeader">
//         <h1>🌙 Sleep Tracker</h1>
//         <p>Track your sleep patterns and improve your rest quality.</p>
//       </div>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="sleepStats">
//           <div className="statCard">
//             <p className="statValue">{stats.avgHours}h</p>
//             <p className="statLabel">Avg Sleep (7 days)</p>
//           </div>
//           <div className="statCard">
//             <p className="statValue">{stats.totalNights}</p>
//             <p className="statLabel">Nights Tracked</p>
//           </div>
//           <div className="statCard">
//             <p className="statValue">
//               {Object.entries(stats.qualityCount).sort(
//                 (a, b) => b[1] - a[1]
//               )[0]?.[0] || "—"}
//             </p>
//             <p className="statLabel">Most Common Quality</p>
//           </div>
//         </div>
//       )}

//       {/* Log Form */}
//       <div className="sleepForm">
//         <h2>Log Tonight's Sleep</h2>

//         <div className="formRow">
//           <div className="formGroup">
//             <label>Hours Slept</label>
//             <input
//               type="number"
//               placeholder="e.g. 7.5"
//               value={hours}
//               min="0"
//               max="24"
//               step="0.5"
//               onChange={(e) => {
//                 setHours(e.target.value);
//                 setError("");
//               }}
//             />
//           </div>
//           <div className="formGroup">
//             <label>Bed Time</label>
//             <input
//               type="time"
//               value={bedTime}
//               onChange={(e) => setBedTime(e.target.value)}
//             />
//           </div>
//           <div className="formGroup">
//             <label>Wake Time</label>
//             <input
//               type="time"
//               value={wakeTime}
//               onChange={(e) => setWakeTime(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Quality Selection */}
//         <div className="qualitySection">
//           <label>Sleep Quality</label>
//           <div className="qualityGrid">
//             {qualityOptions.map((q) => (
//               <div
//                 key={q.label}
//                 className={`qualityCard ${quality === q.label ? "selected" : ""}`}
//                 onClick={() => setQuality(q.label)}
//                 style={{
//                   borderColor: quality === q.label ? q.color : "#e5e7eb",
//                   background: quality === q.label ? `${q.color}15` : "white",
//                 }}
//               >
//                 <span className="qualityEmoji">{q.emoji}</span>
//                 <span className="qualityLabel">{q.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Notes */}
//         <div className="formGroup">
//           <label>Notes (optional)</label>
//           <textarea
//             placeholder="Any notes about your sleep..."
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             maxLength={300}
//           />
//         </div>

//         {error && <p className="errorText">{error}</p>}
//         {saved && <p className="successText">✅ Sleep log saved!</p>}

//         <button
//           onClick={saveSleep}
//           disabled={saving}
//           className="saveBtn"
//         >
//           {saving ? "Saving..." : "Save Sleep Log"}
//         </button>
//       </div>

//       {/* Sleep History */}
//       <div className="sleepHistory">
//         <h2>Sleep History</h2>
//         {loadingHistory ? (
//           <p className="loadingText">Loading...</p>
//         ) : history.length === 0 ? (
//           <p className="emptyText">No sleep logs yet. Log your first night!</p>
//         ) : (
//           <div className="historyList">
//             {history.map((log, index) => (
//               <div key={index} className="sleepCard"
//                 style={{ borderLeft: `4px solid ${getHoursColor(log.hours)}` }}
//               >
//                 <div className="sleepCardLeft">
//                   <p className="sleepHours"
//                     style={{ color: getHoursColor(log.hours) }}
//                   >
//                     {log.hours}h
//                   </p>
//                   <p className="sleepQuality">{log.quality}</p>
//                 </div>
//                 <div className="sleepCardRight">
//                   {log.bedTime && (
//                     <p className="sleepTime">🌙 Bed: {log.bedTime}</p>
//                   )}
//                   {log.wakeTime && (
//                     <p className="sleepTime">☀️ Wake: {log.wakeTime}</p>
//                   )}
//                   {log.notes && (
//                     <p className="sleepNotes">{log.notes}</p>
//                   )}
//                   <p className="sleepDate">
//                     {new Date(log.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="navButtons">
//         <Link to="/dashboard">
//           <button className="backBtn">← Back to Dashboard</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SleepTracker;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./sleep.css";

function SleepTracker() {
  const { token } = useAuth();

  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepHours, setSleepHours] = useState(null);
  const [quality, setQuality] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const qualityOptions = [
    { label: "Excellent", emoji: "😴", color: "#22c55e" },
    { label: "Good",      emoji: "🙂", color: "#4ade80" },
    { label: "Fair",      emoji: "😐", color: "#eab308" },
    { label: "Poor",      emoji: "😫", color: "#ef4444" },
  ];

  // Auto calculate sleep hours
  useEffect(() => {
    if (!bedTime || !wakeTime) {
      setSleepHours(null);
      return;
    }

    const parseMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    let bed  = parseMinutes(bedTime);
    let wake = parseMinutes(wakeTime);

    // Handle overnight — e.g. 23:00 → 07:00
    if (wake <= bed) wake += 24 * 60;

    const hours = parseFloat(((wake - bed) / 60).toFixed(1));
    setSleepHours(hours);

    // Auto set quality based on hours
    if (!quality) {
      if (hours >= 8)      setQuality("Excellent");
      else if (hours >= 7) setQuality("Good");
      else if (hours >= 5) setQuality("Fair");
      else                 setQuality("Poor");
    }
  }, [bedTime, wakeTime]);

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setHistory(data.sleepLogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const saveSleep = async () => {
    if (!bedTime || !wakeTime) {
      setError("Please enter bed time and wake time.");
      return;
    }
    if (!quality) {
      setError("Please select sleep quality.");
      return;
    }
    if (sleepHours === null || sleepHours <= 0) {
      setError("Invalid time range. Please check bed and wake time.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          hours: sleepHours,
          quality,
          bedTime,
          wakeTime,
          notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setHistory([data.sleepLog, ...history]);
        setBedTime("");
        setWakeTime("");
        setSleepHours(null);
        setQuality("");
        setNotes("");
        fetchStats();
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

  const getHoursColor = (h) => {
    if (h >= 7) return "#22c55e";
    if (h >= 5) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="sleepPage">
      <div className="sleepHeader">
        <h1>🌙 Sleep Tracker</h1>
        <p>Track your sleep patterns and improve your rest quality.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="sleepStats">
          <div className="statCard">
            <p className="statValue">{stats.avgHours}h</p>
            <p className="statLabel">Avg Sleep (7 days)</p>
          </div>
          <div className="statCard">
            <p className="statValue">{stats.totalNights}</p>
            <p className="statLabel">Nights Tracked</p>
          </div>
          <div className="statCard">
            <p className="statValue">
              {Object.entries(stats.qualityCount || {})
                .sort((a, b) => b[1] - a[1])[0]?.[0] || "—"}
            </p>
            <p className="statLabel">Most Common Quality</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="sleepForm">
        <h2>Log Tonight's Sleep</h2>

        {/* Bed Time + Wake Time */}
        <div className="sleepTimeRow">
          <div className="timeGroup">
            <label>🌙 Bed Time</label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="timeInput"
            />
          </div>

          <div className="timeArrow">→</div>

          <div className="timeGroup">
            <label>☀️ Wake Time</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="timeInput"
            />
          </div>

          {/* Auto calculated result */}
          <div className="sleepResult">
            <label>Total Sleep</label>
            <p className="sleepResultValue"
              style={{ color: sleepHours !== null
                ? getHoursColor(sleepHours) : "#9ca3af" }}>
              {sleepHours !== null ? `${sleepHours}h` : "—"}
            </p>
          </div>
        </div>

        {/* Sleep message */}
        {sleepHours !== null && (
          <div className="sleepAutoMsg"
            style={{ color: sleepHours >= 7 ? "#16a34a" : "#dc2626",
                     background: sleepHours >= 7 ? "#f0fdf4" : "#fef2f2",
                     border: `1px solid ${sleepHours >= 7 ? "#bbf7d0" : "#fecaca"}` }}>
            {sleepHours >= 8
              ? "🌟 Excellent! You got optimal sleep."
              : sleepHours >= 7
              ? "✅ Good sleep! You met the recommended 7 hours."
              : sleepHours >= 5
              ? "⚠️ Below recommended. Try to get 7-8 hours."
              : "❌ Very low sleep. This affects mood and energy significantly."}
          </div>
        )}

        {/* Quality */}
        <div className="qualitySection">
          <label>Sleep Quality</label>
          <div className="qualityGrid">
            {qualityOptions.map((q) => (
              <div
                key={q.label}
                className={`qualityCard ${quality === q.label ? "selected" : ""}`}
                onClick={() => setQuality(q.label)}
                style={{
                  borderColor: quality === q.label ? q.color : "#e5e7eb",
                  background:  quality === q.label ? `${q.color}15` : "white",
                }}
              >
                <span className="qualityEmoji">{q.emoji}</span>
                <span className="qualityLabel">{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="formGroup">
          <label>Notes (optional)</label>
          <textarea
            placeholder="Any notes about your sleep..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={300}
          />
        </div>

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">✅ Sleep log saved!</p>}

        <button onClick={saveSleep} disabled={saving} className="saveBtn">
          {saving ? "Saving..." : "Save Sleep Log"}
        </button>
      </div>

      {/* History */}
      <div className="sleepHistory">
        <h2>Sleep History</h2>
        {loadingHistory ? (
          <p className="loadingText">Loading...</p>
        ) : history.length === 0 ? (
          <p className="emptyText">No sleep logs yet. Log your first night!</p>
        ) : (
          <div className="historyList">
            {history.map((log, i) => (
              <div key={i} className="sleepCard"
                style={{ borderLeft: `4px solid ${getHoursColor(log.hours)}` }}>
                <div className="sleepCardLeft">
                  <p className="sleepHours"
                    style={{ color: getHoursColor(log.hours) }}>
                    {log.hours}h
                  </p>
                  <p className="sleepQuality">{log.quality}</p>
                </div>
                <div className="sleepCardRight">
                  {log.bedTime && (
                    <p className="sleepTime">🌙 Bed: {log.bedTime}</p>
                  )}
                  {log.wakeTime && (
                    <p className="sleepTime">☀️ Wake: {log.wakeTime}</p>
                  )}
                  {log.notes && (
                    <p className="sleepNotes">{log.notes}</p>
                  )}
                  <p className="sleepDate">
                    {new Date(log.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

export default SleepTracker;