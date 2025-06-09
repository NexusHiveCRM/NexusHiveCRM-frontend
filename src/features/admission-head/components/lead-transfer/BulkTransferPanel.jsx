import React, { useState } from 'react';
import { FiUsers, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const BulkTransferPanel = ({ selectedLeads, setSelectedLeads }) => {
  const [transferData, setTransferData] = useState({
    newAssignee: '',
    reason: '',
    notifyUsers: true,
    notifyStudent: false
  });

  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      counselor: 'Megha Sharma',
      matchScore: 85,
      reason: 'Best performance with North-East region leads',
      leadsCount: 8
    },
    {
      counselor: 'Rahul Kumar',
      matchScore: 75,
      reason: 'High conversion rate with technical courses',
      leadsCount: 5
    }
  ]);

  // Mock data - replace with actual API call
  const leads = [
    {
      id: 1,
      name: "John Doe",
      applicationId: "APP001",
      program: "B.Tech Computer Science",
      currentOwner: "Rahul Sharma"
    },
    // Add more mock data
  ];

  const counselors = [
    { id: 1, name: "Megha Sharma", activeLeads: 15 },
    { id: 2, name: "Rahul Kumar", activeLeads: 20 },
    { id: 3, name: "Priya Patel", activeLeads: 12 }
  ];

  const handleTransfer = () => {
    // Implement transfer logic
    console.log('Transfer initiated:', {
      selectedLeads,
      transferData
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">AI-Powered Suggestions</h2>
          <button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
          >
            {showAISuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
          </button>
        </div>

        {showAISuggestions && (
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{suggestion.counselor}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Match Score: {suggestion.matchScore}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.leadsCount} leads
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setTransferData({ ...transferData, newAssignee: suggestion.counselor })}
                  className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  Apply Suggestion
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bulk Transfer Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bulk Lead Transfer</h2>
        
        <div className="space-y-4">
          {/* Lead Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Leads
            </label>
            <div className="max-h-60 overflow-y-auto border rounded-lg">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center p-3 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads([...selectedLeads, lead.id]);
                      } else {
                        setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                      }
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {lead.applicationId} • {lead.program}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Assignee Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Assignee
            </label>
            <select
              value={transferData.newAssignee}
              onChange={(e) => setTransferData({ ...transferData, newAssignee: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Counselor</option>
              {counselors.map(counselor => (
                <option key={counselor.id} value={counselor.name}>
                  {counselor.name} ({counselor.activeLeads} active leads)
                </option>
              ))}
            </select>
          </div>

          {/* Transfer Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Transfer
            </label>
            <textarea
              value={transferData.reason}
              onChange={(e) => setTransferData({ ...transferData, reason: e.target.value })}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter reason for transfer..."
            />
          </div>

          {/* Notification Options */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={transferData.notifyUsers}
                onChange={(e) => setTransferData({ ...transferData, notifyUsers: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Notify both counselors via email
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={transferData.notifyStudent}
                onChange={(e) => setTransferData({ ...transferData, notifyStudent: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Notify student about counselor change
              </label>
            </div>
          </div>

          {/* Transfer Button */}
          <div className="flex justify-end">
            <button
              onClick={handleTransfer}
              disabled={!selectedLeads.length || !transferData.newAssignee}
              className={`
                inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                ${(!selectedLeads.length || !transferData.newAssignee)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }
              `}
            >
              <FiSend className="mr-2" />
              Transfer Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkTransferPanel; 