import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./anxiety.css";

// ── QUIZ QUESTIONS ──────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How often have you felt nervous, anxious, or on edge today?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "A little bit", score: 2 },
      { text: "Quite a bit", score: 5 },
      { text: "Very much", score: 8 },
    ],
  },
  {
    id: 2,
    question: "How difficult has it been to control your worrying today?",
    options: [
      { text: "Not difficult at all", score: 0 },
      { text: "Somewhat difficult", score: 2 },
      { text: "Very difficult", score: 5 },
      { text: "Extremely difficult", score: 8 },
    ],
  },
  {
    id: 3,
    question: "Are you experiencing any physical symptoms right now?",
    options: [
      { text: "No physical symptoms", score: 0 },
      { text: "Slightly tense or restless", score: 2 },
      { text: "Racing heart or shortness of breath", score: 5 },
      { text: "Trembling, sweating, or chest tightness", score: 8 },
    ],
  },
  {
    id: 4,
    question: "How much is anxiety affecting your ability to function today?",
    options: [
      { text: "Not at all — I feel fine", score: 0 },
      { text: "Mildly — I can still manage", score: 2 },
      { text: "Moderately — it's affecting my work/study", score: 5 },
      { text: "Severely — I can barely function", score: 8 },
    ],
  },
  {
    id: 5,
    question: "Have you had any intrusive or racing thoughts today?",
    options: [
      { text: "No intrusive thoughts", score: 0 },
      { text: "Occasional worrying thoughts", score: 2 },
      { text: "Frequent racing thoughts", score: 5 },
      { text: "Constant overwhelming thoughts", score: 8 },
    ],
  },
];

function AnxietyTracker() {
  const { token } = useAuth();

  // Quiz state
  const [quizMode, setQuizMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState(0);

  // Log state
  const [triggers, setTriggers] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [copingStrategy, setCopingStrategy] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingLogs, setLoadingLogs] = useState(true);

  const notifSentRef = useRef(false);

  const triggerOptions = ["Work", "Family", "Health", "Finance", "Social", "Future", "Past", "Loneliness", "Deadlines", "Conflict", "Change", "Other"];
  const symptomOptions = ["Racing heart", "Sweating", "Trembling", "Shortness of breath", "Chest tightness", "Dizziness", "Overthinking", "Restlessness"];
  const copingOptions = ["Deep breathing", "Meditation", "Exercise", "Talking to someone", "Journaling", "Music", "Walking", "Rest"];

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        // Show only last 7 days in UI
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
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  // ── QUIZ LOGIC ──────────────────────────────────────────
  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const goNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate final score
      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      // Max possible = 5 * 8 = 40, normalize to 1-10
      const normalized = Math.max(1, Math.min(10, Math.round((totalScore / 40) * 10)));
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

  // ── SMART NOTIFICATION ─────────────────────────────────
  const sendSmartNotification = async (level) => {
    if (notifSentRef.current) return;
    if (!("Notification" in window)) return;

    // Only send for moderate+ anxiety
    if (level < 4) return;

    const sendNotif = (title, body) => {
      if (Notification.permission === "granted") {
        new Notification(title, { body, icon: "/Logo_mindcare.jpg" });
        notifSentRef.current = true;
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((p) => {
          if (p === "granted") {
            new Notification(title, { body, icon: "/Logo_mindcare.jpg" });
            notifSentRef.current = true;
          }
        });
      }
    };

    if (level >= 7) {
      sendNotif(
        "⚠️ High Anxiety Detected",
        "Your anxiety level is high today. Please try the 4-7-8 breathing exercise and consider reaching out for support."
      );
    } else if (level >= 4) {
      sendNotif(
        "💭 Moderate Anxiety",
        "You're feeling some anxiety today. Try a short walk or breathing exercise — it really helps!"
      );
    }

    // Check for 3+ consecutive high anxiety days
    checkConsecutiveHighAnxiety(level);
  };

  const checkConsecutiveHighAnxiety = async (todayLevel) => {
    if (todayLevel < 7) return;
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) return;

      const recentLogs = data.logs.slice(0, 3);
      const allHigh = recentLogs.length >= 2 && recentLogs.every(l => l.level >= 7);

      if (allHigh) {
        // Trigger auto-call notification
        sendAutoCallNotification();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendAutoCallNotification = () => {
    if (!("Notification" in window)) return;
    const title = "🆘 MindCare Support Call";
    const body = "You've been experiencing high anxiety for multiple days. Our support team will reach out to you soon. You are not alone. 💙";

    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/Logo_mindcare.png" });
    }

    // In production: trigger backend to call user
    // POST /api/support/trigger-call { userId }
    triggerSupportCall();
  };

  const triggerSupportCall = async () => {
    try {
      await fetch("https://mindcare-backend-v56a.onrender.com/api/support/trigger-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log("Support call trigger:", err.message);
    }
  };

  // ── SAVE LOG ────────────────────────────────────────────
  const saveLog = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          level: calculatedLevel,
          triggers, symptoms, copingStrategy, notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setLogs(prev => [data.anxietyLog, ...prev]);
        setTriggers([]);
        setSymptoms([]);
        setCopingStrategy("");
        setNotes("");
        fetchStats();

        // Send smart notification ONLY on save
        await sendSmartNotification(calculatedLevel);

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

  const getLevelColor = (l) => l <= 3 ? "#22c55e" : l <= 6 ? "#f59e0b" : "#ef4444";
  const getLevelLabel = (l) => l <= 3 ? "Low Anxiety" : l <= 6 ? "Moderate" : "High Anxiety";
  const getLevelEmoji = (l) => l <= 3 ? "😌" : l <= 6 ? "😐" : "😰";

  const getTips = (l) => {
    if (l <= 3) return [
      "✅ You're managing well! Keep up your healthy habits.",
      "🧘 A short 5-minute meditation can maintain your calm.",
      "📝 Journal what's going well — gratitude reinforces calm.",
    ];
    if (l <= 6) return [
      "💧 Drink water and take slow deep breaths right now.",
      "🚶 A 10-minute walk can reduce anxiety by up to 40%.",
      "📞 Consider talking to a trusted friend or family member.",
      "🎵 Listen to calming music — 60 BPM tracks work best.",
    ];
    return [
      "🆘 Your anxiety is high — please be gentle with yourself.",
      "💨 Try 4-7-8 breathing: Inhale 4s → Hold 7s → Exhale 8s",
      "📱 Consider calling iCall: 9152987821 for free support.",
      "🧊 Hold ice cubes — the sensation grounds you instantly.",
      "💙 You are not alone. This feeling will pass.",
    ];
  };

  const q = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentAnswer = answers[q?.id];

  return (
    <div className="anxietyPage">
      <div className="anxietyHeader">
        <h1>💭 Anxiety Tracker</h1>
        <p>Answer a few questions to understand your anxiety level today.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="anxietyStats">
          <div className="anxietyStatCard">
            <p className="anxietyStatValue" style={{ color: getLevelColor(parseFloat(stats.avgLevel)) }}>
              {stats.avgLevel}/10
            </p>
            <p className="anxietyStatLabel">Avg Anxiety (7 days)</p>
          </div>
          <div className="anxietyStatCard">
            <p className="anxietyStatValue">{stats.totalLogs}</p>
            <p className="anxietyStatLabel">Logs This Week</p>
          </div>
          <div className="anxietyStatCard">
            <p className="anxietyStatValue" style={{ fontSize: "13px" }}>{stats.topTrigger || "—"}</p>
            <p className="anxietyStatLabel">Top Trigger</p>
          </div>
        </div>
      )}

      {/* ── QUIZ MODE ── */}
      {quizMode && (
        <div className="quizCard">
          {/* Progress bar */}
          <div className="quizProgress">
            <div className="quizProgressBar">
              <div className="quizProgressFill" style={{ width: `${progress}%` }} />
            </div>
            <p className="quizProgressText">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>
          </div>

          {/* Question */}
          <p className="quizQuestion">{q.question}</p>

          {/* Options */}
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

          {/* Navigation */}
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

      {/* ── RESULT MODE ── */}
      {quizComplete && (
        <div className="quizResultCard"
          style={{ borderColor: getLevelColor(calculatedLevel) }}>
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
              <p className="quizResultDesc">
                Based on your answers today
              </p>
              <button className="retakeBtn" onClick={retakeQuiz}>
                🔄 Retake Quiz
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="anxietyTipsBox"
            style={{ background: `${getLevelColor(calculatedLevel)}08`,
                     borderColor: `${getLevelColor(calculatedLevel)}30` }}>
            <p className="tipsTitle" style={{ color: getLevelColor(calculatedLevel) }}>
              💡 Personalized Tips for You
            </p>
            <ul className="tipsList">
              {getTips(calculatedLevel).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            {calculatedLevel >= 7 && (
              <a href="tel:9152987821" className="crisisCallBtn">
                📞 Call iCall Now — Free & Confidential
              </a>
            )}
          </div>

          {/* Crisis alert */}
          {calculatedLevel >= 8 && (
            <div className="crisisAlert">
              <p className="crisisTitle">🆘 You are not alone — Help is available</p>
              <div className="crisisNumbers">
                <a href="tel:9152987821" className="crisisNumber">
                  <p className="crisisOrg">iCall (TISS)</p>
                  <p className="crisisPhone">9152987821</p>
                </a>
                <a href="tel:18602662345" className="crisisNumber">
                  <p className="crisisOrg">Vandrevala</p>
                  <p className="crisisPhone">1860-2662-345</p>
                </a>
                <a href="tel:8766344351" className="crisisNumber">
                  <p className="crisisOrg">Madhusudhan</p>
                  <p className="crisisPhone">8766344351</p>
                </a>
              </div>
            </div>
          )}

          {/* Additional inputs */}
          <div className="additionalSection">
            <h3>Tell us more (optional)</h3>

            <div className="tagSection">
              <label>What triggered your anxiety?</label>
              <div className="tagGrid">
                {triggerOptions.map((t) => (
                  <button key={t}
                    className={`tagBtn ${triggers.includes(t) ? "selected" : ""}`}
                    onClick={() => setTriggers(prev =>
                      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
                    )}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="tagSection">
              <label>What symptoms are you experiencing?</label>
              <div className="tagGrid">
                {symptomOptions.map((s) => (
                  <button key={s}
                    className={`tagBtn symptomBtn ${symptoms.includes(s) ? "selected" : ""}`}
                    onClick={() => setSymptoms(prev =>
                      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
                    )}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="tagSection">
              <label>What helped you cope?</label>
              <div className="tagGrid">
                {copingOptions.map((c) => (
                  <button key={c}
                    className={`tagBtn copingBtn ${copingStrategy === c ? "selected" : ""}`}
                    onClick={() => setCopingStrategy(copingStrategy === c ? "" : c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="formGroup">
              <label>Additional notes (optional)</label>
              <textarea
                placeholder="How are you feeling? What's on your mind?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
              />
            </div>

            {error && <p className="errorText">{error}</p>}
            {saved && <p className="successText">✅ Anxiety log saved!</p>}

            <button onClick={saveLog} disabled={saving} className="saveBtn">
              {saving ? "Saving..." : "Save Anxiety Log"}
            </button>
          </div>
        </div>
      )}

      {/* History */}
      <div className="anxietyHistory">
        <h2>Anxiety History (Last 7 Days)</h2>
        {loadingLogs ? (
          <p className="loadingText">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="emptyText">No logs in the last 7 days.</p>
        ) : (
          <div className="anxietyList">
            {logs.map((log) => (
              <div key={log._id} className="anxietyCard"
                style={{ borderLeft: `4px solid ${getLevelColor(log.level)}`,
                         background: `${getLevelColor(log.level)}08` }}>
                <div className="anxietyCardLeft">
                  <p className="anxietyLevel" style={{ color: getLevelColor(log.level) }}>
                    {log.level}/10
                  </p>
                  <p className="anxietyLevelLabel" style={{ color: getLevelColor(log.level) }}>
                    {log.level <= 3 ? "Low" : log.level <= 6 ? "Moderate" : "High"}
                  </p>
                </div>
                <div className="anxietyCardRight">
                  {log.triggers?.length > 0 && (
                    <div className="tagRow">
                      <span className="tagRowLabel">Triggers: </span>
                      {log.triggers.map((t, i) => (
                        <span key={i} className="triggerTag">{t}</span>
                      ))}
                    </div>
                  )}
                  {log.copingStrategy && (
                    <p className="copingText">Coped with: <strong>{log.copingStrategy}</strong></p>
                  )}
                  <p className="anxietyDate">
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

export default AnxietyTracker;