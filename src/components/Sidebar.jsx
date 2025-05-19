import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ features, userLabel }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Read initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      // fallback to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };
  const [expanded, setExpanded] = useState(false);
  const [darkTheme, setDarkTheme] = useState(getInitialTheme);

  // Apply theme on mount and when darkTheme changes
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

  const handleLogout = () => {
    localStorage.removeItem("rbac_current_user");
    navigate("/login");
  };

  const handleThemeToggle = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <aside
      className={`bg-background text-primary flex flex-col shadow-lg h-screen transition-all duration-300 ${expanded ? 'w-56' : 'w-12'}`}
      style={{ zIndex: 20 }}
    >
      {/* Fixed Logo at Top */}
      <div className="flex items-center justify-center py-6 px-2">
        <img
          src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHive-Logo.png"
          alt="Logo"
          className={`transition-all duration-300 ${expanded ? 'w-12 h-12' : 'w-10 h-10'}`}
        />
        {expanded && (
          <span className="ml-3 text-2xl font-bold tracking-wide">{userLabel}</span>
        )}
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-thin scrollbar-thumb-[#888] scrollbar-track-transparent">
        <div className="flex flex-col gap-2">
          {features.map((f) => {
            const isActive = location.pathname === f.route;
            return (
              <button
                key={f.label}
                onClick={() => navigate(f.route)}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-lg font-medium text-left relative
                  ${isActive ? 'bg-accent shadow-lg' : 'hover:bg-accent'}
                  ${expanded ? 'justify-start' : 'justify-center'}
                `}
                title={!expanded ? f.label : undefined}
              >
                <span className="text-2xl">{f.icon}</span>
                {expanded && <span className="whitespace-nowrap">{f.label}</span>}
                {/* Tooltip for collapsed */}
                {!expanded && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                    {f.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Fixed Buttons at Bottom */}
      <div className="flex flex-col items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/30 text-white font-semibold transition-colors w-full justify-center"
          style={{ background: "transparent" }}
          title="Logout"
        >
          <span className="text-2xl">🚪</span>
          {expanded && <span className="text-foreground">Logout</span>}
        </button>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="bg-[#23232B] hover:bg-neutral-800 text-white rounded-full p-2 transition-colors"
          title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {expanded ? (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <button
          onClick={handleThemeToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/30 text-white font-semibold transition-colors w-full justify-center"
          style={{ background: "transparent" }}
          title={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="text-2xl">{darkTheme ? '🌙' : '☀️'}</span>
          {expanded && <span className="text-foreground">{darkTheme ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>
      </div>

      <style>{`
        /* Custom scrollbar for browsers that don't support Tailwind's scrollbar utilities */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </aside>
  );
} 