import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';

const meetings = [
  { id: 1, date: "2024-03-15", time: "10:00", title: "Board Meeting", participants: ["Director", "Deans", "HoDs"], status: "Scheduled", agenda: "Review Q1 performance" },
  { id: 2, date: "2024-03-17", time: "14:00", title: "Research Committee", participants: ["Director", "Dean Science", "HoD EEE"], status: "Scheduled", agenda: "Approve new research proposals" },
  { id: 3, date: "2024-03-20", time: "09:30", title: "Student Council", participants: ["Director", "Student Reps"], status: "Completed", agenda: "Discuss student feedback" },
];
const calendarEvents = [
  { date: "2024-03-15", label: "Board Meeting" },
  { date: "2024-03-17", label: "Research Committee" },
  { date: "2024-03-20", label: "Student Council" },
  { date: "2024-03-22", label: "NAAC Audit" },
];

export default function MeetingsCalendar() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Meetings & Calendar</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">View, schedule, and manage meetings and important events.</p>
        </div>

        {/* Meetings List */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upcoming Meetings</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>Date</th><th>Time</th><th>Title</th><th>Participants</th><th>Status</th><th>Agenda</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{m.date}</td><td>{m.time}</td><td>{m.title}</td><td>{m.participants.join(", ")}</td>
                    <td><span className={`px-2 py-1 rounded-full text-xs font-medium ${m.status === "Scheduled" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}`}>{m.status}</span></td>
                    <td>{m.agenda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calendar */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Calendar</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Event</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>Date</th><th>Event</th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents.filter(e => !selectedDate || e.date === selectedDate).map((ev, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{ev.date}</td><td>{ev.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
} 