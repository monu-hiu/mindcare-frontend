// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./selfcare.css";
// import { useLanguage } from "../context/LanguageContext";
// import translations from "../i18n/translations";


// function SelfCare() {
//   const [completed, setCompleted] = useState([]);
//   const { language,t } = useLanguage();

//   const selfCareCategories = [
//     {
//       title: t("selfCare.title1"),
//       icon: "💪",
//       color: "#22c55e",
//       items: [
//         "Drink 8 glasses of water today",
//         "Take a 20-minute walk outside",
//         "Do 10 minutes of stretching",
//         "Eat a nutritious meal",
//         "Get 7-8 hours of sleep tonight",
//         "Take a warm relaxing shower",
//       ],
//     },
//     {
//       title: (t("selfCare.title2")),
//       icon: "🧠",
//       color: "#4f46e5",
//       items: [
//         "Write in your journal for 10 minutes",
//         "Practice 5 minutes of meditation",
//         "Read something you enjoy",
//         "Take a break from social media",
//         "Do a digital detox for 1 hour",
//         "Learn something new today",
//       ],
//     },
//     {
//       title: (t("selfCare.title3")),
//       icon: "💙",
//       color: "#ec4899",
//       items: [
//         "Call or text a friend you miss",
//         "Write down 3 things you are grateful for",
//         "Do something that makes you laugh",
//         "Watch your favorite movie or show",
//         "Say one kind thing to yourself",
//         "Forgive yourself for one mistake",
//       ],
//     },
//     {
//       title: (t("selfCare.title4")),
//       icon: "🎨",
//       color: "#f59e0b",
//       items: [
//         "Draw, paint, or doodle something",
//         "Listen to music that uplifts you",
//         "Cook or bake something you love",
//         "Rearrange or organize a small space",
//         "Write a short poem or story",
//         "Take photos of beautiful things around you",
//       ],
//     },
//   ];

//   const toggleItem = (item) => {
//     setCompleted((prev) =>
//       prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
//     );
//   };

//   const totalItems = selfCareCategories.reduce((sum, cat) => sum + cat.items.length, 0);
//   const completedCount = completed.length;
//   const percentage = Math.round((completedCount / totalItems) * 100);

//   return (
//     <div className="selfcarePage">
//       <div className="selfcareHeader">
//         <h1>{t("selfCare.title")}</h1>
//         <p>{t("selfCare.subtitle")}</p>
//       </div>

//       {/* Progress */}
//       <div className="selfcareProgress">
//         <div className="progressInfo">
//           <span>{completedCount} {t("selfCare.of")} {totalItems} {t("selfCare.completecount")}</span>
//           <span>{percentage}%</span>
//         </div>
//         <div className="progressBar">
//           <div className="progressFill" style={{ width: `${percentage}%` }} />
//         </div>
//       </div>

//       {/* Categories */}
//       {selfCareCategories.map((cat) => (
//         <div key={cat.title} className="selfcareCategory">
//           <div className="categoryHeader">
//             <span className="categoryIcon"
//               style={{ background: `${cat.color}15`, color: cat.color }}>
//               {cat.icon}
//             </span>
//             <h2 style={{ color: cat.color }}>{cat.title}</h2>
//             <span className="categoryCount">
//               {cat.items.filter(i => completed.includes(i)).length}/{cat.items.length}
//             </span>
//           </div>
//           <div className="selfcareItems">
//             {cat.items.map((item) => (
//               <div
//                 key={item}
//                 className={`selfcareItem ${completed.includes(item) ? "done" : ""}`}
//                 onClick={() => toggleItem(item)}
//               >
//                 <div
//                   className={`checkCircle ${completed.includes(item) ? "checked" : ""}`}
//                   style={{ borderColor: completed.includes(item) ? cat.color : "#d1d5db",
//                            background: completed.includes(item) ? cat.color : "white" }}
//                 >
//                   {completed.includes(item) && "✓"}
//                 </div>
//                 <p className={completed.includes(item) ? "itemDone" : ""}>{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {completedCount === totalItems && (
//         <div className="allDoneMsg">
//           🎉 {t("selfCare.allDonemsg")}
//         </div>
//       )}

//       <div className="navButtons">
//         <Link to="/dashboard">
//           <button className="backBtn">{t("common.back")}</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import "./selfcare.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../i18n/translations";

function SelfCare() {
  const [completed, setCompleted] = useState([]);
  const { language, t } = useLanguage();

  // ✅ get sections from translations
  const sections = translations.selfCare[language]?.sections || [];

  // ✅ toggle using ID
  const toggleItem = (id) => {
    setCompleted((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ✅ calculations
  const totalItems = sections.reduce(
    (sum, sec) => sum + sec.items.length,
    0
  );

  const completedCount = completed.length;

  const percentage =
    totalItems === 0
      ? 0
      : Math.round((completedCount / totalItems) * 100);

  return (
    <div className="selfcarePage">
      {/* Header */}
      <div className="selfcareHeader">
        <h1>{t("selfCare.title")}</h1>
        <p>{t("selfCare.subtitle")}</p>
      </div>

      {/* Progress */}
      <div className="selfcareProgress">
        <div className="progressInfo">
          <span>
            {completedCount} {t("selfCare.of")} {totalItems}{" "}
            {t("selfCare.completecount")}
          </span>
          <span>{percentage}%</span>
        </div>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="selfcareCategory">
          <div className="categoryHeader">
            <h2>{section.title}</h2>

            <span className="categoryCount">
              {
                section.items.filter((item) =>
                  completed.includes(item.id)
                ).length
              }
              /{section.items.length}
            </span>
          </div>

          <div className="selfcareItems">
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`selfcareItem ${
                  completed.includes(item.id) ? "done" : ""
                }`}
                onClick={() => toggleItem(item.id)}
              >
                {/* ✅ Circle */}
                <div
                  className={`checkCircle ${
                    completed.includes(item.id) ? "checked" : ""
                  }`}
                  style={{
                    borderColor: completed.includes(item.id)
                      ? "#22c55e"
                      : "#d1d5db",
                    backgroundColor: completed.includes(item.id)
                      ? "#22c55e"
                      : "white",
                    color: completed.includes(item.id)
                      ? "white"
                      : "transparent"
                  }}
                >
                  ✔
                </div>

                {/* ✅ Text */}
                <p
                  className={
                    completed.includes(item.id)
                      ? "itemDone"
                      : ""
                  }
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* All Done */}
      {totalItems > 0 && completedCount === totalItems && (
        <div className="allDoneMsg">
          🎉 {t("selfCare.allDonemsg")}
        </div>
      )}

      {/* Navigation */}
      <div className="navButtons">
        <Link to="/dashboard">
          <button className="backBtn">
            {t("common.back")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SelfCare;