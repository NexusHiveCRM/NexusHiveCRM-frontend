import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';

const features = [
  // Dashboard
  { 
    label: 'Dashboard', 
    icon: '📊', 
    route: '/rbac/marketing-head',
    description: 'Campaign performance, team metrics, and lead analytics'
  },
  
  // Team Management
  { 
    label: 'Manage Team', 
    icon: '👥', 
    route: '/rbac/marketing-head/team',
    description: 'Team assignments and lead distribution'
  },
  
  // Leads Management
  { 
    label: 'Leads', 
    icon: '🎯', 
    route: '/rbac/marketing-head/leads',
    description: 'Lead tracking and management'
  },
  
  // Campaign Management
  { 
    label: 'Campaign', 
    icon: '📢', 
    route: '/rbac/marketing-head/campaigns',
    description: 'Campaign planning and ROI tracking'
  },
  
  // Resource Management
  { 
    label: 'Resource Management', 
    icon: '📈', 
    route: '/rbac/marketing-head/resources',
    description: 'Expense tracking and resource optimization'
  },
  
  // Reporting & Analytics
  { 
    label: 'Reporting & Analytics', 
    icon: '📑', 
    route: '/rbac/marketing-head/analytics',
    description: 'Custom reports and predictive analytics'
  },
  
  // Communication Hub
  { 
    label: 'Communication Hub', 
    icon: '💬', 
    route: '/rbac/marketing-head/communication',
    description: 'Team communication and updates'
  },
  
  // Training & Development
  { 
    label: 'Training & Development', 
    icon: '🎓', 
    route: '/rbac/marketing-head/training',
    description: 'Team training and knowledge base'
  },
  
  // Compliance & Quality
  { 
    label: 'Compliance & Quality', 
    icon: '✅', 
    route: '/rbac/marketing-head/compliance',
    description: 'Quality assurance and risk management'
  },
  
  // Account Management
  { 
    label: 'Account Management', 
    icon: '👤', 
    route: '/rbac/marketing-head/account',
    description: 'Profile and HR management'
  },
  
  // Tickets
  { 
    label: 'Tickets', 
    icon: '🎫', 
    route: '/rbac/marketing-head/tickets',
    description: 'Support ticket management'
  }
];

export default function MarketingHeadLayout() {
  return (
    <div className="flex h-screen bg-[#F6F7FA] dark:from-gray-900 dark:to-gray-800">
      <Sidebar features={features} userLabel="Marketing Head" />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 