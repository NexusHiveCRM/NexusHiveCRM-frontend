import React, { useState } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

const initialResources = [
  {
    id: 1,
    title: "CRM User Guide 2024",
    type: "Document",
    category: "Technical",
    format: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-07-01",
    downloads: 45,
    views: 120,
    tags: ["CRM", "Guide", "Technical"],
    description: "Comprehensive guide for using the CRM system effectively."
  },
  {
    id: 2,
    title: "Admission Process Walkthrough",
    type: "Video",
    category: "Process",
    format: "MP4",
    size: "156 MB",
    uploadDate: "2024-06-15",
    downloads: 32,
    views: 98,
    tags: ["Process", "Video", "Training"],
    description: "Step-by-step video guide for the admission process."
  },
  {
    id: 3,
    title: "Policy Updates Q3 2024",
    type: "Presentation",
    category: "Policy",
    format: "PPTX",
    size: "8.7 MB",
    uploadDate: "2024-07-10",
    downloads: 28,
    views: 85,
    tags: ["Policy", "Updates", "Q3"],
    description: "Latest policy updates and changes for Q3 2024."
  }
];

const resourceTypes = [
  { name: "Document", icon: DocumentTextIcon, color: "bg-blue-100 text-blue-800" },
  { name: "Video", icon: VideoCameraIcon, color: "bg-red-100 text-red-800" },
  { name: "Presentation", icon: PresentationChartLineIcon, color: "bg-purple-100 text-purple-800" },
  { name: "Guide", icon: BookOpenIcon, color: "bg-green-100 text-green-800" }
];

const KnowledgeHub = () => {
  const [resources, setResources] = useState(initialResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Knowledge Hub</h3>
          <p className="text-sm text-gray-600">Access training resources and documentation</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Upload Resource
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Resource Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resourceTypes.map((type) => (
          <div key={type.name} className={`p-4 rounded-lg ${type.color} flex items-center gap-3`}>
            <type.icon className="w-6 h-6" />
            <span className="font-medium">{type.name}</span>
          </div>
        ))}
      </div>

      {/* Resources List */}
      <div className="grid gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  resource.type === 'Document' ? 'bg-blue-100' :
                  resource.type === 'Video' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  {resource.type === 'Document' ? <DocumentTextIcon className="w-6 h-6" /> :
                   resource.type === 'Video' ? <VideoCameraIcon className="w-6 h-6" /> :
                   <PresentationChartLineIcon className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <DocumentTextIcon className="w-4 h-4" />
                      {resource.format} ({resource.size})
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {resource.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      {resource.downloads} downloads
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedResource(resource)}
                  className="p-1 text-gray-500 hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Resource</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  {resourceTypes.map(type => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  <option value="Technical">Technical</option>
                  <option value="Process">Process</option>
                  <option value="Policy">Policy</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter resource description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
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
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter tags (comma-separated)"
                />
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
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub; 