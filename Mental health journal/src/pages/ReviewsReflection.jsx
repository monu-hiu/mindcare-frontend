import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./review.css";

function ReviewsReflection() {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("weekly");
  const [formData, setFormData] = useState({
    highlight: "",
    challenge: "",
    learned: "",
    nextWeekGoal: "",
    rating: 5,
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mindcare_reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const saveReview = () => {
    if (!formData.highlight.trim() && !formData.challenge.trim()) {
      setError("Please fill in at least one field.");
      return;
    }

    const newReview = {
      id: Date.now(),
      type: activeTab,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("mindcare_reviews", JSON.stringify(updated));
    setFormData({
      highlight: "", challenge: "", learned: "",
      nextWeekGoal: "", rating: 5,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteReview = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem("mindcare_reviews", JSON.stringify(updated));
  };

  const getRatingEmoji = (r) => {
    if (r >= 9) return "🌟";
    if (r >= 7) return "😊";
    if (r >= 5) return "😐";
    if (r >= 3) return "😔";
    return "😢";
  };

  const getRatingColor = (r) => {
    if (r >= 7) return "#22c55e";
    if (r >= 5) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="reviewsPage">
      <div className="reviewsHeader">
        <h1>🔍 Reviews & Reflection</h1>
        <p>Reflect on your week or month to track your growth over time.</p>
      </div>

      {/* Tab Selection */}
      <div className="reviewTabs">
        <button
          className={`reviewTab ${activeTab === "weekly" ? "active" : ""}`}
          onClick={() => setActiveTab("weekly")}
        >
          📅 Weekly Review
        </button>
        <button
          className={`reviewTab ${activeTab === "monthly" ? "active" : ""}`}
          onClick={() => setActiveTab("monthly")}
        >
          📆 Monthly Review
        </button>
      </div>

      {/* Form */}
      <div className="reviewForm">
        <h2>{activeTab === "weekly" ? "This Week's" : "This Month's"} Review</h2>

        {/* Rating */}
        <div className="ratingSection">
          <label>
            Overall {activeTab === "weekly" ? "week" : "month"} rating:
            <span style={{ color: getRatingColor(formData.rating), fontWeight: 700 }}>
              {" "}{getRatingEmoji(formData.rating)} {formData.rating}/10
            </span>
          </label>
          <input
            type="range" min="1" max="10"
            value={formData.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            className="ratingSlider"
          />
        </div>

        <div className="formGroup">
          <label>🌟 Highlight — Best moment this {activeTab === "weekly" ? "week" : "month"}:</label>
          <textarea
            placeholder="What was your best moment or achievement?"
            value={formData.highlight}
            onChange={(e) => handleChange("highlight", e.target.value)}
            rows={3}
          />
        </div>

        <div className="formGroup">
          <label>💪 Challenge — What was difficult?</label>
          <textarea
            placeholder="What challenged you most? How did you handle it?"
            value={formData.challenge}
            onChange={(e) => handleChange("challenge", e.target.value)}
            rows={3}
          />
        </div>

        <div className="formGroup">
          <label>📚 Learned — What did you learn about yourself?</label>
          <textarea
            placeholder="What insight or lesson did you gain?"
            value={formData.learned}
            onChange={(e) => handleChange("learned", e.target.value)}
            rows={3}
          />
        </div>

        <div className="formGroup">
          <label>🎯 Next {activeTab === "weekly" ? "week's" : "month's"} goal:</label>
          <textarea
            placeholder="What is one thing you want to focus on next?"
            value={formData.nextWeekGoal}
            onChange={(e) => handleChange("nextWeekGoal", e.target.value)}
            rows={2}
          />
        </div>

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">✅ Review saved!</p>}

        <button onClick={saveReview} className="saveBtn">
          Save Review
        </button>
      </div>

      {/* Past Reviews */}
      <div className="reviewsHistory">
        <h2>Past Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="emptyText">No reviews yet. Start your first review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="reviewCard">
              <div className="reviewCardHeader">
                <div className="reviewCardMeta">
                  <span className={`reviewType ${review.type}`}>
                    {review.type === "weekly" ? "📅 Weekly" : "📆 Monthly"}
                  </span>
                  <span
                    className="reviewRating"
                    style={{ color: getRatingColor(review.rating) }}
                  >
                    {getRatingEmoji(review.rating)} {review.rating}/10
                  </span>
                  <span className="reviewDate">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                </div>
                <button
                  className="deleteBtn"
                  onClick={() => deleteReview(review.id)}
                >🗑️</button>
              </div>

              <div className="reviewCardBody">
                {review.highlight && (
                  <div className="reviewField">
                    <p className="reviewFieldLabel">🌟 Highlight</p>
                    <p className="reviewFieldText">{review.highlight}</p>
                  </div>
                )}
                {review.challenge && (
                  <div className="reviewField">
                    <p className="reviewFieldLabel">💪 Challenge</p>
                    <p className="reviewFieldText">{review.challenge}</p>
                  </div>
                )}
                {review.learned && (
                  <div className="reviewField">
                    <p className="reviewFieldLabel">📚 Learned</p>
                    <p className="reviewFieldText">{review.learned}</p>
                  </div>
                )}
                {review.nextWeekGoal && (
                  <div className="reviewField">
                    <p className="reviewFieldLabel">🎯 Next Goal</p>
                    <p className="reviewFieldText">{review.nextWeekGoal}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default ReviewsReflection;