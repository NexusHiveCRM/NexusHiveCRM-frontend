import React, { useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const initialSkills = [
  {
    id: 1,
    name: "CRM Proficiency",
    category: "Technical",
    requiredLevel: 4,
    teamAverage: 3.2,
    gap: 0.8,
    critical: true,
    teamMembers: [
      { name: "John Doe", level: 4.5, status: "Above Required" },
      { name: "Jane Smith", level: 2.8, status: "Below Required" },
      { name: "Mike Johnson", level: 3.5, status: "Below Required" }
    ]
  },
  {
    id: 2,
    name: "Document Verification",
    category: "Process",
    requiredLevel: 4,
    teamAverage: 3.8,
    gap: 0.2,
    critical: false,
    teamMembers: [
      { name: "John Doe", level: 4.2, status: "Above Required" },
      { name: "Jane Smith", level: 3.5, status: "Below Required" },
      { name: "Mike Johnson", level: 3.7, status: "Below Required" }
    ]
  },
  {
    id: 3,
    name: "Policy Knowledge",
    category: "Knowledge",
    requiredLevel: 5,
    teamAverage: 3.5,
    gap: 1.5,
    critical: true,
    teamMembers: [
      { name: "John Doe", level: 4.0, status: "Below Required" },
      { name: "Jane Smith", level: 3.2, status: "Below Required" },
      { name: "Mike Johnson", level: 3.3, status: "Below Required" }
    ]
  }
];

const skillCategories = [
  { name: "Technical", icon: ChartBarIcon, color: "bg-blue-100 text-blue-800" },
  { name: "Process", icon: DocumentCheckIcon, color: "bg-green-100 text-green-800" },
  { name: "Knowledge", icon: AcademicCapIcon, color: "bg-purple-100 text-purple-800" },
  { name: "Soft Skills", icon: UserGroupIcon, color: "bg-yellow-100 text-yellow-800" }
];

const SkillGapAnalysis = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Skill Gap Analysis</h3>
          <p className="text-sm text-gray-600">Track and manage team skill levels</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skillCategories.map((category) => (
          <div key={category.name} className={`p-4 rounded-lg ${category.color} flex items-center gap-3`}>
            <category.icon className="w-6 h-6" />
            <span className="font-medium">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold">{skill.name}</h4>
                  {skill.critical && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Critical
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ChartBarIcon className="w-4 h-4" />
                    Required Level: {skill.requiredLevel}
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                    Team Average: {skill.teamAverage}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`font-medium ${
                      skill.gap > 1 ? 'text-red-600' :
                      skill.gap > 0.5 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      Gap: {skill.gap}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSkill(skill)}
                  className="p-1 text-gray-500 hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Team Members Progress */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Team Members</h5>
              <div className="space-y-3">
                {skill.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{member.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Level: {member.level}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(member.level / skill.requiredLevel) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.status === 'Above Required' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
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

      {/* Add/Edit Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter skill name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  {skillCategories.map(category => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Required Level (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="critical"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="critical" className="ml-2 block text-sm text-gray-700">
                  Mark as Critical Skill
                </label>
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
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis; 