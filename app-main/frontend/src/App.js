import { Routes, Route } from "react-router-dom";

/* CORE PAGES */
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import History from "./pages/History";

/* AUTH */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminRoute from "./routes/AdminRoute";


/* PAGES */
import Blogs from "./pages/Blogs";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/Dashboard";

/* 🔥 FIXED: MOVE Fact to pages */
import Fact from "./components/Fact";
import VerifyNews from "./pages/VerifyNews";
import RecentScams from "./pages/RecentScams";
import GlobalNews from "./pages/GlobalNews";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import NewsTicker from "./components/NewsTicker";
import Chatbot from "./components/chatbot";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LiveTV from "./components/LiveTv";

/* UI */
import { Toaster } from "./components/ui/sonner";
import "./App.css";

export default function App() {
  return (
    <>
      {/* ALWAYS VISIBLE */}
      <Navbar />
      <NewsTicker />

      {/* ROUTES */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* FACT CHECK */}
        <Route
          path="/fact"
          element={
            <ProtectedRoute>
              <Fact />
            </ProtectedRoute>
          }
        />

        {/* QUICK ACTION ROUTES */}
        <Route
          path="/verify-news"
          element={
            <ProtectedRoute>
              <VerifyNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recent-scams"
          element={
            <ProtectedRoute>
              <RecentScams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/global-news"
          element={
            <ProtectedRoute>
              <GlobalNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis/quick"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />

        {/* PARAMETER ROUTES */}
        <Route
          path="/analysis/:id"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

        {/* OTHER PROTECTED ROUTES */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/livetv"
          element={
            <ProtectedRoute>
              <LiveTV />
            </ProtectedRoute>
          }
        />

        <Route
          path="/features"
          element={
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* GLOBAL */}
      <Chatbot />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}
