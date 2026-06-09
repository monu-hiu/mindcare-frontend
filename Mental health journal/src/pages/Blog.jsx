import { useState } from "react";
import { Link } from "react-router-dom";
import "./blog.css";

// ══════════════════════════════════════════
// ADD YOUR BLOG POSTS HERE
// Copy paste karo ek post ka format
// ══════════════════════════════════════════
export const blogPosts = [
  {
    slug: "what-is-anxiety",
    title: "What is Anxiety? — Complete English Guide",
    desc: "Understand the symptoms, causes, and solutions of anxiety — all explained in simple language. You are not alone.",
    date: "May 25, 2026",
    readTime: "5 min",
    tag: "Anxiety",
    emoji: "😰",
    content: `
## what is Anxiety?

Anxiety is a feeling in which you experience fear, nervousness, or restlessness without any specific reason. It is a normal human emotion — but when it becomes excessive, it can turn into a problem.

## Symptoms of Anxiety

These are the common symptoms of anxiety:

- Rapid heartbeat — Heart racing without any apparent reason.
- Trembling hands — Shaking or unsteady hands
- Difficulty sleeping — Trouble falling or staying asleep
- Overthinking everything — Excessive worrying or analyzing situations
- Stomach problems — Discomfort, pain, or digestive issues
- Constant fatigue** — Feeling tired or exhausted most of the time

## what causes Anxiety?

Anxiety can be caused by a combination of factors:



1. **Exam pressure** — Students facing intense pressure to perform well in exams
2. **Work stress** — Work-related pressure and demands
3. **Relationship problems** — Issues in personal relationships
4. **Financial stress** — Concerns about money and finances
5. **Social situations** — Anxiety in social settings

##how to manage Anxiety?

Here are some practical tips to manage anxiety:

### 1. Breathing Exercise
4-7-8 technique try:
- 4 second breath inhale
- 7 second hold
- 8 second exhale
Repeat 4 times for instant calm.

### 2. Daily Tracking
Use MindCare app to track your anxiety daily. Identify patterns and triggers over time.

### 3. Exercise
Regular physical activity releases endorphins that improve mood and reduce anxiety.

### 4. Sleep.
Good sleep is crucial. Try to maintain a consistent sleep schedule and create a relaxing bedtime routine.

### 5. Talk to Someone
Share your feelings with a trusted friend, family member, or counselor. You don't have to face anxiety alone.

## When to Seek Professional Help or go to a Doctor?

If anxiety is interfering with your daily life, causing significant distress, or leading to physical symptoms, it may be time to seek professional help. A mental health professional can provide therapy, medication, or a combination of both to help manage anxiety effectively.

## Conclusion

Anxiety is normal. You are not alone. Track your anxiety daily with the MindCare app and understand your patterns.

[Anxiety Tracker Try it →](/anxiety-tracker)
    `
  },
  {
    slug: "free-mental-health-app-2025",
    title: "Best Free Mental Health App For You — Complete Guide",
    desc: "Discover the best free mental health apps available for you in 2026. Learn about their features and how they can help you on your wellness journey.",
    date: "May 28, 2026",
    readTime: "4 min",
    tag: "Apps",
    emoji: "📱",
    content: `
## Free Mental Health Apps For You in 2026

The demand for mental health apps is growing rapidly in the world. However, the biggest problem is that most apps are expensive or available only in English.

## Top Free Mental Health Apps in 2026

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

## why MindCare is the Best for You?

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

MindCare is the best free mental health app for you in 2026. It offers comprehensive tracking, AI support, and is built for everyone in the world.

[MindCare Try Karo — Free →](/)
    `
  },
  {
    slug: "breathing-exercises-anxiety-hindi",
    title: "Anxiety Ke Liye Best Breathing Exercises — Hindi Guide",
    desc: "4-7-8 breathing, box breathing aur calm breathing — yeh techniques anxiety ko 5 minute mein kam kar sakti hain.",
    date: "May 31, 2026",
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
    date: "June 5, 2026",
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
    date: "June 7, 2026",
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