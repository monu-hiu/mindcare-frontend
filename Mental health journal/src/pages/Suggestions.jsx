import { useState } from "react";
import { Link } from "react-router-dom";
import "./suggestions.css";

function Suggestions() {
  const [activeTab, setActiveTab] = useState("books");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVideo, setExpandedVideo] = useState(null);

  const tabs = [
    { key: "books",     label: "Books",     emoji: "📚", count: 20 },
    { key: "podcasts",  label: "Podcasts",  emoji: "🎙️", count: 12 },
    { key: "videos",    label: "Videos",    emoji: "🎬", count: 12 },
    { key: "articles",  label: "Articles",  emoji: "📰", count: 15 },
    { key: "exercises", label: "Exercises", emoji: "🧘", count: 14 },
    { key: "students",  label: "Students",  emoji: "🎓", count: 20 },
  ];

  const categoriesMap = {
    books:     ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships"],
    podcasts:  ["All", "Anxiety", "Depression", "Mindfulness", "Stress", "Self-Care", "Motivation", "Relationships"],
    videos:    ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships"],
    articles:  ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships"],
    exercises: ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation"],
    students:  ["All", "Study", "Exam Stress", "Student Life", "Productivity", "Career"],
  };

  const books = [
    { id: 1,  category: "Anxiety",       title: "The Anxiety and Worry Workbook",      author: "Clark & Beck",          desc: "CBT-based workbook with practical exercises to overcome anxiety.", color: "#6366f1", level: "Beginner",     rating: 5, year: 2011 },
    { id: 2,  category: "Anxiety",       title: "Dare",                                author: "Barry McDonagh",        desc: "A revolutionary approach to end anxiety and panic attacks completely.", color: "#8b5cf6", level: "Beginner",     rating: 5, year: 2015 },
    { id: 3,  category: "Depression",    title: "Feeling Good",                        author: "David D. Burns",        desc: "The classic CBT book that helped millions overcome depression.", color: "#3b82f6", level: "Beginner",     rating: 5, year: 1980 },
    { id: 4,  category: "Depression",    title: "The Noonday Demon",                   author: "Andrew Solomon",        desc: "Pulitzer finalist exploring depression from personal and scientific view.", color: "#1d4ed8", level: "Advanced",     rating: 5, year: 2001 },
    { id: 5,  category: "Self-Care",     title: "The Body Keeps the Score",            author: "Bessel van der Kolk",   desc: "How trauma reshapes body and brain, and revolutionary paths to recovery.", color: "#10b981", level: "Intermediate", rating: 5, year: 2014 },
    { id: 6,  category: "Self-Care",     title: "Self-Compassion",                     author: "Kristin Neff",          desc: "The proven power of being kind to yourself using mindfulness.", color: "#059669", level: "Beginner",     rating: 5, year: 2011 },
    { id: 7,  category: "Motivation",    title: "Atomic Habits",                       author: "James Clear",           desc: "Build good habits with tiny changes that deliver remarkable results.", color: "#f59e0b", level: "Beginner",     rating: 5, year: 2018 },
    { id: 8,  category: "Motivation",    title: "Man's Search for Meaning",            author: "Viktor Frankl",         desc: "A Holocaust survivor's account of finding purpose even in suffering.", color: "#d97706", level: "Beginner",     rating: 5, year: 1946 },
    { id: 9,  category: "Stress",        title: "Why Zebras Don't Get Ulcers",         author: "Robert Sapolsky",       desc: "Brilliant explanation of how chronic stress damages health.", color: "#ef4444", level: "Intermediate", rating: 5, year: 1994 },
    { id: 10, category: "Stress",        title: "The Upside of Stress",                author: "Kelly McGonigal",       desc: "Why stress is actually good for you and how to get better at it.", color: "#dc2626", level: "Beginner",     rating: 4, year: 2015 },
    { id: 11, category: "Sleep",         title: "Why We Sleep",                        author: "Matthew Walker",        desc: "Groundbreaking science of sleep and dreams — transforms every aspect of health.", color: "#06b6d4", level: "Beginner",     rating: 5, year: 2017 },
    { id: 12, category: "Sleep",         title: "The Sleep Solution",                  author: "W. Chris Winter",       desc: "A sleep expert's guide to resolving insomnia and getting better rest.", color: "#0891b2", level: "Beginner",     rating: 4, year: 2017 },
    { id: 13, category: "Relationships", title: "Attached",                            author: "Levine & Heller",       desc: "The science of adult attachment and how it shapes your relationships.", color: "#ec4899", level: "Beginner",     rating: 5, year: 2010 },
    { id: 14, category: "Relationships", title: "Set Boundaries, Find Peace",          author: "Nedra Tawwab",          desc: "Practical guide to setting healthy limits and building better relationships.", color: "#db2777", level: "Beginner",     rating: 5, year: 2021 },
    { id: 15, category: "Self-Care",     title: "Lost Connections",                    author: "Johann Hari",           desc: "Why are so many people depressed? The surprising causes and unexpected solutions.", color: "#10b981", level: "Beginner",     rating: 5, year: 2018 },
    { id: 16, category: "Anxiety",       title: "First, We Make the Beast Beautiful",  author: "Sarah Wilson",          desc: "A deeply personal and insightful exploration of living with anxiety.", color: "#7c3aed", level: "Beginner",     rating: 4, year: 2017 },
    { id: 17, category: "Motivation",    title: "The Power of Now",                    author: "Eckhart Tolle",         desc: "A guide to spiritual enlightenment and living in the present moment.", color: "#f59e0b", level: "Intermediate", rating: 5, year: 1997 },
    { id: 18, category: "Depression",    title: "An Unquiet Mind",                     author: "Kay Redfield Jamison",  desc: "A psychiatrist's memoir of living with bipolar disorder — honest and powerful.", color: "#3b82f6", level: "Intermediate", rating: 5, year: 1995 },
    { id: 19, category: "Self-Care",     title: "Burnout",                             author: "Emily & Amelia Nagoski", desc: "The secret to unlocking the stress cycle and escaping the overwhelm trap.", color: "#10b981", level: "Beginner",     rating: 5, year: 2019 },
    { id: 20, category: "Motivation",    title: "Grit",                                author: "Angela Duckworth",      desc: "Why passion and perseverance are more important than talent for success.", color: "#d97706", level: "Beginner",     rating: 4, year: 2016 },
  ];

  const podcasts = [
    { id: 101, category: "Anxiety",       title: "Anxiety Slayer",              host: "Shann Vander Leek",       desc: "Practical tools for managing anxiety and panic attacks.", episodes: "500+", link: "https://open.spotify.com/show/4MjhCXFMbZFHBSTFMVPCOm",    platform: "Spotify", color: "#8b5cf6" },
    { id: 102, category: "Self-Care",     title: "The Happiness Lab",           host: "Dr. Laurie Santos (Yale)", desc: "Yale professor reveals the science of becoming happier.", episodes: "100+", link: "https://open.spotify.com/show/3qv8BS1HzrgKpDnXSlOOFL",    platform: "Spotify", color: "#f59e0b" },
    { id: 103, category: "Motivation",    title: "Huberman Lab",                host: "Dr. Andrew Huberman",     desc: "Science-based tools for sleep, stress, focus, and performance.", episodes: "300+", link: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P",    platform: "Spotify", color: "#ef4444" },
    { id: 104, category: "Depression",    title: "The Hilarious World of Depression", host: "John Moe",          desc: "Comedians discuss depression in a funny and approachable way.", episodes: "150+", link: "https://open.spotify.com/show/5W28DJP8o9rJqVwHbBp8Kh",    platform: "Spotify", color: "#3b82f6" },
    { id: 105, category: "Mindfulness",   title: "On Being",                    host: "Krista Tippett",          desc: "Deep conversations about meaning, spirituality, and being human.", episodes: "1000+", link: "https://open.spotify.com/show/2Jlmx9EqG7X9mAgNNm6Wnz",   platform: "Spotify", color: "#10b981" },
    { id: 106, category: "Mindfulness",   title: "10% Happier",                 host: "Dan Harris (ABC News)",   desc: "Meditation and mindfulness for skeptics — reduce stress practically.", episodes: "600+", link: "https://open.spotify.com/show/1CfW319UkBMVGZKMcnpiU6",    platform: "Spotify", color: "#06b6d4" },
    { id: 107, category: "Self-Care",     title: "Unlocking Us",                host: "Brené Brown",             desc: "Conversations about vulnerability, courage, and what makes us human.", episodes: "200+", link: "https://open.spotify.com/show/4P86ZzHf7EOlRG7o1qZkpJ",    platform: "Spotify", color: "#8b5cf6" },
    { id: 108, category: "Relationships", title: "Where Should We Begin?",      host: "Esther Perel",            desc: "Real couples therapy sessions revealing universal relationship challenges.", episodes: "100+", link: "https://open.spotify.com/show/098yvSMF7u3Kd0EnfXJ8NJ",   platform: "Spotify", color: "#ec4899" },
    { id: 109, category: "Motivation",    title: "The Tim Ferriss Show",        host: "Tim Ferriss",             desc: "World-class performers share tools, routines, and mental models.", episodes: "700+", link: "https://open.spotify.com/show/5qSUyCrk9KR69lEiXbjwXM",    platform: "Spotify", color: "#f97316" },
    { id: 110, category: "Anxiety",       title: "The Anxiety Coaches Podcast", host: "Gina Ryan",               desc: "Recover from anxiety, panic, and stress naturally without medication.", episodes: "1000+", link: "https://open.spotify.com/show/0EKf7FpCk7xFWP3OUJiXb5",   platform: "Spotify", color: "#7c3aed" },
    { id: 111, category: "Depression",    title: "Therapy for Black Girls",     host: "Dr. Joy Harden Bradford", desc: "Mental health conversations centering experiences of Black women.", episodes: "400+", link: "https://open.spotify.com/show/3RTu00YQsOl1E7HJbKQ63P",    platform: "Spotify", color: "#3b82f6" },
    { id: 112, category: "Stress",        title: "Feel Better, Live More",      host: "Dr. Rangan Chatterjee",   desc: "Simple science to transform your health and happiness.", episodes: "400+", link: "https://open.spotify.com/show/5BHq3LfEzENkdLzqPZq3PW",    platform: "Spotify", color: "#10b981" },
  ];

  const videos = [
    { id: 201, category: "Depression",    title: "Depression, the secret we share",              host: "Andrew Solomon",      duration: "30 min", youtubeId: "wb_p4HBkHAQ", color: "#3b82f6" },
    { id: 202, category: "Stress",        title: "How to make stress your friend",               host: "Kelly McGonigal",     duration: "15 min", youtubeId: "RcGyVTAoXEU", color: "#8b5cf6" },
    { id: 203, category: "Self-Care",     title: "The Power of Vulnerability",                   host: "Brené Brown",         duration: "20 min", youtubeId: "iCvmsMzlF7o", color: "#10b981" },
    { id: 204, category: "Sleep",         title: "Sleep is your superpower",                     host: "Matt Walker",         duration: "20 min", youtubeId: "5MuIMqhT8DM", color: "#06b6d4" },
    { id: 205, category: "Motivation",    title: "The puzzle of motivation",                     host: "Dan Pink",            duration: "18 min", youtubeId: "rrkrvAUbU9Y", color: "#f59e0b" },
    { id: 206, category: "Relationships", title: "The Secret to a Happy Life",                   host: "Robert Waldinger",    duration: "13 min", youtubeId: "8KkKuTCFvzI", color: "#ec4899" },
    { id: 207, category: "Anxiety",       title: "Anxiety is your superpower",                   host: "Tracy Dennis-Tiwary", duration: "15 min", youtubeId: "kPLB7hvRDgU", color: "#8b5cf6" },
    { id: 208, category: "Depression",    title: "I had a black dog, his name was depression",   host: "World Health Org",    duration: "4 min",  youtubeId: "XiCrniLQGYc", color: "#3b82f6" },
    { id: 209, category: "Self-Care",     title: "This could be why you are depressed",          host: "Johann Hari",         duration: "22 min", youtubeId: "MB5IX-np5fE", color: "#10b981" },
    { id: 210, category: "Motivation",    title: "Grit — power of passion and perseverance",     host: "Angela Duckworth",    duration: "6 min",  youtubeId: "H14bBuluwB8", color: "#d97706" },
    { id: 211, category: "Sleep",         title: "Why do we sleep?",                             host: "Russell Foster",      duration: "21 min", youtubeId: "LWULB9Aoopc", color: "#0891b2" },
    { id: 212, category: "Anxiety",       title: "How to cope with anxiety",                     host: "Olivia Remes",        duration: "14 min", youtubeId: "WWloIAQpMcQ", color: "#7c3aed" },
  ];

  const articles = [
    { id: 301, category: "Anxiety",       title: "What Anxiety Actually Feels Like",            source: "Psychology Today",    readTime: "8 min",  link: "https://www.psychologytoday.com/us/basics/anxiety",                    color: "#8b5cf6" },
    { id: 302, category: "Depression",    title: "The Neuroscience of Depression",              source: "Harvard Health",      readTime: "10 min", link: "https://www.health.harvard.edu/mind-and-mood/what-causes-depression", color: "#3b82f6" },
    { id: 303, category: "Sleep",         title: "Sleep and Mental Health",                     source: "Sleep Foundation",    readTime: "7 min",  link: "https://www.sleepfoundation.org/mental-health",                       color: "#06b6d4" },
    { id: 304, category: "Stress",        title: "Chronic Stress and Your Brain",               source: "APA",                 readTime: "6 min",  link: "https://www.apa.org/topics/stress/body",                              color: "#ef4444" },
    { id: 305, category: "Self-Care",     title: "The Science of Self-Compassion",              source: "Greater Good (UC Berkeley)", readTime: "9 min", link: "https://greatergood.berkeley.edu/topic/self-compassion",            color: "#10b981" },
    { id: 306, category: "Motivation",    title: "The Science of Goal Setting",                 source: "Positive Psychology", readTime: "12 min", link: "https://positivepsychology.com/goal-setting-theory/",                 color: "#f59e0b" },
    { id: 307, category: "Relationships", title: "Attachment Styles and Mental Health",         source: "Verywell Mind",       readTime: "8 min",  link: "https://www.verywellmind.com/attachment-styles-2795344",              color: "#ec4899" },
    { id: 308, category: "Anxiety",       title: "CBT for Anxiety — A Complete Guide",         source: "NIMH",                readTime: "15 min", link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",            color: "#7c3aed" },
    { id: 309, category: "Depression",    title: "Exercise as Treatment for Depression",        source: "Mayo Clinic",         readTime: "5 min",  link: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495", color: "#1d4ed8" },
    { id: 310, category: "Self-Care",     title: "Mindfulness in Daily Life",                  source: "Mindful Magazine",    readTime: "7 min",  link: "https://www.mindful.org/mindfulness-how-to-do-it/",                   color: "#059669" },
    { id: 311, category: "Stress",        title: "Burnout — Signs, Causes and Recovery",       source: "WHO",                 readTime: "10 min", link: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases", color: "#dc2626" },
    { id: 312, category: "Sleep",         title: "Sleep Hygiene — Complete Guide",              source: "CDC",                 readTime: "6 min",  link: "https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod6/08.html", color: "#0891b2" },
    { id: 313, category: "Motivation",    title: "Growth Mindset vs Fixed Mindset",             source: "Stanford Psychology", readTime: "8 min",  link: "https://www.mindsetworks.com/science/",                               color: "#d97706" },
    { id: 314, category: "Relationships", title: "How to Communicate in Relationships",         source: "Gottman Institute",   readTime: "11 min", link: "https://www.gottman.com/blog/the-four-horsemen-recognizing-criticism-contempt-defensiveness-and-stonewalling/", color: "#db2777" },
    { id: 315, category: "Anxiety",       title: "Panic Attacks — What They Are",              source: "Mind UK",             readTime: "9 min",  link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/panic-attacks/", color: "#6366f1" },
  ];

  const exercises = [
    { id: 401, category: "Anxiety",    title: "5-4-3-2-1 Grounding",        desc: "Reduce acute anxiety in minutes with this powerful mindfulness technique.", emoji: "🧘", color: "#8b5cf6", tips: ["5 things you see", "4 things you touch", "3 things you hear", "2 things you smell", "1 thing you taste"] },
    { id: 402, category: "Anxiety",    title: "4-7-8 Breathing",            desc: "Activate your parasympathetic nervous system to calm anxiety instantly.", emoji: "💨", color: "#7c3aed", tips: ["Inhale for 4 seconds", "Hold for 7 seconds", "Exhale for 8 seconds", "Repeat 4 times daily"] },
    { id: 403, category: "Sleep",      title: "Body Scan Relaxation",       desc: "Progressive relaxation technique to prepare your body for deep sleep.", emoji: "😴", color: "#06b6d4", tips: ["Lie down comfortably", "Scan slowly from feet to head", "Release tension in each part", "Takes 10-15 minutes"] },
    { id: 404, category: "Stress",     title: "Box Breathing",              desc: "Military technique used by Navy SEALs to stay calm under pressure.", emoji: "📦", color: "#10b981", tips: ["Inhale 4 counts", "Hold 4 counts", "Exhale 4 counts", "Hold 4 counts — repeat"] },
    { id: 405, category: "Depression", title: "Behavioral Activation",      desc: "Schedule enjoyable activities to gradually lift your mood.", emoji: "📅", color: "#3b82f6", tips: ["List 10 activities you enjoy", "Schedule one today", "Track mood before and after", "Build momentum gradually"] },
    { id: 406, category: "Self-Care",  title: "Self-Compassion Break",      desc: "A 3-minute exercise to treat yourself with kindness during difficult moments.", emoji: "🤗", color: "#f59e0b", tips: ["Notice you are struggling", "Suffering is part of being human", "Put hand on heart", "Offer kindness to yourself"] },
    { id: 407, category: "Anxiety",    title: "Progressive Muscle Relaxation", desc: "Tense and release each muscle group to release stored physical tension.", emoji: "💪", color: "#6366f1", tips: ["Start with feet and toes", "Tense for 5 seconds", "Release and notice relaxation", "Work up to head"] },
    { id: 408, category: "Stress",     title: "Journaling for Stress",      desc: "Write to process emotions and clear mental clutter effectively.", emoji: "✍️", color: "#ef4444", tips: ["Write for 10 minutes daily", "No editing or judgment", "Include feelings and thoughts", "Try gratitude entries too"] },
    { id: 409, category: "Sleep",      title: "Sleep Hygiene Checklist",    desc: "Evidence-based practices to improve sleep quality tonight.", emoji: "🌙", color: "#0891b2", tips: ["Same sleep time daily", "No screens 1 hour before bed", "Keep room cool and dark", "Avoid caffeine after 2pm"] },
    { id: 410, category: "Depression", title: "Daily Mood Tracking",        desc: "Track your mood patterns to understand what affects your mental health.", emoji: "📊", color: "#1d4ed8", tips: ["Rate mood 1-10 each morning", "Note what happened", "Look for patterns weekly", "Share with your therapist"] },
    { id: 411, category: "Motivation", title: "2-Minute Rule",              desc: "If it takes less than 2 minutes — do it now. Beat procrastination instantly.", emoji: "⚡", color: "#d97706", tips: ["Identify 2-minute tasks", "Do them immediately", "Builds momentum", "Reduces mental clutter"] },
    { id: 412, category: "Self-Care",  title: "Nature Walk Meditation",     desc: "Combine the healing benefits of nature with mindfulness walking.", emoji: "🌿", color: "#059669", tips: ["Walk slowly and deliberately", "Notice sights, sounds, smells", "No phone for 20 minutes", "Breathe deeply throughout"] },
    { id: 413, category: "Anxiety",    title: "Worry Time Technique",       desc: "Schedule a specific time to worry — keep the rest of your day free.", emoji: "⏰", color: "#8b5cf6", tips: ["Set 20 min worry time daily", "Write worries during that time", "Outside worry time — postpone", "Reduces anxiety significantly"] },
    { id: 414, category: "Stress",     title: "Digital Detox Practice",     desc: "Reclaim your mental space with regular breaks from screens and social media.", emoji: "📵", color: "#64748b", tips: ["No phone first hour of day", "Designated phone-free zones", "Social media time limits", "One full offline day per week"] },
  ];

  const students = [
    { id: 501, category: "Study",        title: "Pomodoro Technique",          desc: "Study 25 min, break 5 min. After 4 cycles take a 30-min break. Proven to boost focus.", emoji: "🍅", color: "#ef4444", tips: ["Set timer for 25 minutes", "Full focus — no distractions", "5 min break — move around", "After 4 cycles: 30 min break"] },
    { id: 502, category: "Study",        title: "Active Recall Method",         desc: "Test yourself instead of re-reading. The most effective study technique backed by research.", emoji: "🧠", color: "#4f46e5", tips: ["Read once then close book", "Write everything you remember", "Check what you missed", "Review after 1, 3, 7 days"] },
    { id: 503, category: "Study",        title: "Spaced Repetition",            desc: "Review material at increasing intervals — dramatically improves long-term retention.", emoji: "📅", color: "#8b5cf6", tips: ["Review after 1 day", "Then after 3 days", "Then 1 week", "Then 1 month"] },
    { id: 504, category: "Study",        title: "Cornell Note-Taking System",   desc: "The most effective note-taking method used by top universities worldwide.", emoji: "📝", color: "#10b981", tips: ["Divide page into 3 sections", "Notes right, keywords left", "Summary at bottom", "Review within 24 hours"] },
    { id: 505, category: "Exam Stress",  title: "Pre-Exam Anxiety Relief",      desc: "A 5-minute routine to calm exam nerves and enter the hall with confidence.", emoji: "😤", color: "#f97316", tips: ["Box breathing for 2 minutes", "Power pose for 60 seconds", "Tell yourself: I am prepared", "Arrive 15 minutes early"] },
    { id: 506, category: "Exam Stress",  title: "Night Before Exam Routine",    desc: "What to do (and not do) the night before a big exam for optimal performance.", emoji: "🌙", color: "#6366f1", tips: ["Stop studying by 9pm", "Light revision only", "Sleep 7-8 hours minimum", "Prepare everything the night before"] },
    { id: 507, category: "Exam Stress",  title: "During Exam Techniques",       desc: "Stay calm and perform your best when it actually counts during the exam.", emoji: "✏️", color: "#7c3aed", tips: ["Read all questions first", "Start with what you know", "Deep breath if panicking", "Use all your time"] },
    { id: 508, category: "Student Life", title: "Dealing with Academic Pressure", desc: "You are not alone. Handle pressure from family, peers, and yourself.", emoji: "💪", color: "#22c55e", tips: ["Talk to someone you trust", "Set realistic expectations", "Focus on progress not perfection", "Take breaks without guilt"] },
    { id: 509, category: "Student Life", title: "Hostel Life and Loneliness",   desc: "Being away from home is hard. Build connections and feel less alone.", emoji: "🏠", color: "#3b82f6", tips: ["Introduce yourself to neighbors", "Join one club or activity", "Call home regularly", "Create a comfortable space"] },
    { id: 510, category: "Student Life", title: "Study-Life Balance",           desc: "Enjoy student life while keeping up with academics — guilt free.", emoji: "⚖️", color: "#ec4899", tips: ["Schedule fun like study", "Protect 1 hour daily for yourself", "Rest is part of success", "Say no to guilt"] },
    { id: 511, category: "Productivity", title: "Building a Study Schedule",    desc: "Create a realistic weekly study plan that you will actually stick to.", emoji: "📆", color: "#f59e0b", tips: ["Find your peak focus hours", "Schedule hard subjects then", "Include buffer time", "Review every Sunday"] },
    { id: 512, category: "Productivity", title: "Eliminating Distractions",     desc: "Create a distraction-free study environment in the age of smartphones.", emoji: "📵", color: "#64748b", tips: ["Phone in another room", "Use Forest or Freedom app", "Study with lo-fi music", "Tell others not to disturb"] },
    { id: 513, category: "Career",       title: "Managing Career Anxiety",      desc: "Feeling lost about your future is normal. Navigate it without burning out.", emoji: "🧭", color: "#8b5cf6", tips: ["Focus on skills not titles", "Talk to seniors in your field", "Internships clarify confusion", "Your path is not fixed"] },
    { id: 514, category: "Career",       title: "Imposter Syndrome in Students", desc: "Feeling like a fraud despite achievements? Learn how to overcome it.", emoji: "🎭", color: "#ec4899", tips: ["Affects even the most successful", "Track achievements in writing", "Share feelings with peers", "Competence grows with experience"] },
    { id: 515, category: "Career",       title: "Dealing with Comparison Culture", desc: "Stop comparing your chapter 1 to someone else's chapter 10.", emoji: "🪞", color: "#06b6d4", tips: ["Unfollow accounts that hurt", "Track your own progress", "Everyone's timeline is different", "Your worth is not your grades"] },
    { id: 516, category: "Study",        title: "Mind Mapping for Complex Topics", desc: "Visual note-taking that connects ideas and improves understanding and memory.", emoji: "🗺️", color: "#4f46e5", tips: ["Start with central topic", "Branch out to subtopics", "Use colors and images", "Review and add connections"] },
    { id: 517, category: "Exam Stress",  title: "Managing Results Day Anxiety", desc: "Whether results are good or bad — how to process them with perspective.", emoji: "📊", color: "#f59e0b", tips: ["Results do not define your worth", "One result is not your future", "Process emotions first", "Then make a plan if needed"] },
    { id: 518, category: "Student Life", title: "5-Min Study Break Meditation", desc: "A quick mindfulness reset between study sessions to maintain focus all day.", emoji: "🧘", color: "#8b5cf6", tips: ["Set timer for 5 minutes", "Close eyes and breathe", "Let thoughts pass", "Return refreshed and focused"] },
    { id: 519, category: "Productivity", title: "Morning Routine for Students", desc: "Start your day with this 20-minute routine to maximize focus and clarity.", emoji: "🌅", color: "#f97316", tips: ["Wake up same time daily", "10 min movement", "Healthy breakfast", "Review top 3 priorities"] },
    { id: 520, category: "Study",        title: "A Mind for Numbers — Key Ideas", desc: "Barbara Oakley's top insights on how to excel at difficult subjects.", emoji: "🔢", color: "#6366f1", tips: ["Alternate focused and diffuse thinking", "Practice beats talent", "Memory palace for complex concepts", "Struggle is part of learning"] },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "books":     return books;
      case "podcasts":  return podcasts;
      case "videos":    return videos;
      case "articles":  return articles;
      case "exercises": return exercises;
      case "students":  return students;
      default:          return books;
    }
  };

  const categories = categoriesMap[activeTab] || categoriesMap.books;

  const filtered = getActiveData().filter((r) => {
    const matchCategory = activeCategory === "All" || r.category === activeCategory;
    const matchSearch   = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.host?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const [expandedTips, setExpandedTips] = useState(null);

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div className="sugPage">
      {/* Hero */}
      <div className="sugHero">
        <div className="sugHeroBadge">Mental Wellness Library</div>
        <h1 className="sugHeroTitle">Resources for Your Journey</h1>
        <p className="sugHeroDesc">
          Curated books, podcasts, videos, articles, and exercises
          to support your mental health — all in one place.
        </p>
      </div>

      {/* Tabs */}
      {/* Tab + Category Dropdowns */}
      <div className="sugDropdownRow">
        <div className="sugDropdownWrap">
          <label className="sugDropdownLabel">Browse</label>
          <select
            className="sugDropdown"
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setActiveCategory("All");
              setSearchQuery("");
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.emoji} {tab.label} ({tab.count})
              </option>
            ))}
          </select>
        </div>

        <div className="sugDropdownWrap">
          <label className="sugDropdownLabel">Category</label>
          <select
            className="sugDropdown"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sugSearch">
          <span>🔍</span>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="sugClear">✕</button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="sugCount">
        {filtered.length} {activeTab} {activeCategory !== "All" ? `· ${activeCategory}` : ""}
      </p>

      {/* Student Banner */}
      {activeTab === "students" && (
        <div className="studentBanner">
          <span>🎓</span>
          <div>
            <h3>Made for Students</h3>
            <p>Study techniques, exam stress relief, hostel life tips, and career guidance.</p>
          </div>
        </div>
      )}

      {/* Content Grid */}
      {filtered.length === 0 ? (
        <div className="sugEmpty">
          <p>😔 No results found</p>
          <p>Try a different search or category</p>
        </div>
      ) : (

        <div className={`sugGrid ${activeTab === "videos" ? "videosGrid" : ""}`}>

          {/* ── BOOKS ── */}
          {activeTab === "books" && filtered.map((b) => (
            <div key={b.id} className="bookCard">
              <div className="bookStripe" style={{ background: b.color }} />
              <div className="bookBody">
                <div className="bookHeader">
                  <div>
                    <span className="bookCat" style={{ color: b.color, background: `${b.color}15` }}>
                      {b.category}
                    </span>
                    <h3 className="bookTitle">{b.title}</h3>
                    <p className="bookAuthor">by {b.author} · {b.year}</p>
                  </div>
                  <span className="bookLevel"
                    style={{ background: b.level === "Beginner" ? "#f0fdf4" : b.level === "Intermediate" ? "#fffbeb" : "#fef2f2",
                             color:      b.level === "Beginner" ? "#16a34a" : b.level === "Intermediate" ? "#d97706" : "#dc2626" }}>
                    {b.level}
                  </span>
                </div>
                <p className="bookDesc">{b.desc}</p>
                <p className="bookStars" style={{ color: b.color }}>{stars(b.rating)}</p>
              </div>
            </div>
          ))}

          {/* ── PODCASTS ── */}
          {activeTab === "podcasts" && filtered.map((p) => (
            <div key={p.id} className="podCard">
              <div className="podIcon" style={{ background: `${p.color}15`, color: p.color }}>🎙️</div>
              <div className="podBody">
                <span className="podCat" style={{ color: p.color, background: `${p.color}15` }}>
                  {p.category}
                </span>
                <h3 className="podTitle">{p.title}</h3>
                <p className="podHost">by {p.host}</p>
                <p className="podDesc">{p.desc}</p>
                <div className="podFooter">
                  <span className="podEpisodes">🎙️ {p.episodes} episodes</span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="podBtn"
                    style={{ background: "#1db954", color: "white" }}
                  >
                    ▶ Listen on Spotify
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* ── VIDEOS ── */}
          {activeTab === "videos" && filtered.map((v) => (
            <div key={v.id} className="videoCard">
              {expandedVideo === v.id ? (
                <div className="videoEmbed">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button className="closeVideo" onClick={() => setExpandedVideo(null)}>
                    ✕ Close
                  </button>
                </div>
              ) : (
                <div
                  className="videoThumb"
                  onClick={() => setExpandedVideo(v.id)}
                  style={{ background: `${v.color}12` }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt={v.title}
                    className="videoThumbnailImg"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="videoPlayOverlay">
                    <div className="videoPlayBtn" style={{ background: v.color }}>▶</div>
                  </div>
                  <span className="videoDuration">{v.duration}</span>
                </div>
              )}
              <div className="videoInfo">
                <span className="videoCat" style={{ color: v.color, background: `${v.color}15` }}>
                  {v.category}
                </span>
                <h3 className="videoTitle">{v.title}</h3>
                <p className="videoHost">{v.host}</p>
                {expandedVideo !== v.id && (
                  <button
                    className="watchBtn"
                    style={{ background: v.color }}
                    onClick={() => setExpandedVideo(v.id)}
                  >
                    ▶ Watch Now
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* ── ARTICLES ── */}
          {activeTab === "articles" && filtered.map((a) => (
            <a
              key={a.id}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="articleCard"
              style={{ borderTop: `4px solid ${a.color}` }}
            >
              <div className="articleHeader">
                <span className="articleSource"
                  style={{ background: `${a.color}15`, color: a.color }}>
                  {a.source}
                </span>
                <span className="articleTime">📖 {a.readTime}</span>
              </div>
              <span className="articleCat">{a.category}</span>
              <h3 className="articleTitle">{a.title}</h3>
              <span className="articleRead" style={{ color: a.color }}>
                Read Article →
              </span>
            </a>
          ))}

          {/* ── EXERCISES ── */}
          {activeTab === "exercises" && filtered.map((e) => (
            <div key={e.id} className="exCard">
              <div className="exTop">
                <span className="exEmoji"
                  style={{ background: `${e.color}15` }}>
                  {e.emoji}
                </span>
                <span className="exCat" style={{ color: e.color, background: `${e.color}15` }}>
                  {e.category}
                </span>
              </div>
              <h3 className="exTitle">{e.title}</h3>
              <p className="exDesc">{e.desc}</p>
              <button
                className="exToggle"
                style={{ color: e.color, borderColor: `${e.color}40` }}
                onClick={() => setExpandedTips(expandedTips === e.id ? null : e.id)}
              >
                {expandedTips === e.id ? "▲ Hide Steps" : "▼ Show Steps"}
              </button>
              {expandedTips === e.id && (
                <ol className="exTips" style={{ borderColor: `${e.color}30`, background: `${e.color}06` }}>
                  {e.tips.map((tip, i) => (
                    <li key={i} style={{ color: "#374151" }}>
                      <span style={{ color: e.color, fontWeight: 700 }}>{i + 1}.</span> {tip}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}

          {/* ── STUDENTS ── */}
          {activeTab === "students" && filtered.map((s) => (
            <div key={s.id} className="stuCard"
              style={{ borderLeft: `4px solid ${s.color}` }}>
              <div className="stuTop">
                <span className="stuEmoji"
                  style={{ background: `${s.color}15` }}>
                  {s.emoji}
                </span>
                <span className="stuCat"
                  style={{ color: s.color, background: `${s.color}15` }}>
                  {s.category}
                </span>
              </div>
              <h3 className="stuTitle">{s.title}</h3>
              <p className="stuDesc">{s.desc}</p>
              <button
                className="stuToggle"
                style={{ color: s.color, borderColor: `${s.color}40` }}
                onClick={() => setExpandedTips(expandedTips === s.id ? null : s.id)}
              >
                {expandedTips === s.id ? "▲ Hide Tips" : "▼ Show Tips"}
              </button>
              {expandedTips === s.id && (
                <ol className="exTips"
                  style={{ borderColor: `${s.color}30`, background: `${s.color}06` }}>
                  {s.tips.map((tip, i) => (
                    <li key={i}>
                      <span style={{ color: s.color, fontWeight: 700 }}>{i + 1}.</span> {tip}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}

        </div>
      )}

      <div className="sugBack">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Suggestions;
