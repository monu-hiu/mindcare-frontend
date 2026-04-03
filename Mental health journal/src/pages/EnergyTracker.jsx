import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./energy.css";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your physical energy level right now?",
    options: [
      { text: "Completely drained — can barely move", score: 1 },
      { text: "Low — feeling tired and sluggish", score: 3 },
      { text: "Moderate — getting by okay", score: 6 },
      { text: "High — feeling energetic and active", score: 9 },
    ],
  },
  {
    id: 2,
    question: "How well did you sleep last night?",
    options: [
      { text: "Very poorly — less than 4 hours", score: 1 },
      { text: "Not great — 4-6 hours", score: 4 },
      { text: "Okay — 6-7 hours", score: 7 },
      { text: "Well — 7-9 hours of quality sleep", score: 10 },
    ],
  },
  {
    id: 3,
    question: "How is your mental focus and motivation today?",
    options: [
      { text: "Cannot focus at all — totally unmotivated", score: 1 },
      { text: "Struggling to concentrate", score: 3 },
      { text: "Somewhat focused — could be better", score: 6 },
      { text: "Sharp and motivated — ready to go!", score: 9 },
    ],
  },
  {
    id: 4,
    question: "Have you eaten and hydrated well today?",
    options: [
      { text: "Skipped meals and barely drank water", score: 1 },
      { text: "Ate a little but not enough", score: 4 },
      { text: "Had decent meals and some water", score: 7 },
      { text: "Eaten well and stayed well hydrated", score: 10 },
    ],
  },
  {
    id: 5,
    question: "How do you feel about tackling your tasks today?",
    options: [
      { text: "Overwhelmed — cannot start anything", score: 1 },
      { text: "Reluctant — need a big push", score: 3 },
      { text: "Willing — can do what's needed", score: 6 },
      { text: "Eager — let's get things done!", score: 9 },
    ],
  },
];

function EnergyTracker() {
  const { token } = useAuth();

  const [quizMode, setQuizMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState(0);

  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const notifSentRef = useRef(false);

  const activityOptions = ["Exercise", "Work", "Study", "Meditation", "Coffee", "Nap", "Reading", "Social"];

  const foodTips = {
    low: [
      "🍌 Banana — quick natural energy boost",
      "🥜 Handful of nuts — healthy fats and protein",
      "🍎 Apple with peanut butter — sustained energy",
      "🥚 Eggs — protein and B vitamins for energy",
      "🫐 Blueberries — antioxidants and natural sugars",
    ],
    moderate: [
      "🥑 Avocado — healthy fats for steady energy",
      "🌾 Oats — slow-release carbs that last for hours",
      "🍗 Chicken or dal — protein for sustained fuel",
      "🥝 Kiwi — vitamin C boosts iron absorption",
    ],
    high: [
      "💧 Keep hydrating to maintain this energy",
      "🥗 Eat light and nutritious to stay sharp",
      "🌿 Green tea — antioxidants without the crash",
    ],
  };

  const exerciseTips = {
    low: [
      "🚶 5-minute slow walk — even tiny movement helps",
      "🧘 Gentle yoga stretches for 5-10 minutes",
      "💨 Deep breathing exercises — 4-7-8 technique",
      "🤸 Light stretching — focus on neck and shoulders",
      "☀️ Go outside for 5 minutes of sunlight",
    ],
    moderate: [
      "🏃 15-minute brisk walk around the block",
      "🏋️ Light bodyweight exercises — 10 pushups, squats",
      "🚴 20-minute cycling or stationary bike",
      "🧘 15-minute yoga flow",
    ],
    high: [
      "🏃 Run or jog for 30 minutes — great time for it!",
      "🏋️ Full workout session — your energy supports it",
      "⚽ Play a sport or active game",
      "🧗 Try something new and challenging today",
    ],
  };

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/energy/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        setLogs(data.logs.filter(l => new Date(l.createdAt) >= sevenDaysAgo));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/energy/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const goNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      const maxScore = QUIZ_QUESTIONS.length * 10;
      const normalized = Math.max(1, Math.min(10, Math.round((totalScore / maxScore) * 10)));
      setCalculatedLevel(normalized);
      setQuizComplete(true);
      setQuizMode(false);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const retakeQuiz = () => {
    setQuizMode(true);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
    setCalculatedLevel(0);
  };

  // Smart notification — only on SAVE, based on time of day
  const sendSmartNotification = (level) => {
    if (notifSentRef.current) return;
    if (!("Notification" in window)) return;

    const hour = new Date().getHours();
    const timeLabel = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

    const messages = {
      low: {
        morning: `Good morning! Your energy is low today. Start with a light breakfast and a short walk. You've got this! 💪`,
        afternoon: `Your afternoon energy is low. Try a 10-minute walk or a healthy snack to recharge! ⚡`,
        evening: `Your evening energy is low — that's okay! Rest and recover well tonight. 🌙`,
      },
      moderate: {
        morning: `Good morning! Your energy is moderate. Stay hydrated and tackle your important tasks now! ☀️`,
        afternoon: `Afternoon check-in: moderate energy. Keep moving and eat something nutritious! 🥗`,
        evening: `Evening energy is moderate. Wind down gradually and prepare for good sleep! 😊`,
      },
      high: {
        morning: `Amazing morning energy! 🔥 This is your peak time — tackle your most important goals now!`,
        afternoon: `High afternoon energy! ⚡ Great time for exercise or creative work. Keep the momentum!`,
        evening: `High evening energy! 🌟 Channel it into something productive but start winding down by 9pm!`,
      },
    };

    const category = level <= 3 ? "low" : level <= 6 ? "moderate" : "high";
    const msg = messages[category][timeLabel];

    const sendNotif = () => {
      new Notification("⚡ MindCare Energy Update", {
        body: msg,
        icon: "/Logo_mindcare.jpg",
      });
      notifSentRef.current = true;
    };

    if (Notification.permission === "granted") {
      sendNotif();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(p => {
        if (p === "granted") sendNotif();
      });
    }
  };

  const saveLog = async () => {
    setSaving(true);
    setError("");
    try {
      const hour = new Date().getHours();
      const timeOfDay = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 21 ? "Evening" : "Night";

      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/energy/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          level: calculatedLevel,
          mood: calculatedLevel >= 7 ? "Energized" : calculatedLevel >= 5 ? "Neutral" : calculatedLevel >= 3 ? "Tired" : "Exhausted",
          activities,
          notes,
          timeOfDay,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setLogs(prev => [data.energyLog, ...prev]);
        setActivities([]);
        setNotes("");
        fetchStats();

        // Send smart notification ONLY on save
        sendSmartNotification(calculatedLevel);

        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const getLevelColor = (l) => l >= 7 ? "#22c55e" : l >= 4 ? "#f59e0b" : "#ef4444";
  const getLevelLabel = (l) => l >= 7 ? "High Energy 🔥" : l >= 4 ? "Moderate ⚡" : "Low Energy 😴";
  const getLevelEmoji = (l) => l >= 7 ? "⚡" : l >= 4 ? "😐" : "😴";

  const getFoodTips = (l) => l >= 7 ? foodTips.high : l >= 4 ? foodTips.moderate : foodTips.low;
  const getExerciseTips = (l) => l >= 7 ? exerciseTips.high : l >= 4 ? exerciseTips.moderate : exerciseTips.low;

  const q = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentAnswer = answers[q?.id];

  return (
    <div className="energyPage">
      <div className="energyHeader">
        <h1>⚡ Energy Tracker</h1>
        <p>Answer a few questions to understand your energy level today.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="energyStats">
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.avgLevel}/10</p>
            <p className="energyStatLabel">Avg Energy (7 days)</p>
          </div>
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.totalLogs}</p>
            <p className="energyStatLabel">Logs This Week</p>
          </div>
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.topMood || "—"}</p>
            <p className="energyStatLabel">Most Common Mood</p>
          </div>
        </div>
      )}

      {/* ── QUIZ ── */}
      {quizMode && (
        <div className="quizCard">
          <div className="quizProgress">
            <div className="quizProgressBar">
              <div className="quizProgressFill" style={{ width: `${progress}%` }} />
            </div>
            <p className="quizProgressText">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <p className="quizQuestion">{q.question}</p>

          <div className="quizOptions">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`quizOption ${currentAnswer === opt.score ? "selected" : ""}`}
                onClick={() => handleAnswer(q.id, opt.score)}
              >
                <span className="quizOptionDot" />
                <span className="quizOptionText">{opt.text}</span>
              </button>
            ))}
          </div>

          <div className="quizNav">
            {currentQuestion > 0 && (
              <button className="quizPrevBtn" onClick={goPrev}>← Back</button>
            )}
            <button
              className="quizNextBtn"
              onClick={goNext}
              disabled={currentAnswer === undefined}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "See My Score →" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {quizComplete && (
        <div className="quizResultCard" style={{ borderColor: getLevelColor(calculatedLevel) }}>
          <div className="quizResultTop">
            <div className="quizResultCircle"
              style={{ background: `${getLevelColor(calculatedLevel)}15`,
                       border: `3px solid ${getLevelColor(calculatedLevel)}` }}>
              <p className="quizResultEmoji">{getLevelEmoji(calculatedLevel)}</p>
              <p className="quizResultScore" style={{ color: getLevelColor(calculatedLevel) }}>
                {calculatedLevel}/10
              </p>
            </div>
            <div className="quizResultInfo">
              <p className="quizResultLabel" style={{ color: getLevelColor(calculatedLevel) }}>
                {getLevelLabel(calculatedLevel)}
              </p>
              <p className="quizResultDesc">Your energy score for today</p>
              <button className="retakeBtn" onClick={retakeQuiz}>🔄 Retake Quiz</button>
            </div>
          </div>

          {/* Exercise Tips */}
          <div className="energyTipsSection"
            style={{ background: `${getLevelColor(calculatedLevel)}08`,
                     borderColor: `${getLevelColor(calculatedLevel)}30` }}>
            <p className="tipsTitle" style={{ color: getLevelColor(calculatedLevel) }}>
              🏃 Recommended Exercises
            </p>
            <ul className="tipsList">
              {getExerciseTips(calculatedLevel).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Food Tips */}
          <div className="energyTipsSection" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
            <p className="tipsTitle" style={{ color: "#16a34a" }}>
              🥗 Eat This for Better Energy
            </p>
            <ul className="tipsList">
              {getFoodTips(calculatedLevel).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="additionalSection">
            <h3>What have you been doing today? (optional)</h3>
            <div className="activitiesGrid">
              {activityOptions.map((act) => (
                <button
                  key={act}
                  className={`activityBtn ${activities.includes(act) ? "selected" : ""}`}
                  onClick={() => setActivities(prev =>
                    prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
                  )}>
                  {act}
                </button>
              ))}
            </div>

            <div className="formGroup" style={{ marginTop: "16px" }}>
              <label>Notes (optional)</label>
              <textarea
                placeholder="Any notes about your energy today..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
              />
            </div>

            {error && <p className="errorText">{error}</p>}
            {saved && <p className="successText">✅ Energy log saved!</p>}

            <button onClick={saveLog} disabled={saving} className="saveBtn">
              {saving ? "Saving..." : "Save Energy Log"}
            </button>
          </div>
        </div>
      )}

      {/* History */}
      <div className="energyHistory">
        <h2>Energy History (Last 7 Days)</h2>
        {loadingLogs ? (
          <p className="loadingText">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="emptyText">No energy logs in the last 7 days.</p>
        ) : (
          <div className="energyList">
            {logs.map((log) => (
              <div key={log._id} className="energyCard"
                style={{ borderLeft: `4px solid ${getLevelColor(log.level)}`,
                         background: `${getLevelColor(log.level)}08` }}>
                <div className="energyCardLeft">
                  <p className="energyLevel" style={{ color: getLevelColor(log.level) }}>
                    {log.level}/10
                  </p>
                  <p className="energyMood">{log.mood}</p>
                  {log.timeOfDay && <p className="energyTime">{log.timeOfDay}</p>}
                </div>
                <div className="energyCardRight">
                  {log.activities?.length > 0 && (
                    <div className="energyActivities">
                      {log.activities.map((a, i) => (
                        <span key={i} className="activityTag">{a}</span>
                      ))}
                    </div>
                  )}
                  {log.notes && <p className="energyNotes">{log.notes}</p>}
                  <p className="energyDate">
                    {new Date(log.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard"><button className="backBtn">← Back to Dashboard</button></Link>
      </div>
    </div>
  );
}

export default EnergyTracker;