// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Mindfulness from "./pages/Mindfulness";
import Suggestions from "./pages/Suggestions";
import Goal from "./pages/Goal";
import Challenges from "./pages/Challenges";
import SelfCare from "./pages/SelfCare";
import Reflection from "./pages/Reflection";
import CognitiveDistortions from "./pages/CognitiveDistortions";
import ComboTracker from "./pages/ComboTracker";
import AnxietyTracker from "./pages/AnxietyTracker";
import MoodTracker from "./pages/MoodTracker";
import GratitudeLog from "./pages/GratitudeLog";
import SelfCongrats from "./pages/SelfCongrats";
import SleepTracker from "./pages/SleepTracker";
import ImprovementTracker from "./pages/ImprovementTracker";
import EnergyTracker from "./pages/EnergyTracker";
import RagePage from "./pages/RagePage";
import TherapyNotes from "./pages/TherapyNotes";
import ReviewsReflection from "./pages/ReviewsReflection";
import SupportPage from "./pages/SupportPage";
import SelfHarmSupport from "./pages/SelfHarmSupport";
import FeedbackViewer from "./pages/FeedbackViewer";
import Chatbot from "./pages/Chatbot";
import Header from "./components/Header_final";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    // LanguageProvider wraps everything so all pages can access language
    <ThemeProvider> 
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/login"               element={<Login />} />
            <Route path="/signup"              element={<Signup />} />
            <Route path="/dashboard"           element={<Dashboard />} />
            <Route path="/mindfulness"         element={<Mindfulness />} />
            <Route path="/suggestions"         element={<Suggestions />} />
            <Route path="/goal"                element={<Goal />} />
            <Route path="/challenges"          element={<Challenges />} />
            <Route path="/selfcare"            element={<SelfCare />} />
            <Route path="/reflection"          element={<Reflection />} />
            <Route path="/cognitive-distortions" element={<CognitiveDistortions />} />
            <Route path="/combo"               element={<ComboTracker />} />
            <Route path="/anxiety-tracker"     element={<AnxietyTracker />} />
            <Route path="/mood-tracker"        element={<MoodTracker />} />
            <Route path="/gratitude-log"       element={<GratitudeLog />} />
            <Route path="/self-congrats"       element={<SelfCongrats />} />
            <Route path="/sleep-tracker"       element={<SleepTracker />} />
            <Route path="/improvement-tracker" element={<ImprovementTracker />} />
            <Route path="/energy-tracker"      element={<EnergyTracker />} />
            <Route path="/rage"                element={<RagePage />} />
            <Route path="/therapy-notes"       element={<TherapyNotes />} />
            <Route path="/reviews-reflection"  element={<ReviewsReflection />} />
            <Route path="/support"             element={<SupportPage />} />
            <Route path="/self-harm-support"   element={<SelfHarmSupport />} />
            <Route path="/chatbot"             element={<Chatbot />} />
            <Route path="/feedback-admin"      element={<FeedbackViewer />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </LanguageProvider>
     </ThemeProvider>
  );
}

export default App;