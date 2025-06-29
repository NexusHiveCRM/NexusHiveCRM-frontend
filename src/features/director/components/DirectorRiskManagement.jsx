import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Demo data for risks
const risks = [
  {
    id: 1,
    name: 'Data Security Breach',
    category: 'IT',
    severity: 'High',
    probability: 'Medium',
    status: 'Active',
    impact: 'Critical',
    mitigation: 'Enhanced security protocols'
  },
  {
    id: 2,
    name: 'Student Enrollment Decline',
    category: 'Academic',
    severity: 'High',
    probability: 'Low',
    status: 'Monitored',
    impact: 'Financial',
    mitigation: 'Marketing campaign'
  },
  {
    id: 3,
    name: 'Regulatory Compliance',
    category: 'Legal',
    severity: 'Medium',
    probability: 'High',
    status: 'Active',
    impact: 'Operational',
    mitigation: 'Regular audits'
  }
];

// Demo data for risk metrics
const riskMetrics = [
  {
    id: 1,
    title: 'Active Risks',
    value: '12',
    change: '+2',
    trend: 'up'
  },
  {
    id: 2,
    title: 'High Severity',
    value: '3',
    change: '-1',
    trend: 'down'
  },
  {
    id: 3,
    title: 'Mitigation Rate',
    value: '75%',
    change: '+5%',
    trend: 'up'
  },
  {
    id: 4,
    title: 'Risk Score',
    value: '65',
    change: '-5',
    trend: 'down'
  }
];

export default function DirectorRiskManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showRiskModal, setShowRiskModal] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Monitor and manage institutional risks</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Risk
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            Export Report
          </button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: metric.id * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
              <span className={`ml-2 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risks List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Active Risks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 font-medium">Risk</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Severity</th>
                  <th className="pb-3 font-medium">Probability</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Impact</th>
                  <th className="pb-3 font-medium">Mitigation</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id} className="border-b dark:border-gray-700">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{risk.name}</p>
                      </div>
                    </td>
                    <td className="py-4">{risk.category}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.severity === 'High' ? 'bg-red-100 text-red-700' :
                        risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {risk.severity}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.probability === 'High' ? 'bg-red-100 text-red-700' :
                        risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {risk.probability}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.status === 'Active' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {risk.status}
                      </span>
                    </td>
                    <td className="py-4">{risk.impact}</td>
                    <td className="py-4">{risk.mitigation}</td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
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
    </div>
  );
} 