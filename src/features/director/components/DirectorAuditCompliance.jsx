import React, { useState } from "react";
import { motion } from "framer-motion";
import { directorFeatures } from '../../../components/directorFeatures';

const auditLogs = [
  { id: 1, date: "2024-03-10", action: "User Login", user: "Dean Science", status: "Success", details: "IP: 192.168.1.10" },
  { id: 2, date: "2024-03-09", action: "Data Export", user: "HoD EEE", status: "Success", details: "Exported student list" },
  { id: 3, date: "2024-03-08", action: "Policy Update", user: "Director", status: "Failed", details: "Insufficient permissions" },
];
const complianceStatus = [
  { area: "NCAAA", status: "Compliant", lastAudit: "2023-12-01" },
  { area: "NBA", status: "Pending", lastAudit: "2022-11-15" },
  { area: "AICTE", status: "Compliant", lastAudit: "2023-01-20" },
  { area: "ETEC", status: "Compliant", lastAudit: "2022-09-10" },
];
const riskAnalytics = [
  { risk: "Data Breach", level: "Low", mitigation: "2FA, Encryption" },
  { risk: "Non-compliance", level: "Medium", mitigation: "Quarterly Audits" },
  { risk: "Policy Violation", level: "High", mitigation: "Training, Monitoring" },
];

export default function DirectorAuditCompliance() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [logFilter, setLogFilter] = useState("");

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Audit & Compliance</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Monitor audit logs, compliance status, and risk analytics for the institution.</p>
        </div>

        {/* Compliance Status */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Compliance Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {complianceStatus.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">{c.area}</div>
                <div className={`text-xs font-bold ${c.status === "Compliant" ? "text-green-600" : "text-yellow-600"}`}>{c.status}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Last Audit: {c.lastAudit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Logs */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Audit Logs</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <input value={logFilter} onChange={e => setLogFilter(e.target.value)} className="px-3 py-1.5 mb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Filter by user or action..." />
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>Date</th><th>Action</th><th>User</th><th>Status</th><th>Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.filter(l => l.user.toLowerCase().includes(logFilter.toLowerCase()) || l.action.toLowerCase().includes(logFilter.toLowerCase())).map((log, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{log.date}</td><td>{log.action}</td><td>{log.user}</td>
                    <td><span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === "Success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}>{log.status}</span></td>
                    <td>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk Analytics */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Risk Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {riskAnalytics.map((r, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-1">
                <div className="font-semibold text-xs mb-1">{r.risk}</div>
                <div className={`text-xs font-bold ${r.level === "High" ? "text-red-600" : r.level === "Medium" ? "text-yellow-600" : "text-green-600"}`}>{r.level}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Mitigation: {r.mitigation}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 