import React, { useState, useRef, useEffect } from 'react';
import { FiFileText, FiCheckCircle, FiXCircle, FiClock, FiDollarSign, FiSend, FiUserCheck, FiFilter, FiSearch, FiUser, FiZap, FiAlertTriangle, FiUsers, FiCalendar, FiMail, FiDownload } from 'react-icons/fi';

// Mock data for applications
const mockApplications = [
  { id: 1, name: 'John Doe', applicationId: 'APP-001', program: 'Computer Science', submissionDate: '2024-03-15', status: 'Under Review', reviewer: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', ai: { likelihood: 92, topPercentile: true } },
  { id: 2, name: 'Jane Smith', applicationId: 'APP-002', program: 'Business Administration', submissionDate: '2024-03-14', status: 'Approved', reviewer: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', ai: { likelihood: 88, topPercentile: false } },
  { id: 3, name: 'Alice Johnson', applicationId: 'APP-003', program: 'Engineering', submissionDate: '2024-03-13', status: 'Rejected', reviewer: 'David Lee', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', ai: { likelihood: 23, topPercentile: false, duplicate: true } },
  { id: 4, name: 'Bob Brown', applicationId: 'APP-004', program: 'Arts & Humanities', submissionDate: '2024-03-12', status: 'Pending Verification', reviewer: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', ai: { likelihood: 60, topPercentile: false } },
  { id: 5, name: 'Charlie Wilson', applicationId: 'APP-005', program: 'Medical Sciences', submissionDate: '2024-03-11', status: 'Payment Pending', reviewer: 'Frank Miller', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', ai: { likelihood: 70, topPercentile: false } },
  { id: 6, name: 'Diana Evans', applicationId: 'APP-006', program: 'Law', submissionDate: '2024-03-10', status: 'Offers Sent', reviewer: 'Grace Lee', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', ai: { likelihood: 80, topPercentile: false } },
  { id: 7, name: 'Ethan Harris', applicationId: 'APP-007', program: 'Design', submissionDate: '2024-03-09', status: 'Enrollments Confirmed', reviewer: 'Hannah White', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', ai: { likelihood: 95, topPercentile: true } },
];

const statusColors = {
  'Under Review': 'bg-yellow-100 text-yellow-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Pending Verification': 'bg-blue-100 text-blue-700',
  'Payment Pending': 'bg-purple-100 text-purple-700',
  'Offers Sent': 'bg-indigo-100 text-indigo-700',
  'Enrollments Confirmed': 'bg-green-100 text-green-700',
};

const statusList = [
  'Under Review',
  'Approved',
  'Rejected',
  'Pending Verification',
  'Payment Pending',
  'Offers Sent',
  'Enrollments Confirmed',
];

// Animated Counter Hook
function useAnimatedCounter(target, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

// Donut Chart SVG
function StatusDonutChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  const colors = [
    '#facc15', // yellow
    '#22c55e', // green
    '#ef4444', // red
    '#3b82f6', // blue
    '#a21caf', // purple
    '#6366f1', // indigo
    '#10b981', // emerald
  ];
  return (
    <svg width="120" height="120" viewBox="0 0 42 42" className="mx-auto">
      {data.map((d, i) => {
        const val = (d.value / total) * 100;
        const r = 16;
        const circ = 2 * Math.PI * r;
        const offset = circ * (1 - acc / 100);
        const len = circ * (val / 100);
        const dasharray = `${len} ${circ - len}`;
        const stroke = colors[i % colors.length];
        acc += val;
        return (
          <circle
            key={d.label}
            r={r}
            cx="21"
            cy="21"
            fill="transparent"
            stroke={stroke}
            strokeWidth="4"
            strokeDasharray={dasharray}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dasharray 1s, stroke-dashoffset 1s' }}
          />
        );
      })}
      <text x="21" y="24" textAnchor="middle" fontSize="8" fill="#334155" className="font-bold">
        Status
      </text>
    </svg>
  );
}

// AI Insights Panel
function AIInsightsPanel({ applications }) {
  const top = applications.filter(a => a.ai.topPercentile);
  const duplicate = applications.find(a => a.ai.duplicate);
  const highLikelihood = applications.filter(a => a.ai.likelihood > 85);
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <FiZap className="text-purple-500 animate-pulse" size={22} />
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">AI Insights</span>
      </div>
      <div className="flex flex-wrap gap-4">
        {top.length > 0 && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiCheckCircle className="text-green-500" />
            <span className="font-medium text-green-800 dark:text-green-200">{top.length} Top 5% Applicants</span>
          </div>
        )}
        {duplicate && (
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg animate-shake">
            <FiAlertTriangle className="text-yellow-500" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">Possible duplicate: {duplicate.applicationId}</span>
          </div>
        )}
        {highLikelihood.length > 0 && (
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg animate-fade-in">
            <FiUserCheck className="text-blue-500" />
            <span className="font-medium text-blue-800 dark:text-blue-200">{highLikelihood.length} Highly Likely to Enroll</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Toast component
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
}

// Modal component
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-w-[320px] max-w-[90vw] relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function Applications() {
  const [view, setView] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Use localStorage for persistence
  function getLS(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  }
  function setLS(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  const [pendingDocs, setPendingDocs] = useState(() => getLS('pendingDocs', [mockApplications[3], mockApplications[4]]));
  const [showDocModal, setShowDocModal] = useState(false);
  const [docModalApplicant, setDocModalApplicant] = useState(null);
  const [toast, setToast] = useState(null);

  const [reviewers, setReviewers] = useState(() => getLS('reviewers', [
    { name: 'Michael Chen', avatar: mockApplications[1].avatar, count: 7 },
    { name: 'David Lee', avatar: mockApplications[2].avatar, count: 6 },
    { name: 'Sarah Johnson', avatar: mockApplications[0].avatar, count: 5 },
  ]));
  const [assignModal, setAssignModal] = useState(false);
  const [assignApplicant, setAssignApplicant] = useState(null);

  const [interviews, setInterviews] = useState(() => getLS('interviews', [
    { ...mockApplications[0], time: '10:00 AM', completed: false },
    { ...mockApplications[5], time: '2:00 PM', completed: false },
    { ...mockApplications[6], time: '4:30 PM', completed: false },
  ]));
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewApplicant, setInterviewApplicant] = useState(null);

  const [offers, setOffers] = useState(() => getLS('offers', [
    { ...mockApplications[1], accepted: true },
    { ...mockApplications[5], accepted: false },
  ]));
  const [bulkOffer, setBulkOffer] = useState(false);

  // Animated counters
  const total = useAnimatedCounter(mockApplications.length);
  const underReview = useAnimatedCounter(mockApplications.filter(app => app.status === 'Under Review').length);
  const approved = useAnimatedCounter(mockApplications.filter(app => app.status === 'Approved').length);
  const rejected = useAnimatedCounter(mockApplications.filter(app => app.status === 'Rejected').length);

  // Donut chart data
  const donutData = statusList.map(label => ({ label, value: mockApplications.filter(app => app.status === label).length }));

  // Filter applications based on search query and status
  const filteredApplications = mockApplications.filter(app =>
    (searchQuery ? app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (filterStatus ? app.status === filterStatus : true)
  );

  // Document Verification Actions
  function handleVerifyDoc(app) {
    setPendingDocs(pendingDocs.filter(a => a.id !== app.id));
    setToast(`Verified documents for ${app.name}`);
  }
  function handleRequestDoc(app) {
    setToast(`Requested missing documents from ${app.name}`);
  }

  // Reviewer Assignment Actions
  function handleAssignReviewer(app, reviewer) {
    setToast(`Assigned ${reviewer.name} to ${app.name}`);
    setAssignModal(false);
  }

  // Interview Actions
  function handleScheduleInterview(app, time) {
    setInterviews([...interviews, { ...app, time, completed: false }]);
    setShowInterviewModal(false);
    setToast(`Interview scheduled for ${app.name} at ${time}`);
  }
  function handleSendReminder(app) {
    setToast(`Reminder sent to ${app.name}`);
  }
  function handleMarkCompleted(app) {
    setInterviews(interviews.map(i => i.id === app.id ? { ...i, completed: true } : i));
    setToast(`Interview marked as completed for ${app.name}`);
  }

  // Offer Actions
  function handleSendOffer(app) {
    setOffers(offers.map(o => o.id === app.id ? { ...o, accepted: true } : o));
    setToast(`Offer sent to ${app.name}`);
  }
  function handleBulkSendOffers() {
    setOffers(offers.map(o => ({ ...o, accepted: true })));
    setBulkOffer(false);
    setToast('Bulk offers sent!');
  }
  function handleDownloadOffer(app) {
    setToast(`Downloading offer letter for ${app.name}`);
  }

  // Persist state to localStorage on change
  useEffect(() => { setLS('pendingDocs', pendingDocs); }, [pendingDocs]);
  useEffect(() => { setLS('reviewers', reviewers); }, [reviewers]);
  useEffect(() => { setLS('interviews', interviews); }, [interviews]);
  useEffect(() => { setLS('offers', offers); }, [offers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Applications</h1>

      {/* Application Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <FiFileText className="text-blue-500 mb-2" size={28} />
          <span className="text-gray-500 text-sm">Total Applications</span>
          <span className="text-4xl font-bold text-blue-700 dark:text-blue-300 animate-count">{total}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <FiClock className="text-yellow-500 mb-2" size={28} />
          <span className="text-gray-500 text-sm">Under Review</span>
          <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-300 animate-count">{underReview}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <FiCheckCircle className="text-green-500 mb-2" size={28} />
          <span className="text-gray-500 text-sm">Approved</span>
          <span className="text-4xl font-bold text-green-600 dark:text-green-300 animate-count">{approved}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
          <FiXCircle className="text-red-500 mb-2" size={28} />
          <span className="text-gray-500 text-sm">Rejected</span>
          <span className="text-4xl font-bold text-red-600 dark:text-red-300 animate-count">{rejected}</span>
        </div>
      </div>

      {/* Donut Chart + AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Status Breakdown</h2>
          <StatusDonutChart data={donutData} />
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {donutData.map((d, i) => d.value > 0 && (
              <span key={d.label} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium" style={{ background: statusColors[d.label]?.split(' ')[0].replace('bg-', 'var(--tw-bg-opacity,1) ') }}>
                <span className={`w-2 h-2 rounded-full inline-block`} style={{ background: statusColors[d.label]?.split(' ')[0].replace('bg-', '') }}></span>
                {d.label}: {d.value}
              </span>
            ))}
          </div>
        </div>
        <AIInsightsPanel applications={mockApplications} />
      </div>

      {/* Application Tracker */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Application Tracker</h2>
          <div className="flex gap-2">
            <button onClick={() => setView('table')} className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${view === 'table' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>Table View</button>
            <button onClick={() => setView('card')} className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${view === 'card' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>Card View</button>
          </div>
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or application ID..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white dark:bg-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusList.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
        {view === 'table' ? (
          <div className="overflow-x-auto animate-fade-in">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left font-semibold">Candidate</th>
                  <th className="px-4 py-2 text-left font-semibold">Application ID</th>
                  <th className="px-4 py-2 text-left font-semibold">Program</th>
                  <th className="px-4 py-2 text-left font-semibold">Submission Date</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                  <th className="px-4 py-2 text-left font-semibold">Reviewer</th>
                  <th className="px-4 py-2 text-left font-semibold">AI</th>
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => (
                  <tr key={app.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img src={app.avatar} alt={app.name} className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-sm" />
                      <span className="font-medium">{app.name}</span>
                    </td>
                    <td className="px-4 py-2">{app.applicationId}</td>
                    <td className="px-4 py-2">{app.program}</td>
                    <td className="px-4 py-2">{app.submissionDate}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full font-semibold text-xs shadow ${statusColors[app.status]}`}>{app.status}</span>
                    </td>
                    <td className="px-4 py-2">{app.reviewer}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1">
                        <span className="relative flex items-center">
                          <svg width="28" height="28">
                            <circle cx="14" cy="14" r="12" fill="#f3f4f6" />
                            <circle cx="14" cy="14" r="12" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={`${(app.ai.likelihood / 100) * 75} 100`} transform="rotate(-90 14 14)" />
                          </svg>
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-blue-700 dark:text-blue-300">{app.ai.likelihood}%</span>
                        </span>
                        {app.ai.topPercentile && <span className="ml-1 bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full animate-pulse">Top 5%</span>}
                        {app.ai.duplicate && <span className="ml-1 bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full animate-bounce">Duplicate</span>}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline font-semibold transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredApplications.map(app => (
              <div key={app.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white/80 dark:bg-gray-900/80 shadow-lg hover:scale-[1.03] transition-transform flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <img src={app.avatar} alt={app.name} className="w-10 h-10 rounded-full border-2 border-blue-200 shadow-sm" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{app.name}</h3>
                    <span className="text-xs text-gray-400">{app.applicationId}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full font-semibold text-xs shadow ${statusColors[app.status]}`}>{app.status}</span>
                  <span className="text-xs text-gray-500">{app.program}</span>
                  <span className="text-xs text-gray-500">{app.submissionDate}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <FiUser className="text-gray-400" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{app.reviewer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="28" height="28">
                    <circle cx="14" cy="14" r="12" fill="#f3f4f6" />
                    <circle cx="14" cy="14" r="12" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={`${(app.ai.likelihood / 100) * 75} 100`} transform="rotate(-90 14 14)" />
                  </svg>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{app.ai.likelihood}% Likelihood</span>
                  {app.ai.topPercentile && <span className="ml-1 bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full animate-pulse">Top 5%</span>}
                  {app.ai.duplicate && <span className="ml-1 bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full animate-bounce">Duplicate</span>}
                </div>
                <button className="mt-2 text-blue-600 hover:underline font-semibold transition-colors self-start">View</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Placeholders for other sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {/* Document Verification Hub */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FiFileText className="text-blue-500" size={22} />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Document Verification Hub</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">Documents Verified:</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-32">
              <div className="h-2 bg-green-400 rounded-full" style={{ width: `${100 - pendingDocs.length * 10}%` }}></div>
            </div>
            <span className="text-xs font-bold text-green-600">{100 - pendingDocs.length * 10}%</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Pending Applicants:</span>
            <div className="flex flex-col gap-2 mt-1">
              {pendingDocs.map(app => (
                <div key={app.id} className="flex items-center gap-2">
                  <img src={app.avatar} alt={app.name} className="w-6 h-6 rounded-full border-2 border-blue-200" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200 cursor-pointer underline" onClick={() => { setDocModalApplicant(app); setShowDocModal(true); }}>{app.name}</span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">Missing Docs</span>
                  <button className="text-green-600 text-xs font-bold hover:underline" onClick={() => handleVerifyDoc(app)}>Verify</button>
                  <button className="text-blue-600 text-xs font-bold hover:underline" onClick={() => handleRequestDoc(app)}>Request</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Review Workflow Manager */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FiUsers className="text-purple-500" size={22} />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Review Workflow Manager</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">Reviewer Workload:</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-32">
              <div className="h-2 bg-indigo-400 rounded-full" style={{ width: `${reviewers.reduce((a, b) => a + b.count, 0) * 5}%` }}></div>
            </div>
            <span className="text-xs font-bold text-indigo-600">{reviewers.reduce((a, b) => a + b.count, 0) * 5}%</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Top Reviewers:</span>
            <div className="flex flex-col gap-2 mt-1">
              {reviewers.map(rev => (
                <div key={rev.name} className="flex items-center gap-2">
                  <img src={rev.avatar} alt={rev.name} className="w-6 h-6 rounded-full border-2 border-purple-200" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{rev.name}</span>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">{rev.count} apps</span>
                  <button className="text-blue-600 text-xs font-bold hover:underline" onClick={() => { setAssignApplicant(rev); setAssignModal(true); }}>Assign</button>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-2 px-4 py-2 bg-purple-200 text-purple-800 rounded-lg font-semibold" onClick={() => setAssignModal(true)}>Bulk Assign</button>
        </div>
        {/* Interview Management */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FiCalendar className="text-pink-500" size={22} />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Interview Management</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">Interviews Scheduled:</span>
            <span className="text-xs font-bold text-pink-600">{interviews.length}</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Upcoming Interviews:</span>
            <div className="flex flex-col gap-2 mt-1">
              {interviews.map(app => (
                <div key={app.id} className="flex items-center gap-2">
                  <img src={app.avatar} alt={app.name} className="w-6 h-6 rounded-full border-2 border-pink-200" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{app.name}</span>
                  <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs">{app.time}</span>
                  {!app.completed && <button className="text-green-600 text-xs font-bold hover:underline" onClick={() => handleMarkCompleted(app)}>Mark Completed</button>}
                  <button className="text-blue-600 text-xs font-bold hover:underline" onClick={() => handleSendReminder(app)}>Send Reminder</button>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-2 px-4 py-2 bg-pink-200 text-pink-800 rounded-lg font-semibold" onClick={() => setShowInterviewModal(true)}>Schedule Interview</button>
        </div>
        {/* Offer Management */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <FiSend className="text-green-500" size={22} />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Offer Management</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">Offers Accepted:</span>
            <svg width="32" height="32">
              <circle cx="16" cy="16" r="14" fill="#f3f4f6" />
              <circle cx="16" cy="16" r="14" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="22 44" transform="rotate(-90 16 16)" />
            </svg>
            <span className="text-xs font-bold text-green-600">{Math.round((offers.filter(o => o.accepted).length / offers.length) * 100)}%</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-gray-500">Recent Offers:</span>
            <div className="flex flex-col gap-2 mt-1">
              {offers.map(app => (
                <div key={app.id} className="flex items-center gap-2">
                  <img src={app.avatar} alt={app.name} className="w-6 h-6 rounded-full border-2 border-green-200" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{app.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${app.accepted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{app.accepted ? 'Accepted' : 'Pending'}</span>
                  {!app.accepted && <button className="text-blue-600 text-xs font-bold hover:underline" onClick={() => handleSendOffer(app)}>Send Offer</button>}
                  <button className="text-indigo-600 text-xs font-bold hover:underline" onClick={() => handleDownloadOffer(app)}><FiDownload className="inline mr-1" />Download</button>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-2 px-4 py-2 bg-green-200 text-green-800 rounded-lg font-semibold" onClick={() => setBulkOffer(true)}>Bulk Send Offers</button>
        </div>
      </div>
      {/* Modals and Toasts */}
      <Modal open={showDocModal} onClose={() => setShowDocModal(false)} title={`Verify Documents: ${docModalApplicant?.name}`}>{docModalApplicant && (
        <div>
          <div className="mb-2 flex items-center gap-2"><FiMail className="text-blue-400" /> <span className="text-xs">{docModalApplicant.contact?.email || 'applicant@email.com'}</span></div>
          <div className="mb-2 text-xs text-gray-500">Missing: 10th Marksheet, ID Proof</div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold mt-2" onClick={() => { handleVerifyDoc(docModalApplicant); setShowDocModal(false); }}>Mark as Verified</button>
        </div>
      )}</Modal>
      <Modal open={assignModal} onClose={() => setAssignModal(false)} title="Assign Reviewer">
        <div className="flex flex-col gap-2">
          {mockApplications.map(app => (
            <button key={app.id} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30" onClick={() => handleAssignReviewer(assignApplicant || app, { name: app.reviewer, avatar: app.avatar })}>
              <img src={app.avatar} alt={app.reviewer} className="w-6 h-6 rounded-full border-2 border-indigo-200" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{app.reviewer}</span>
            </button>
          ))}
        </div>
      </Modal>
      <Modal open={showInterviewModal} onClose={() => setShowInterviewModal(false)} title="Schedule Interview">
        <div className="flex flex-col gap-2">
          {mockApplications.map(app => (
            <button key={app.id} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-pink-100 dark:hover:bg-pink-900/30" onClick={() => handleScheduleInterview(app, `${Math.floor(Math.random()*12+9)}:00 AM`)}>
              <img src={app.avatar} alt={app.name} className="w-6 h-6 rounded-full border-2 border-pink-200" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{app.name}</span>
            </button>
          ))}
        </div>
      </Modal>
      <Modal open={bulkOffer} onClose={() => setBulkOffer(false)} title="Bulk Send Offers">
        <div className="flex flex-col gap-2">
          {offers.filter(o => !o.accepted).map(app => (
            <div key={app.id} className="flex items-center gap-2">
              <img src={app.avatar} alt={app.name} className="w-6 h-6 rounded-full border-2 border-green-200" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{app.name}</span>
            </div>
          ))}
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold" onClick={handleBulkSendOffers}>Send Offers</button>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
} 