// src/hooks/useVoiceInput.js
// Voice to text using Web Speech API
// Works on Chrome, Edge, Safari (iOS 14.5+)

import { useState, useEffect, useRef } from "react";

const useVoiceInput = (onResult, language = "en-US") => {
  const [listening, setListening]   = useState(false);
  const [supported, setSupported]   = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError]           = useState("");
  const recognitionRef               = useRef(null);

  // Language mapping
  const langMap = {
    en:  "en-IN",   // English India
    hi:  "hi-IN",   // Hindi
    hin: "hi-IN",   // Hinglish — use Hindi recognition
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSupported(true);
      const recognition = new SpeechRecognition();

      recognition.continuous     = false; // Stop after one sentence
      recognition.interimResults = true;  // Show text while speaking
      recognition.lang           = langMap[language] || "en-IN";
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setListening(true);
        setError("");
      };

      recognition.onresult = (event) => {
        let finalText   = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += text;
          } else {
            interimText += text;
          }
        }

        setTranscript(interimText || finalText);

        if (finalText) {
          onResult(finalText.trim());
          setTranscript("");
        }
      };

      recognition.onerror = (event) => {
        setListening(false);
        if (event.error === "not-allowed") {
          setError("Microphone permission denied. Please allow mic access.");
        } else if (event.error === "no-speech") {
          setError("No speech detected. Please try again.");
        } else {
          setError("Voice recognition failed. Try again.");
        }
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSupported(false);
    }
  }, [language]);

  const startListening = () => {
    if (!supported) {
      setError("Voice input not supported on this browser. Use Chrome.");
      return;
    }
    setError("");
    setTranscript("");
    try {
      recognitionRef.current?.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    listening,
    supported,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
  };
};

export default useVoiceInput;