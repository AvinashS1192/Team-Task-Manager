"use client";

import { useTransition } from "react";
import { updateTaskStatus } from "@/actions/taskActions";
import { deleteTask } from "@/actions/adminActions";

type Task = {
  id: string;
  title: string;
  status: string;
  dueDate: Date | null;
  project: { title: string };
  assignee: { name: string | null } | null;
};

export default function DashboardClient({
  tasks,
  role,
}: {
  tasks: Task[];
  role: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "TODO"
        ? "IN_PROGRESS"
        : currentStatus === "IN_PROGRESS"
          ? "DONE"
          : "TODO";

    startTransition(() => {
      updateTaskStatus(taskId, nextStatus);
    });
  };

  const handleDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      startTransition(() => {
        deleteTask(taskId);
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-gray-100 text-gray-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "DONE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (dueDate: Date | null, status: string) => {
    if (!dueDate || status === "DONE") return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="w-full">
      {tasks.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            No tasks found. Time to create some projects!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);

            return (
              <div
                key={task.id}
                // Highlight border red if overdue
                className={`p-5 bg-white border rounded-xl shadow-sm transition-shadow ${
                  overdue
                    ? "border-red-400 shadow-red-100"
                    : "border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {task.project.title}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900">
                      {task.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleStatusChange(task.id, task.status)}
                    disabled={isPending}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border border-transparent hover:opacity-80 transition-opacity ${getStatusColor(task.status)}`}
                  >
                    {task.status.replace("_", " ")}
                  </button>
                </div>

                {task.dueDate && (
                  <p
                    className={`text-sm mb-3 font-medium ${overdue ? "text-red-600" : "text-gray-500"}`}
                  >
                    {overdue ? "⚠️ Overdue: " : "📅 Due: "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {role === "ADMIN"
                      ? `Assignee: ${task.assignee?.name || "Unassigned"}`
                      : "Assigned to you"}
                  </span>

                  {/* Delete Button (Admins Only) */}
                  {role === "ADMIN" && (
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
