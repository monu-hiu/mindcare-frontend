import { useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

// ══════════════════════════════════════════
// ADD YOUR BLOG POSTS HERE
// Copy paste karo ek post ka format
// ══════════════════════════════════════════
export const blogPosts = [
  {
    slug: "anxiety-kya-hota-hai",
    title: "Anxiety Kya Hota Hai — Complete Hindi Guide",
    desc: "Anxiety ke symptoms, causes aur solutions — sab kuch simple language mein samjhein. Aap akele nahi hain.",
    date: "June 10, 2025",
    readTime: "5 min",
    tag: "Anxiety",
    emoji: "😰",
    content: `
## Anxiety Kya Hota Hai?

Anxiety ek aisi feeling hai jisme aap bina kisi khaas wajah ke darr, ghabrahat ya bechain feel karte hain. Yeh ek normal human emotion hai — lekin jab yeh zyada ho jaaye toh problem ban jaati hai.

## Anxiety Ke Symptoms

Anxiety ke common symptoms yeh hain:

- **Dil ki dharkan tez hona** — Heart racing without reason
- **Haath kaampna** — Trembling hands
- **Neend na aana** — Difficulty sleeping
- **Zyada sochna** — Overthinking everything
- **Pet mein dard** — Stomach problems
- **Thakaan** — Constant fatigue

## Anxiety Kyun Hoti Hai?

Anxiety ke main causes:

1. **Exam pressure** — Students mein bahut common
2. **Kaam ka tanaav** — Work stress
3. **Rishton ki takleef** — Relationship problems
4. **Paison ki chinta** — Financial stress
5. **Social situations** — Log kya sochenge

## Anxiety Ko Kaise Manage Karein?

### 1. Breathing Exercise
4-7-8 technique try karo:
- 4 second saans lo
- 7 second rokho
- 8 second mein chodo

### 2. Daily Tracking
Apni anxiety ko track karo — MindCare app mein anxiety tracker free mein available hai.

### 3. Exercise
Rozana 20-30 minute walk anxiety ko 40% tak kam kar sakti hai.

### 4. Sleep
7-8 ghante ki neend anxiety ke liye zaruri hai.

## Kab Doctor Ke Paas Jaayein?

Agar anxiety aapki daily life affect kar rahi hai — kaam, padhai ya rishte — toh ek professional se milna zaroori hai.

## Conclusion

Anxiety normal hai. Aap akele nahi hain. MindCare app se apni anxiety daily track karo aur patterns samjho.

[Anxiety Tracker Try Karo →](/anxiety-tracker)
    `
  },
  {
    slug: "free-mental-health-app-india-2025",
    title: "Best Free Mental Health App India 2025 — Complete Guide",
    desc: "India mein free mental health apps kaunse hain? MindCare kyun sabse better hai? Honest comparison.",
    date: "June 12, 2025",
    readTime: "4 min",
    tag: "Apps",
    emoji: "📱",
    content: `
## Free Mental Health Apps India 2025

India mein mental health apps ki demand tezi se badh rahi hai. Lekin sabse badi problem — zyada apps expensive hain ya English only hain.

## Top Free Mental Health Apps in India

### 1. MindCare (mindcare-wellness.in)
- 100% Free — forever
- Hindi + English
- Anxiety, mood, sleep tracker
- Breathing exercises
- AI chatbot
- No ads

### 2. Wysa
- AI chatbot focused
- Limited free features
- English only

### 3. Headspace
- Meditation focused
- Free trial only — then paid
- English only

### 4. Calm
- Sleep and meditation
- Mostly paid
- English only

## MindCare Kyun Best Hai?

| Feature | MindCare | Others |
|---------|----------|--------|
| Price | Free forever | Trial/Paid |
| Language | Hindi + English | English only |
| Anxiety tracker | ✅ | Limited |
| Mood tracker | ✅ | Some |
| Sleep tracker | ✅ | Some |
| AI Chatbot | ✅ | Paid |
| Made in India | ✅ | ❌ |

## Conclusion

Agar aap India mein free mental health support dhundh rahe hain — MindCare sabse complete option hai.

[MindCare Try Karo — Free →](/)
    `
  },
  {
    slug: "breathing-exercises-anxiety-hindi",
    title: "Anxiety Ke Liye Best Breathing Exercises — Hindi Guide",
    desc: "4-7-8 breathing, box breathing aur calm breathing — yeh techniques anxiety ko 5 minute mein kam kar sakti hain.",
    date: "June 14, 2025",
    readTime: "3 min",
    tag: "Wellness",
    emoji: "💨",
    content: `
## Breathing Exercises Kyun Kaam Karte Hain?

Jab anxiety hoti hai, body "fight or flight" mode mein chali jaati hai. Deep breathing directly nervous system ko calm karti hai.

## Top 3 Breathing Exercises

### 1. 4-7-8 Breathing (Best for anxiety)

**Kaise karein:**
1. Naak se 4 second mein saans lo
2. 7 second tak rokho
3. Muh se 8 second mein chodo
4. 4 baar repeat karo

**Best for:** Anxiety, panic attacks, neend na aana

### 2. Box Breathing (Best for stress)

**Kaise karein:**
1. 4 second saans lo
2. 4 second rokho
3. 4 second chodo
4. 4 second rokho
5. Repeat karo

**Best for:** Stress, focus, work pressure

### 3. Calm Breathing (Best for relaxation)

**Kaise karein:**
1. 5 second saans lo
2. 5 second chodo
3. Koi roko nahi
4. 10 baar repeat karo

**Best for:** General relaxation, sleep

## Kab Karein?

- Subah uthke — din ki shuruat ke liye
- Anxiety feel hone par — turant relief
- Sone se pehle — better sleep

## MindCare Mein Try Karo

MindCare app mein yeh teeno breathing exercises guided animation ke saath available hain — bilkul free!

[Breathing Exercises Try Karo →](/mindfulness)
    `
  },
  {
    slug: "student-anxiety-india",
    title: "Students Mein Anxiety — Causes, Symptoms aur Solutions",
    desc: "India mein students anxiety se kyun pareshan hain? Exam stress, career pressure — sab handle karne ke practical tips.",
    date: "June 16, 2025",
    readTime: "6 min",
    tag: "Students",
    emoji: "🎓",
    content: `
## Indian Students Mein Anxiety Kyun Zyada Hai?

India mein students pe pressure bohot zyada hota hai:

- Board exams ka pressure
- IIT/NEET competition
- Parents ki expectations
- Career uncertainty
- Social media comparison

## Common Symptoms Students Mein

- Exam se pehle panic attacks
- Concentration mein takleef
- Neend na aana
- Appetite khatam hona
- Social withdrawal

## Practical Solutions

### 1. Study Schedule Banao
Random padhne se anxiety badhti hai. Fixed schedule se control milta hai.

### 2. Pomodoro Technique
25 min padho, 5 min break lo. Repeat. Brain ko rest milna zaroori hai.

### 3. Daily Mood Track Karo
MindCare app se daily mood track karo. Patterns pata chalenge.

### 4. Exercise Zarur Karo
Rozana 20 min walk se concentration 30% badhti hai.

### 5. Kisi Se Baat Karo
Friend, family ya counselor — akele mat raho.

## Parents Ke Liye

Bacchon par pressure kam karo. Marks se zyada mental health important hai.

## Conclusion

Student anxiety normal hai lekin manageable hai. MindCare app try karo — free anxiety tracker aur AI chatbot available hai.

[MindCare Try Karo →](/)
    `
  },
  {
    slug: "mood-tracker-kaise-use-karein",
    title: "Mood Tracker Kaise Use Karein — Beginner's Guide",
    desc: "Daily mood tracking se aap apne emotional patterns samajh sakte hain. Step by step guide.",
    date: "June 18, 2025",
    readTime: "4 min",
    tag: "Mood",
    emoji: "😊",
    content: `
## Mood Tracker Kya Hota Hai?

Mood tracker ek tool hai jisse aap rozana apni emotional state record karte hain. Jaise ek diary — lekin smarter.

## Mood Tracking Ke Fayde

- **Patterns pata chalte hain** — kab aur kyun mood kharab hota hai
- **Triggers identify hote hain** — kaunsi cheez mood affect karti hai
- **Progress dikhta hai** — time ke saath improvement
- **Therapy mein help** — doctor ko better bata sakte ho

## MindCare Mein Mood Tracker Kaise Use Karein

### Step 1
MindCare app kholo — Mood Tracker page par jao

### Step 2
Apna aaj ka mood select karo:
- 😄 Happy
- 🙂 Good
- 😐 Neutral
- 😔 Sad
- 😡 Angry
- 😰 Anxious

### Step 3
Optional note likhein — kya chal raha hai aaj?

### Step 4
Save karo — aur kal phir aao!

## Best Practices

- **Rozana ek hi time par karo** — subah ya raat
- **Honest raho** — koi judge nahi karega
- **Note zarur likhein** — context important hota hai
- **Weekly review karo** — patterns dekhein

## Conclusion

Mood tracking ek chota sa habit hai jiska bada impact hota hai. MindCare mein bilkul free — koi limit nahi!

[Mood Tracker Try Karo →](/mood-tracker)
    `
  },
];

const tags = ["All", "Anxiety", "Apps", "Wellness", "Students", "Mood"];

function Blog() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter(post => {
    const matchTag  = activeTag === "All" || post.tag === activeTag;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                        post.desc.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="blogPage">

      {/* Header */}
      <div className="blogHeader">
        <h1>🧠 MindCare Blog</h1>
        <p>Mental wellness tips, guides aur resources — Hindi aur English mein. Free.</p>

        {/* Search */}
        <div className="blogSearch">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tags filter */}
      <div className="blogTags">
        {tags.map(tag => (
          <button
            key={tag}
            className={`blogTagBtn ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="blogEmpty">
          <p>No articles found. Try different search.</p>
        </div>
      ) : (
        <div className="blogGrid">
          {filtered.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className="blogCard">
              <div className="blogCardTop">
                <span className="blogCardEmoji">{post.emoji}</span>
                <span className="blogCardTag">{post.tag}</span>
              </div>
              <h2 className="blogCardTitle">{post.title}</h2>
              <p className="blogCardDesc">{post.desc}</p>
              <div className="blogCardMeta">
                <span>📅 {post.date}</span>
                <span>·</span>
                <span>⏱ {post.readTime} read</span>
              </div>
              <span className="blogCardLink">Read More →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;