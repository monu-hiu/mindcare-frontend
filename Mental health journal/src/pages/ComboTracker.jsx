import { useState, useEffect, useCallback } from "react";
import { sendComboNotification } from "../utils/notifications";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./comboTracker.css";

function ComboTracker() {
  const { token } = useAuth();
  const { language, t } = useLanguage();

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
    if (s < 7)  return { label: t("comboTracker.scoreInfo.Tough"),    emoji: "💙", color: "#ef4444", bg: "#fef2f2", msg: t("comboTracker.messageInfo.Toughmsg") };
    if (s < 14) return { label: t("comboTracker.scoreInfo.Moderate"), emoji: "😐", color: "#f59e0b", bg: "#fffbeb", msg: t("comboTracker.messageInfo.Moderatemsg") };
    return            { label: t("comboTracker.scoreInfo.Good"),      emoji: "🌟", color: "#22c55e", bg: "#f0fdf4", msg: t("comboTracker.messageInfo.Goodmsg") };
  };

  const scoreInfo = getScoreInfo(score);

  const moodMap = { Happy: 10, Good: 8, Neutral: 5, Sad: 3, Angry: 2, Anxious: 2 };
  const moodEmojis = { Happy: "😄", Good: "🙂", Neutral: "😐", Sad: "😔", Angry: "😡", Anxious: "😰" };

  return (
    <div className="comboPage">
      <div className="comboHeader">
        <h1>{t("comboTracker.title")}</h1>
        <p>{t("comboTracker.subtitle")}</p>
        <button className="refreshBtn" onClick={fetchTodayData}>
          🔄 {t("comboTracker.refreshbtn")}
        </button>
      </div>

      {loading ? (
        <div className="comboLoading">{t("comboTracker.comboLoading")}</div>
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
                <p>{t("comboTracker.noScoremsg")}</p>
                <p>{t("comboTracker.noScoremsgSubtitle")}</p>
              </div>
            )}
          </div>

          {/* Today's Tracker Summary */}
          <div className="trackerSummary">
            <h2>{t("comboTracker.trackerSummary")}</h2>
            <div className="summaryGrid">

              {/* Mood */}
              <div className={`summaryCard ${todayData.mood ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">😊</span>
                  <span className="summaryTitle">{t("comboTracker.summaryMood")}</span>
                  {todayData.mood
                    ? <span className="loggedBadge">{t("comboTracker.loggedBadge")}</span>
                    : <span className="notLoggedBadge">{t("comboTracker.notLoggedBadge")}</span>}
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
                    {t("comboTracker.LogMoodLink")} 
                  </Link>
                )}
              </div>

              {/* Sleep */}
              <div className={`summaryCard ${todayData.sleep ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">🌙</span>
                  <span className="summaryTitle">{t("comboTracker.summarySleep")}</span>
                  {todayData.sleep
                    ? <span className="loggedBadge"> {t("comboTracker.loggedBadge")}</span>
                    : <span className="notLoggedBadge">{t("comboTracker.notLoggedBadge")}</span>}
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
                    {t("comboTracker.LogSleepLink")}
                  </Link>
                )}
              </div>

              {/* Energy */}
              <div className={`summaryCard ${todayData.energy ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">⚡</span>
                  <span className="summaryTitle">{t("comboTracker.summaryEnergy")}</span>
                  {todayData.energy
                    ? <span className="loggedBadge">{t("comboTracker.loggedBadge")}</span>
                    : <span className="notLoggedBadge">{t("comboTracker.notLoggedBadge")}</span>}
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
                    {t("comboTracker.LogEnergyLink")}
                  </Link>
                )}
              </div>

              {/* Anxiety */}
              <div className={`summaryCard ${todayData.anxiety ? "logged" : "empty"}`}>
                <div className="summaryCardHeader">
                  <span className="summaryIcon">💭</span>
                  <span className="summaryTitle">{t("comboTracker.summaryAnxiety")}</span>
                  {todayData.anxiety
                    ? <span className="loggedBadge"> {t("comboTracker.loggedBadge")}</span>
                    : <span className="notLoggedBadge">{t("comboTracker.notLoggedBadge")}</span>}
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
                    {t("comboTracker.LogAnxietyLink")}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Progress toward complete log */}
          <div className="completionCard">
            <div className="completionHeader">
              <p className="completionTitle">{t("comboTracker.completionTitle")}</p>
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
                ? t("comboTracker.completionMsg")
                : t("comboTracker.completionMsgPartial")}
            </p>
          </div>
        </>
      )}

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn"> {t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default ComboTracker;