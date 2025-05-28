import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { directorFeatures } from './directorFeatures';

const supportChannels = [
  { icon: "💬", label: "Live Chat", desc: "Chat with support team (9am-6pm)", status: "Online" },
  { icon: "✉️", label: "Email", desc: "support@university.edu", status: "24/7" },
  { icon: "📞", label: "Phone", desc: "+1-800-123-4567", status: "9am-5pm" },
];

const knowledgeBase = [
  { icon: "❓", title: "FAQs", desc: "Frequently asked questions about the CRM and university processes." },
  { icon: "📚", title: "User Guides", desc: "Step-by-step guides for common tasks and features." },
  { icon: "📄", title: "Policy Docs", desc: "Access university policies and compliance documents." },
];

const initialTickets = [
  { id: "#1023", subject: "Unable to access analytics dashboard", status: "Open", priority: "High", date: "2024-04-10" },
  { id: "#1019", subject: "Request for new user onboarding", status: "Resolved", priority: "Medium", date: "2024-04-08" },
  { id: "#1015", subject: "Password reset issue", status: "Closed", priority: "Low", date: "2024-04-05" },
];

const quickLinks = [
  { icon: "📖", label: "CRM Handbook", url: "#" },
  { icon: "📝", label: "Raise a Ticket", url: "#" },
  { icon: "📑", label: "Policy Center", url: "#" },
  { icon: "🎥", label: "Video Tutorials", url: "#" },
];

function NewTicketModal({ onClose, onSubmit }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError("Subject and description are required.");
      return;
    }
    onSubmit({ subject, description, priority });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold">&times;</button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input type="text" className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-sm" value={subject} onChange={e => setSubject(e.target.value)} maxLength={80} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-sm" value={description} onChange={e => setDescription(e.target.value)} rows={4} maxLength={400} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-sm" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          {error && <div className="text-red-600 text-xs">{error}</div>}
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DirectorSupport() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [activeTab, setActiveTab] = useState("Support Channels");
  const [tickets, setTickets] = useState(initialTickets);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleNewTicket = (data) => {
    const newTicket = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      subject: data.subject,
      status: "Open",
      priority: data.priority,
      date: new Date().toISOString().slice(0, 10),
    };
    setTickets([newTicket, ...tickets]);
    setShowModal(false);
    setSuccessMsg("Ticket created successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {["Support Channels", "Knowledge Base", "Ticket Status", "Quick Links"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {activeTab === "Support Channels" && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Support Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((ch, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-2 border-l-4" style={{ borderColor: '#6366f1' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{ch.icon}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{ch.label}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{ch.desc}</div>
                  <span className={`text-xs font-semibold ${ch.status === "Online" ? "text-green-600" : "text-blue-600"}`}>{ch.status}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === "Knowledge Base" && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Knowledge Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {knowledgeBase.map((kb, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-2 border-l-4" style={{ borderColor: '#6366f1' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{kb.icon}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{kb.title}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{kb.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === "Ticket Status" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Support Tickets</h2>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setShowModal(true)}>
                + Create New Ticket
              </button>
            </div>
            {successMsg && <div className="mb-2 text-green-600 text-sm font-semibold">{successMsg}</div>}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-300">Ticket ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-300">Subject</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-300">Priority</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-300">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="px-4 py-2 text-sm text-blue-700 dark:text-blue-300 font-semibold">{t.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{t.subject}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${t.priority === "Critical" ? "bg-red-200 text-red-800" : t.priority === "High" ? "bg-orange-200 text-orange-800" : t.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"}`}>{t.priority}</span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${t.status === "Open" ? "bg-green-100 text-green-700" : t.status === "Resolved" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>{t.status}</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {showModal && <NewTicketModal onClose={() => setShowModal(false)} onSubmit={handleNewTicket} />}
          </section>
        )}
        {activeTab === "Quick Links" && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
            <div className="flex flex-wrap gap-4">
              {quickLinks.map((link, i) => (
                <a key={i} href={link.url} className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 text-sm font-medium transition">
                  <span className="text-xl">{link.icon}</span> {link.label}
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
} 