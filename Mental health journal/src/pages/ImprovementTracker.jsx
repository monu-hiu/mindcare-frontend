import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import "./improvement.css";

function ImprovementTracker() {
  const { token } = useAuth();
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
        <h1>📈 Improvement Tracker</h1>
        <p>Visualize your mental wellness trends over the last 7 days.</p>
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
              <p className="improvementStatSub">7-day average</p>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="chartCard">
        <div className="chartHeader">
          <h2>7-Day Wellness Trends</h2>
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
          <div className="chartLoading">Loading your data...</div>
        ) : chartData.every(d =>
            d.mood === null && d.sleep === null &&
            d.anxiety === null && d.energy === null) ? (
          <div className="chartEmpty">
            <p>📊 No data yet!</p>
            <p>Start logging your mood, sleep, anxiety, and energy to see trends here.</p>
            <div className="chartEmptyLinks">
              <Link to="/mood-tracker">Log Mood</Link>
              <Link to="/sleep-tracker">Log Sleep</Link>
              <Link to="/anxiety-tracker">Log Anxiety</Link>
              <Link to="/energy-tracker">Log Energy</Link>
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
          <h2>Weekly Insights</h2>
          <div className="insightsList">
            {stats.avgMood && parseFloat(stats.avgMood) >= 7 && (
              <div className="insightItem good">
                🌟 Your mood has been great this week! Keep it up!
              </div>
            )}
            {stats.avgMood && parseFloat(stats.avgMood) < 5 && (
              <div className="insightItem bad">
                💙 Your mood has been low. Consider trying mindfulness or journaling.
              </div>
            )}
            {stats.avgSleep && parseFloat(stats.avgSleep) >= 7 && (
              <div className="insightItem good">
                😴 Excellent sleep this week! Sleep is key to mental health.
              </div>
            )}
            {stats.avgSleep && parseFloat(stats.avgSleep) < 6 && (
              <div className="insightItem bad">
                🌙 You are not getting enough sleep. Try a consistent bedtime routine.
              </div>
            )}
            {stats.avgAnxiety && parseFloat(stats.avgAnxiety) >= 7 && (
              <div className="insightItem bad">
                💭 High anxiety levels detected. Try breathing exercises daily.
              </div>
            )}
            {stats.avgAnxiety && parseFloat(stats.avgAnxiety) <= 3 && (
              <div className="insightItem good">
                ✅ Low anxiety this week — you are managing stress well!
              </div>
            )}
            {stats.avgEnergy && parseFloat(stats.avgEnergy) >= 7 && (
              <div className="insightItem good">
                ⚡ High energy levels — great time to work on your goals!
              </div>
            )}
            {stats.avgEnergy && parseFloat(stats.avgEnergy) < 4 && (
              <div className="insightItem bad">
                😴 Low energy this week. Check your sleep and nutrition.
              </div>
            )}
            {!stats.avgMood && !stats.avgSleep && !stats.avgAnxiety && !stats.avgEnergy && (
              <div className="insightItem neutral">
                📊 Start logging daily to get personalized insights here!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default ImprovementTracker;