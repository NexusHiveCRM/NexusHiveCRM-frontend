import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';

const groups = ["All", "Deans", "HoDs", "Faculty", "Students", "Parents", "Admin Units"];
const stakeholders = ["Deans/HoDs", "Faculty", "Students", "Parents", "Admin Units"];
const archiveDemo = [
  { date: "2024-03-10", role: "Deans", topic: "Annual Report", subject: "Submit annual reports by 20th March", attachment: "Report_Guidelines.pdf" },
  { date: "2024-03-08", role: "Students", topic: "Fee Update", subject: "Fee deadline extended for 3 departments", attachment: "Fee_Circular.pdf" },
  { date: "2024-03-05", role: "Faculty", topic: "Policy", subject: "Revised attendance policy", attachment: "Attendance_Policy.pdf" },
];
const inboxDemo = [
  { from: "Dean Science", subject: "Proposal: New Research Center", status: "Awaiting" },
  { from: "HoD EEE", subject: "Escalation: Lab Equipment", status: "Responded" },
  { from: "Faculty Math", subject: "Suggestion: New Elective", status: "Awaiting" },
];
const analytics = [
  { label: "Messages Sent", value: 128 },
  { label: "Opened", value: 112 },
  { label: "Responded", value: 87 },
];
const engagement = [
  { role: "Deans", value: 90 },
  { role: "HoDs", value: 80 },
  { role: "Faculty", value: 70 },
  { role: "Students", value: 60 },
];
const aiDraft = "Congratulations to the 2025 batch! We welcome all new students and parents to our university family.";
const aiTone = "Positive, Warm";
const aiReplies = ["Thank you for the update!", "Will comply.", "Noted."];
const integrations = [
  { name: "Academic Calendar", desc: "Sync announcement dates with exams, holidays" },
  { name: "Approval Center", desc: "Auto-notify departments about approvals/rejections" },
  { name: "LMS/ERP", desc: "Seamless student/staff ID-based targeting" },
  { name: "SMS Gateway / Email APIs", desc: "Broader reach beyond app users" },
];

export default function CommunicationHub() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [stakeTab, setStakeTab] = useState(stakeholders[0]);

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Communication Hub</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Centralized command center for all high-level internal and external communication.</p>
        </div>

        {/* 1. Broadcast Messages */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Broadcast Messages</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Announcement subject..." />
              <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {groups.map(g => <option key={g}>{g}</option>)}
              </select>
              <input type="datetime-local" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Push, email, and in-app notifications will be sent to selected group(s).</div>
          </div>
        </section>

        {/* 2. Internal Stakeholder Communication */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Internal Stakeholder Communication</h2>
          <div className="flex gap-2 mb-2">
            {stakeholders.map(st => (
              <button key={st} onClick={() => setStakeTab(st)} className={`px-3 py-1 rounded-lg text-xs font-semibold ${stakeTab === st ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>{st}</button>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2">
            <div className="text-xs font-semibold mb-1">{stakeTab} Thread</div>
            <div className="flex flex-col gap-1">
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded-lg p-2 text-xs">[Director] Please submit annual department reports before 20th March.</div>
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 text-xs">[Dean] Noted, will share by 15th March.</div>
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg p-2 text-xs">[HoD] Requesting template for report submission.</div>
            </div>
          </div>
        </section>

        {/* 3. Message Archives */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Message Archives</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <input className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Search by topic..." />
              <select className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <option>All Roles</option>
                <option>Deans</option>
                <option>HoDs</option>
                <option>Faculty</option>
                <option>Students</option>
              </select>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>Date</th><th>Role</th><th>Topic</th><th>Subject</th><th>Attachment</th>
                </tr>
              </thead>
              <tbody>
                {archiveDemo.map((msg, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{msg.date}</td><td>{msg.role}</td><td>{msg.topic}</td><td>{msg.subject}</td>
                    <td>{msg.attachment && <a href="#" className="text-blue-600 underline">{msg.attachment}</a>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Incoming Communication */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Incoming Communication</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>From</th><th>Subject</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inboxDemo.map((msg, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{msg.from}</td><td>{msg.subject}</td>
                    <td><span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.status === "Awaiting" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}>{msg.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Reports & Insights */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Reports & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {analytics.map(a => (
              <div key={a.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-1">{a.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{a.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-xs">Sentiment Summary</h3>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-4 rounded-full bg-green-500" style={{ width: `70%` }}></div>
              </div>
              <div className="text-xs mt-1">70% Positive, 20% Neutral, 10% Negative</div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-xs">Engagement Heatmap</h3>
              <div className="flex gap-2">
                {engagement.map(e => (
                  <div key={e.role} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold">{e.value}%</div>
                    <div className="text-xs mt-1">{e.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Secure Messaging */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Secure Messaging</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-xs"><span className="mr-1">🔒</span>Confidential Message</span>
            <span className="text-xs">Visible only to: Director, Dean, HoD</span>
            <span className="text-xs text-green-600">Read Receipt: Yes</span>
          </div>
        </section>

        {/* 7. AI-Powered Assistant */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI-Powered Assistant</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2">
            <div>
              <span className="font-semibold text-xs">Draft Assistant:</span>
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded-lg p-2 text-xs mt-1">{aiDraft}</div>
            </div>
            <div>
              <span className="font-semibold text-xs">Tone Analyzer:</span>
              <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-200 rounded-lg p-2 text-xs mt-1">{aiTone}</div>
            </div>
            <div>
              <span className="font-semibold text-xs">Auto-Reply Suggestions:</span>
              <div className="flex gap-2 mt-1">
                {aiReplies.map((r, i) => <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-xs">{r}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Integration */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {integrations.map(card => (
              <div key={card.name} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">{card.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 