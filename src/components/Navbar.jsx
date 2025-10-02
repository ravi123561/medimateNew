import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId"); // यह login में set होना चाहिए
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4 relative">
      {/* Left side links */}
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </div>

      {/* Right side user info / auth links */}
      <div className="space-x-4 relative">
        {userName ? (
          <>
            <button
              className="font-semibold"
              onClick={() => setShowProfile(!showProfile)}
            >
              {userName}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>

            {/* Profile panel - यह अब navbar के अंदर ही होगा */}
            {showProfile && (
              <div className="absolute right-0 top-12 w-96 bg-white text-black rounded shadow-lg p-4 z-50">
                <UserProfile userId={userId} />
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Sign in</Link>
          </>
        )}
      </div>
    </nav>
  );
}
