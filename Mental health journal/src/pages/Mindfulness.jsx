import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./mindfulness.css";
import DropdownSelect from "../components/DropdownSelect";

function Mindfulness() {
  const [activeTab, setActiveTab] = useState("breathing");
  const [breathPhase, setBreathPhase] = useState("ready");
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(5);
  const [timerLeft, setTimerLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const timerRef = useRef(null);
  const breathRef = useRef(null);

  const tabs = [
    { key: "breathing",  label: "Breathing",   emoji: "💨" },
    { key: "meditation", label: "Meditation",  emoji: "🧘" },
    { key: "grounding",  label: "Grounding",   emoji: "🌿" },
    { key: "affirmations", label: "Affirmations", emoji: "💫" },
  ];

  const breathingExercises = [
    { id: "478",   name: "4-7-8 Breathing",   desc: "For anxiety and sleep", color: "#4f46e5", phases: [{label:"Inhale",  seconds:4}, {label:"Hold", seconds:7}, {label:"Exhale", seconds:8}] },
    { id: "box",   name: "Box Breathing",      desc: "For stress and focus", color: "#10b981", phases: [{label:"Inhale",  seconds:4}, {label:"Hold", seconds:4}, {label:"Exhale", seconds:4}, {label:"Hold", seconds:4}] },
    { id: "calm",  name: "Calm Breathing",     desc: "For relaxation",       color: "#06b6d4", phases: [{label:"Inhale",  seconds:5}, {label:"Exhale",seconds:5}] },
    { id: "power", name: "Energizing Breath",  desc: "For energy and focus", color: "#f59e0b", phases: [{label:"Inhale",  seconds:4}, {label:"Exhale",seconds:2}] },
  ];

  const [selectedBreath, setSelectedBreath] = useState(breathingExercises[0]);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(0);

  const meditations = [
    { id: 1, title: "Body Scan",          duration: "10 min", desc: "Release tension from head to toe.", emoji: "🧘", color: "#8b5cf6",
      steps: ["Find a comfortable position lying down", "Close your eyes and take 3 deep breaths", "Focus on your feet — notice any sensations", "Slowly move attention up through each body part", "Release any tension you notice with each exhale", "Finish by taking 3 deep breaths and slowly open eyes"] },
    { id: 2, title: "Loving Kindness",    duration: "8 min",  desc: "Cultivate compassion for yourself and others.", emoji: "💝", color: "#ec4899",
      steps: ["Sit comfortably with eyes closed", "Think of someone you love — feel that warmth", "Silently repeat: May you be happy, may you be well", "Extend this to yourself: May I be happy, may I be well", "Extend to neutral people, then difficult people", "Finally extend to all living beings"] },
    { id: 3, title: "Breath Awareness",   duration: "5 min",  desc: "Anchor yourself to the present moment.", emoji: "💨", color: "#4f46e5",
      steps: ["Sit with your back straight", "Close eyes and breathe naturally", "Notice each breath — inhale and exhale", "When mind wanders, gently return to breath", "No judgment — just observe", "Slowly open eyes when ready"] },
    { id: 4, title: "Visualization",      duration: "12 min", desc: "Visit your calm and peaceful inner space.", emoji: "🌅", color: "#f59e0b",
      steps: ["Close eyes and breathe deeply", "Imagine a peaceful place — beach, forest, mountains", "Notice the colors, sounds, smells around you", "Feel the temperature and air on your skin", "Stay here as long as you like", "When ready, gently return and open eyes"] },
    { id: 5, title: "Walking Meditation", duration: "15 min", desc: "Bring mindfulness to every step.", emoji: "🚶", color: "#10b981",
      steps: ["Find a quiet path or space", "Walk slowly — more slowly than normal", "Feel each foot lift, move, and place down", "Notice the ground beneath your feet", "When mind wanders, return to the sensation of walking", "End with standing still and 3 deep breaths"] },
    { id: 6, title: "Sound Meditation",   duration: "7 min",  desc: "Use sound as your anchor to the present.", emoji: "🎵", color: "#06b6d4",
      steps: ["Sit comfortably and close eyes", "Listen to all sounds around you", "Near sounds, far sounds — just notice", "Do not label or judge — just hear", "If mind wanders, return to listening", "Notice how sounds arise and fade"] },
  ];

  const groundingTechniques = [
    { id: 1, title: "5-4-3-2-1 Technique", emoji: "🖐️", color: "#4f46e5",
      steps: [
        { number: 5, sense: "See",   instruction: "Name 5 things you can SEE right now", icon: "👁️" },
        { number: 4, sense: "Touch", instruction: "Name 4 things you can TOUCH or feel",  icon: "✋" },
        { number: 3, sense: "Hear",  instruction: "Name 3 things you can HEAR right now", icon: "👂" },
        { number: 2, sense: "Smell", instruction: "Name 2 things you can SMELL",          icon: "👃" },
        { number: 1, sense: "Taste", instruction: "Name 1 thing you can TASTE",            icon: "👅" },
      ]
    },
    { id: 2, title: "Cold Water Technique", emoji: "💧", color: "#06b6d4",
      steps: [
        { number: 1, sense: "Step 1", instruction: "Go to the sink and turn on cold water", icon: "🚿" },
        { number: 2, sense: "Step 2", instruction: "Place hands under cold water for 30 seconds", icon: "🖐️" },
        { number: 3, sense: "Step 3", instruction: "Focus entirely on the cold sensation", icon: "🧊" },
        { number: 4, sense: "Step 4", instruction: "Take 5 deep breaths while feeling the water", icon: "💨" },
        { number: 5, sense: "Step 5", instruction: "Notice how your mind has shifted to the present", icon: "🧠" },
      ]
    },
    { id: 3, title: "Safe Space Visualization", emoji: "🏡", color: "#10b981",
      steps: [
        { number: 1, sense: "Close eyes", instruction: "Find a comfortable position and close your eyes", icon: "😌" },
        { number: 2, sense: "Imagine",    instruction: "Picture a place where you feel completely safe", icon: "🌅" },
        { number: 3, sense: "Explore",    instruction: "Notice the colors, sounds, and smells there", icon: "👀" },
        { number: 4, sense: "Feel",       instruction: "Feel the safety and warmth of this place", icon: "💛" },
        { number: 5, sense: "Return",     instruction: "When ready, slowly return and open your eyes", icon: "🌟" },
      ]
    },
  ];

  const affirmations = [
    { category: "Self-Worth",    color: "#4f46e5", emoji: "💜", list: ["I am enough exactly as I am", "I deserve love and kindness", "I am worthy of good things", "My feelings are valid", "I matter"] },
    { category: "Strength",      color: "#ef4444", emoji: "❤️", list: ["I have survived every difficult day so far", "I am stronger than I know", "I can handle what comes my way", "Every challenge helps me grow", "I trust my resilience"] },
    { category: "Peace",         color: "#10b981", emoji: "💚", list: ["I choose peace over worry", "I release what I cannot control", "I am safe in this moment", "My breath calms me", "I embrace the present"] },
    { category: "Growth",        color: "#f59e0b", emoji: "💛", list: ["I am constantly growing and evolving", "Mistakes are how I learn", "I am proud of how far I have come", "Every step forward counts", "I trust my journey"] },
    { category: "Relationships", color: "#ec4899", emoji: "🩷", list: ["I attract kind and caring people", "I give and receive love freely", "I set healthy boundaries", "I deserve genuine connection", "I am not alone"] },
  ];

  const timerOptions = [3, 5, 10, 15, 20];

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

  const [expandedMed, setExpandedMed] = useState(null);
  const [expandedGround, setExpandedGround] = useState(null);
  const [currentAffCat, setCurrentAffCat] = useState(0);
  const [currentAff, setCurrentAff] = useState(0);

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
  const phaseColors = { Inhale: "#4f46e5", Hold: "#f59e0b", Exhale: "#10b981" };
  const circleColor = phaseColors[currentPhase?.label] || selectedBreath.color;

  return (
    <div className="mindfulPage">
      <div className="mindfulHeader">
        <h1>🧘 Mindfulness</h1>
        <p>Breathing exercises, guided meditation, grounding techniques, and daily affirmations.</p>
      </div>

      {/* Tabs */}
      <div className="mindfulTabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`mindfulTab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* ── BREATHING ── */}
      {activeTab === "breathing" && (
        <div className="breathingSection">
          {/* Exercise selector */}
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

          {/* Breathing circle */}
          <div className="breathCircleArea">
            <div
              className={`breathCircleOuter ${isBreathing ? "animating" : ""}`}
              style={{ borderColor: `${circleColor}30` }}
            >
              <div
                className={`breathCircleInner ${isBreathing ? `breath-${currentPhase?.label?.toLowerCase()}` : ""}`}
                style={{ background: isBreathing ? circleColor : "#e0e7ff" }}
              >
                {isBreathing ? (
                  <>
                    <p className="breathPhaseText">{currentPhase?.label}</p>
                    <p className="breathPhaseTimer">{phaseTimer}s</p>
                  </>
                ) : (
                  <p className="breathReadyText">Ready</p>
                )}
              </div>
            </div>

            {isBreathing && (
              <p className="breathCycleCount">Cycles: {breathCount}</p>
            )}

            <div className="breathBtns">
              {!isBreathing ? (
                <button
                  className="startBreathBtn"
                  style={{ background: selectedBreath.color }}
                  onClick={startBreathing}
                >
                  ▶ Start {selectedBreath.name}
                </button>
              ) : (
                <button className="stopBreathBtn" onClick={stopBreathing}>
                  ⬛ Stop
                </button>
              )}
            </div>

            {/* Phase guide */}
            <div className="phaseGuide">
              {selectedBreath.phases.map((p, i) => (
                <div
                  key={i}
                  className={`phaseGuideItem ${isBreathing && phaseIndex === i ? "active" : ""}`}
                >
                  <span className="phaseGuideDot"
                    style={{ background: phaseColors[p.label] || selectedBreath.color }} />
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
          {/* Timer */}
          <div className="timerCard">
            <h3>🕐 Meditation Timer</h3>
            {timerRunning && timerLeft !== null ? (
              <div className="timerDisplay">
                <p className="timerCount">{formatTime(timerLeft)}</p>
                <p className="timerMsg">Stay present. Breathe. 🧘</p>
                <button className="stopTimerBtn" onClick={stopTimer}>End Session</button>
              </div>
            ) : timerLeft === 0 ? (
              <div className="timerDone">
                <p>🎉 Session complete! Well done!</p>
                <button className="startTimerBtn" onClick={() => setTimerLeft(null)}>New Session</button>
              </div>
            ) : (
              <div className="timerSetup">
                <p className="timerLabel">Select duration:</p>
                <DropdownSelect
  options={timerOptions.map(t => ({
    value: t,
    label: `${t} min`
  }))}
  value={selectedTimer}
  onChange={setSelectedTimer}
  placeholder="Select duration..."
  multiple={false}
/>
                <button className="startTimerBtn" onClick={startTimer}>
                  ▶ Start {selectedTimer} Min Session
                </button>
              </div>
            )}
          </div>

          {/* Guided meditations */}
          <h3 className="medSectionTitle">Guided Meditation Practices</h3>
          <div className="medsGrid">
            {meditations.map((med) => (
              <div key={med.id} className="medCard"
                style={{ borderTop: `4px solid ${med.color}` }}>
                <div className="medTop">
                  <span className="medEmoji"
                    style={{ background: `${med.color}15` }}>
                    {med.emoji}
                  </span>
                  <div>
                    <h3 className="medTitle">{med.title}</h3>
                    <p className="medDuration">⏱️ {med.duration}</p>
                  </div>
                </div>
                <p className="medDesc">{med.desc}</p>
                <button
                  className="medToggle"
                  style={{ color: med.color }}
                  onClick={() => setExpandedMed(expandedMed === med.id ? null : med.id)}
                >
                  {expandedMed === med.id ? "▲ Hide Steps" : "▼ How to Practice"}
                </button>
                {expandedMed === med.id && (
                  <ol className="medSteps"
                    style={{ borderColor: `${med.color}30`, background: `${med.color}06` }}>
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
            <p>
              Grounding techniques help you return to the present moment when feeling
              anxious, overwhelmed, or disconnected. Use these when you need to feel
              centered and safe right now.
            </p>
          </div>
          {groundingTechniques.map((tech) => (
            <div key={tech.id} className="groundCard">
              <div className="groundHeader"
                style={{ background: `${tech.color}10`, borderBottom: `2px solid ${tech.color}20` }}>
                <span className="groundEmoji">{tech.emoji}</span>
                <h3 className="groundTitle" style={{ color: tech.color }}>{tech.title}</h3>
                <button
                  className="groundToggle"
                  style={{ background: tech.color, color: "white" }}
                  onClick={() => setExpandedGround(expandedGround === tech.id ? null : tech.id)}
                >
                  {expandedGround === tech.id ? "Hide" : "Start"}
                </button>
              </div>
              {expandedGround === tech.id && (
                <div className="groundSteps">
                  {tech.steps.map((step, i) => (
                    <div key={i} className="groundStep">
                      <div className="groundStepIcon"
                        style={{ background: `${tech.color}15`, color: tech.color }}>
                        {step.icon}
                      </div>
                      <div className="groundStepBody">
                        <p className="groundStepNum"
                          style={{ color: tech.color }}>
                          Step {step.number} — {step.sense}
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
          {/* Category selector */}
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

          {/* Main affirmation card */}
          <div className="affCard"
            style={{ borderColor: affirmations[currentAffCat].color }}>
            <p className="affCategory"
              style={{ color: affirmations[currentAffCat].color }}>
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
              Next Affirmation →
            </button>
          </div>

          {/* All affirmations list */}
          <div className="affAllTitle">All {affirmations[currentAffCat].category} Affirmations</div>
          <div className="affList">
            {affirmations[currentAffCat].list.map((aff, i) => (
              <div
                key={i}
                className={`affItem ${i === currentAff ? "active" : ""}`}
                style={{ borderColor: i === currentAff ? affirmations[currentAffCat].color : "#f3f4f6" }}
                onClick={() => setCurrentAff(i)}
              >
                <span className="affItemNum"
                  style={{ color: affirmations[currentAffCat].color }}>
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
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Mindfulness;
