import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

  const categories = ["All", "Mindfulness", "Social", "Physical", "Creative", "Growth"];

  const challenges = [
    { id: 1,  title: "5-Minute Meditation",      desc: "Sit quietly and focus on your breath for 5 minutes.", category: "Mindfulness", points: 10, emoji: "🧘" },
    { id: 2,  title: "Gratitude List",            desc: "Write down 5 things you are grateful for today.",     category: "Mindfulness", points: 10, emoji: "🙏" },
    { id: 3,  title: "Digital Detox",             desc: "Stay off social media for 2 hours.",                  category: "Mindfulness", points: 20, emoji: "📵" },
    { id: 4,  title: "Mindful Eating",            desc: "Eat one meal today without any screens.",             category: "Mindfulness", points: 15, emoji: "🍽️" },
    { id: 5,  title: "Reach Out",                 desc: "Call or message someone you haven't talked to.",      category: "Social",      points: 15, emoji: "📞" },
    { id: 6,  title: "Random Act of Kindness",    desc: "Do something kind for someone without expecting.",    category: "Social",      points: 20, emoji: "💝" },
    { id: 7,  title: "Compliment Someone",        desc: "Give a genuine compliment to 3 different people.",   category: "Social",      points: 10, emoji: "😊" },
    { id: 8,  title: "Morning Walk",              desc: "Take a 15-minute walk in the morning fresh air.",     category: "Physical",    points: 15, emoji: "🚶" },
    { id: 9,  title: "Stretch Break",             desc: "Do 10 minutes of full body stretching.",              category: "Physical",    points: 10, emoji: "🤸" },
    { id: 10, title: "Hydration Challenge",       desc: "Drink 8 glasses of water today.",                     category: "Physical",    points: 10, emoji: "💧" },
    { id: 11, title: "No Junk Food",              desc: "Go the entire day without junk food.",                category: "Physical",    points: 25, emoji: "🥗" },
    { id: 12, title: "Creative Writing",          desc: "Write a short poem, story, or journal entry.",        category: "Creative",    points: 15, emoji: "✍️" },
    { id: 13, title: "Draw Something",            desc: "Draw or doodle anything for 10 minutes.",            category: "Creative",    points: 10, emoji: "🎨" },
    { id: 14, title: "Cook Something New",        desc: "Try cooking a recipe you have never made before.",   category: "Creative",    points: 20, emoji: "👨‍🍳" },
    { id: 15, title: "Learn Something New",       desc: "Spend 20 minutes learning a new skill or topic.",    category: "Growth",      points: 20, emoji: "📚" },
    { id: 16, title: "Face a Small Fear",         desc: "Do one small thing that makes you uncomfortable.",   category: "Growth",      points: 25, emoji: "💪" },
    { id: 17, title: "Early Rise",                desc: "Wake up 30 minutes earlier than usual.",              category: "Growth",      points: 20, emoji: "🌅" },
    { id: 18, title: "No Complaints",             desc: "Go the entire day without complaining.",              category: "Growth",      points: 30, emoji: "🌟" },
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
        <h1>🏆 Daily Challenges</h1>
        <p>Complete challenges to boost your mental wellness.</p>

        {/* Stats Row */}
        <div className="challengeStatsRow">
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#f59e0b" }}>
              ⭐ {totalPoints}
            </p>
            <p className="challengeStatLabel">Today's Points</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: badge.color }}>
              {badge.label}
            </p>
            <p className="challengeStatLabel">Your Level</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#4f46e5" }}>
              {allTimePoints}
            </p>
            <p className="challengeStatLabel">All Time Points</p>
          </div>
          <div className="challengeStat">
            <p className="challengeStatValue" style={{ color: "#22c55e" }}>
              {completedChallenges.length}/{challenges.length}
            </p>
            <p className="challengeStatLabel">Completed Today</p>
          </div>
        </div>

        {saving && (
          <p className="challengeSaving">💾 Saving progress...</p>
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
                <span className="challengeDone">✅ Done</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day History */}
      <div className="challengeHistorySection">
        <div className="challengeHistoryHeader">
          <h2>📊 Last 7 Days History</h2>
          <button
            className="historyToggleBtn"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide ▲" : "Show ▼"}
          </button>
        </div>

        {showHistory && (
          <>
            {bestDay && (
              <div className="bestDayCard">
                <p className="bestDayTitle">🏆 Best Day</p>
                <p className="bestDayDate">{bestDay.date}</p>
                <p className="bestDayPoints">⭐ {bestDay.totalPoints} points</p>
              </div>
            )}

            {history.length === 0 ? (
              <p className="historyEmpty">
                No history in the last 7 days. Complete challenges to build your streak!
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
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Challenges;