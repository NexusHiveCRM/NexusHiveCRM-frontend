import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { directorFeatures } from "./directorFeatures";
import { Outlet } from "react-router-dom";

export default function DirectorLayout() {
  const user = JSON.parse(localStorage.getItem('rbac_current_user'));
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F6F7FA] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar as a flex column, not fixed */}
      <div className={`${expanded ? "w-56" : "w-12"} flex-shrink-0 transition-all duration-300`}>
        <Sidebar
          features={directorFeatures}
          userLabel={user?.displayName || user?.role || "Director"}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>
      {/* Main content */}
      <main className="flex-1 p-6 space-y-8 overflow-y-auto transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
} 