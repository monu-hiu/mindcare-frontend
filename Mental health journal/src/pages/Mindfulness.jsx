import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./mindfulness.css";
import DropdownSelect from "../components/DropdownSelect";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";


function Mindfulness() {
  const [activeTab, setActiveTab] = useState("breathing");
  const [isBreathing, setIsBreathing] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(5);
  const [timerLeft, setTimerLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const { language, t } = useLanguage();
  const data = translations.mindfulness[language] || translations.mindfulness.en;

  // ── Pull everything from translations ──────────────────────
  const breathingExercises = data.breathingExercises.map((ex, i) => {
    const colors = ["#4f46e5", "#10b981", "#06b6d4", "#f59e0b"];
    return { ...ex, color: colors[i] };
  });

  const meditations = data.meditations.map((med, i) => {
    const emojis = ["🧘", "💝", "💨", "🌅", "🚶", "🎵"];
    const colors = ["#8b5cf6", "#ec4899", "#4f46e5", "#f59e0b", "#10b981", "#06b6d4"];
    return { ...med, emoji: emojis[i], color: colors[i] };
  });

  const groundingTechniques = data.groundingTechniques.map((tech, i) => {
    const emojis = ["🖐️", "💧", "🏡"];
    const colors = ["#4f46e5", "#06b6d4", "#10b981"];
    return { ...tech, emoji: emojis[i], color: colors[i] };
  });

  const affirmations = data.affirmations.map((cat, i) => {
    const colors = ["#4f46e5", "#ef4444", "#10b981", "#f59e0b", "#ec4899"];
    return { ...cat, color: colors[i] };
  });

  const tabs = [
    { key: "breathing",    label: t("mindfulness.tabs.breathing") },
    { key: "meditation",   label: t("mindfulness.tabs.meditation") },
    { key: "grounding",    label: t("mindfulness.tabs.grounding") },
    { key: "affirmations", label: t("mindfulness.tabs.affirmations") },
  ];

  const timerOptions = [3, 5, 10, 15, 20];

  const [selectedBreath, setSelectedBreath] = useState(breathingExercises[0]);
  const [phaseIndex, setPhaseIndex]         = useState(0);
  const [phaseTimer, setPhaseTimer]         = useState(0);
  const [breathCount, setBreathCount]       = useState(0);

  // Keep selectedBreath in sync when language changes
  useEffect(() => {
    const updatedExercises = (translations.mindfulness[language] || translations.mindfulness.en)
      .breathingExercises.map((ex, i) => {
        const colors = ["#4f46e5", "#10b981", "#06b6d4", "#f59e0b"];
        return { ...ex, color: colors[i] };
      });
    setSelectedBreath(prev => {
      const match = updatedExercises.find(e => e.id === prev.id);
      return match || updatedExercises[0];
    });
  }, [language]);

  // ── Breathing logic ──────────────────────────────────
  useEffect(() => {
    if (!isBreathing) return;

    const currentPhase = selectedBreath.phases[phaseIndex];
    setPhaseTimer(currentPhase.seconds);

    const countdown = setInterval(() => {
      setPhaseTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          const nextIndex = (phaseIndex + 1) % selectedBreath.phases.length;
          setPhaseIndex(nextIndex);
          if (nextIndex === 0) setBreathCount((c) => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isBreathing, phaseIndex, selectedBreath]);

  const startBreathing = () => {
    setIsBreathing(true);
    setPhaseIndex(0);
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setPhaseIndex(0);
    setBreathCount(0);
    setPhaseTimer(0);
  };

  // ── Meditation timer ──────────────────────────────────
  const startTimer = () => {
    setTimerLeft(selectedTimer * 60);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimerLeft(null);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (!timerRunning) return;
    timerRef.current = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const [expandedMed,    setExpandedMed]    = useState(null);
  const [expandedGround, setExpandedGround] = useState(null);
  const [currentAffCat,  setCurrentAffCat]  = useState(0);
  const [currentAff,     setCurrentAff]     = useState(0);

  const nextAffirmation = () => {
    const cat = affirmations[currentAffCat];
    if (currentAff < cat.list.length - 1) {
      setCurrentAff(currentAff + 1);
    } else {
      setCurrentAffCat((currentAffCat + 1) % affirmations.length);
      setCurrentAff(0);
    }
  };

  const currentPhase = selectedBreath.phases[phaseIndex];
  const phaseColors  = { Inhale: "#4f46e5", Hold: "#f59e0b", Exhale: "#10b981" };

  // For translated phase labels, map by index position instead of English label
  const phaseColorsByIndex = ["#4f46e5", "#f59e0b", "#10b981", "#f59e0b"];
  const circleColor = phaseColorsByIndex[phaseIndex] || selectedBreath.color;

  return (
    <div className="mindfulPage">
      <div className="mindfulHeader">
        <h1>{t("mindfulness.title")}</h1>
        <p>{t("mindfulness.subtitle")}</p>
      </div>

      {/* Tabs */}
      <div className="mindfulTabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`mindfulTab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── BREATHING ── */}
      {activeTab === "breathing" && (
        <div className="breathingSection">
          <div className="breathSelector">
            {breathingExercises.map((ex) => (
              <button
                key={ex.id}
                className={`breathOption ${selectedBreath.id === ex.id ? "active" : ""}`}
                style={{
                  borderColor: selectedBreath.id === ex.id ? ex.color : "#e5e7eb",
                  background:  selectedBreath.id === ex.id ? `${ex.color}10` : "white",
                  color:       selectedBreath.id === ex.id ? ex.color : "#374151",
                }}
                onClick={() => { setSelectedBreath(ex); stopBreathing(); }}
              >
                <span className="breathOptName">{ex.name}</span>
                <span className="breathOptDesc">{ex.desc}</span>
              </button>
            ))}
          </div>

          <div className="breathCircleArea">
            <div
              className={`breathCircleOuter ${isBreathing ? "animating" : ""}`}
              style={{ borderColor: `${circleColor}30` }}
            >
              <div
                className={`breathCircleInner ${isBreathing ? `breath-phase-${phaseIndex}` : ""}`}
                style={{ background: isBreathing ? circleColor : "#e0e7ff" }}
              >
                {isBreathing ? (
                  <>
                    <p className="breathPhaseText">{currentPhase?.label}</p>
                    <p className="breathPhaseTimer">{phaseTimer}s</p>
                  </>
                ) : (
                  <p className="breathReadyText">{t("mindfulness.breatheReady")}</p>
                )}
              </div>
            </div>

            {isBreathing && (
              <p className="breathCycleCount">
                {t("mindfulness.breatheCount")} {breathCount}
              </p>
            )}

            <div className="breathBtns">
              {!isBreathing ? (
                <button
                  className="startBreathBtn"
                  style={{ background: selectedBreath.color }}
                  onClick={startBreathing}
                >
                  {t("mindfulness.startBtn")}
                </button>
              ) : (
                <button className="stopBreathBtn" onClick={stopBreathing}>
                  {t("mindfulness.stopBtn")}
                </button>
              )}
            </div>

            <div className="phaseGuide">
              {selectedBreath.phases.map((p, i) => (
                <div
                  key={i}
                  className={`phaseGuideItem ${isBreathing && phaseIndex === i ? "active" : ""}`}
                >
                  <span
                    className="phaseGuideDot"
                    style={{ background: phaseColorsByIndex[i] || selectedBreath.color }}
                  />
                  <span>{p.label} {p.seconds}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MEDITATION ── */}
      {activeTab === "meditation" && (
        <div className="meditationSection">
          <div className="timerCard">
            <h3>{t("mindfulness.meditationTimerTitle")}</h3>
            {timerRunning && timerLeft !== null ? (
              <div className="timerDisplay">
                <p className="timerCount">{formatTime(timerLeft)}</p>
                <p className="timerMsg">{t("mindfulness.timerRunningMsg")}</p>
                <button className="stopTimerBtn" onClick={stopTimer}>
                  {t("mindfulness.timerEndBtn")}
                </button>
              </div>
            ) : timerLeft === 0 ? (
              <div className="timerDone">
                <p>{t("mindfulness.timerDoneMsg")}</p>
                <button className="startTimerBtn" onClick={() => setTimerLeft(null)}>
                  {t("mindfulness.timerNewSessionBtn")}
                </button>
              </div>
            ) : (
              <div className="timerSetup">
                <p className="timerLabel">{t("mindfulness.timerSelectLabel")}</p>
                <DropdownSelect
                  options={timerOptions.map((opt) => ({
                    value: opt,
                    label: `${opt} ${t("mindfulness.timerMinSuffix")}`,
                  }))}
                  value={selectedTimer}
                  onChange={setSelectedTimer}
                  placeholder={t("mindfulness.timerPlaceholder")}
                  multiple={false}
                />
                <button className="startTimerBtn" onClick={startTimer}>
                  {t("mindfulness.startBtn")}
                </button>
              </div>
            )}
          </div>

          <h3 className="medSectionTitle">{t("mindfulness.meditationGuidesTitle")}</h3>
          <div className="medsGrid">
            {meditations.map((med) => (
              <div
                key={med.id}
                className="medCard"
                style={{ borderTop: `4px solid ${med.color}` }}
              >
                <div className="medTop">
                  <span className="medEmoji" style={{ background: `${med.color}15` }}>
                    {med.emoji}
                  </span>
                  <div>
                    <h3 className="medTitle">{med.title}</h3>
                    <p className="medDuration">
                      {t("mindfulness.meditationDurationIcon")} {med.duration}
                    </p>
                  </div>
                </div>
                <p className="medDesc">{med.desc}</p>
                <button
                  className="medToggle"
                  style={{ color: med.color }}
                  onClick={() => setExpandedMed(expandedMed === med.id ? null : med.id)}
                >
                  {expandedMed === med.id
                    ? t("mindfulness.hideStepsBtn")
                    : t("mindfulness.howToPracticeBtn")}
                </button>
                {expandedMed === med.id && (
                  <ol
                    className="medSteps"
                    style={{ borderColor: `${med.color}30`, background: `${med.color}06` }}
                  >
                    {med.steps.map((step, i) => (
                      <li key={i}>
                        <span className="stepNum" style={{ color: med.color }}>{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── GROUNDING ── */}
      {activeTab === "grounding" && (
        <div className="groundingSection">
          <div className="groundingIntro">
            <p>{t("mindfulness.groundingIntro")}</p>
          </div>
          {groundingTechniques.map((tech) => (
            <div key={tech.id} className="groundCard">
              <div
                className="groundHeader"
                style={{
                  background:   `${tech.color}10`,
                  borderBottom: `2px solid ${tech.color}20`,
                }}
              >
                <span className="groundEmoji">{tech.emoji}</span>
                <h3 className="groundTitle" style={{ color: tech.color }}>{tech.title}</h3>
                <button
                  className="groundToggle"
                  style={{ background: tech.color, color: "white" }}
                  onClick={() =>
                    setExpandedGround(expandedGround === tech.id ? null : tech.id)
                  }
                >
                  {expandedGround === tech.id
                    ? t("mindfulness.hideStepsBtn")
                    : t("mindfulness.howToPracticeBtn")}
                </button>
              </div>
              {expandedGround === tech.id && (
                <div className="groundSteps">
                  {tech.steps.map((step, i) => (
                    <div key={i} className="groundStep">
                      <div
                        className="groundStepIcon"
                        style={{ background: `${tech.color}15`, color: tech.color }}
                      >
                        {step.icon}
                      </div>
                      <div className="groundStepBody">
                        <p className="groundStepNum" style={{ color: tech.color }}>
                          {t("mindfulness.groundingStepLabel")} {step.number} — {step.sense}
                        </p>
                        <p className="groundStepText">{step.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── AFFIRMATIONS ── */}
      {activeTab === "affirmations" && (
        <div className="affirmationsSection">
          <div className="affCats">
            {affirmations.map((cat, i) => (
              <button
                key={i}
                className={`affCatBtn ${currentAffCat === i ? "active" : ""}`}
                style={{
                  borderColor: currentAffCat === i ? cat.color : "#e5e7eb",
                  background:  currentAffCat === i ? `${cat.color}15` : "white",
                  color:       currentAffCat === i ? cat.color : "#6b7280",
                }}
                onClick={() => { setCurrentAffCat(i); setCurrentAff(0); }}
              >
                {cat.emoji} {cat.category}
              </button>
            ))}
          </div>

          <div className="affCard" style={{ borderColor: affirmations[currentAffCat].color }}>
            <p className="affCategory" style={{ color: affirmations[currentAffCat].color }}>
              {affirmations[currentAffCat].emoji} {affirmations[currentAffCat].category}
            </p>
            <p className="affText">
              "{affirmations[currentAffCat].list[currentAff]}"
            </p>
            <p className="affProgress">
              {currentAff + 1} / {affirmations[currentAffCat].list.length}
            </p>
            <button
              className="affNextBtn"
              style={{ background: affirmations[currentAffCat].color }}
              onClick={nextAffirmation}
            >
              {t("mindfulness.affirmationNextBtn")}
            </button>
          </div>

          <div className="affAllTitle">{t("mindfulness.affAllTitle")}</div>
          <div className="affList">
            {affirmations[currentAffCat].list.map((aff, i) => (
              <div
                key={i}
                className={`affItem ${i === currentAff ? "active" : ""}`}
                style={{
                  borderColor:
                    i === currentAff
                      ? affirmations[currentAffCat].color
                      : "#f3f4f6",
                }}
                onClick={() => setCurrentAff(i)}
              >
                <span
                  className="affItemNum"
                  style={{ color: affirmations[currentAffCat].color }}
                >
                  {i + 1}
                </span>
                <p>{aff}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("mindfulness.backBtn")}</button>
        </Link>
      </div>
    </div>
  );
}

export default Mindfulness;

