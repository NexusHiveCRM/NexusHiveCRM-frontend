import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiClock, FiUsers } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const KPIDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - replace with actual API call
  const kpiData = {
    transfersThisMonth: 25,
    convertedAfterTransfer: 12,
    avgResponseTime: '3 hrs',
    conversionRate: 48,
    trend: 'up'
  };

  const transferTrendData = [
    { month: 'Jan', transfers: 15, conversions: 7 },
    { month: 'Feb', transfers: 20, conversions: 10 },
    { month: 'Mar', transfers: 25, conversions: 12 },
    { month: 'Apr', transfers: 18, conversions: 9 },
    { month: 'May', transfers: 22, conversions: 11 },
    { month: 'Jun', transfers: 25, conversions: 12 }
  ];

  const counselorPerformance = [
    { name: 'Noura Al-Zahra', conversionRate: 45, avgResponseTime: '4.1 hrs' },
    { name: 'Khalid Al-Sayed', conversionRate: 52, avgResponseTime: '3.5 hrs' },
    { name: 'Aisha Al-Hassan', conversionRate: 65, avgResponseTime: '2.5 hrs' },
    { name: 'Omar Al-Mutairi', conversionRate: 58, avgResponseTime: '3.2 hrs' },
    { name: 'Fatima Al-Rashid', conversionRate: 45, avgResponseTime: '4.1 hrs' },
    { name: 'Yousef Al-Harbi', conversionRate: 62, avgResponseTime: '2.8 hrs' },
    { name: 'Maha Al-Shehri', conversionRate: 52, avgResponseTime: '3.5 hrs' },
    { name: 'Sami Al-Shammari', conversionRate: 48, avgResponseTime: '3.9 hrs' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Transfers This Month */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUsers className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Transfers This Month
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {kpiData.transfersThisMonth}
              </p>
            </div>
          </div>
        </div>

        {/* Converted After Transfer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiTrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Converted After Transfer
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {kpiData.convertedAfterTransfer}
              </p>
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiClock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg Response Time
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {kpiData.avgResponseTime}
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {kpiData.trend === 'up' ? (
                <FiTrendingUp className="h-6 w-6 text-green-600" />
              ) : (
                <FiTrendingDown className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Conversion Rate
              </h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {kpiData.conversionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Trend Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Transfer Trends
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transferTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="transfers" fill="#4F46E5" name="Transfers" />
              <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Counselor Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Counselor Performance After Transfers
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Counselor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Avg Response Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {counselorPerformance.map((counselor) => (
                <tr key={counselor.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {counselor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="mr-2">{counselor.conversionRate}%</span>
                      {counselor.conversionRate > 50 ? (
                        <FiTrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <FiTrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {counselor.avgResponseTime}
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

export default KPIDashboard; 