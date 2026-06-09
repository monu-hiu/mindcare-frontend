import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const features = [
    { icon: "😰", title: "Anxiety Tracker", desc: "Daily check-ins to understand your triggers and patterns." },
    { icon: "😊", title: "Mood Tracker", desc: "Log your emotions and see patterns over time." },
    { icon: "🤖", title: "AI Chatbot", desc: "Talk to someone at 2 AM — no judgment, always available." },
    { icon: "🧘", title: "Breathing Exercises", desc: "4-7-8 and box breathing for instant calm." },
    { icon: "🎯", title: "Goal Planner", desc: "Small daily steps toward meaningful change." },
    { icon: "💤", title: "Sleep Tracker", desc: "Track sleep quality and improve your rest." },
    { icon: "📓", title: "Gratitude Journal", desc: "Shift your mindset with daily gratitude logs." },
    { icon: "📈", title: "Progress Tracker", desc: "See how far you've come — week by week." },
  ];

  const stats = [
    { val: "42+", label: "Active Users" },
    { val: "24",  label: "Wellness Tools" },
    { val: "100%", label: "Free Forever" },
    { val: "0",   label: "Ads. Ever." },
  ];

  const testimonials = [
    { text: "Finally an app that understands Indian mental health struggles. The breathing exercises helped me through exam stress.", name: "Priya, Student", emoji: "🎓" },
    { text: "I use the anxiety tracker every day. I can now see what triggers my anxiety — game changer!", name: "Rahul, Software Engineer", emoji: "💻" },
    
  ];

  return (
    <div className="homePage">

      {/* ── TOP ANNOUNCEMENT BANNER ── */}
      <div className="announcementBar">
        🎉 MindCare is now live — Join 42+ Users already tracking their wellness!
        <Link to="/signup" className="announceBannerLink">Sign up free →</Link>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="heroGlow" />
        <div className="heroContent">

          <div className="heroBadge">🇮🇳 Built for Everyone — Free Forever</div>

          <h1 className="heroTitle">
            Your mental health<br />
            <span className="heroAccent">deserves free care.</span>
          </h1>

          <p className="heroDesc">
            Track anxiety, mood and sleep daily. Breathing exercises, AI chatbot,
            gratitude journal — everything you need for mental wellness.
            <strong> 100% free. No ads. Built in India.</strong>
          </p>

          {/* Trust signals */}
          <div className="trustRow">
            <span>✅ No credit card</span>
            <span>✅ No subscription</span>
            <span>✅ Hindi + English</span>
            <span>✅ Private & secure</span>
          </div>

          <div className="heroButtons">
            <Link to="/signup">
              <button className="btnPrimary btnLarge">
                🚀 Start Free — Takes 30 Seconds
              </button>
            </Link>
            <Link to="/blog">
              <button className="btnGhost">Read Our Blog</button>
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

        {/* Phone mockup */}
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
                <p className="phoneJournalLabel">Anxiety Level Today</p>
                <p className="phoneJournalText">Feeling a bit stressed about work. Used box breathing — feeling 60% better now.</p>
              </div>
              <div className="phoneStreak">
                <span>🔥 7-day streak</span>
                <span className="streakBadge">Keep going!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="problemSection">
        <div className="sectionInner">
          <div className="problemGrid">
            <div className="problemCard red">
              <span className="problemEmoji">😔</span>
              <p className="problemStat">190M+</p>
              <p className="problemLabel">People struggle with mental health</p>
            </div>
            <div className="problemCard orange">
              <span className="problemEmoji">💸</span>
              <p className="problemStat">₹2,000+</p>
              <p className="problemLabel">Cost per therapy session</p>
            </div>
            
            <div className="problemCard green">
              <span className="problemEmoji">🧠</span>
              <p className="problemStat">₹0</p>
              <p className="problemLabel">Cost to use MindCare — forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="featuresSection">
        <div className="sectionInner">
          <div className="sectionLabel">Everything you need</div>
          <h2 className="sectionTitle">24 tools for your mental wellness</h2>
          <p className="sectionDesc">Every feature built with empathy, privacy and simplicity — for Indian users.</p>
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

      {/* ── HOW IT WORKS ── */}
      <section className="howSection">
        <div className="sectionInner">
          <div className="sectionLabel">Simple & calming</div>
          <h2 className="sectionTitle">Start in 3 easy steps</h2>
          <div className="stepsRow">
            <div className="step">
              <div className="stepNum">01</div>
              <h3>Create free account</h3>
              <p>Sign up in 30 seconds — no credit card, no subscription, ever.</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="step">
              <div className="stepNum">02</div>
              <h3>Track daily</h3>
              <p>Log anxiety, mood, sleep in under 2 minutes. See patterns instantly.</p>
            </div>
            <div className="stepArrow">→</div>
            <div className="step">
              <div className="stepNum">03</div>
              <h3>Feel better</h3>
              <p>Breathing exercises, AI support, and insights that actually help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonialsSection">
        <div className="sectionInner">
          <div className="sectionLabel">What users say</div>
          <h2 className="sectionTitle">Real people. Real results.</h2>
          <div className="testimonialsGrid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonialCard">
                <p className="testimonialText">"{t.text}"</p>
                <div className="testimonialAuthor">
                  <span className="testimonialEmoji">{t.emoji}</span>
                  <span className="testimonialName">— {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="ctaSection">
        <div className="ctaInner">
          <div className="ctaBadge">🇮🇳 Made in India for Everyone</div>
          <h2>Your mental health journey starts today.</h2>
          <p>Free forever. Private always. No judgment. No ads.</p>

          <div className="ctaTrustRow">
            <span>✅ 42+ active users</span>
            <span>✅ Hindi + English</span>
            <span>✅ No credit card</span>
          </div>

          <Link to="/signup">
            <button className="btnPrimary btnLarge ctaMainBtn">
              🚀 Create Free Account — 30 seconds
            </button>
          </Link>

          <p className="ctaNote">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;