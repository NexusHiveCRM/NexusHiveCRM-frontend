import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Demo data for support tickets
const supportTickets = [
  {
    id: 1,
    title: 'Campaign Analytics Dashboard Issue',
    category: 'Technical',
    priority: 'High',
    status: 'Open',
    assignedTo: 'IT Support',
    createdAt: '2024-03-15',
    lastUpdated: '2024-03-15',
    description: 'Unable to access campaign analytics dashboard. Getting 404 error.'
  },
  {
    id: 2,
    title: 'Marketing Automation Tool Access',
    category: 'Access',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'System Admin',
    createdAt: '2024-03-14',
    lastUpdated: '2024-03-15',
    description: 'Need access to the new marketing automation tool for the team.'
  },
  {
    id: 3,
    title: 'Email Template Editor Bug',
    category: 'Bug',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Development Team',
    createdAt: '2024-03-10',
    lastUpdated: '2024-03-12',
    description: 'Email template editor is not saving changes properly.'
  }
];

// Demo data for knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'How to Create a New Campaign',
    category: 'Campaigns',
    views: 245,
    lastUpdated: '2024-03-10'
  },
  {
    id: 2,
    title: 'Understanding Marketing Analytics',
    category: 'Analytics',
    views: 189,
    lastUpdated: '2024-03-08'
  },
  {
    id: 3,
    title: 'Team Collaboration Guidelines',
    category: 'Team',
    views: 156,
    lastUpdated: '2024-03-05'
  }
];

const CATEGORY_OPTIONS = [
  { value: "IT", label: "IT" },
  { value: "Electrical", label: "Electrical" },
  { value: "Furniture", label: "Furniture / Infrastructure" },
  { value: "Housekeeping", label: "Housekeeping / Sanitation" },
  { value: "Transport", label: "Transportation" },
  { value: "Hostel", label: "Hostel or Accommodation" },
  { value: "Examination", label: "Examination Portal" },
  { value: "ERP", label: "ERP / CRM" },
];
const SUBCATEGORY_MAP = {
  IT: ["Internet not working", "System issue", "Email issue", "Printer issue"],
  Electrical: ["Power outage", "Lights not working", "AC not working"],
  Furniture: ["Chair broken", "Table replacement", "Whiteboard issue"],
  Housekeeping: ["Cleaning required", "Sanitization", "Garbage pickup"],
  Transport: ["Bus delay", "Route change", "Driver issue"],
  Hostel: ["Room issue", "Water supply", "Maintenance"],
  Examination: ["Portal access", "Result issue", "Exam schedule"],
  ERP: ["Login issue", "Data error", "Feature request"],
};
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const DEMO_USER = {
  name: "Rohit Sharma",
  role: "Marketing Head",
  email: "rohit.sharma@univ.edu",
  phone: "+1-234-567-8901",
};

const DEMO_TICKETS = [
  {
    id: "TCK-1001",
    subject: "WiFi not working on 2nd floor, Main Campus",
    category: "IT",
    subcategory: "Internet not working",
    location: "Main Campus - 2nd Floor",
    priority: "High",
    description: "No internet connectivity in the Computer Science lab.",
    status: "In Progress",
    assignedTo: "IT Support Team",
    submittedOn: "2024-06-30",
    expectedResolution: "2024-07-01",
    comments: [
      { user: "IT Support", text: "We are looking into this.", date: "2024-06-30" },
      { user: "Rohit Sharma", text: "Please resolve ASAP.", date: "2024-06-30" },
    ],
    feedback: null,
  },
  {
    id: "TCK-1002",
    subject: "AC not working in classroom A302",
    category: "Electrical",
    subcategory: "AC not working",
    location: "Classroom A302",
    priority: "Medium",
    description: "AC is not cooling properly.",
    status: "Pending",
    assignedTo: "Campus Electrical Dept",
    submittedOn: "2024-06-29",
    expectedResolution: "2024-07-02",
    comments: [],
    feedback: null,
  },
];

export default function Support() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tickets');

  // Form state
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  // Tickets state
  const [tickets, setTickets] = useState(DEMO_TICKETS);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const Modal = ({ ticket, onClose }) => {
    if (!ticket) return null;
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
            <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {ticket.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ticket Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{ticket.category} / {ticket.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{ticket.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{ticket.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{ticket.submittedOn}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Status
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TCK-${1000 + tickets.length + 1}`,
      subject: description.slice(0, 40) + (description.length > 40 ? "..." : ""),
      category,
      subcategory,
      location,
      priority,
      description,
      status: "Pending",
      assignedTo: getAssignedDept(category),
      submittedOn: new Date().toISOString().slice(0, 10),
      expectedResolution: "TBD",
      comments: [],
      feedback: null,
    };
    setTickets([newTicket, ...tickets]);
    // Reset form
    setCategory(""); setSubcategory(""); setLocation(""); setPriority(""); setDescription(""); setAttachment(null);
    alert("Ticket submitted successfully!");
  };

  function getAssignedDept(cat) {
    switch (cat) {
      case "IT": return "IT Support Team";
      case "Electrical": return "Campus Electrical Dept";
      case "Furniture": return "Facilities Management";
      case "Housekeeping": return "Campus Maintenance";
      case "Transport": return "Transport Department";
      case "Hostel": return "Hostel Warden Office";
      case "Examination": return "Exam Support Team";
      case "ERP": return "CRM Admin Support";
      default: return "General Support";
    }
  }

  // Modal actions
  const openModal = (ticket) => { setSelectedTicket(ticket); setShowModal(true); setComment(""); setFeedback(ticket.feedback || ""); };
  const closeModal = () => { setShowModal(false); setSelectedTicket(null); setComment(""); setFeedback(""); };
  const handleAddComment = () => {
    if (comment.trim()) {
      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, comments: [...t.comments, { user: DEMO_USER.name, text: comment, date: new Date().toISOString().slice(0, 10) }] } : t));
      setComment("");
    }
  };
  const handleCloseTicket = () => {
    setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: "Resolved", feedback } : t));
    closeModal();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🆘 Help & Support</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Raise issues, track resolutions, and communicate with support teams across departments.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Ticket
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            Contact Support
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b dark:border-gray-700">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'tickets'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('tickets')}
        >
          Support Tickets
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'knowledge'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('knowledge')}
        >
          Knowledge Base
        </button>
      </div>

      {/* Content */}
      {activeTab === 'tickets' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Support Tickets</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b dark:border-gray-700">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Priority</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Assigned To</th>
                    <th className="pb-3 font-medium">Last Updated</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b dark:border-gray-700">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-gray-500">
                            Created: {ticket.submittedOn}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">{ticket.category} / {ticket.subcategory}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-4">{ticket.assignedTo}</td>
                      <td className="py-4">{ticket.expectedResolution}</td>
                      <td className="py-4">
                        <button
                          onClick={() => openModal(ticket)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Knowledge Base</h2>
            <div className="grid gap-4">
              {knowledgeBaseArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {article.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {article.views} views
                      </p>
                      <p className="text-sm text-gray-500">
                        Updated: {article.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={closeModal} />
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
            <button onClick={closeModal} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold" aria-label="Close">&times;</button>
            <h2 className="text-xl font-bold mb-2">Ticket Details</h2>
            <div className="mb-2 text-xs text-gray-500">ID: {selectedTicket.id}</div>
            <div className="mb-2"><b>Subject:</b> {selectedTicket.subject}</div>
            <div className="mb-2"><b>Category:</b> {selectedTicket.category} / {selectedTicket.subcategory}</div>
            <div className="mb-2"><b>Location:</b> {selectedTicket.location}</div>
            <div className="mb-2"><b>Priority:</b> {selectedTicket.priority}</div>
            <div className="mb-2"><b>Status:</b> {selectedTicket.status}</div>
            <div className="mb-2"><b>Assigned To:</b> {selectedTicket.assignedTo}</div>
            <div className="mb-2"><b>Description:</b> {selectedTicket.description}</div>
            <div className="mb-2"><b>Submitted On:</b> {selectedTicket.submittedOn}</div>
            <div className="mb-2"><b>Expected Resolution:</b> {selectedTicket.expectedResolution}</div>
            {/* Comments */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Comments</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedTicket.comments.map((c, i) => (
                  <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded p-2 text-xs">
                    <b>{c.user}:</b> {c.text} <span className="text-gray-400">({c.date})</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input className="flex-1 rounded border px-2 py-1 text-xs" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={handleAddComment}>Send</button>
              </div>
            </div>
            {/* Feedback/Close */}
            {selectedTicket.status !== "Resolved" ? (
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={handleCloseTicket}>Close & Rate</button>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Feedback / Rating</label>
                <textarea className="w-full rounded border px-3 py-2" value={feedback} onChange={e => setFeedback(e.target.value)} rows={2} placeholder="How was your support experience?" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 