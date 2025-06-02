import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiUser, FiFilter, FiRefreshCw, FiMail, FiPhone, FiMessageCircle, FiUsers, FiStar, FiBarChart2, FiFileText, FiZap, FiEdit2, FiTrash2, FiMoreVertical, FiSearch, FiDownload, FiPlus, FiX, FiChevronRight, FiClock, FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar } from 'react-icons/fi';

// Demo data for leads
const leads = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 234 567 893",
    source: "Website",
    status: "New",
    assignedTo: "John Doe",
    lastContact: "2024-04-10",
    notes: "Interested in MBA program",
  },
  {
    id: 2,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 234 567 894",
    source: "Social Media",
    status: "Contacted",
    assignedTo: "Jane Smith",
    lastContact: "2024-04-09",
    notes: "Requested program brochure",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234 567 895",
    source: "Referral",
    status: "Qualified",
    assignedTo: "Mike Johnson",
    lastContact: "2024-04-08",
    notes: "Scheduled campus visit",
  },
];

// Demo data for lead sources
const leadSources = [
  { source: "Website", count: 450, conversion: 25 },
  { source: "Social Media", count: 300, conversion: 20 },
  { source: "Referral", count: 200, conversion: 35 },
  { source: "Events", count: 150, conversion: 30 },
];

// Demo data for lead status
const leadStatus = [
  { status: "New", count: 120, color: "bg-blue-100 text-blue-700" },
  { status: "Contacted", count: 85, color: "bg-yellow-100 text-yellow-700" },
  { status: "Qualified", count: 65, color: "bg-green-100 text-green-700" },
  { status: "Converted", count: 45, color: "bg-purple-100 text-purple-700" },
];

// New demo data for sections
const importHistory = [
  { id: 1, date: "2024-04-15", source: "Website Form", count: 45, quality: "High", status: "Completed" },
  { id: 2, date: "2024-04-14", source: "Excel Import", count: 120, quality: "Medium", status: "Completed" },
  { id: 3, date: "2024-04-13", source: "Facebook Ads", count: 78, quality: "High", status: "Completed" },
  { id: 4, date: "2024-04-12", source: "Event Registration", count: 56, quality: "High", status: "Completed" },
];

const leadSegments = [
  { id: 1, name: "MBA Applicants", count: 234, conversion: "32%", source: "Multiple", lastUpdated: "2024-04-15" },
  { id: 2, name: "Engineering Students", count: 156, conversion: "28%", source: "Website", lastUpdated: "2024-04-14" },
  { id: 3, name: "International Students", count: 89, conversion: "45%", source: "Events", lastUpdated: "2024-04-13" },
  { id: 4, name: "Scholarship Seekers", count: 67, conversion: "38%", source: "Social Media", lastUpdated: "2024-04-12" },
];

const nurturingCampaigns = [
  { id: 1, name: "MBA Welcome Series", status: "Active", leads: 45, openRate: "68%", responseRate: "32%" },
  { id: 2, name: "Engineering Info Session", status: "Scheduled", leads: 78, openRate: "72%", responseRate: "28%" },
  { id: 3, name: "Scholarship Follow-up", status: "Active", leads: 34, openRate: "65%", responseRate: "35%" },
  { id: 4, name: "Campus Tour Reminder", status: "Draft", leads: 56, openRate: "0%", responseRate: "0%" },
];

const communicationHistory = [
  { id: 1, lead: "Sarah Wilson", type: "Email", date: "2024-04-15", status: "Sent", response: "Positive" },
  { id: 2, lead: "David Brown", type: "Call", date: "2024-04-14", status: "Completed", response: "Neutral" },
  { id: 3, lead: "Emily Davis", type: "WhatsApp", date: "2024-04-13", status: "Delivered", response: "Positive" },
  { id: 4, lead: "John Smith", type: "Email", date: "2024-04-12", status: "Opened", response: "Pending" },
];

const counselorPerformance = [
  { id: 1, name: "John Doe", assigned: 45, converted: 12, conversion: "27%", avgResponse: "2h" },
  { id: 2, name: "Jane Smith", assigned: 38, converted: 15, conversion: "39%", avgResponse: "1.5h" },
  { id: 3, name: "Mike Johnson", assigned: 42, converted: 18, conversion: "43%", avgResponse: "1h" },
  { id: 4, name: "Lisa Brown", assigned: 35, converted: 14, conversion: "40%", avgResponse: "2.5h" },
];

const leadScores = [
  { id: 1, lead: "Sarah Wilson", score: 85, factors: ["High Engagement", "Complete Profile"], trend: "Up" },
  { id: 2, lead: "David Brown", score: 72, factors: ["Medium Engagement", "Partial Profile"], trend: "Stable" },
  { id: 3, lead: "Emily Davis", score: 90, factors: ["High Engagement", "Complete Profile", "Quick Response"], trend: "Up" },
  { id: 4, lead: "John Smith", score: 65, factors: ["Low Engagement", "Incomplete Profile"], trend: "Down" },
];

const analyticsData = [
  { id: 1, metric: "Conversion Rate", value: "32%", change: "+5%", trend: "Up" },
  { id: 2, metric: "Response Time", value: "2.5h", change: "-0.5h", trend: "Down" },
  { id: 3, metric: "Lead Quality", value: "78%", change: "+3%", trend: "Up" },
  { id: 4, metric: "Drop-off Rate", value: "15%", change: "-2%", trend: "Down" },
];

const documents = [
  { id: 1, lead: "Sarah Wilson", type: "Application Form", status: "Completed", date: "2024-04-15" },
  { id: 2, lead: "David Brown", type: "Transcript", status: "Pending", date: "2024-04-14" },
  { id: 3, lead: "Emily Davis", type: "Recommendation", status: "Completed", date: "2024-04-13" },
  { id: 4, lead: "John Smith", type: "Test Scores", status: "Incomplete", date: "2024-04-12" },
];

// Additional detailed metrics data
const detailedMetrics = {
  leadQuality: {
    high: 45,
    medium: 30,
    low: 25,
    trend: "+5%",
    distribution: [
      { source: "Website", quality: "High", count: 25 },
      { source: "Social Media", quality: "Medium", count: 18 },
      { source: "Events", quality: "High", count: 15 },
      { source: "Referrals", quality: "Medium", count: 12 },
    ]
  },
  conversionFunnel: {
    stages: [
      { stage: "New", count: 120, conversion: "100%" },
      { stage: "Contacted", count: 85, conversion: "71%" },
      { stage: "Qualified", count: 65, conversion: "54%" },
      { stage: "Converted", count: 45, conversion: "38%" },
    ],
    avgTimeToConvert: "14 days",
    dropOffPoints: [
      { stage: "New to Contacted", rate: "29%" },
      { stage: "Contacted to Qualified", rate: "17%" },
      { stage: "Qualified to Converted", rate: "16%" },
    ]
  },
  campaignPerformance: {
    overview: {
      totalCampaigns: 8,
      activeCampaigns: 5,
      totalLeads: 450,
      avgResponseTime: "2.5h",
    },
    byChannel: [
      { channel: "Email", sent: 250, opened: 180, responded: 90 },
      { channel: "SMS", sent: 150, delivered: 145, responded: 75 },
      { channel: "WhatsApp", sent: 50, delivered: 48, responded: 35 },
    ]
  },
  counselorMetrics: {
    overview: {
      totalCounselors: 4,
      activeLeads: 160,
      avgResponseTime: "1.8h",
      satisfaction: "4.2/5",
    },
    performance: [
      { metric: "Response Time", value: "1.8h", trend: "↓ 0.2h" },
      { metric: "Conversion Rate", value: "32%", trend: "↑ 3%" },
      { metric: "Lead Satisfaction", value: "4.2/5", trend: "↑ 0.3" },
      { metric: "Follow-up Rate", value: "92%", trend: "↑ 5%" },
    ]
  }
};

export default function LeadsManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleOpenModal = (modalType, item) => {
    setSelectedItem(item);
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedItem(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectLead = (leadId) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === leads.length 
        ? [] 
        : leads.map(lead => lead.id)
    );
  };

  // Modal Components
  const LeadDetailsModal = ({ lead, onClose }) => {
    if (!lead) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-2xl text-blue-600 dark:text-blue-300 font-medium">
                  {lead.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{lead.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{lead.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Lead Score</h3>
                <div className="text-2xl font-bold text-blue-600">85</div>
                <div className="text-sm text-green-600">↑ 5 points this week</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Time in Pipeline</h3>
                <div className="text-2xl font-bold">14 days</div>
                <div className="text-sm text-gray-500">Started: {lead.lastContact}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">Conversion Probability</h3>
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-gray-500">Based on engagement</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium">{lead.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Source</label>
                  <p className="font-medium">{lead.source}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Assigned To</label>
                  <p className="font-medium">{lead.assignedTo}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Engagement History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Last Contact</span>
                  <span className="text-gray-600">{lead.lastContact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Interactions</span>
                  <span className="text-gray-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response Rate</span>
                  <span className="text-green-600">85%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FiMail className="text-blue-500" />
                <div>
                  <p className="font-medium">Email Sent</p>
                  <p className="text-sm text-gray-500">Program information and next steps</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FiPhone className="text-green-500" />
                <div>
                  <p className="font-medium">Phone Call</p>
                  <p className="text-sm text-gray-500">Initial consultation completed</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">1d ago</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Status
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              Add Note
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>

          <h2 className="text-2xl font-bold mb-6">Detailed Analytics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lead Quality Distribution */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-4">Lead Quality Distribution</h3>
              <div className="space-y-4">
                {detailedMetrics.leadQuality.distribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{item.source}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.quality === "High" ? "bg-green-100 text-green-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.quality}
                      </span>
                      <span>{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-4">Conversion Funnel</h3>
              <div className="space-y-4">
                {detailedMetrics.conversionFunnel.stages.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span>{stage.count}</span>
                      <span className="text-gray-500">({stage.conversion})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-4">Campaign Performance</h3>
              <div className="space-y-4">
                {detailedMetrics.campaignPerformance.byChannel.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{channel.channel}</span>
                    <div className="flex items-center gap-2">
                      <span>Sent: {channel.sent}</span>
                      <span>Opened: {channel.opened}</span>
                      <span>Responded: {channel.responded}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counselor Performance */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-4">Counselor Performance</h3>
              <div className="space-y-4">
                {detailedMetrics.counselorMetrics.performance.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span>{metric.value}</span>
                      <span className={`${
                        metric.trend.includes("↑") ? "text-green-600" : "text-red-600"
                      }`}>
                        {metric.trend}
                      </span>
                    </div>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">Leads <FiUsers className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage the entire lead lifecycle with AI-powered insights.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><FiUpload /> Import Leads</button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Export Leads</button>
        </div>
      </div>

      {/* Lead Table Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <FiPlus /> Add Lead
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                <FiDownload /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedLeads.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedLeads.length} leads selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Assign
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Change Status
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Lead
                    {sortField === "name" && (
                      <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("source")}
                >
                  <div className="flex items-center gap-2">
                    Source
                    {sortField === "source" && (
                      <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortField === "status" && (
                      <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left">Assigned To</th>
                <th className="px-6 py-3 text-left">Last Contact</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr 
                  key={lead.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-medium">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{lead.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      lead.status === "New" ? "bg-blue-100 text-blue-700" :
                      lead.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                      lead.status === "Qualified" ? "bg-green-100 text-green-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {lead.assignedTo.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {lead.lastContact}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLeadClick(lead)}
                        className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <FiUser />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="More Actions"
                      >
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing 1 to {leads.length} of {leads.length} leads
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Lead Capture & Import */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUpload className="text-blue-500" />
          <h2 className="text-lg font-semibold">Lead Capture & Import</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Quality Scoring</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Quality</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {importHistory.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">{item.source}</td>
                  <td className="py-3">{item.count}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.quality === "High" ? "bg-green-100 text-green-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.quality}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-green-600">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Lead Segmentation & Filters */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-purple-500" />
          <h2 className="text-lg font-semibold">Lead Segmentation & Filters</h2>
          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded animate-pulse">AI Segment Suggestion</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Segment Name</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Conversion</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {leadSegments.map((segment) => (
                <tr key={segment.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{segment.name}</td>
                  <td className="py-3">{segment.count}</td>
                  <td className="py-3 text-green-600">{segment.conversion}</td>
                  <td className="py-3">{segment.source}</td>
                  <td className="py-3">{segment.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Lead Nurturing & Workflow Automation */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiRefreshCw className="text-yellow-500" />
          <h2 className="text-lg font-semibold">Lead Nurturing & Workflow Automation</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Drip Recommendation</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Campaign Name</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Leads</th>
                <th className="pb-3 font-medium">Open Rate</th>
                <th className="pb-3 font-medium">Response Rate</th>
              </tr>
            </thead>
            <tbody>
              {nurturingCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{campaign.name}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "Active" ? "bg-green-100 text-green-700" :
                      campaign.status === "Scheduled" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3">{campaign.leads}</td>
                  <td className="py-3">{campaign.openRate}</td>
                  <td className="py-3">{campaign.responseRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Communication Center */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiMail className="text-blue-400" />
          <h2 className="text-lg font-semibold">Communication Center</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Sentiment</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Lead</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Response</th>
              </tr>
            </thead>
            <tbody>
              {communicationHistory.map((comm) => (
                <tr key={comm.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{comm.lead}</td>
                  <td className="py-3">{comm.type}</td>
                  <td className="py-3">{comm.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comm.status === "Completed" ? "bg-green-100 text-green-700" :
                      comm.status === "Sent" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {comm.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comm.response === "Positive" ? "bg-green-100 text-green-700" :
                      comm.response === "Neutral" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {comm.response}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Lead Assignment & Routing */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-green-500" />
          <h2 className="text-lg font-semibold">Lead Assignment & Routing</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Routing Engine</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Counselor</th>
                <th className="pb-3 font-medium">Assigned</th>
                <th className="pb-3 font-medium">Converted</th>
                <th className="pb-3 font-medium">Conversion Rate</th>
                <th className="pb-3 font-medium">Avg Response</th>
              </tr>
            </thead>
            <tbody>
              {counselorPerformance.map((counselor) => (
                <tr key={counselor.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{counselor.name}</td>
                  <td className="py-3">{counselor.assigned}</td>
                  <td className="py-3">{counselor.converted}</td>
                  <td className="py-3 text-green-600">{counselor.conversion}</td>
                  <td className="py-3">{counselor.avgResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Lead Scoring */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiStar className="text-pink-500" />
          <h2 className="text-lg font-semibold">Lead Scoring</h2>
          <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">AI Dynamic Scoring</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Lead</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Factors</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leadScores.map((score) => (
                <tr key={score.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{score.lead}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      score.score >= 85 ? "bg-green-100 text-green-700" :
                      score.score >= 70 ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {score.score}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-1">
                      {score.factors.map((factor, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      score.trend === "Up" ? "bg-green-100 text-green-700" :
                      score.trend === "Down" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {score.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Analytics & Insights */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-blue-500" />
            <h2 className="text-lg font-semibold">Analytics & Insights</h2>
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Predictions</span>
          </div>
          <button 
            onClick={() => handleOpenModal('analytics')}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Detailed Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.map((metric) => (
            <div key={metric.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.metric}</h3>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-semibold">{metric.value}</p>
                <p className={`text-sm ${
                  metric.trend === "Up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Lead Quality Distribution</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>High</span>
              </div>
              <span>{detailedMetrics.leadQuality.high}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span>Medium</span>
              </div>
              <span>{detailedMetrics.leadQuality.medium}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>Low</span>
              </div>
              <span>{detailedMetrics.leadQuality.low}%</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Conversion Funnel</h3>
            <div className="space-y-2">
              {detailedMetrics.conversionFunnel.stages.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span>{stage.count}</span>
                    <span className="text-gray-500">({stage.conversion})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Documentation & Application Tracking */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-purple-500" />
          <h2 className="text-lg font-semibold">Documentation & Application Tracking</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Lead</th>
                <th className="pb-3 font-medium">Document Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{doc.lead}</td>
                  <td className="py-3">{doc.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.status === "Completed" ? "bg-green-100 text-green-700" :
                      doc.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. AI Copilot Panel */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">AI Copilot Panel</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Quick Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                MBA leads showing 45% higher engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                3 counselors need follow-up assistance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Engineering program leads dropping off
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Recommended Actions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Schedule follow-up for 12 high-potential leads
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Adjust campaign targeting for Engineering program
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Review and update lead scoring criteria
              </li>
            </ul>
          </div>
        </div>
      </section>

      {showModal && <LeadDetailsModal lead={selectedLead} onClose={handleCloseModal} />}
      {activeModal === 'analytics' && (
        <AnalyticsModal onClose={handleCloseModal} />
      )}
    </div>
  );
} 