import React, { useState } from "react";
import { FiUsers, FiCalendar, FiDollarSign, FiTool, FiArchive, FiBriefcase, FiBarChart2, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiTrendingDown, FiClock, FiZap, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiChevronRight, FiFileText, FiMail, FiStar } from 'react-icons/fi';

// Demo data for each module
const teamMembers = [
  { id: 1, name: "Saudi Arabia", role: "Field Marketer", assigned: "Campus Fair", geo: "Riyadh", workload: 90 },
  { id: 2, name: "Saudi Arabia", role: "Digital Marketer", assigned: "Social Media Campaign", geo: "Remote", workload: 60 },
  { id: 3, name: "Saudi Arabia", role: "Designer", assigned: "Brochure Design", geo: "Jeddah", workload: 40 },
  { id: 4, name: "Saudi Arabia", role: "Content Creator", assigned: "Blog Series", geo: "Remote", workload: 30 },
  { id: 5, name: "Saudi Arabia", role: "Intern", assigned: "Data Entry", geo: "Dammam", workload: 20 },
];

const campaignPlanner = [
  { id: 1, campaign: "MBA Admissions", start: "2025-06-15", end: "2025-07-15", status: "On Track", tasks: 12, completed: 8 },
  { id: 2, campaign: "Engineering Outreach", start: "2025-06-20", end: "2025-07-30", status: "Delayed", tasks: 10, completed: 5 },
];

const budgetData = [
  { id: 1, campaign: "MBA Admissions", planned: 50000, spent: 32000, roi: "Pending" },
  { id: 2, campaign: "Engineering Outreach", planned: 40000, spent: 41000, roi: "Low" },
  { id: 3, campaign: "Social Media", planned: 20000, spent: 15000, roi: "High" },
];

const tools = [
  { id: 1, name: "Mailchimp", type: "Email Tool", users: 5, renewal: "2025-07-01", usage: 80, yearlySubscription: "$1,200" },
  { id: 2, name: "HubSpot", type: "CRM Plugin", users: 8, renewal: "2025-08-15", usage: 60, yearlySubscription: "$2,400" },
  { id: 3, name: "Canva", type: "Design Tool", users: 3, renewal: "2025-06-20", usage: 30, yearlySubscription: "$600" },
];

const assets = [
  { id: 1, name: "MBA Brochure.pdf", type: "Brochure", version: "v2.1", downloads: 120, lastUsed: "2025-06-10" },
  { id: 2, name: "Logo.png", type: "Logo", version: "v1.0", downloads: 200, lastUsed: "2025-06-09" },
  { id: 3, name: "Campus Tour.mp4", type: "Video", version: "v1.3", downloads: 80, lastUsed: "2025-06-08" },
];

const vendors = [
  { id: 1, name: "Saudi Arabia", type: "Ad Agency", rating: 4.5, contracts: 3, lastInvoice: "2025-06-07" },
  { id: 2, name: "Saudi Arabia", type: "Printer", rating: 4.0, contracts: 2, lastInvoice: "2025-06-06" },
  { id: 3, name: "Saudi Arabia", type: "Event Vendor", rating: 4.8, contracts: 5, lastInvoice: "2025-06-05" },
];

const utilization = {
  team: [90, 60, 40, 30, 20],
  budget: 0.68, // 68% consumed
  asset: [120, 200, 80],
  tool: [80, 60, 30],
  campaign: [12, 10, 8],
};

const approvals = [
  { id: 1, type: "Budget", item: "MBA Admissions", status: "Pending", approver: "Saudi Arabia" },
  { id: 2, type: "Content", item: "Campus Tour Video", status: "Approved", approver: "Saudi Arabia" },
  { id: 3, type: "Vendor Payment", item: "Saudi Arabia", status: "Pending", approver: "Saudi Arabia" },
];

// Academic compliance demo data (example Saudi Arabian names)
const academicCompliances = [
  { id: 1, name: "Faisal Al Saud", compliance: "Accreditation Renewal", status: "Completed", date: "2024-04-10" },
  { id: 2, name: "Aisha Al Rashid", compliance: "Curriculum Update", status: "Pending", date: "2024-04-15" },
  { id: 3, name: "Omar Al Zahrani", compliance: "Faculty Training", status: "In Progress", date: "2024-04-12" },
];

export default function ResourceManagement() {
  // State for modals, filters, etc. can be added as needed
  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-gray-900 dark:to-gray-800 rounded-xl px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">Resource Management <FiBriefcase className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Complete visibility and control over your marketing resources with AI-powered insights.</p>
        </div>
      </div>

      {/* 1. Team Allocation */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-blue-500" />
          <h2 className="text-lg font-semibold">Team Allocation</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Forecasting</span>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">Underutilization Alerts</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Assigned</th>
                <th className="pb-3 font-medium">Geo</th>
                <th className="pb-3 font-medium">Workload</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m) => (
                <tr key={m.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{m.name}</td>
                  <td className="py-3">{m.role}</td>
                  <td className="py-3">{m.assigned}</td>
                  <td className="py-3">{m.geo}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${m.workload > 80 ? 'bg-red-500' : m.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${m.workload}%` }}></div>
                      </div>
                      <span className="text-xs">{m.workload}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {m.workload < 30 && <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Idle</span>}
                    {m.workload > 80 && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Overbooked</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Event Monitoring */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="text-purple-500" />
          <h2 className="text-lg font-semibold">Event Monitoring</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Delay Risk</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Time Optimization</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Start</th>
                <th className="pb-3 font-medium">End</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Tasks</th>
                <th className="pb-3 font-medium">Completed</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {campaignPlanner.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.campaign}</td>
                  <td className="py-3">{c.start}</td>
                  <td className="py-3">{c.end}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${c.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{c.status}</span>
                  </td>
                  <td className="py-3">{c.tasks}</td>
                  <td className="py-3">{c.completed}</td>
                  <td className="py-3">
                    {c.status === 'Delayed' && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Delay Risk</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Budget & Cost Allocation */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiDollarSign className="text-green-500" />
          <h2 className="text-lg font-semibold">Budget & Cost Allocation</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI ROI Predictor</span>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">Budget Drift Alert</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Planned</th>
                <th className="pb-3 font-medium">Spent</th>
                <th className="pb-3 font-medium">ROI</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((b) => (
                <tr key={b.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{b.campaign}</td>
                  <td className="py-3">$ {b.planned.toLocaleString()}</td>
                  <td className="py-3">$ {b.spent.toLocaleString()}</td>
                  <td className="py-3">{b.roi}</td>
                  <td className="py-3">
                    {b.spent > b.planned && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Over Budget</span>}
                    {b.roi === 'High' && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">High ROI</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Tool & Software Management */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiTool className="text-pink-500" />
          <h2 className="text-lg font-semibold">Tool & Software Management</h2>
          <span className="ml-2 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded animate-pulse">AI Usage Insights</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Tool</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Users</th>
                <th className="pb-3 font-medium">Renewal</th>
                <th className="pb-3 font-medium">Yearly Subscription</th>
                <th className="pb-3 font-medium">Usage</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{t.name}</td>
                  <td className="py-3">{t.type}</td>
                  <td className="py-3">{t.users}</td>
                  <td className="py-3">{t.renewal}</td>
                  <td className="py-3">{t.yearlySubscription}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${t.usage < 40 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${t.usage}%` }}></div>
                      </div>
                      <span className="text-xs">{t.usage}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {t.usage < 40 && <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Underused</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Asset & Content Repository */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiArchive className="text-blue-400" />
          <h2 className="text-lg font-semibold">Asset & Content Repository</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Content Scoring</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Smart Suggestions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Asset</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Version</th>
                <th className="pb-3 font-medium">Downloads</th>
                <th className="pb-3 font-medium">Last Used</th>
                <th className="pb-3 font-medium">AI Tag</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr key={a.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{a.name}</td>
                  <td className="py-3">{a.type}</td>
                  <td className="py-3">{a.version}</td>
                  <td className="py-3">{a.downloads}</td>
                  <td className="py-3">{a.lastUsed}</td>
                  <td className="py-3">
                    {a.downloads > 100 && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Top Performer</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Vendor & Partner Management */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBriefcase className="text-yellow-500" />
          <h2 className="text-lg font-semibold">Vendor & Partner Management</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Vendor Analytics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Vendor</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium">Contracts</th>
                <th className="pb-3 font-medium">Last Invoice</th>
                <th className="pb-3 font-medium">AI Tag</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{v.name}</td>
                  <td className="py-3">{v.type}</td>
                  <td className="py-3">{v.rating} <FiStar className="inline text-yellow-400" /></td>
                  <td className="py-3">{v.contracts}</td>
                  <td className="py-3">{v.lastInvoice}</td>
                  <td className="py-3">
                    {v.rating > 4.5 && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Top Vendor</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Resource Utilization Dashboard */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-blue-500" />
          <h2 className="text-lg font-semibold">Resource Utilization Dashboard</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Weekly Report</span>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">Anomaly Detection</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Team Usage Heatmap</h3>
            <div className="flex gap-2">
              {utilization.team.map((val, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center ${val > 80 ? 'bg-red-500' : val > 60 ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>{val}%</div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Budget Consumption</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div className="h-4 rounded-full bg-blue-500" style={{ width: `${utilization.budget * 100}%` }}></div>
            </div>
            <div className="text-xs mt-2">{Math.round(utilization.budget * 100)}% used</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Asset Download Frequency</h3>
            <div className="flex gap-2">
              {utilization.asset.map((val, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center">{val}</div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Tool Cost vs. Usage</h3>
            <div className="flex gap-2">
              {utilization.tool.map((val, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center ${val < 40 ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>{val}%</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Approval Workflow */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCheckCircle className="text-green-500" />
          <h2 className="text-lg font-semibold">Approval Workflow</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Item</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Approver</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((a) => (
                <tr key={a.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{a.type}</td>
                  <td className="py-3">{a.item}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${a.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span>
                  </td>
                  <td className="py-3">{a.approver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Academic Compliance Section */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-green-500" />
          <h2 className="text-lg font-semibold">Academic Compliance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Compliance</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {academicCompliances.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3">{item.compliance}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{item.status}</span>
                  </td>
                  <td className="py-3">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Features Summary */}
      <section className="bg-white dark:bg-gray-800/80 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiZap className="text-yellow-500 animate-pulse" />
          <h2 className="text-lg font-semibold">AI Features in Resource Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">AI Feature</th>
                <th className="pb-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">📊 Forecast Resource Demand</td>
                <td className="py-3">Predict team/resource needs based on upcoming campaigns</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">📉 Budget Drift Detection</td>
                <td className="py-3">Identify overspending trends early</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">🧠 Smart Content Suggestions</td>
                <td className="py-3">Suggest content for new campaigns based on prior performance</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">🔔 Under/Overutilization Alerts</td>
                <td className="py-3">Notify about underused or overwhelmed staff</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">📈 ROI Predictor</td>
                <td className="py-3">Predict ROI from planned resource allocation</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="py-3">🛠 Tool Optimization Suggestions</td>
                <td className="py-3">Recommend cost-saving on SaaS subscriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 