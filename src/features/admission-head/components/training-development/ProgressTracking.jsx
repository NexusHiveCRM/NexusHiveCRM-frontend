import React, { useState } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ClockIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const initialCertifications = [
  {
    id: 1,
    name: "CRM Expert Certification",
    type: "Technical",
    validity: "2 years",
    requirements: [
      "Complete CRM Masterclass",
      "Pass Assessment Test",
      "Handle 50 Applications"
    ],
    teamMembers: [
      {
        name: "John Doe",
        status: "Certified",
        issueDate: "2024-01-15",
        expiryDate: "2026-01-15",
        score: 95
      },
      {
        name: "Jane Smith",
        status: "In Progress",
        progress: 60,
        remainingRequirements: ["Handle 50 Applications"]
      },
      {
        name: "Mike Johnson",
        status: "Not Started"
      }
    ]
  },
  {
    id: 2,
    name: "Document Verification Specialist",
    type: "Process",
    validity: "1 year",
    requirements: [
      "Complete Verification Training",
      "Pass Quality Assessment",
      "Process 100 Documents"
    ],
    teamMembers: [
      {
        name: "John Doe",
        status: "Certified",
        issueDate: "2024-03-01",
        expiryDate: "2025-03-01",
        score: 92
      },
      {
        name: "Jane Smith",
        status: "Certified",
        issueDate: "2024-02-15",
        expiryDate: "2025-02-15",
        score: 88
      },
      {
        name: "Mike Johnson",
        status: "In Progress",
        progress: 75,
        remainingRequirements: ["Process 100 Documents"]
      }
    ]
  }
];

const ProgressTracking = () => {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const handleDeleteCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Progress Tracking</h3>
          <p className="text-sm text-gray-600">Monitor training progress and certifications</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      <div className="space-y-6">
        {certifications.map((certification) => (
          <div key={certification.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{certification.name}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <AcademicCapIcon className="w-4 h-4" />
                    {certification.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    Valid for {certification.validity}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCertification(certification)}
                  className="p-1 text-gray-500 hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteCertification(certification.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Requirements</h5>
              <div className="space-y-2">
                {certification.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <DocumentCheckIcon className="w-4 h-4 text-gray-400" />
                    {requirement}
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members Progress */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Team Members</h5>
              <div className="space-y-3">
                {certification.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{member.name}</span>
                    <div className="flex items-center gap-4">
                      {member.status === 'Certified' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Score: {member.score}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${member.score}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires: {member.expiryDate}
                          </div>
                        </>
                      ) : member.status === 'In Progress' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Progress: {member.progress}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${member.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Remaining: {member.remainingRequirements.join(', ')}
                          </div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-600">Not Started</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.status === 'Certified' ? 'bg-green-100 text-green-800' :
                        member.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Certification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Certification</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter certification name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  <option value="Technical">Technical</option>
                  <option value="Process">Process</option>
                  <option value="Knowledge">Knowledge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Validity Period</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="e.g., 1 year"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Add requirement"
                    />
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-primary"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracking; 