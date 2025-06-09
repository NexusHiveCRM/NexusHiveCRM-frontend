import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiUserCheck, FiAlertCircle, FiClock, FiMapPin, FiMail, FiPlus, FiChevronDown, FiChevronUp, FiCheckCircle, FiXCircle, FiZap, FiEdit2, FiTrash2, FiArrowRight, FiRepeat, FiDownload } from 'react-icons/fi';

// Mock data for appointments
const mockTypes = [
  { label: 'Student Interview', color: 'bg-blue-100 text-blue-700', icon: <FiUserCheck /> },
  { label: 'Parent Counseling', color: 'bg-green-100 text-green-700', icon: <FiUsers /> },
  { label: 'Agent Meeting', color: 'bg-purple-100 text-purple-700', icon: <FiMail /> },
  { label: 'High School Outreach', color: 'bg-pink-100 text-pink-700', icon: <FiMapPin /> },
  { label: 'Campus Visit', color: 'bg-yellow-100 text-yellow-700', icon: <FiMapPin /> },
  { label: 'Team Sync', color: 'bg-indigo-100 text-indigo-700', icon: <FiUsers /> },
  { label: 'Walk-In', color: 'bg-gray-100 text-gray-700', icon: <FiUserCheck /> },
];
const mockStaff = [
  { name: 'Priya Singh', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', color: 'bg-blue-200' },
  { name: 'Amit Patel', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', color: 'bg-green-200' },
  { name: 'Riya Mehra', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', color: 'bg-purple-200' },
  { name: 'Rahul Jain', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', color: 'bg-pink-200' },
];
const today = new Date();
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
const mockAppointments = [
  { id: 1, title: 'Interview: John Doe', type: 'Student Interview', staff: mockStaff[0], date: today, time: '10:00 AM', status: 'Confirmed', mode: 'Online', applicant: 'John Doe', color: 'bg-blue-100 text-blue-700' },
  { id: 2, title: 'Parent Counseling: Sara Khan', type: 'Parent Counseling', staff: mockStaff[1], date: addDays(today, 1), time: '2:00 PM', status: 'Pending', mode: 'Offline', applicant: 'Sara Khan', color: 'bg-green-100 text-green-700' },
  { id: 3, title: 'Agent Meeting: EduWorld', type: 'Agent Meeting', staff: mockStaff[2], date: addDays(today, 2), time: '4:00 PM', status: 'Confirmed', mode: 'Online', applicant: 'EduWorld', color: 'bg-purple-100 text-purple-700' },
  { id: 4, title: 'Outreach: St. Xavier School', type: 'High School Outreach', staff: mockStaff[3], date: addDays(today, 3), time: '11:00 AM', status: 'Confirmed', mode: 'Offline', applicant: 'St. Xavier School', color: 'bg-pink-100 text-pink-700' },
  { id: 5, title: 'Campus Visit: Aryan Sharma', type: 'Campus Visit', staff: mockStaff[0], date: addDays(today, 4), time: '9:00 AM', status: 'Pending', mode: 'Offline', applicant: 'Aryan Sharma', color: 'bg-yellow-100 text-yellow-700' },
  { id: 6, title: 'Team Sync', type: 'Team Sync', staff: mockStaff[1], date: addDays(today, 5), time: '3:00 PM', status: 'Confirmed', mode: 'Offline', applicant: '', color: 'bg-indigo-100 text-indigo-700' },
  { id: 7, title: 'Walk-In: Priya Verma', type: 'Walk-In', staff: mockStaff[2], date: addDays(today, 6), time: '1:00 PM', status: 'Pending', mode: 'Offline', applicant: 'Priya Verma', color: 'bg-gray-100 text-gray-700' },
];

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function isToday(date) {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}
function isThisWeek(date) {
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
  return date >= weekStart && date <= weekEnd;
}
function isThisMonth(date) {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

// AI Smart Suggestions Panel
function AISmartPanel({ appointments, staff }) {
  // Mock logic for best slot, no-show risk, load balancer
  const bestSlot = 'Tomorrow, 11:00 AM';
  const noShowRisk = appointments.filter(a => a.status === 'No-Show').length > 2 ? 'High' : 'Low';
  const overloaded = staff.find(s => appointments.filter(a => a.staff.name === s.name && isToday(a.date)).length > 3);
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <FiZap className="text-purple-500 animate-pulse" size={22} />
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">AI Smart Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
          <FiClock className="text-blue-500" />
          <span className="font-medium text-blue-800 dark:text-blue-200">Best Slot: {bestSlot}</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
          <FiAlertCircle className="text-yellow-500" />
          <span className="font-medium text-yellow-800 dark:text-yellow-200">No-Show Risk: {noShowRisk}</span>
        </div>
        {overloaded && (
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiUsers className="text-red-500" />
            <span className="font-medium text-red-800 dark:text-red-200">Load Balancer: {overloaded.name} is overbooked today!</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Analytics Widgets
function AnalyticsWidgets({ appointments, staff }) {
  // Bar chart: appointments by type this month
  const types = [...new Set(appointments.map(a => a.type))];
  const typeCounts = types.map(type => appointments.filter(a => a.type === type && isThisMonth(a.date)).length);
  // Pie chart: status breakdown
  const statuses = ['Confirmed', 'Pending', 'Rescheduled', 'Cancelled', 'No-Show', 'Attended'];
  const statusCounts = statuses.map(status => appointments.filter(a => a.status === status && isThisMonth(a.date)).length);
  // Leaderboard: staff with most appointments
  const staffCounts = staff.map(s => ({ ...s, count: appointments.filter(a => a.staff.name === s.name && isThisMonth(a.date)).length }));
  staffCounts.sort((a, b) => b.count - a.count);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Bar Chart */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center">
        <span className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Appointments by Type</span>
        <svg width="180" height="80">
          {typeCounts.map((count, i) => (
            <rect key={types[i]} x={20 + i * 25} y={70 - count * 10} width="18" height={count * 10} fill="#6366f1" rx="4" />
          ))}
          {typeCounts.map((count, i) => (
            <text key={types[i]} x={29 + i * 25} y={75} fontSize="8" textAnchor="middle" fill="#64748b">{types[i].split(' ')[0]}</text>
          ))}
        </svg>
      </div>
      {/* Pie Chart */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center">
        <span className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Status Breakdown</span>
        <svg width="80" height="80" viewBox="0 0 32 32">
          {(() => {
            let acc = 0;
            const total = statusCounts.reduce((a, b) => a + b, 0) || 1;
            const colors = ['#22c55e', '#facc15', '#6366f1', '#ef4444', '#f87171', '#0ea5e9'];
            return statusCounts.map((count, i) => {
              const val = (count / total) * 100;
              const r = 12;
              const circ = 2 * Math.PI * r;
              const len = circ * (val / 100);
              const dasharray = `${len} ${circ - len}`;
              const offset = circ * (1 - acc / 100);
              acc += val;
              return (
                <circle
                  key={statuses[i]}
                  r={r}
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke={colors[i % colors.length]}
                  strokeWidth="6"
                  strokeDasharray={dasharray}
                  strokeDashoffset={offset}
                />
              );
            });
          })()}
        </svg>
        <div className="flex flex-wrap gap-1 mt-2 justify-center">
          {statuses.map((s, i) => statusCounts[i] > 0 && (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#f3f4f6', color: '#334155' }}>{s}: {statusCounts[i]}</span>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center">
        <span className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Staff Leaderboard</span>
        <div className="flex flex-col gap-2 w-full">
          {staffCounts.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2 w-full">
              <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full border-2 border-blue-200" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200 flex-1">{s.name}</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Schedule() {
  // State for appointments, filters, modals, etc.
  const [appointments, setAppointments] = useState(() => {
    const ls = localStorage.getItem('appointments');
    return ls ? JSON.parse(ls).map(a => ({ ...a, date: new Date(a.date) })) : mockAppointments;
  });
  useEffect(() => { localStorage.setItem('appointments', JSON.stringify(appointments)); }, [appointments]);
  const [view, setView] = useState('month');
  const [filterType, setFilterType] = useState('');
  const [filterStaff, setFilterStaff] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Dashboard metrics
  const todayCount = appointments.filter(a => isToday(a.date)).length;
  const weekCount = appointments.filter(a => isThisWeek(a.date)).length;
  const monthCount = appointments.filter(a => isThisMonth(a.date)).length;
  const interviewCount = appointments.filter(a => a.type === 'Student Interview').length;
  const outreachCount = appointments.filter(a => a.type === 'High School Outreach').length;
  const noShowCount = appointments.filter(a => a.status === 'No-Show' && isThisMonth(a.date)).length;
  const alertCount = appointments.filter(a => a.status === 'Rescheduled' || a.status === 'No-Show').length;

  // Add appointment
  function handleAddAppointment(app) {
    setAppointments([...appointments, app]);
    setShowAddModal(false);
    setToast('Appointment added!');
  }
  // Reschedule
  function handleReschedule(app, newDate, newTime) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' } : a));
    setShowEventModal(false);
    setToast('Appointment rescheduled!');
  }
  // Assign staff
  function handleAssignStaff(app, staff) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, staff, status: 'Confirmed' } : a));
    setShowEventModal(false);
    setToast('Staff assigned!');
  }
  // Cancel
  function handleCancel(app) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'Cancelled' } : a));
    setShowEventModal(false);
    setToast('Appointment cancelled!');
  }
  // Mark as attended
  function handleAttend(app) {
    setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'Attended' } : a));
    setShowEventModal(false);
    setToast('Marked as attended!');
  }
  // Send reminder
  function handleReminder(app) {
    setToast('Reminder sent!');
  }

  // Calendar grid (month view, simple mock)
  function CalendarGrid() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const days = [];
    for (let d = 1; d <= end.getDate(); d++) {
      days.push(new Date(now.getFullYear(), now.getMonth(), d));
    }
    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day.toISOString()} className={`rounded-xl p-2 min-h-[80px] border ${isToday(day) ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80'} flex flex-col gap-1 relative`}>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{day.getDate()}</span>
            {appointments.filter(a => a.date.getDate() === day.getDate() && a.date.getMonth() === day.getMonth()).map(a => (
              <button key={a.id} className={`w-full text-xs rounded px-1 py-0.5 mt-1 truncate ${a.color} hover:scale-105 transition-transform`} onClick={() => { setSelectedEvent(a); setShowEventModal(true); }}>{a.title}</button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Schedule & Appointments</h1>
      {/* AI & Analytics widgets */}
      <AISmartPanel appointments={appointments} staff={mockStaff} />
      <AnalyticsWidgets appointments={appointments} staff={mockStaff} />
      {/* Dashboard widgets */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiClock className="text-blue-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">Upcoming Today</span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{todayCount}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiCalendar className="text-purple-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">This Week</span>
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">{weekCount}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiCalendar className="text-yellow-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">This Month</span>
          <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{monthCount}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiUserCheck className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">Interviews</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">{interviewCount}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiMapPin className="text-pink-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">Outreach</span>
          <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{outreachCount}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiXCircle className="text-red-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">No-Shows</span>
          <span className="text-2xl font-bold text-red-700 dark:text-red-300">{noShowCount}</span>
        </div>
      </div>
      {/* Appointment Types */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 mb-3">
          {mockTypes.map(type => (
            <button key={type.label} className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow ${type.color} hover:scale-105 transition-transform`} onClick={() => { setAddType(type.label); setShowAddModal(true); }}>
              {type.icon} {type.label} <FiPlus />
            </button>
          ))}
        </div>
      </div>
      {/* Calendar & Filters */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              {mockTypes.map(type => <option key={type.label}>{type.label}</option>)}
            </select>
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" value={filterStaff} onChange={e => setFilterStaff(e.target.value)}>
              <option value="">All Staff</option>
              {mockStaff.map(staff => <option key={staff.name}>{staff.name}</option>)}
            </select>
            <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Rescheduled</option>
              <option>Cancelled</option>
              <option>No-Show</option>
              <option>Attended</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${view === 'month' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setView('month')}>Month</button>
            <button className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${view === 'week' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setView('week')}>Week</button>
            <button className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${view === 'day' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`} onClick={() => setView('day')}>Day</button>
          </div>
        </div>
        {/* Calendar grid (month view only for now) */}
        <CalendarGrid />
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-w-[320px] max-w-[90vw] relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAddModal(false)}>&times;</button>
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Add {addType}</h2>
            <form onSubmit={e => { e.preventDefault(); handleAddAppointment({ id: Date.now(), title: `${addType}: ${e.target.applicant.value}`, type: addType, staff: mockStaff[0], date: new Date(e.target.date.value), time: e.target.time.value, status: 'Pending', mode: e.target.mode.value, applicant: e.target.applicant.value, color: mockTypes.find(t => t.label === addType)?.color || 'bg-blue-100 text-blue-700' }); }} className="flex flex-col gap-3">
              <input name="applicant" placeholder="Applicant/Org Name" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" required />
              <input name="date" type="date" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" required />
              <input name="time" type="time" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" required />
              <select name="mode" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
                <option>Online</option>
                <option>Offline</option>
              </select>
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Add Appointment</button>
            </form>
          </div>
        </div>
      )}
      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-w-[320px] max-w-[90vw] relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowEventModal(false)}>&times;</button>
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">{selectedEvent.title}</h2>
            <div className="mb-2 text-xs text-gray-500">{formatDate(selectedEvent.date)} at {selectedEvent.time} ({selectedEvent.mode})</div>
            <div className="mb-2 flex items-center gap-2"><FiUsers className="text-blue-400" /> <span className="text-xs">{selectedEvent.staff.name}</span></div>
            <div className="mb-2 flex items-center gap-2"><FiUserCheck className="text-green-400" /> <span className="text-xs">{selectedEvent.applicant}</span></div>
            <div className="mb-2 flex items-center gap-2"><span className={`px-2 py-0.5 rounded-full text-xs ${selectedEvent.color}`}>{selectedEvent.type}</span></div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold" onClick={() => handleReschedule(selectedEvent, addDays(selectedEvent.date, 1), selectedEvent.time)}><FiRepeat className="inline mr-1" />Reschedule</button>
              <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded font-semibold" onClick={() => handleAssignStaff(selectedEvent, mockStaff[1])}><FiUsers className="inline mr-1" />Assign Staff</button>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold" onClick={() => handleAttend(selectedEvent)}><FiCheckCircle className="inline mr-1" />Mark Attended</button>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold" onClick={() => handleReminder(selectedEvent)}><FiMail className="inline mr-1" />Send Reminder</button>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold" onClick={() => handleCancel(selectedEvent)}><FiXCircle className="inline mr-1" />Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 