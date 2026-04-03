import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";
import { checkDailyReminder, requestNotificationPermission } from "../utils/notifications";
function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request notification permission on dashboard load
    requestNotificationPermission().then((granted) => {
  if (granted) setTimeout(() => checkDailyReminder(token), 5000);
});
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/user/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = {
      Happy: "😄", Good: "🙂", Neutral: "😐",
      Sad: "😔", Angry: "😡", Anxious: "😰",
    };
    return moods[mood] || "😐";
  };

  const categories = [
    {
      title: "Daily Trackers",
      subtitle: "Track your daily health metrics",
      color: "#4f46e5",
      icon: "📊",
      links: [
        { to: "/mood-tracker", emoji: "😊", label: "Mood Tracker" },
        { to: "/sleep-tracker", emoji: "🌙", label: "Sleep Tracker" },
        { to: "/anxiety-tracker", emoji: "💭", label: "Anxiety Tracker" },
        { to: "/energy-tracker", emoji: "⚡", label: "Energy Tracker" },
        { to: "/combo", emoji: "🔄", label: "Combo Tracker" },
        { to: "/improvement-tracker", emoji: "📈", label: "Improvement" },
      ],
    },
    {
      title: "Mindfulness & Wellness",
      subtitle: "Calm your mind and body",
      color: "#10b981",
      icon: "🧘",
      links: [
        { to: "/mindfulness", emoji: "🧘", label: "Mindfulness" },
        { to: "/selfcare", emoji: "💆", label: "Self Care" },
        { to: "/challenges", emoji: "🏆", label: "Challenges" },
        { to: "/rage", emoji: "😤", label: "Rage Release" },
        { to: "/suggestions", emoji: "💡", label: "Suggestions" },
      ],
    },
    {
      title: "Journaling & Reflection",
      subtitle: "Express and understand yourself",
      color: "#ec4899",
      icon: "📓",
      links: [
        { to: "/reflection", emoji: "📓", label: "Journal" },
        { to: "/gratitude-log", emoji: "🙏", label: "Gratitude" },
        { to: "/self-congrats", emoji: "🌟", label: "Self Congrats" },
        { to: "/reviews-reflection", emoji: "🔍", label: "Reviews" },
        { to: "/therapy-notes", emoji: "🗒️", label: "Therapy Notes" },
        { to: "/cognitive-distortions", emoji: "🧩", label: "Cognitive" },
      ],
    },
    {
      title: "Growth & Goals",
      subtitle: "Build habits and achieve goals",
      color: "#f59e0b",
      icon: "🎯",
      links: [
        { to: "/goal", emoji: "🎯", label: "Goal Planner" },
      ],
    },
    {
      title: "Support & Help",
      subtitle: "You are never alone",
      color: "#ef4444",
      icon: "💙",
      links: [
        { to: "/chatbot", emoji: "🤖", label: "AI Chatbot" },
        { to: "/support", emoji: "🆘", label: "Support Center" },
        { to: "/self-harm-support", emoji: "💙", label: "Crisis Support" },
      ],
    },
  ];

  return (
    <div className="dashboardPage">

      {/* Welcome Header */}
      <div className="dashboardHeader">
        <div>
          <h1>Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
          <p>How are you feeling today? Track your mental wellness journey.</p>
        </div>
        {stats && (
          <div className="streakCard">
            <span className="streakFire">🔥</span>
            <div>
              <p className="streakCount">{stats.streakCount}</p>
              <p className="streakLabel">Day Streak</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      {loading ? (
        <div className="loadingBox">Loading your data...</div>
      ) : stats ? (
        <>
          {/* Today's Mood */}
          <div className="todayMoodCard">
            {stats.todayMood ? (
              <div className="todayMoodContent">
                <span className="todayMoodEmoji">
                  {getMoodEmoji(stats.todayMood.mood)}
                </span>
                <div>
                  <p className="todayMoodTitle">Today's Mood</p>
                  <p className="todayMoodValue">{stats.todayMood.mood}</p>
                  {stats.todayMood.note && (
                    <p className="todayMoodNote">"{stats.todayMood.note}"</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="todayMoodContent">
                <span className="todayMoodEmoji">🌤️</span>
                <div>
                  <p className="todayMoodTitle">Today's Mood</p>
                  <p className="todayMoodValue">Not logged yet</p>
                  <Link to="/mood-tracker" className="logMoodLink">
                    Log your mood →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="statsGrid">
            <div className="statCard">
              <p className="statEmoji">📅</p>
              <p className="statValue">{stats.weekMoodsCount}</p>
              <p className="statLabel">Moods This Week</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">📓</p>
              <p className="statValue">{stats.totalJournals}</p>
              <p className="statLabel">Journal Entries</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🌙</p>
              <p className="statValue">{stats.avgSleepHours}h</p>
              <p className="statLabel">Avg Sleep</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🙏</p>
              <p className="statValue">{stats.totalGratitude}</p>
              <p className="statLabel">Gratitude Logs</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🎯</p>
              <p className="statValue">{stats.completedGoals}/{stats.totalGoals}</p>
              <p className="statLabel">Goals Completed</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">📊</p>
              <p className="statValue">{stats.goalCompletionRate}%</p>
              <p className="statLabel">Goal Success Rate</p>
            </div>
          </div>
        </>
      ) : null}

      {/* Categorized Quick Access */}
      <div className="allFeatures">
        <h2>All Features</h2>
        <p className="allFeaturesSubtitle">
          Everything you need for your mental wellness journey
        </p>

        {categories.map((cat) => (
          <div key={cat.title} className="categorySection">
            <div className="categoryHeader">
              <div
                className="categoryIcon"
                style={{ background: `${cat.color}15`, color: cat.color }}
              >
                {cat.icon}
              </div>
              <div>
                <h3 className="categoryTitle">{cat.title}</h3>
                <p className="categorySubtitle">{cat.subtitle}</p>
              </div>
            </div>

            <div className="categoryGrid">
              {cat.links.map((link) => (
                <Link
                  to={link.to}
                  key={link.to}
                  className="featureCard"
                  style={{ "--accent": cat.color }}
                >
                  <span className="featureEmoji">{link.emoji}</span>
                  <p className="featureLabel">{link.label}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support Banner */}
      <div className="supportBanner">
        <div className="supportBannerLeft">
          <p className="supportBannerTitle">Need Immediate Support?</p>
          <p className="supportBannerText">
            You are not alone. Talk to someone or explore our crisis resources.
          </p>
        </div>
        <Link to="/support">
          <button className="supportBannerBtn">Get Help →</button>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;