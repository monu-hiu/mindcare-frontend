import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./FeedbackViewer.css";

function FeedbackViewer() {
  const { token } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/feedback/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks);
        setAvgRating(data.avgRating);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "General", "Bug Report", "Feature Request", "UI/UX", "Performance", "Other"];

  const filtered = filter === "All"
    ? feedbacks
    : feedbacks.filter((f) => f.category === filter);

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const ratingColor = (r) => {
    if (r >= 4) return "#22c55e";
    if (r >= 3) return "#f59e0b";
    return "#ef4444";
  };

  const ratingCounts = [5,4,3,2,1].map((r) => ({
    rating: r,
    count: feedbacks.filter((f) => f.rating === r).length,
    pct: feedbacks.length > 0
      ? Math.round(feedbacks.filter((f) => f.rating === r).length / feedbacks.length * 100)
      : 0,
  }));

  return (
    <div className="fbViewerPage">
      <div className="fbViewerHeader">
        <h1>📊 Feedback Dashboard</h1>
        <p>All user feedback for MindCare</p>
      </div>

      {loading ? (
        <p className="fbViewerLoading">Loading feedback...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="fbViewerStats">
            <div className="fbStatCard highlight">
              <p className="fbStatValue" style={{ color: ratingColor(avgRating) }}>
                {avgRating}
              </p>
              <p className="fbStatLabel">Average Rating</p>
              <p className="fbStatStars">{stars(Math.round(avgRating))}</p>
            </div>
            <div className="fbStatCard">
              <p className="fbStatValue">{feedbacks.length}</p>
              <p className="fbStatLabel">Total Responses</p>
            </div>
            <div className="fbStatCard">
              <p className="fbStatValue">
                {feedbacks.length > 0
                  ? Math.round(feedbacks.filter((f) => f.recommend).length / feedbacks.length * 100)
                  : 0}%
              </p>
              <p className="fbStatLabel">Would Recommend</p>
            </div>
            <div className="fbStatCard">
              <p className="fbStatValue">
                {feedbacks.filter((f) => f.rating >= 4).length}
              </p>
              <p className="fbStatLabel">Happy Users</p>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="fbRatingBreakdown">
            <h2>Rating Breakdown</h2>
            {ratingCounts.map(({ rating, count, pct }) => (
              <div key={rating} className="fbRatingRow">
                <span className="fbRatingNum">{rating}★</span>
                <div className="fbRatingBar">
                  <div
                    className="fbRatingFill"
                    style={{
                      width: `${pct}%`,
                      background: ratingColor(rating),
                    }}
                  />
                </div>
                <span className="fbRatingCount">{count} ({pct}%)</span>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="fbViewerFilter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`fbFilterBtn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feedback List */}
          <div className="fbViewerList">
            {filtered.length === 0 ? (
              <p className="fbViewerEmpty">No feedback in this category.</p>
            ) : (
              filtered.map((fb) => (
                <div key={fb._id} className="fbViewerCard">
                  <div className="fbViewerCardTop">
                    <div className="fbViewerCardLeft">
                      <div className="fbViewerAvatar">
                        {fb.userName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="fbViewerName">{fb.userName}</p>
                        <p className="fbViewerDate">
                          {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="fbViewerCardRight">
                      <p className="fbViewerStars" style={{ color: ratingColor(fb.rating) }}>
                        {stars(fb.rating)}
                      </p>
                      <span className="fbViewerCat">{fb.category}</span>
                    </div>
                  </div>
                  <p className="fbViewerMsg">{fb.message}</p>
                  <div className="fbViewerFooter">
                    <span className={`fbViewerRec ${fb.recommend ? "yes" : "no"}`}>
                      {fb.recommend ? "👍 Would recommend" : "👎 Would not recommend"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FeedbackViewer;