// src/components/VoiceButton.jsx
// Reusable mic button — add to any textarea/input

import { useLanguage } from "../context/LanguageContext";
import useVoiceInput from "../hooks/useVoiceInput";
import "./VoiceButton.css";

function VoiceButton({ onResult, placeholder = "" }) {
  const { language } = useLanguage();

  const { listening, supported, transcript, error, toggleListening } =
    useVoiceInput((text) => {
      onResult(text);
    }, language);

  if (!supported) return null; // Hide if not supported

  return (
    <div className="voiceWrapper">
      {/* Mic Button */}
      <button
        type="button"
        className={`voiceBtn ${listening ? "listening" : ""}`}
        onClick={toggleListening}
        title={listening ? "Stop recording" : "Speak to type"}
      >
        {listening ? (
          <span className="voiceIcon">⏹️</span>
        ) : (
          <span className="voiceIcon">🎙️</span>
        )}
      </button>

      {/* Live transcript */}
      {listening && (
        <div className="voiceLive">
          <span className="voiceDot" />
          <span className="voiceLiveText">
            {transcript
              ? transcript
              : language === "hi"
              ? "बोलें..."
              : language === "hin"
              ? "Bolo..."
              : "Listening..."}
          </span>
        </div>
      )}

      {/* Error */}
      {error && !listening && (
        <p className="voiceError">{error}</p>
      )}
    </div>
  );
}

export default VoiceButton;