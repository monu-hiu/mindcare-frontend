import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./goal.css";

function Goal() {
  const { token } = useAuth();
  const {language,t}=useLanguage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [targetDate, setTargetDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [goals, setGoals] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [filter, setFilter] = useState("All");

  const categories = [
    t("goals.categories.Mental"),
    t("goals.categories.Physical"),
    t("goals.categories.Social"),
    t("goals.categories.Personal"),
    t("goals.categories.Work"),
    t("goals.categories.Other")
  ];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/goal/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setGoals(data.goals);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingGoals(false);
    }
  };

  const createGoal = async () => {
    if (!title.trim()) {
      setError("Please enter a goal title.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const res = await fetch("https://mindcare-backend-v56a.onrender.com/api/goal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category, targetDate }),
      });

      const data = await res.json();

      if (data.success) {
        setSaved(true);
        setGoals([data.goal, ...goals]);
        setTitle("");
        setDescription("");
        setCategory("Personal");
        setTargetDate("");
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t("common.error"));
    } finally {
      setSaving(false);
    }
  };

  const toggleGoal = async (id) => {
    try {
      const res = await fetch(`https://mindcare-backend-v56a.onrender.com/api/goal/toggle/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setGoals(goals.map((g) =>
          g._id === id ? data.goal : g
        ));
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const res = await fetch(`https://mindcare-backend-v56a.onrender.com/api/goal/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setGoals(goals.filter((g) => g._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredGoals = filter === "All"
    ? goals
    : filter === "Completed"
    ? goals.filter((g) => g.isCompleted)
    : goals.filter((g) => !g.isCompleted);

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const totalCount = goals.length;

  return (
    <div className="goalPage">
      <div className="goalHeader">
        <h1>{t("goals.title")}</h1>
        <p>{t("goals.subtitle")}</p>
        {totalCount > 0 && (
          <div className="goalProgress">
            <div className="progressBar">
              <div
                className="progressFill"
                style={{
                  width: `${(completedCount / totalCount) * 100}%`
                }}
              />
            </div>
            <p className="progressText">
              {completedCount} of {totalCount} {t("goals.progress")}
            </p>
          </div>
        )}
      </div>

      {/* Create Goal Form */}
      <div className="goalForm">
        <h2>{t("goals.createTitle")}</h2>

        <div className="formGroup">
          <label>{t("goals.titleLabel")}</label>
          <input
            type="text"
            placeholder={t("goals.titlePlaceholder")}
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            maxLength={100}
          />
        </div>

        <div className="formGroup">
          <label>{t("goals.descLabel")}</label>
          <textarea
            placeholder={t("goals.descPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>{t("goals.categoryLabel")}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>{t("goals.dateLabel")}</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">✅ {t("goals.successText")}</p>}

        <button
          onClick={createGoal}
          disabled={saving}
          className="saveBtn"
        >
          {saving ? "Creating..." : t("goals.saveBtn")}
        </button>
      </div>

      {/* Goals List */}
      <div className="goalsList">
        <div className="goalsListHeader">
          <h2>{t("goals.yourGoals")}</h2>
          <div className="filterBtns">
            {[t("goals.filterAll"), t("goals.filterActive"), t("goals.filterCompleted")].map((f) => (
              <button
                key={f}
                className={`filterBtn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loadingGoals ? (
          <p className="loadingText">{t("common.loading")}</p>
        ) : filteredGoals.length === 0 ? (
          <p className="emptyText">
            {filter === "All"
              ? t("goals.noGoals")
              : `No ${filter.toLowerCase()} goals.`}
          </p>
        ) : (
          filteredGoals.map((goal) => (
            <div
              key={goal._id}
              className={`goalCard ${goal.isCompleted ? "completed" : ""}`}
            >
              <div className="goalCardLeft">
                <button
                  className={`checkBtn ${goal.isCompleted ? "checked" : ""}`}
                  onClick={() => toggleGoal(goal._id)}
                >
                  {goal.isCompleted ? "✓" : ""}
                </button>
              </div>

              <div className="goalCardContent">
                <p className={`goalTitle ${goal.isCompleted ? "strikethrough" : ""}`}>
                  {goal.title}
                </p>
                {goal.description && (
                  <p className="goalDescription">{goal.description}</p>
                )}
                <div className="goalMeta">
                  <span className="goalCategory">{goal.category}</span>
                  {goal.targetDate && (
                    <span className="goalDate">
                      🎯 {new Date(goal.targetDate).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  )}
                  {goal.isCompleted && (
                    <span className="goalCompleted">{t("goals.completed")}</span>
                  )}
                </div>
              </div>

              <button
                className="deleteBtn"
                onClick={() => deleteGoal(goal._id)}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">{t("common.back")}</button>
        </Link>
      </div>
    </div>
  );
}

export default Goal;