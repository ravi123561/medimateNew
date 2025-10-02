import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

// 🔹 Pages
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView";
import StatsDashboard from "./pages/StatsDashboard";
import ReportsPage from "./pages/ReportsPage";
import Settings from "./pages/Setings"; // ✅ Fixed import
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";   // 👈 Profile page

// 🔹 Components
import AddMedicineForm from "./components/AddMedicineForm";

// 🔹 Hooks
import { useMedicineReminders } from "./hooks/useMedicineReminders";

// 🔹 Firebase
import { requestForToken, onMessageListener } from "./firebase";

function App() {
  const medicines = [
    { name: "Paracetamol", frequency: "Morning, Night" },
    { name: "Vitamin D", frequency: "Morning" },
  ];

  // ⏰ Local reminders
  useMedicineReminders(medicines);

  // 🔔 Firebase Notifications
  useEffect(() => {
    requestForToken();

    onMessageListener()
      .then((payload) => {
        console.log("📩 Message received: ", payload);
        toast.info(
          payload.notification?.title
            ? `${payload.notification.title} - ${payload.notification.body}`
            : "💊 New Reminder!"
        );
      })
      .catch((err) => console.error("❌ Error in listener:", err));
  }, []);

  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="bg-red-500 p-4 text-white flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/add">Add</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/settings">Settings</Link>
        </div>

        <div className="flex gap-4">
          {userName ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="font-semibold"
              >
                {userName}
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-800 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Sign up</Link>
              <Link to="/login">Sign in</Link>
            </>
          )}
        </div>
      </nav>

      {/* Pages */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home medicines={medicines} />} />
          <Route path="/add" element={<AddMedicineForm />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/stats" element={<StatsDashboard />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />   {/* 👈 Profile route */}
        </Routes>
      </main>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
