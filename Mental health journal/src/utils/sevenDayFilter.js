// src/utils/sevenDayFilter.js
// Use this in every history page to only show last 7 days in UI

/**
 * Filters an array of logs to only include entries from the last 7 days
 * Data stays in MongoDB — only the UI display is filtered
 *
 * @param {Array} logs - Array with createdAt field
 * @returns {Array} - Filtered array showing only last 7 days
 */
export const filterLast7Days = (logs) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  return logs.filter(
    (log) => new Date(log.createdAt) >= sevenDaysAgo
  );
};

/**
 * Groups logs by date for display
 * @param {Array} logs
 * @returns {Object} - { "25 Mar": [...logs], "26 Mar": [...logs] }
 */
export const groupByDate = (logs) => {
  return logs.reduce((groups, log) => {
    const date = new Date(log.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(log);
    return groups;
  }, {});
};

/**
 * Check if a log is from today
 * @param {string|Date} createdAt
 * @returns {boolean}
 */
export const isToday = (createdAt) => {
  return new Date(createdAt).toDateString() === new Date().toDateString();
};

/**
 * Check if a log is from within last N days
 * @param {string|Date} createdAt
 * @param {number} days
 * @returns {boolean}
 */
export const isWithinDays = (createdAt, days) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return new Date(createdAt) >= cutoff;
};