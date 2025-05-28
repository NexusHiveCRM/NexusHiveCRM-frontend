import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { directorFeatures } from './directorFeatures';

const workspaceSections = [
  {
    icon: "🎓",
    title: "Training & Development",
    summary: [
      "Team Training – Enroll in skill enhancement sessions",
      "Knowledge Management – Access learning materials and SOPs"
    ],
    details: [
      { label: "Active Trainings", value: "3" },
      { label: "Certifications", value: "2 pending" },
      { label: "Knowledge Base", value: "50+ articles" }
    ],
    subSections: {
      "Team Training": {
        description: "Centralized platform for skill enhancement",
        features: [
          "Progress tracking and certifications",
          "Feedback and assessment system",
          "Custom learning paths"
        ],
        examples: [
          "Leadership Development Series for department heads",
          "Onboarding Training for new HR staff",
          "Digital Teaching Tools for faculty"
        ]
      },
      "Knowledge Management": {
        description: "Structured repository of learning materials",
        features: [
          "Video modules and internal wikis",
          "Policy documents and best practices",
          "Department-level knowledge articles"
        ],
        examples: [
          "How to publish research papers (faculty)",
          "Handling international student onboarding (admin)",
          "Department-level knowledge articles"
        ]
      }
    }
  },
  {
    icon: "✅",
    title: "Compliance & Quality",
    summary: [
      "Quality Assurance – Monitor QA initiatives",
      "Risk Management – Track institutional risks"
    ],
    details: [
      { label: "QA Initiatives", value: "5 active" },
      { label: "Open Risks", value: "3" },
      { label: "Compliance Score", value: "92%" }
    ],
    subSections: {
      "Quality Assurance": {
        description: "Tools for auditing departmental activities",
        features: [
          "Self-evaluation forms",
          "Review matrices",
          "Performance benchmarks"
        ],
        examples: [
          "Semester-end Department Quality Self-Assessment",
          "Course Content Coverage Analysis",
          "NAAC/NBA compliance document uploads"
        ]
      },
      "Risk Management": {
        description: "Risk identification and tracking system",
        features: [
          "Risk scorecards",
          "Mitigation plans",
          "Alert systems"
        ],
        examples: [
          "Delayed exam result publication risk",
          "Underperformance in placement targets",
          "Increased dropout trend monitoring"
        ]
      }
    }
  },
  // --- Individual Account Management Cards ---
  {
    icon: "👤",
    title: "My Profile",
    summary: ["View/edit personal data, upload documents, manage credentials"],
    details: [
      { label: "Profile Updated", value: "Mar 2024" },
      { label: "Docs Uploaded", value: "3" }
    ],
    subSections: {
      "My Profile": {
        description: "Personal and professional information management",
        features: [
          "View/edit personal data",
          "Document upload system",
          "Credential management"
        ],
        examples: [
          "Update research credentials",
          "Upload address proof for HR",
          "Manage professional certifications"
        ]
      }
    }
  },
  {
    icon: "💼",
    title: "HR Board",
    summary: ["Payslips, leave management, performance tracking"],
    details: [
      { label: "Payslips", value: "12 available" },
      { label: "Leave Balance", value: "12 days" }
    ],
    subSections: {
      "HR Board": {
        description: "Personalized HR dashboard",
        features: [
          "Payslip access",
          "Leave management",
          "Performance tracking"
        ],
        examples: [
          "Monthly Salary Slip Download",
          "Leave Balance Tracker",
          "Performance Review Forms"
        ]
      }
    }
  },
  {
    icon: "🔗",
    title: "My Referral",
    summary: ["Submit and track referrals for job openings"],
    details: [
      { label: "Active Referrals", value: "1" },
      { label: "Shortlisted", value: "0" }
    ],
    subSections: {
      "My Referral": {
        description: "Submit and track job referrals",
        features: [
          "Referral submission",
          "Status tracking",
          "Candidate management"
        ],
        examples: [
          "Referral for Assistant Professor in Computer Science",
          "Track referral status: Under Review / Shortlisted"
        ]
      }
    }
  },
  {
    icon: "🗃️",
    title: "Task Box",
    summary: ["Daily, weekly, and monthly assigned tasks"],
    details: [
      { label: "Open Tasks", value: "4" },
      { label: "Completed", value: "12" }
    ],
    subSections: {
      "Task Box": {
        description: "Task management and tracking",
        features: [
          "Daily/weekly/monthly tasks",
          "Status updates",
          "Notification system"
        ],
        examples: [
          "Submit departmental budget proposal",
          "Conduct internal audit",
          "Approve student applications"
        ]
      }
    }
  },
  {
    icon: "🎉",
    title: "Events",
    summary: ["Register or view official events, download certificates, sync calendar"],
    details: [
      { label: "Upcoming Events", value: "2" },
      { label: "Certificates", value: "1 available" }
    ],
    subSections: {
      "Events": {
        description: "Academic and cultural event management",
        features: [
          "Event registration",
          "Certificate download",
          "Calendar sync"
        ],
        examples: [
          "Annual Tech Symposium – Registration Open",
          "Internal FDP Schedule"
        ]
      }
    }
  },
  {
    icon: "🕒",
    title: "Attendance",
    summary: ["Track attendance, view history, request correction"],
    details: [
      { label: "Present (month)", value: "16 days" },
      { label: "Leave", value: "2 days" }
    ],
    subSections: {
      "Attendance": {
        description: "Attendance tracking and correction requests",
        features: [
          "Biometric/manual sync",
          "History view",
          "Correction requests"
        ],
        examples: [
          "Present: 16 days, Leave: 2 days, Absent: 1 day",
          "Submit attendance correction for 14th March"
        ]
      }
    }
  },
  {
    icon: "🧑‍💼",
    title: "Recruitment",
    summary: ["View internal job openings, submit transfer requests, promote referrals"],
    details: [
      { label: "Openings", value: "2" },
      { label: "Transfers", value: "0" }
    ],
    subSections: {
      "Recruitment": {
        description: "Internal job openings and mobility",
        features: [
          "View openings",
          "Submit transfer requests",
          "Promote referrals"
        ],
        examples: [
          "Internal Opening: Dean - School of Management",
          "Submit SOP for role upgrade"
        ]
      }
    }
  },
  {
    icon: "📍",
    title: "Geo-Fencing",
    summary: ["Location-based attendance validation, real-time check-ins"],
    details: [
      { label: "Last Check-in", value: "Main Campus @ 9:02 AM" },
      { label: "Alerts", value: "0" }
    ],
    subSections: {
      "Geo-Fencing": {
        description: "Location-based attendance and movement logs",
        features: [
          "Real-time check-ins",
          "Movement logs",
          "Out-of-zone alerts"
        ],
        examples: [
          "Checked in from Main Campus @ 9:02 AM",
          "Alert: Out-of-zone attendance attempt"
        ]
      }
    }
  },
  // --- End Individual Account Management Cards ---
  {
    icon: "🎟️",
    title: "Support Tickets",
    summary: [
      "My Tickets – Track raised issues",
      "Raise a Ticket – Submit new requests"
    ],
    details: [
      { label: "Open Tickets", value: "2" },
      { label: "Resolved (MTD)", value: "8" },
      { label: "Avg. Response", value: "2h" }
    ],
    subSections: {
      "My Tickets": {
        description: "Track and manage support requests",
        features: [
          "Status tracking",
          "Response history",
          "Resolution timeline"
        ],
        examples: [
          "IT Support Request",
          "Facility Maintenance",
          "System Access Issues"
        ]
      },
      "Raise a Ticket": {
        description: "Submit new support requests",
        features: [
          "Category selection",
          "Priority setting",
          "Attachment support"
        ],
        examples: [
          "Report system bug",
          "Request access to new module",
          "Submit maintenance request"
        ]
      }
    }
  },
  {
    icon: "📖",
    title: "Help / Documentation",
    summary: [
      "User Guides, Policy Documents",
      "FAQs, Video Tutorials"
    ],
    details: [
      { label: "User Guides", value: "12" },
      { label: "Policies", value: "25" },
      { label: "Tutorials", value: "15" }
    ],
    subSections: {
      "User Guides": {
        description: "Comprehensive system documentation",
        features: [
          "Step-by-step guides",
          "Best practices",
          "Troubleshooting"
        ],
        examples: [
          "Getting Started Guide",
          "Advanced Features Manual",
          "Integration Guide"
        ]
      },
      "Video Tutorials": {
        description: "Visual learning resources",
        features: [
          "How-to videos",
          "Feature walkthroughs",
          "Best practice demos"
        ],
        examples: [
          "Dashboard Navigation",
          "Report Generation",
          "Data Analysis Tools"
        ]
      }
    }
  }
];

function WorkspaceModal({ section, onClose }) {
  const [activeTab, setActiveTab] = useState(Object.keys(section.subSections)[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-4xl">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold">&times;</button>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{section.icon}</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {section.details.map((detail, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">{detail.label}</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{detail.value}</div>
            </div>
          ))}
        </div>
        {/* Tabs: Only show if more than one subSection */}
        {Object.keys(section.subSections).length > 1 && (
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex gap-4">
              {Object.keys(section.subSections).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Tab Content */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {section.subSections[activeTab].description}
            </h3>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                {section.subSections[activeTab].features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Examples</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.subSections[activeTab].examples.map((example, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded p-3 text-sm text-gray-600 dark:text-gray-400">
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DirectorWorkspace() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 h-screen z-30">
        <Sidebar features={directorFeatures} userLabel={user?.displayName || user?.role || "Director"} />
      </div>
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workspace</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Quick Actions
            </button>
            <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              Help
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {workspaceSections.map((section, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-3 border-l-4 h-full hover:shadow-lg transition-shadow"
              style={{ borderColor: '#6366f1', minHeight: '240px' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              <ul className="text-xs text-gray-500 dark:text-gray-400 list-disc pl-5 mb-2">
                {section.summary.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <div className="flex-1" />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  {section.details.slice(0, 2).map((detail, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {detail.label}: {detail.value}
                    </span>
                  ))}
                </div>
                <button
                  className="px-4 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setSelected(section)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {selected && <WorkspaceModal section={selected} onClose={() => setSelected(null)} />}
      </main>
    </div>
  );
}
