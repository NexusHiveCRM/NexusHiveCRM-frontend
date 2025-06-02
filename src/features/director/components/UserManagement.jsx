import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import { directorFeatures } from '../../../components/directorFeatures';

const users = [
  { id: 1, name: "John Doe", role: "Dean", department: "Science", status: "Active", email: "john.doe@univ.edu" },
  { id: 2, name: "Jane Smith", role: "HoD", department: "EEE", status: "Active", email: "jane.smith@univ.edu" },
  { id: 3, name: "Mike Johnson", role: "Faculty", department: "Math", status: "Inactive", email: "mike.johnson@univ.edu" },
];
const roles = ["Director", "Dean", "HoD", "Faculty", "Student", "Admin"];

// Demo data for user metrics
const userMetrics = [
  {
    id: 1,
    title: 'Total Users',
    value: '245',
    change: '+12',
    trend: 'up'
  },
  {
    id: 2,
    title: 'Active Users',
    value: '230',
    change: '+8',
    trend: 'up'
  },
  {
    id: 3,
    title: 'New Users',
    value: '15',
    change: '+5',
    trend: 'up'
  },
  {
    id: 4,
    title: 'Avg. Activity',
    value: '85%',
    change: '+2%',
    trend: 'up'
  }
];

export default function UserManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Manage users, roles, and access permissions.</p>
        </div>

        {/* User Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: metric.id * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                <span className={`ml-2 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Filters */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Roles</option>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Search by name or email..." />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add User</button>
          </div>
        </section>

        {/* User List */}
        <section>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left">
                  <th>Name</th><th>Role</th><th>Department</th><th>Status</th><th>Email</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => (!roleFilter || u.role === roleFilter) && (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))).map((u, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                    <td>{u.name}</td><td>{u.role}</td><td>{u.department}</td>
                    <td><span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}>{u.status}</span></td>
                    <td>{u.email}</td>
                    <td><button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Edit</button></td>
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