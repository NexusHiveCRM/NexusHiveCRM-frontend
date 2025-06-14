import React from 'react';
import { NavLink } from 'react-router-dom';
import { adminHeadFeatures } from './adminHeadFeatures';
import * as Icons from '@heroicons/react/24/outline';

export default function AdminHeadSidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Head</h2>
      </div>
      <nav className="mt-4">
        {adminHeadFeatures.map((feature) => {
          const Icon = Icons[feature.icon];
          return (
            <NavLink
              key={feature.id}
              to={feature.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''
                }`
              }
            >
              {Icon && <Icon className="w-5 h-5 mr-3" />}
              <span>{feature.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
} 