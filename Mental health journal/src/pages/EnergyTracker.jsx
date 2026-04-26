import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./energy.css";

function EnergyTracker() {
  const { token } = useAuth();
  const { t, language } = useLanguage();

  // ✅ Get questions array from translations based on current language
  const QUIZ_QUESTIONS = translations.energyQuiz[language].questions.map((q, i) => ({
    id: i + 1,
    question: q.question,
    options: q.options.map((opt, j) => ({
      text: opt,
      score: [1, 3, 6, 9, 10][j] ?? (j + 1) * 2,
    })),
  }));

  // Fix scores per question to match originals
  const SCORE_MAP = [
    [1, 3, 6, 9],
    [1, 4, 7, 10],
    [1, 3, 6, 9],
    [1, 4, 7, 10],
    [1, 3, 6, 9],
  ];

  const questions = translations.energyQuiz[language].questions.map((q, i) => ({
    id: i + 1,
    question: q.question,
    options: q.options.map((opt, j) => ({
      text: opt,
      score: SCORE_MAP[i][j],
    })),
  }));

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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      const maxScore = questions.length * 10;
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
        sendSmartNotification(calculatedLevel);
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

  const getLevelColor = (l) => l >= 7 ? "#22c55e" : l >= 4 ? "#f59e0b" : "#ef4444";
  const getLevelLabel = (l) => l >= 7 ? t("energyQuiz.highLabel") : l >= 4 ? t("energyQuiz.moderateLabel") : t("energyQuiz.lowLabel");
  const getLevelEmoji = (l) => l >= 7 ? "⚡" : l >= 4 ? "😐" : "😴";
  const getFoodTips = (l) => l >= 7 ? foodTips.high : l >= 4 ? foodTips.moderate : foodTips.low;
  const getExerciseTips = (l) => l >= 7 ? exerciseTips.high : l >= 4 ? exerciseTips.moderate : exerciseTips.low;

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[q?.id];

  return (
    <div className="energyPage">

      {/* ── Header ── */}
      <div className="energyHeader">
        <h1>{t("energyQuiz.title")}</h1>
        <p>{t("energyQuiz.subtitle")}</p>
      </div>

      {/* ── Stats ── */}
      {stats && (
        <div className="energyStats">
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.avgLevel}/10</p>
            <p className="energyStatLabel">{t("energyQuiz.historyTitle")}</p>
          </div>
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.totalLogs}</p>
            <p className="energyStatLabel">{t("common.week")}</p>
          </div>
          <div className="energyStatCard">
            <p className="energyStatValue">{stats.topMood || "—"}</p>
            <p className="energyStatLabel">{t("common.stats")}</p>
          </div>
        </div>
      )}

      {/* ── Quiz ── */}
      {quizMode && (
        <div className="quizCard">
          <div className="quizProgress">
            <div className="quizProgressBar">
              <div className="quizProgressFill" style={{ width: `${progress}%` }} />
            </div>
            <p className="quizProgressText">
              Question {currentQuestion + 1} of {questions.length}
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
              <button className="quizPrevBtn" onClick={goPrev}>
                {t("common.prev")}
              </button>
            )}
            <button
              className="quizNextBtn"
              onClick={goNext}
              disabled={currentAnswer === undefined}
            >
              {currentQuestion === questions.length - 1
                ? t("energyQuiz.seeScore")
                : t("common.next")}
            </button>
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {quizComplete && (
        <div className="quizResultCard" style={{ borderColor: getLevelColor(calculatedLevel) }}>
          <div className="quizResultTop">
            <div
              className="quizResultCircle"
              style={{
                background: `${getLevelColor(calculatedLevel)}15`,
                border: `3px solid ${getLevelColor(calculatedLevel)}`,
              }}
            >
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
                {t("energyQuiz.retake")}
              </button>
            </div>
          </div>

          {/* Exercise Tips */}
          <div
            className="energyTipsSection"
            style={{
              background: `${getLevelColor(calculatedLevel)}08`,
              borderColor: `${getLevelColor(calculatedLevel)}30`,
            }}
          >
            <p className="tipsTitle" style={{ color: getLevelColor(calculatedLevel) }}>
              {t("energyQuiz.exerciseTipsTitle")}
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
              {t("energyQuiz.foodTipsTitle")}
            </p>
            <ul className="tipsList">
              {getFoodTips(calculatedLevel).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="additionalSection">
            <h3>{t("energyQuiz.activitiesLabel")}</h3>
            <div className="activitiesGrid">
              {activityOptions.map((act) => (
                <button
                  key={act}
                  className={`activityBtn ${activities.includes(act) ? "selected" : ""}`}
                  onClick={() =>
                    setActivities(prev =>
                      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
                    )
                  }
                >
                  {act}
                </button>
              ))}
            </div>

            <div className="formGroup" style={{ marginTop: "16px" }}>
              <label>{t("common.notes")} {t("common.optional")}</label>
              <textarea
                placeholder={t("sleepTracker.notesLabel")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
              />
            </div>

            {error && <p className="errorText">{error}</p>}
            {saved && <p className="successText">{t("common.saved")}</p>}

            <button onClick={saveLog} disabled={saving} className="saveBtn">
              {saving ? t("common.saving") : t("energyQuiz.saveBtn")}
            </button>
          </div>
        </div>
      )}

      {/* ── History ── */}
      <div className="energyHistory">
        <h2>{t("energyQuiz.historyTitle")}</h2>
        {loadingLogs ? (
          <p className="loadingText">{t("common.loading")}</p>
        ) : logs.length === 0 ? (
          <p className="emptyText">{t("common.noData")}</p>
        ) : (
          <div className="energyList">
            {logs.map((log) => (
              <div
                key={log._id}
                className="energyCard"
                style={{
                  borderLeft: `4px solid ${getLevelColor(log.level)}`,
                  background: `${getLevelColor(log.level)}08`,
                }}
              >
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

      {/* ── Back Button ── */}
      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>

    </div>
  );
}

export default EnergyTracker;