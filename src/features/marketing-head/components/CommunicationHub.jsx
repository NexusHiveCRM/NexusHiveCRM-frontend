import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiPhone, FiUsers, FiBell, FiCalendar, FiZap, FiFileText, FiSend, FiUser, FiChevronRight, FiSearch, FiDownload, FiPlus, FiAlertCircle, FiStar, FiInbox, FiClock, FiTrendingUp, FiTrendingDown, FiSettings } from 'react-icons/fi';

// Demo data for communication channels
const communicationChannels = [
  {
    id: 1,
    name: 'Team Announcements',
    type: 'Internal',
    lastMessage: 'Q2 Marketing Strategy Meeting - Tomorrow at 10 AM',
    participants: 15,
    unread: 3,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Campaign Updates',
    type: 'Project',
    lastMessage: 'Summer Campaign assets are ready for review',
    participants: 8,
    unread: 1,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Client Communications',
    type: 'External',
    lastMessage: 'New client onboarding scheduled for next week',
    participants: 12,
    unread: 0,
    status: 'Active'
  }
];

// Demo data for recent messages
const recentMessages = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Please review the latest campaign metrics',
    timestamp: '10:30 AM',
    channel: 'Campaign Updates'
  },
  {
    id: 2,
    sender: 'Jane Smith',
    content: 'Team meeting agenda has been updated',
    timestamp: '09:45 AM',
    channel: 'Team Announcements'
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    content: 'New client presentation is ready',
    timestamp: 'Yesterday',
    channel: 'Client Communications'
  }
];

// Demo data for each section
const leadComms = [
  { id: 1, name: "USA", channel: "Email", lastMsg: "Interested in MBA program", date: "2024-04-15", engagement: 0.85 },
  { id: 2, name: "USA", channel: "WhatsApp", lastMsg: "Requested brochure", date: "2024-04-14", engagement: 0.72 },
  { id: 3, name: "USA", channel: "SMS", lastMsg: "Sent application link", date: "2024-04-13", engagement: 0.60 },
];

const teamChats = [
  { id: 1, room: "MBA Campaign", lastMsg: "Design ready for review", unread: 2 },
  { id: 2, room: "Social Media", lastMsg: "Scheduled next post", unread: 0 },
  { id: 3, room: "Events", lastMsg: "Venue confirmed", unread: 1 },
];

const campaignMsgs = [
  { id: 1, type: "Email", name: "Spring Blast", status: "Scheduled", segment: "All Leads", sendTime: "2024-04-20 10:00" },
  { id: 2, type: "WhatsApp", name: "Event Reminder", status: "Sent", segment: "Event Attendees", sendTime: "2024-04-18 09:00" },
  { id: 3, type: "SMS", name: "App Deadline", status: "Draft", segment: "Applicants", sendTime: "-" },
];

const vendorComms = [
  { id: 1, name: "USA", type: "Ad Agency", lastMsg: "Sent invoice", date: "2024-04-10", performance: "High" },
  { id: 2, name: "USA", type: "Printer", lastMsg: "Shared creative", date: "2024-04-09", performance: "Medium" },
];

const commCalendar = [
  { id: 1, event: "MBA Email Blast", type: "Email", date: "2024-04-20", time: "10:00" },
  { id: 2, event: "Open Day Reminder", type: "WhatsApp", date: "2024-04-22", time: "09:00" },
];

const notifications = [
  { id: 1, type: "Lead", msg: "Lead USA viewed brochure 3 times", date: "2024-04-15", urgent: false },
  { id: 2, type: "Campaign", msg: "Spring Blast sent successfully", date: "2024-04-14", urgent: false },
  { id: 3, type: "Internal", msg: "Reply pending from design team", date: "2024-04-13", urgent: true },
];

const commLogs = [
  { id: 1, name: "USA", channel: "Email", outcome: "Opened", date: "2024-04-15" },
  { id: 2, name: "USA", channel: "WhatsApp", outcome: "Clicked", date: "2024-04-14" },
  { id: 3, name: "USA", channel: "SMS", outcome: "Delivered", date: "2024-04-13" },
];

export default function CommunicationHub() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setShowModal(true);
  };

  const Modal = ({ channel, onClose }) => {
    if (!channel) return null;
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
            <h2 className="text-xl font-bold mb-2">{channel.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              channel.type === 'Internal' ? 'bg-blue-100 text-blue-700' :
              channel.type === 'Project' ? 'bg-green-100 text-green-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {channel.type}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Channel Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium">{channel.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{channel.status}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recent Messages</h3>
              <div className="space-y-2">
                {recentMessages.map((message) => (
                  <div key={message.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-gray-500">{message.timestamp}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                rows={3}
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">Communication Hub <FiMessageCircle className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Centralize and streamline all marketing communications with AI-powered insights.</p>
        </div>
      </div>

      {/* 1. Lead Communication Panel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiMail className="text-blue-500" />
          <h2 className="text-lg font-semibold">Lead Communication Panel</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Response Suggestions</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Tone Optimizer</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">Engagement Tracker</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Lead</th>
                <th className="pb-3 font-medium">Channel</th>
                <th className="pb-3 font-medium">Last Message</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {leadComms.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">{c.channel}</td>
                  <td className="py-3">{c.lastMsg}</td>
                  <td className="py-3">{c.date}</td>
                  <td className="py-3">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${c.engagement * 100}%` }}></div>
                    </div>
                    <span className="text-xs ml-2">{(c.engagement * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Response Suggestion</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">"Hi, thanks for your interest! Would you like to schedule a call to discuss the MBA program?"</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Tone Optimizer</div>
            <div className="text-sm text-green-700 dark:text-green-300">Suggestion: Use a more friendly tone for higher conversion.</div>
          </div>
        </div>
      </section>

      {/* 2. Team Collaboration Channel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-purple-500" />
          <h2 className="text-lg font-semibold">Team Collaboration Channel</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Summarization</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Smart File Suggestions</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Chat Rooms</h3>
            <ul className="space-y-2">
              {teamChats.map((chat) => (
                <li key={chat.id} className="flex items-center gap-2">
                  <FiMessageCircle className="text-blue-400" />
                  <span className="font-medium">{chat.room}</span>
                  <span className="text-xs text-gray-500">{chat.lastMsg}</span>
                  {chat.unread > 0 && <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{chat.unread} new</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Announcements</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><FiBell className="text-yellow-500" /> MBA campaign kickoff meeting at 3pm.</li>
              <li className="flex items-center gap-2"><FiBell className="text-yellow-500" /> Social media calendar updated.</li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-4">
          <div className="font-medium mb-1">AI Auto-Summarization</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">"3 action points: 1) Review design, 2) Approve content, 3) Schedule next post."</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="font-medium mb-1">AI Smart File Suggestion</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Suggested: "MBA_Brochure_v2.pdf" for campaign discussion.</div>
        </div>
      </section>

      {/* 3. Campaign Messaging Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiSend className="text-green-500" />
          <h2 className="text-lg font-semibold">Campaign Messaging Center</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Send-Time Optimization</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Subject Line Predictor</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">A/B Testing Insights</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Segment</th>
                <th className="pb-3 font-medium">Send Time</th>
              </tr>
            </thead>
            <tbody>
              {campaignMsgs.map((msg) => (
                <tr key={msg.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{msg.type}</td>
                  <td className="py-3">{msg.name}</td>
                  <td className="py-3">{msg.status}</td>
                  <td className="py-3">{msg.segment}</td>
                  <td className="py-3">{msg.sendTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Send-Time Optimization</div>
            <div className="text-sm text-green-700 dark:text-green-300">Best time to send: 10:00 AM for max engagement.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Subject Line Predictor</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Subject: "Unlock Your Future at Our MBA Program" (Predicted Open Rate: 38%)</div>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mt-4">
          <div className="font-medium mb-1">AI A/B Testing Insights</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Variant B performed 12% better in click-through rate.</div>
        </div>
      </section>

      {/* 4. Vendor & Partner Comms */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiInbox className="text-pink-500" />
          <h2 className="text-lg font-semibold">Vendor & Partner Comms</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Vendor Performance Summary</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">Follow-up Nudges</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Vendor</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Last Message</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody>
              {vendorComms.map((v) => (
                <tr key={v.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{v.name}</td>
                  <td className="py-3">{v.type}</td>
                  <td className="py-3">{v.lastMsg}</td>
                  <td className="py-3">{v.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${v.performance === 'High' ? 'bg-green-100 text-green-700' : v.performance === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{v.performance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Vendor Performance Summary</div>
            <div className="text-sm text-green-700 dark:text-green-300">USA: $5,000 spent, 120 leads, 30 conversions.</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Follow-up Nudge</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">No follow-up sent to USA in 7 days.</div>
          </div>
        </div>
      </section>

      {/* 5. Integrated Communication Calendar */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="text-blue-400" />
          <h2 className="text-lg font-semibold">Integrated Communication Calendar</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Smart Scheduling</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">Missed Opportunity Alerts</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Event</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {commCalendar.map((e) => (
                <tr key={e.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{e.event}</td>
                  <td className="py-3">{e.type}</td>
                  <td className="py-3">{e.date}</td>
                  <td className="py-3">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Smart Scheduling</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">No message overlaps. Next free slot: 11:00 AM, 20th April.</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Missed Opportunity Alert</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">No campaign scheduled for "Open Day" event.</div>
          </div>
        </div>
      </section>

      {/* 6. Notification & Alert Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBell className="text-green-500" />
          <h2 className="text-lg font-semibold">Notification & Alert Center</h2>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">Urgency Detector</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Prioritization</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Message</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Urgent</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{n.type}</td>
                  <td className="py-3">{n.msg}</td>
                  <td className="py-3">{n.date}</td>
                  <td className="py-3">
                    {n.urgent ? <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Urgent</span> : <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Normal</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Urgency Detector</div>
            <div className="text-sm text-red-700 dark:text-red-300">"Reply pending from design team" flagged as urgent.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Prioritization</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Lead USA ranked high value, prioritize follow-up.</div>
          </div>
        </div>
      </section>

      {/* 7. Communication Logs & Analytics */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-blue-400" />
          <h2 className="text-lg font-semibold">Communication Logs & Analytics</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">Drop-Off Detector</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Message Quality Analyzer</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Channel</th>
                <th className="pb-3 font-medium">Outcome</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {commLogs.map((log) => (
                <tr key={log.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{log.name}</td>
                  <td className="py-3">{log.channel}</td>
                  <td className="py-3">{log.outcome}</td>
                  <td className="py-3">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Drop-Off Detector</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Lead USA stopped engaging after last WhatsApp message.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Message Quality Analyzer</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Suggestion: Clarify next steps in follow-up messages.</div>
          </div>
        </div>
      </section>

      {/* 8. AI Communication Assistant */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">AI Communication Assistant</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Compose Smart Response</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Thank you for your interest! Here's the brochure and next steps for your application."</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Recommend Message Template</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Hi [First Name], are you ready to take the next step in your journey?"</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Generate Drip Campaign</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">Day 1: Welcome email. Day 3: Program video. Day 5: Counselor call.</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Summarize Thread</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">"Lead USA requested info, received brochure, scheduled call."</div>
          </div>
        </div>
      </section>

      {showModal && <Modal channel={selectedChannel} onClose={() => setShowModal(false)} />}
    </div>
  );
} 