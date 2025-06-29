import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiSearch, FiDownload, FiUpload, FiUsers, FiMessageSquare, 
  FiBarChart2, FiSettings, FiAlertCircle, FiZap, FiClock, FiTrendingUp,
  FiTrendingDown, FiUserCheck, FiUserX, FiPercent, FiTarget, FiGlobe,
  FiBook, FiMail, FiPhone, FiCalendar, FiDollarSign, FiFileText, FiCheckCircle
} from 'react-icons/fi';
import LeadPipeline from '../components/leads/LeadPipeline';
import LeadFilters from '../components/leads/LeadFilters';
import LeadProfile from '../components/leads/LeadProfile';
import TeamWorkload from '../components/leads/TeamWorkload';
import SourcePerformance from '../components/leads/SourcePerformance';
import BulkActions from '../components/leads/BulkActions';
import ApplicationManager from '../components/leads/ApplicationManager';
import CommunicationTriggers from '../components/leads/CommunicationTriggers';
import DropoffInsights from '../components/leads/DropoffInsights';
import AIInsights from '../components/leads/AIInsights';

// Demo data - Replace with actual API calls
const demoLeads = [
  {
    id: 1,
    name: "John Smith",
    program: "Computer Science",
    source: "Website",
    status: "Inquiry",
    assignedTo: "Sarah Johnson",
    conversionScore: "High",
    lastContact: "2024-03-15",
    documents: ["ID Proof", "Academic Records"],
    tags: ["Scholarship", "International"],
    contact: {
      email: "john.smith@email.com",
      phone: "+1 234-567-8900",
      country: "USA"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-15", notes: "Initial inquiry via website" },
      { type: "Contacted", date: "2024-03-16", notes: "Sent program brochure" }
    ],
    engagement: {
      score: 85,
      lastActivity: "2024-03-16",
      interactions: 3,
      predictedConversion: "High"
    },
    application: {
      id: "APP-001",
      status: "Not Started",
      documents: [],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 2,
    name: "Jane Doe",
    program: "Business Administration",
    source: "Referral",
    status: "Inquiry",
    assignedTo: "Michael Chen",
    conversionScore: "Medium",
    lastContact: "2024-03-14",
    documents: ["ID Proof"],
    tags: ["International"],
    contact: {
      email: "jane.doe@email.com",
      phone: "+1 234-567-8901",
      country: "Canada"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-10", notes: "Referred by alumni" },
      { type: "Contacted", date: "2024-03-14", notes: "Called for more info" }
    ],
    engagement: {
      score: 70,
      lastActivity: "2024-03-14",
      interactions: 2,
      predictedConversion: "Medium"
    },
    application: {
      id: "APP-002",
      status: "Not Started",
      documents: [],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 3,
    name: "Carlos Martinez",
    program: "Engineering",
    source: "Education Fair",
    status: "Contacted",
    assignedTo: "Sarah Johnson",
    conversionScore: "Low",
    lastContact: "2024-03-12",
    documents: [],
    tags: ["Scholarship"],
    contact: {
      email: "carlos.martinez@email.com",
      phone: "+1 234-567-8902",
      country: "Saudi Arabia"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-09", notes: "Met at education fair" },
      { type: "Contacted", date: "2024-03-12", notes: "Started application online" }
    ],
    engagement: {
      score: 55,
      lastActivity: "2024-03-12",
      interactions: 1,
      predictedConversion: "Low"
    },
    application: {
      id: "APP-003",
      status: "Started",
      documents: [],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 4,
    name: "Emily Davis",
    program: "Arts & Humanities",
    source: "Website",
    status: "Contacted",
    assignedTo: "Michael Chen",
    conversionScore: "High",
    lastContact: "2024-03-13",
    documents: ["ID Proof", "Portfolio"],
    tags: ["Transfer"],
    contact: {
      email: "emily.davis@email.com",
      phone: "+1 234-567-8903",
      country: "UK"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-11", notes: "Website form" },
      { type: "Contacted", date: "2024-03-13", notes: "Uploaded all documents" }
    ],
    engagement: {
      score: 90,
      lastActivity: "2024-03-13",
      interactions: 4,
      predictedConversion: "High"
    },
    application: {
      id: "APP-004",
      status: "Documents Submitted",
      documents: ["ID Proof", "Portfolio"],
      paymentStatus: "Paid",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 5,
    name: "David Lee",
    program: "Medical Sciences",
    source: "Agent",
    status: "Application Started",
    assignedTo: "Sarah Johnson",
    conversionScore: "Medium",
    lastContact: "2024-03-10",
    documents: ["ID Proof", "Medical Certificate"],
    tags: ["International"],
    contact: {
      email: "david.lee@email.com",
      phone: "+1 234-567-8904",
      country: "Singapore"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-08", notes: "Agent submission" },
      { type: "Application Started", date: "2024-03-10", notes: "All documents verified" }
    ],
    engagement: {
      score: 75,
      lastActivity: "2024-03-10",
      interactions: 2,
      predictedConversion: "Medium"
    },
    application: {
      id: "APP-005",
      status: "Started",
      documents: ["ID Proof", "Medical Certificate"],
      paymentStatus: "Paid",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 6,
    name: "Sophia Kim",
    program: "Law",
    source: "Social Media",
    status: "Application Started",
    assignedTo: "Michael Chen",
    conversionScore: "High",
    lastContact: "2024-03-09",
    documents: ["ID Proof", "Recommendation Letter"],
    tags: ["Scholarship"],
    contact: {
      email: "sophia.kim@email.com",
      phone: "+1 234-567-8905",
      country: "South Korea"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-07", notes: "Social media ad" },
      { type: "Application Started", date: "2024-03-09", notes: "Sent offer letter" }
    ],
    engagement: {
      score: 88,
      lastActivity: "2024-03-09",
      interactions: 3,
      predictedConversion: "High"
    },
    application: {
      id: "APP-006",
      status: "Started",
      documents: ["ID Proof", "Recommendation Letter"],
      paymentStatus: "Paid",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 7,
    name: "Liam Patel",
    program: "Design",
    source: "Walk-in",
    status: "Documents Submitted",
    assignedTo: "Sarah Johnson",
    conversionScore: "High",
    lastContact: "2024-03-08",
    documents: ["ID Proof", "Portfolio"],
    tags: ["Transfer"],
    contact: {
      email: "liam.patel@email.com",
      phone: "+1 234-567-8906",
      country: "Saudi Arabia"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-06", notes: "Walk-in inquiry" },
      { type: "Documents Submitted", date: "2024-03-08", notes: "Confirmed admission" }
    ],
    engagement: {
      score: 95,
      lastActivity: "2024-03-08",
      interactions: 5,
      predictedConversion: "High"
    },
    application: {
      id: "APP-007",
      status: "Documents Submitted",
      documents: ["ID Proof", "Portfolio"],
      paymentStatus: "Paid",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 8,
    name: "Olivia Brown",
    program: "Engineering",
    source: "Website",
    status: "Verified",
    assignedTo: "Michael Chen",
    conversionScore: "Low",
    lastContact: "2024-03-07",
    documents: [],
    tags: ["International"],
    contact: {
      email: "olivia.brown@email.com",
      phone: "+1 234-567-8907",
      country: "Australia"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-05", notes: "Website inquiry" },
      { type: "Verified", date: "2024-03-07", notes: "Withdrew application" }
    ],
    engagement: {
      score: 40,
      lastActivity: "2024-03-07",
      interactions: 1,
      predictedConversion: "Low"
    },
    application: {
      id: "APP-008",
      status: "Verified",
      documents: [],
      paymentStatus: "Refunded",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 9,
    name: "Noah Wilson",
    program: "Business Administration",
    source: "Referral",
    status: "Offer Sent",
    assignedTo: "Sarah Johnson",
    conversionScore: "Medium",
    lastContact: "2024-03-06",
    documents: ["ID Proof"],
    tags: ["Scholarship"],
    contact: {
      email: "noah.wilson@email.com",
      phone: "+1 234-567-8908",
      country: "USA"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-04", notes: "Referred by friend" },
      { type: "Offer Sent", date: "2024-03-06", notes: "Sent offer letter" }
    ],
    engagement: {
      score: 65,
      lastActivity: "2024-03-06",
      interactions: 2,
      predictedConversion: "Medium"
    },
    application: {
      id: "APP-009",
      status: "Offer Sent",
      documents: ["ID Proof"],
      paymentStatus: "Pending",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 10,
    name: "Ava Garcia",
    program: "Medical Sciences",
    source: "Agent",
    status: "Confirmed",
    assignedTo: "Michael Chen",
    conversionScore: "High",
    lastContact: "2024-03-05",
    documents: ["ID Proof", "Medical Certificate"],
    tags: ["International"],
    contact: {
      email: "ava.garcia@email.com",
      phone: "+1 234-567-8909",
      country: "Spain"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-03", notes: "Agent submission" },
      { type: "Confirmed", date: "2024-03-05", notes: "Confirmed admission" }
    ],
    engagement: {
      score: 92,
      lastActivity: "2024-03-05",
      interactions: 4,
      predictedConversion: "High"
    },
    application: {
      id: "APP-010",
      status: "Confirmed",
      documents: ["ID Proof", "Medical Certificate"],
      paymentStatus: "Paid",
      testScore: null,
      interviewScheduled: null
    }
  },
  {
    id: 11,
    name: "Mia Chen",
    program: "Law",
    source: "Social Media",
    status: "Withdrawn",
    assignedTo: "Sarah Johnson",
    conversionScore: "Low",
    lastContact: "2024-03-04",
    documents: [],
    tags: ["Transfer"],
    contact: {
      email: "mia.chen@email.com",
      phone: "+1 234-567-8910",
      country: "China"
    },
    timeline: [
      { type: "Inquiry", date: "2024-03-02", notes: "Social media ad" },
      { type: "Withdrawn", date: "2024-03-04", notes: "Withdrew application" }
    ],
    engagement: {
      score: 30,
      lastActivity: "2024-03-04",
      interactions: 1,
      predictedConversion: "Low"
    },
    application: {
      id: "APP-011",
      status: "Withdrawn",
      documents: [],
      paymentStatus: "Refunded",
      testScore: null,
      interviewScheduled: null
    }
  }
];

const tabs = [
  { id: 'pipeline', label: 'Pipeline View', icon: FiBarChart2 },
  { id: 'applications', label: 'Applications', icon: FiFileText },
  { id: 'team', label: 'Team Workload', icon: FiUsers },
  { id: 'sources', label: 'Source Performance', icon: FiTrendingUp },
  { id: 'insights', label: 'AI Insights', icon: FiZap }
];

export default function LeadsManagement() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // AI Insights Data
  const [aiInsights, setAIInsights] = useState({
    conversionPredictions: [],
    dropoffRisks: [],
    workloadSuggestions: [],
    engagementRecommendations: []
  });

  useEffect(() => {
    // Simulate fetching AI insights
    // Replace with actual API call
    setAIInsights({
      conversionPredictions: [
        { leadId: 1, name: "John Smith", probability: 0.85, factors: ["High engagement", "Complete profile"] },
        // Add more predictions...
      ],
      dropoffRisks: [
        { leadId: 2, name: "Jane Doe", risk: "High", reason: "No response for 7 days" },
        // Add more risks...
      ],
      workloadSuggestions: [
        { officer: "Sarah Johnson", suggestion: "Reassign 5 inactive leads", reason: "Current workload high" },
        // Add more suggestions...
      ],
      engagementRecommendations: [
        { leadId: 1, action: "Send personalized email", timing: "Best time: 2 PM", channel: "Email" },
        // Add more recommendations...
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads & Applicants</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and track all leads through the admission pipeline
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIInsights(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                <FiZap className="mr-2" />
                AI Insights
              </button>
              <button
                onClick={() => setShowBulkActions(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiUpload className="mr-2" />
                Bulk Actions
              </button>
              <button
                onClick={() => setShowCommunicationModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <FiMessageSquare className="mr-2" />
                Communication
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-10">
        {/* Tabs */}
        <div className="mb-10 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search leads by name, program, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <LeadFilters />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="text-base">
          <AnimatePresence mode="wait">
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LeadPipeline 
                  leads={demoLeads} 
                  onLeadSelect={setSelectedLead}
                  onBulkSelect={setSelectedLeads}
                />
              </motion.div>
            )}
            {activeTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ApplicationManager leads={demoLeads} />
              </motion.div>
            )}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TeamWorkload leads={demoLeads} />
              </motion.div>
            )}
            {activeTab === 'sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SourcePerformance leads={demoLeads} />
              </motion.div>
            )}
            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AIInsights insights={aiInsights} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lead Profile Modal */}
          <AnimatePresence>
            {selectedLead && (
              <motion.div
                key="lead-profile-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
              >
                <div className="absolute inset-0" onClick={() => setSelectedLead(null)} />
                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-0">
                  <LeadProfile 
                    lead={selectedLead} 
                    onClose={() => setSelectedLead(null)}
                    onUpdate={(updatedLead) => {
                      // Handle lead update
                      setSelectedLead(updatedLead);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showAIInsights && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>
                <AIInsights 
                  insights={aiInsights} 
                  onClose={() => setShowAIInsights(false)}
                  isModal={true}
                />
              </div>
            </motion.div>
          )}

          {showCommunicationModal && (
            <CommunicationTriggers
              leads={selectedLeads.length > 0 ? selectedLeads : [selectedLead]}
              onClose={() => setShowCommunicationModal(false)}
            />
          )}

          {showBulkActions && (
            <BulkActions
              selectedLeads={selectedLeads}
              onClose={() => setShowBulkActions(false)}
              onActionComplete={() => {
                setShowBulkActions(false);
                setSelectedLeads([]);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 