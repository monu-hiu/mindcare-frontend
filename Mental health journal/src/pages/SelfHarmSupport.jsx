import { Link } from "react-router-dom";
import "./selfharm.css";

function SelfHarmSupport() {
  const helplines = [
    { name: "iCall (TISS)", number: "9152987821", desc: "Mon-Sat, 8am-10pm", color: "#4f46e5" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", desc: "24/7 Free Helpline", color: "#ef4444" },
    { name: "AASRA", number: "9820466627", desc: "24/7 Suicide Prevention", color: "#10b981" },
    { name: "Snehi", number: "044-24640050", desc: "Mon-Sat, 8am-10pm", color: "#f59e0b" },
    { name: "iCall WhatsApp", number: "9152987821", desc: "WhatsApp Support", color: "#22c55e" },
  ];

  const copingStrategies = [
    { emoji: "🧊", title: "Hold ice cubes", desc: "The intense cold sensation can redirect your focus from emotional pain." },
    { emoji: "💨", title: "Deep breathing", desc: "Slow 4-7-8 breathing activates your calming nervous system." },
    { emoji: "🏃", title: "Move your body", desc: "A brisk walk, jumping jacks, or any movement releases tension." },
    { emoji: "📝", title: "Write it out", desc: "Write everything you are feeling — you do not have to share it." },
    { emoji: "🎵", title: "Music", desc: "Put on music that matches or shifts your mood." },
    { emoji: "🤗", title: "Call someone", desc: "Reach out to one trusted person — you do not need to explain everything." },
  ];

  return (
    <div className="selfharmPage">
      <div className="selfharmHeader">
        <div className="urgentBadge">💙 You are not alone</div>
        <h1>Crisis Support</h1>
        <p>
          If you are having thoughts of self-harm or suicide, please reach out immediately.
          Help is available right now.
        </p>
      </div>

      {/* Emergency Helplines */}
      <div className="helplineSection">
        <h2>📞 Call or Text Now</h2>
        <p className="helplineSubtitle">All helplines are free and confidential</p>
        <div className="helplineGrid">
          {helplines.map((h, i) => (
            <a key={i} href={`tel:${h.number.replace(/-/g, "")}`}
              className="helplineCard"
              style={{ borderColor: h.color }}>
              <div className="helplineTop">
                <p className="helplineName">{h.name}</p>
                <span className="helplineBadge"
                  style={{ background: `${h.color}15`, color: h.color }}>
                  {h.desc}
                </span>
              </div>
              <p className="helplineNumber" style={{ color: h.color }}>
                📞 {h.number}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Immediate Coping */}
      <div className="copingSection">
        <h2>🛟 If You Are Struggling Right Now</h2>
        <p className="copingSubtitle">
          Try one of these immediately while you wait for help or decide to call.
        </p>
        <div className="copingGrid">
          {copingStrategies.map((s, i) => (
            <div key={i} className="copingCard">
              <span className="copingEmoji">{s.emoji}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="messageCard">
        <p className="messageTitle">💙 A message for you</p>
        <p className="messageText">
          What you are feeling right now is real and it is painful. But this moment will pass.
          You have survived every difficult moment before this — and you can survive this one too.
          Please reach out to someone who can help. You deserve care and support.
        </p>
      </div>

      <div className="navButtons">
        <Link to="/support">
          <button className="supportBtn">View All Support Resources</button>
        </Link>
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default SelfHarmSupport;