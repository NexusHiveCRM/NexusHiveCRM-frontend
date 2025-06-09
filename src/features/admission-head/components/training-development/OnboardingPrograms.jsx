import React, { useState } from 'react';
import {
  UserPlusIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const initialPrograms = [
  {
    id: 1,
    title: "Counselor Onboarding 2024",
    duration: "2 weeks",
    startDate: "2024-08-01",
    participants: 12,
    completed: 8,
    status: "In Progress",
    modules: [
      { name: "CRM Basics", status: "Completed" },
      { name: "Policy Overview", status: "In Progress" },
      { name: "Document Verification", status: "Pending" }
    ]
  },
  {
    id: 2,
    title: "Document Verifier Training",
    duration: "1 week",
    startDate: "2024-07-15",
    participants: 5,
    completed: 5,
    status: "Completed",
    modules: [
      { name: "Document Types", status: "Completed" },
      { name: "Verification Process", status: "Completed" },
      { name: "Quality Standards", status: "Completed" }
    ]
  }
];

const OnboardingPrograms = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleDeleteProgram = (id) => {
    setPrograms(programs.filter(program => program.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Onboarding Programs</h3>
          <p className="text-sm text-gray-600">Manage structured onboarding for new team members</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Create Program
        </button>
      </div>

      {/* Programs List */}
      <div className="grid gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{program.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {program.duration} • Starts {program.startDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    {program.participants} Participants
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  program.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {program.status}
                </span>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="p-1 text-gray-500 hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteProgram(program.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((program.completed / program.participants) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(program.completed / program.participants) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Modules List */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Program Modules</h5>
              <div className="space-y-2">
                {program.modules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{module.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      module.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      module.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {module.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Onboarding Program</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter program title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="e.g., 2 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Modules</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Module name"
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
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPrograms; 