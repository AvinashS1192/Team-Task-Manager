"use client";

import { useState } from "react";
import DashboardClient from "./DashboardClient";
import ProjectExplorer from "./ProjectExplorer";
import IncompleteTasks from "./IncompleteTasks";

export default function DashboardTabs({ initialTasks, projects, role }: any) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200">
        {["all", "projects", "incomplete"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab === "all"
              ? "All Tasks"
              : tab === "projects"
                ? "Project Explorer"
                : "Incomplete"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "all" && (
          <DashboardClient tasks={initialTasks} role={role} />
        )}

        {activeTab === "projects" && <ProjectExplorer projects={projects} />}

        {activeTab === "incomplete" && <IncompleteTasks tasks={initialTasks} />}
      </div>
    </div>
  );
}
