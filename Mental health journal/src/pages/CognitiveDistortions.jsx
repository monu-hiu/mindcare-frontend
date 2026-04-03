import { useState } from "react";
import { Link } from "react-router-dom";
import "./cognitive.css";

function CognitiveDistortions() {
  const [selectedDistortion, setSelectedDistortion] = useState(null);
  const [journal, setJournal] = useState("");
  const [reframe, setReframe] = useState("");
  const [saved, setSaved] = useState(false);

  const distortions = [
    {
      id: 1,
      name: "All-or-Nothing Thinking",
      emoji: "⚫",
      color: "#6366f1",
      description: "Seeing things in black and white with no middle ground.",
      example: "If I am not perfect, I am a complete failure.",
      reframeTip: "Look for the gray areas. Most situations have a spectrum of outcomes.",
    },
    {
      id: 2,
      name: "Overgeneralization",
      emoji: "🌐",
      color: "#ef4444",
      description: "Drawing broad conclusions from a single event.",
      example: "I failed this test, so I always fail at everything.",
      reframeTip: "Ask yourself: Is this really ALWAYS true? What evidence contradicts this?",
    },
    {
      id: 3,
      name: "Mental Filter",
      emoji: "🔍",
      color: "#f59e0b",
      description: "Focusing only on negatives while ignoring positives.",
      example: "My presentation had one mistake, so it was terrible.",
      reframeTip: "Actively list positives. Balance the negative with what went well.",
    },
    {
      id: 4,
      name: "Jumping to Conclusions",
      emoji: "🦘",
      color: "#10b981",
      description: "Making negative assumptions without evidence.",
      example: "They did not reply — they must hate me.",
      reframeTip: "Ask: What other explanations exist? What facts do I actually have?",
    },
    {
      id: 5,
      name: "Catastrophizing",
      emoji: "💥",
      color: "#ec4899",
      description: "Blowing things out of proportion.",
      example: "I made a mistake at work — I will definitely get fired.",
      reframeTip: "Ask: What is the most realistic outcome? Will this matter in a year?",
    },
    {
      id: 6,
      name: "Emotional Reasoning",
      emoji: "❤️",
      color: "#8b5cf6",
      description: "Believing something is true because it feels true.",
      example: "I feel stupid, therefore I must be stupid.",
      reframeTip: "Feelings are not facts. What does the evidence actually show?",
    },
    {
      id: 7,
      name: "Should Statements",
      emoji: "📋",
      color: "#06b6d4",
      description: "Setting rigid rules for yourself and others.",
      example: "I should always be productive. I must never make mistakes.",
      reframeTip: "Replace should with prefer or would like. Be flexible with yourself.",
    },
    {
      id: 8,
      name: "Personalization",
      emoji: "🎯",
      color: "#f97316",
      description: "Blaming yourself for things outside your control.",
      example: "My friend is upset — it must be something I did.",
      reframeTip: "Consider other factors. You are not responsible for everything.",
    },
    {
      id: 9,
      name: "Mind Reading",
      emoji: "🔮",
      color: "#14b8a6",
      description: "Assuming you know what others are thinking.",
      example: "Everyone in the room thinks I am boring.",
      reframeTip: "You cannot read minds. Ask directly or consider other possibilities.",
    },
    {
      id: 10,
      name: "Fortune Telling",
      emoji: "🌙",
      color: "#64748b",
      description: "Predicting negative outcomes as certain facts.",
      example: "I know this interview will go badly.",
      reframeTip: "The future is uncertain. Preparation beats prediction every time.",
    },
  ];

  const handleSave = () => {
    if (!journal.trim() || !reframe.trim()) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setJournal("");
      setReframe("");
      setSelectedDistortion(null);
    }, 2000);
  };

  return (
    <div className="cognitivePage">
      <div className="cognitiveHeader">
        <h1>🧩 Cognitive Distortions</h1>
        <p>
          Identify negative thought patterns and learn to reframe them
          into healthier perspectives.
        </p>
      </div>

      {/* Distortions Grid */}
      <div className="distortionsGrid">
        {distortions.map((d) => (
          <div
            key={d.id}
            className={`distortionCard ${selectedDistortion?.id === d.id ? "selected" : ""}`}
            style={{ borderColor: selectedDistortion?.id === d.id ? d.color : "#f3f4f6" }}
            onClick={() => setSelectedDistortion(
              selectedDistortion?.id === d.id ? null : d
            )}
          >
            <div className="distortionTop">
              <span className="distortionEmoji"
                style={{ background: `${d.color}15` }}>
                {d.emoji}
              </span>
              <h3 className="distortionName" style={{ color: d.color }}>
                {d.name}
              </h3>
            </div>
            <p className="distortionDesc">{d.description}</p>

            {selectedDistortion?.id === d.id && (
              <div className="distortionDetail">
                <div className="distortionExample">
                  <p className="exampleLabel">Example thought:</p>
                  <p className="exampleText">"{d.example}"</p>
                </div>
                <div className="distortionReframe">
                  <p className="reframeLabel">💡 How to reframe:</p>
                  <p className="reframeText">{d.reframeTip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Journal Section */}
      {selectedDistortion && (
        <div className="cognitiveJournal">
          <h2>Practice Reframing — {selectedDistortion.name}</h2>

          <div className="formGroup">
            <label>Your negative thought:</label>
            <textarea
              placeholder="Write the thought you want to reframe..."
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              rows={3}
            />
          </div>

          <div className="formGroup">
            <label>Reframed thought:</label>
            <textarea
              placeholder={`Try: ${selectedDistortion.reframeTip}`}
              value={reframe}
              onChange={(e) => setReframe(e.target.value)}
              rows={3}
            />
          </div>

          {saved ? (
            <p className="successText">✅ Great work on reframing!</p>
          ) : (
            <button
              onClick={handleSave}
              disabled={!journal.trim() || !reframe.trim()}
              className="saveBtn"
              style={{ background: selectedDistortion.color }}
            >
              Save Reframe
            </button>
          )}
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

export default CognitiveDistortions;