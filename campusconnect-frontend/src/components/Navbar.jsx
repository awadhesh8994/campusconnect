// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Tailwind classes reused for desktop items
  const base =
    'px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2';
  const mobileBase =
    'px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3';

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header bar ------------------------------------------------ */}
        <div className="flex justify-between items-center h-16">
          {/* Logo -------------------------------------------------------- */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-lg">CC</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
              CampusConnect
            </h1>
          </Link>

          {/* Desktop Navigation ----------------------------------------- */}
          <div className="hidden md:flex items-center space-x-1">
            {token ? (
              /* -------- AFTER LOGIN -------- */
              <>
                <NavLink to="/" className={base}>
                  <span>🏠</span> <span>Home</span>
                </NavLink>

                <NavLink to="/community" className={base}>
                  <span>🧑‍🤝‍🧑</span> <span>Community</span>
                </NavLink>

                <NavLink to="/notes" className={base}>
                  <span>📖</span> <span>Study Notes</span>
                </NavLink>

                {currentUser && (
  <NavLink to="/chat" className={base}>
    <span>💬</span> <span>Chat</span>
  </NavLink>
)}


                {/* Events dropdown */}
                <div className="relative group">
                  <button className={`${base} space-x-1`}>
                    <span>🎉</span> <span>Events</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.25 6.75 10 11.25 14.75 6.75H5.25Z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-lg py-2 mt-2 w-44 z-20">
                    <NavLink to="/events" className={`${base} block`}>
                      All Events
                    </NavLink>
                    <NavLink to="/events/create" className={`${base} block`}>
                      Create Event
                    </NavLink>
                    <NavLink to="/events/my" className={`${base} block`}>
                      My Events
                    </NavLink>
                  </div>
                </div>

                <NavLink to="/profile/me" className={base}>
                  <span>👤</span> <span>Profile</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className={`${base} text-red-600 ml-2`}
                >
                  <span>🚪</span> <span>Logout</span>
                </button>
              </>
            ) : (
              /* -------- BEFORE LOGIN -------- */
              <>
                <NavLink to="/" className={base}>
                  <span>🏠</span> <span>Home</span>
                </NavLink>

                <NavLink to="/about" className={base}>
                  <span>ℹ️</span> <span>About</span>
                </NavLink>

                <NavLink to="/events" className={base}>
                  <span>🎉</span> <span>Events</span>
                </NavLink>

                <NavLink to="/notes" className={base}>
                  <span>📖</span> <span>Study Notes</span>
                </NavLink>

                <NavLink to="/login" className={base}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium shadow hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile toggle button --------------------------------------- */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu -------------------------------------------------- */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-2">
              {token ? (
                /* ----- AFTER LOGIN (mobile) ----- */
                <>
                  <NavLink to="/" className={mobileBase}>
                    🏠 Home
                  </NavLink>
                  <NavLink to="/community" className={mobileBase}>
                    🧑‍🤝‍🧑 Community
                  </NavLink>
                  <NavLink to="/notes" className={mobileBase}>
                    📖 Study Notes
                  </NavLink>
                  {currentUser && (
  <NavLink to="/chat" className={mobileBase}>
    💬 Chat
  </NavLink>
)}

                  <NavLink to="/events" className={mobileBase}>
                    🎉 All Events
                  </NavLink>
                  <NavLink to="/events/create" className={mobileBase}>
                    📅 Create Event
                  </NavLink>
                  <NavLink to="/events/my" className={mobileBase}>
                    📋 My Events
                  </NavLink>
                  <NavLink to="/profile/me" className={mobileBase}>
                    👤 Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className={`${mobileBase} text-red-600`}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                /* ----- BEFORE LOGIN (mobile) ----- */
                <>
                  <NavLink to="/" className={mobileBase}>
                    🏠 Home
                  </NavLink>
                  <NavLink to="/about" className={mobileBase}>
                    ℹ️ About
                  </NavLink>
                  <NavLink to="/events" className={mobileBase}>
                    🎉 Events
                  </NavLink>
                  <NavLink to="/notes" className={mobileBase}>
                    📖 Study Notes
                  </NavLink>
                  <NavLink to="/login" className={mobileBase}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={`${mobileBase} bg-indigo-500 text-white justify-center`}
                  >
                    📝 Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
