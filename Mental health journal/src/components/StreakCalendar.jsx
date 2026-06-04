// src/components/StreakCalendar.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./StreakCalendar.css";

const MOOD_COLORS = {
  Happy:   "#22c55e",
  Good:    "#4ade80",
  Neutral: "#eab308",
  Sad:     "#f97316",
  Angry:   "#ef4444",
  Anxious: "#8b5cf6",
};

function StreakCalendar() {
  const { token } = useAuth();
  const { language } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res  = await fetch(
        "https://mindcare-backend-v56a.onrender.com/api/mood/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) setLogs(data.moods);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Build last 5 weeks (35 days) grid
  const buildGrid = () => {
    const days = [];
    const today = new Date();

    // Map date string to mood
    const moodMap = {};
    logs.forEach((log) => {
      const d = new Date(log.createdAt).toDateString();
      if (!moodMap[d]) moodMap[d] = log;
    });

    for (let i = 34; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toDateString();
      days.push({
        date:  d,
        key,
        log:   moodMap[key] || null,
        isToday: i === 0,
      });
    }
    return days;
  };

  // Calculate current streak
  const getStreak = () => {
    const today   = new Date();
    let streak    = 0;
    const moodSet = new Set(logs.map(l => new Date(l.createdAt).toDateString()));

    for (let i = 0; i <= 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (moodSet.has(d.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const days    = buildGrid();
  const streak  = getStreak();
  const total   = new Set(logs.map(l => new Date(l.createdAt).toDateString())).size;

  // Group by week for display
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const dayLabels = language === "hi"
    ? ["रवि", "सोम", "मंग", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const L = (en, hi, hin) =>
    language === "hi" ? hi : language === "hin" ? hin : en;

  return (
    <div className="calendarCard">
      {/* Header */}
      <div className="calendarHeader">
        <div>
          <h3 className="calendarTitle">
            {L("Mood Calendar", "मूड कैलेंडर", "Mood Calendar")}
          </h3>
          <p className="calendarSubtitle">
            {L("Last 5 weeks", "पिछले 5 हफ्ते", "Pichle 5 hafte")}
          </p>
        </div>
        <div className="calendarStats">
          <div className="calStat">
            <span className="calStatVal">{streak}🔥</span>
            <span className="calStatLabel">{L("Streak", "स्ट्रीक", "Streak")}</span>
          </div>
          <div className="calStat">
            <span className="calStatVal">{total}</span>
            <span className="calStatLabel">{L("Days Logged", "दिन लॉग", "Days")}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="calendarLoading">
          <div className="calSpinner" />
        </div>
      ) : (
        <>
          {/* Day labels */}
          <div className="calDayLabels">
            {dayLabels.map((d) => (
              <span key={d} className="calDayLabel">{d}</span>
            ))}
          </div>

          {/* Grid */}
          <div className="calGrid">
            {weeks.map((week, wi) => (
              <div key={wi} className="calWeek">
                {week.map((day, di) => {
                  const color = day.log ? MOOD_COLORS[day.log.mood] || "#4f46e5" : null;
                  return (
                    <div
                      key={di}
                      className={`calCell ${day.isToday ? "calToday" : ""} ${day.log ? "calLogged" : "calEmpty"}`}
                      style={{
                        background: color || (day.isToday ? "#e0e7ff" : "#f3f4f6"),
                        borderColor: day.isToday ? "#4f46e5" : "transparent",
                      }}
                      onMouseEnter={() => setTooltip({ day, x: wi, y: di })}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {day.isToday && <span className="calTodayDot" />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div className="calTooltip">
              <p className="calTooltipDate">
                {tooltip.day.date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
              {tooltip.day.log ? (
                <>
                  <p className="calTooltipMood">
                    {tooltip.day.log.emoji || "😊"} {tooltip.day.log.mood}
                  </p>
                  {tooltip.day.log.note && (
                    <p className="calTooltipNote">{tooltip.day.log.note.slice(0, 50)}</p>
                  )}
                </>
              ) : (
                <p className="calTooltipEmpty">
                  {L("No mood logged", "मूड लॉग नहीं", "Log nahi kiya")}
                </p>
              )}
            </div>
          )}

          {/* Legend */}
          <div className="calLegend">
            <span className="calLegendLabel">
              {L("Mood:", "मूड:", "Mood:")}
            </span>
            {Object.entries(MOOD_COLORS).map(([mood, color]) => (
              <div key={mood} className="calLegendItem">
                <div className="calLegendDot" style={{ background: color }} />
                <span>{mood}</span>
              </div>
            ))}
            <div className="calLegendItem">
              <div className="calLegendDot" style={{ background: "#f3f4f6", border: "1px solid #e5e7eb" }} />
              <span>{L("None", "कोई नहीं", "None")}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StreakCalendar;