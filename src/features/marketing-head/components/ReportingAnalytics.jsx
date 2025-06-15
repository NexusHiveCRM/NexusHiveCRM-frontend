import React, { useEffect, useRef, useState } from "react";
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart, FiUsers, FiMail, FiClock, FiZap, FiSearch, FiDownload, FiPlus, FiChevronRight, FiFileText, FiStar, FiMapPin, FiActivity, FiSettings } from 'react-icons/fi';

// Demo data for each module
const leadFunnel = {
  inquiries: { daily: 120, weekly: 800, monthly: 3200 },
  leadToApp: 0.32,
  appToAdmission: 0.18,
  dropOff: { inquiry: 40, application: 25, admission: 10 },
  sources: [
    { source: "Google Ads", leads: 1200, conversion: 0.28 },
    { source: "Facebook", leads: 800, conversion: 0.22 },
    { source: "LinkedIn", leads: 400, conversion: 0.35 },
    { source: "Events", leads: 500, conversion: 0.18 },
    { source: "Referrals", leads: 300, conversion: 0.40 },
  ],
  ai: {
    predictiveScore: 0.76,
    funnelSuggestion: "Most drop-offs occur at the application stage. Simplify the application form to improve conversion."
  }
};

const spendROI = [
  { id: 1, campaign: "Google Ads", budgeted: 10000, actual: 12000, cpa: 25, roi: 1.8, revenue: 22000, cpl: 8, cac: 30 },
  { id: 2, campaign: "Facebook", budgeted: 8000, actual: 7000, cpa: 30, roi: 1.2, revenue: 9000, cpl: 10, cac: 35 },
  { id: 3, campaign: "Events", budgeted: 5000, actual: 6000, cpa: 40, roi: 2.1, revenue: 13000, cpl: 15, cac: 50 },
];

const campaignPerformance = [
  { id: 1, name: "Spring Email Blast", type: "Email", open: 0.42, click: 0.18, sent: 2000, bestTime: "Tue 10am", rank: 2 },
  { id: 2, name: "Summer Google Ads", type: "Paid Ads", ctr: 0.09, impressions: 12000, cpc: 1.2, bestTime: "Mon 9am", rank: 1 },
  { id: 3, name: "Campus Event", type: "Event", leads: 150, cpl: 20, cost: 3000, bestTime: "Sat 2pm", rank: 3 },
];

const audienceEngagement = [
  { id: 1, group: "18-24, Riyadh", engagement: 0.38, device: "Mobile", interest: "Hot" },
  { id: 2, group: "25-34, Jeddah", engagement: 0.29, device: "Desktop", interest: "Warm" },
  { id: 3, group: "35-44, Dammam", engagement: 0.22, device: "Mobile", interest: "Cold" },
];

const contentEffectiveness = [
  { id: 1, type: "Brochure", views: 1200, downloads: 400, engagement: 0.32, conversions: 80 },
  { id: 2, type: "Program Video", views: 900, downloads: 120, engagement: 0.41, conversions: 60 },
  { id: 3, type: "Testimonial", views: 700, downloads: 80, engagement: 0.28, conversions: 40 },
];

const teamProductivity = [
  { id: 1, member: "USA", calls: 40, emails: 60, meetings: 8, followup: 0.92, response: "2.1h", timeline: "On Time", ai: "On Track" },
  { id: 2, member: "USA", calls: 30, emails: 45, meetings: 6, followup: 0.85, response: "3.2h", timeline: "Delayed", ai: "Delay Risk" },
];

const dashboardKPIs = [
  { label: "Leads Today", value: 120, icon: <FiUsers className="text-blue-500" /> },
  { label: "Active Campaigns", value: 5, icon: <FiBarChart2 className="text-green-500" /> },
  { label: "ROI Trend", value: "+12%", icon: <FiTrendingUp className="text-green-600" /> },
  { label: "Drop-offs", value: 18, icon: <FiTrendingDown className="text-red-500" /> },
];

// Demo data for charts
const leadSummaryData = [120, 140, 110, 160, 180, 150, 170];
const roiTrendData = [1.2, 1.4, 1.1, 1.6, 1.8, 1.5, 1.7];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxLeads = 200;
const minROI = 1.0, maxROI = 2.0;

export default function ReportingAnalytics() {
  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">Reporting & Analytics <FiBarChart2 className="text-blue-500" /></h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Real-time, actionable insights on campaigns, leads, spend, team, and ROI.</p>
        </div>
      </div>

      {/* 1. Lead Funnel Analytics */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp className="text-blue-500" />
          <h2 className="text-lg font-semibold">Lead Funnel Analytics</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Conversion Score</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Funnel Optimization</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Inquiries</h3>
            <div className="flex gap-4">
              <div>Daily: <span className="font-bold">{leadFunnel.inquiries.daily}</span></div>
              <div>Weekly: <span className="font-bold">{leadFunnel.inquiries.weekly}</span></div>
              <div>Monthly: <span className="font-bold">{leadFunnel.inquiries.monthly}</span></div>
            </div>
            <div className="mt-2">Lead→App: <span className="font-bold">{(leadFunnel.leadToApp * 100).toFixed(1)}%</span></div>
            <div>App→Admission: <span className="font-bold">{(leadFunnel.appToAdmission * 100).toFixed(1)}%</span></div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium mb-2">Drop-off Points</h3>
            <div>Inquiry: <span className="font-bold text-red-500">{leadFunnel.dropOff.inquiry}%</span></div>
            <div>Application: <span className="font-bold text-red-500">{leadFunnel.dropOff.application}%</span></div>
            <div>Admission: <span className="font-bold text-red-500">{leadFunnel.dropOff.admission}%</span></div>
          </div>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Leads</th>
                <th className="pb-3 font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {leadFunnel.sources.map((s, idx) => (
                <tr key={idx} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{s.source}</td>
                  <td className="py-3">{s.leads}</td>
                  <td className="py-3">{(s.conversion * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Predictive Lead Conversion Score</div>
            <div className="text-2xl font-bold text-blue-600">{(leadFunnel.ai.predictiveScore * 100).toFixed(0)}%</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Funnel Optimization Suggestion</div>
            <div className="text-sm text-green-700 dark:text-green-300">{leadFunnel.ai.funnelSuggestion}</div>
          </div>
        </div>
      </section>

      {/* 2. Marketing Spend vs ROI */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiDollarSign className="text-green-500" />
          <h2 className="text-lg font-semibold">Marketing Spend vs ROI</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI ROI Estimator</span>
          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded animate-pulse">Overspend Alerts</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Budgeted ($)</th>
                <th className="pb-3 font-medium">Actual ($)</th>
                <th className="pb-3 font-medium">CPA ($)</th>
                <th className="pb-3 font-medium">ROI</th>
                <th className="pb-3 font-medium">Revenue ($)</th>
                <th className="pb-3 font-medium">CPL ($)</th>
                <th className="pb-3 font-medium">CAC ($)</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {spendROI.map((row) => (
                <tr key={row.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{row.campaign}</td>
                  <td className="py-3">${row.budgeted.toLocaleString()}</td>
                  <td className="py-3">${row.actual.toLocaleString()}</td>
                  <td className="py-3">${row.cpa}</td>
                  <td className="py-3">{row.roi}</td>
                  <td className="py-3">${row.revenue.toLocaleString()}</td>
                  <td className="py-3">${row.cpl}</td>
                  <td className="py-3">${row.cac}</td>
                  <td className="py-3">
                    {row.actual > row.budgeted && row.roi < 1.5 && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Overspend</span>}
                    {row.roi > 1.5 && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">High ROI</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="font-medium mb-1">AI-powered ROI Estimator</div>
          <div className="text-sm text-green-700 dark:text-green-300">Predicted outcome: $18,000 revenue, 600 leads for next campaign.</div>
        </div>
      </section>

      {/* 3. Campaign Performance Reports */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiPieChart className="text-purple-500" />
          <h2 className="text-lg font-semibold">Campaign Performance Reports</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI Best Time Predictor</span>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">Auto Ranking</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Open/CTR</th>
                <th className="pb-3 font-medium">Impr./Sent</th>
                <th className="pb-3 font-medium">CPC/CPL</th>
                <th className="pb-3 font-medium">Best Time</th>
                <th className="pb-3 font-medium">Rank</th>
              </tr>
            </thead>
            <tbody>
              {campaignPerformance.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3">{c.type}</td>
                  <td className="py-3">
                    {c.type === 'Email' ? `${(c.open * 100).toFixed(1)}% / ${(c.click * 100).toFixed(1)}%` : c.type === 'Paid Ads' ? `${(c.ctr * 100).toFixed(1)}%` : '-'}
                  </td>
                  <td className="py-3">
                    {c.type === 'Email' ? c.sent : c.type === 'Paid Ads' ? c.impressions : '-'}
                  </td>
                  <td className="py-3">
                    {c.type === 'Paid Ads' ? `$${c.cpc}` : c.type === 'Event' ? `$${c.cpl}` : '-'}
                  </td>
                  <td className="py-3">{c.bestTime}</td>
                  <td className="py-3">#{c.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="font-medium mb-1">AI Campaign Insights</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Best time to post: Mon 9am. Top campaign: Summer Google Ads.</div>
        </div>
      </section>

      {/* 4. Audience & Engagement Analytics */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-pink-500" />
          <h2 className="text-lg font-semibold">Audience & Engagement Analytics</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Geo-targeting</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Demographic Modeling</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Group</th>
                <th className="pb-3 font-medium">Engagement</th>
                <th className="pb-3 font-medium">Device</th>
                <th className="pb-3 font-medium">Interest</th>
              </tr>
            </thead>
            <tbody>
              {audienceEngagement.map((a) => (
                <tr key={a.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{a.group}</td>
                  <td className="py-3">{(a.engagement * 100).toFixed(1)}%</td>
                  <td className="py-3">{a.device}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${a.interest === 'Hot' ? 'bg-red-100 text-red-700' : a.interest === 'Warm' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{a.interest}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <div className="font-medium mb-1">AI Geo/Demographic Insights</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Suggest targeting Dammam mobile users with video content for higher engagement.</div>
        </div>
      </section>

      {/* 5. Content Effectiveness */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-blue-400" />
          <h2 className="text-lg font-semibold">Content Effectiveness</h2>
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded animate-pulse">AI Content Recommendation</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Repurpose Suggestion</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">Downloads</th>
                <th className="pb-3 font-medium">Engagement</th>
                <th className="pb-3 font-medium">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {contentEffectiveness.map((c) => (
                <tr key={c.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{c.type}</td>
                  <td className="py-3">{c.views}</td>
                  <td className="py-3">{c.downloads}</td>
                  <td className="py-3">{(c.engagement * 100).toFixed(1)}%</td>
                  <td className="py-3">{c.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Content Recommendation</div>
            <div className="text-sm text-green-700 dark:text-green-300">Use more program videos for 18-24 age group in Riyadh.</div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-1">
            <div className="font-medium mb-1">AI Repurpose Suggestion</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Convert top-performing blog into a video for Facebook campaign.</div>
          </div>
        </div>
      </section>

      {/* 6. Team Productivity Reports */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiActivity className="text-pink-500" />
          <h2 className="text-lg font-semibold">Team Productivity Reports</h2>
          <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded animate-pulse">AI Productivity Insights</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">Follow-up Delay Prediction</span>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Calls</th>
                <th className="pb-3 font-medium">Emails</th>
                <th className="pb-3 font-medium">Meetings</th>
                <th className="pb-3 font-medium">Follow-up %</th>
                <th className="pb-3 font-medium">Response Time</th>
                <th className="pb-3 font-medium">Timeline</th>
                <th className="pb-3 font-medium">AI Alert</th>
              </tr>
            </thead>
            <tbody>
              {teamProductivity.map((t) => (
                <tr key={t.id} className="border-b dark:border-gray-700">
                  <td className="py-3 font-medium">{t.member}</td>
                  <td className="py-3">{t.calls}</td>
                  <td className="py-3">{t.emails}</td>
                  <td className="py-3">{t.meetings}</td>
                  <td className="py-3">{(t.followup * 100).toFixed(1)}%</td>
                  <td className="py-3">{t.response}</td>
                  <td className="py-3">{t.timeline}</td>
                  <td className="py-3">
                    {t.ai === 'Delay Risk' && <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Delay Risk</span>}
                    {t.ai === 'On Track' && <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">On Track</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <div className="font-medium mb-1">AI Productivity Insights</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Member USA is at risk of delay on follow-ups.</div>
        </div>
      </section>

      {/* 7. Performance Dashboards */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-blue-500" />
          <h2 className="text-lg font-semibold">Performance Dashboards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {dashboardKPIs.map((kpi, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-4">
              {kpi.icon}
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{kpi.label}</div>
                <div className="text-xl font-bold">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Chart Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lead Summary Chart */}
          <LeadSummaryChart />
          {/* ROI Trend Chart */}
          <ROITrendChart />
        </div>
      </section>

      {/* 8. Custom Report Builder */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiSettings className="text-purple-500" />
          <h2 className="text-lg font-semibold">Custom Report Builder</h2>
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded animate-pulse">AI-Generated Reports</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Date Range</label>
            <input type="date" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
            <input type="date" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Campaign</label>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option>All</option>
              <option>Google Ads</option>
              <option>Facebook</option>
              <option>Events</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Lead Stage</label>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option>All</option>
              <option>Inquiry</option>
              <option>Application</option>
              <option>Admission</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Channel</label>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option>All</option>
              <option>Google Ads</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
              <option>Events</option>
              <option>Referrals</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><FiSearch /> Generate</button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2"><FiDownload /> Export</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"><FiPlus /> Schedule</button>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <div className="font-medium mb-1">AI-Generated Narrative Report</div>
          <div className="text-sm text-purple-700 dark:text-purple-300">This week, your LinkedIn campaign brought in 20% more leads at 10% lower cost. Facebook campaign ROI dropped by 5% due to higher CPC.</div>
        </div>
      </section>
    </div>
  );
}

// --- Lead Summary Chart ---
function LeadSummaryChart() {
  const [animatedHeights, setAnimatedHeights] = useState(Array(leadSummaryData.length).fill(0));
  useEffect(() => {
    setTimeout(() => setAnimatedHeights(leadSummaryData.map(val => val)), 100);
  }, []);
  return (
    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg flex flex-col items-center justify-between p-4 min-h-[240px] w-full">
      <div className="w-full text-left mb-2">
        <span className="font-semibold text-blue-700">Lead Summary Chart</span>
      </div>
      <svg width="100%" height="160" viewBox="0 0 340 160" preserveAspectRatio="none" style={{ width: '100%', maxWidth: '100%' }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.10" />
          </filter>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1="40" x2="320" y1={30 + 110 * p} y2={30 + 110 * p} stroke="#dbeafe" strokeWidth="1" />
        ))}
        {/* Y-axis labels */}
        {[0, 50, 100, 150, 200].map((v, i) => (
          <text key={i} x="28" y={140 - (v / maxLeads) * 110} fontSize="11" fill="#2563eb" textAnchor="end">{v}</text>
        ))}
        {/* Bars */}
        {leadSummaryData.map((val, i) => (
          <g key={i}>
            <rect
              x={50 + i*40}
              y={140 - (animatedHeights[i] / maxLeads) * 110}
              width="28"
              height={(animatedHeights[i] / maxLeads) * 110}
              fill="url(#barGradient)"
              rx="10"
              filter="url(#barShadow)"
              style={{ transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' }}
              onMouseOver={e => e.target.setAttribute('fill', '#3b82f6')}
              onMouseOut={e => e.target.setAttribute('fill', 'url(#barGradient)')}
            />
            {/* Value label with white bg */}
            <rect x={50 + i*40 + 4} y={128 - (animatedHeights[i] / maxLeads) * 110} width="20" height="18" rx="6" fill="#fff" opacity="0.85" />
            <text x={50 + i*40 + 14} y={142 - (animatedHeights[i] / maxLeads) * 110} fontSize="12" textAnchor="middle" fill="#2563eb" fontWeight="bold">{val}</text>
          </g>
        ))}
        {/* Day labels */}
        {days.map((d, i) => (
          <text key={d} x={64 + i*40} y={155} fontSize="12" textAnchor="middle" fill="#1e293b">{d}</text>
        ))}
      </svg>
      <div className="text-xs text-gray-500 w-full text-left mt-2">Leads over the last 7 days</div>
    </div>
  );
}

// --- ROI Trend Chart ---
function ROITrendChart() {
  // Animation for line/points
  const [animatedVals, setAnimatedVals] = useState(Array(roiTrendData.length).fill(1.0));
  useEffect(() => {
    setTimeout(() => setAnimatedVals(roiTrendData), 100);
  }, []);
  // Generate smooth curve path
  function getSmoothPath(data) {
    const points = data.map((val, i) => [50 + i*40, 140 - ((val-minROI)/(maxROI-minROI))*110]);
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x1, y1] = points[i-1];
      const [x2, y2] = points[i];
      const mx = (x1 + x2) / 2;
      d += ` Q${mx},${y1} ${x2},${y2}`;
    }
    return d;
  }
  return (
    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg flex flex-col items-center justify-between p-4 min-h-[240px] w-full">
      <div className="w-full text-left mb-2">
        <span className="font-semibold text-green-700">ROI Trend Chart</span>
      </div>
      <svg width="100%" height="160" viewBox="0 0 340 160" preserveAspectRatio="none" style={{ width: '100%', maxWidth: '100%' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id="dotShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#16a34a" floodOpacity="0.18" />
          </filter>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1="40" x2="320" y1={30 + 110 * p} y2={30 + 110 * p} stroke="#bbf7d0" strokeWidth="1" />
        ))}
        {/* Y-axis labels */}
        {[1.0, 1.25, 1.5, 1.75, 2.0].map((v, i) => (
          <text key={i} x="32" y={140 - ((v-minROI)/(maxROI-minROI))*110} fontSize="11" fill="#166534" textAnchor="end">{v.toFixed(2)}</text>
        ))}
        {/* Smooth curve */}
        <path d={getSmoothPath(animatedVals)} fill="none" stroke="url(#lineGradient)" strokeWidth="4" style={{ transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' }} />
        {/* Dots and value labels */}
        {roiTrendData.map((val, i) => (
          <g key={i}>
            <circle cx={50 + i*40} cy={140 - ((animatedVals[i]-minROI)/(maxROI-minROI))*110} r="8" fill="#16a34a" filter="url(#dotShadow)" />
            <rect x={50 + i*40 - 14} y={128 - ((animatedVals[i]-minROI)/(maxROI-minROI))*110} width="28" height="18" rx="6" fill="#fff" opacity="0.85" />
            <text x={50 + i*40} y={142 - ((animatedVals[i]-minROI)/(maxROI-minROI))*110} fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">{val.toFixed(2)}</text>
          </g>
        ))}
        {/* Day labels */}
        {days.map((d, i) => (
          <text key={d} x={64 + i*40} y={155} fontSize="12" textAnchor="middle" fill="#166534">{d}</text>
        ))}
      </svg>
      <div className="text-xs text-gray-500 w-full text-left mt-2">ROI trend over the last 7 days</div>
    </div>
  );
} 