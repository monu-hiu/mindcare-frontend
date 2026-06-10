import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header_final";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Header />
            <Routes>

              {/* ── PUBLIC ── */}
              <Route path="/"                  element={<Home />} />
              <Route path="/login"             element={<Login />} />
              <Route path="/signup"            element={<Signup />} />
              <Route path="/forgot-password"   element={<ForgotPassword />} />
              <Route path="/verify-otp"        element={<VerifyOtp />} />
              <Route path="/blog"              element={<Blog />} />
              <Route path="/blog/:slug"        element={<BlogPost />} />
              <Route path="/support"           element={<SupportPage />} />
              <Route path="/self-harm-support" element={<SelfHarmSupport />} />
              <Route path="/terms"             element={<Terms />} />
              <Route path="/privacy-policy"     element={<PrivacyPolicy />} />

              {/* ── PROTECTED ── */}
              <Route path="/dashboard"             element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/mindfulness"           element={<ProtectedRoute><Mindfulness /></ProtectedRoute>} />
              <Route path="/suggestions"           element={<ProtectedRoute><Suggestions /></ProtectedRoute>} />
              <Route path="/goal"                  element={<ProtectedRoute><Goal /></ProtectedRoute>} />
              <Route path="/challenges"            element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
              <Route path="/selfcare"              element={<ProtectedRoute><SelfCare /></ProtectedRoute>} />
              <Route path="/reflection"            element={<ProtectedRoute><Reflection /></ProtectedRoute>} />
              <Route path="/cognitive-distortions" element={<ProtectedRoute><CognitiveDistortions /></ProtectedRoute>} />
              <Route path="/combo"                 element={<ProtectedRoute><ComboTracker /></ProtectedRoute>} />
              <Route path="/anxiety-tracker"       element={<ProtectedRoute><AnxietyTracker /></ProtectedRoute>} />
              <Route path="/mood-tracker"          element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
              <Route path="/gratitude-log"         element={<ProtectedRoute><GratitudeLog /></ProtectedRoute>} />
              <Route path="/self-congrats"         element={<ProtectedRoute><SelfCongrats /></ProtectedRoute>} />
              <Route path="/sleep-tracker"         element={<ProtectedRoute><SleepTracker /></ProtectedRoute>} />
              <Route path="/improvement-tracker"   element={<ProtectedRoute><ImprovementTracker /></ProtectedRoute>} />
              <Route path="/energy-tracker"        element={<ProtectedRoute><EnergyTracker /></ProtectedRoute>} />
              <Route path="/rage"                  element={<ProtectedRoute><RagePage /></ProtectedRoute>} />
              <Route path="/therapy-notes"         element={<ProtectedRoute><TherapyNotes /></ProtectedRoute>} />
              <Route path="/reviews-reflection"    element={<ProtectedRoute><ReviewsReflection /></ProtectedRoute>} />
              <Route path="/chatbot"               element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
              <Route path="/feedback-admin"        element={<ProtectedRoute><FeedbackViewer /></ProtectedRoute>} />

            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;