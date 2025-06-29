import React, { useState } from "react";
import { motion } from "framer-motion";

// Demo data for campaigns
const campaigns = [
  {
    id: 1,
    name: "Summer Enrollment Drive",
    type: "Digital",
    status: "Active",
    budget: 50000,
    spent: 25000,
    leads: 250,
    conversions: 45,
    channels: ["Social Media", "Email", "PPC"],
    team: ["John Doe", "Jane Smith"],
    startDate: "2024-05-01",
    endDate: "2024-07-31",
  },
  {
    id: 2,
    name: "Alumni Engagement",
    type: "Social",
    status: "Planning",
    budget: 30000,
    spent: 0,
    leads: 0,
    conversions: 0,
    channels: ["Social Media", "Email"],
    team: ["Mike Johnson"],
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: 3,
    name: "International Student Recruitment",
    type: "Multi-channel",
    status: "Completed",
    budget: 75000,
    spent: 75000,
    leads: 500,
    conversions: 120,
    channels: ["Social Media", "Email", "PPC", "Events"],
    team: ["John Doe", "Jane Smith", "Mike Johnson"],
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
];

// Demo data for campaign performance
const campaignPerformance = [
  { metric: "Total Budget", value: "$155,000", change: "+15%" },
  { metric: "Total Spent", value: "$100,000", change: "+8%" },
  { metric: "Total Leads", value: "750", change: "+25%" },
  { metric: "Total Conversions", value: "165", change: "+18%" },
];

// Demo data for channel performance
const channelPerformance = [
  {
    channel: "Social Media",
    budget: 50000,
    spent: 35000,
    leads: 300,
    conversions: 75,
  },
  {
    channel: "Email",
    budget: 30000,
    spent: 25000,
    leads: 200,
    conversions: 45,
  },
  {
    channel: "PPC",
    budget: 45000,
    spent: 30000,
    leads: 150,
    conversions: 30,
  },
  {
    channel: "Events",
    budget: 30000,
    spent: 10000,
    leads: 100,
    conversions: 15,
  },
];

export default function MarketingHeadCampaignManagement() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [campaignsList, setCampaignsList] = useState(campaigns);
  const [createForm, setCreateForm] = useState({
    name: '',
    type: '',
    status: 'Planning',
    budget: '',
    expectedROI: '',
    hardBenefits: '',
    softBenefits: '',
    startDate: '',
    endDate: '',
  });
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setCampaignsList(prev => [
      ...prev,
      {
        id: Date.now(),
        name: createForm.name,
        type: createForm.type,
        status: createForm.status,
        budget: Number(createForm.budget),
        spent: 0,
        leads: 0,
        conversions: 0,
        channels: [],
        team: [],
        startDate: createForm.startDate,
        endDate: createForm.endDate,
        expectedROI: createForm.expectedROI,
        hardBenefits: createForm.hardBenefits,
        softBenefits: createForm.softBenefits,
      }
    ]);
    setShowCreateModal(false);
    setCreateForm({
      name: '', type: '', status: 'Planning', budget: '', expectedROI: '', hardBenefits: '', softBenefits: '', startDate: '', endDate: ''
    });
  };

  const filteredCampaigns = campaignsList.filter((campaign) => {
    if (filter === "All") return true;
    if (filter === "Active") return campaign.status === "Active";
    if (filter === "Planning") return campaign.status === "Planning";
    if (filter === "Completed") return campaign.status === "Completed";
    return false;
  });

  const Modal = ({ campaign, onClose }) => {
    if (!campaign) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{campaign.name}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              campaign.status === "Active" ? "bg-green-100 text-green-700" :
              campaign.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {campaign.status}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Campaign Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{campaign.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{campaign.startDate} - {campaign.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="font-medium">${campaign.spent.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Channels</h3>
              <div className="flex flex-wrap gap-2">
                {campaign.channels.map((channel, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Team Members</h3>
              <div className="flex flex-wrap gap-2">
                {campaign.team.map((member, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Leads Generated</p>
                  <p className="font-medium">{campaign.leads}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conversions</p>
                  <p className="font-medium">{campaign.conversions}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Campaign
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Management</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track and manage your marketing campaigns</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setShowCreateModal(true)}>
            Create Campaign
          </button>
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            Export Report
          </button>
        </div>
      </div>

      {/* Campaign Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignPerformance.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{metric.metric}</span>
              <span className={`text-sm font-medium ${
                metric.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}>
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Channel Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Channel Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channelPerformance.map((channel, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">{channel.channel}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Budget</span>
                  <span className="font-medium">${channel.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Spent</span>
                  <span className="font-medium">${channel.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Leads</span>
                  <span className="font-medium">{channel.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Conversions</span>
                  <span className="font-medium">{channel.conversions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">All Campaigns</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
            >
              <option value="All">All Campaigns</option>
              <option value="Active">Active</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Budget</th>
                  <th className="pb-3 font-medium">Performance</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b dark:border-gray-700">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</p>
                      </div>
                    </td>
                    <td className="py-4">{campaign.type}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === "Active" ? "bg-green-100 text-green-700" :
                        campaign.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4">${campaign.budget.toLocaleString()}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{campaign.leads} leads</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm">{campaign.conversions} conversions</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleCampaignClick(campaign)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && <Modal campaign={selectedCampaign} onClose={() => setShowModal(false)} />}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New Campaign</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <input name="name" value={createForm.name} onChange={handleCreateChange} required className="w-full px-3 py-2 border rounded" placeholder="e.g. Summer Enrollment Drive" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input name="type" value={createForm.type} onChange={handleCreateChange} required className="w-full px-3 py-2 border rounded" placeholder="e.g. Digital, Social, Multi-channel" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select name="status" value={createForm.status} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded">
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input type="date" name="startDate" value={createForm.startDate} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input type="date" name="endDate" value={createForm.endDate} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget ($)</label>
                <input type="number" name="budget" value={createForm.budget} onChange={handleCreateChange} required className="w-full px-3 py-2 border rounded" placeholder="e.g. 50000" min="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expected Results / ROI</label>
                <input name="expectedROI" value={createForm.expectedROI} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded" placeholder="e.g. 5x ROI, 1000 leads, 200 conversions" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hard Benefits <span className='text-xs text-gray-400'>(Tangible, measurable)</span></label>
                <textarea name="hardBenefits" value={createForm.hardBenefits} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded" rows={2} placeholder="e.g. Increased revenue, more enrollments, cost savings" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Soft Benefits <span className='text-xs text-gray-400'>(Intangible, qualitative)</span></label>
                <textarea name="softBenefits" value={createForm.softBenefits} onChange={handleCreateChange} className="w-full px-3 py-2 border rounded" rows={2} placeholder="e.g. Brand awareness, team morale, market reputation" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 