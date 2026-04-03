import React, { useState } from "react";
import "./faq.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is this platform?",
      answer: "This platform helps users track their mental health, habits, sleep, and daily activities in a simple and organized way."
    },
    {
      question: "Is this website free to use?",
      answer: "Yes, all features on this platform are completely free to use. There are no hidden charges."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take your privacy seriously. Your data is stored securely and is not shared with anyone."
    },
    {
      question: "Can children use this platform?",
      answer: "Yes, this platform is designed to be simple, safe, and easy to use for everyone, including children."
    },
    {
      question: "What features does this platform provide?",
      answer: "You can track your mood, sleep, daily habits, and personal progress to improve your overall well-being."
    },
    {
      question: "Do I need to create an account?",
      answer: "Yes, creating an account helps you save your data and access it anytime securely."
    },
    {
      question: "Can I delete my data?",
      answer: "Yes, you can delete your data or account anytime from your profile settings."
    },
    {
      question: "Can I access this on mobile?",
      answer: "Yes, the platform is fully responsive and works smoothly on mobile, tablet, and desktop devices."
    }
  ];

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our platform</p>
      </div>

      <div className="faq-box">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggle(index)}>
              <span>{item.question}</span>
              <span className="icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;