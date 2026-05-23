// src/components/VoiceTextarea.jsx
// Textarea with built-in voice input button
// Use this EVERYWHERE instead of plain <textarea>

import { useLanguage } from "../context/LanguageContext";
import useVoiceInput from "../hooks/useVoiceInput";
import "./VoiceTextarea.css";

function VoiceTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  name,
  disabled = false,
}) {
  const { language } = useLanguage();

  const { listening, supported, transcript, toggleListening } =
    useVoiceInput((text) => {
      // Append voice text to existing text
      const newVal = value ? `${value} ${text}` : text;
      onChange(newVal);
    }, language);

  const placeholderText =
    placeholder ||
    (language === "hi"
      ? "यहाँ टाइप करें या माइक का उपयोग करें..."
      : language === "hin"
      ? "Yahan type karo ya mic use karo..."
      : "Type here or use mic to speak...");

  return (
    <div className="vtWrapper">
      <div className={`vtBox ${listening ? "vtListening" : ""}`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholderText}
          rows={rows}
          maxLength={maxLength}
          name={name}
          disabled={disabled}
          className="vtTextarea"
        />

        {/* Mic button inside textarea */}
        {supported && (
          <button
            type="button"
            className={`vtMicBtn ${listening ? "active" : ""}`}
            onClick={toggleListening}
            title={
              listening
                ? "Stop"
                : language === "hi"
                ? "बोलकर लिखें"
                : language === "hin"
                ? "Bol ke likho"
                : "Speak to type"
            }
          >
            {listening ? "⏹" : "🎙️"}
          </button>
        )}
      </div>

      {/* Status bar */}
      <div className="vtFooter">
        {listening && (
          <div className="vtStatus">
            <span className="vtDot" />
            <span>
              {transcript ||
                (language === "hi"
                  ? "सुन रहा हूं..."
                  : language === "hin"
                  ? "Sun raha hoon..."
                  : "Listening...")}
            </span>
          </div>
        )}
        {maxLength && !listening && (
          <span className="vtCount">
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default VoiceTextarea;