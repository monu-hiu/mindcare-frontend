import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./selfcongrats.css";
import DropdownSelect from "../components/DropdownSelect";
function SelfCongrats() {
  const [congrats, setCongrats] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Achievement");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { label: "Achievement", emoji: "🏆" },
    { label: "Courage", emoji: "💪" },
    { label: "Growth", emoji: "🌱" },
    { label: "Kindness", emoji: "💝" },
    { label: "Resilience", emoji: "🔥" },
    { label: "Small Win", emoji: "⭐" },
  ];

  const prompts = [
    "Today I am proud of myself for...",
    "I showed courage when I...",
    "I grew as a person by...",
    "I was kind to myself when...",
    "Despite challenges, I managed to...",
    "One small win I had today...",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("mindcare_self_congrats");
    if (saved) setCongrats(JSON.parse(saved));
  }, []);

  const saveCongrat = () => {
    if (!text.trim()) {
      setError("Please write something to celebrate!");
      return;
    }

    const newCongrat = {
      id: Date.now(),
      text: text.trim(),
      category,
      emoji: categories.find((c) => c.label === category)?.emoji || "⭐",
      createdAt: new Date().toISOString(),
    };

    const updated = [newCongrat, ...congrats];
    setCongrats(updated);
    localStorage.setItem("mindcare_self_congrats", JSON.stringify(updated));
    setText("");
    setSaved(true);
    setError("");
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteCongrat = (id) => {
    const updated = congrats.filter((c) => c.id !== id);
    setCongrats(updated);
    localStorage.setItem("mindcare_self_congrats", JSON.stringify(updated));
  };

  const categoryColors = {
    Achievement: "#f59e0b",
    Courage: "#ef4444",
    Growth: "#22c55e",
    Kindness: "#ec4899",
    Resilience: "#f97316",
    "Small Win": "#4f46e5",
  };

  return (
    <div className="selfcongratPage">
      <div className="selfcongratHeader">
        <h1>🌟 Self Congratulations</h1>
        <p>Celebrate your wins — big and small. You deserve recognition!</p>
      </div>

      {/* Prompts */}
      <div className="promptsSection">
        <p className="promptsTitle">Need inspiration? Click a prompt:</p>
        <div className="promptsGrid">
          {prompts.map((p, i) => (
            <button
              key={i}
              className="promptBtn"
              onClick={() => setText(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="selfcongratForm">
        <h2>What are you celebrating today?</h2>

        <div className="categorySelect">
  <DropdownSelect
    options={categories.map(cat => ({
      value: cat.label,
      label: cat.label,
      emoji: cat.emoji
    }))}
    value={category}
    onChange={setCategory}
    placeholder="Select category..."
    multiple={false}
  />
</div>

        <textarea
          className="congratTextarea"
          placeholder="Write what you are proud of..."
          value={text}
          onChange={(e) => { setText(e.target.value); setError(""); }}
          rows={4}
          maxLength={300}
        />

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">🎉 Celebrated! Keep going!</p>}

        <button onClick={saveCongrat} className="saveBtn">
          🎉 Celebrate This!
        </button>
      </div>

      {/* History */}
      <div className="congratsHistory">
        <h2>Your Celebrations ({congrats.length})</h2>
        {congrats.length === 0 ? (
          <p className="emptyText">
            No celebrations yet. You have more wins than you realize!
          </p>
        ) : (
          <div className="congratsList">
            {congrats.map((c) => (
              <div
                key={c.id}
                className="congratCard"
                style={{ borderLeft: `4px solid ${categoryColors[c.category]}` }}
              >
                <div className="congratCardHeader">
                  <div className="congratMeta">
                    <span className="congratEmoji">{c.emoji}</span>
                    <span
                      className="congratCategory"
                      style={{
                        color: categoryColors[c.category],
                        background: `${categoryColors[c.category]}15`,
                      }}
                    >
                      {c.category}
                    </span>
                    <span className="congratDate">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteCongrat(c.id)}
                  >
                    🗑️
                  </button>
                </div>
                <p className="congratText">{c.text}</p>
              </div>
            ))}
          </div>
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

export default SelfCongrats;