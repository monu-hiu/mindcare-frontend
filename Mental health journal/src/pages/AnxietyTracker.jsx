import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./anxiety.css";

function AnxietyTracker() {
  const { token } = useAuth();
  const { language, t } = useLanguage(); // ✅ moved to top, before QUIZ_QUESTIONS

  // ✅ QUIZ_QUESTIONS moved inside component so language is available
  const SCORE_MAP = [
    [0, 2, 5, 8],
    [0, 2, 5, 8],
    [0, 2, 5, 8],
    [0, 2, 5, 8],
    [0, 2, 5, 8],
  ];

  const QUIZ_QUESTIONS = translations.anxietyQuiz[language].questions.map((q, i) => ({
    id: i + 1,
    question: q.question,
    options: q.options.map((opt, j) => ({
      text: opt,
      score: SCORE_MAP[i][j],
    })),
  }));

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
      const res = await fetch("http://localhost:5000/api/anxiety/history", {
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
      const res = await fetch("http://localhost:5000/api/anxiety/stats", {
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

  const sendSmartNotification = async (level) => {
    if (notifSentRef.current) return;
    if (!("Notification" in window)) return;
    if (level < 4) return;

    const sendNotif = (title, body) => {
      if (Notification.permission === "granted") {
        new Notification(title, { body, icon: "/Logo_mindcare.png" });
        notifSentRef.current = true;
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((p) => {
          if (p === "granted") {
            new Notification(title, { body, icon: "/Logo_mindcare.png" });
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

    checkConsecutiveHighAnxiety(level);
  };

  const checkConsecutiveHighAnxiety = async (todayLevel) => {
    if (todayLevel < 7) return;
    try {
      const res = await fetch("http://localhost:5000/api/anxiety/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.success) return;
      const recentLogs = data.logs.slice(0, 3);
      const allHigh = recentLogs.length >= 2 && recentLogs.every(l => l.level >= 7);
      if (allHigh) sendAutoCallNotification();
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
    triggerSupportCall();
  };

  const triggerSupportCall = async () => {
    try {
      await fetch("http://localhost:5000/api/support/trigger-call", {
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

  const saveLog = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/anxiety/save", {
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
        await sendSmartNotification(calculatedLevel);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t("common.error"));
    } finally {
      setSaving(false);
    }
  };

  const getLevelColor = (l) => l <= 3 ? "#22c55e" : l <= 6 ? "#f59e0b" : "#ef4444";
  const getLevelLabel = (l) => l <= 3 ? t("anxietyQuiz.lowLabel") : l <= 6 ? t("anxietyQuiz.moderateLabel") : t("anxietyQuiz.highLabel");
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
      "💙 You are not alone. This feeling will pass.",
    ];
  };

  const q = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentAnswer = answers[q?.id];

  return (
    <div className="anxietyPage">

      {/* ── Header ── */}
      <div className="anxietyHeader">
        <h1>{t("anxietyQuiz.title")}</h1>
        <p>{t("anxietyQuiz.subtitle")}</p>
      </div>

      {/* ── Stats ── */}
      {stats && (
        <div className="anxietyStats">
          <div className="anxietyStatCard">
            <p className="anxietyStatValue" style={{ color: getLevelColor(parseFloat(stats.avgLevel)) }}>
              {stats.avgLevel}/10
            </p>
            <p className="anxietyStatLabel">{t("anxietyQuiz.historyTitle")}</p>
          </div>
          <div className="anxietyStatCard">
            <p className="anxietyStatValue">{stats.totalLogs}</p>
            <p className="anxietyStatLabel">{t("common.week")}</p>
          </div>
          <div className="anxietyStatCard">
            <p className="anxietyStatValue" style={{ fontSize: "13px" }}>{stats.topTrigger || "—"}</p>
            <p className="anxietyStatLabel">{t("common.stats")}</p>
          </div>
        </div>
      )}

      {/* ── Quiz Mode ── */}
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
              <button className="quizPrevBtn" onClick={goPrev}>{t("common.prev")}</button>
            )}
            <button
              className="quizNextBtn"
              onClick={goNext}
              disabled={currentAnswer === undefined}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? t("anxietyQuiz.seeScore") : t("common.next")}
            </button>
          </div>
        </div>
      )}

      {/* ── Result Mode ── */}
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
              <p className="quizResultDesc">{t("common.quizResultsDesc")}</p>
              <button className="retakeBtn" onClick={retakeQuiz}>
                {t("anxietyQuiz.retake")}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="anxietyTipsBox"
            style={{ background: `${getLevelColor(calculatedLevel)}08`,
                     borderColor: `${getLevelColor(calculatedLevel)}30` }}>
            <p className="tipsTitle" style={{ color: getLevelColor(calculatedLevel) }}>
              {t("anxietyQuiz.tipsTitle")}
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

          {/* Crisis Alert */}
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
                <a href="tel:9820466627" className="crisisNumber">
                  <p className="crisisOrg">AASRA</p>
                  <p className="crisisPhone">9820466627</p>
                </a>
              </div>
            </div>
          )}

          {/* Additional Inputs */}
          <div className="additionalSection">
            <h3>{t("common.notes")} {t("common.optional")}</h3>

            {/* Triggers */}
            <div className="tagSection">
              <label>{t("anxietyQuiz.triggers")}</label>
              <div className="tagGrid">
                {/* ✅ renamed (t) to (item) to avoid shadowing the t() function */}
                {triggerOptions.map((item) => (
                  <button key={item}
                    className={`tagBtn ${triggers.includes(item) ? "selected" : ""}`}
                    onClick={() => setTriggers(prev =>
                      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
                    )}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="tagSection">
              <label>{t("anxietyQuiz.symptoms")}</label>
              <div className="tagGrid">
                {symptomOptions.map((item) => (
                  <button key={item}
                    className={`tagBtn symptomBtn ${symptoms.includes(item) ? "selected" : ""}`}
                    onClick={() => setSymptoms(prev =>
                      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
                    )}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Coping */}
            <div className="tagSection">
              <label>{t("anxietyQuiz.coping")}</label>
              <div className="tagGrid">
                {copingOptions.map((item) => (
                  <button key={item}
                    className={`tagBtn copingBtn ${copingStrategy === item ? "selected" : ""}`}
                    onClick={() => setCopingStrategy(copingStrategy === item ? "" : item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="formGroup">
              <label>{t("common.notes")} {t("common.optional")}</label>
              <textarea
                placeholder={t("moodTracker.notePlaceholder")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
              />
            </div>

            {error && <p className="errorText">{error}</p>}
            {saved && <p className="successText">{t("common.saved")}</p>}

            <button onClick={saveLog} disabled={saving} className="saveBtn">
              {saving ? t("common.saving") : t("anxietyQuiz.saveBtn")}
            </button>
          </div>
        </div>
      )}

      {/* ── History ── */}
      <div className="anxietyHistory">
        <h2>{t("anxietyQuiz.historyTitle")}</h2>
        {loadingLogs ? (
          <p className="loadingText">{t("common.loading")}</p>
        ) : logs.length === 0 ? (
          <p className="emptyText">{t("common.noData")}</p>
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
                    {getLevelLabel(log.level)}
                  </p>
                </div>
                <div className="anxietyCardRight">
                  {log.triggers?.length > 0 && (
                    <div className="tagRow">
                      <span className="tagRowLabel">{t("anxietyQuiz.triggers")}: </span>
                      {/* ✅ renamed (t, i) to (item, i) to avoid shadowing */}
                      {log.triggers.map((item, i) => (
                        <span key={i} className="triggerTag">{item}</span>
                      ))}
                    </div>
                  )}
                  {log.copingStrategy && (
                    <p className="copingText">
                      {t("anxietyQuiz.coping")}: <strong>{log.copingStrategy}</strong>
                    </p>
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

      {/* ── Back Button ── */}
      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>

    </div>
  );
}

export default AnxietyTracker;