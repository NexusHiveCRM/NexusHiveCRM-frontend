import React, { useState } from 'react';
import { FiUpload, FiDownload, FiFileText, FiSettings, FiMail, FiUsers, FiMapPin, FiAlertCircle, FiZap, FiCheckCircle, FiXCircle, FiCalendar, FiEdit2, FiTrash2, FiPlus, FiEye, FiDatabase, FiRepeat, FiBarChart2, FiList, FiChevronDown, FiChevronUp, FiTool } from 'react-icons/fi';

// Mock data for demo
const mockLogs = [
  { id: 1, user: 'Priya Singh', action: 'Edited applicant', module: 'Applicants', date: '2024-06-10', details: 'Updated phone number' },
  { id: 2, user: 'Amit Patel', action: 'Deleted document', module: 'Documents', date: '2024-06-09', details: 'Removed duplicate ID proof' },
  { id: 3, user: 'Riya Mehra', action: 'Updated payment', module: 'Payments', date: '2024-06-08', details: 'Marked as paid' },
];
const mockTasks = [
  { id: 1, task: 'Follow-up with Aarav Sharma', assigned: 'Priya Singh', deadline: '2024-06-12', priority: 'High', status: 'Pending' },
  { id: 2, task: 'Review payment for Sara Khan', assigned: 'Amit Patel', deadline: '2024-06-11', priority: 'Medium', status: 'In Progress' },
];
const mockTemplates = [
  { id: 1, name: 'Welcome Email', type: 'Email', content: 'Dear {Name}, welcome to our program!', fields: ['Name', 'Program'] },
  { id: 2, name: 'Payment Reminder', type: 'SMS', content: 'Dear {Name}, your payment for {Program} is due.', fields: ['Name', 'Program'] },
];
const mockGeo = [
  { region: 'Delhi', count: 120 },
  { region: 'Mumbai', count: 80 },
  { region: 'Bangalore', count: 60 },
];
const mockDuplicates = [
  { id: 'A001', name: 'Aarav Sharma', email: 'aarav@email.com', match: 'Email' },
  { id: 'A002', name: 'Arav Sharma', email: 'aarav@email.com', match: 'Name (fuzzy)' },
];
const mockApiStatus = [
  { name: 'Payment Gateway', status: 'Active', lastSync: '2024-06-10', errors: 0 },
  { name: 'SMS Gateway', status: 'Error', lastSync: '2024-06-09', errors: 2 },
];

export default function ToolsUtilities() {
  const [uploadLog, setUploadLog] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showGeoModal, setShowGeoModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast
  React.useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  // Card component for each tool
  function ToolCard({ icon, title, accent, children, desc }) {
    return (
      <div className={`bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 flex flex-col gap-2 border-t-4 ${accent} hover:scale-[1.02] transition-transform duration-200`}> 
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">{title}</span>
        </div>
        {desc && <div className="text-xs text-gray-500 mb-2">{desc}</div>}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 p-0 animate-fade-in">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 py-10 px-6 md:px-12 flex flex-col md:flex-row items-center gap-6 mb-10 rounded-b-3xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-4"><FiTool className="text-white" size={40} /></div>
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Tools & Utilities</h1>
            <p className="text-white/90 text-lg max-w-xl">Central hub for essential admission-related utilities, automation tools, file converters, calculators, import/export tools, and productivity enhancers — boosting efficiency, reducing manual errors, and enabling data-driven decisions.</p>
          </div>
        </div>
      </div>
      {/* Grid of Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pb-16">
        <ToolCard icon={<FiUpload className="text-blue-500" size={22} />} title="Bulk Data Upload / Import" accent="border-blue-400" desc="Map columns, validate, log summary">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition" onClick={() => setShowUploadModal(true)}>Upload Excel/CSV</button>
          <div className="text-xs text-gray-400 mt-2">Example: Upload 200 offline walk-in applications collected during education fairs</div>
        </ToolCard>
        <ToolCard icon={<FiDownload className="text-green-500" size={22} />} title="Bulk Data Export" accent="border-green-400" desc="XLSX, PDF, CSV, JSON | Redact sensitive data">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition" onClick={() => setShowExportModal(true)}>Export Data</button>
          <div className="text-xs text-gray-400 mt-2">Use Case: Share "Admitted UG Students for 2025" with Finance or Hostel teams</div>
        </ToolCard>
        <ToolCard icon={<FiFileText className="text-purple-500" size={22} />} title="Document Converter" accent="border-purple-400" desc="Image/Word to PDF, merge, compress">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition">Image/Word to PDF</button>
            <button className="px-4 py-2 bg-purple-200 text-purple-700 rounded-lg font-semibold shadow hover:bg-purple-300 transition">Merge/Compress</button>
          </div>
          <div className="text-xs text-gray-400 mt-2">Ideal for scanned documents from students</div>
        </ToolCard>
        <ToolCard icon={<FiSettings className="text-yellow-500" size={22} />} title="Admission Fee Estimator" accent="border-yellow-400" desc="Configure, AI suggest, print/download">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition">Estimate Fee</button>
        </ToolCard>
        <ToolCard icon={<FiCalendar className="text-pink-500" size={22} />} title="Application Timeline Generator" accent="border-pink-400" desc="Visual, alerts, share">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 transition" onClick={() => setShowTimelineModal(true)}>Generate Timeline</button>
        </ToolCard>
        <ToolCard icon={<FiMail className="text-blue-400" size={22} />} title="Email & SMS Templates Manager" accent="border-blue-300" desc="CRUD, merge fields, organize">
          <button className="px-4 py-2 bg-blue-400 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition" onClick={() => setShowTemplateModal(true)}>Manage Templates</button>
        </ToolCard>
        <ToolCard icon={<FiUsers className="text-green-500" size={22} />} title="Task Assignment Panel" accent="border-green-300" desc="Assign, track, workload">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition" onClick={() => setShowTaskModal(true)}>Assign Task</button>
        </ToolCard>
        <ToolCard icon={<FiMapPin className="text-red-500" size={22} />} title="Geo Insights Tool" accent="border-red-400" desc="Filter, export by region">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition" onClick={() => setShowGeoModal(true)}>View Heat Map</button>
        </ToolCard>
        <ToolCard icon={<FiAlertCircle className="text-yellow-600" size={22} />} title="Duplicate Checker" accent="border-yellow-600" desc="Scan, fuzzy match, AI suggest">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition" onClick={() => setShowDuplicateModal(true)}>Scan for Duplicates</button>
        </ToolCard>
        <ToolCard icon={<FiList className="text-gray-500" size={22} />} title="Audit Log Viewer" accent="border-gray-400" desc="Search/filter logs">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition" onClick={() => setShowAuditModal(true)}>View Logs</button>
        </ToolCard>
        <ToolCard icon={<FiCalendar className="text-indigo-500" size={22} />} title="Scheduler Utility" accent="border-indigo-400" desc="Auto-reminders, sync with appointments">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">View Calendar</button>
        </ToolCard>
        <ToolCard icon={<FiDatabase className="text-pink-500" size={22} />} title="API Integration Panel" accent="border-pink-400" desc="Status, retry, logs">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 transition" onClick={() => setShowApiModal(true)}>Monitor Integrations</button>
        </ToolCard>
        <ToolCard icon={<FiZap className="text-yellow-500 animate-pulse" size={22} />} title="AI-Powered Utilities" accent="border-yellow-400" desc="Automation, validation, data quality">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">Smart Auto-Fill</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Predictive Import Mapping</span>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Data Quality Score</span>
            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">Anomaly Detector</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Bulk Document Validator (OCR)</span>
          </div>
        </ToolCard>
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 