import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
  DocumentArrowDownIcon
} from "@heroicons/react/24/outline";

// Import child components
import RegulatoryDashboard from './RegulatoryDashboard';
import DocumentCompliance from './DocumentCompliance';
import AuditTrail from './AuditTrail';
import InternalQualityAssessment from './InternalQualityAssessment';
import PolicyCompliance from './PolicyCompliance';
import FeedbackImprovement from './FeedbackImprovement';
import RiskManagement from './RiskManagement';
import NonComplianceAlerts from './NonComplianceAlerts';
import ReportsSubmissions from "./ReportsSubmissions";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  {
    name: 'Regulatory Dashboard',
    icon: ClipboardDocumentCheckIcon,
    component: RegulatoryDashboard,
    description: 'Compliance metrics and alerts'
  },
  {
    name: 'Document Compliance',
    icon: DocumentTextIcon,
    component: DocumentCompliance,
    description: 'Document verification and tracking'
  },
  {
    name: 'Audit Trail',
    icon: ClipboardDocumentListIcon,
    component: AuditTrail,
    description: 'Action logs and accountability'
  },
  {
    name: 'Quality Assessment',
    icon: ChartBarIcon,
    component: InternalQualityAssessment,
    description: 'Internal quality indicators'
  },
  {
    name: 'Policy Compliance',
    icon: DocumentMagnifyingGlassIcon,
    component: PolicyCompliance,
    description: 'Policy repository and validation'
  },
  {
    name: 'Feedback & Improvement',
    icon: ChatBubbleLeftRightIcon,
    component: FeedbackImprovement,
    description: 'Feedback analysis and improvements'
  },
  {
    name: 'Risk Management',
    icon: ExclamationTriangleIcon,
    component: RiskManagement,
    description: 'Risk identification and mitigation'
  },
  {
    name: 'Non-Compliance Alerts',
    icon: BellAlertIcon,
    component: NonComplianceAlerts,
    description: 'Alert management and case handling'
  },
  {
    name: 'Reports',
    icon: DocumentArrowDownIcon,
    component: ReportsSubmissions,
    description: 'Compliance reports and submissions'
  }
];

const ComplianceQuality = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Compliance & Quality
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ensure compliance with institutional standards and maintain high-quality processes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 p-4">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                      selected
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    )
                  }
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-4">
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="focus:outline-none"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tab.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tab.description}
                    </p>
                  </div>
                  <tab.component />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ComplianceQuality; 