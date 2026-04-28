import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./improvement.css";

function ImprovementTracker() {
  const { token } = useAuth();
  const {language, t} = useLanguage();
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLines, setActiveLines] = useState({
    mood: true, sleep: true, anxiety: true, energy: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/improvement/data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setChartData(data.chartData);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLine = (key) => {
    setActiveLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const lines = [
    { key: "mood",    color: "#4f46e5", label: "Mood (1-10)" },
    { key: "sleep",   color: "#06b6d4", label: "Sleep (hours)" },
    { key: "anxiety", color: "#ef4444", label: "Anxiety (1-10)" },
    { key: "energy",  color: "#f59e0b", label: "Energy (1-10)" },
  ];

  const statCards = [
    { key: "avgMood",    label: "Avg Mood",    color: "#4f46e5", suffix: "/10" },
    { key: "avgSleep",   label: "Avg Sleep",   color: "#06b6d4", suffix: "h" },
    { key: "avgAnxiety", label: "Avg Anxiety", color: "#ef4444", suffix: "/10" },
    { key: "avgEnergy",  label: "Avg Energy",  color: "#f59e0b", suffix: "/10" },
  ];

  return (
    <div className="improvementPage">
      <div className="improvementHeader">
        <h1>{t("improvementTracker.title")}</h1>
        <p>{t("improvementTracker.subtitle")}</p>
      </div>

      {/* Stat Cards */}
      {stats && (
        <div className="improvementStats">
          {statCards.map((card) => (
            <div key={card.key} className="improvementStatCard">
              <p className="improvementStatValue"
                style={{ color: card.color }}>
                {stats[card.key] !== null
                  ? `${stats[card.key]}${card.suffix}`
                  : "—"}
              </p>
              <p className="improvementStatLabel">{card.label}</p>
              <p className="improvementStatSub">{t("improvementTracker.improvementSub")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="chartCard">
        <div className="chartHeader">
          <h2>{t("improvementTracker.chartHeader")}</h2>
          <div className="chartToggles">
            {lines.map((line) => (
              <button
                key={line.key}
                className={`toggleBtn ${activeLines[line.key] ? "active" : ""}`}
                style={{
                  borderColor: activeLines[line.key] ? line.color : "#e5e7eb",
                  color: activeLines[line.key] ? line.color : "#9ca3af",
                  background: activeLines[line.key] ? `${line.color}10` : "white",
                }}
                onClick={() => toggleLine(line.key)}
              >
                {line.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="chartLoading">{t("improvementTracker.chartLoading")}</div>
        ) : chartData.every(d =>
            d.mood === null && d.sleep === null &&
            d.anxiety === null && d.energy === null) ? (
          <div className="chartEmpty">
            <p>📊 {t("common.noData")}</p>
            <p>{t("improvementTracker.noDataMsg")}</p>
            <div className="chartEmptyLinks">
              <Link to="/mood-tracker">{t("improvementTracker.LogMoodLabel")}</Link>
              <Link to="/sleep-tracker">{t("improvementTracker.LogSleepLabel")}</Link>
              <Link to="/anxiety-tracker">{t("improvementTracker.LogAnxietyLabel")}</Link>
              <Link to="/energy-tracker">{t("improvementTracker.LogEnergyLabel")}</Link>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px", fontSize: "12px",
                  border: "1px solid #e0e7ff",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {lines.map((line) =>
                activeLines[line.key] ? (
                  <Line
                    key={line.key}
                    type="monotone"
                    dataKey={line.key}
                    stroke={line.color}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: line.color }}
                    activeDot={{ r: 6 }}
                    connectNulls={false}
                    name={line.label}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Insights */}
      {stats && (
        <div className="insightsCard">
          <h2>{t("improvementTracker.InsightsTitle")}</h2>
          <div className="insightsList">
            {stats.avgMood && parseFloat(stats.avgMood) >= 7 && (
              <div className="insightItem good">
                {t("improvementTracker.mooditemGood")}
              </div>
            )}
            {stats.avgMood && parseFloat(stats.avgMood) < 5 && (
              <div className="insightItem bad">
                {t("improvementTracker.mooditemBad")}
              </div>
            )}
            {stats.avgSleep && parseFloat(stats.avgSleep) >= 7 && (
              <div className="insightItem good">
                {t("improvementTracker.sleepitemGood")}
              </div>
            )}
            {stats.avgSleep && parseFloat(stats.avgSleep) < 6 && (
              <div className="insightItem bad">
                {t("improvementTracker.sleepitemBad")}
              </div>
            )}
            {stats.avgAnxiety && parseFloat(stats.avgAnxiety) >= 7 && (
              <div className="insightItem bad">
                {t("improvementTracker.anxietyitemBad")}
              </div>
            )}
            {stats.avgAnxiety && parseFloat(stats.avgAnxiety) <= 3 && (
              <div className="insightItem good">
                {t("improvementTracker.anxietyitemGood")}
              </div>
            )}
            {stats.avgEnergy && parseFloat(stats.avgEnergy) >= 7 && (
              <div className="insightItem good">
                {t("improvementTracker.energyitemGood")}
              </div>
            )}
            {stats.avgEnergy && parseFloat(stats.avgEnergy) < 4 && (
              <div className="insightItem bad">
                {t("improvementTracker.energyitemBad")}
              </div>
            )}
            {!stats.avgMood && !stats.avgSleep && !stats.avgAnxiety && !stats.avgEnergy && (
              <div className="insightItem neutral">
                {t("improvementTracker.startlogging")}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default ImprovementTracker;