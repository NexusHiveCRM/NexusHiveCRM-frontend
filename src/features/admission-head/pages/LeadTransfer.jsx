import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFilter, 
  FiClock, 
  FiAlertCircle,
  FiCheckCircle,
  FiDownload,
  FiCalendar,
  FiBarChart2
} from 'react-icons/fi';

// Components will be imported here
import LeadOverviewPanel from '../components/lead-transfer/LeadOverviewPanel';
import BulkTransferPanel from '../components/lead-transfer/BulkTransferPanel';
import TransferHistory from '../components/lead-transfer/TransferHistory';
import ConflictResolutionPanel from '../components/lead-transfer/ConflictResolutionPanel';
import KPIDashboard from '../components/lead-transfer/KPIDashboard';

const LeadTransfer = () => {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    leadStage: 'all',
    assignedCounselor: 'all',
    source: 'all'
  });

  const tabs = [
    { id: 'overview', label: 'Lead Overview', icon: <FiUsers /> },
    { id: 'bulk-transfer', label: 'Bulk Transfer', icon: <FiFilter /> },
    { id: 'history', label: 'Transfer History', icon: <FiClock /> },
    { id: 'conflicts', label: 'Conflicts', icon: <FiAlertCircle /> },
    { id: 'kpi', label: 'KPI Insights', icon: <FiBarChart2 /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Lead Transfer Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and transfer leads between counselors efficiently
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && <LeadOverviewPanel filters={filters} setFilters={setFilters} />}
          {activeTab === 'bulk-transfer' && <BulkTransferPanel selectedLeads={selectedLeads} setSelectedLeads={setSelectedLeads} />}
          {activeTab === 'history' && <TransferHistory />}
          {activeTab === 'conflicts' && <ConflictResolutionPanel />}
          {activeTab === 'kpi' && <KPIDashboard />}
        </div>
      </div>
    </div>
  );
};

export default LeadTransfer; 