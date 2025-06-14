import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import { adminHeadFeatures } from '../components/adminHeadFeatures';

export default function AdminHeadLayout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar features={adminHeadFeatures} userLabel="Admin Head" />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
} 