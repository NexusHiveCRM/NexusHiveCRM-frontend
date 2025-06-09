import React from "react";

const Workspace = () => {
  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <header>
          <h1 className="text-2xl font-bold !text-gray-900 dark:!text-white">Workspace</h1>
          <p className="text-gray-600 dark:text-gray-300">Unified dashboard for managing admissions, compliance, and daily operations.</p>
        </header>

        {/* Training & Development */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🎓 Training & Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Training Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Team Training</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Admission Process Training <span className="ml-2 text-xs bg-green-700 text-white px-2 py-1 rounded">In Progress</span></li>
                <li>Compliance Training <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Completed</span></li>
                <li>Digital Tools Training <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Pending</span></li>
              </ul>
            </div>
            {/* Knowledge Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-2">Knowledge Management</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li><a href="#" className="underline">Admission Guidelines</a></li>
                <li><a href="#" className="underline">Compliance Procedures</a></li>
                <li><a href="#" className="underline">Department SOPs</a></li>
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
                <li>Admission Quality Self-Assessment <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Start</button></li>
                <li>Compliance Coverage Analysis <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">View</button></li>
                <li>Compliance Uploads <button className="ml-2 text-xs bg-blue-700 text-white px-2 py-1 rounded">Upload</button></li>
              </ul>
            </div>
            {/* Risk Management Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
              <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-2">Risk Management</h3>
              <ul className="space-y-2 text-gray-900 dark:text-gray-200">
                <li>Delayed admission process <span className="ml-2 text-xs bg-red-700 text-white px-2 py-1 rounded">High</span></li>
                <li>Underperformance in compliance <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-1 rounded">Medium</span></li>
                <li>Increased dropout trend <span className="ml-2 text-xs bg-orange-700 text-white px-2 py-1 rounded">Alert</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workplace */}
        <section>
          <h2 className="text-xl font-semibold !text-gray-900 dark:!text-white mb-4">🏢 Workplace</h2>
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
};

export default Workspace; 