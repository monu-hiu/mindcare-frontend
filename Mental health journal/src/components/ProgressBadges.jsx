// src/components/ProgressBadges.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./ProgressBadges.css";

const BADGES = [
  // Streak badges
  { id: "streak_1",   emoji: "🌱", title: "First Step",      desc: "Log mood for 1 day",           check: (s) => s.streak >= 1,    color: "#22c55e" },
  { id: "streak_3",   emoji: "🔥", title: "3 Day Streak",    desc: "Log mood 3 days in a row",      check: (s) => s.streak >= 3,    color: "#f97316" },
  { id: "streak_7",   emoji: "⚡", title: "Week Warrior",    desc: "Log mood 7 days in a row",      check: (s) => s.streak >= 7,    color: "#f59e0b" },
  { id: "streak_14",  emoji: "💪", title: "2 Week Champion", desc: "Log mood 14 days in a row",     check: (s) => s.streak >= 14,   color: "#4f46e5" },
  { id: "streak_30",  emoji: "🏆", title: "Monthly Master",  desc: "Log mood 30 days in a row",     check: (s) => s.streak >= 30,   color: "#d97706" },

  // Total logs badges
  { id: "logs_25",     emoji: "📝", title: "Getting Started", desc: "Log mood 25 times total",        check: (s) => s.totalLogs >= 25,  color: "#06b6d4" },
  { id: "logs_50",    emoji: "📊", title: "Data Tracker",    desc: "Log mood 50 times total",       check: (s) => s.totalLogs >= 50, color: "#8b5cf6" },
  { id: "logs_100",   emoji: "🌟", title: "Wellness Star",   desc: "Log mood 100 times total",      check: (s) => s.totalLogs >= 100, color: "#ec4899" },

  // Journal badges
  { id: "journal_10",  emoji: "📓", title: "First Ten Journal",   desc: "Write your first Ten journal entries", check: (s) => s.journals >= 10,  color: "#10b981" },
  { id: "journal_50", emoji: "✍️", title: "Deep Thinker",    desc: "Write 50 journal entries",       check: (s) => s.journals >= 50, color: "#6366f1" },
  { id: "journal_100", emoji: "🖋️", title: "Master Journaler", desc: "Write 100 journal entries",      check: (s) => s.journals >= 100, color: "#ec4899" },
  { id: "journal_365", emoji: "📔", title: "Yearly Scribe",   desc: "Write 365 journal entries",      check: (s) => s.journals >= 365, color: "#f59e0b" },

  // Sleep badges
  { id: "sleep_15",    emoji: "🌙", title: "Sleep Tracker",   desc: "Track sleep for 15 nights",      check: (s) => s.sleepLogs >= 15,  color: "#0891b2" },
  { id: "sleep_good", emoji: "😴", title: "Sleep Champion",  desc: "Log 25 nights of good sleep",    check: (s) => s.goodSleep >= 25,  color: "#7c3aed" },
  {id:"sleep_100",   emoji: "🛌", title: "Sleep Master",    desc: "Track sleep for 100 nights",     check: (s) => s.sleepLogs >= 100, color: "#ec4899" },
  {id:"sleep_365",   emoji: "🛏️", title: "Sleep Guru",      desc: "Track sleep for 365 nights",     check: (s) => s.sleepLogs >= 365, color: "#f59e0b" },

  // Challenge badges
  { id: "challenge_150",  emoji: "🎯", title: "Challenger",   desc: "Earn 150 challenge points",      check: (s) => s.challengePoints >= 150,  color: "#f59e0b" },
  { id: "challenge_250", emoji: "💎", title: "Champion",     desc: "Earn 250 challenge points",     check: (s) => s.challengePoints >= 250, color: "#4f46e5" },
  { id: "challenge_500", emoji: "🏅", title: "Elite Champion", desc: "Earn 500 challenge points",     check: (s) => s.challengePoints >= 500, color: "#ec4899" },
  {id:"challenge_1000", emoji: "🥇", title: "Ultimate Champion", desc: "Earn 1000 challenge points",    check: (s) => s.challengePoints >= 1000, color: "#d97706" },
  {id:"challenge_2000", emoji: "🥈", title: "Legendary Champion", desc: "Earn 2000 challenge points",    check: (s) => s.challengePoints >= 2000, color: "#8b5cf6" },

  // Gratitude badges
  { id: "gratitude_25", emoji: "🙏", title: "Grateful Heart", desc: "Complete 25 gratitude logs",    check: (s) => s.gratitudeLogs >= 25, color: "#ec4899" },

  // Special badges
  { id: "first_login",  emoji: "🎉", title: "Welcome!",      desc: "Joined MindCare",               check: (s) => s.totalLogs >= 1, color: "#22c55e" },
  { id: "multilang",    emoji: "🌍", title: "Multilingual",  desc: "Changed app language",          check: (s) => s.changedLang,     color: "#06b6d4" },
  { id: "night_owl",    emoji: "🦉", title: "Night Owl",     desc: "Log mood after 10 PM",          check: (s) => s.nightLog,        color: "#4f46e5" },
  { id: "early_bird",   emoji: "🐦", title: "Early Bird",    desc: "Log mood before 6 AM",          check: (s) => s.earlyLog,        color: "#f59e0b" },
  { id: "all_moods",    emoji: "🎨", title: "Mood Explorer", desc: "Try all 6 mood types",          check: (s) => s.uniqueMoods >= 6, color: "#8b5cf6" },
];

function ProgressBadges() {
  const { token } = useAuth();
  const { language } = useLanguage();
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  const L = (en, hi, hin) =>
    language === "hi" ? hi : language === "hin" ? hin : en;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [dashRes, challengeRes, moodRes, journalRes, sleepRes, gratRes] =
        await Promise.all([
          fetch("https://mindcare-backend-v56a.onrender.com/api/user/dashboard-stats",
            { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://mindcare-backend-v56a.onrender.com/api/challenges/history",
            { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://mindcare-backend-v56a.onrender.com/api/mood/history",
            { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://mindcare-backend-v56a.onrender.com/api/journal/all",
            { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/history",
            { headers: { Authorization: `Bearer ${token}` } }),
          fetch("https://mindcare-backend-v56a.onrender.com/api/gratitude/all",
            { headers: { Authorization: `Bearer ${token}` } }),
        ]);

      const [dash, challenge, mood, journal, sleep, grat] = await Promise.all([
        dashRes.json(), challengeRes.json(), moodRes.json(),
        journalRes.json(), sleepRes.json(), gratRes.json(),
      ]);

      // Calculate streak from mood logs
      const moodLogs = mood.success ? mood.moods : [];
      const moodSet  = new Set(moodLogs.map(l => new Date(l.createdAt).toDateString()));
      let streak = 0;
      for (let i = 0; i <= 365; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        if (moodSet.has(d.toDateString())) streak++;
        else break;
      }

      // Unique moods
      const uniqueMoods = new Set(moodLogs.map(l => l.mood)).size;

      // Night/early logs
      const nightLog = moodLogs.some(l => new Date(l.createdAt).getHours() >= 22);
      const earlyLog = moodLogs.some(l => new Date(l.createdAt).getHours() < 6);

      // Good sleep nights
      const sleepLogs = sleep.success ? (sleep.sleepLogs || []) : [];
      const goodSleep = sleepLogs.filter(l => l.quality === "Excellent" || l.quality === "Good").length;

      // Challenge points
      const challengePoints = challenge.success ? (challenge.allTimePoints || 0) : 0;

      // Language changed
      const changedLang = localStorage.getItem("mc_language") !== null;

      setStats({
        streak,
        totalLogs:       moodLogs.length,
        journals:        journal.success ? (journal.journals?.length || 0) : 0,
        sleepLogs:       sleepLogs.length,
        goodSleep,
        challengePoints,
        gratitudeLogs:   grat.success ? (grat.logs?.length || 0) : 0,
        uniqueMoods,
        nightLog,
        earlyLog,
        changedLang,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!stats || loading) {
    return (
      <div className="badgesCard">
        <div className="badgesLoading">
          <div className="badgeSpinner" />
        </div>
      </div>
    );
  }

  const earnedBadges = BADGES.filter(b => b.check(stats));
  const lockedBadges = BADGES.filter(b => !b.check(stats));
  const displayLocked = showAll ? lockedBadges : lockedBadges.slice(0, 4);

  return (
    <div className="badgesCard">
      {/* Header */}
      <div className="badgesHeader">
        <div>
          <h3 className="badgesTitle">
            {L("Progress Badges", "प्रगति बैज", "Progress Badges")}
          </h3>
          <p className="badgesSubtitle">
            {earnedBadges.length}/{BADGES.length} {L("earned", "अर्जित", "earned")}
          </p>
        </div>
        <div className="badgesProgress">
          <div className="badgesProgressBar">
            <div
              className="badgesProgressFill"
              style={{ width: `${(earnedBadges.length / BADGES.length) * 100}%` }}
            />
          </div>
          <span className="badgesProgressPct">
            {Math.round((earnedBadges.length / BADGES.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Earned badges */}
      {earnedBadges.length > 0 && (
        <>
          <p className="badgesSectionLabel">
            ✅ {L("Earned", "अर्जित बैज", "Earned")}
          </p>
          <div className="badgesGrid">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="badgeItem earned"
                style={{ borderColor: `${badge.color}40`, background: `${badge.color}10` }}
                title={badge.desc}
              >
                <span className="badgeEmoji">{badge.emoji}</span>
                <span className="badgeTitle" style={{ color: badge.color }}>
                  {badge.title}
                </span>
                <span className="badgeDesc">{badge.desc}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Locked badges */}
      {lockedBadges.length > 0 && (
        <>
          <p className="badgesSectionLabel">
            🔒 {L("Locked", "बंद बैज", "Locked")}
          </p>
          <div className="badgesGrid">
            {displayLocked.map((badge) => (
              <div
                key={badge.id}
                className="badgeItem locked"
                title={badge.desc}
              >
                <span className="badgeEmoji locked">🔒</span>
                <span className="badgeTitle locked">{badge.title}</span>
                <span className="badgeDesc">{badge.desc}</span>
              </div>
            ))}
          </div>

          {lockedBadges.length > 4 && (
            <button
              className="badgesShowMore"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? L("Show Less ▲", "कम दिखाएं ▲", "Kam dikhaao ▲")
                : L(`Show All ${lockedBadges.length} Locked ▼`, `सभी ${lockedBadges.length} देखें ▼`, `Sab ${lockedBadges.length} dekho ▼`)}
            </button>
          )}
        </>
      )}

      {/* All earned message */}
      {lockedBadges.length === 0 && (
        <div className="badgesComplete">
          <p>🎉 {L("You've earned all badges! Amazing!", "आपने सभी बैज अर्जित किए! शानदार!", "Aapne sab badges earn kar liye! Zabardast!")}</p>
        </div>
      )}

      {/* New badge popup */}
      {newBadge && (
        <div className="newBadgePopup" style={{ borderColor: newBadge.color }}>
          <span className="newBadgeEmoji">{newBadge.emoji}</span>
          <div>
            <p className="newBadgeTitle">New Badge Earned!</p>
            <p className="newBadgeName">{newBadge.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBadges;