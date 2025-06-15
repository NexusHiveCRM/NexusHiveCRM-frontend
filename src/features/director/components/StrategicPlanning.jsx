import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// Enhanced Academic Planning Tools data
const curriculumMatrix = [
  { course: "BSc AI", status: "Proposal", lead: "Dr. Chen", start: "2024-06", end: "2025-05" },
  { course: "MBA FinTech", status: "Review", lead: "Dr. Rao", start: "2023-09", end: "2024-08" },
  { course: "BTech EEE", status: "Ongoing", lead: "Dr. Singh", start: "2022-07", end: "2025-06" },
  { course: "MSc Data Sci", status: "Proposal", lead: "Dr. Patel", start: "2024-01", end: "2025-12" },
  { course: "BBA Marketing", status: "Accredited", lead: "Dr. Mehra", start: "2021-08", end: "2024-07" },
];
const programEvaluation = [
  { program: "BSc CS", next: "2025", last: "2020" },
  { program: "MBA", next: "2026", last: "2021" },
  { program: "BTech EEE", next: "2027", last: "2022" },
  { program: "MSc Data Sci", next: "2028", last: "New" },
  { program: "BBA Marketing", next: "2024", last: "2019" },
];

// Enhanced SWOT
const swot = {
  Strengths: [
    "Strong faculty base",
    "Modern labs",
    "High research output",
    "International partnerships"
  ],
  Weaknesses: [
    "Limited hostel capacity",
    "Outdated library resources",
    "Low alumni engagement"
  ],
  Opportunities: [
    "AI/ML program demand",
    "Industry tie-ups",
    "Government grants",
    "Online course expansion"
  ],
  Threats: [
    "Rising competition",
    "Changing regulations",
    "Declining enrollment in some programs",
    "Economic downturn"
  ],
};

// Enhanced Trend Analysis
const trends = [
  { label: "Enrollment", values: [1200, 1300, 1400, 1550, 1700], years: ["2020","2021","2022","2023","2024"] },
  { label: "Placements", values: [800, 900, 950, 1100, 1200], years: ["2020","2021","2022","2023","2024"] },
  { label: "Research Funding ($K)", values: [200, 250, 300, 350, 400], years: ["2020","2021","2022","2023","2024"] },
  { label: "Faculty Publications", values: [50, 60, 70, 85, 90], years: ["2020","2021","2022","2023","2024"] },
  { label: "International Collaborations", values: [2, 3, 4, 6, 8], years: ["2020","2021","2022","2023","2024"] },
];

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
                    <th>Course</th><th>Status</th><th>Lead</th><th>Start Date</th><th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {curriculumMatrix.map((row, i) => (
                    <tr key={i}>
                      <td>{row.course}</td>
                      <td>{row.status}</td>
                      <td>{row.lead}</td>
                      <td>{row.start}</td>
                      <td>{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Program Evaluation Cycle</h3>
              <ul className="text-xs list-disc ml-4">
                {programEvaluation.map((prog, i) => (
                  <li key={i}>{prog.program}: Review in {prog.next} (Last: {prog.last})</li>
                ))}
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
            {trends.map((trend, i) => {
              const data = trend.values.map((value, idx) => ({
                year: trend.years[idx],
                value,
              }));
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                  <h3 className="font-semibold mb-2">{trend.label}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
} 