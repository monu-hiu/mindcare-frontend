import { Link } from "react-router-dom";
import "./support.css";

function SupportPage() {
  const helplines = [
    { name: "iCall (TISS Mumbai)", number: "9152987821", desc: "Mon–Sat, 8am–10pm", type: "call", color: "#4f46e5" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", desc: "24/7 Free Helpline", type: "call", color: "#ef4444" },
    { name: "AASRA", number: "9820466627", desc: "24/7 Suicide Prevention", type: "call", color: "#10b981" },
    { name: "Snehi", number: "044-24640050", desc: "Mon–Sat, 8am–10pm", type: "call", color: "#f59e0b" },
    { name: "Fortis Stress Helpline", number: "8376804102", desc: "24/7 Mental Health", type: "call", color: "#06b6d4" },
    { name: "Parivarthan Counselling", number: "7676602602", desc: "Mon–Fri, 8am–10pm", type: "call", color: "#8b5cf6" },
  ];

  const onlineResources = [
    { name: "iCall Online Counselling", desc: "Book sessions with qualified therapists online.", link: "https://icallhelpline.org", color: "#4f46e5", emoji: "💻" },
    { name: "Wysa — AI Mental Health", desc: "Anonymous 24/7 emotional support chatbot.", link: "https://www.wysa.io", color: "#06b6d4", emoji: "🤖" },
    { name: "YourDOST", desc: "Online counselling platform with verified Indian therapists.", link: "https://yourdost.com", color: "#10b981", emoji: "🧑‍⚕️" },
    { name: "Vandrevala Foundation", desc: "Free online and phone counselling 24/7.", link: "https://www.vandrevalafoundation.com", color: "#ef4444", emoji: "🆘" },
    { name: "NIMHANS", desc: "National Institute of Mental Health and Neurosciences.", link: "https://nimhans.ac.in", color: "#f59e0b", emoji: "🏥" },
    { name: "Manastha", desc: "Mental health awareness and resources for Indians.", link: "https://manastha.com", color: "#8b5cf6", emoji: "🧘" },
  ];

  const selfHelpTools = [
    { emoji: "😊", title: "Track Your Mood", desc: "Log your mood daily to understand patterns.", link: "/mood-tracker", color: "#4f46e5" },
    { emoji: "🤖", title: "Talk to MindCare AI", desc: "Our AI companion is available 24/7.", link: "/chatbot", color: "#06b6d4" },
    { emoji: "💭", title: "Anxiety Tracker", desc: "Track triggers and use breathing exercises.", link: "/anxiety-tracker", color: "#8b5cf6" },
    { emoji: "📓", title: "Journal Your Thoughts", desc: "Express and process your feelings.", link: "/reflection", color: "#ec4899" },
    { emoji: "🧘", title: "Mindfulness Exercises", desc: "Guided breathing and relaxation.", link: "/mindfulness", color: "#10b981" },
    { emoji: "💙", title: "Crisis Support", desc: "If you are in crisis — help is here.", link: "/self-harm-support", color: "#ef4444" },
  ];

  return (
    <div className="supportPage">
      {/* Hero */}
      <div className="supportHero">
        <p className="supportBadge">💙 You are not alone</p>
        <h1>Support Center</h1>
        <p className="supportSubtitle">
          Whatever you are going through, help is available.
          Reach out — it is a sign of strength, not weakness.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="emergencyBanner">
        <div className="emergencyLeft">
          <p className="emergencyTitle">🆘 In immediate crisis?</p>
          <p className="emergencyDesc">
            Call <strong>iCall: 9152987821</strong> or
            <strong> Vandrevala: 1860-2662-345</strong> — both free and confidential.
          </p>
        </div>
        <a href="tel:9152987821" className="emergencyBtn">
          📞 Call Now
        </a>
      </div>

      {/* Helplines */}
      <div className="supportSection">
        <h2>📞 Mental Health Helplines — India</h2>
        <p className="sectionDesc">All helplines are free and confidential</p>
        <div className="helplineGrid">
          {helplines.map((h, i) => (
            <a
              key={i}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="helplineCard"
              style={{ borderLeft: `4px solid ${h.color}` }}
            >
              <div className="helplineInfo">
                <p className="helplineName">{h.name}</p>
                <p className="helplineDesc">{h.desc}</p>
              </div>
              <div className="helplineRight">
                <p className="helplineNum" style={{ color: h.color }}>
                  {h.number}
                </p>
                <span className="callBadge" style={{ background: `${h.color}15`, color: h.color }}>
                  📞 Tap to Call
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Online Resources */}
      <div className="supportSection">
        <h2>🌐 Online Resources & Counselling</h2>
        <p className="sectionDesc">Professional help available online</p>
        <div className="resourceGrid">
          {onlineResources.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              className="onlineCard"
              style={{ borderTop: `3px solid ${r.color}` }}
            >
              <span className="onlineEmoji"
                style={{ background: `${r.color}15` }}>
                {r.emoji}
              </span>
              <h3 className="onlineName">{r.name}</h3>
              <p className="onlineDesc">{r.desc}</p>
              <span className="onlineLink" style={{ color: r.color }}>
                Visit →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* MindCare Tools */}
      <div className="supportSection">
        <h2>🛠️ MindCare Self-Help Tools</h2>
        <p className="sectionDesc">Built-in tools to support your mental wellness</p>
        <div className="toolsGrid">
          {selfHelpTools.map((t, i) => (
            <Link key={i} to={t.link} className="toolCard">
              <span className="toolEmoji"
                style={{ background: `${t.color}15` }}>
                {t.emoji}
              </span>
              <h3 className="toolName">{t.name}</h3>
              <p className="toolDesc">{t.desc}</p>
              <span className="toolLink" style={{ color: t.color }}>
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="supportMessage">
        <p className="supportMessageTitle">💙 Remember</p>
        <p className="supportMessageText">
          Asking for help is one of the bravest things you can do.
          Mental health is just as important as physical health.
          You deserve care, support, and healing — no matter what you are going through.
        </p>
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default SupportPage;