import { useState } from "react";
import { Link } from "react-router-dom";
import "./rage.css";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How intense is your anger or frustration right now?",
    options: [
      { text: "Mildly irritated — small annoyance", score: 2 },
      { text: "Noticeably frustrated — bothering me", score: 5 },
      { text: "Quite angry — hard to ignore", score: 7 },
      { text: "Furious — overwhelming anger", score: 10 },
    ],
  },
  {
    id: 2,
    question: "What best describes the cause of your anger?",
    options: [
      { text: "Minor inconvenience or misunderstanding", score: 2 },
      { text: "Someone's behaviour upset me", score: 5 },
      { text: "Feeling disrespected or let down", score: 7 },
      { text: "Major injustice or repeated trigger", score: 10 },
    ],
  },
  {
    id: 3,
    question: "How are you feeling physically right now?",
    options: [
      { text: "Calm and in control physically", score: 2 },
      { text: "Slightly tense — jaw or fists clenched", score: 5 },
      { text: "Heart racing, feeling hot or flushed", score: 7 },
      { text: "Shaking, very tense, hard to stay still", score: 10 },
    ],
  },
];

function RagePage() {
  const [quizMode, setQuizMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const [text, setText] = useState("");
  const [released, setReleased] = useState(false);

  const handleAnswer = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const goNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const total = Object.values(answers).reduce((a, b) => a + b, 0);
      const maxScore = QUIZ_QUESTIONS.length * 10;
      const normalized = Math.max(1, Math.min(10, Math.round((total / maxScore) * 10)));
      setIntensity(normalized);
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
    setIntensity(0);
    setText("");
    setReleased(false);
  };

  const handleRelease = () => {
    if (!text.trim()) return;
    setReleased(true);
    setTimeout(() => {
      setText("");
      setReleased(false);
    }, 3000);
  };

  const getColor = (l) => l >= 7 ? "#ef4444" : l >= 4 ? "#f97316" : "#f59e0b";
  const getLabel = (l) => l >= 7 ? "High Anger 😡" : l >= 4 ? "Moderate 😤" : "Mild Irritation 😐";

  const getTips = (l) => {
    if (l <= 3) return [
      "🌿 Take a few deep breaths — you're handling it well",
      "📝 Write down what mildly bothered you, then let it go",
      "🎵 Put on some calming music",
    ];
    if (l <= 6) return [
      "💨 Take 10 slow deep breaths right now",
      "🚶 A brisk 10-minute walk helps release frustration",
      "📝 Write down exactly what's bothering you — be specific",
      "🎵 Put on music that matches then shifts your mood",
    ];
    return [
      "🏃 Physical movement NOW — jumping jacks, run, anything",
      "📄 Tear paper into tiny pieces — releases physical tension",
      "🗣️ Shout into a pillow for 30 seconds",
      "🧊 Hold ice cubes — intense sensation redirects focus",
      "💨 Breathe: IN 4s → HOLD 4s → OUT 4s → HOLD 4s",
      "⏳ Wait 10 minutes before responding to the trigger",
    ];
  };

  const rageTips = [
    "🥊 Do 20 jumping jacks right now",
    "📄 Tear a piece of paper into tiny pieces",
    "🎵 Listen to loud music for 3 minutes",
    "🚶 Walk briskly for 5 minutes",
    "💨 10 deep breaths — exhale forcefully",
    "✍️ Write everything — then delete or burn it",
    "🗣️ Scream into a pillow",
    "🧊 Hold ice cubes for 30 seconds",
  ];

  const q = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const currentAnswer = answers[q?.id];

  return (
    <div className="ragePage">
      <div className="rageHeader">
        <h1>😤 Rage Release</h1>
        <p>A safe space to understand and release your anger.</p>
      </div>

      {/* ── QUIZ ── */}
      {quizMode && (
        <div className="quizCard">
          <div className="quizProgress">
            <div className="quizProgressBar">
              <div className="quizProgressFill rageProgress"
                style={{ width: `${progress}%` }} />
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
                className={`quizOption ${currentAnswer === opt.score ? "selected rageSelected" : ""}`}
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
              className="quizNextBtn rageNextBtn"
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
        <>
          <div className="quizResultCard" style={{ borderColor: getColor(intensity) }}>
            <div className="quizResultTop">
              <div className="quizResultCircle"
                style={{ background: `${getColor(intensity)}15`,
                         border: `3px solid ${getColor(intensity)}` }}>
                <p className="quizResultEmoji">😤</p>
                <p className="quizResultScore" style={{ color: getColor(intensity) }}>
                  {intensity}/10
                </p>
              </div>
              <div className="quizResultInfo">
                <p className="quizResultLabel" style={{ color: getColor(intensity) }}>
                  {getLabel(intensity)}
                </p>
                <p className="quizResultDesc">Your anger intensity level</p>
                <button className="retakeBtn" onClick={retakeQuiz}>🔄 Retake Quiz</button>
              </div>
            </div>

            <div className="anxietyTipsBox"
              style={{ background: `${getColor(intensity)}08`,
                       borderColor: `${getColor(intensity)}30` }}>
              <p className="tipsTitle" style={{ color: getColor(intensity) }}>
                💡 What to do right now
              </p>
              <ul className="tipsList">
                {getTips(intensity).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Write and Release */}
          <div className="rageForm">
            <h2>Write it all out — let it go 🔥</h2>
            <textarea
              placeholder="Write everything you are angry about. No judgment here. This will be cleared after you release it..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="rageTextarea"
            />
            {released ? (
              <div className="releasedMsg">
                ✅ Released! Your anger has been let go. Take a deep breath. 🌬️
              </div>
            ) : (
              <button
                onClick={handleRelease}
                disabled={!text.trim()}
                className="releaseBtn"
              >
                🔥 Release & Clear
              </button>
            )}
          </div>

          {/* Physical Tips */}
          <div className="rageTips">
            <h2>Physical Release Tips</h2>
            <div className="rageTipsGrid">
              {rageTips.map((tip, i) => (
                <div key={i} className="rageTipCard">{tip}</div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="navButtons">
        <Link to="/dashboard"><button className="backBtn">← Back to Dashboard</button></Link>
      </div>
    </div>
  );
}

export default RagePage;