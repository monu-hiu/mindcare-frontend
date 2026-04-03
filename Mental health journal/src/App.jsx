import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

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
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import Header from "./components/Header_final";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOtp";
import PrivacyPolicy from "./pages/auth/PrivacyPolicy";
import FAQ from "./components/FAQ";
import FeedbackViewer from "./pages/FeedbackViewer";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/self-harm-support" element={<SelfHarmSupport />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/mindfulness" element={<PrivateRoute><Mindfulness /></PrivateRoute>} />
          <Route path="/suggestions" element={<PrivateRoute><Suggestions /></PrivateRoute>} />
          <Route path="/goal" element={<PrivateRoute><Goal /></PrivateRoute>} />
          <Route path="/challenges" element={<PrivateRoute><Challenges /></PrivateRoute>} />
          <Route path="/selfcare" element={<PrivateRoute><SelfCare /></PrivateRoute>} />
          <Route path="/reflection" element={<PrivateRoute><Reflection /></PrivateRoute>} />
          <Route path="/cognitive-distortions" element={<PrivateRoute><CognitiveDistortions /></PrivateRoute>} />
          <Route path="/combo" element={<PrivateRoute><ComboTracker /></PrivateRoute>} />
          <Route path="/anxiety-tracker" element={<PrivateRoute><AnxietyTracker /></PrivateRoute>} />
          <Route path="/mood-tracker" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
          <Route path="/gratitude-log" element={<PrivateRoute><GratitudeLog /></PrivateRoute>} />
          <Route path="/self-congrats" element={<PrivateRoute><SelfCongrats /></PrivateRoute>} />
          <Route path="/sleep-tracker" element={<PrivateRoute><SleepTracker /></PrivateRoute>} />
          <Route path="/improvement-tracker" element={<PrivateRoute><ImprovementTracker /></PrivateRoute>} />
          <Route path="/energy-tracker" element={<PrivateRoute><EnergyTracker /></PrivateRoute>} />
          <Route path="/rage" element={<PrivateRoute><RagePage /></PrivateRoute>} />
          <Route path="/therapy-notes" element={<PrivateRoute><TherapyNotes /></PrivateRoute>} />
          <Route path="/reviews-reflection" element={<PrivateRoute><ReviewsReflection /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
          {/* Password Reset */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          {/* Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* FAQ */}
          <Route path="/faq" element={<FAQ />} />
          {/* Feedback Viewer */}
         <Route path="/feedback-admin" element={<FeedbackViewer />} />
         


        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;