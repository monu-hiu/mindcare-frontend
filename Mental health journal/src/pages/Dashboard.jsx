import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";
import { checkDailyReminder, requestNotificationPermission } from "../utils/notifications";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";
function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const {language,t}=useLanguage();

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
      title: t("dashboard.categories.trackers"),
      subtitle: t("dashboard.categories.trackersDesc"),
      color: "#4f46e5",
      icon: "📊",
      links: [
        { to: "/mood-tracker", emoji: "😊", label: t("dashboard.categories.moodLabel") },
        { to: "/sleep-tracker", emoji: "🌙", label: t("dashboard.categories.sleepLabel") },
        { to: "/anxiety-tracker", emoji: "💭", label: t("dashboard.categories.anxietyLabel") },
        { to: "/energy-tracker", emoji: "⚡", label: t("dashboard.categories.energyLabel") },
        { to: "/combo", emoji: "🔄", label: t("dashboard.categories.comboLabel") },
        { to: "/improvement-tracker", emoji: "📈", label: t("dashboard.categories.improvementLabel") },
      ],
    },
    {
      title: t("dashboard.categories.mindfulness"),
      subtitle: t("dashboard.categories.mindfulnessDesc"),
      color: "#10b981",
      icon: "🧘",
      links: [
        { to: "/mindfulness", emoji: "🧘", label: t("dashboard.categories.mindfulness") },
        { to: "/selfcare", emoji: "💆", label: t("dashboard.categories.selfcareLabel") },
        { to: "/challenges", emoji: "🏆", label: t("dashboard.categories.challengesLabel") },
        { to: "/rage", emoji: "😤", label: t("dashboard.categories.rageLabel") },
        { to: "/suggestions", emoji: "💡", label: t("dashboard.categories.suggestionsLabel") },
      ],
    },
    {
      title: t("dashboard.categories.journaling"),
      subtitle: t("dashboard.categories.journalingDesc"),
      color: "#ec4899",
      icon: "📓",
      links: [
        { to: "/reflection", emoji: "📓", label: t("dashboard.categories.journalLabel") },
        { to: "/gratitude-log", emoji: "🙏", label: t("dashboard.categories.gratitudeLabel") },
        { to: "/self-congrats", emoji: "🌟", label: t("dashboard.categories.selfCongratsLabel") },
        { to: "/reviews-reflection", emoji: "🔍", label: t("dashboard.categories.reviewsLabel") },
        { to: "/therapy-notes", emoji: "🗒️", label:t("dashboard.categories.therapyNotesLabel") },
        { to: "/cognitive-distortions", emoji: "🧩", label: t("dashboard.categories.cognitiveDistortionsLabel") },
      ],
    },
    {
      title: t("dashboard.categories.growth"),
      subtitle: t("dashboard.categories.growthDesc"),
      color: "#f59e0b",
      icon: "🎯",
      links: [
        { to: "/goal", emoji: "🎯", label: t("dashboard.categories.goalLabel") },
      ],
    },
    {
      title: t("dashboard.categories.support"),
      subtitle: t("dashboard.categories.supportDesc"),
      color: "#ef4444",
      icon: "💙",
      links: [
        { to: "/chatbot", emoji: "🤖", label: t("dashboard.categories.aiLabel")},
        { to: "/support", emoji: "🆘", label: t("dashboard.categories.supportCenterLabel") },
        { to: "/self-harm-support", emoji: "💙", label:t("dashboard.categories.crisisLabel") },
      ],
    },
  ];

  return (
    <div className="dashboardPage">

      {/* Welcome Header */}
      <div className="dashboardHeader">
        <div>
          <h1>{t("dashboard.welcome")}, {user?.name?.split(" ")[0]}! 👋</h1>
          <p>{t("dashboard.subtitle")}</p>
        </div>
        {stats && (
          <div className="streakCard">
            <span className="streakFire">🔥</span>
            <div>
              <p className="streakCount">{stats.streakCount}</p>
              <p className="streakLabel">{t("dashboard.dayStreak")}</p>
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
                  <p className="todayMoodTitle">{t("dashboard.todayMood")}</p>
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
                  <p className="todayMoodTitle">{t("dashboard.todayMood")}</p>
                  <p className="todayMoodValue">{t("dashboard.notLoggedYet")}</p>
                  <Link to="/mood-tracker" className="logMoodLink">
                    {t("dashboard.logMood")}
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
              <p className="statLabel">{t("dashboard.moodsThisWeek")}</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">📓</p>
              <p className="statValue">{stats.totalJournals}</p>
              <p className="statLabel">{t("dashboard.journalEntries")}</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🌙</p>
              <p className="statValue">{stats.avgSleepHours}h</p>
              <p className="statLabel">{t("dashboard.avgSleep")}</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🙏</p>
              <p className="statValue">{stats.totalGratitude}</p>
              <p className="statLabel">{t("dashboard.gratitudeLogs")}</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">🎯</p>
              <p className="statValue">{stats.completedGoals}/{stats.totalGoals}</p>
              <p className="statLabel">{t("dashboard.goalsCompleted")}</p>
            </div>
            <div className="statCard">
              <p className="statEmoji">📊</p>
              <p className="statValue">{stats.goalCompletionRate}%</p>
              <p className="statLabel">{t("dashboard.goalSuccessRate")}</p>
            </div>
          </div>
        </>
      ) : null}

      {/* Categorized Quick Access */}
      <div className="allFeatures">
        <h2>{t("dashboard.allFeatures")}</h2>
        <p className="allFeaturesSubtitle">
          {t("dashboard.allFeaturesSubtitle")}
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
          <p className="supportBannerTitle">{t("dashboard.needSupport")}</p>
          <p className="supportBannerText">
            {t("dashboard.supportText")}
          </p>
        </div>
        <Link to="/support">
          <button className="supportBannerBtn">{t("dashboard.getHelp")}</button>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;