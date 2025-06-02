import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const features = [
  { label: 'Dashboard', icon: '🏠', route: '/rbac/admission-head', description: 'Overview, metrics, and new lead details' },
  { label: 'Leads / Applicants', icon: '👥', route: '/rbac/admission-head/leads', description: 'All leads, confirmed, follow-ups, assigned to me' },
  { label: 'Applications', icon: '📝', route: '/rbac/admission-head/applications', description: 'In progress, under review, interview scheduled, approved/rejected, confirmed' },
  { label: 'Schedule / Appointments', icon: '📅', route: '/rbac/admission-head/schedule', description: 'Calendar, interview/test/callback booking' },
  { label: 'Communication / Logs', icon: '💬', route: '/rbac/admission-head/communication', description: 'Message center, templates, communication history' },
  { label: 'Payments', icon: '💳', route: '/rbac/admission-head/payments', description: 'Fee status, payment links, reminders' },
  { label: 'Documents', icon: '📄', route: '/rbac/admission-head/documents', description: 'Uploaded docs, checklist, download/preview' },
  { label: 'Search / Filters', icon: '🔍', route: '/rbac/admission-head/search', description: 'Powerful lead/applicant search' },
  { label: 'Tools / Utilities', icon: '🛠️', route: '/rbac/admission-head/tools', description: 'Bulk import/export, forms, reports' },
  { label: 'Lead Transfer', icon: '🔄', route: '/rbac/admission-head/lead-transfer', description: 'Reassign leads between team members' },
  { label: 'Course Management', icon: '📚', route: '/rbac/admission-head/courses', description: 'View courses and eligibility' },
  { label: 'Training & Development', icon: '🎓', route: '/rbac/admission-head/training', description: 'Team training, knowledge management' },
  { label: 'Compliance & Quality', icon: '✅', route: '/rbac/admission-head/compliance', description: 'Quality assurance, risk management' },
  { label: 'Account Management', icon: '👤', route: '/rbac/admission-head/account', description: 'Profile, HR, referral, tasks, events, attendance, recruitment, helpdesk' },
  { label: 'Tickets', icon: '🎫', route: '/rbac/admission-head/tickets', description: 'My tickets, raise a ticket' },
];

export default function AdmissionHeadLayout() {
  return (
    <div className="flex h-screen bg-[#F6F7FA] dark:from-gray-900 dark:to-gray-800">
      <Sidebar features={features} userLabel="Admission Head" />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 