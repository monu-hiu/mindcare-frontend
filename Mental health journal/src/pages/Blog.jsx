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
    slug: "breathing-exercises-anxiety-English",
    title: "Breathing Exercises for Anxiety — English Guide",
    desc: "4-7-8 breathing, box breathing and calm breathing — these techniques can reduce anxiety in just 5 minutes.",
    date: "May 31, 2026",
    readTime: "3 min",
    tag: "Wellness",
    emoji: "💨",
    content: `
## Breathing Exercises Why They Work?

Breathing exercises help regulate the nervous system and reduce the physical symptoms of anxiety. They can lower heart rate, relax muscles, and calm the mind.

## Top 3 Breathing Exercises

### 1. 4-7-8 Breathing (Best for anxiety)

**How to do it:**
1. Inhale through the nose for 4 seconds
2. Hold the breath for 7 seconds
3. Exhale through the mouth for 8 seconds
4. Repeat 4 times

**Best for:** Anxiety, panic attacks, sleep problems

### 2. Box Breathing (Best for stress)

**How to do it:**
1. Inhale for 4 seconds
2. Hold for 4 seconds
3. Exhale for 4 seconds
4. Hold for 4 seconds
5. Repeat


**Best for:** Stress, focus, work pressure

### 3. Calm Breathing (Best for relaxation)

**How to do it:**
1. Inhale for 5 seconds
2. Hold for 5 seconds
3. Exhale for 5 seconds
4. Hold for 10 seconds
5. Repeat 10 times

**Best for:** General relaxation, sleep

## When to Do It?

- after waking up in the morning — starting the day with calm mind
- during work breaks — to reduce stress and improve focus
- before going to bed — for better sleep
- during anxiety attacks — to quickly calm down

## In MindCare Try it For Free

All three of these breathing exercises are available in the MindCare app with guided animation — absolutely free!

[Breathing Exercises Try it For Free →](/mindfulness)
    `
  },
  {
    slug: "Student-anxiety",
    title: "Anxiety in Students — Causes, Symptoms, and Solutions",
    desc: "Many students  face high levels of anxiety due to academic pressure, competition, and social expectations. Learn how to manage it effectively.",
    date: "June 5, 2026",
    readTime: "6 min",
    tag: "Students",
    emoji: "🎓",
    content: `
## Why is anxiety higher among  students?

There is a lot of pressure on students:

- Board exams  pressure
- IIT/NEET competition
- Parents  expectations
- Career uncertainty
- Social media comparison

## Common Symptoms in Students 

- Constant worrying about exams and future
- Restlessness and inability to focus on studies
- Sleep disturbances — trouble falling asleep or staying asleep
- Physical symptoms like headaches, stomachaches, or fatigue
- Social withdrawal

## Practical Solutions

### 1.Create a Study ScheduleStudying randomly increases anxiety. A fixed schedule gives you control.

### 2. Pomodoro Technique
25 min Study, take 5 min break. Repeat. It is important for the brain to get rest.

### 3. Track Your Daily Mood
Track your daily mood with the MindCare app to discover patterns.

### 4. Exercise Regularly
A daily 20-minute walk increases concentration by 30%.

### 5. Talk to Someone
Friend, family, or counselor — don't stay alone.

## For Parents
Reduce the pressure on your children. Mental health is more important than marks.

## Conclusion

Student anxiety is normal but manageable. Try the MindCare app — a free anxiety tracker and AI chatbot are available.

[MindCare Try it For Free →](/)
    `
  },
  {
    slug: "mood-tracker-how-to-use",
    title: "How to Use the Mood Tracker — Beginner's Guide",
    desc: "Daily track your daily mood with the MindCare app. Step by step guide.",
    date: "June 7, 2026",
    readTime: "4 min",
    tag: "Mood",
    emoji: "😊",
    content: `
## How to Use the Mood Tracker

The mood tracker is a tool that helps you record your daily emotional state. It's like a diary, but smarter.

## Benefits of Mood Tracking

- **Patterns are revealed — when and why your mood goes off.**
- **Triggers are identified** —  what exactly affects your mood.
- **Progress is visible** — improvements over time
- **Therapy is more effective** — better communication with the doctor

## How to Use the Mood Tracker in MindCare

### Step 1
Open the MindCare app — go to the Mood Tracker page

### Step 2
Select your mood for today:
- 😄 Happy
- 🙂 Good
- 😐 Neutral
- 😔 Sad
- 😡 Angry
- 😰 Anxious

### Step 3
 Write an optional note — what's on your mind?

### Step 4
Save it — Come back tomorrow!

## Best Practices

- **Track consistently** — Day or night, just do it daily
- **Be honest** — not anyone judging you, so be truthful to yourself
- **Note regularly** — write a note whenever you feel something important
- **Review weekly** — check your mood patterns every week

## Conclusion

Mood tracking is a small habit with a big impact. In MindCare it is free — no limit!

[Mood Tracker Try it For Free →](/mood-tracker)
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