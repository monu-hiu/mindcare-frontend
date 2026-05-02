import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./chatbot.css";

function Chatbot() {
  const { token, user } = useAuth();
  const { language, t } = useLanguage(); // ✅ fixed Language → language

  const [messages, setMessages]                 = useState([]);
  const [input, setInput]                       = useState("");
  const [sending, setSending]                   = useState(false);
  const [loading, setLoading]                   = useState(true);
  const [clearing, setClearing]                 = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [dynamicReplies, setDynamicReplies]     = useState([]);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const quickReplies = [
    { text: "I feel anxious 😰",      msg: "I am feeling very anxious right now and don't know what to do" },
    { text: "Can't sleep 🌙",          msg: "I have been struggling to sleep lately" },
    { text: "I feel sad 😔",           msg: "I have been feeling really sad and low lately" },
    { text: "Feeling overwhelmed 😤",  msg: "I feel completely overwhelmed and don't know where to start" },
    { text: "Low energy ⚡",           msg: "I have very low energy and feel exhausted all the time" },
    { text: "Breathing exercise 💨",   msg: "Can you guide me through a breathing exercise?" },
    { text: "Motivate me 🔥",          msg: "I need some motivation and encouragement right now" },
    { text: "I feel lonely 💙",        msg: "I have been feeling very lonely and disconnected" },
    { text: "Exam stress 📚",          msg: "I am really stressed about my upcoming exams" },
    { text: "Anger management 😡",     msg: "I have been feeling very angry lately and need help managing it" },
    { text: "Panic attack help 🆘",    msg: "I think I am having a panic attack, please help" },
    { text: "Positive affirmation ✨", msg: "Can you give me some positive affirmations for today?" },
  ];

  const detectMood = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("anxious") || lower.includes("panic") || lower.includes("anxiety")) return "anxious";
    if (lower.includes("sad") || lower.includes("lonely") || lower.includes("depress"))    return "sad";
    if (lower.includes("angry") || lower.includes("anger") || lower.includes("rage"))      return "angry";
    if (lower.includes("sleep") || lower.includes("insomnia"))                              return "sleep";
    if (lower.includes("motivat") || lower.includes("energy") || lower.includes("tired"))  return "energy";
    return "neutral";
  };

  const getSmartReplies = (text) => {
    const mood = detectMood(text);
    if (mood === "anxious") return [
      { text: "Breathing exercise 💨", msg: "Can you guide me through a breathing exercise?" },
      { text: "Calm me down 🧘",        msg: "Help me calm down right now" },
      { text: "Grounding technique 🌿", msg: "Teach me a grounding technique" },
      { text: "Why do I panic? 🤔",     msg: "Why do I get panic attacks?" },
    ];
    if (mood === "sad") return [
      { text: "Motivate me 🔥",      msg: "I need some motivation and encouragement" },
      { text: "Affirmation ✨",       msg: "Can you give me some positive affirmations?" },
      { text: "Talk to me 💙",       msg: "I just need someone to talk to" },
      { text: "Get better tips 💡",  msg: "What can help me feel better?" },
    ];
    if (mood === "sleep") return [
      { text: "Sleep tips 😴",          msg: "Give me tips to sleep better" },
      { text: "Bedtime routine 🌙",     msg: "Help me build a bedtime routine" },
      { text: "Relaxation 🧘",          msg: "Guide me through a relaxation exercise" },
      { text: "Why can't I sleep? 🤔",  msg: "Why do I struggle with sleep?" },
    ];
    return quickReplies.slice(0, 4);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const fetchHistory = async () => {
    try {
      const res  = await fetch("https://mindcare-backend-v56a.onrender.com/api/chat/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        if (data.messages.length > 0) setShowQuickReplies(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
  };

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || sending) return;

    setShowQuickReplies(false);
    setDynamicReplies(getSmartReplies(messageText));

    const userMsg = {
      _id: Date.now(),
      role: "user",
      content: messageText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.focus();
    }

    try {
      const res  = await fetch("https://mindcare-backend-v56a.onrender.com/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, {
          _id: data.messageId,
          role: "assistant",
          content: data.reply,
          createdAt: new Date(),
        }]);
      } else {
        throw new Error();
      }
    } catch {
      setMessages((prev) => [...prev, {
        _id: Date.now(),
        role: "assistant",
        content: "I'm sorry, I couldn't process that. Please try again. 💙",
        createdAt: new Date(),
      }]);
    } finally {
      setSending(false);
    }
  };

  const clearHistory = async () => {
    setClearing(true);
    try {
      const res  = await fetch("https://mindcare-backend-v56a.onrender.com/api/chat/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages([]);
        setDynamicReplies([]);
        setShowQuickReplies(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setClearing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit",
    });

  const firstName    = user?.name?.split(" ")[0] || "there";
  const userInitial  = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="cbPage">

      {/* ── HEADER ── */}
      <div className="cbHeader">
        <div className="cbHeaderLeft">
          <div className="cbAiAvatar">🤖</div>
          <div>
            <p className="cbAiName">{t("chatbot.title")}</p>
            <p className="cbAiStatus">
              <span className="cbOnlineDot" />
              {t("chatbot.status")}
            </p>
          </div>
        </div>
        <div className="cbHeaderRight">
          <button
            className="cbClearBtn"
            onClick={clearHistory}
            disabled={clearing || messages.length === 0}
            title={t("chatbot.clearHistory")}
          >
            🗑️
          </button>
          <Link to="/dashboard" className="cbBackBtn">✕</Link>
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div className="cbMessages">
        {loading ? (
          <div className="cbLoading">
            <div className="cbLoadingDots">
              <span /><span /><span />
            </div>
            <p>{t("common.loading")}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="cbWelcome">
            <div className="cbWelcomeAvatar">🤖</div>
            {/* ✅ welcomeTitle with dynamic name */}
            <h2>{t("chatbot.welcomeTitle").replace("{name}", firstName)}</h2>
            <p>{t("chatbot.welcomeText")}</p>
            {/* ✅ welcomeHint and everything are now separate lines */}
            <p className="cbWelcomeHint">💙 {t("chatbot.welcomeHint")} {t("chatbot.everything")}</p>
            {/* ✅ fixed typo: "chatbot. disclimar" → "chatbot.disclimar" */}
            <p className="cbWelcomeDisclaimer">{t("chatbot.disclimar")}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`cbMsgRow ${msg.role === "user" ? "userRow" : "aiRow"}`}
            >
              {msg.role === "assistant" && (
                <div className="cbMsgAvatar ai">🤖</div>
              )}
              <div className={`cbBubble ${msg.role === "user" ? "userBubble" : "aiBubble"}`}>
                <p className="cbBubbleText">{msg.content}</p>
                <p className="cbBubbleTime">{formatTime(msg.createdAt)}</p>
              </div>
              {msg.role === "user" && (
                <div className="cbMsgAvatar user">{userInitial}</div>
              )}
            </div>
          ))
        )}

        {/* Typing indicator */}
        {sending && (
          <div className="cbMsgRow aiRow">
            <div className="cbMsgAvatar ai">🤖</div>
            <div className="cbBubble aiBubble cbTyping">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── QUICK REPLIES — welcome grid ── */}
      {showQuickReplies && messages.length === 0 && !loading && (
        <div className="cbQuickSection">
          {/* ✅ translated */}
          <p className="cbQuickTitle">{t("chatbot.welcomeHint")}</p>
          <div className="cbQuickGrid">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                className="cbQuickBtn"
                onClick={() => sendMessage(q.msg)}
                disabled={sending}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── QUICK REPLIES — pill row after conversation ── */}
      {messages.length > 0 && !sending && (
        <div className="cbQuickRow">
          {(dynamicReplies.length > 0 ? dynamicReplies : quickReplies.slice(0, 4)).map((q, i) => (
            <button
              key={i}
              className="cbQuickPill"
              onClick={() => sendMessage(q.msg)}
              disabled={sending}
            >
              {q.text}
            </button>
          ))}
        </div>
      )}

      {/* ── INPUT ── */}
      <div className="cbInputArea">
        <textarea
          ref={inputRef}
          className="cbInput"
          placeholder={t("chatbot.inputPlaceholder")} // ✅ translated
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={sending}
          rows={1}
        />
        <button
          className={`cbSendBtn ${input.trim() && !sending ? "active" : ""}`}
          onClick={() => sendMessage()}
          disabled={sending || !input.trim()}
        >
          {sending ? <span className="cbSendLoader" /> : <span>➤</span>}
        </button>
      </div>

    </div>
  );
}

export default Chatbot;