// src/utils/notifications.js
// Updated — uses Push API for phone notifications

import { sendPushNotification } from "./pushNotifications";

// ── MOOD NOTIFICATION ─────────────────────────────────────
export const sendMoodNotification = async (token, mood) => {
  const messages = {
    Happy:   { title: "😊 Great Mood Logged!", body: "You're feeling Happy today! Keep it up. Have a wonderful day! 🌟" },
    Good:    { title: "🙂 Good Mood Logged!",  body: "Feeling good today! That's wonderful. Keep smiling! 😊" },
    Neutral: { title: "😐 Mood Logged",         body: "Neutral day — that's okay! Every day is a new opportunity. 💙" },
    Sad:     { title: "😔 Feeling Sad Today",   body: "It's okay to feel sad. Try a breathing exercise or talk to someone. 💙" },
    Angry:   { title: "😡 Feeling Angry",       body: "Take a deep breath. Try our Rage Release tool to feel better. 💨" },
    Anxious: { title: "😰 Feeling Anxious",     body: "You're not alone. Try 4-7-8 breathing to calm down right now. 🧘" },
  };

  const msg = messages[mood] || { title: "😊 Mood Logged!", body: "Your mood has been tracked successfully!" };
  await sendPushNotification(token, msg.title, msg.body, "/mood-tracker");
};

// ── ENERGY NOTIFICATION ───────────────────────────────────
export const sendEnergyNotification = async (token, level) => {
  const hour = new Date().getHours();
  const time = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const msgs = {
    low: {
      morning:   { title: "⚡ Low Energy This Morning", body: "Start with a light breakfast and short walk. You've got this! 💪" },
      afternoon: { title: "⚡ Low Afternoon Energy",    body: "Try a 10-minute walk or healthy snack to recharge! 🍎" },
      evening:   { title: "⚡ Low Evening Energy",      body: "That's okay! Rest well tonight and recover. 🌙" },
    },
    moderate: {
      morning:   { title: "⚡ Moderate Morning Energy", body: "Stay hydrated and tackle your tasks now! ☀️" },
      afternoon: { title: "⚡ Moderate Afternoon",      body: "Keep moving and eat something nutritious! 🥗" },
      evening:   { title: "⚡ Moderate Evening Energy", body: "Wind down gradually for a good night's sleep! 😊" },
    },
    high: {
      morning:   { title: "🔥 Amazing Morning Energy!", body: "This is your peak time — tackle your most important goals now!" },
      afternoon: { title: "🔥 High Afternoon Energy!",  body: "Great time for exercise or creative work. Keep the momentum!" },
      evening:   { title: "🔥 High Evening Energy!",   body: "Channel it productively but start winding down by 9pm!" },
    },
  };

  const cat = level <= 3 ? "low" : level <= 6 ? "moderate" : "high";
  const msg = msgs[cat][time];
  await sendPushNotification(token, msg.title, msg.body, "/energy-tracker");
};

// ── ANXIETY NOTIFICATION ──────────────────────────────────
export const sendAnxietyNotification = async (token, level) => {
  if (level < 4) return; // Low anxiety — no notification needed

  let title, body;

  if (level >= 8) {
    title = "🆘 High Anxiety Alert";
    body  = "Your anxiety is very high. Please try 4-7-8 breathing or call iCall: 9152987821. You are not alone. 💙";
  } else if (level >= 6) {
    title = "⚠️ Moderate-High Anxiety";
    body  = "Feeling anxious? Try a short walk or deep breathing. Our chatbot is here for you! 🧘";
  } else {
    title = "💭 Moderate Anxiety";
    body  = "You're feeling some anxiety today. Try a breathing exercise — it really helps! 💨";
  }

  await sendPushNotification(token, title, body, "/anxiety-tracker");
};

// ── COMBO NOTIFICATION ────────────────────────────────────
export const sendComboNotification = async (token, score) => {
  if (score === null || score === undefined) return;

  let title, body;

  if (score < 7) {
    title = "💙 Tough Day Detected";
    body  = "Today seems tough. Be gentle with yourself. Try a breathing exercise or talk to MindCare AI. ❤️";
  } else if (score < 14) {
    title = "😊 Moderate Wellness Score";
    body  = `Your wellness score is ${score}/20 today. Keep using your coping strategies! 👍`;
  } else {
    title = "🌟 Excellent Wellness Score!";
    body  = `Amazing! Your wellness score is ${score}/20 today. You're thriving! Keep it up! 🎉`;
  }

  await sendPushNotification(token, title, body, "/combo");
};

// ── DAILY REMINDER ────────────────────────────────────────
export const sendDailyReminder = async (token) => {
  const today = new Date().toDateString();
  const lastReminder = localStorage.getItem("mc_last_reminder");
  if (lastReminder === today) return;

  const hour = new Date().getHours();
  if (hour < 9) return; // Don't send before 9am

  await sendPushNotification(
    token,
    "📊 MindCare Daily Check-In",
    "Don't forget to log your mood, sleep, energy and anxiety today! It takes just 2 minutes. 💙",
    "/dashboard"
  );

  localStorage.setItem("mc_last_reminder", today);
};