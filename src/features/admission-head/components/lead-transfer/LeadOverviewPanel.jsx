import React, { useState } from 'react';
import { FiFilter, FiSearch, FiCalendar, FiUser, FiMapPin } from 'react-icons/fi';
import DateRangePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const LeadOverviewPanel = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  const leads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      applicationId: "APP001",
      program: "B.Tech Computer Science",
      status: "Follow-up",
      lastInteraction: "2024-03-15",
      source: "Website",
      assignedTo: "Amit Sharma"
    },
    {
      id: 2,
      name: "Mohammed Al-Saud",
      applicationId: "APP002",
      program: "MBA",
      status: "Hot",
      lastInteraction: "2024-03-14",
      source: "Walk-in",
      assignedTo: "Priya Patel"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      applicationId: "APP003",
      program: "B.Tech Mechanical",
      status: "New",
      lastInteraction: "2024-03-16",
      source: "Campaign",
      assignedTo: "Rahul Verma"
    },
    {
      id: 4,
      name: "Fatima Al-Rashid",
      applicationId: "APP004",
      program: "B.Tech Civil",
      status: "Follow-up",
      lastInteraction: "2024-03-13",
      source: "Website",
      assignedTo: "Megha Sharma"
    },
    {
      id: 5,
      name: "Arjun Singh",
      applicationId: "APP005",
      program: "MBA",
      status: "Hot",
      lastInteraction: "2024-03-15",
      source: "Referral",
      assignedTo: "Amit Sharma"
    }
  ];

  const leadStages = ['New', 'Follow-up', 'Hot', 'Cold'];
  const counselors = [
    'Amit Sharma',
    'Priya Patel',
    'Rahul Verma',
    'Megha Sharma',
    'Abdullah Al-Mansour',
    'Michael Thompson'
  ];
  const sources = ['Website', 'Walk-in', 'Campaign', 'Referral'];

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FiFilter />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <div className="flex space-x-2">
                <DateRangePicker
                  selected={filters.dateRange.start}
                  onChange={(dates) => setFilters({
                    ...filters,
                    dateRange: { start: dates[0], end: dates[1] }
                  })}
                  startDate={filters.dateRange.start}
                  endDate={filters.dateRange.end}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholderText="Select date range"
                />
              </div>
            </div>

            {/* Lead Stage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lead Stage
              </label>
              <select
                value={filters.leadStage}
                onChange={(e) => setFilters({ ...filters, leadStage: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Stages</option>
                {leadStages.map(stage => (
                  <option key={stage} value={stage.toLowerCase()}>{stage}</option>
                ))}
              </select>
            </div>

            {/* Assigned Counselor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned Counselor
              </label>
              <select
                value={filters.assignedCounselor}
                onChange={(e) => setFilters({ ...filters, assignedCounselor: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Counselors</option>
                {counselors.map(counselor => (
                  <option key={counselor} value={counselor}>{counselor}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source.toLowerCase()}>{source}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name & ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Program
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Interaction
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{lead.applicationId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${lead.status === 'Hot' ? 'bg-red-100 text-red-800' :
                        lead.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'Cold' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.lastInteraction}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.assignedTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadOverviewPanel; 