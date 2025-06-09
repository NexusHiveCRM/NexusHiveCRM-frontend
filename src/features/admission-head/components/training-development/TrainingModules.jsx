import React, { useState } from 'react';
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

const initialModules = [
  {
    id: 1,
    title: "Policy Training 2025",
    type: "Document",
    format: "PDF",
    size: "2.4 MB",
    assignedTo: ["Foreign Applicants Team"],
    releaseDate: "2024-08-01",
    status: "Draft",
    icon: DocumentTextIcon
  },
  {
    id: 2,
    title: "CRM Masterclass",
    type: "Video",
    format: "MP4",
    size: "156 MB",
    assignedTo: ["All Counselors"],
    releaseDate: "2024-07-25",
    status: "Published",
    icon: VideoCameraIcon
  },
  {
    id: 3,
    title: "Admission Process Flow",
    type: "Presentation",
    format: "PPTX",
    size: "8.7 MB",
    assignedTo: ["New Joiners"],
    releaseDate: "2024-07-20",
    status: "Published",
    icon: PresentationChartLineIcon
  }
];

const moduleTypes = [
  { name: "Document", icon: DocumentTextIcon, color: "bg-blue-100 text-blue-800" },
  { name: "Video", icon: VideoCameraIcon, color: "bg-red-100 text-red-800" },
  { name: "Presentation", icon: PresentationChartLineIcon, color: "bg-purple-100 text-purple-800" },
  { name: "Quiz", icon: DocumentTextIcon, color: "bg-green-100 text-green-800" }
];

const TrainingModules = () => {
  const [modules, setModules] = useState(initialModules);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleDeleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Training Modules</h3>
          <p className="text-sm text-gray-600">Upload and manage training materials</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Upload Module
        </button>
      </div>

      {/* Module Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moduleTypes.map((type) => (
          <div key={type.name} className={`p-4 rounded-lg ${type.color} flex items-center gap-3`}>
            <type.icon className="w-6 h-6" />
            <span className="font-medium">{type.name}</span>
          </div>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h4 className="font-semibold">Available Modules</h4>
        <div className="grid gap-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${module.type === 'Document' ? 'bg-blue-100' : module.type === 'Video' ? 'bg-red-100' : 'bg-purple-100'}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold">{module.title}</h5>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DocumentArrowUpIcon className="w-4 h-4" />
                        {module.format} ({module.size})
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Release: {module.releaseDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {module.status}
                  </span>
                  <button
                    onClick={() => setSelectedModule(module)}
                    className="p-1 text-gray-500 hover:text-primary"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  Assigned to: {module.assignedTo.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Module Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Training Module</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter module title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  {moduleTypes.map(type => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, MP4, PPTX up to 200MB</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Release Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assign To</label>
                <select multiple className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  <option value="All Counselors">All Counselors</option>
                  <option value="New Joiners">New Joiners</option>
                  <option value="Foreign Applicants Team">Foreign Applicants Team</option>
                  <option value="Document Verifiers">Document Verifiers</option>
                </select>
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
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingModules; 