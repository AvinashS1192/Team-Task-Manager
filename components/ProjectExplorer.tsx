"use client";
import { useState, useTransition } from "react";
import { deleteProject } from "@/actions/adminActions"; // Import the action we made earlier

export default function ProjectExplorer({ projects }: { projects: any[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    projects[0]?.id || null,
  );
  const [isPending, startTransition] = useTransition();

  const activeProject = projects.find((p) => p.id === selectedId);

  const handleDeleteProject = (id: string) => {
    if (
      confirm(
        "Warning: Deleting this project will remove all associated tasks. Continue?",
      )
    ) {
      startTransition(async () => {
        await deleteProject(id);
        setSelectedId(null); // Reset selection after delete
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 text-black">
      {/* Sidebar: Project List */}
      <div className="w-full md:w-64 space-y-2">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`w-full text-left p-3 rounded-lg border text-sm transition ${
              selectedId === p.id
                ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                : "bg-white border-gray-200"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Main: Project Details & Delete Button */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
        {activeProject ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{activeProject.title}</h3>
                <p className="text-gray-500 text-sm italic">
                  Project ID: {activeProject.id}
                </p>
              </div>

              {/* The Missing Delete Button */}
              <button
                onClick={() => handleDeleteProject(activeProject.id)}
                disabled={isPending}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete Project"}
              </button>
            </div>

            <div className="space-y-3 mt-6">
              <h4 className="font-semibold text-gray-700 border-b pb-2">
                Tasks in this Project
              </h4>
              {activeProject.tasks.map((t: any) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded border text-sm"
                >
                  <span>{t.title}</span>
                  <span className="text-xs font-bold text-gray-400">
                    {t.status}
                  </span>
                </div>
              ))}
              {activeProject.tasks.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No tasks assigned to this project.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Select a project from the sidebar to manage it.
          </div>
        )}
      </div>
    </div>
  );
}
