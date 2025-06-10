// Trigger redeploy: trivial comment added
import React from "react";
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
import MarketingHeadDashboard from "./components/MarketingHeadDashboard";
import TeamManagement from './features/marketing-head/components/TeamManagement';
import CampaignManagement from './features/marketing-head/components/CampaignManagement';
import MarketingManagerDashboard from "./components/MarketingManagerDashboard";
import AdmissionHeadDashboard from "./components/AdmissionHeadDashboard";
import AdmissionSpocDashboard from "./components/AdmissionSpocDashboard";
import HRHeadLayout from "./features/hr-head/pages/HRHeadLayout";
import HRHeadDashboard from "./features/hr-head/pages/Dashboard";
import HRManagerDashboard from "./components/HRManagerDashboard";
import DirectorDashboard from "./components/DirectorDashboard";
import AnalyticsReports from './features/director/components/AnalyticsReports';
import Departments from './features/director/components/Departments';
import ApprovalCenter from './features/hr-head/pages/ApprovalCenter';
import DeanDashboard from "./components/DeanDashboard";
import Unauthorized from "./components/Unauthorized";
import LeadsManagement from './features/admission-head/pages/LeadsManagement';
import ResourceManagement from './features/marketing-head/components/ResourceManagement';
import ReportingAnalytics from './features/marketing-head/components/ReportingAnalytics';
import CommunicationHub from './features/hr-head/pages/CommunicationHub';
import MarketingHeadCommunicationHub from './features/marketing-head/components/CommunicationHub';
import TrainingDevelopment from './features/marketing-head/components/TrainingDevelopment';
import ComplianceQuality from './features/marketing-head/components/ComplianceQuality';
import AccountManagement from './features/admission-head/pages/AccountManagement';
import Tickets from "./features/marketing-head/components/Tickets";
import AdmissionHeadLayout from "./components/AdmissionHeadLayout";
import AdminHeadDashboard from "./components/AdminHeadDashboard";
import ITHeadDashboard from "./components/ITHeadDashboard";
import HoDDashboard from "./components/HoDDashboard";
import SeniorProfessorDashboard from "./components/SeniorProfessorDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import ExamHeadDashboard from "./components/ExamHeadDashboard";
import LibraryHeadDashboard from "./components/LibraryHeadDashboard";
import TransportHeadDashboard from "./components/TransportHeadDashboard";
import StrategicPlanning from './features/director/components/StrategicPlanning';
import RiskManagement from './features/director/components/RiskManagement';
import AuditCompliance from './features/director/components/AuditCompliance';
import MeetingsCalendar from './features/director/components/MeetingsCalendar';
import UserManagement from './features/director/components/UserManagement';
import DirectorSettings from './features/director/components/DirectorSettings';
import Workspace from './features/hr-head/pages/Workspace';
import MarketingHeadWorkspace from './features/marketing-head/components/Workspace';
import Support from './features/admission-head/components/Support';
import MarketingHeadSupport from './features/marketing-head/components/Support';
import Dashboard from "./features/admission-head/components/Dashboard";
import Applications from './features/admission-head/pages/Applications';
import Schedule from './features/admission-head/pages/Schedule';
import Communication from './features/admission-head/pages/Communication';
import Payments from './features/admission-head/pages/Payments';
import Documents from './features/admission-head/pages/Documents';
import SearchFilters from './features/admission-head/pages/SearchFilters';
import ToolsUtilities from './features/admission-head/pages/ToolsUtilities';
import LeadTransfer from './features/admission-head/pages/LeadTransfer';
import CourseManagementPage from './features/admission-head/pages/CourseManagement';
import TrainingDevelopmentPage from './features/admission-head/pages/TrainingDevelopment';
import ComplianceQualityPage from './features/admission-head/pages/ComplianceQuality';
import PayrollOverview from "./features/hr-head/pages/PayrollOverview";
import BudgetManagement from "./features/hr-head/pages/BudgetManagement";
import ReportsAnalytics from "./features/hr-head/pages/ReportsAnalytics";
import AuditLogs from "./features/hr-head/pages/AuditLogs";
import Settings from "./features/hr-head/pages/Settings";
import SupportTickets from "./features/hr-head/pages/SupportTickets";
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
          <Route index element={<MarketingHeadDashboard />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="campaigns" element={<CampaignManagement />} />
          <Route path="resources" element={<ResourceManagement />} />
          <Route path="analytics" element={<ReportingAnalytics />} />
          <Route path="communication" element={<MarketingHeadCommunicationHub />} />
          <Route path="training" element={<TrainingDevelopment />} />
          <Route path="workspace" element={<MarketingHeadWorkspace />} />
          <Route path="support" element={<MarketingHeadSupport />} />
        </Route>

        <Route path="/rbac/marketing-manager" element={<MarketingManagerDashboard />} />
        <Route path="/rbac/admission-head" element={<AdmissionHeadLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="applications" element={<Applications />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="communication" element={<Communication />} />
          <Route path="payments" element={<Payments />} />
          <Route path="documents" element={<Documents />} />
          <Route path="search" element={<SearchFilters />} />
          <Route path="tools" element={<ToolsUtilities />} />
          <Route path="lead-transfer" element={<LeadTransfer />} />
          <Route path="courses" element={<CourseManagementPage />} />
          <Route path="training" element={<TrainingDevelopmentPage />} />
          <Route path="compliance" element={<ComplianceQualityPage />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="tickets" element={<PlaceholderPage title='Tickets' />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="help" element={<Support />} />
        </Route>
        <Route path="/rbac/admission-spoc" element={<AdmissionSpocDashboard />} />
        <Route path="/rbac/hr-head" element={<HRHeadLayout />}>
          <Route index element={<HRHeadDashboard />} />
          <Route path="payroll" element={<PayrollOverview />} />
          <Route path="budget" element={<BudgetManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="approvals" element={<ApprovalCenter />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="communication" element={<CommunicationHub />} />
          <Route path="training" element={<TrainingDevelopment />} />
          <Route path="compliance" element={<ComplianceQuality />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="support" element={<SupportTickets />} />
        </Route>
        <Route path="/rbac/hr-manager" element={<HRManagerDashboard />} />
        <Route path="/rbac/director" element={<DirectorDashboard />} />
        <Route path="/rbac/director/analytics" element={<AnalyticsReports />} />
        <Route path="/rbac/director/departments" element={<Departments />} />
        <Route path="/rbac/director/approvals" element={<ApprovalCenter />} />
        <Route path="/rbac/director/strategic-planning" element={<StrategicPlanning />} />
        <Route path="/rbac/director/communication" element={<CommunicationHub />} />
        <Route path="/rbac/director/audit" element={<AuditCompliance />} />
        <Route path="/rbac/director/calendar" element={<MeetingsCalendar />} />
        <Route path="/rbac/director/users" element={<UserManagement />} />
        <Route path="/rbac/director/settings" element={<DirectorSettings />} />
        <Route path="/rbac/director/workspace" element={<Workspace />} />
        <Route path="/rbac/director/support" element={<Support />} />
        <Route path="/rbac/marketing-head/support" element={<MarketingHeadSupport />} />
        <Route path="/rbac/dean" element={<DeanDashboard />} />
        <Route path="/rbac/admin-head" element={<AdminHeadDashboard />} />
        <Route path="/rbac/it-head" element={<ITHeadDashboard />} />
        <Route path="/rbac/hod" element={<HoDDashboard />} />
        <Route path="/rbac/senior-professor" element={<SeniorProfessorDashboard />} />
        <Route path="/rbac/student" element={<StudentDashboard />} />
        <Route path="/rbac/parent" element={<ParentDashboard />} />
        <Route path="/rbac/exam-head" element={<ExamHeadDashboard />} />
        <Route path="/rbac/library-head" element={<LibraryHeadDashboard />} />
        <Route path="/rbac/transport-head" element={<TransportHeadDashboard />} />
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