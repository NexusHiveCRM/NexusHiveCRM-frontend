import React from 'react';

export default function LeadsManagement() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">Leads Management</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Upload Single Lead</button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Bulk Lead Upload</button>
      </div>
      <p className="text-lg text-gray-500 dark:text-gray-400">Content coming soon!</p>
    </div>
  );
} 