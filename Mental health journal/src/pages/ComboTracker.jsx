import { useState, useEffect, useCallback } from "react";
import { sendComboNotification } from "../utils/notifications";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./comboTracker.css";

function ComboTracker() {
  const { token } = useAuth();

  const [todayData, setTodayData] = useState({
    mood: null,
    sleep: null,
    energy: null,
    anxiety: null,
  });
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifSent, setNotifSent] = useState(false);

  // Fetch today's data from all trackers
  const fetchTodayData = useCallback(async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const headers = { Authorization: `Bearer ${token}` };

      const [moodRes, sleepRes, energyRes, anxietyRes] = await Promise.all([
        fetch("https://mindcare-backend-v56a.onrender.com/api/mood/today", { headers }),
        fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/history", { headers }),
        fetch("https://mindcare-backend-v56a.onrender.com/api/energy/history", { headers }),
        fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/history", { headers }),
      ]);

      const [moodData, sleepData, energyData, anxietyData] = await Promise.all([
        moodRes.json(),
        sleepRes.json(),
        energyRes.json(),
        anxietyRes.json(),
      ]);

      const moodMap = {
        Happy: 10, Good: 8, Neutral: 5, Sad: 3, Angry: 2, Anxious: 2,
      };

      // Get today's logs
      const todayStr = new Date().toDateString();

      const todaySleep = sleepData.sleepLogs?.find(
        (l) => new Date(l.createdAt).toDateString() === todayStr
      );
      const todayEnergy = energyData.logs?.find(
        (l) => new Date(l.createdAt).toDateString() === todayStr
      );
      const todayAnxiety = anxietyData.logs?.find(
        (l) => new Date(l.createdAt).toDateString() === todayStr
      );

      const newData = {
        mood:    moodData.todayMood || null,
        sleep:   todaySleep || null,
        energy:  todayEnergy || null,
        anxiety: todayAnxiety || null,
      };

      setTodayData(newData);

      // Calculate score out of 20
      let s = 0;
      let tracked = 0;

      if (newData.mood) {
        s += Math.round((moodMap[newData.mood.mood] || 5) / 10 * 5);
        tracked++;
      }
      if (newData.sleep) {
        const h = newData.sleep.hours;
        s += h >= 7 ? 5 : h >= 5 ? 3 : 1;
        tracked++;
      }
      if (newData.energy) {
        s += Math.round(newData.energy.level / 10 * 5);
        tracked++;
      }
      if (newData.anxiety) {
        s += Math.round((10 - newData.anxiety.level) / 10 * 5);
        tracked++;
      }

      setScore(tracked > 0 ? s : null);

    } catch (err) {
      console.error("Combo fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTodayData();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchTodayData, 30000);
    return () => clearInterval(interval);
  }, [fetchTodayData]);

  // Send notification when score changes
  useEffect(() => {
  if (score === null) return;

  const today = new Date().toDateString();
  const lastNotified = localStorage.getItem("mc_combo_notified");

  if (lastNotified === today) return;

  sendComboNotification(score);

  localStorage.setItem("mc_combo_notified", today);
}, [score]);
  

  // Score display logic
  const getScoreInfo = (s) => {
    if (s === null) return null;
    if (s < 7)  return { label: "Tough Day",    emoji: "💙", color: "#ef4444", bg: "#fef2f2", msg: "Today seems tough. Be kind to yourself." };
    if (s < 14) return { label: "Moderate Day", emoji: "😐", color: "#f59e0b", bg: "#fffbeb", msg: "You are doing okay. Keep using your coping strategies." };
    return            { label: "Good Day",      emoji: "🌟", color: "#22c55e", bg: "#f0fdf4", msg: "Amazing! You are thriving today." };
  };

  const scoreInfo = getScoreInfo(score);

  const moodMap = { Happy: 10, Good: 8, Neutral: 5, Sad: 3, Angry: 2, Anxious: 2 };
  const moodEmojis = { Happy: "😄", Good: "🙂", Neutral: "😐", Sad: "😔", Angry: "😡", Anxious: "😰" };

  return (
    <div className="comboPage">
      <div className="comboHeader">
        <h1>🔄 Combo Tracker</h1>
        <p>Your daily wellness score — auto-updated from all your trackers.</p>
        <button className="refreshBtn" onClick={fetchTodayData}>
          🔄 Refresh Now
        </button>
      </div>

      {loading ? (
        <div className="comboLoading">Loading your today's data...</div>
      ) : (
        <>
          {/* Score Card */}
          <div className="scoreCard"
            style={{ background: scoreInfo?.bg || "#f9fafb",
                     borderColor: scoreInfo?.color || "#e5e7eb" }}>
            {score !== null ? (
              <>
                <div className="scoreCircleLarge"
                  style={{ border: `4px solid ${scoreInfo.color}`,
                           background: `${scoreInfo.color}15` }}>
                  <p className="scoreNumberLarge" style={{ color: scoreInfo.color }}>
                    {score}
                  </p>
                  <p className="scoreOutOf">/20</p>
                </div>
                <div className="scoreDetails">
                  <p className="scoreDayLabel" style={{ color: scoreInfo.color }}>
                    {scoreInfo.emoji} {scoreInfo.label}
                  </p>
                  <p className="scoreDayMsg">{scoreInfo.msg}</p>
                  <div className="scoreNotifBox"
                    style={{ borderColor: scoreInfo.color, color: scoreInfo.color }}>
                    🔔 {score < 7
                      ? "Today seems like a tough day. Take care of yourself ❤️"
                      : score < 14
                      ? "You're doing okay. Keep going 👍"
                      : "Great job! Today is your amazing day 🎉"}
                  </div>
                </div>
              </>
            ) : (
              <div className="noScoreMsg">
                <p>📊 No data logged today yet.</p>
                <p>Log your mood, sleep, energy, and anxiety to see your score!</p>
              </div>
            )}
          </div>

          {/* Today's Tracker Summary */}
          <div className="trackerSummary">
            <h2>Today's Summary</h2>
            <div className="summaryGrid">

              {/* Mood */}
              <div className={`summaryCard ${todayData.mood ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">😊</span>
                  <span className="summaryTitle">Mood</span>
                  {todayData.mood
                    ? <span className="loggedBadge">✅ Logged</span>
                    : <span className="notLoggedBadge">Not logged</span>}
                </div>
                {todayData.mood ? (
                  <div className="summaryData">
                    <p className="summaryValue">
                      {moodEmojis[todayData.mood.mood]} {todayData.mood.mood}
                    </p>
                    {todayData.mood.note && (
                      <p className="summaryNote">"{todayData.mood.note}"</p>
                    )}
                  </div>
                ) : (
                  <Link to="/mood-tracker" className="logNowLink">
                    Log Mood →
                  </Link>
                )}
              </div>

              {/* Sleep */}
              <div className={`summaryCard ${todayData.sleep ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">🌙</span>
                  <span className="summaryTitle">Sleep</span>
                  {todayData.sleep
                    ? <span className="loggedBadge">✅ Logged</span>
                    : <span className="notLoggedBadge">Not logged</span>}
                </div>
                {todayData.sleep ? (
                  <div className="summaryData">
                    <p className="summaryValue"
                      style={{ color: todayData.sleep.hours >= 7 ? "#22c55e" : "#ef4444" }}>
                      {todayData.sleep.hours}h — {todayData.sleep.quality}
                    </p>
                    {todayData.sleep.bedTime && (
                      <p className="summaryNote">
                        🌙 {todayData.sleep.bedTime} → ☀️ {todayData.sleep.wakeTime}
                      </p>
                    )}
                  </div>
                ) : (
                  <Link to="/sleep-tracker" className="logNowLink">
                    Log Sleep →
                  </Link>
                )}
              </div>

              {/* Energy */}
              <div className={`summaryCard ${todayData.energy ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">⚡</span>
                  <span className="summaryTitle">Energy</span>
                  {todayData.energy
                    ? <span className="loggedBadge">✅ Logged</span>
                    : <span className="notLoggedBadge">Not logged</span>}
                </div>
                {todayData.energy ? (
                  <div className="summaryData">
                    <p className="summaryValue"
                      style={{ color: todayData.energy.level >= 7 ? "#22c55e" :
                               todayData.energy.level >= 4 ? "#f59e0b" : "#ef4444" }}>
                      {todayData.energy.level}/10 — {todayData.energy.mood}
                    </p>
                  </div>
                ) : (
                  <Link to="/energy-tracker" className="logNowLink">
                    Log Energy →
                  </Link>
                )}
              </div>

              {/* Anxiety */}
              <div className={`summaryCard ${todayData.anxiety ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">💭</span>
                  <span className="summaryTitle">Anxiety</span>
                  {todayData.anxiety
                    ? <span className="loggedBadge">✅ Logged</span>
                    : <span className="notLoggedBadge">Not logged</span>}
                </div>
                {todayData.anxiety ? (
                  <div className="summaryData">
                    <p className="summaryValue"
                      style={{ color: todayData.anxiety.level <= 3 ? "#22c55e" :
                               todayData.anxiety.level <= 6 ? "#f59e0b" : "#ef4444" }}>
                      {todayData.anxiety.level}/10 — {
                        todayData.anxiety.level <= 3 ? "Low" :
                        todayData.anxiety.level <= 6 ? "Moderate" : "High"
                      }
                    </p>
                    {todayData.anxiety.triggers?.length > 0 && (
                      <p className="summaryNote">
                        Triggers: {todayData.anxiety.triggers.join(", ")}
                      </p>
                    )}
                  </div>
                ) : (
                  <Link to="/anxiety-tracker" className="logNowLink">
                    Log Anxiety →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Progress toward complete log */}
          <div className="completionCard">
            <div className="completionHeader">
              <p className="completionTitle">Daily Log Completion</p>
              <p className="completionCount">
                {[todayData.mood, todayData.sleep,
                  todayData.energy, todayData.anxiety].filter(Boolean).length}/4
              </p>
            </div>
            <div className="completionBar">
              <div className="completionFill" style={{
                width: `${[todayData.mood, todayData.sleep,
                           todayData.energy, todayData.anxiety]
                           .filter(Boolean).length / 4 * 100}%`
              }} />
            </div>
            <p className="completionMsg">
              {[todayData.mood, todayData.sleep,
                todayData.energy, todayData.anxiety].filter(Boolean).length === 4
                ? "🎉 All 4 trackers logged today! Your score is complete."
                : "Log all 4 trackers for a complete wellness score."}
            </p>
          </div>
        </>
      )}

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default ComboTracker;