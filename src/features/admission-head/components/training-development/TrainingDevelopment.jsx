import React, { useState } from 'react';
import {
  CalendarIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

// Import child components (to be created)
import TrainingCalendar from "./TrainingCalendar";
import TrainingModules from "./TrainingModules";
import OnboardingPrograms from "./OnboardingPrograms";
import SkillGapAnalysis from "./SkillGapAnalysis";
import ProgressTracking from "./ProgressTracking";
import TrainerManagement from "./TrainerManagement";
import TrainingFeedback from "./TrainingFeedback";
import KnowledgeHub from "./KnowledgeHub";
import Gamification from "./Gamification";

const TrainingDevelopment = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      name: "Training Calendar",
      icon: CalendarIcon,
      component: TrainingCalendar
    },
    {
      name: "Training Modules",
      icon: BookOpenIcon,
      component: TrainingModules
    },
    {
      name: "Onboarding",
      icon: UserGroupIcon,
      component: OnboardingPrograms
    },
    {
      name: "Skill Gap Analysis",
      icon: ChartBarIcon,
      component: SkillGapAnalysis
    },
    {
      name: "Progress Tracking",
      icon: AcademicCapIcon,
      component: ProgressTracking
    },
    {
      name: "Trainer Management",
      icon: UserIcon,
      component: TrainerManagement
    },
    {
      name: "Feedback & Evaluation",
      icon: ChatBubbleLeftRightIcon,
      component: TrainingFeedback
    },
    {
      name: "Knowledge Hub",
      icon: BookmarkIcon,
      component: KnowledgeHub
    },
    {
      name: "Gamification",
      icon: TrophyIcon,
      component: Gamification
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training & Development</h2>
          <p className="text-gray-600">Manage and track team training, skills, and development</p>
        </div>
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-primary" />
          <span className="text-sm text-gray-600">AI-Powered Insights</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${selectedTab === index
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {React.createElement(tabs[selectedTab].component)}
      </div>
    </div>
  );
};

export default TrainingDevelopment; 