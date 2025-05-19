import React from "react";
import Sidebar from "./Sidebar";

const features = [
  { label: "Dashboard", icon: "🏠", route: "/rbac/director" },
  { label: "All Reports", icon: "📊", route: "/rbac/director/reports" },
  { label: "Teams", icon: "👥", route: "/rbac/director/teams" },
  { label: "Settings", icon: "⚙️", route: "/rbac/director/settings" },
];

export default function DirectorDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ede7f6] to-[#e3f0ff]">
      <Sidebar features={features} />
      <main className="flex-1 p-10 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-[#4f3cc9] mb-4">Welcome, Director!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">📊</span>
            <div className="font-semibold text-lg mb-1">All Reports</div>
            <div className="text-gray-500 mb-4">View and analyze all university reports.</div>
            <button className="text-[#4f3cc9] font-semibold hover:underline">Go to Reports</button>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">👥</span>
            <div className="font-semibold text-lg mb-1">Teams</div>
            <div className="text-gray-500 mb-4">View and manage all teams.</div>
            <button className="text-[#4f3cc9] font-semibold hover:underline">Go to Teams</button>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">⚙️</span>
            <div className="font-semibold text-lg mb-1">Settings</div>
            <div className="text-gray-500 mb-4">Configure your preferences.</div>
            <button className="text-[#4f3cc9] font-semibold hover:underline">Settings</button>
          </div>
        </div>
      </main>
    </div>
  );
} 