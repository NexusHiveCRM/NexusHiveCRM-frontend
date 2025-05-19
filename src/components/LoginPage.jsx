import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../services/localStorageService";

// Map team/role to dashboard route
const dashboardRoute = (user) => {
  if (user.role === "Super Admin") return "/rbac";
  if (user.team === "Marketing Team" && user.role === "Head") return "/rbac/marketing-head";
  if (user.team === "Marketing Team" && user.role === "Manager") return "/rbac/marketing-manager";
  if (user.team === "Admission Team" && user.role === "Head") return "/rbac/admission-head";
  if (user.team === "Admission Team" && user.role === "SPOC") return "/rbac/admission-spoc";
  if (user.team === "HR & PayRoll Team" && user.role === "CFO/Head") return "/rbac/hr-head";
  if (user.team === "HR & PayRoll Team" && user.role === "Manager") return "/rbac/hr-manager";
  if (user.team === "Director and Deans" && user.role === "Director") return "/rbac/director";
  if (user.team === "Director and Deans" && user.role === "Dean") return "/rbac/dean";
  // Add more as you build more dashboards
  // Default fallback
  return "/unauthorized";
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = localStorageService.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("rbac_current_user", JSON.stringify(user));
      navigate(dashboardRoute(user));
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f3cc9] via-[#6c5dd3] to-[#90caf9]">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        {/* Left Side - Logo & Tagline */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-white/10 p-10 rounded-l-3xl">
          <img src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/NexusHiveCRM/NexusHive-Logo.png" alt="NexusHiveCRM Logo" className="w-28 h-28 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">NexusHiveCRM</h2>
          <p className="text-white/80 text-center text-lg font-medium drop-shadow">Empowering Universities with Modern Management Solutions</p>
        </div>
        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-white/20 rounded-r-3xl">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-[#23232B] mb-8">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 text-[#23232B] placeholder:text-[#23232B]/60 focus:outline-none focus:ring-2 focus:ring-[#4f3cc9] font-medium shadow"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f3cc9]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#4f3cc9"/></svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 text-[#23232B] placeholder:text-[#23232B]/60 focus:outline-none focus:ring-2 focus:ring-[#4f3cc9] font-medium shadow"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f3cc9]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V8a6 6 0 10-12 0v2a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H6V8zm10 10H4v-6h16v6z" fill="#4f3cc9"/></svg>
                  </span>
                </div>
                <div className="flex justify-end mt-1">
                  <button type="button" className="text-xs text-[#4f3cc9] hover:underline">Forgot Password?</button>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#23232B] text-white font-semibold text-lg shadow hover:bg-[#4f3cc9] transition-colors flex items-center justify-center gap-2"
              >
                Sign In
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 