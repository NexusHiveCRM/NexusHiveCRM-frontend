import React, { useState } from "react";
import DirectorLayout from "./DirectorLayout";
import Sidebar from "./Sidebar";
import { directorFeatures } from './directorFeatures';

export default function Workspace() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} expanded={expanded} setExpanded={setExpanded} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <header>
          <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">Workspace</h1>
          <p className="text-gray-600 dark:text-gray-300">Unified dashboard for staff to manage development, compliance, HR, and daily operations.</p>
        </header>

        {/* Training & Development */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🎓 Training & Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Training Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Team Training</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Leadership Development Series <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">In Progress</span></li>
                <li>Onboarding Training <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Completed</span></li>
                <li>Digital Teaching Tools <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Pending</span></li>
              </ul>
            </div>
            {/* Knowledge Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Knowledge Management</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li><a href="#" className="underline">How to publish research papers</a></li>
                <li><a href="#" className="underline">Handling international student onboarding</a></li>
                <li><a href="#" className="underline">Department-level SOPs</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compliance & Quality */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">✅ Compliance & Quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Assurance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">Quality Assurance</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Semester-end Quality Self-Assessment <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Start</button></li>
                <li>Course Content Coverage Analysis <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">View</button></li>
                <li>NAAC/NBA Compliance Uploads <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Upload</button></li>
              </ul>
            </div>
            {/* Risk Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">Risk Management</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Delayed exam result publication <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">High</span></li>
                <li>Underperformance in placement targets <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Medium</span></li>
                <li>Increased dropout trend <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">Alert</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Account Management */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🧾 Account Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* My Profile Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">My Profile</h3>
              <p className="text-gray-900 dark:text-gray-200">View and update your personal information, upload documents.</p>
            </div>
            {/* My HR Board Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">My HR Board</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Monthly Salary Slip <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Download</button></li>
                <li>Leave Balance Tracker</li>
                <li>Performance Review Form</li>
              </ul>
            </div>
            {/* My Referral Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">My Referral</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Submit Referral</li>
                <li>Track Referral Status</li>
              </ul>
            </div>
            {/* Task Box Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">Task Box</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Submit departmental budget proposal</li>
                <li>Conduct internal audit for lab equipment</li>
                <li>Approve student research applications</li>
              </ul>
            </div>
            {/* Events Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">Events</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Annual Tech Symposium – Registration Open</li>
                <li>Internal FDP Schedule</li>
              </ul>
            </div>
            {/* Attendance Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300 mb-2">Attendance</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Present: 16 days, Leave: 2 days, Absent: 1 day</li>
                <li>Submit attendance correction for 14th March</li>
              </ul>
            </div>
            {/* Recruitment Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">Recruitment</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Internal Opening: Dean - School of Management</li>
                <li>Submit SOP for role upgrade</li>
              </ul>
            </div>
            {/* Geo-Fencing Card (Optional) */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-2">Geo-Fencing</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Checked in from Main Campus @ 9:02 AM</li>
                <li>Alert: Out-of-zone attendance attempt</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 