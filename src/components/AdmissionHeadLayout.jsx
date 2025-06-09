import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { admissionHeadFeatures } from '../features/admission-head/components/admissionHeadFeatures';

export default function AdmissionHeadLayout() {
  return (
    <div className="flex h-screen bg-[#F6F7FA] dark:from-gray-900 dark:to-gray-800">
      <Sidebar features={admissionHeadFeatures} userLabel="Admission Head" />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 