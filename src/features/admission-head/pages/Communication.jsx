import React, { useState, useEffect } from 'react';
import { FiMail, FiMessageCircle, FiPhone, FiUsers, FiUser, FiCheckCircle, FiXCircle, FiAlertCircle, FiZap, FiDownload, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiSend, FiFilter, FiSearch, FiPlus, FiArrowRight, FiClock } from 'react-icons/fi';

// Mock data for communications
const mockRecipients = [
  { name: 'Aarav Sharma', role: 'Student' },
  { name: 'Sara Khan', role: 'Parent' },
  { name: 'EduWorld', role: 'Agent' },
  { name: 'Priya Singh', role: 'Team' },
];
const mockOutgoing = [
  { id: 1, recipient: mockRecipients[0], type: 'Email', subject: 'Application Received', preview: 'Dear Aarav, your application...', date: '2024-06-10', time: '10:00', sentBy: 'User', status: 'Delivered' },
  { id: 2, recipient: mockRecipients[1], type: 'SMS', subject: 'Parent Counseling Reminder', preview: 'Dear Parent, your session...', date: '2024-06-10', time: '11:00', sentBy: 'Bot', status: 'Opened' },
  { id: 3, recipient: mockRecipients[2], type: 'WhatsApp', subject: 'Agent Meeting', preview: 'Hi, please confirm...', date: '2024-06-09', time: '15:00', sentBy: 'User', status: 'Failed' },
  { id: 4, recipient: mockRecipients[3], type: 'Chatbot', subject: 'Team Sync', preview: 'Team, please join...', date: '2024-06-08', time: '14:00', sentBy: 'Bot', status: 'Replied' },
];
const mockIncoming = [
  { id: 1, sender: mockRecipients[0], type: 'Email', subject: 'Re: Application', preview: 'Thank you for the update...', date: '2024-06-10', time: '10:30', status: 'Needs Follow-up', tags: ['Scholarship Query'] },
  { id: 2, sender: mockRecipients[1], type: 'SMS', subject: 'Parent Query', preview: 'Can I reschedule...', date: '2024-06-10', time: '11:10', status: 'Escalated', tags: ['Deadline Confusion'] },
  { id: 3, sender: mockRecipients[2], type: 'WhatsApp', subject: 'Agent Docs', preview: 'Documents attached...', date: '2024-06-09', time: '15:20', status: 'Replied', tags: [] },
];
const mockTemplates = [
  { id: 1, name: 'Application Acknowledgment', type: 'Email', content: 'Dear {Name}, your application {ApplicationID} has been received.', lang: 'EN', approved: true },
  { id: 2, name: 'Interview Invitation', type: 'SMS', content: 'Dear {Name}, your interview is scheduled on {Date}.', lang: 'EN', approved: false },
];
const mockNotes = [
  { id: 1, candidate: 'Aarav Sharma', note: 'VIP applicant, flag for director review.', tags: ['VIP', 'Flagged'], private: false },
  { id: 2, candidate: 'Sara Khan', note: 'Needs financial aid counseling.', tags: ['Important'], private: true },
];
const mockCalls = [
  { id: 1, caller: 'Aarav Sharma', type: 'Incoming', duration: '3:20', notes: 'Discussed scholarship.', aiSummary: 'Asked about scholarship eligibility.', date: '2024-06-10', status: 'Completed' },
  { id: 2, caller: 'Sara Khan', type: 'Outgoing', duration: '2:10', notes: 'Parent query on deadline.', aiSummary: 'Concerned about application deadline.', date: '2024-06-09', status: 'Missed' },
];
const mockChannels = [
  { name: 'Email', icon: <FiMail />, enabled: true },
  { name: 'SMS', icon: <FiMessageCircle />, enabled: true },
  { name: 'WhatsApp', icon: <FiMessageCircle />, enabled: false },
  { name: 'Chatbot', icon: <FiZap />, enabled: true },
  { name: 'In-app', icon: <FiUsers />, enabled: true },
];

export default function Communication() {
  // State for filters, modals, etc.
  const [outgoing, setOutgoing] = useState(mockOutgoing);
  const [incoming, setIncoming] = useState(mockIncoming);
  const [templates, setTemplates] = useState(mockTemplates);
  const [notes, setNotes] = useState(mockNotes);
  const [calls, setCalls] = useState(mockCalls);
  const [channels, setChannels] = useState(mockChannels);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Dashboard metrics
  const weekComms = outgoing.filter(m => m.date >= '2024-06-03').length;
  const monthComms = outgoing.length;
  const emailsSent = outgoing.filter(m => m.type === 'Email').length;
  const smsSent = outgoing.filter(m => m.type === 'SMS').length;
  const whatsappSent = outgoing.filter(m => m.type === 'WhatsApp').length;
  const callsLogged = calls.length;
  const pendingReplies = incoming.filter(m => m.status === 'Needs Follow-up').length;
  const unread = incoming.filter(m => m.status === 'Escalated').length;

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Communication & Logs</h1>
      {/* Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-blue-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">This Week</span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{weekComms}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-purple-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">This Month</span>
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{monthComms}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMail className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">Emails Sent</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{emailsSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMessageCircle className="text-yellow-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">SMS Sent</span>
          <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{smsSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMessageCircle className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">WhatsApp</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{whatsappSent}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiPhone className="text-pink-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">Calls Logged</span>
          <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{callsLogged}</span>
        </div>
      </div>
      {/* Outgoing Communications */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Outgoing Communications</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowBulkModal(true)}><FiSend className="inline mr-1" />Bulk Send</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Recipient</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Subject</th>
                <th className="px-4 py-2 text-left font-semibold">Date/Time</th>
                <th className="px-4 py-2 text-left font-semibold">Sent By</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {outgoing.map(m => (
                <tr key={m.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{m.recipient.name} <span className="text-xs text-gray-400">({m.recipient.role})</span></td>
                  <td className="px-4 py-2">{m.type}</td>
                  <td className="px-4 py-2">{m.subject} <span className="text-xs text-gray-400">{m.preview}</span></td>
                  <td className="px-4 py-2">{m.date} {m.time}</td>
                  <td className="px-4 py-2">{m.sentBy}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.status === 'Delivered' ? 'bg-green-100 text-green-700' : m.status === 'Opened' ? 'bg-blue-100 text-blue-700' : m.status === 'Failed' ? 'bg-red-100 text-red-700' : m.status === 'Replied' ? 'bg-yellow-100 text-yellow-700' : ''}`}>{m.status}</span></td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">Resend</button>
                    <button className="text-indigo-600 hover:underline font-semibold transition-colors mr-2">View Full</button>
                    <button className="text-green-600 hover:underline font-semibold transition-colors">Follow-up</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Incoming Messages / Logs */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Incoming Messages / Logs</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowNoteModal(true)}><FiPlus className="inline mr-1" />Add Note</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Sender</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Subject</th>
                <th className="px-4 py-2 text-left font-semibold">Date/Time</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Tags</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {incoming.map(m => (
                <tr key={m.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{m.sender.name} <span className="text-xs text-gray-400">({m.sender.role})</span></td>
                  <td className="px-4 py-2">{m.type}</td>
                  <td className="px-4 py-2">{m.subject} <span className="text-xs text-gray-400">{m.preview}</span></td>
                  <td className="px-4 py-2">{m.date} {m.time}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${m.status === 'Needs Follow-up' ? 'bg-yellow-100 text-yellow-700' : m.status === 'Escalated' ? 'bg-red-100 text-red-700' : m.status === 'Replied' ? 'bg-green-100 text-green-700' : ''}`}>{m.status}</span></td>
                  <td className="px-4 py-2">{m.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{tag}</span>)}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline font-semibold transition-colors mr-2">Reply</button>
                    <button className="text-yellow-600 hover:underline font-semibold transition-colors mr-2">Escalate</button>
                    <button className="text-blue-600 hover:underline font-semibold transition-colors">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Bulk Communication Tools */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Bulk Communication Tools</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold" onClick={() => setShowBulkModal(true)}><FiSend className="inline mr-1" />New Campaign</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Target: All Leads</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Mode: Email</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">Template: Application Reminder</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">Personalization: {`{Name}`}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Send Now</button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold">Schedule</button>
        </div>
        <div className="mt-4 text-xs text-gray-500">Open Rate: 78% | Click Rate: 42% | Delivery Rate: 95%</div>
      </div>
      {/* Templates Manager */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Templates Manager</h2>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowTemplateModal(true)}><FiPlus className="inline mr-1" />New Template</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Content</th>
                <th className="px-4 py-2 text-left font-semibold">Language</th>
                <th className="px-4 py-2 text-left font-semibold">Approved</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {templates.map(t => (
                <tr key={t.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">{t.content}</td>
                  <td className="px-4 py-2">{t.lang}</td>
                  <td className="px-4 py-2">{t.approved ? <FiCheckCircle className="text-green-500 inline" /> : <FiXCircle className="text-red-500 inline" />}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">Edit</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Internal Notes / Logbook */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Internal Notes / Logbook</h2>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold" onClick={() => setShowNoteModal(true)}><FiPlus className="inline mr-1" />Add Note</button>
        </div>
        <div className="flex flex-col gap-2">
          {notes.map(n => (
            <div key={n.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{n.candidate}</span>
              <span className="text-xs text-gray-500">{n.note}</span>
              {n.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-1">{tag}</span>)}
              <span className={`px-2 py-0.5 rounded-full text-xs ${n.private ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{n.private ? 'Private' : 'Team'}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Call Logs & Voice Notes */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Call Logs & Voice Notes</h2>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold" onClick={() => setShowCallModal(true)}><FiPlus className="inline mr-1" />Log Call</button>
        </div>
        <div className="flex flex-col gap-2">
          {calls.map(c => (
            <div key={c.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{c.caller}</span>
              <span className="text-xs text-gray-500">{c.type} ({c.duration})</span>
              <span className="text-xs text-gray-500">{c.notes}</span>
              <span className="text-xs text-blue-500">AI: {c.aiSummary}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Integration & Channels */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Integration & Channels</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {channels.map(ch => (
            <button key={ch.name} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow ${ch.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'} hover:scale-105 transition-transform`}>
              {ch.icon} {ch.name} {ch.enabled ? 'ON' : 'OFF'}
            </button>
          ))}
        </div>
      </div>
      {/* AI-Powered Features */}
      <div className="bg-gradient-to-br from-yellow-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <FiZap className="text-pink-500 animate-pulse" size={22} />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">AI-Powered Features</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiAlertCircle className="text-red-500" />
            <span className="font-medium text-red-800 dark:text-red-200">Urgency Detection: 2 flagged</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
            <FiMail className="text-blue-500" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Reply Suggestion: "Thank you for your patience..."</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
            <FiClock className="text-yellow-500" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">Smart Reminder: 3 follow-ups suggested</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
            <FiUsers className="text-green-500" />
            <span className="font-medium text-green-800 dark:text-green-200">Sentiment: "Parent is frustrated about delay"</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg">
            <FiZap className="text-purple-500" />
            <span className="font-medium text-purple-800 dark:text-purple-200">Bot Log: 5 chatbot interactions</span>
          </div>
        </div>
      </div>
      {/* Audit & History */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Audit & History</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowAuditModal(true)}><FiDownload className="inline mr-1" />Export</button>
        </div>
        <div className="text-xs text-gray-500">Full communication audit trail per applicant. Data retention: 2 years. Exportable for compliance.</div>
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 