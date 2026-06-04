import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./dashboard.css";
import { subscribeToPush } from "../utils/pushNotifications";
import { sendDailyReminder } from "../utils/notifications";
import StreakCalendar from "../components/StreakCalendar";
import ProgressBadges from "../components/ProgressBadges";
function Dashboard() {
  const { user, token } = useAuth();
  const { language } = useLanguage();

  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    subscribeToPush(token);           // phone subscribe karo
  sendDailyReminder(token);         // daily reminder
    fetchStats();
    const h = new Date().getHours();
    const g = {
      en:  h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening",
      hi:  h < 12 ? "सुप्रभात"     : h < 17 ? "नमस्ते"          : "शुभ संध्या",
      hin: h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening",
    };
    setGreeting(g[language] || g.en);
  }, [language]);

  const fetchStats = async () => {
    try {
      const res = await fetch(
        "https://mindcare-backend-v56a.onrender.com/api/user/dashboard-stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const L = (en, hi, hin) =>
    language === "hi" ? hi : language === "hin" ? hin : en;

  // ── MAIN FEATURES — always visible ───────────────────────
  const mainFeatures = [
    { to: "/mood-tracker",     emoji: "😊", label: L("Mood Tracker",    "मूड ट्रैकर",    "Mood Tracker"),    color: "#4f46e5", bg: "#eef2ff" },
    { to: "/sleep-tracker",    emoji: "🌙", label: L("Sleep Tracker",   "नींद ट्रैकर",   "Sleep Tracker"),   color: "#0891b2", bg: "#ecfeff" },
    { to: "/anxiety-tracker",  emoji: "💭", label: L("Anxiety Tracker", "चिंता ट्रैकर",  "Anxiety Tracker"), color: "#7c3aed", bg: "#f5f3ff" },
    { to: "/energy-tracker",   emoji: "⚡", label: L("Energy Tracker",  "ऊर्जा ट्रैकर",  "Energy Tracker"),  color: "#d97706", bg: "#fffbeb" },
    { to: "/chatbot",          emoji: "🤖", label: L("AI Chatbot",      "AI चैटबॉट",     "AI Chatbot"),      color: "#059669", bg: "#ecfdf5" },
    { to: "/combo",            emoji: "📊", label: L("Combo Tracker",   "कॉम्बो ट्रैकर", "Combo Tracker"),   color: "#dc2626", bg: "#fef2f2" },
    { to: "/challenges",       emoji: "🏆", label: L("Challenges",      "चुनौतियां",       "Challenges"),      color: "#f59e0b", bg: "#fffbeb" },
    { to: "/goal",             emoji: "🎯", label: L("Goals",           "लक्ष्य",          "Goals"),           color: "#10b981", bg: "#f0fdf4" },
    { to: "/mindfulness",      emoji: "🧘", label: L("Mindfulness",     "माइंडफुलनेस",    "Mindfulness"),     color: "#8b5cf6", bg: "#f5f3ff" },
    { to: "/suggestions",      emoji: "📚", label: L("Resources",       "संसाधन",          "Resources"),       color: "#0ea5e9", bg: "#f0f9ff" },
  ];

  // ── MENU FEATURES — inside drawer ────────────────────────
  const menuCategories = [
    {
      category: L("Journaling & Reflection", "जर्नलिंग", "Journaling"),
      icon: "📓",
      items: [
        { to: "/reflection",            emoji: "📓", label: L("Journal / Reflection",    "जर्नल",              "Journal") },
        { to: "/gratitude-log",         emoji: "🙏", label: L("Gratitude Log",           "कृतज्ञता डायरी",       "Gratitude Log") },
        { to: "/therapy-notes",         emoji: "📋", label: L("Therapy Notes",           "थेरेपी नोट्स",         "Therapy Notes") },
        { to: "/reviews-reflection",    emoji: "📝", label: L("Reviews & Reflection",    "समीक्षा",              "Reviews") },
      ],
    },
    {
      category: L("Wellness & Growth", "वेलनेस", "Wellness & Growth"),
      icon: "💆",
      items: [
        { to: "/selfcare",              emoji: "💆", label: L("Self Care",               "सेल्फ केयर",           "Self Care") },
        { to: "/self-congrats",         emoji: "🎉", label: L("Self Congrats",           "खुद की तारीफ",          "Self Congrats") },
        { to: "/improvement-tracker",   emoji: "📈", label: L("Improvement Tracker",     "सुधार ट्रैकर",         "Improvement Tracker") },
        { to: "/rage",                  emoji: "😤", label: L("Rage Release",            "गुस्सा रिलीज",          "Rage Release") },
        { to: "/cognitive-distortions", emoji: "🧠", label: L("Cognitive Distortions",   "विचार विकृतियां",       "Cognitive Distortions") },
      ],
    },
    {
      category: L("Support & Help", "सहायता", "Support & Help"),
      icon: "💙",
      items: [
        { to: "/support",               emoji: "🆘", label: L("Support Center",          "सहायता केंद्र",         "Support Center") },
        { to: "/self-harm-support",     emoji: "💙", label: L("Self Harm Support",       "सेल्फ हार्म सपोर्ट",   "Self Harm Support") },
      ],
    },
  ];

  const moodEmojis = { Happy:"😊", Good:"🙂", Neutral:"😐", Sad:"😔", Angry:"😡", Anxious:"😰" };

  const statCards = [
    { value: stats?.weekMoodsCount   ?? "—", label: L("Moods This Week", "इस सप्ताह मूड", "Moods This Week"), color: "#4f46e5" },
    { value: stats?.avgSleepHours    ? `${stats.avgSleepHours}h` : "—", label: L("Avg Sleep", "औसत नींद", "Avg Sleep"), color: "#0891b2" },
    { value: stats?.totalGoals       ?? "—", label: L("Total Goals",     "कुल लक्ष्य",      "Total Goals"),      color: "#10b981" },
    { value: stats?.streakCount      ?? "0", label: L("Day Streak 🔥",   "स्ट्रीक 🔥",       "Streak 🔥"),        color: "#f59e0b" },
  ];

  return (
    <div className="dashPage">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="dashHero">
        <div className="dashHeroLeft">
          <p className="dashGreeting">{greeting},</p>
          <h1 className="dashName">{user?.name?.split(" ")[0]} 👋</h1>
          <p className="dashSubtitle">
            {L(
              "How are you feeling today? Track your mental wellness.",
              "आज आप कैसा महसूस कर रहे हैं?",
              "Aaj aap kaisa feel kar rahe ho?"
            )}
          </p>
        </div>

        {/* Today's Mood Card */}
        <div className="dashTodayCard">
          <p className="dashTodayLabel">
            {L("Today's Mood", "आज का मूड", "Aaj ka Mood")}
          </p>
          {stats?.todayMood ? (
            <>
              <p className="dashTodayEmoji">
                {moodEmojis[stats.todayMood.mood] || "😊"}
              </p>
              <p className="dashTodayValue">{stats.todayMood.mood}</p>
            </>
          ) : (
            <>
              <p className="dashTodayEmoji">🌟</p>
              <Link to="/mood-tracker" className="dashLogBtn">
                {L("Log Mood →", "मूड दर्ज करें →", "Log Karo →")}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────── */}
     
      <div className="dashStats">
        {statCards.map((s, i) => (
          <div key={i} className="dashStatCard">
            <p className="dashStatVal" style={{ color: s.color }}>
              {loading ? "..." : s.value}
            </p>
            <p className="dashStatLabel">{s.label}</p>
          </div>
        ))}
      </div>
      <StreakCalendar/>
        <ProgressBadges />
    

      {/* ── SECTION HEADER ────────────────────────────────── */}
      <div className="dashSectionRow">
        <h2 className="dashSectionTitle">
          {L("⚡ Quick Access", "⚡ त्वरित एक्सेस", "⚡ Quick Access")}
        </h2>
        <button
          className="dashAllToolsBtn"
          onClick={() => setMenuOpen(true)}
        >
          <span>☰</span>
          {L("More Tools", "और टूल्स", "Aur Tools")}
        </button>
      </div>

      {/* ── MAIN FEATURES GRID ────────────────────────────── */}
      <div className="dashGrid">
        {mainFeatures.map((f, i) => (
          <Link
            key={i}
            to={f.to}
            className="dashCard"
            style={{ "--c": f.color, "--bg": f.bg }}
          >
            <span className="dashCardEmoji">{f.emoji}</span>
            <span className="dashCardLabel">{f.label}</span>
            <span className="dashCardArrow">→</span>
          </Link>
        ))}
      </div>

      {/* ── SUPPORT BANNER ────────────────────────────────── */}
      <div className="dashBanner">
        <div>
          <p className="dashBannerTitle">
            {L("💙 Need Immediate Support?", "💙 तत्काल सहायता?", "💙 Turant Madad Chahiye?")}
          </p>
          <p className="dashBannerDesc">
            {L(
              "You are not alone. Help is always available.",
              "आप अकेले नहीं हैं। मदद हमेशा उपलब्ध है।",
              "Aap akele nahi ho. Madad hamesha available hai."
            )}
          </p>
        </div>
        <Link to="/support" className="dashBannerBtn">
          {L("Get Help →", "मदद लें →", "Help Lo →")}
        </Link>
      </div>

      {/* ── OVERLAY ───────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="dashOverlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── SIDE DRAWER ───────────────────────────────────── */}
      <div className={`dashDrawer ${menuOpen ? "open" : ""}`}>

        {/* Drawer Header */}
        <div className="drawerTop">
          <div>
            <p className="drawerTitle">
              {L("All Tools", "सभी टूल्स", "Sab Tools")}
            </p>
            <p className="drawerSubtitle">
              {L("Everything in one place", "सब एक जगह", "Sab ek jagah")}
            </p>
          </div>
          <button
            className="drawerClose"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawerBody">
          {menuCategories.map((cat, ci) => (
            <div key={ci} className="drawerCat">
              <p className="drawerCatLabel">
                {cat.icon} {cat.category}
              </p>
              <div className="drawerItems">
                {cat.items.map((item, ii) => (
                  <Link
                    key={ii}
                    to={item.to}
                    className="drawerItem"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="drawerItemEmoji">{item.emoji}</span>
                    <span className="drawerItemText">{item.label}</span>
                    <span className="drawerItemArrow">›</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="drawerFoot">
          <p>MindCare 💙</p>
          <p>{L("Your Mental Wellness Companion", "आपका मानसिक स्वास्थ्य साथी", "Aapka Wellness Saathi")}</p>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;