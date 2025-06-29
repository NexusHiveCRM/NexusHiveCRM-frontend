import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiUser, FiFilter, FiRefreshCw, FiMail, FiPhone, FiMessageCircle, FiUsers, FiStar, FiBarChart2, FiFileText, FiZap, FiEdit2, FiTrash2, FiMoreVertical, FiSearch, FiDownload, FiPlus, FiX, FiChevronRight, FiClock, FiTrendingUp, FiTrendingDown, FiDollarSign, FiCalendar, FiPaperclip, FiSend } from 'react-icons/fi';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Demo data for leads
const leads = [
  { id: 1, name: "Noura Al-Zahra", email: "noura.zahra@example.com", phone: "+966 50 123 4567", source: "Website", status: "New", assignedTo: "Abdullah Al-Rashid", lastContact: "2024-04-10", notes: "Interested in MBA program" },
  { id: 2, name: "Khalid Al-Sayed", email: "khalid.sayed@example.com", phone: "+966 50 234 5678", source: "Social Media", status: "Opportunities", assignedTo: "Aisha Al-Hassan", lastContact: "2024-04-09", notes: "Requested program brochure" },
  { id: 3, name: "Layla Al-Mansour", email: "layla.mansour@example.com", phone: "+966 50 345 6789", source: "Referral", status: "Interview Schedule", assignedTo: "Omar Al-Mutairi", lastContact: "2024-04-08", notes: "Scheduled campus visit" },
  { id: 4, name: "Mohammed Al-Saud", email: "mohammed.alsaud@example.com", phone: "+966 50 456 7890", source: "Events", status: "New", assignedTo: "Fatima Al-Rashid", lastContact: "2024-04-07", notes: "Requested scholarship info" },
  { id: 5, name: "Fatima Al-Rashid", email: "fatima.rashid@example.com", phone: "+966 50 567 8901", source: "Website", status: "Opportunities", assignedTo: "Noura Al-Zahra", lastContact: "2024-04-06", notes: "Interested in engineering" },
  { id: 6, name: "Omar Al-Farouq", email: "omar.farouq@example.com", phone: "+966 50 678 9012", source: "Referral", status: "Interview Schedule", assignedTo: "Khalid Al-Sayed", lastContact: "2024-04-05", notes: "Looking for MBA program" },
  { id: 7, name: "Layla Hassan", email: "layla.hassan@example.com", phone: "+966 50 789 0123", source: "Social Media", status: "Approved", assignedTo: "Layla Al-Mansour", lastContact: "2024-04-04", notes: "Completed application" },
  { id: 8, name: "Abdullah Al-Mansour", email: "abdullah.mansour@example.com", phone: "+966 50 890 1234", source: "Events", status: "New", assignedTo: "Mohammed Al-Saud", lastContact: "2024-04-03", notes: "Interested in business program" },
  { id: 9, name: "Noura Al-Qahtani", email: "noura.qahtani@example.com", phone: "+966 50 901 2345", source: "Website", status: "Opportunities", assignedTo: "Fatima Al-Rashid", lastContact: "2024-04-02", notes: "Requested campus tour" },
  { id: 10, name: "Yousef Al-Harbi", email: "yousef.harbi@example.com", phone: "+966 50 012 3456", source: "Referral", status: "Interview Schedule", assignedTo: "Omar Al-Farouq", lastContact: "2024-04-01", notes: "Interested in IT program" },
  { id: 11, name: "Maha Al-Shehri", email: "maha.shehri@example.com", phone: "+966 50 123 4568", source: "Social Media", status: "Approved", assignedTo: "Layla Hassan", lastContact: "2024-03-31", notes: "Completed registration" },
  { id: 12, name: "Khalid Al-Zahrani", email: "khalid.zahrani@example.com", phone: "+966 50 234 5679", source: "Events", status: "Accounts", assignedTo: "Noura Al-Qahtani", lastContact: "2024-03-30", notes: "Requested program details" },
  // Additional sample leads
  { id: 13, name: "Aisha Al-Mutairi", email: "aisha.mutairi@example.com", phone: "+966 50 345 6780", source: "Website", status: "New", assignedTo: "Noura Al-Zahra", lastContact: "2024-03-29", notes: "Interested in design program" },
  { id: 14, name: "Hassan Al-Qahtani", email: "hassan.qahtani@example.com", phone: "+966 50 456 7891", source: "Referral", status: "Opportunities", assignedTo: "Khalid Al-Sayed", lastContact: "2024-03-28", notes: "Requested fee structure" },
  { id: 15, name: "Mona Al-Sabah", email: "mona.sabah@example.com", phone: "+966 50 567 8902", source: "Events", status: "Interview Schedule", assignedTo: "Omar Al-Mutairi", lastContact: "2024-03-27", notes: "Scheduled interview for MBA" },
  { id: 16, name: "Salman Al-Fahad", email: "salman.fahad@example.com", phone: "+966 50 678 9013", source: "Social Media", status: "Approved", assignedTo: "Aisha Al-Hassan", lastContact: "2024-03-26", notes: "Approved for scholarship" },
  { id: 17, name: "Rania Al-Harbi", email: "rania.harbi@example.com", phone: "+966 50 789 0124", source: "Website", status: "Accounts", assignedTo: "Fatima Al-Rashid", lastContact: "2024-03-25", notes: "Account created" },
  { id: 18, name: "Fahad Al-Otaibi", email: "fahad.otaibi@example.com", phone: "+966 50 890 1235", source: "Referral", status: "New", assignedTo: "Omar Al-Farouq", lastContact: "2024-03-24", notes: "Interested in IT program" },
  { id: 19, name: "Nawal Al-Suwailem", email: "nawal.suwailem@example.com", phone: "+966 50 901 2346", source: "Events", status: "Opportunities", assignedTo: "Noura Al-Zahra", lastContact: "2024-03-23", notes: "Requested program brochure" },
  { id: 20, name: "Majed Al-Dosari", email: "majed.dosari@example.com", phone: "+966 50 012 3457", source: "Website", status: "Interview Schedule", assignedTo: "Aisha Al-Hassan", lastContact: "2024-03-22", notes: "Interview scheduled for engineering" },
  { id: 21, name: "Lina Al-Saleh", email: "lina.saleh@example.com", phone: "+966 50 123 4569", source: "Social Media", status: "Approved", assignedTo: "Omar Al-Mutairi", lastContact: "2024-03-21", notes: "Approved for business program" },
  { id: 22, name: "Tariq Al-Mansour", email: "tariq.mansour@example.com", phone: "+966 50 234 5680", source: "Referral", status: "Accounts", assignedTo: "Fatima Al-Rashid", lastContact: "2024-03-20", notes: "Account setup complete" },
  { id: 23, name: "Sami Al-Shammari", email: "sami.shammari@example.com", phone: "+966 50 345 6781", source: "Events", status: "New", assignedTo: "Abdullah Al-Rashid", lastContact: "2024-03-19", notes: "Interested in MBA program" },
  { id: 24, name: "Dina Al-Rashid", email: "dina.rashid@example.com", phone: "+966 50 456 7892", source: "Website", status: "Opportunities", assignedTo: "Aisha Al-Hassan", lastContact: "2024-03-18", notes: "Requested program details" },
  { id: 25, name: "Yara Al-Saif", email: "yara.saif@example.com", phone: "+966 50 567 8903", source: "Referral", status: "Interview Schedule", assignedTo: "Omar Al-Mutairi", lastContact: "2024-03-17", notes: "Scheduled interview for IT" },
  { id: 26, name: "Bader Al-Farhan", email: "bader.farhan@example.com", phone: "+966 50 678 9014", source: "Events", status: "Approved", assignedTo: "Layla Al-Mansour", lastContact: "2024-03-16", notes: "Approved for engineering" },
  { id: 27, name: "Huda Al-Mutlaq", email: "huda.mutlaq@example.com", phone: "+966 50 789 0125", source: "Website", status: "Accounts", assignedTo: "Omar Al-Farouq", lastContact: "2024-03-15", notes: "Account created for MBA" },
  { id: 28, name: "Inactive Lead", email: "inactive.lead@example.com", phone: "+966 50 999 9999", source: "Website", status: "Inactive", assignedTo: "Abdullah Al-Rashid", lastContact: "2024-04-02", notes: "This lead is inactive." },
  { id: 29, name: "Ahmed Al-Mutairi", email: "ahmed.mutairi@example.com", phone: "+966 50 888 8888", source: "Referral", status: "Inactive", assignedTo: "Fatima Al-Rashid", lastContact: "2024-03-10", notes: "No response after initial contact." },
  { id: 30, name: "Sara Al-Qahtani", email: "sara.qahtani@example.com", phone: "+966 50 777 7777", source: "Social Media", status: "Inactive", assignedTo: "Aisha Al-Hassan", lastContact: "2024-03-05", notes: "Lead marked inactive by counselor." },
  { id: 31, name: "Mohammed Al-Fahad", email: "mohammed.fahad@example.com", phone: "+966 50 666 6666", source: "Events", status: "Inactive", assignedTo: "Omar Al-Mutairi", lastContact: "2024-02-28", notes: "Unreachable after event." },
  { id: 32, name: "Laila Al-Sabah", email: "laila.sabah@example.com", phone: "+966 50 555 5555", source: "Website", status: "Inactive", assignedTo: "Layla Al-Mansour", lastContact: "2024-02-20", notes: "Requested to be removed from list." },
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
  { id: 1, lead: "Noura Al-Zahra", type: "Email", date: "2024-04-15", status: "Sent", response: "Positive" },
  { id: 2, lead: "Khalid Al-Sayed", type: "Call", date: "2024-04-14", status: "Completed", response: "Neutral" },
  { id: 3, lead: "Layla Al-Mansour", type: "WhatsApp", date: "2024-04-13", status: "Delivered", response: "Positive" },
  { id: 4, lead: "Abdullah Al-Rashid", type: "Email", date: "2024-04-12", status: "Opened", response: "Pending" },
];

const counselorPerformance = [
  { id: 1, name: "Abdullah Al-Rashid", assigned: 45, converted: 12, conversion: "27%", avgResponse: "2h" },
  { id: 2, name: "Aisha Al-Hassan", assigned: 38, converted: 15, conversion: "39%", avgResponse: "1.5h" },
  { id: 3, name: "Omar Al-Mutairi", assigned: 42, converted: 18, conversion: "43%", avgResponse: "1h" },
  { id: 4, name: "Fatima Al-Rashid", assigned: 35, converted: 14, conversion: "40%", avgResponse: "2.5h" },
];

const leadScores = [
  { id: 1, lead: "Noura Al-Zahra", score: 85, factors: ["High Engagement", "Complete Profile"], trend: "Up" },
  { id: 2, lead: "Khalid Al-Sayed", score: 72, factors: ["Medium Engagement", "Partial Profile"], trend: "Stable" },
  { id: 3, lead: "Layla Al-Mansour", score: 90, factors: ["High Engagement", "Complete Profile", "Quick Response"], trend: "Up" },
  { id: 4, lead: "Abdullah Al-Rashid", score: 65, factors: ["Low Engagement", "Incomplete Profile"], trend: "Down" },
];

const analyticsData = [
  { id: 1, metric: "Conversion Rate", value: "32%", change: "+5%", trend: "Up" },
  { id: 2, metric: "Response Time", value: "2.5h", change: "-0.5h", trend: "Down" },
  { id: 3, metric: "Lead Quality", value: "78%", change: "+3%", trend: "Up" },
  { id: 4, metric: "Drop-off Rate", value: "15%", change: "-2%", trend: "Down" },
];

const documents = [
  { id: 1, lead: "Noura Al-Zahra", type: "Application Form", status: "Completed", date: "2024-04-15" },
  { id: 2, lead: "Khalid Al-Sayed", type: "Transcript", status: "Pending", date: "2024-04-14" },
  { id: 3, lead: "Layla Al-Mansour", type: "Recommendation", status: "Completed", date: "2024-04-13" },
  { id: 4, lead: "Abdullah Al-Rashid", type: "Test Scores", status: "Incomplete", date: "2024-04-12" },
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

// Update status options
const LEAD_STATUSES = [
  { value: 'New', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'Opportunities', label: 'Opportunities', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Interview Schedule', label: 'Interview Schedule', color: 'bg-purple-100 text-purple-700' },
  { value: 'Approved', label: 'Approved', color: 'bg-green-100 text-green-700' },
  { value: 'Accounts', label: 'Accounts', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'Inactive', label: 'Inactive', color: 'bg-gray-200 text-gray-700' },
];

// Move CommunicationModal outside the main component
export function CommunicationModal({
  onClose,
  selectedLead,
  communicationType,
  communicationForm,
  handleCommunicationFormChange,
  handleSendCommunication,
  setCommunicationForm
}) {
  if (!selectedLead || !communicationType) return null;

  const emailTemplates = [
    { id: 1, name: 'Initial Follow-up', subject: 'Welcome to Our Program', content: 'Thank you for your interest...' },
    { id: 2, name: 'Program Information', subject: 'Program Details', content: 'Here are the details about our program...' },
    { id: 3, name: 'Scholarship Info', subject: 'Scholarship Opportunities', content: 'We have exciting scholarship opportunities...' },
  ];

  const smsTemplates = [
    { id: 1, name: 'Quick Follow-up', content: 'Hi {name}, thank you for your interest. Would you like to schedule a call?' },
    { id: 2, name: 'Event Reminder', content: 'Reminder: Our information session is tomorrow at 2 PM. RSVP: {link}' },
    { id: 3, name: 'Application Check', content: 'Hi {name}, just checking if you need any help with your application?' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FiX size={24} />
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {communicationType === 'email' ? 'Send Email' : 'Send SMS'} to {selectedLead.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedLead.email} {selectedLead.phone && `• ${selectedLead.phone}`}
          </p>
        </div>
        <form onSubmit={handleSendCommunication} className="space-y-4">
          {communicationType === 'email' && (
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={communicationForm.subject}
                onChange={handleCommunicationFormChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={communicationForm.message}
              onChange={handleCommunicationFormChange}
              rows={6}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 resize-y"
              required
              placeholder={communicationType === 'email' ? 'Write your email message here...' : 'Write your SMS message here...'}
              style={{ minHeight: '150px' }}
              spellCheck="true"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
          {communicationType === 'email' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Templates</label>
                <select
                  name="template"
                  value={communicationForm.template}
                  onChange={(e) => {
                    const template = emailTemplates.find(t => t.id === parseInt(e.target.value));
                    if (template) {
                      setCommunicationForm(prev => ({
                        ...prev,
                        subject: template.subject,
                        message: template.content,
                        template: e.target.value
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select a template</option>
                  {emailTemplates.map(template => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Attachments</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 border rounded flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FiPaperclip />
                    Add Attachment
                  </button>
                  {communicationForm.attachments.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {communicationForm.attachments.length} file(s) attached
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
          {communicationType === 'sms' && (
            <div>
              <label className="block text-sm font-medium mb-1">SMS Templates</label>
              <select
                name="template"
                value={communicationForm.template}
                onChange={(e) => {
                  const template = smsTemplates.find(t => t.id === parseInt(e.target.value));
                  if (template) {
                    setCommunicationForm(prev => ({
                      ...prev,
                      message: template.content.replace('{name}', selectedLead.name),
                      template: e.target.value
                    }));
                  }
                }}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Select a template</option>
                {smsTemplates.map(template => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FiSend />
              Send {communicationType === 'email' ? 'Email' : 'SMS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MarketingHeadLeadsManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [leadsList, setLeadsList] = useState(leads);
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
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', source: '', status: 'New', assignedTo: '', lastContact: '', notes: '' });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;
  // Filtered and paginated leads (must be above useEffect)
  const filteredLeads = leadsList.filter(lead => filter === 'All' || lead.status === filter);
  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / leadsPerPage);
  const startIdx = (currentPage - 1) * leadsPerPage;
  const endIdx = Math.min(startIdx + leadsPerPage, totalLeads);
  const paginatedLeads = filteredLeads.slice(startIdx, endIdx);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [communicationType, setCommunicationType] = useState(null); // 'email' or 'sms'
  const [communicationForm, setCommunicationForm] = useState({
    subject: '',
    message: '',
    attachments: [],
    template: '',
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState('');
  const [exportFormat, setExportFormat] = useState('CSV');
  const allExportFields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'source', label: 'Source' },
    { key: 'status', label: 'Status' },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'lastContact', label: 'Last Contact' },
    { key: 'notes', label: 'Notes' },
  ];
  const [selectedExportFields, setSelectedExportFields] = useState(allExportFields.map(f => f.key));

  // When leadsList changes (add/delete), reset to first page if current page is out of range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [leadsList, totalPages]);

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
    setShowModal(false);
    setSelectedLead(null);
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

  // Add/Edit Modal
  const openAddModal = () => {
    setEditMode(false);
    setLeadForm({ name: '', email: '', phone: '', source: '', status: 'New', assignedTo: '', lastContact: '', notes: '' });
    setShowAddEditModal(true);
  };
  const openEditModal = (lead) => {
    setEditMode(true);
    setLeadForm(lead);
    setShowAddEditModal(true);
  };
  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setLeadForm({ name: '', email: '', phone: '', source: '', status: 'New', assignedTo: '', lastContact: '', notes: '' });
  };
  const handleLeadFormChange = (e) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddEditLead = (e) => {
    e.preventDefault();
    if (editMode) {
      setLeadsList((prev) => prev.map((l) => l.id === leadForm.id ? { ...leadForm } : l));
    } else {
      setLeadsList((prev) => [...prev, { ...leadForm, id: Date.now() }]);
    }
    closeAddEditModal();
  };
  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeadsList((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  // Modal Components
  const LeadDetailsModal = ({ lead, onClose }) => {
    if (!lead) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" style={{ position: 'relative' }}>
          <button onClick={onClose} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 bg-white/80 dark:bg-gray-800/80 rounded-full p-1">
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

  // Add new handlers for communication
  const handleOpenCommunication = (type, lead) => {
    setCommunicationType(type);
    setSelectedLead(lead);
    setCommunicationForm({
      subject: type === 'email' ? `Follow-up: ${lead.name}` : '',
      message: '',
      attachments: [],
      template: '',
    });
    setShowCommunicationModal(true);
  };

  const handleCloseCommunication = () => {
    setShowCommunicationModal(false);
    setCommunicationType(null);
    setSelectedLead(null);
    setCommunicationForm({
      subject: '',
      message: '',
      attachments: [],
      template: '',
    });
  };

  const handleCommunicationFormChange = (e) => {
    const { name, value } = e.target;
    setCommunicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSendCommunication = (e) => {
    e.preventDefault();
    alert(`${communicationType === 'email' ? 'Email' : 'SMS'} sent to ${selectedLead.name}`);
    handleCloseCommunication();
  };

  // Update the existing email/SMS button handlers
  const handleSendEmail = (lead) => {
    handleOpenCommunication('email', lead);
  };

  const handleSendSMS = (lead) => {
    handleOpenCommunication('sms', lead);
  };

  // Sample template CSV content
  const sampleCsvContent = `Name,Email,Phone,Source,Status,Assigned To,Last Contact,Notes\nJohn Doe,john@example.com,+1234567890,Website,New,Jane Smith,2024-04-10,Interested in MBA`;
  const sampleCsvBlob = new Blob([sampleCsvContent], { type: 'text/csv' });
  const sampleCsvUrl = URL.createObjectURL(sampleCsvBlob);

  // Import/Bulk Upload Handlers
  const handleOpenImportModal = () => {
    setShowImportModal(true);
    setImportError('');
  };
  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setImportFile(null);
    setImportError('');
  };
  const handleImportFileChange = (e) => {
    setImportFile(e.target.files[0]);
    setImportError('');
  };
  const handleImportSubmit = async (e) => {
    e.preventDefault();
    setImportError('');
    if (!importFile) {
      setImportError('Please select a file to import.');
      return;
    }
    const fileExt = importFile.name.split('.').pop().toLowerCase();
    try {
      let newLeads = [];
      if (fileExt === 'csv') {
        const text = await importFile.text();
        const parsed = Papa.parse(text, { header: true });
        if (parsed.errors.length) throw new Error(parsed.errors[0].message);
        newLeads = parsed.data.filter(l => l.Name && l.Email && l.Phone).map(l => ({
          id: Date.now() + Math.random(),
          name: l.Name,
          email: l.Email,
          phone: l.Phone,
          source: l.Source || '',
          status: l.Status || 'New',
          assignedTo: l['Assigned To'] || '',
          lastContact: l['Last Contact'] || '',
          notes: l.Notes || '',
        }));
      } else if (fileExt === 'xlsx') {
        const data = await importFile.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        newLeads = json.filter(l => l.Name && l.Email && l.Phone).map(l => ({
          id: Date.now() + Math.random(),
          name: l.Name,
          email: l.Email,
          phone: l.Phone,
          source: l.Source || '',
          status: l.Status || 'New',
          assignedTo: l['Assigned To'] || '',
          lastContact: l['Last Contact'] || '',
          notes: l.Notes || '',
        }));
      } else {
        setImportError('Unsupported file type. Please upload a CSV or XLSX file.');
        return;
      }
      if (!newLeads.length) {
        setImportError('No valid leads found in the file. Ensure Name, Email, and Phone are present.');
        return;
      }
      setLeadsList(prev => [...prev, ...newLeads]);
      alert(`Successfully imported ${newLeads.length} leads from ${importFile.name}`);
      handleCloseImportModal();
    } catch (err) {
      setImportError('Import failed: ' + (err.message || 'Unknown error'));
    }
  };

  // Get filtered/searched leads for export
  const getExportLeads = () => {
    return leadsList.filter(lead =>
      (filter === 'All' || lead.status === filter) &&
      (searchQuery === '' ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Export handler for modal (custom fields)
  const handleExportLeads = () => {
    const exportLeads = getExportLeads();
    if (!exportLeads.length) {
      alert('No leads to export.');
      return;
    }
    const exportData = exportLeads.map(l => {
      const row = {};
      selectedExportFields.forEach(f => {
        const field = allExportFields.find(x => x.key === f);
        row[field.label] = l[f] || '';
      });
      return row;
    });
    if (exportFormat === 'CSV') {
      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads-export.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (exportFormat === 'XLSX') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads-export.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setShowExportModal(false);
  };

  // Direct export (table section button, all fields, CSV only)
  const handleDirectExport = () => {
    const exportLeads = getExportLeads();
    if (!exportLeads.length) {
      alert('No leads to export.');
      return;
    }
    const exportData = exportLeads.map(l => ({
      'Name': l.name,
      'Email': l.email,
      'Phone': l.phone,
      'Source': l.source,
      'Status': l.status,
      'Assigned To': l.assignedTo,
      'Last Contact': l.lastContact,
      'Notes': l.notes,
    }));
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2" onClick={handleOpenImportModal}><FiUpload /> Import Leads</button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" onClick={() => setShowExportModal(true)}>Export Leads</button>
        </div>
      </div>

      {/* Lead Table Section */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="All">All Status</option>
                {LEAD_STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1" onClick={openAddModal}><FiPlus /> Add Lead</button>
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1" onClick={handleDirectExport}><FiDownload /> Export</button>
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
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 uppercase">
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leadsList.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-3 py-2 text-left cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Lead{sortField === 'name' && (<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>)}</div>
                </th>
                <th className="px-3 py-2 text-left cursor-pointer" onClick={() => handleSort('source')}>
                  <div className="flex items-center gap-1">Source{sortField === 'source' && (<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>)}</div>
                </th>
                <th className="px-3 py-2 text-left cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Status{sortField === 'status' && (<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>)}</div>
                </th>
                <th className="px-3 py-2 text-left">Assigned To</th>
                <th className="px-3 py-2 text-left">Last Contact</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-300 font-medium text-xs">{lead.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{lead.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">{lead.source}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${LEAD_STATUSES.find(s => s.value === lead.status)?.color || 'bg-gray-100 text-gray-700'}`}>{lead.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{lead.assignedTo.charAt(0)}</span>
                      </div>
                      <span className="text-xs">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">{lead.lastContact}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSendEmail(lead)}
                        className="p-1 rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
                        title="Send Email"
                        style={{ border: 'none', background: 'none' }}
                      >
                        <FiMail />
                      </button>
                      <button
                        onClick={() => handleSendSMS(lead)}
                        className="p-1 rounded-full text-green-500 hover:bg-green-50 dark:hover:bg-green-900"
                        title="Send SMS"
                        style={{ border: 'none', background: 'none' }}
                      >
                        <FiMessageCircle />
                      </button>
                      <span className="mx-1 text-gray-300">|</span>
                      <button onClick={() => handleLeadClick(lead)} className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" title="View Details"><FiUser /></button>
                      <button onClick={() => openEditModal(lead)} className="p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" title="Edit"><FiEdit2 /></button>
                      <button onClick={() => handleDeleteLead(lead.id)} className="p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" title="Delete"><FiTrash2 /></button>
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
              {`Showing ${totalLeads === 0 ? 0 : startIdx + 1} to ${endIdx} of ${totalLeads} leads`}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
              <button
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalLeads === 0}
              >
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
          <h2 className="text-lg font-semibold">AI optimized decision panel</h2>
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
      {activeModal === 'analytics' && <AnalyticsModal onClose={handleCloseModal} />}
      {showCommunicationModal && (
        <CommunicationModal
          onClose={handleCloseCommunication}
          selectedLead={selectedLead}
          communicationType={communicationType}
          communicationForm={communicationForm}
          handleCommunicationFormChange={handleCommunicationFormChange}
          handleSendCommunication={handleSendCommunication}
          setCommunicationForm={setCommunicationForm}
        />
      )}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowExportModal(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <button onClick={() => setShowExportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Export Leads</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <select className="w-full px-3 py-2 border rounded" value={exportFormat} onChange={e => setExportFormat(e.target.value)}>
                <option value="CSV">CSV</option>
                <option value="XLSX">XLSX</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Fields to Export</label>
              <div className="flex flex-wrap gap-2">
                {allExportFields.map(f => (
                  <label key={f.key} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedExportFields.includes(f.key)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedExportFields(prev => [...prev, f.key]);
                        } else {
                          setSelectedExportFields(prev => prev.filter(x => x !== f.key));
                        }
                      }}
                    /> {f.label}
                  </label>
                ))}
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full" onClick={handleExportLeads}>Export</button>
          </div>
        </div>
      )}
      {showAddEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAddEditModal} />
          <form onSubmit={handleAddEditLead} className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <button type="button" onClick={closeAddEditModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Lead' : 'Add Lead'}</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input name="name" value={leadForm.name} onChange={handleLeadFormChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" value={leadForm.email} onChange={handleLeadFormChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" value={leadForm.phone} onChange={handleLeadFormChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Source</label>
              <input name="source" value={leadForm.source} onChange={handleLeadFormChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={leadForm.status} onChange={handleLeadFormChange} className="w-full px-3 py-2 border rounded">
                {LEAD_STATUSES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Assigned To</label>
              <input name="assignedTo" value={leadForm.assignedTo} onChange={handleLeadFormChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Last Contact</label>
              <input name="lastContact" value={leadForm.lastContact} onChange={handleLeadFormChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea name="notes" value={leadForm.notes} onChange={handleLeadFormChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editMode ? 'Update Lead' : 'Add Lead'}</button>
          </form>
        </div>
      )}
      {/* Import/Bulk Upload Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseImportModal} />
          <form onSubmit={handleImportSubmit} className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <button type="button" onClick={handleCloseImportModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Import Leads</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select CSV or XLSX file</label>
              <input type="file" accept=".csv,.xlsx" onChange={handleImportFileChange} className="w-full" />
            </div>
            <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
              <p>Accepted columns: <b>Name, Email, Phone, Source, Status, Assigned To, Last Contact, Notes</b></p>
              <p>Download a <a href={sampleCsvUrl} download="sample-leads.csv" className="text-blue-600 underline">sample template</a>.</p>
            </div>
            {importError && <div className="mb-4 text-red-600 text-xs">{importError}</div>}
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Import</button>
          </form>
        </div>
      )}
    </div>
  );
} 