import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import translations from "../i18n/translations";
import "./therapy.css";

function TherapyNotes() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Session Notes");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedNote, setExpandedNote] = useState(null);
  const {language,t} = useLanguage();

  const categories = [
    "Session Notes", "Homework", "Insights",
    "Triggers", "Coping Strategies", "Goals",
  ];

  // Use localStorage for therapy notes (private and sensitive)
  useEffect(() => {
    const saved = localStorage.getItem("mindcare_therapy_notes");
    if (saved) setNotes(JSON.parse(saved));
    setLoading(false);
  }, []);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and content.");
      return;
    }
    setSaving(true);
    setError("");

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("mindcare_therapy_notes", JSON.stringify(updatedNotes));

    setTitle("");
    setContent("");
    setCategory("Session Notes");
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("mindcare_therapy_notes", JSON.stringify(updatedNotes));
  };

  const categoryColors = {
    "Session Notes": "#4f46e5",
    "Homework": "#f59e0b",
    "Insights": "#10b981",
    "Triggers": "#ef4444",
    "Coping Strategies": "#06b6d4",
    "Goals": "#8b5cf6",
  };

  return (
    <div className="therapyPage">
      <div className="therapyHeader">
        <h1>{t("notes.title")}</h1>
        <p>{t("notes.subtitle")}</p>
        <div className="therapyPrivacyBadge">
          {t("notes.security")}
        </div>
      </div>

      {/* Add Note Form */}
      <div className="therapyForm">
        <h2>{t("notes.add")}</h2>

        <div className="formGroup">
          <label>{t("notes.note")}</label>
          <input
            type="text"
            placeholder={t("notes.nplaceholder")}
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            maxLength={100}
          />
        </div>

        <div className="formGroup">
          <label>{t("notes.category")}</label>
          <select
            className="categoryDropdown"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label>{t("notes.cnotes")}</label>
          <textarea
            placeholder={t("notes.placeholder")}
            value={content}
            onChange={(e) => { setContent(e.target.value); setError(""); }}
            rows={6}
          />
        </div>

        {error && <p className="errorText">{error}</p>}
        {saved && <p className="successText">{t("notes.saved")}</p>}

        <button
          onClick={saveNote}
          disabled={saving}
          className="saveBtn"
        >
          {saving ? t("common.saving") : t("notes.saveBtn")}
        </button>
      </div>

      {/* Notes List */}
      <div className="therapyNotesList">
        <h2>Your Notes ({notes.length})</h2>
        {loading ? (
          <p className="loadingText">{t("common.loading")}</p>
        ) : notes.length === 0 ? (
          <p className="emptyText">{t("notes.emptyText")}</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="therapyNoteCard">
              <div className="therapyNoteHeader">
                <div className="therapyNoteMeta">
                  <span
                    className="therapyNoteCategory"
                    style={{
                      background: `${categoryColors[note.category]}15`,
                      color: categoryColors[note.category],
                    }}
                  >
                    {note.category}
                  </span>
                  <span className="therapyNoteDate">
                    {new Date(note.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                </div>
                <div className="therapyNoteActions">
                  <button
                    className="expandBtn"
                    onClick={() => setExpandedNote(
                      expandedNote === note.id ? null : note.id
                    )}
                  >
                    {expandedNote === note.id ? "▲" : "▼"}
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <h3 className="therapyNoteTitle"
                style={{ borderLeft: `3px solid ${categoryColors[note.category]}` }}
              >
                {note.title}
              </h3>
              {expandedNote === note.id && (
                <p className="therapyNoteContent">{note.content}</p>
              )}
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

export default TherapyNotes;