import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const features = [
    { icon: "📓", title: "Daily Journal", desc: "Reflect, vent, grow — all in one safe space." },
    { icon: "📊", title: "Mood Tracking", desc: "Visualize emotional patterns over time." },
    { icon: "🤖", title: "AI Chatbot", desc: "Always-available support, no judgment." },
    { icon: "🧘", title: "Mindfulness", desc: "Guided breathing, grounding & body scans." },
    { icon: "🎯", title: "Goal Setting", desc: "Small steps toward meaningful change." },
    { icon: "💤", title: "Sleep Tracker", desc: "Rest better, feel better, live better." },
  ];

  const stats = [
    
    { val: "24", label: "Wellness Tools" },
    { val: "100%", label: "Private & Safe" },
    { val: "Free", label: "Always" },
  ];

  return (
    <div className="homePage">

      {/* HERO */}
      <section className="hero">
        <div className="heroGlow" />
        <div className="heroContent">
          <div className="heroBadge">🌱 Your Mental Wellness Companion</div>
          <h1 className="heroTitle">
            Your mind deserves<br />
            <span className="heroAccent">care, not silence.</span>
          </h1>
          <p className="heroDesc">
            MindCare is a private, judgment-free space to journal your thoughts,
            track your emotions, and grow — one day at a time.
          </p>
          <div className="heroButtons">
            <Link to="/signup">
              <button className="btnPrimary">Start for Free →</button>
            </Link>
            <Link to="/dashboard">
              <button className="btnGhost">Explore Dashboard</button>
            </Link>
          </div>
          <div className="heroStats">
            {stats.map((s, i) => (
              <div key={i} className="heroStat">
                <span className="heroStatVal">{s.val}</span>
                <span className="heroStatLabel">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="heroVisual">
          <div className="floatingCard fc1">
            <span>😊</span>
            <div>
              <p className="fcTitle">Mood logged</p>
              <p className="fcSub">Feeling good today</p>
            </div>
          </div>
          <div className="floatingCard fc2">
            <span>🌙</span>
            <div>
              <p className="fcTitle">Sleep: 7.5 hrs</p>
              <p className="fcSub">Well rested</p>
            </div>
          </div>
          <div className="floatingCard fc3">
            <span>🎯</span>
            <div>
              <p className="fcTitle">Goal achieved!</p>
              <p className="fcSub">10 min meditation</p>
            </div>
          </div>
          <div className="heroPhone">
            <div className="phoneScreen">
              <div className="phoneHeader">
                <span className="phoneLogo">🧠 MindCare</span>
                <span className="phoneDate">Today</span>
              </div>
              <div className="phoneMoodRow">
                {["😄","🙂","😐","😔","😡"].map((e,i) => (
                  <span key={i} className={`phoneMood ${i===1?"active":""}`}>{e}</span>
                ))}
              </div>
              <div className="phoneJournal">
                <p className="phoneJournalLabel">Today's reflection</p>
                <p className="phoneJournalText">I felt calmer after my morning walk. Need to remember to breathe more...</p>
              </div>
              <div className="phoneStreak">
                <span>🔥 7-day streak</span>
                <span className="streakBadge">Keep going!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="featuresSection">
        <div className="sectionInner">
          <div className="sectionLabel">Everything you need</div>
          <h2 className="sectionTitle">Tools built for your wellbeing</h2>
          <p className="sectionDesc">Every feature is designed with empathy, privacy, and simplicity in mind.</p>
          <div className="featuresGrid">
            {features.map((f, i) => (
              <div key={i} className="featureCard">
                <div className="featureIcon">{f.icon}</div>
                <h3 className="featureTitle">{f.title}</h3>
                <p className="featureDesc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="howSection">
        <div className="sectionInner">
          <div className="sectionLabel">Simple & calming</div>
          <h2 className="sectionTitle">Start in 3 easy steps</h2>
          <div className="stepsRow">
            <div className="step">
              <div className="stepNum">01</div>
              <h3>Create your free account</h3>
              <p>Sign up in seconds — no credit card, no subscriptions, ever.</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="step">
              <div className="stepNum">02</div>
              <h3>Check in daily</h3>
              <p>Log your mood, write a journal entry, or track your sleep in under 2 minutes.</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="step">
              <div className="stepNum">03</div>
              <h3>Grow over time</h3>
              <p>See your patterns, celebrate wins, and get AI support whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="ctaSection">
        <div className="ctaInner">
          <h2>Your mental health journey starts today.</h2>
          <p>Free forever. Private always. No judgment.</p>
          <Link to="/signup">
            <button className="btnPrimary btnLarge">Create Free Account →</button>
          </Link>
          <p className="ctaNote">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </section>

    </div>
  );
}

export default Home;