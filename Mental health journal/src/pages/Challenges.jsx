import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./challenges.css";

function Challenges() {
  const { token } = useAuth();
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [history, setHistory] = useState([]);
  const [allTimePoints, setAllTimePoints] = useState(0);
  const [bestDay, setBestDay] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
    const { language , t} = useLanguage();

  const categories = [t("challenges.categories.all"), t("challenges.categories.Mindfulness"), t("challenges.categories.Social"), t("challenges.categories.Physical"), t("challenges.categories.Creative"), t("challenges.categories.Growth")];

  const challenges = [
    { id: 1,  title: t("challenges.title1"),      desc: t("challenges.desc1"), category: t("challenges.categories.Mindfulness"), points: 10, emoji: "🧘" },
    { id: 2,  title: t("challenges.title2"),            desc: t("challenges.desc2"),     category: t("challenges.categories.Mindfulness"), points: 10, emoji: "🙏" },
    { id: 3,  title: t("challenges.title3"),             desc: t("challenges.desc3"),                  category: t("challenges.categories.Mindfulness"), points: 20, emoji: "📵" },
    { id: 4,  title: t("challenges.title4"),            desc: t("challenges.desc4"),             category: t("challenges.categories.Mindfulness"), points: 15, emoji: "🍽️" },
    { id: 5,  title: t("challenges.title5"),                 desc: t("challenges.desc5"),      category: t("challenges.categories.Social"),      points: 15, emoji: "📞" },
    { id: 6,  title: t("challenges.title6"),    desc: t("challenges.desc6"),    category: t("challenges.categories.Social"),      points: 20, emoji: "💝" },
    { id: 7,  title: t("challenges.title7"),        desc: t("challenges.desc7"),   category: t("challenges.categories.Social"),      points: 10, emoji: "😊" },
    { id: 8,  title: t("challenges.title8"),              desc: t("challenges.desc8"),     category: t("challenges.categories.Physical"),    points: 15, emoji: "🚶" },
    { id: 9,  title: t("challenges.title9"),             desc: t("challenges.desc9"),              category: t("challenges.categories.Physical"),    points: 10, emoji: "🤸" },
    { id: 10, title: t("challenges.title10"),       desc: t("challenges.desc10"),                     category: t("challenges.categories.Physical"),    points: 10, emoji: "💧" },
    { id: 11, title: t("challenges.title11"),              desc:t("challenges.desc11"),                category: t("challenges.categories.Physical"),    points: 25, emoji: "🥗" },
    { id: 12, title: t("challenges.title12"),          desc: t("challenges.desc12"),        category: t("challenges.categories.Creative"),    points: 15, emoji: "✍️" },
    { id: 13, title: t("challenges.title13"),            desc: t("challenges.desc13"),            category: t("challenges.categories.Creative"),    points: 10, emoji: "🎨" },
    { id: 14, title: t("challenges.title14"),        desc: t("challenges.desc14"),   category: t("challenges.categories.Creative"),    points: 20, emoji: "👨‍🍳" },
    { id: 15, title: t("challenges.title15"),       desc: t("challenges.desc15"),    category: t("challenges.categories.Growth"),      points: 20, emoji: "📚" },
    { id: 16, title: t("challenges.title16"),         desc: t("challenges.desc16"),   category: t("challenges.categories.Growth"),      points: 25, emoji: "💪" },
    { id: 17, title: t("challenges.title17"),                desc: t("challenges.desc17"),              category: t("challenges.categories.Growth"),      points: 20, emoji: "🌅" },
    { id: 18, title: t("challenges.title18"),             desc: t("challenges.desc18"),              category: t("challenges.categories.Growth"),      points: 30, emoji: "🌟" },
  ];

  const totalPoints = completedChallenges.reduce((sum, id) => {
    const ch = challenges.find((c) => c.id === id);
    return sum + (ch?.points || 0);
  }, 0);

  // Load today's progress on mount
  useEffect(() => {
    loadTodayProgress();
    loadHistory();
  }, []);

  // Auto-save whenever completedChallenges changes
  useEffect(() => {
    if (completedChallenges.length === 0) return;
    const timer = setTimeout(() => saveProgress(), 1000);
    return () => clearTimeout(timer);
  }, [completedChallenges]);

  const loadTodayProgress = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/challenges/today", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.log) {
        setCompletedChallenges(data.log.completedChallenges.map((c) => c.id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/challenges/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        // Filter to last 7 days for UI display
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recent = data.logs.filter(
          (log) => new Date(log.createdAt) >= sevenDaysAgo
        );

        setHistory(recent);
        setAllTimePoints(data.allTimePoints);
        setBestDay(data.bestDay);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveProgress = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const completedDetails = completedChallenges.map((id) => {
        const ch = challenges.find((c) => c.id === id);
        return { id, title: ch.title, category: ch.category, points: ch.points, emoji: ch.emoji };
      });

      await fetch("https://mindcare-backend-v56a.onrender.com/api/challenges/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completedChallenges: completedDetails,
          totalPoints,
        }),
      });

      // Refresh history
      loadHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleChallenge = (id) => {
    setCompletedChallenges((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredChallenges = activeCategory === "All"
    ? challenges
    : challenges.filter((c) => c.category === activeCategory);

  const getLevelBadge = (points) => {
    if (points >= 200) return { label: "🏆 Legend",    color: "#f59e0b" };
    if (points >= 100) return { label: "💎 Champion",  color: "#8b5cf6" };
    if (points >= 50)  return { label: "🥇 Pro",       color: "#4f46e5" };
    if (points >= 20)  return { label: "⭐ Rising",    color: "#10b981" };
    return                    { label: "🌱 Beginner",  color: "#6b7280" };
  };

  const badge = getLevelBadge(allTimePoints);

  return (
    <div className="challengesPage">
      {/* Header */}
      <div className="challengesHeader">
        <h1>{t("challenges.title")}</h1>
        <p>{t("challenges.subtitle")}</p>

        {/* Stats Row */}
        <div className="challengeStatsRow">
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#f59e0b" }}>
              ⭐ {totalPoints}
            </p>
            <p className="challengeStatLabel">{t("challenges.points")}</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: badge.color }}>
              {badge.label}
            </p>
            <p className="challengeStatLabel">{t("challenges.level")}</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#4f46e5" }}>
              {allTimePoints}
            </p>
            <p className="challengeStatLabel">{t("challenges.alltime")}</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#22c55e" }}>
              {completedChallenges.length}/{challenges.length}
            </p>
            <p className="challengeStatLabel">{t("challenges.completed")}</p>
          </div>
        </div>

        {saving && (
          <p className="challengeSaving">💾 {t("common.save")}</p>
        )}
      </div>

      {/* Category Filter */}
      <div className="categoryFilter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`categoryBtn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="challengesGrid">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`challengeCard ${completedChallenges.includes(challenge.id) ? "completed" : ""}`}
            onClick={() => toggleChallenge(challenge.id)}
          >
            <div className="challengeTop">
              <span className="challengeEmoji">{challenge.emoji}</span>
              <div className="challengeTopRight">
                <span className="challengePoints">+{challenge.points} pts</span>
                {completedChallenges.includes(challenge.id) && (
                  <span className="challengeCheck">✓</span>
                )}
              </div>
            </div>
            <h3 className="challengeTitle">{challenge.title}</h3>
            <p className="challengeDesc">{challenge.desc}</p>
            <div className="challengeFooter">
              <span className="challengeCategory">{challenge.category}</span>
              {completedChallenges.includes(challenge.id) && (
                <span className="challengeDone"> {t("challenges.Done")}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day History */}
      <div className="challengeHistorySection">
        <div className="challengeHistoryHeader">
          <h2> {t("challenges.historTitle")}</h2>
          <button
            className="historyToggleBtn"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? t("challenges.hideToggle") : t("challenges.showToggle")}
          </button>
        </div>

        {showHistory && (
          <>
            {bestDay && (
              <div className="bestDayCard">
                <p className="bestDayTitle"> {t("challenges.best")}</p>
                <p className="bestDayDate">{bestDay.date}</p>
                <p className="bestDayPoints">⭐ {bestDay.totalPoints} points</p>
              </div>
            )}

            {history.length === 0 ? (
              <p className="historyEmpty">
                {t("challenges.historyEmpty")}
              </p>
            ) : (
              <div className="historyList">
                {history.map((log) => (
                  <div key={log._id} className="historyCard">
                    <div className="historyCardTop">
                      <p className="historyDate">
                        {new Date(log.createdAt).toLocaleDateString("en-IN", {
                          weekday: "short", day: "numeric", month: "short",
                        })}
                      </p>
                      <p className="historyPoints">⭐ {log.totalPoints} pts</p>
                    </div>
                    <div className="historyChips">
                      {log.completedChallenges.map((ch, i) => (
                        <span key={i} className="historyChip">
                          {ch.emoji} {ch.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default Challenges;