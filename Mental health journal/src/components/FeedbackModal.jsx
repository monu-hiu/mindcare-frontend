import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./FeedbackModal.css";

function FeedbackModal({ onClose, autoOpen = false }) {
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "General", "Bug Report", "Feature Request", "UI/UX", "Performance", "Other"
  ];

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
  const ratingEmojis = ["", "😞", "😐", "🙂", "😊", "🤩"];

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!message.trim()) {
      setError("Please write a message.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, category, message, recommend }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fbOverlay">
      <div className="fbModal">
        {/* Header */}
        <div className="fbHeader">
          <div>
            <p className="fbTitle">
              {autoOpen ? "Before you go..." : "Share Your Feedback"}
            </p>
            <p className="fbSubtitle">
              {autoOpen
                ? "We'd love to know how MindCare helped you today."
                : "Help us improve MindCare for everyone."}
            </p>
          </div>
          <button className="fbClose" onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className="fbSuccess">
            <p className="fbSuccessEmoji">🎉</p>
            <p className="fbSuccessTitle">Thank you so much!</p>
            <p className="fbSuccessMsg">
              Your feedback helps us make MindCare better for everyone.
            </p>
          </div>
        ) : (
          <div className="fbBody">
            {/* Star Rating */}
            <div className="fbRatingSection">
              <p className="fbLabel">How would you rate MindCare?</p>
              <div className="fbStars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`fbStar ${(hoveredRating || rating) >= star ? "active" : ""}`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => { setRating(star); setError(""); }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {(hoveredRating || rating) > 0 && (
                <p className="fbRatingLabel">
                  {ratingEmojis[hoveredRating || rating]}{" "}
                  {ratingLabels[hoveredRating || rating]}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="fbField">
              <p className="fbLabel">Category</p>
              <div className="fbCatGrid">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`fbCatBtn ${category === cat ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="fbField">
              <p className="fbLabel">Your feedback</p>
              <textarea
                className="fbTextarea"
                placeholder="Tell us what you think — what you loved, what could be better, or any bugs you found..."
                value={message}
                onChange={(e) => { setMessage(e.target.value); setError(""); }}
                maxLength={1000}
                rows={4}
              />
              <p className="fbCharCount">{message.length}/1000</p>
            </div>

            {/* Recommend */}
            <div className="fbField">
              <p className="fbLabel">Would you recommend MindCare?</p>
              <div className="fbRecommend">
                <button
                  className={`fbRecBtn ${recommend ? "yes" : ""}`}
                  onClick={() => setRecommend(true)}
                >
                  👍 Yes, definitely!
                </button>
                <button
                  className={`fbRecBtn ${!recommend ? "no" : ""}`}
                  onClick={() => setRecommend(false)}
                >
                  👎 Not really
                </button>
              </div>
            </div>

            {error && <p className="fbError">{error}</p>}

            <button
              className="fbSubmitBtn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Feedback 🚀"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackModal;