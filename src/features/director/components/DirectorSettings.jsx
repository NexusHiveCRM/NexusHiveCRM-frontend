import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';

const settingsCategories = [
  {
    name: "Institutional Settings",
    options: [
      { label: "Name", value: "Nexus University" },
      { label: "Type", value: "Private" },
      { label: "Accreditation", value: "NAAC A+" },
      { label: "Academic Year", value: "2024-25" },
    ],
  },
  {
    name: "Academic Configuration",
    options: [
      { label: "Semester System", value: "Enabled" },
      { label: "Credit Transfer", value: "Allowed" },
      { label: "Attendance Policy", value: "75% Minimum" },
    ],
  },
  {
    name: "Access Permissions",
    options: [
      { label: "Director", value: "Full" },
      { label: "Dean", value: "Partial" },
      { label: "HoD", value: "Limited" },
      { label: "Faculty", value: "Restricted" },
    ],
  },
  {
    name: "Notifications",
    options: [
      { label: "Push Notifications", value: "Enabled" },
      { label: "Email Alerts", value: "Enabled" },
      { label: "SMS Alerts", value: "Disabled" },
    ],
  },
  {
    name: "Data & Privacy",
    options: [
      { label: "Data Retention", value: "5 Years" },
      { label: "Encryption", value: "AES-256" },
      { label: "2FA", value: "Enabled" },
    ],
  },
];

export default function DirectorSettings() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [activeCategory, setActiveCategory] = useState(settingsCategories[0].name);

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Director Settings</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Configure institution-wide settings and permissions.</p>
        </div>

        {/* Settings Categories */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {settingsCategories.map(cat => (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)} 
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeCategory === cat.name 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Settings Options */}
        <section>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            {settingsCategories.find(cat => cat.name === activeCategory).options.map((opt, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span className="text-sm text-gray-900 dark:text-white font-medium">{opt.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{opt.value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 