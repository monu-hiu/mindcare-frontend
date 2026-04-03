import { useState } from "react";
import { Link } from "react-router-dom";
import "./selfcare.css";

function SelfCare() {
  const [completed, setCompleted] = useState([]);

  const selfCareCategories = [
    {
      title: "Physical Care",
      icon: "💪",
      color: "#22c55e",
      items: [
        "Drink 8 glasses of water today",
        "Take a 20-minute walk outside",
        "Do 10 minutes of stretching",
        "Eat a nutritious meal",
        "Get 7-8 hours of sleep tonight",
        "Take a warm relaxing shower",
      ],
    },
    {
      title: "Mental Care",
      icon: "🧠",
      color: "#4f46e5",
      items: [
        "Write in your journal for 10 minutes",
        "Practice 5 minutes of meditation",
        "Read something you enjoy",
        "Take a break from social media",
        "Do a digital detox for 1 hour",
        "Learn something new today",
      ],
    },
    {
      title: "Emotional Care",
      icon: "💙",
      color: "#ec4899",
      items: [
        "Call or text a friend you miss",
        "Write down 3 things you are grateful for",
        "Do something that makes you laugh",
        "Watch your favorite movie or show",
        "Say one kind thing to yourself",
        "Forgive yourself for one mistake",
      ],
    },
    {
      title: "Creative Care",
      icon: "🎨",
      color: "#f59e0b",
      items: [
        "Draw, paint, or doodle something",
        "Listen to music that uplifts you",
        "Cook or bake something you love",
        "Rearrange or organize a small space",
        "Write a short poem or story",
        "Take photos of beautiful things around you",
      ],
    },
  ];

  const toggleItem = (item) => {
    setCompleted((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const totalItems = selfCareCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedCount = completed.length;
  const percentage = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="selfcarePage">
      <div className="selfcareHeader">
        <h1>💆 Self Care</h1>
        <p>Take care of yourself — you deserve it.</p>
      </div>

      {/* Progress */}
      <div className="selfcareProgress">
        <div className="progressInfo">
          <span>{completedCount} of {totalItems} completed</span>
          <span>{percentage}%</span>
        </div>
        <div className="progressBar">
          <div className="progressFill" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      {/* Categories */}
      {selfCareCategories.map((cat) => (
        <div key={cat.title} className="selfcareCategory">
          <div className="categoryHeader">
            <span className="categoryIcon"
              style={{ background: `${cat.color}15`, color: cat.color }}>
              {cat.icon}
            </span>
            <h2 style={{ color: cat.color }}>{cat.title}</h2>
            <span className="categoryCount">
              {cat.items.filter(i => completed.includes(i)).length}/{cat.items.length}
            </span>
          </div>
          <div className="selfcareItems">
            {cat.items.map((item) => (
              <div
                key={item}
                className={`selfcareItem ${completed.includes(item) ? "done" : ""}`}
                onClick={() => toggleItem(item)}
              >
                <div
                  className={`checkCircle ${completed.includes(item) ? "checked" : ""}`}
                  style={{ borderColor: completed.includes(item) ? cat.color : "#d1d5db",
                           background: completed.includes(item) ? cat.color : "white" }}
                >
                  {completed.includes(item) && "✓"}
                </div>
                <p className={completed.includes(item) ? "itemDone" : ""}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {completedCount === totalItems && (
        <div className="allDoneMsg">
          🎉 Amazing! You completed all self-care activities today!
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

export default SelfCare;