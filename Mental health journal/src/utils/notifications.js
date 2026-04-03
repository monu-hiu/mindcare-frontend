

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
};

/**
 * Send a notification (only if permitted)
 */
export const sendNotification = (title, body, icon = "/Logo_mindcare.png") => {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  new Notification(title, { body, icon });
};

/**
 * Daily reminder — check if user has logged today
 * Call this ONCE on app load (in App.jsx or Dashboard)
 * @param {string} token - Auth token
 */
export const checkDailyReminder = async (token) => {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  // Only send reminder once per day
  const today = new Date().toDateString();
  const lastReminder = localStorage.getItem("mc_last_reminder");
  if (lastReminder === today) return;

  try {
    // Check what user has logged today
    const [moodRes, sleepRes, energyRes, anxietyRes] = await Promise.all([
      fetch("https://mindcare-backend-v56a.onrender.com/api/mood/today", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("https://mindcare-backend-v56a.onrender.com/api/sleep/history", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("https://mindcare-backend-v56a.onrender.com/api/energy/history", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("https://mindcare-backend-v56a.onrender.com/api/anxiety/history", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const [moodData, sleepData, energyData, anxietyData] = await Promise.all([
      moodRes.json(),
      sleepRes.json(),
      energyRes.json(),
      anxietyRes.json(),
    ]);

    const todayStr = new Date().toDateString();
    const hasLoggedMood = !!moodData.todayMood;
    const hasLoggedSleep = sleepData.sleepLogs?.some(
      l => new Date(l.createdAt).toDateString() === todayStr
    );
    const hasLoggedEnergy = energyData.logs?.some(
      l => new Date(l.createdAt).toDateString() === todayStr
    );
    const hasLoggedAnxiety = anxietyData.logs?.some(
      l => new Date(l.createdAt).toDateString() === todayStr
    );

    const notLogged = [];
    if (!hasLoggedMood) notLogged.push("Mood");
    if (!hasLoggedSleep) notLogged.push("Sleep");
    if (!hasLoggedEnergy) notLogged.push("Energy");
    if (!hasLoggedAnxiety) notLogged.push("Anxiety");

    // Only send if 2+ things not logged and it's after 9am
    const hour = new Date().getHours();
    if (notLogged.length >= 2 && hour >= 9) {
      const missing = notLogged.join(", ");
      sendNotification(
        "📊 MindCare Daily Check-In",
        `You haven't logged your ${missing} today. Take 2 minutes to track your wellness! 💙`
      );
      localStorage.setItem("mc_last_reminder", today);
    }
  } catch (err) {
    console.log("Daily reminder check failed:", err.message);
  }
};

/**
 * Combo Tracker score notification
 * Call ONLY when user saves combo — not on page open
 * @param {number} score - Score out of 20
 */
export const sendComboNotification = (score) => {
  if (score === null || score === undefined) return;

  let title, body;

  if (score < 7) {
    title = "💙 Tough Day Detected";
    body = "Today seems like a tough day. Take care of yourself. Try a breathing exercise or talk to someone. You've got this! ❤️";
  } else if (score < 14) {
    title = "😊 You're Doing Okay";
    body = "Your wellness score is moderate today. Keep using your coping strategies — you're doing great! 👍";
  } else {
    title = "🌟 Amazing Day!";
    body = "Your wellness score is excellent today! You're thriving — keep up the great work! 🎉";
  }

  sendNotification(title, body);
};