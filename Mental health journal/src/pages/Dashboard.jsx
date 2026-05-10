// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./dashboard.css";
// import { checkDailyReminder, requestNotificationPermission } from "../utils/notifications";
// import { useLanguage } from "../context/LanguageContext";
// import translations from "../i18n/translations";
// function Dashboard() {
//   const { user, token } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const {language,t}=useLanguage();

//   useEffect(() => {
//     // Request notification permission on dashboard load
//     requestNotificationPermission().then((granted) => {
//   if (granted) setTimeout(() => checkDailyReminder(token), 5000);
// });
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/user/dashboard-stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setStats(data.stats);
//     } catch (err) {
//       console.error("Stats fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMoodEmoji = (mood) => {
//     const moods = {
//       Happy: "😄", Good: "🙂", Neutral: "😐",
//       Sad: "😔", Angry: "😡", Anxious: "😰",
//     };
//     return moods[mood] || "😐";
//   };

//   const categories = [
//     {
//       title: t("dashboard.categories.trackers"),
//       subtitle: t("dashboard.categories.trackersDesc"),
//       color: "#4f46e5",
//       icon: "📊",
//       links: [
//         { to: "/mood-tracker", emoji: "😊", label: t("dashboard.categories.moodLabel") },
//         { to: "/sleep-tracker", emoji: "🌙", label: t("dashboard.categories.sleepLabel") },
//         { to: "/anxiety-tracker", emoji: "💭", label: t("dashboard.categories.anxietyLabel") },
//         { to: "/energy-tracker", emoji: "⚡", label: t("dashboard.categories.energyLabel") },
//         { to: "/combo", emoji: "🔄", label: t("dashboard.categories.comboLabel") },
//         { to: "/improvement-tracker", emoji: "📈", label: t("dashboard.categories.improvementLabel") },
//       ],
//     },
//     {
//       title: t("dashboard.categories.mindfulness"),
//       subtitle: t("dashboard.categories.mindfulnessDesc"),
//       color: "#10b981",
//       icon: "🧘",
//       links: [
//         { to: "/mindfulness", emoji: "🧘", label: t("dashboard.categories.mindfulness") },
//         { to: "/selfcare", emoji: "💆", label: t("dashboard.categories.selfcareLabel") },
//         { to: "/challenges", emoji: "🏆", label: t("dashboard.categories.challengesLabel") },
//         { to: "/rage", emoji: "😤", label: t("dashboard.categories.rageLabel") },
//         { to: "/suggestions", emoji: "💡", label: t("dashboard.categories.suggestionsLabel") },
//       ],
//     },
//     {
//       title: t("dashboard.categories.journaling"),
//       subtitle: t("dashboard.categories.journalingDesc"),
//       color: "#ec4899",
//       icon: "📓",
//       links: [
//         { to: "/reflection", emoji: "📓", label: t("dashboard.categories.journalLabel") },
//         { to: "/gratitude-log", emoji: "🙏", label: t("dashboard.categories.gratitudeLabel") },
//         { to: "/self-congrats", emoji: "🌟", label: t("dashboard.categories.selfCongratsLabel") },
//         { to: "/reviews-reflection", emoji: "🔍", label: t("dashboard.categories.reviewsLabel") },
//         { to: "/therapy-notes", emoji: "🗒️", label:t("dashboard.categories.therapyNotesLabel") },
//         { to: "/cognitive-distortions", emoji: "🧩", label: t("dashboard.categories.cognitiveDistortionsLabel") },
//       ],
//     },
//     {
//       title: t("dashboard.categories.growth"),
//       subtitle: t("dashboard.categories.growthDesc"),
//       color: "#f59e0b",
//       icon: "🎯",
//       links: [
//         { to: "/goal", emoji: "🎯", label: t("dashboard.categories.goalLabel") },
//       ],
//     },
//     {
//       title: t("dashboard.categories.support"),
//       subtitle: t("dashboard.categories.supportDesc"),
//       color: "#ef4444",
//       icon: "💙",
//       links: [
//         { to: "/chatbot", emoji: "🤖", label: t("dashboard.categories.aiLabel")},
//         { to: "/support", emoji: "🆘", label: t("dashboard.categories.supportCenterLabel") },
//         { to: "/self-harm-support", emoji: "💙", label:t("dashboard.categories.crisisLabel") },
//       ],
//     },
//   ];

//   return (
//     <div className="dashboardPage">

//       {/* Welcome Header */}
//       <div className="dashboardHeader">
//         <div>
//           <h1>{t("dashboard.welcome")}, {user?.name?.split(" ")[0]}! 👋</h1>
//           <p>{t("dashboard.subtitle")}</p>
//         </div>
//         {stats && (
//           <div className="streakCard">
//             <span className="streakFire">🔥</span>
//             <div>
//               <p className="streakCount">{stats.streakCount}</p>
//               <p className="streakLabel">{t("dashboard.dayStreak")}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Stats Section */}
//       {loading ? (
//         <div className="loadingBox">Loading your data...</div>
//       ) : stats ? (
//         <>
//           {/* Today's Mood */}
//           <div className="todayMoodCard">
//             {stats.todayMood ? (
//               <div className="todayMoodContent">
//                 <span className="todayMoodEmoji">
//                   {getMoodEmoji(stats.todayMood.mood)}
//                 </span>
//                 <div>
//                   <p className="todayMoodTitle">{t("dashboard.todayMood")}</p>
//                   <p className="todayMoodValue">{stats.todayMood.mood}</p>
//                   {stats.todayMood.note && (
//                     <p className="todayMoodNote">"{stats.todayMood.note}"</p>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="todayMoodContent">
//                 <span className="todayMoodEmoji">🌤️</span>
//                 <div>
//                   <p className="todayMoodTitle">{t("dashboard.todayMood")}</p>
//                   <p className="todayMoodValue">{t("dashboard.notLoggedYet")}</p>
//                   <Link to="/mood-tracker" className="logMoodLink">
//                     {t("dashboard.logMood")}
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Stats Grid */}
//           <div className="statsGrid">
//             <div className="statCard">
//               <p className="statEmoji">📅</p>
//               <p className="statValue">{stats.weekMoodsCount}</p>
//               <p className="statLabel">{t("dashboard.moodsThisWeek")}</p>
//             </div>
//             <div className="statCard">
//               <p className="statEmoji">📓</p>
//               <p className="statValue">{stats.totalJournals}</p>
//               <p className="statLabel">{t("dashboard.journalEntries")}</p>
//             </div>
//             <div className="statCard">
//               <p className="statEmoji">🌙</p>
//               <p className="statValue">{stats.avgSleepHours}h</p>
//               <p className="statLabel">{t("dashboard.avgSleep")}</p>
//             </div>
//             <div className="statCard">
//               <p className="statEmoji">🙏</p>
//               <p className="statValue">{stats.totalGratitude}</p>
//               <p className="statLabel">{t("dashboard.gratitudeLogs")}</p>
//             </div>
//             <div className="statCard">
//               <p className="statEmoji">🎯</p>
//               <p className="statValue">{stats.completedGoals}/{stats.totalGoals}</p>
//               <p className="statLabel">{t("dashboard.goalsCompleted")}</p>
//             </div>
//             <div className="statCard">
//               <p className="statEmoji">📊</p>
//               <p className="statValue">{stats.goalCompletionRate}%</p>
//               <p className="statLabel">{t("dashboard.goalSuccessRate")}</p>
//             </div>
//           </div>
//         </>
//       ) : null}

//       {/* Categorized Quick Access */}
//       <div className="allFeatures">
//         <h2>{t("dashboard.allFeatures")}</h2>
//         <p className="allFeaturesSubtitle">
//           {t("dashboard.allFeaturesSubtitle")}
//         </p>

//         {categories.map((cat) => (
//           <div key={cat.title} className="categorySection">
//             <div className="categoryHeader">
//               <div
//                 className="categoryIcon"
//                 style={{ background: `${cat.color}15`, color: cat.color }}
//               >
//                 {cat.icon}
//               </div>
//               <div>
//                 <h3 className="categoryTitle">{cat.title}</h3>
//                 <p className="categorySubtitle">{cat.subtitle}</p>
//               </div>
//             </div>

//             <div className="categoryGrid">
//               {cat.links.map((link) => (
//                 <Link
//                   to={link.to}
//                   key={link.to}
//                   className="featureCard"
//                   style={{ "--accent": cat.color }}
//                 >
//                   <span className="featureEmoji">{link.emoji}</span>
//                   <p className="featureLabel">{link.label}</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Support Banner */}
//       <div className="supportBanner">
//         <div className="supportBannerLeft">
//           <p className="supportBannerTitle">{t("dashboard.needSupport")}</p>
//           <p className="supportBannerText">
//             {t("dashboard.supportText")}
//           </p>
//         </div>
//         <Link to="/support">
//           <button className="supportBannerBtn">{t("dashboard.getHelp")}</button>
//         </Link>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./dashboard.css";
import { subscribeToPush } from "../utils/pushNotifications";
import { sendDailyReminder } from "../utils/notifications";
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