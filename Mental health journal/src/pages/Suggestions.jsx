import { useState } from "react";
import { Link } from "react-router-dom";
import "./suggestions.css";

function Suggestions() {
  const [activeTab, setActiveTab] = useState("books");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [expandedTips, setExpandedTips] = useState(null);

  // ─────────────────────────────────────────────
  // TAB DEFINITIONS
  // ─────────────────────────────────────────────
  const tabs = [
    { key: "books",     label: "Books",     emoji: "📚", count: 30 },
    { key: "podcasts",  label: "Podcasts",  emoji: "🎙️", count: 40 },
    { key: "videos",    label: "Videos",    emoji: "🎬", count: 30 },
    { key: "articles",  label: "Articles",  emoji: "📰", count: 40 },
    { key: "exercises", label: "Exercises", emoji: "🧘", count: 14 },
    { key: "students",  label: "Students",  emoji: "🎓", count: 25 },
  ];

  const categoriesMap = {
    books:     ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships", "Mindfulness", "Trauma"],
    podcasts:  ["All", "Mental Health", "Motivation", "Self-Care", "Business", "Mindfulness", "Relationships", "Student Life"],
    videos:    ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships", "Mindfulness"],
    articles:  ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation", "Relationships", "Mindfulness", "Student Life"],
    exercises: ["All", "Anxiety", "Depression", "Sleep", "Stress", "Self-Care", "Motivation"],
    students:  ["All", "Study", "Exam Stress", "Student Life", "Productivity", "Career", "Videos"],
  };

  // ─────────────────────────────────────────────
  // BOOKS (30+) — with coverUrl for photos
  // Cover images via Open Library covers API (free, no key needed)
  // ─────────────────────────────────────────────
  const books = [
    { id: 1,  category: "Anxiety",       title: "The Anxiety and Worry Workbook",       author: "Clark & Beck",            desc: "CBT-based workbook with practical exercises to overcome anxiety.",                    color: "#6366f1", level: "Beginner",     rating: 5, year: 2011, coverUrl: "https://covers.openlibrary.org/b/isbn/9781606234389-M.jpg" },
    { id: 2,  category: "Anxiety",       title: "Dare",                                 author: "Barry McDonagh",           desc: "A revolutionary approach to end anxiety and panic attacks completely.",                color: "#8b5cf6", level: "Beginner",     rating: 5, year: 2015, coverUrl: "https://covers.openlibrary.org/b/isbn/9780956596253-M.jpg" },
    { id: 3,  category: "Depression",    title: "Feeling Good",                         author: "David D. Burns",           desc: "The classic CBT book that helped millions overcome depression.",                      color: "#3b82f6", level: "Beginner",     rating: 5, year: 1980, coverUrl: "https://covers.openlibrary.org/b/isbn/9780380810338-M.jpg" },
    { id: 4,  category: "Depression",    title: "The Noonday Demon",                    author: "Andrew Solomon",           desc: "Pulitzer finalist exploring depression from personal and scientific view.",             color: "#1d4ed8", level: "Advanced",     rating: 5, year: 2001, coverUrl: "https://covers.openlibrary.org/b/isbn/9780684854663-M.jpg" },
    { id: 5,  category: "Trauma",        title: "The Body Keeps the Score",             author: "Bessel van der Kolk",      desc: "How trauma reshapes body and brain, and revolutionary paths to recovery.",            color: "#10b981", level: "Intermediate", rating: 5, year: 2014, coverUrl: "https://covers.openlibrary.org/b/isbn/9780670785933-M.jpg" },
    { id: 6,  category: "Self-Care",     title: "Self-Compassion",                      author: "Kristin Neff",             desc: "The proven power of being kind to yourself using mindfulness.",                       color: "#059669", level: "Beginner",     rating: 5, year: 2011, coverUrl: "https://covers.openlibrary.org/b/isbn/9780061733529-M.jpg" },
    { id: 7,  category: "Motivation",    title: "Atomic Habits",                        author: "James Clear",              desc: "Build good habits with tiny changes that deliver remarkable results.",                 color: "#f59e0b", level: "Beginner",     rating: 5, year: 2018, coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg" },
    { id: 8,  category: "Motivation",    title: "Man's Search for Meaning",             author: "Viktor Frankl",            desc: "A Holocaust survivor's account of finding purpose even in suffering.",                 color: "#d97706", level: "Beginner",     rating: 5, year: 1946, coverUrl: "https://covers.openlibrary.org/b/isbn/9780807014295-M.jpg" },
    { id: 9,  category: "Stress",        title: "Why Zebras Don't Get Ulcers",          author: "Robert Sapolsky",          desc: "Brilliant explanation of how chronic stress damages health.",                          color: "#ef4444", level: "Intermediate", rating: 5, year: 1994, coverUrl: "https://covers.openlibrary.org/b/isbn/9780716732105-M.jpg" },
    { id: 10, category: "Stress",        title: "The Upside of Stress",                 author: "Kelly McGonigal",          desc: "Why stress is actually good for you and how to get better at it.",                    color: "#dc2626", level: "Beginner",     rating: 4, year: 2015, coverUrl: "https://covers.openlibrary.org/b/isbn/9781583335611-M.jpg" },
    { id: 11, category: "Sleep",         title: "Why We Sleep",                         author: "Matthew Walker",           desc: "Groundbreaking science of sleep and dreams — transforms every aspect of health.",     color: "#06b6d4", level: "Beginner",     rating: 5, year: 2017, coverUrl: "https://covers.openlibrary.org/b/isbn/9781501144318-M.jpg" },
    { id: 12, category: "Sleep",         title: "The Sleep Solution",                   author: "W. Chris Winter",          desc: "A sleep expert's guide to resolving insomnia and getting better rest.",                color: "#0891b2", level: "Beginner",     rating: 4, year: 2017, coverUrl: "https://covers.openlibrary.org/b/isbn/9780399583612-M.jpg" },
    { id: 13, category: "Relationships", title: "Attached",                             author: "Levine & Heller",          desc: "The science of adult attachment and how it shapes your relationships.",                color: "#ec4899", level: "Beginner",     rating: 5, year: 2010, coverUrl: "https://covers.openlibrary.org/b/isbn/9781585429172-M.jpg" },
    { id: 14, category: "Relationships", title: "Set Boundaries, Find Peace",           author: "Nedra Tawwab",             desc: "Practical guide to setting healthy limits and building better relationships.",          color: "#db2777", level: "Beginner",     rating: 5, year: 2021, coverUrl: "https://covers.openlibrary.org/b/isbn/9780593192092-M.jpg" },
    { id: 15, category: "Self-Care",     title: "Lost Connections",                     author: "Johann Hari",              desc: "Why are so many people depressed? The surprising causes and unexpected solutions.",     color: "#10b981", level: "Beginner",     rating: 5, year: 2018, coverUrl: "https://covers.openlibrary.org/b/isbn/9781408878729-M.jpg" },
    { id: 16, category: "Anxiety",       title: "First, We Make the Beast Beautiful",   author: "Sarah Wilson",             desc: "A deeply personal and insightful exploration of living with anxiety.",                 color: "#7c3aed", level: "Beginner",     rating: 4, year: 2017, coverUrl: "https://covers.openlibrary.org/b/isbn/9780062842800-M.jpg" },
    { id: 17, category: "Mindfulness",   title: "The Power of Now",                     author: "Eckhart Tolle",            desc: "A guide to spiritual enlightenment and living in the present moment.",                 color: "#f59e0b", level: "Intermediate", rating: 5, year: 1997, coverUrl: "https://covers.openlibrary.org/b/isbn/9781577314806-M.jpg" },
    { id: 18, category: "Depression",    title: "An Unquiet Mind",                      author: "Kay Redfield Jamison",     desc: "A psychiatrist's memoir of living with bipolar disorder — honest and powerful.",       color: "#3b82f6", level: "Intermediate", rating: 5, year: 1995, coverUrl: "https://covers.openlibrary.org/b/isbn/9780679763307-M.jpg" },
    { id: 19, category: "Self-Care",     title: "Burnout",                              author: "Emily & Amelia Nagoski",   desc: "The secret to unlocking the stress cycle and escaping the overwhelm trap.",            color: "#10b981", level: "Beginner",     rating: 5, year: 2019, coverUrl: "https://covers.openlibrary.org/b/isbn/9781984818324-M.jpg" },
    { id: 20, category: "Motivation",    title: "Grit",                                 author: "Angela Duckworth",         desc: "Why passion and perseverance are more important than talent for success.",            color: "#d97706", level: "Beginner",     rating: 4, year: 2016, coverUrl: "https://covers.openlibrary.org/b/isbn/9781501111105-M.jpg" },
    { id: 21, category: "Mindfulness",   title: "Wherever You Go, There You Are",       author: "Jon Kabat-Zinn",           desc: "Mindfulness meditation in everyday life — a timeless classic.",                       color: "#6366f1", level: "Beginner",     rating: 5, year: 1994, coverUrl: "https://covers.openlibrary.org/b/isbn/9781401307783-M.jpg" },
    { id: 22, category: "Trauma",        title: "Waking the Tiger",                     author: "Peter A. Levine",          desc: "Healing trauma through the wisdom of the body — a somatic approach.",                  color: "#059669", level: "Intermediate", rating: 4, year: 1997, coverUrl: "https://covers.openlibrary.org/b/isbn/9781556432330-M.jpg" },
    { id: 23, category: "Anxiety",       title: "When Panic Attacks",                   author: "David D. Burns",           desc: "40 proven drug-free techniques to conquer anxiety, panic, and worry.",                 color: "#8b5cf6", level: "Beginner",     rating: 5, year: 2006, coverUrl: "https://covers.openlibrary.org/b/isbn/9780767920834-M.jpg" },
    { id: 24, category: "Motivation",    title: "The 7 Habits of Highly Effective People", author: "Stephen Covey",         desc: "Timeless principles of personal and professional effectiveness.",                      color: "#f59e0b", level: "Beginner",     rating: 5, year: 1989, coverUrl: "https://covers.openlibrary.org/b/isbn/9781982137274-M.jpg" },
    { id: 25, category: "Depression",    title: "Hello I Want to Die Please Fix Me",    author: "Anna Mehler Paperny",      desc: "A raw, honest, and darkly funny account of severe depression and survival.",           color: "#1d4ed8", level: "Intermediate", rating: 4, year: 2019, coverUrl: "https://covers.openlibrary.org/b/isbn/9781771644105-M.jpg" },
    { id: 26, category: "Relationships", title: "Hold Me Tight",                        author: "Sue Johnson",              desc: "Seven conversations for a lifetime of love — based on emotionally focused therapy.",   color: "#ec4899", level: "Beginner",     rating: 5, year: 2008, coverUrl: "https://covers.openlibrary.org/b/isbn/9780316113007-M.jpg" },
    { id: 27, category: "Self-Care",     title: "The Gifts of Imperfection",            author: "Brené Brown",              desc: "Let go of who you think you should be and embrace who you are.",                      color: "#10b981", level: "Beginner",     rating: 5, year: 2010, coverUrl: "https://covers.openlibrary.org/b/isbn/9781592858491-M.jpg" },
    { id: 28, category: "Stress",        title: "Full Catastrophe Living",              author: "Jon Kabat-Zinn",           desc: "Using the wisdom of your body and mind to face stress, pain, and illness.",            color: "#ef4444", level: "Intermediate", rating: 5, year: 1990, coverUrl: "https://covers.openlibrary.org/b/isbn/9780385303125-M.jpg" },
    { id: 29, category: "Mindfulness",   title: "The Miracle of Mindfulness",           author: "Thich Nhat Hanh",          desc: "A simple, beautiful introduction to mindfulness practice by a Zen master.",            color: "#06b6d4", level: "Beginner",     rating: 5, year: 1975, coverUrl: "https://covers.openlibrary.org/b/isbn/9780807012390-M.jpg" },
    { id: 30, category: "Trauma",        title: "Complex PTSD: From Surviving to Thriving", author: "Pete Walker",         desc: "A guide and map for recovering from childhood trauma and CPTSD.",                      color: "#8b5cf6", level: "Intermediate", rating: 5, year: 2013, coverUrl: "https://covers.openlibrary.org/b/isbn/9781492871842-M.jpg" },
    { id: 31, category: "Motivation",    title: "Mindset",                              author: "Carol S. Dweck",           desc: "The new psychology of success — fixed vs growth mindset explained.",                   color: "#d97706", level: "Beginner",     rating: 5, year: 2006, coverUrl: "https://covers.openlibrary.org/b/isbn/9780345472328-M.jpg" },
    { id: 32, category: "Anxiety",       title: "Rewire Your Anxious Brain",            author: "Catherine Pittman",        desc: "How to use the neuroscience of fear to end anxiety, panic, and worry.",               color: "#7c3aed", level: "Beginner",     rating: 4, year: 2015, coverUrl: "https://covers.openlibrary.org/b/isbn/9781626251137-M.jpg" },
  ];

  // ─────────────────────────────────────────────
  // PODCASTS (40+) — YouTube video format
  // ─────────────────────────────────────────────
  const podcasts = [
    // Raj Shamani
    { id: 101, category: "Mental Health",  title: "How to Deal With Loneliness",               host: "Raj Shamani",              youtubeId: "DzlJHjj16cM", desc: "Raj Shamani discusses loneliness, its root causes, and how to truly overcome it.", color: "#6366f1" },
    { id: 102, category: "Motivation",     title: "Stop Overthinking — Change Your Life",       host: "Raj Shamani",              youtubeId: "YWBuwJTuWGo", desc: "Practical tools to break the overthinking cycle and take control of your mind.",     color: "#f59e0b" },
    { id: 103, category: "Student Life",   title: "How to Deal with Failure",                   host: "Raj Shamani",              youtubeId: "4rpSmRU-Yi8", desc: "Raj Shamani on bouncing back from failure and using it as fuel for growth.",        color: "#ef4444" },
    { id: 104, category: "Mental Health",  title: "How to Stop Feeling Lost in Life",           host: "Raj Shamani",              youtubeId: "7uRyqg2NT-k", desc: "A guide to finding direction and purpose when life feels uncertain.",               color: "#8b5cf6" },
    { id: 105, category: "Motivation",     title: "Discipline Over Motivation",                 host: "Raj Shamani",              youtubeId: "NNH-RLNyzoM", desc: "Why motivation fades and how to build discipline that lasts.",                       color: "#d97706" },
    // Nikhil Kamath
    { id: 106, category: "Mental Health",  title: "Mental Health, Anxiety & Therapy in India",  host: "Nikhil Kamath",            youtubeId: "yTMYtcQLLaw", desc: "A candid conversation on mental health stigma and therapy in the Indian context.",   color: "#10b981" },
    { id: 107, category: "Motivation and business",     title: "Building Habits That Actually Stick",        host: "Nikhil Kamath",            youtubeId: "5k7sagWYWYA", desc: "Science-backed strategies on building lasting habits with discipline.",              color: "#f59e0b" },
    
    { id: 108, category: "Mental Health",  title: "Pain is your SuperPower",       host: "Nikhil Kamath",       youtubeId: "-DboQd1IBlE", desc: "Practical strategies to deal with anxiety and depression in modern life.",           color: "#3b82f6" },
    { id: 109, category: "Mindfulness",    title: "The Science of Meditation",                  host: "Raj Shamani",       youtubeId: "90lLQVZe2Nc", desc: "Deep dive into how meditation rewires the brain for peace and focus.",              color: "#06b6d4" },
    { id: 110, category: "Motivation",     title: "How to Find Your Purpose",                   host: "Jay shetty",       youtubeId: "MOVQponoBmI", desc: "Discovering your life's calling and the actions needed to pursue it.",              color: "#d97706" },
    // Sandeep Maheshwari
    { id: 111, category: "Motivation",     title: "Jay Shetty on  Success & Happiness",       host: "Jay Shetty",       youtubeId: "LAmGfokvgzA", desc: "Life lessons, success mindset, and rising from rock bottom with purpose.",          color: "#ef4444" },
    { id: 112, category: "Mental Health",  title: "How to Overcome Fear",                       host: "Sandeep Maheshwari",       youtubeId: "4bxLweqzeZw", desc: "Sandeep's powerful session on overcoming fear and self-doubt in life.",             color: "#8b5cf6" },
    { id: 113, category: "Student Life",   title: "Stop Comparing Yourself",                    host: "Sandeep Maheshwari",       youtubeId: "QTjENitMJ00", desc: "Why comparing yourself with others destroys your peace — and how to stop.",         color: "#6366f1" },
    // Huberman Lab
    { id: 114, category: "Mental Health",  title: "How to Improve Mental Health with Tools",    host: "Dr. Andrew Huberman",      youtubeId: "qUz93CyNIz0", desc: "Science-based tools for managing stress, anxiety, and mental performance.",         color: "#10b981" },
    { id: 115, category: "Self-Care",      title: "Master Your Sleep & Be More Alert",          host: "Dr. Andrew Huberman",      youtubeId: "nm1TxQj9IsQ", desc: "The neuroscience of sleep cycles and evidence-based tools for better rest.",         color: "#06b6d4" },
    { id: 116, category: "Mental Health",  title: "Controlling Stress in Real Time",            host: "Dr. Andrew Huberman",      youtubeId: "tybOi4hjZFQ", desc: "Physiological and psychological tools to reduce stress fast.",                      color: "#ef4444" },
    // Jay Shetty
    { id: 117, category: "Mindfulness",    title: "How to Train Your Mind Like a Monk",         host: "Jay Shetty",               youtubeId: "tD3S48RiSdA", desc: "Ancient wisdom meets modern life — build focus, calm and inner purpose.",           color: "#f59e0b" },
    { id: 118, category: "Relationships",  title: "How to Love Yourself First",                 host: "Jay Shetty",               youtubeId: "8FKNUuh8JF4", desc: "Build self-worth and healthier relationships through self-love practices.",          color: "#ec4899" },
    { id: 119, category: "Mental Health",  title: "Breaking the Cycle of Negative Thinking",    host: "Jay Shetty",               youtubeId: "8MUfv497OSA", desc: "Practical exercises to stop rumination and cultivate a positive mindset.",          color: "#8b5cf6" },
    // Brené Brown
    { id: 120, category: "Self-Care",      title: "The Power of Vulnerability",                 host: "Brené Brown",              youtubeId: "iCvmsMzlF7o", desc: "How embracing vulnerability leads to more meaningful connection and courage.",       color: "#10b981" },
    { id: 121, category: "Mental Health",  title: "Embracing Shame and Building Resilience",    host: "Brené Brown",              youtubeId: "psN1DORYYV0", desc: "Understanding shame, how to recognize it, and build resilience against it.",        color: "#059669" },
    // Tim Ferriss
    { id: 122, category: "Motivation",     title: "Fear-Setting — The Most Valuable Exercise",  host: "Tim Ferriss",              youtubeId: "o7EVMjgsSME", desc: "Stoic exercise to define your fears and take action despite them.",                 color: "#d97706" },
    // Simon Sinek
    { id: 123, category: "Motivation",     title: "How Great Leaders Inspire Action",           host: "Simon Sinek",              youtubeId: "qp0HIF3SfI4", desc: "The Golden Circle — Start with Why. Leadership and purpose.",                       color: "#3b82f6" },
    { id: 124, category: "Mental Health",  title: "Millennials in the Workplace & Mental Health", host: "Simon Sinek",            youtubeId: "hER0Qp6QJNU", desc: "Why younger generations struggle with engagement, purpose, and mental health.",      color: "#1d4ed8" },
    // Sadhguru
    { id: 125, category: "Mindfulness",    title: "How to Stop Suffering",                      host: "Sadhguru",                 youtubeId: "0vOwBb-w0Qc", desc: "Ancient yogic wisdom on creating a life free from unnecessary suffering.",           color: "#06b6d4" },
    { id: 126, category: "Mental Health",  title: "Managing Emotions — The Inner Engineering",  host: "Sadhguru",                 youtubeId: "YOV8lupp0uU", desc: "How to manage your emotions consciously rather than reactively.",                   color: "#8b5cf6" },
    // Robin Sharma
    { id: 127, category: "Motivation",     title: "The 5 AM Club — Morning Routine",            host: "Robin Sharma",             youtubeId: "bFU1hiNfDX4", desc: "How the morning routine can transform your productivity, health and mindset.",       color: "#f59e0b" },
    // Vishen Lakhiani (Mindvalley)
    { id: 128, category: "Mindfulness",    title: "The Silva Method — Superhuman Mind",         host: "Vishen Lakhiani",          youtubeId: "1zu-FXf9qFI", desc: "Mind training techniques for focus, creativity, and peak performance.",             color: "#ec4899" },
    // Dr. Gabor Maté
    { id: 129, category: "Mental Health",  title: "The Power of Addiction and The Addiction of Power", host: "Dr. Gabor Maté",   youtubeId: "66cYcSak6nE", desc: "Deep dive into trauma, addiction, and how they are rooted in emotional pain.",       color: "#ef4444" },
    { id: 130, category: "Self-Care",      title: "Trauma and the Body",                        host: "Dr. Gabor Maté",           youtubeId: "d_Kt19bGi78", desc: "How unresolved trauma lives in the body and the path to healing.",                  color: "#10b981" },
    // Dr. Daniel Amen
    { id: 131, category: "Mental Health",  title: "Change Your Brain Change Your Life",         host: "Dr. Daniel Amen",          youtubeId: "MLKj1puoWCg", desc: "Brain health strategies to improve mood, memory, focus, and happiness.",            color: "#6366f1" },
    // Jordan Peterson
    { id: 132, category: "Motivation",     title: "Clean Your Room — Life Advice",              host: "Jordan Peterson",          youtubeId: "Vp9599kwnhM", desc: "Start with small order — how organizing your space transforms your mind.",           color: "#d97706" },
    // Marie Forleo
    { id: 133, category: "Self-Care",      title: "Everything is Figureoutable",                host: "Marie Forleo",             youtubeId: "piQQ1GkBmuQ", desc: "Build the belief that any problem can be solved with resourcefulness and resilience.", color: "#ec4899" },
    // Mel Robbins
    { id: 134, category: "Motivation",     title: "The 5 Second Rule — Stop Procrastinating",   host: "Mel Robbins",              youtubeId: "PWE4haP88Gw", desc: "A simple counting technique that beats hesitation and builds confidence instantly.",  color: "#f59e0b" },
    { id: 135, category: "Mental Health",  title: "How to Stop Worrying and Start Living",      host: "Mel Robbins",              youtubeId: "Cp6Kd-JAMRo", desc: "Science-backed strategies to break the worry loop and regain control.",             color: "#ef4444" },
    // Matthew McConaughey
    { id: 136, category: "Motivation",     title: "How to Be in the Present Moment",            host: "Matthew McConaughey",      youtubeId: "u8OySa4uZmU", desc: "Life lessons on living fully in the present and finding joy in the journey.",       color: "#d97706" },
    // Naval Ravikant
    { id: 137, category: "Self-Care",      title: "How to Get Rich Without Getting Lucky",      host: "Naval Ravikant",           youtubeId: "1-TZqOsVCNM", desc: "Mental models on happiness, wealth, and living a life of meaning and freedom.",     color: "#10b981" },
    // Dr. Robert Sapolsky
    { id: 138, category: "Mental Health",  title: "The Biology of Humans at Their Best and Worst", host: "Dr. Robert Sapolsky",  youtubeId: "GRYcSuyLiJk", desc: "Biology and neuroscience behind human behavior, stress, and mental health.",        color: "#3b82f6" },
    // Ankur Warikoo
    { id: 139, category: "Student Life",   title: "How to Stop Wasting Time",                   host: "Ankur Warikoo",            youtubeId: "7KBxvfz4mQk", desc: "Practical strategies to use your time intentionally and stop feeling busy but unproductive.", color: "#8b5cf6" },
    { id: 140, category: "Student Life",   title: "What I Wish I Knew at 22",                   host: "Ankur Warikoo",            youtubeId: "5dVmzw1Xbao", desc: "Life and career lessons for young adults — honest, practical, inspiring.",          color: "#6366f1" },
    // Ishan Sharma
    { id: 141, category: "Student Life",   title: "How to Study Smarter Not Harder",            host: "Ishan Sharma",             youtubeId: "p60rN9JEapg", desc: "Evidence-based study techniques for Indian students to maximize performance.",       color: "#10b981" },
    // Sahil Bloom
    { id: 142, category: "Motivation",     title: "The 5 Types of Wealth",                      host: "Sahil Bloom",              youtubeId: "NegTHmVuepk", desc: "Redefining success beyond money — time, health, relationships, and purpose.",       color: "#f59e0b" },
    { id: 143, category: "Relationships",  title: "The Science of Building Deep Relationships",  host: "Sahil Bloom",              youtubeId: "OBwMMLC3L0g", desc: "How to build meaningful, lasting relationships in a disconnected world.",            color: "#ec4899" },
    { id: 144, category: "Mental Health",  title: "How to Deal with Rejection",                 host: "TEDx Talks",              youtubeId: "8yBfAeadqjI", desc: "Reframing rejection as redirection and building emotional resilience.",              color: "#8b5cf6" },
  ];

  // ─────────────────────────────────────────────
  // VIDEOS (30+) — fixed broken ones
  // ─────────────────────────────────────────────
  const videos = [
    // FIXED: replaced broken videos
    { id: 201, category: "Depression",    title: "Depression — the secret we share",             host: "Andrew Solomon",           duration: "30 min", youtubeId: "-eBUcBfkVCo", color: "#3b82f6" }, // fixed ID
    { id: 202, category: "Stress",        title: "How to make stress your friend",                host: "Kelly McGonigal",          duration: "15 min", youtubeId: "RcGyVTAoXEU", color: "#8b5cf6" },
    { id: 203, category: "Self-Care",     title: "The Power of Vulnerability",                   host: "Brené Brown",              duration: "20 min", youtubeId: "iCvmsMzlF7o", color: "#10b981" },
    { id: 204, category: "Sleep",         title: "Sleep is your superpower",                     host: "Matt Walker",              duration: "20 min", youtubeId: "5MuIMqhT8DM", color: "#06b6d4" },
    { id: 205, category: "Motivation",    title: "The puzzle of motivation",                     host: "Dan Pink",                 duration: "18 min", youtubeId: "rrkrvAUbU9Y", color: "#f59e0b" },
    { id: 206, category: "Relationships", title: "The Secret to a Happy Life",                   host: "Robert Waldinger",         duration: "13 min", youtubeId: "8KkKuTCFvzI", color: "#ec4899" },
    { id: 207, category: "Anxiety",       title: "Future of Mental Health — Anxiety",           host: "Tracy Dennis-Tiwary",      duration: "20 min", youtubeId: "GMnyt9wFyxA", color: "#8b5cf6" }, // fixed ID
    { id: 208, category: "Depression",    title: "I had a black dog, his name was depression",   host: "World Health Org",         duration: "4 min",  youtubeId: "XiCrniLQGYc", color: "#3b82f6" },
    { id: 209, category: "Self-Care",     title: "This could be why you are depressed",          host: "Johann Hari",              duration: "22 min", youtubeId: "MB5IX-np5fE", color: "#10b981" },
    { id: 210, category: "Motivation",    title: "Grit — power of passion and perseverance",     host: "Angela Duckworth",         duration: "6 min",  youtubeId: "H14bBuluwB8", color: "#d97706" },
    { id: 211, category: "Sleep",         title: "Why do we sleep?",                             host: "Russell Foster",           duration: "21 min", youtubeId: "LWULB9Aoopc", color: "#0891b2" },
    { id: 212, category: "Anxiety",       title: "How to cope with anxiety",                     host: "Olivia Remes",             duration: "14 min", youtubeId: "WWloIAQpMcQ", color: "#7c3aed" },
    // Additional videos
    { id: 213, category: "Mindfulness",   title: "All it takes is 10 mindful minutes",           host: "Andy Puddicombe",          duration: "10 min", youtubeId: "qzR62JJCMBQ", color: "#06b6d4" },
    { id: 214, category: "Motivation",    title: "The happy secret to better work",              host: "Shawn Achor",              duration: "12 min", youtubeId: "fLJsdqxnZb0", color: "#f59e0b" },
    { id: 215, category: "Stress",        title: "How to stay calm when you know you'll be stressed", host: "Daniel Levitin",     duration: "12 min", youtubeId: "rkZl2gsLUp4", color: "#ef4444" },
    { id: 216, category: "Self-Care",     title: "Want to be happy? Be grateful",                host: "David Steindl-Rast",       duration: "14 min", youtubeId: "UtBsl3j0YRQ", color: "#10b981" },
    { id: 217, category: "Anxiety",       title: "A powerful way to ease panic & anxiety",       host: "Judson Brewer",            duration: "11 min", youtubeId: "-moW9jvvMr4", color: "#6366f1" },
    { id: 218, category: "Relationships", title: "Why we love, why we cheat",                   host: "Helen Fisher",             duration: "16 min", youtubeId: "x-ewvCNguug", color: "#ec4899" },
    { id: 219, category: "Depression",    title: "The gift and power of emotional courage",      host: "Susan David",              duration: "17 min", youtubeId: "NDQ1Mi5I4rg", color: "#1d4ed8" },
    { id: 220, category: "Mindfulness",   title: "How meditation can reshape our brains",       host: "Sara Lazar",               duration: "8 min",  youtubeId: "m8rRzTtP7Tc", color: "#8b5cf6" },
    { id: 221, category: "Motivation",    title: "The surprising science of happiness",          host: "Dan Gilbert",              duration: "21 min", youtubeId: "4q1dgn_C0AU", color: "#d97706" },
    { id: 222, category: "Sleep",         title: "The brain benefits of deep sleep",             host: "Jeff Iliff",               duration: "11 min", youtubeId: "MJK-dMlATmM", color: "#0891b2" },
    { id: 223, category: "Stress",        title: "How to manage your nervous system",           host: "Justin Sung",              duration: "10 min", youtubeId: "u6ks5OCQR9I", color: "#ef4444" },
    { id: 224, category: "Self-Care",     title: "The art of being yourself",                   host: "Caroline McHugh",          duration: "26 min", youtubeId: "veEQQ-N9xWU", color: "#059669" },
    { id: 225, category: "Depression",    title: "Lifting the veil on perfectionism",           host: "Brené Brown",              duration: "6 min",  youtubeId: "RZWf2_2L2v8", color: "#3b82f6" },
    { id: 226, category: "Anxiety",       title: "The skill of self confidence",                host: "Ivan Joseph",              duration: "13 min", youtubeId: "w-HYZv6HzAs", color: "#7c3aed" },
    { id: 227, category: "Mindfulness",   title: "The surprising connection between happiness and breathing", host: "Max Strom", duration: "8 min", youtubeId: "NGZFdKxOzmw", color: "#06b6d4" },
    { id: 228, category: "Motivation",    title: "Succeed at whatever you choose",              host: "Angela Duckworth",         duration: "7 min",  youtubeId: "XFl8U0rGnKI", color: "#f59e0b" },
    { id: 229, category: "Relationships", title: "How to speak so that people want to listen",  host: "Julian Treasure",         duration: "10 min", youtubeId: "eIho2S0ZahI", color: "#ec4899" },
    { id: 230, category: "Self-Care",     title: "3 ways to stop being hard on yourself",       host: "Kristin Neff",             duration: "18 min", youtubeId: "qaeFnxSfSC4", color: "#10b981" },
    { id: 231, category: "Self-Care",        title: "Attract Anything You want", host: "Jay Shetty",       duration: "24 min", youtubeId: "hQTL0ph-usE", color: "#dc2626" },
    { id: 232, category: "Depression",    title: "Depression in college students",              host: "GradeHacker",           duration: "10 min", youtubeId: "Gg6g3El0MIE", color: "#1d4ed8" },
  ];

  // ─────────────────────────────────────────────
  // ARTICLES — original 15 + 25 new = 40
  // ─────────────────────────────────────────────
  const articles = [
    // Original 15
    { id: 301, category: "Anxiety",        title: "What Anxiety Actually Feels Like",             source: "Psychology Today",          readTime: "8 min",  link: "https://www.psychologytoday.com/us/basics/anxiety",                                     color: "#8b5cf6" },
    { id: 302, category: "Depression",     title: "The Neuroscience of Depression",               source: "Harvard Health",             readTime: "10 min", link: "https://www.health.harvard.edu/mind-and-mood/what-causes-depression",                   color: "#3b82f6" },
    { id: 303, category: "Sleep",          title: "Sleep and Mental Health",                      source: "Sleep Foundation",           readTime: "7 min",  link: "https://www.sleepfoundation.org/mental-health",                                        color: "#06b6d4" },
    { id: 304, category: "Stress",         title: "Chronic Stress and Your Brain",                source: "APA",                        readTime: "6 min",  link: "https://www.apa.org/topics/stress/body",                                               color: "#ef4444" },
    { id: 305, category: "Self-Care",      title: "The Science of Self-Compassion",               source: "Greater Good (UC Berkeley)", readTime: "9 min",  link: "https://greatergood.berkeley.edu/topic/self-compassion",                               color: "#10b981" },
    { id: 306, category: "Motivation",     title: "The Science of Goal Setting",                  source: "Positive Psychology",        readTime: "12 min", link: "https://positivepsychology.com/goal-setting-theory/",                                  color: "#f59e0b" },
    { id: 307, category: "Relationships",  title: "Attachment Styles and Mental Health",          source: "Verywell Mind",              readTime: "8 min",  link: "https://www.verywellmind.com/attachment-styles-2795344",                               color: "#ec4899" },
    { id: 308, category: "Anxiety",        title: "CBT for Anxiety — A Complete Guide",           source: "NIMH",                       readTime: "15 min", link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",                             color: "#7c3aed" },
    { id: 309, category: "Depression",     title: "Exercise as Treatment for Depression",         source: "Mayo Clinic",                readTime: "5 min",  link: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression-and-exercise/art-20046495", color: "#1d4ed8" },
    { id: 310, category: "Self-Care",      title: "Mindfulness in Daily Life",                    source: "Mindful Magazine",           readTime: "7 min",  link: "https://www.mindful.org/mindfulness-how-to-do-it/",                                    color: "#059669" },
    { id: 311, category: "Stress",         title: "Burnout — Signs, Causes and Recovery",        source: "WHO",                        readTime: "10 min", link: "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases", color: "#dc2626" },
    { id: 312, category: "Sleep",          title: "Sleep Hygiene — Complete Guide",               source: "CDC",                        readTime: "6 min",  link: "https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod6/08.html",       color: "#0891b2" },
    { id: 313, category: "Motivation",     title: "Growth Mindset vs Fixed Mindset",              source: "Stanford Psychology",        readTime: "8 min",  link: "https://www.mindsetworks.com/science/",                                                color: "#d97706" },
    { id: 314, category: "Relationships",  title: "How to Communicate in Relationships",          source: "Gottman Institute",          readTime: "11 min", link: "https://www.gottman.com/blog/the-four-horsemen-recognizing-criticism-contempt-defensiveness-and-stonewalling/", color: "#db2777" },
    { id: 315, category: "Anxiety",        title: "Panic Attacks — What They Are",                source: "Mind UK",                    readTime: "9 min",  link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/panic-attacks/", color: "#6366f1" },
    // 25 New Articles
    { id: 316, category: "Mindfulness",    title: "How to Start a Mindfulness Practice",          source: "Headspace",                  readTime: "8 min",  link: "https://www.headspace.com/mindfulness/how-to-start-a-mindfulness-practice",            color: "#06b6d4" },
    { id: 317, category: "Depression",     title: "Understanding Seasonal Affective Disorder",    source: "NIH",                        readTime: "10 min", link: "https://www.nimh.nih.gov/health/topics/seasonal-affective-disorder",                  color: "#3b82f6" },
    { id: 318, category: "Motivation",     title: "The Neuroscience of Procrastination",          source: "Psychology Today",           readTime: "9 min",  link: "https://www.psychologytoday.com/us/basics/procrastination",                           color: "#f59e0b" },
    { id: 319, category: "Self-Care",      title: "Why Gratitude Is Good for Your Health",        source: "Greater Good (UC Berkeley)", readTime: "7 min",  link: "https://greatergood.berkeley.edu/topic/gratitude/definition",                         color: "#10b981" },
    { id: 320, category: "Anxiety",        title: "Social Anxiety Disorder Explained",            source: "ADAA",                       readTime: "8 min",  link: "https://adaa.org/understanding-anxiety/social-anxiety-disorder",                      color: "#8b5cf6" },
    { id: 321, category: "Relationships",  title: "10 Signs of Emotionally Healthy Relationships", source: "Verywell Mind",             readTime: "7 min",  link: "https://www.verywellmind.com/characteristics-of-healthy-relationships-5207292",       color: "#ec4899" },
    { id: 322, category: "Sleep",          title: "The Effects of Blue Light on Sleep",           source: "Harvard Health",             readTime: "6 min",  link: "https://www.health.harvard.edu/staying-healthy/blue-light-has-a-dark-side",           color: "#0891b2" },
    { id: 323, category: "Stress",         title: "Resilience — the Art of Bouncing Back",        source: "APA",                        readTime: "10 min", link: "https://www.apa.org/topics/resilience",                                                color: "#ef4444" },
    { id: 324, category: "Mindfulness",    title: "Body Scan Meditation — A Complete Guide",      source: "Mindful Magazine",           readTime: "9 min",  link: "https://www.mindful.org/beginners-body-scan-meditation/",                             color: "#7c3aed" },
    { id: 325, category: "Depression",     title: "What Therapy Is Right for Me?",                source: "Psychology Today",           readTime: "12 min", link: "https://www.psychologytoday.com/us/blog/progress-notes/202101/which-therapy-is-right-you", color: "#1d4ed8" },
    { id: 326, category: "Student Life",   title: "Student Mental Health Crisis Explained",       source: "American Psychological Association", readTime: "10 min", link: "https://www.apa.org/topics/college",                                    color: "#6366f1" },
    { id: 327, category: "Self-Care",      title: "Digital Detox — How and Why to Try It",        source: "Verywell Mind",              readTime: "7 min",  link: "https://www.verywellmind.com/why-and-how-to-do-a-digital-detox-4771321",             color: "#059669" },
    { id: 328, category: "Motivation",     title: "The Science Behind Building Habits",           source: "Clear Habit Journal",        readTime: "11 min", link: "https://jamesclear.com/habit-stacking",                                                color: "#d97706" },
    { id: 329, category: "Anxiety",        title: "Generalized Anxiety — Symptoms and Treatment", source: "NIMH",                      readTime: "9 min",  link: "https://www.nimh.nih.gov/health/topics/generalized-anxiety-disorder",                 color: "#6366f1" },
    { id: 330, category: "Relationships",  title: "The Four Horsemen of Relationship Failure",   source: "Gottman Institute",          readTime: "8 min",  link: "https://www.gottman.com/blog/the-four-horsemen-recognizing-criticism-contempt-defensiveness-and-stonewalling/", color: "#db2777" },
    { id: 331, category: "Sleep",          title: "Insomnia — Causes and How to Overcome It",    source: "Mayo Clinic",                readTime: "8 min",  link: "https://www.mayoclinic.org/diseases-conditions/insomnia/symptoms-causes/syc-20355167", color: "#06b6d4" },
    { id: 332, category: "Mindfulness",    title: "The Science of Breathing and the Brain",      source: "Scientific American",        readTime: "10 min", link: "https://www.scientificamerican.com/article/why-breathing-is-so-effective-at-reducing-stress/", color: "#8b5cf6" },
    { id: 333, category: "Depression",     title: "Loneliness as a Public Health Crisis",         source: "Harvard T.H. Chan",          readTime: "9 min",  link: "https://www.hsph.harvard.edu/news/features/loneliness-epidemic-health-impacts/",       color: "#3b82f6" },
    { id: 334, category: "Motivation",     title: "Intrinsic vs Extrinsic Motivation",            source: "Positive Psychology",        readTime: "10 min", link: "https://positivepsychology.com/intrinsic-motivation-examples/",                        color: "#f59e0b" },
    { id: 335, category: "Student Life",   title: "How to Manage Study Stress Effectively",      source: "BetterHelp",                 readTime: "7 min",  link: "https://www.betterhelp.com/advice/stress/dealing-with-college-stress/",               color: "#10b981" },
    { id: 336, category: "Self-Care",      title: "What Is Emotional Intelligence?",             source: "Psychology Today",           readTime: "8 min",  link: "https://www.psychologytoday.com/us/basics/emotional-intelligence",                     color: "#059669" },
    { id: 337, category: "Anxiety",        title: "How to Stop Catastrophic Thinking",           source: "Verywell Mind",              readTime: "8 min",  link: "https://www.verywellmind.com/catastrophic-thinking-2584188",                          color: "#7c3aed" },
    { id: 338, category: "Relationships",  title: "Codependency — Signs and Recovery",           source: "Psychology Today",           readTime: "9 min",  link: "https://www.psychologytoday.com/us/basics/codependency",                              color: "#ec4899" },
    { id: 339, category: "Stress",         title: "The Stress Response — Fight or Flight",       source: "Harvard Health",             readTime: "7 min",  link: "https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response",    color: "#dc2626" },
    { id: 340, category: "Student Life",   title: "Imposter Syndrome — What It Is and How to Beat It", source: "Harvard Business Review", readTime: "11 min", link: "https://hbr.org/2021/02/stop-telling-women-they-have-imposter-syndrome",         color: "#6366f1" },
  ];

  // ─────────────────────────────────────────────
  // EXERCISES (unchanged)
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // STUDENTS — existing tips + new content + videos
  // ─────────────────────────────────────────────
  const students = [
    // Original tips
    { id: 501, type: "tip", category: "Study",        title: "Pomodoro Technique",               desc: "Study 25 min, break 5 min. After 4 cycles take a 30-min break. Proven to boost focus.", emoji: "🍅", color: "#ef4444", tips: ["Set timer for 25 minutes", "Full focus — no distractions", "5 min break — move around", "After 4 cycles: 30 min break"] },
    { id: 502, type: "tip", category: "Study",        title: "Active Recall Method",              desc: "Test yourself instead of re-reading. The most effective study technique backed by research.", emoji: "🧠", color: "#4f46e5", tips: ["Read once then close book", "Write everything you remember", "Check what you missed", "Review after 1, 3, 7 days"] },
    { id: 503, type: "tip", category: "Study",        title: "Spaced Repetition",                 desc: "Review material at increasing intervals — dramatically improves long-term retention.", emoji: "📅", color: "#8b5cf6", tips: ["Review after 1 day", "Then after 3 days", "Then 1 week", "Then 1 month"] },
    { id: 504, type: "tip", category: "Study",        title: "Cornell Note-Taking System",        desc: "The most effective note-taking method used by top universities worldwide.", emoji: "📝", color: "#10b981", tips: ["Divide page into 3 sections", "Notes right, keywords left", "Summary at bottom", "Review within 24 hours"] },
    { id: 505, type: "tip", category: "Exam Stress",  title: "Pre-Exam Anxiety Relief",           desc: "A 5-minute routine to calm exam nerves and enter the hall with confidence.", emoji: "😤", color: "#f97316", tips: ["Box breathing for 2 minutes", "Power pose for 60 seconds", "Tell yourself: I am prepared", "Arrive 15 minutes early"] },
    { id: 506, type: "tip", category: "Exam Stress",  title: "Night Before Exam Routine",         desc: "What to do (and not do) the night before a big exam for optimal performance.", emoji: "🌙", color: "#6366f1", tips: ["Stop studying by 9pm", "Light revision only", "Sleep 7-8 hours minimum", "Prepare everything the night before"] },
    { id: 507, type: "tip", category: "Exam Stress",  title: "During Exam Techniques",            desc: "Stay calm and perform your best when it actually counts during the exam.", emoji: "✏️", color: "#7c3aed", tips: ["Read all questions first", "Start with what you know", "Deep breath if panicking", "Use all your time"] },
    { id: 508, type: "tip", category: "Student Life", title: "Dealing with Academic Pressure",    desc: "You are not alone. Handle pressure from family, peers, and yourself.", emoji: "💪", color: "#22c55e", tips: ["Talk to someone you trust", "Set realistic expectations", "Focus on progress not perfection", "Take breaks without guilt"] },
    { id: 509, type: "tip", category: "Student Life", title: "Hostel Life and Loneliness",        desc: "Being away from home is hard. Build connections and feel less alone.", emoji: "🏠", color: "#3b82f6", tips: ["Introduce yourself to neighbors", "Join one club or activity", "Call home regularly", "Create a comfortable space"] },
    { id: 510, type: "tip", category: "Student Life", title: "Study-Life Balance",                desc: "Enjoy student life while keeping up with academics — guilt free.", emoji: "⚖️", color: "#ec4899", tips: ["Schedule fun like study", "Protect 1 hour daily for yourself", "Rest is part of success", "Say no to guilt"] },
    { id: 511, type: "tip", category: "Productivity", title: "Building a Study Schedule",         desc: "Create a realistic weekly study plan that you will actually stick to.", emoji: "📆", color: "#f59e0b", tips: ["Find your peak focus hours", "Schedule hard subjects then", "Include buffer time", "Review every Sunday"] },
    { id: 512, type: "tip", category: "Productivity", title: "Eliminating Distractions",          desc: "Create a distraction-free study environment in the age of smartphones.", emoji: "📵", color: "#64748b", tips: ["Phone in another room", "Use Forest or Freedom app", "Study with lo-fi music", "Tell others not to disturb"] },
    { id: 513, type: "tip", category: "Career",       title: "Managing Career Anxiety",           desc: "Feeling lost about your future is normal. Navigate it without burning out.", emoji: "🧭", color: "#8b5cf6", tips: ["Focus on skills not titles", "Talk to seniors in your field", "Internships clarify confusion", "Your path is not fixed"] },
    { id: 514, type: "tip", category: "Career",       title: "Imposter Syndrome in Students",     desc: "Feeling like a fraud despite achievements? Learn how to overcome it.", emoji: "🎭", color: "#ec4899", tips: ["Affects even the most successful", "Track achievements in writing", "Share feelings with peers", "Competence grows with experience"] },
    { id: 515, type: "tip", category: "Career",       title: "Dealing with Comparison Culture",   desc: "Stop comparing your chapter 1 to someone else's chapter 10.", emoji: "🪞", color: "#06b6d4", tips: ["Unfollow accounts that hurt", "Track your own progress", "Everyone's timeline is different", "Your worth is not your grades"] },
    { id: 516, type: "tip", category: "Study",        title: "Mind Mapping for Complex Topics",   desc: "Visual note-taking that connects ideas and improves understanding and memory.", emoji: "🗺️", color: "#4f46e5", tips: ["Start with central topic", "Branch out to subtopics", "Use colors and images", "Review and add connections"] },
    { id: 517, type: "tip", category: "Exam Stress",  title: "Managing Results Day Anxiety",      desc: "Whether results are good or bad — how to process them with perspective.", emoji: "📊", color: "#f59e0b", tips: ["Results do not define your worth", "One result is not your future", "Process emotions first", "Then make a plan if needed"] },
    { id: 518, type: "tip", category: "Student Life", title: "5-Min Study Break Meditation",      desc: "A quick mindfulness reset between study sessions to maintain focus all day.", emoji: "🧘", color: "#8b5cf6", tips: ["Set timer for 5 minutes", "Close eyes and breathe", "Let thoughts pass", "Return refreshed and focused"] },
    { id: 519, type: "tip", category: "Productivity", title: "Morning Routine for Students",      desc: "Start your day with this 20-minute routine to maximize focus and clarity.", emoji: "🌅", color: "#f97316", tips: ["Wake up same time daily", "10 min movement", "Healthy breakfast", "Review top 3 priorities"] },
    { id: 520, type: "tip", category: "Study",        title: "A Mind for Numbers — Key Ideas",    desc: "Barbara Oakley's top insights on how to excel at difficult subjects.", emoji: "🔢", color: "#6366f1", tips: ["Alternate focused and diffuse thinking", "Practice beats talent", "Memory palace for complex concepts", "Struggle is part of learning"] },
    // New tips
    { id: 521, type: "tip", category: "Student Life", title: "Managing Social Media Pressure",    desc: "Social media can trigger FOMO, comparison, and anxiety. Here's how to use it mindfully.", emoji: "📱", color: "#7c3aed", tips: ["Set daily screen time limits", "Follow accounts that inspire not depress", "Take a 7-day detox monthly", "Remember it's only their highlights"] },
    { id: 522, type: "tip", category: "Exam Stress",  title: "Overcoming Exam Day Panic",         desc: "Brain freeze during exams is common. Use these techniques to recover quickly.", emoji: "❄️", color: "#0891b2", tips: ["Stop and breathe slowly for 30 sec", "Move to an easier question", "Write what you do know", "Your brain is working — trust it"] },
    { id: 523, type: "tip", category: "Productivity", title: "Energy Management for Students",    desc: "Managing your energy is more important than managing your time.", emoji: "⚡", color: "#d97706", tips: ["Track your peak energy times", "Match tasks to energy levels", "Sleep is non-negotiable", "Fuel with good food and water"] },
    { id: 524, type: "tip", category: "Career",       title: "Building Your LinkedIn as a Student", desc: "Start your professional presence early — it opens doors before you graduate.", emoji: "💼", color: "#3b82f6", tips: ["Add a professional photo", "Write a clear summary section", "List projects not just grades", "Connect with professors and alumni"] },
    { id: 525, type: "tip", category: "Study",        title: "Feynman Technique for Deep Learning", desc: "Explain it like you're teaching a child — the most powerful way to truly understand anything.", emoji: "🎓", color: "#ef4444", tips: ["Choose a concept to learn", "Explain it in simple words", "Identify gaps in your explanation", "Simplify until a child could understand"] },
    // Student Videos
    { id: 601, type: "video", category: "Videos", title: "How to Study Smarter Not Harder",         host: "Ishan Sharma",    duration: "18 min", youtubeId: "p60rN9JEapg", color: "#10b981",  desc: "Evidence-backed study strategies for Indian students." },
    { id: 602, type: "video", category: "Videos", title: "The Complete Study Motivation Guide",      host: "Thomas Frank",    duration: "10:51 min", youtubeId: "TXuWFOE7rM8", color: "#3b82f6",  desc: "How to stay motivated throughout the semester, not just before exams." },
    { id: 603, type: "video", category: "Videos", title: "Stop Procrastinating Right Now",           host: "Improvement Pill", duration: "6:10 min", youtubeId: "mytC-W7ONoQ", color: "#ef4444",  desc: "The psychology behind procrastination and how to beat it instantly." },
    { id: 604, type: "video", category: "Videos", title: "How to Deal with Exam Anxiety",            host: "Psych2Go",        duration: "6 min",  youtubeId: "s9zZr2KRvzs", color: "#8b5cf6",  desc: "6 proven techniques to reduce exam-time anxiety and fear." },
    { id: 605, type: "video", category: "Videos", title: "What I Wish I Knew at 22",                 host: "Ankur Warikoo",   duration: "19 min", youtubeId: "5dVmzw1Xbao", color: "#f59e0b",  desc: "Honest life and career lessons every young adult needs to hear." },
    { id: 606, type: "video", category: "Videos", title: "The Secret to Studying in College",        host: "Mike and Matty", duration: "10 min", youtubeId: "IlU-zDU6aQ0", color: "#6366f1",  desc: "How top students actually study — and it is not what you think." },
    { id: 607, type: "video", category: "Videos", title: "How to Build Self Discipline as a Student", host: "Thomas Frank",    duration: "11:40 min", youtubeId: "X3vRK2P9lSU", color: "#ec4899",  desc: "Practical steps to build discipline when motivation runs dry." },
    { id: 608, type: "video", category: "Videos", title: "Managing Loneliness in Hostel or College", host: "Psych2Go",       duration: "7 min",  youtubeId: "n3Xv_g3g-mA", color: "#06b6d4",  desc: "Understanding and coping with loneliness in student life." },
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
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      r.title?.toLowerCase().includes(q) ||
      r.desc?.toLowerCase().includes(q) ||
      r.author?.toLowerCase().includes(q) ||
      r.host?.toLowerCase().includes(q) ||
      r.source?.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

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

      {/* Dropdowns */}
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
              setExpandedVideo(null);
              setExpandedTips(null);
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
            <p>Study techniques, exam stress relief, hostel life tips, career guidance, and videos.</p>
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
        <div className={`sugGrid ${activeTab === "videos" ? "videosGrid" : ""} ${activeTab === "books" ? "booksGrid" : ""}`}>

          {/* ── BOOKS with photos ── */}
          {activeTab === "books" && filtered.map((b) => (
            <div key={b.id} className="bookCard bookCardPhoto">
              <div className="bookCoverWrap">
                <img
                  src={b.coverUrl}
                  alt={b.title}
                  className="bookCoverImg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="bookCoverFallback" style={{ background: b.color }}>
                  <span>📚</span>
                </div>
              </div>
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

          {/* ── PODCASTS — YouTube video format ── */}
          {activeTab === "podcasts" && filtered.map((p) => (
            <div key={p.id} className="videoCard">
              {expandedVideo === p.id ? (
                <div className="videoEmbed">
                  <iframe
                    src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1`}
                    title={p.title}
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
                  onClick={() => setExpandedVideo(p.id)}
                  style={{ background: `${p.color}12` }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg`}
                    alt={p.title}
                    className="videoThumbnailImg"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="videoPlayOverlay">
                    <div className="videoPlayBtn" style={{ background: p.color }}>▶</div>
                  </div>
                </div>
              )}
              <div className="videoInfo">
                <span className="videoCat" style={{ color: p.color, background: `${p.color}15` }}>
                  {p.category}
                </span>
                <h3 className="videoTitle">{p.title}</h3>
                <p className="videoHost">🎙️ {p.host}</p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "4px 0 8px" }}>{p.desc}</p>
                {expandedVideo !== p.id && (
                  <button
                    className="watchBtn"
                    style={{ background: p.color }}
                    onClick={() => setExpandedVideo(p.id)}
                  >
                    ▶ Watch Now
                  </button>
                )}
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
                <span className="articleSource" style={{ background: `${a.color}15`, color: a.color }}>
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
                <span className="exEmoji" style={{ background: `${e.color}15` }}>{e.emoji}</span>
                <span className="exCat" style={{ color: e.color, background: `${e.color}15` }}>{e.category}</span>
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

          {/* ── STUDENTS: tips + videos ── */}
          {activeTab === "students" && filtered.map((s) => {
            if (s.type === "video") {
              // Render as video card
              return (
                <div key={s.id} className="videoCard stuVideoCard">
                  {expandedVideo === s.id ? (
                    <div className="videoEmbed">
                      <iframe
                        src={`https://www.youtube.com/embed/${s.youtubeId}?autoplay=1`}
                        title={s.title}
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
                      onClick={() => setExpandedVideo(s.id)}
                      style={{ background: `${s.color}12` }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`}
                        alt={s.title}
                        className="videoThumbnailImg"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      <div className="videoPlayOverlay">
                        <div className="videoPlayBtn" style={{ background: s.color }}>▶</div>
                      </div>
                      <span className="videoDuration">{s.duration}</span>
                    </div>
                  )}
                  <div className="videoInfo">
                    <span className="videoCat" style={{ color: s.color, background: `${s.color}15` }}>
                      🎓 Student Video
                    </span>
                    <h3 className="videoTitle">{s.title}</h3>
                    <p className="videoHost">{s.host}</p>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "4px 0 8px" }}>{s.desc}</p>
                    {expandedVideo !== s.id && (
                      <button
                        className="watchBtn"
                        style={{ background: s.color }}
                        onClick={() => setExpandedVideo(s.id)}
                      >
                        ▶ Watch Now
                      </button>
                    )}
                  </div>
                </div>
              );
            }
            // Render as tip card
            return (
              <div key={s.id} className="stuCard" style={{ borderLeft: `4px solid ${s.color}` }}>
                <div className="stuTop">
                  <span className="stuEmoji" style={{ background: `${s.color}15` }}>{s.emoji}</span>
                  <span className="stuCat" style={{ color: s.color, background: `${s.color}15` }}>{s.category}</span>
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
                  <ol className="exTips" style={{ borderColor: `${s.color}30`, background: `${s.color}06` }}>
                    {s.tips.map((tip, i) => (
                      <li key={i}>
                        <span style={{ color: s.color, fontWeight: 700 }}>{i + 1}.</span> {tip}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}

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
