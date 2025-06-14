import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';

// Demo data for filters
const departments = ["All Departments", "Computer Science", "EEE", "Mechanical", "Business", "Biotech"];
const years = ["2024", "2025", "2026", "2027", "2028"];

// Demo data for KPIs
const kpis = [
  { label: "Student-Faculty Ratio", value: 18, target: 15, unit: ":1" },
  { label: "Publications/Faculty", value: 2.8, target: 3.5 },
  { label: "Retention Rate", value: 92, target: 95, unit: "%" },
  { label: "Placement Rate", value: 81, target: 90, unit: "%" },
];

// Demo data for progress bars
const goals = [
  { label: "Research Output", progress: 70 },
  { label: "Accreditation Status", progress: 85 },
  { label: "Placements", progress: 81 },
  { label: "Faculty Hiring", progress: 60 },
];

// Demo data for Gantt chart (strategic roadmap)
const roadmap = [
  { name: "NCAAA Prep", start: "2024", end: "2025" },
  { name: "New BSc AI Program", start: "2025", end: "2026" },
  { name: "Campus Expansion", start: "2026", end: "2028" },
  { name: "Green Campus Initiative", start: "2024", end: "2027" },
];

// Demo data for trend analysis
const trends = [
  { label: "Enrollment", values: [1200, 1300, 1400, 1550, 1700] },
  { label: "Placements", values: [800, 900, 950, 1100, 1200] },
  { label: "Research Funding ($K)", values: [200, 250, 300, 350, 400] },
];

// Demo data for SWOT
const swot = {
  Strengths: ["Strong faculty base", "Modern labs"],
  Weaknesses: ["Limited hostel capacity"],
  Opportunities: ["AI/ML program demand", "Industry tie-ups"],
  Threats: ["Rising competition", "Changing regulations"],
};

export default function StrategicPlanning() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-2">
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>

        {/* 1. Key Performance Indicators */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
              >
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.label}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {kpi.value}{kpi.unit || ""}
                  </p>
                  <span className={`ml-2 text-sm font-medium ${
                    kpi.value >= kpi.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    Target: {kpi.target}{kpi.unit || ""}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Strategic Goals & Roadmap */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Strategic Goals & Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Goal Progress Tracker</h3>
              {goals.map(goal => (
                <div key={goal.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{goal.label}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Strategic Roadmap Timeline</h3>
              <div className="flex flex-col gap-2">
                {roadmap.map(item => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 w-40">{item.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                      <div className="h-2 rounded-full bg-green-500 absolute left-0" style={{ left: `${(parseInt(item.start)-2024)*25}%`, width: `${(parseInt(item.end)-parseInt(item.start)+1)*25}%` }}></div>
                    </div>
                    <span>{item.start}</span> - <span>{item.end}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Academic Planning Tools */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Academic Planning Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Curriculum Development Matrix</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left">
                    <th>Course</th><th>Status</th><th>Lead</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>BSc AI</td><td>Proposal</td><td>Dr. Chen</td></tr>
                  <tr><td>MBA FinTech</td><td>Review</td><td>Dr. Rao</td></tr>
                  <tr><td>BTech EEE</td><td>Ongoing</td><td>Dr. Singh</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Program Evaluation Cycle</h3>
              <ul className="text-xs list-disc ml-4">
                <li>BSc CS: Review in 2025</li>
                <li>MBA: Review in 2026</li>
                <li>BTech EEE: Review in 2027</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. SWOT Analysis */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">SWOT Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(swot).map(([category, items]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-2">{category}</h3>
                <ul className="text-xs space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trend Analysis */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Trend Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trends.map((trend, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-2">{trend.label}</h3>
                <div className="flex items-end gap-1 h-24">
                  {trend.values.map((value, j) => (
                    <div key={j} className="flex-1">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{
                          height: `${(value / Math.max(...trend.values)) * 100}%`,
                          minHeight: "4px"
                        }}
                      />
                      <div className="text-xs text-center mt-1">{j + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 