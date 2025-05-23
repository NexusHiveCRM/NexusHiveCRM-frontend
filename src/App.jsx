// Trigger redeploy: trivial comment added
import LandingPage from "./components/LandingPage";
import CookiePolicy from "./components/CookiePolicy";
import LoginPage from "./components/LoginPage";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import RBACUsers from "./components/RBACUsers";
import RBACTeams from "./components/RBACTeams";
import RBACTemplates from "./components/RBACTemplates";
import RBACLogs from "./components/RBACLogs";
import RBACSettings from "./components/RBACSettings";
import MarketingHeadLayout from "./features/marketing-head/pages/MarketingHeadLayout";
import Dashboard from "./features/marketing-head/pages/Dashboard";
import TeamManagement from "./features/marketing-head/pages/TeamManagement";
import CampaignManagement from "./features/marketing-head/pages/CampaignManagement";
import MarketingManagerDashboard from "./components/MarketingManagerDashboard";
import AdmissionHeadDashboard from "./components/AdmissionHeadDashboard";
import AdmissionSpocDashboard from "./components/AdmissionSpocDashboard";
import HRHeadDashboard from "./components/HRHeadDashboard";
import HRManagerDashboard from "./components/HRManagerDashboard";
import DirectorDashboard from "./components/DirectorDashboard";
import DeanDashboard from "./components/DeanDashboard";
import Unauthorized from "./components/Unauthorized";
import LeadsManagement from "./features/marketing-head/pages/LeadsManagement";
import ResourceManagement from "./features/marketing-head/pages/ResourceManagement";
import ReportingAnalytics from "./features/marketing-head/pages/ReportingAnalytics";
import CommunicationHub from "./features/marketing-head/pages/CommunicationHub";
import TrainingDevelopment from "./features/marketing-head/pages/TrainingDevelopment";
import ComplianceQuality from "./features/marketing-head/pages/ComplianceQuality";
import AccountManagement from "./features/marketing-head/pages/AccountManagement";
import Tickets from "./features/marketing-head/pages/Tickets";
import AdmissionHeadLayout from "./components/AdmissionHeadLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router basename="/NexusHiveCRM-frontend">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rbac" element={<SuperAdminDashboard />} />
        <Route path="/rbac/users" element={<RBACUsers />} />
        <Route path="/rbac/teams" element={<RBACTeams />} />
        <Route path="/rbac/templates" element={<RBACTemplates />} />
        <Route path="/rbac/logs" element={<RBACLogs />} />
        <Route path="/rbac/settings" element={<RBACSettings />} />
        
        {/* Marketing Head Routes */}
        <Route path="/rbac/marketing-head" element={<MarketingHeadLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="campaigns" element={<CampaignManagement />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="resources" element={<ResourceManagement />} />
          <Route path="analytics" element={<ReportingAnalytics />} />
          <Route path="communication" element={<CommunicationHub />} />
          <Route path="training" element={<TrainingDevelopment />} />
          <Route path="compliance" element={<ComplianceQuality />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>

        <Route path="/rbac/marketing-manager" element={<MarketingManagerDashboard />} />
        <Route path="/rbac/admission-head" element={<AdmissionHeadLayout />}>
          <Route index element={<AdmissionHeadDashboard />} />
          <Route path="leads" element={<PlaceholderPage title='Leads / Applicants' />} />
          <Route path="applications" element={<PlaceholderPage title='Applications' />} />
          <Route path="schedule" element={<PlaceholderPage title='Schedule / Appointments' />} />
          <Route path="communication" element={<PlaceholderPage title='Communication / Logs' />} />
          <Route path="payments" element={<PlaceholderPage title='Payments' />} />
          <Route path="documents" element={<PlaceholderPage title='Documents' />} />
          <Route path="search" element={<PlaceholderPage title='Search / Filters' />} />
          <Route path="tools" element={<PlaceholderPage title='Tools / Utilities' />} />
          <Route path="lead-transfer" element={<PlaceholderPage title='Lead Transfer' />} />
          <Route path="courses" element={<PlaceholderPage title='Course Management' />} />
          <Route path="training" element={<PlaceholderPage title='Training & Development' />} />
          <Route path="compliance" element={<PlaceholderPage title='Compliance & Quality' />} />
          <Route path="account" element={<PlaceholderPage title='Account Management' />} />
          <Route path="tickets" element={<PlaceholderPage title='Tickets' />} />
        </Route>
        <Route path="/rbac/admission-spoc" element={<AdmissionSpocDashboard />} />
        <Route path="/rbac/hr-head" element={<HRHeadDashboard />} />
        <Route path="/rbac/hr-manager" element={<HRManagerDashboard />} />
        <Route path="/rbac/director" element={<DirectorDashboard />} />
        <Route path="/rbac/dean" element={<DeanDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">Content coming soon!</p>
    </div>
  );
}