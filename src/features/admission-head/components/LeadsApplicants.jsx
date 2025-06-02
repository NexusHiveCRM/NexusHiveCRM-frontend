import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiChevronRight, FiX, FiUpload, FiMessageCircle, FiUsers, FiBarChart2, FiAlertCircle, FiDownload, FiZap } from 'react-icons/fi';

const pipelineStages = [
  'Inquiry',
  'Contacted',
  'Application Started',
  'Documents Submitted',
  'Verified',
  'Offer Sent',
  'Confirmed',
  'Withdrawn / Rejected',
];

const tabs = [
  'Leads',
  'Applicants',
  'Shortlisted',
  'Offers Sent',
  'Enrolled',
];

// Mock leads data
const mockLeads = [
  {
    id: 1,
    name: 'Aarav Sharma',
    program: 'B.Tech Computer Science',
    source: 'Web',
    status: 'Inquiry',
    officer: 'Priya Singh',
    engagement: 'High',
    history: ['Inquiry', 'Contacted'],
    tags: ['Scholarship Interested'],
    contact: { email: 'aarav@email.com', phone: '+91-9000000001' },
    geo: { country: 'India', state: 'Maharashtra', city: 'Mumbai' },
    timeline: [
      { type: 'Inquiry', date: '2024-05-01' },
      { type: 'Contacted', date: '2024-05-02' },
    ],
    docs: [],
    notes: 'Very interested in AI specialization.',
  },
  {
    id: 2,
    name: 'Sara Khan',
    program: 'MBA',
    source: 'Referral',
    status: 'Application Started',
    officer: 'Amit Patel',
    engagement: 'Medium',
    history: ['Inquiry', 'Contacted', 'Application Started'],
    tags: ['Sports Quota'],
    contact: { email: 'sara@email.com', phone: '+91-9000000002' },
    geo: { country: 'India', state: 'Delhi', city: 'Delhi' },
    timeline: [
      { type: 'Inquiry', date: '2024-05-03' },
      { type: 'Contacted', date: '2024-05-04' },
      { type: 'Application Started', date: '2024-05-05' },
    ],
    docs: ['Resume.pdf'],
    notes: '',
  },
  // Add more mock leads as needed
];

const engagementColors = {
  High: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-red-100 text-red-700',
};

export default function LeadsApplicants() {
  const [activeTab, setActiveTab] = useState('Leads');
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({ program: '', geo: '', officer: '', status: '', source: '', date: '' });
  const [search, setSearch] = useState('');

  // Filtered leads for demo
  const filteredLeads = mockLeads.filter(lead =>
    (filters.status ? lead.status === filters.status : true) &&
    (filters.program ? lead.program.includes(filters.program) : true) &&
    (filters.geo ? lead.geo.state.includes(filters.geo) : true) &&
    (filters.officer ? lead.officer.includes(filters.officer) : true) &&
    (filters.source ? lead.source.includes(filters.source) : true) &&
    (search ? lead.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  // Group by pipeline stage
  const leadsByStage = pipelineStages.reduce((acc, stage) => {
    acc[stage] = filteredLeads.filter(lead => lead.status === stage);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none ${activeTab === tab ? 'bg-white dark:bg-gray-800 border-x border-t border-b-0 border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter/Search Bar */}
      <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-gray-800/80 rounded-xl shadow px-4 py-3">
        <FiFilter className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, program: e.target.value }))}>
          <option value="">Program</option>
          <option value="B.Tech">B.Tech</option>
          <option value="MBA">MBA</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, geo: e.target.value }))}>
          <option value="">State</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, officer: e.target.value }))}>
          <option value="">Officer</option>
          <option value="Priya Singh">Priya Singh</option>
          <option value="Amit Patel">Amit Patel</option>
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">Status</option>
          {pipelineStages.map(stage => <option key={stage}>{stage}</option>)}
        </select>
        <select className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, source: e.target.value }))}>
          <option value="">Source</option>
          <option value="Web">Web</option>
          <option value="Referral">Referral</option>
        </select>
        <input type="date" className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm" onChange={e => setFilters(f => ({ ...f, date: e.target.value }))} />
        <button className="ml-auto flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 text-sm">
          <FiDownload /> Import CSV
        </button>
        <button className="flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/30 text-sm">
          <FiUpload /> Add Lead
        </button>
      </div>

      {/* Kanban Pipeline */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-[900px]">
          {pipelineStages.map(stage => (
            <div key={stage} className="flex-1 min-w-[220px] bg-gray-50 dark:bg-gray-800/60 rounded-xl shadow p-2">
              <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                {stage}
                {stage === 'Withdrawn / Rejected' && <FiAlertCircle className="text-red-400" />}
              </div>
              <div className="flex flex-col gap-2">
                {leadsByStage[stage].length === 0 && <div className="text-xs text-gray-400">No leads</div>}
                {leadsByStage[stage].map(lead => (
                  <button
                    key={lead.id}
                    className={`text-left bg-white dark:bg-gray-900 rounded-lg p-3 shadow hover:shadow-lg border-l-4 ${lead.engagement === 'High' ? 'border-green-400' : lead.engagement === 'Medium' ? 'border-yellow-400' : 'border-red-400'} transition`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">{lead.name}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${engagementColors[lead.engagement]}`}>{lead.engagement}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{lead.program}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <FiUser className="inline" /> {lead.officer}
                      <FiChevronRight className="inline mx-1" />
                      <span>{lead.source}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Profile Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSelectedLead(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-xl h-full overflow-y-auto p-6 animate-slide-in-right">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setSelectedLead(null)}><FiX size={22} /></button>
            <div className="flex items-center gap-3 mb-4">
              <FiUser className="text-blue-500" size={28} />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedLead.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{selectedLead.program}</div>
                <div className="text-xs text-gray-400">Assigned: {selectedLead.officer}</div>
              </div>
            </div>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">{selectedLead.notes}</div>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedLead.tags.map(tag => <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>)}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Contact Info</div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><FiMail /> {selectedLead.contact.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><FiPhone /> {selectedLead.contact.phone}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Location</div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{selectedLead.geo.city}, {selectedLead.geo.state}, {selectedLead.geo.country}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Timeline</div>
              <ul className="text-xs text-gray-500 dark:text-gray-300 list-disc ml-4">
                {selectedLead.timeline.map((item, idx) => <li key={idx}>{item.type} - {item.date}</li>)}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Documents</div>
              {selectedLead.docs.length === 0 ? <div className="text-xs text-gray-400">No documents uploaded</div> : selectedLead.docs.map(doc => <div key={doc} className="text-xs text-blue-600 underline cursor-pointer">{doc}</div>)}
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Internal Notes</div>
              <textarea className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm p-2" rows={3} defaultValue={selectedLead.notes} />
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Assign Task / Follow-up</div>
              <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm p-2" placeholder="Add a task or follow-up..." />
              <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">Assign</button>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Stage Transitions</div>
              <ul className="text-xs text-gray-500 dark:text-gray-300 list-disc ml-4">
                {selectedLead.history.map((stage, idx) => <li key={idx}>{stage}</li>)}
              </ul>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Source Attribution</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">{selectedLead.source}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">AI Conversion Prediction</div>
              <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${engagementColors[selectedLead.engagement]}`}>{selectedLead.engagement} Likelihood</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">Communication Log</div>
              <div className="text-xs text-gray-400">(Demo) No recent messages</div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholders for other panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Manager */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiBarChart2 className="text-blue-500" /><h2 className="text-lg font-semibold">Application Manager</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Table of formal applicants, document/payment/interview status, alerts for pending docs.</div>
        </section>
        {/* Communication Triggers */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiMessageCircle className="text-green-500" /><h2 className="text-lg font-semibold">Communication Triggers</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Bulk/single WhatsApp, Email, SMS, AI-powered nudges.</div>
        </section>
        {/* Team Assignment & Workload */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiUsers className="text-purple-500" /><h2 className="text-lg font-semibold">Team Assignment & Workload</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Officer workload, reassign, AI suggestions.</div>
        </section>
        {/* Drop-off & Inactivity Insights */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiAlertCircle className="text-red-500" /><h2 className="text-lg font-semibold">Drop-off & Inactivity Insights</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Inactive leads, drop-offs, re-engagement nudges.</div>
        </section>
        {/* Lead Source Performance */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiBarChart2 className="text-yellow-500" /><h2 className="text-lg font-semibold">Lead Source Performance</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Conversion %, cost per lead, ROAS, color-coded bars.</div>
        </section>
        {/* Bulk Actions / Data Import */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiDownload className="text-blue-500" /><h2 className="text-lg font-semibold">Bulk Actions / Data Import</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Manual entry, CSV import, API integrations.</div>
        </section>
        {/* AI & Automation */}
        <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4"><FiZap className="text-pink-500" /><h2 className="text-lg font-semibold">AI & Automation</h2></div>
          <div className="text-xs text-gray-400 mb-2">(Demo) Smart duplicate detection, auto-assignment, predictive scoring, Smart Assistant.</div>
        </section>
      </div>
    </div>
  );
} 