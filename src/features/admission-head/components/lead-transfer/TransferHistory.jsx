import React, { useState } from 'react';
import { FiDownload, FiFilter, FiSearch } from 'react-icons/fi';
import DateRangePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TransferHistory = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    fromCounselor: 'all',
    toCounselor: 'all',
    searchQuery: ''
  });

  // Mock data - replace with actual API call
  const transferHistory = [
    {
      id: 1,
      leadName: "Abdullah Al-Rashid",
      applicationId: "APP001",
      fromCounselor: "Noura Al-Zahra",
      toCounselor: "Khalid Al-Sayed",
      date: "2024-03-15",
      time: "14:30",
      reason: "Better match for technical course counseling",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 2,
      leadName: "Mohammed Al-Saud",
      applicationId: "APP002",
      fromCounselor: "Khalid Al-Sayed",
      toCounselor: "Aisha Al-Hassan",
      date: "2024-03-14",
      time: "11:15",
      reason: "Regional expertise required",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 3,
      leadName: "Layla Al-Mansour",
      applicationId: "APP003",
      fromCounselor: "Aisha Al-Hassan",
      toCounselor: "Omar Al-Mutairi",
      date: "2024-03-16",
      time: "09:45",
      reason: "Language preference match",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 4,
      leadName: "Fatima Al-Rashid",
      applicationId: "APP004",
      fromCounselor: "Omar Al-Mutairi",
      toCounselor: "Noura Al-Zahra",
      date: "2024-03-13",
      time: "16:20",
      reason: "Cultural background match",
      initiatedBy: "Admission Head",
      status: "Completed"
    },
    {
      id: 5,
      leadName: "Yousef Al-Harbi",
      applicationId: "APP005",
      fromCounselor: "Noura Al-Zahra",
      toCounselor: "Khalid Al-Sayed",
      date: "2024-03-15",
      time: "13:10",
      reason: "Workload balancing",
      initiatedBy: "Admission Head",
      status: "Completed"
    }
  ];

  const counselors = [
    'Noura Al-Zahra',
    'Khalid Al-Sayed',
    'Aisha Al-Hassan',
    'Omar Al-Mutairi',
    'Fatima Al-Rashid',
    'Yousef Al-Harbi'
  ];

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting transfer history...');
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Transfer History</h2>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiDownload className="mr-2" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
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

          {/* From Counselor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Counselor
            </label>
            <select
              value={filters.fromCounselor}
              onChange={(e) => setFilters({ ...filters, fromCounselor: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Counselors</option>
              {counselors.map(counselor => (
                <option key={counselor} value={counselor}>{counselor}</option>
              ))}
            </select>
          </div>

          {/* To Counselor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Counselor
            </label>
            <select
              value={filters.toCounselor}
              onChange={(e) => setFilters({ ...filters, toCounselor: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Counselors</option>
              {counselors.map(counselor => (
                <option key={counselor} value={counselor}>{counselor}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search by name or ID..."
                className="w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Transfer History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lead Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Transfer Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transferHistory.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{transfer.leadName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{transfer.applicationId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {transfer.fromCounselor} → {transfer.toCounselor}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      By: {transfer.initiatedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transfer.date}
                    <br />
                    {transfer.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {transfer.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${transfer.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {transfer.status}
                    </span>
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

export default TransferHistory; 