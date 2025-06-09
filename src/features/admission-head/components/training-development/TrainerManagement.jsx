import React, { useState } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  CalendarIcon,
  StarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

const initialTrainers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Senior Trainer",
    expertise: ["CRM", "Policy", "Document Verification"],
    rating: 4.8,
    sessions: 45,
    availability: "Full-time",
    contact: {
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567"
    },
    upcomingSessions: [
      {
        title: "CRM Masterclass",
        date: "2024-08-01",
        time: "10:00 AM",
        participants: 15
      },
      {
        title: "Policy Update Training",
        date: "2024-08-03",
        time: "2:00 PM",
        participants: 20
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Technical Trainer",
    expertise: ["CRM", "Technical Skills"],
    rating: 4.6,
    sessions: 32,
    availability: "Part-time",
    contact: {
      email: "michael.chen@example.com",
      phone: "+1 (555) 987-6543"
    },
    upcomingSessions: [
      {
        title: "Advanced CRM Features",
        date: "2024-08-02",
        time: "11:00 AM",
        participants: 12
      }
    ]
  }
];

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(trainer => trainer.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Trainer Management</h3>
          <p className="text-sm text-gray-600">Manage trainers and their schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          <PlusIcon className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Trainers List */}
      <div className="grid gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <UserGroupIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{trainer.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      {trainer.role}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      {trainer.rating} ({trainer.sessions} sessions)
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {trainer.availability}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTrainer(trainer)}
                  className="p-1 text-gray-500 hover:text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTrainer(trainer.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expertise */}
            <div className="mt-4">
              <h5 className="font-medium mb-2">Areas of Expertise</h5>
              <div className="flex flex-wrap gap-2">
                {trainer.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-4">
              <h5 className="font-medium mb-2">Contact Information</h5>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4" />
                  {trainer.contact.email}
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4" />
                  {trainer.contact.phone}
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Upcoming Sessions</h5>
              <div className="space-y-3">
                {trainer.upcomingSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{session.title}</span>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {session.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {session.participants} participants
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Trainer</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter trainer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter trainer role"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Add expertise"
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter phone number"
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
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement; 