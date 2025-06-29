import React, { useState } from "react";

export default function MarketingHeadWorkspace() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  return (
    <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
      <header>
        <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">Workspace</h1>
        <p className="text-gray-600 dark:text-gray-300">Unified dashboard for marketing team to manage campaigns, assets, compliance, and daily operations.</p>
      </header>

      {/* Training & Development */}
      <section>
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🎓 Training & Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marketing Training Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Marketing Training</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Digital Marketing Bootcamp <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">In Progress</span></li>
              <li>Brand Management Workshop <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Completed</span></li>
              <li>Content Strategy Seminar <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Pending</span></li>
            </ul>
          </div>
          {/* Knowledge Base Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Knowledge Base</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li><a href="#" className="underline">How to launch a campaign</a></li>
              <li><a href="#" className="underline">Social media best practices</a></li>
              <li><a href="#" className="underline">Marketing compliance checklist</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance & Quality */}
      <section>
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">✅ Compliance & Quality</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Compliance Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">Campaign Compliance</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Ad content review <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Review</button></li>
              <li>Brand guideline adherence <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Check</button></li>
              <li>GDPR/Privacy compliance <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Audit</button></li>
            </ul>
          </div>
          {/* Risk Management Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">Risk Management</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Negative campaign feedback <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">High</span></li>
              <li>Missed campaign deadlines <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Medium</span></li>
              <li>Budget overrun alert <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">Alert</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asset & Campaign Management */}
      <section>
        <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">📁 Asset & Campaign Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Campaigns Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">My Campaigns</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Q2 Marketing Strategy <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">Active</span></li>
              <li>Summer Campaign <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Planning</span></li>
              <li>Brand Awareness Drive <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Completed</span></li>
            </ul>
          </div>
          {/* Asset Library Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">Asset Library</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Summer Campaign Assets</li>
              <li>Brand Guidelines</li>
              <li>Social Media Templates</li>
            </ul>
          </div>
          {/* Task Box Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">Task Box</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Submit campaign report</li>
              <li>Review ad creatives</li>
              <li>Approve influencer contracts</li>
            </ul>
          </div>
          {/* Events Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">Events</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Annual Marketing Summit – Registration Open</li>
              <li>Internal Training Schedule</li>
            </ul>
          </div>
          {/* Analytics Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
            <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">Analytics</h3>
            <ul className="space-y-2 text-gray-900 dark:text-gray-200">
              <li>Campaign Performance Dashboard</li>
              <li>Lead Generation Trends</li>
              <li>ROI Analysis</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
} 