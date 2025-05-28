import React from "react";
import Sidebar from "./Sidebar";
import { directorFeatures } from './directorFeatures';

const settingsCategories = [
  {
    icon: "🏛️",
    title: "Institution Settings",
    description: "University profile, academic calendar, localization, and contact info.",
    summary: [
      "Name, Address, Logo, Website",
      "Academic Year Calendar",
      "Time Zone & Localization"
    ]
  },
  {
    icon: "🧑‍🎓",
    title: "Academic Configuration",
    description: "Grading, department hierarchy, program types, and attendance rules.",
    summary: [
      "Grading Policies",
      "Department & Subject Hierarchy",
      "Program Types",
      "Credit & Attendance Rules"
    ]
  },
  {
    icon: "🛡️",
    title: "Access & Permission Settings",
    description: "RBAC, custom roles, approval workflows, and security policies.",
    summary: [
      "Role-Based Access Control",
      "Custom Role Builder",
      "Approval Workflow Designer",
      "Login & Security Policies"
    ]
  },
  {
    icon: "🧠",
    title: "AI & Automation Settings",
    description: "AI feature toggles, automation rules, and smart recommendations.",
    summary: [
      "AI Feature Toggles",
      "Automation Rules",
      "Smart Recommendations"
    ]
  },
  {
    icon: "🖼️",
    title: "Branding & UI Customization",
    description: "Theme, logo, portal labels, and UI preferences.",
    summary: [
      "Theme & Colors",
      "Logo & Header/Footer",
      "Custom Portal Labels"
    ]
  },
  {
    icon: "💼",
    title: "HR & Payroll Settings",
    description: "Leave policies, payroll cycles, and recruitment approvals.",
    summary: [
      "Leave Policies",
      "Payroll Cycles",
      "Recruitment Approval Chain"
    ]
  },
  {
    icon: "🧾",
    title: "Financial & Fee Settings",
    description: "Fee categories, payment gateways, tax, and compliance.",
    summary: [
      "Fee Categories",
      "Payment Gateway Config",
      "Auto Fee Calculation",
      "Tax & Compliance"
    ]
  },
  {
    icon: "📢",
    title: "Communication Preferences",
    description: "Templates, messaging APIs, and notification scheduling.",
    summary: [
      "Email & SMS Templates",
      "WhatsApp/Telegram API",
      "Notification Scheduling"
    ]
  },
  {
    icon: "🔌",
    title: "Integrations & APIs",
    description: "LMS/ERP, SSO, third-party tools, and API/webhooks.",
    summary: [
      "LMS/ERP Integration",
      "Single Sign-On",
      "Third-Party Tools",
      "API Tokens & Webhooks"
    ]
  },
  {
    icon: "🛠️",
    title: "Backup & Maintenance",
    description: "Database backup, maintenance mode, changelog, and support access.",
    summary: [
      "Database Backup",
      "Maintenance Mode",
      "Update Log",
      "Support Access"
    ]
  },
  {
    icon: "📊",
    title: "Audit & Compliance",
    description: "Policy uploads, audit logs, and access violation rules.",
    summary: [
      "Policy Uploads",
      "Audit Logs Settings",
      "Access Violation Rules"
    ]
  },
  {
    icon: "🧪",
    title: "Experimental Features / Labs",
    description: "Beta features, AI integrations, and smart tools.",
    summary: [
      "ChatGPT Integration",
      "AI Performance Predictor",
      "Visual Timetable Builder",
      "Smart Alerts"
    ]
  }
];

export default function DirectorSettings() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {settingsCategories.map((cat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-3 border-l-4" style={{ borderColor: '#6366f1' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{cat.title}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cat.description}</p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 list-disc pl-5 mb-2">
                {cat.summary.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
              <button className="self-end px-4 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">View Details</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 