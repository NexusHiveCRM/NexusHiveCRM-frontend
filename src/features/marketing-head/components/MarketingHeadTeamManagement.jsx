import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo, FiExternalLink, FiUserCheck, FiUsers, FiSettings, FiClipboard, FiBarChart2, FiBookOpen, FiMessageCircle, FiAlertCircle, FiCalendar, FiTarget } from 'react-icons/fi';

// Demo data for team members
const teamMembers = [
  {
    id: 1,
    name: "Abdullah Al-Rashid",
    role: "Campaign Manager",
    email: "abdullah.alrashid@mbsc.edu.sa",
    phone: "+1 234 567 890",
    performance: 92,
    status: "Active",
    avatar: "👨‍💼",
    skills: ["Digital Marketing", "Content Strategy", "Social Media"],
    projects: ["Q2 Campaign", "Brand Refresh"],
  },
  {
    id: 2,
    name: "Noura Al-Zahra",
    role: "Content Strategist",
    email: "noura.alzahra@mbsc.edu.sa",
    phone: "+1 234 567 891",
    performance: 88,
    status: "Active",
    avatar: "👩‍💼",
    skills: ["Content Creation", "SEO", "Copywriting"],
    projects: ["Blog Series", "Email Campaign"],
  },
  {
    id: 3,
    name: "Khalid Al-Sayed",
    role: "Digital Marketer",
    email: "khalid.alsayed@mbsc.edu.sa",
    phone: "+1 234 567 892",
    performance: 85,
    status: "On Leave",
    avatar: "👨‍💼",
    skills: ["Social Media", "Community Management", "Analytics"],
    projects: ["Social Campaign", "Influencer Outreach"],
  },
];

// Demo data for performance metrics
const performanceMetrics = [
  { metric: "Lead Generation", target: 1000, achieved: 850 },
  { metric: "Conversion Rate", target: 35, achieved: 32 },
  { metric: "Campaign ROI", target: 300, achieved: 285 },
  { metric: "Social Engagement", target: 5000, achieved: 4800 },
];

export default function MarketingHeadTeamManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const Modal = ({ member, onClose }) => {
    if (!member) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{member.avatar}</span>
              <div>
                <h2 className="text-xl font-bold">{member.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-sm">{member.email}</p>
              <p className="text-sm">{member.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Current Projects</h3>
              <div className="space-y-2">
                {member.projects.map((project, index) => (
                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">Manage Team <FiUsers className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track, assign, guide, and improve your marketing team with smart tools and AI insights.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Team Member</button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Export Report</button>
        </div>
      </div>

      {/* 1. Team Structure & Hierarchy */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiUsers className="text-blue-500" /><h2 className="text-lg font-semibold">Team Structure & Hierarchy</h2><span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Suggestion</span></div>
        {/* Demo: Grouped by role, hierarchy tree, assign supervisors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">By Role</h3>
            <ul className="space-y-1 text-sm">
              <li>Campaign Managers: Abdullah Al-Rashid</li>
              <li>Digital Marketers: Khalid Al-Sayed</li>
              <li>Content Strategists: Noura Al-Zahra</li>
              <li>Admission Counselors: (none)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">Reporting Hierarchy</h3>
            <ul className="space-y-1 text-sm">
              <li>Abdullah Al-Rashid (Supervisor) → Khalid Al-Sayed, Noura Al-Zahra</li>
            </ul>
            <div className="mt-2 text-xs text-blue-600 animate-bounce">AI: Suggests moving Noura Al-Zahra to Digital for better workload balance</div>
          </div>
        </div>
      </section>

      {/* 2. Role-based Access & Permissions */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiSettings className="text-purple-500" /><h2 className="text-lg font-semibold">Role-based Access & Permissions</h2></div>
        {/* Demo: Table of roles and permissions */}
        <table className="w-full text-sm mt-2">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th>Member</th><th>Role</th><th>Permissions</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Abdullah Al-Rashid</td><td>Campaign Manager</td><td>All</td><td><button className="text-blue-600">Edit</button></td></tr>
            <tr><td>Noura Al-Zahra</td><td>Content Strategist</td><td>Content, Campaigns</td><td><button className="text-blue-600">Edit</button></td></tr>
            <tr><td>Khalid Al-Sayed</td><td>Digital Marketer</td><td>Campaigns</td><td><button className="text-blue-600">Edit</button></td></tr>
          </tbody>
        </table>
        <div className="mt-2 text-xs text-purple-600">AI: Suggests permission template for new role</div>
      </section>

      {/* 3. Task Assignment & Tracking */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiClipboard className="text-green-500" /><h2 className="text-lg font-semibold">Task Assignment & Tracking</h2><span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Smart Assignment</span></div>
        {/* Demo: Task list, status, progress, AI suggestions */}
        <table className="w-full text-sm mt-2">
          <thead><tr><th>Task</th><th>Assigned To</th><th>Status</th><th>Progress</th><th>Deadline</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>Launch Q2 Campaign</td><td>Abdullah Al-Rashid</td><td>In Progress</td><td>70%</td><td>2024-07-10</td><td><button className="text-blue-600">Edit</button></td></tr>
            <tr><td>Write Blog Series</td><td>Noura Al-Zahra</td><td>Pending</td><td>0%</td><td>2024-07-12</td><td><button className="text-blue-600">Edit</button></td></tr>
            <tr><td>Social Media Audit</td><td>Khalid Al-Sayed</td><td>Completed</td><td>100%</td><td>2024-06-30</td><td><button className="text-blue-600">Edit</button></td></tr>
          </tbody>
        </table>
        <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Assigns "Write Blog Series" to Noura Al-Zahra based on skill and availability</div>
      </section>

      {/* 4. Performance Dashboard */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiBarChart2 className="text-pink-500" /><h2 className="text-lg font-semibold">Performance Dashboard</h2><span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">AI Leaderboard</span></div>
        {/* Demo: KPIs, comparison, leaderboard, appraisal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">KPIs</h3>
            <ul className="space-y-1 text-sm">
              <li>Leads Handled: Abdullah Al-Rashid (120), Noura Al-Zahra (90), Khalid Al-Sayed (80)</li>
              <li>Conversions: Abdullah Al-Rashid (30), Noura Al-Zahra (25), Khalid Al-Sayed (20)</li>
              <li>Campaign ROI: Abdullah Al-Rashid (3.2x), Noura Al-Zahra (2.8x), Khalid Al-Sayed (2.5x)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-1">Leaderboard</h3>
            <ol className="list-decimal ml-4 text-sm">
              <li>Abdullah Al-Rashid (Score: 92)</li>
              <li>Noura Al-Zahra (Score: 88)</li>
              <li>Khalid Al-Sayed (Score: 85)</li>
            </ol>
            <div className="mt-2 text-xs text-pink-600 animate-bounce">AI: Predicts Khalid Al-Sayed at risk of burnout</div>
          </div>
        </div>
      </section>

      {/* 5. Training & Development Tracker */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiBookOpen className="text-yellow-500" /><h2 className="text-lg font-semibold">Training & Development Tracker</h2><span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Recommendations</span></div>
        {/* Demo: Training attendance, badges, feedback */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: Attended "Digital Marketing Bootcamp" <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Certified</span></li>
          <li>Noura Al-Zahra: Attended "Content Strategy Seminar" <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">In Progress</span></li>
          <li>Khalid Al-Sayed: Not attended recent training</li>
        </ul>
        <div className="mt-2 text-xs text-yellow-600 animate-bounce">AI: Recommends "Social Media Analytics" for Khalid Al-Sayed</div>
      </section>

      {/* 6. Communication Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiMessageCircle className="text-blue-400" /><h2 className="text-lg font-semibold">Communication Center</h2><span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Summary</span></div>
        {/* Demo: Announcements, reminders, briefs */}
        <ul className="space-y-1 text-sm">
          <li>Announcement: "Q2 Campaign Launch on July 10"</li>
          <li>Reminder: "Submit weekly report by Friday"</li>
          <li>Brief: "SOP for Event Coordination uploaded"</li>
        </ul>
        <div className="mt-2 text-xs text-blue-600 animate-bounce">AI: Top 3 updates for Abdullah Al-Rashid: Campaign Launch, Report Reminder, SOP Upload</div>
      </section>

      {/* 7. Issue Escalation Panel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiAlertCircle className="text-red-500" /><h2 className="text-lg font-semibold">Issue Escalation Panel</h2><span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">AI Prioritization</span></div>
        {/* Demo: Issue list, status, escalation */}
        <ul className="space-y-1 text-sm">
          <li>Khalid Al-Sayed: "Cannot access campaign analytics" <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pending</span></li>
          <li>Noura Al-Zahra: "Need approval for blog series" <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Resolved</span></li>
        </ul>
        <div className="mt-2 text-xs text-red-600 animate-bounce">AI: Prioritizes Khalid Al-Sayed's issue as urgent</div>
      </section>

      {/* 8. Attendance & Availability */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiCalendar className="text-green-500" /><h2 className="text-lg font-semibold">Attendance & Availability</h2><span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Forecast</span></div>
        {/* Demo: Check-ins, leaves, roster */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: Present</li>
          <li>Noura Al-Zahra: On Leave (July 8-10)</li>
          <li>Khalid Al-Sayed: Present</li>
        </ul>
        <div className="mt-2 text-xs text-green-600 animate-bounce">AI: Predicts resource gap on July 8-10</div>
      </section>

      {/* 9. Goal Planning & Reviews */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-2"><FiTarget className="text-purple-500" /><h2 className="text-lg font-semibold">Goal Planning & Reviews</h2><span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded animate-pulse">AI Goal Setting</span></div>
        {/* Demo: Goals, reviews, feedback */}
        <ul className="space-y-1 text-sm">
          <li>Abdullah Al-Rashid: July Goal - 40 conversions</li>
          <li>Noura Al-Zahra: July Goal - 10 blog posts</li>
          <li>Khalid Al-Sayed: July Goal - 20 social campaigns</li>
        </ul>
        <div className="mt-2 text-xs text-purple-600 animate-bounce">AI: Suggests higher goal for Abdullah Al-Rashid based on past performance</div>
      </section>

      {showModal && <Modal member={selectedMember} onClose={() => setShowModal(false)} />}
    </div>
  );
} 