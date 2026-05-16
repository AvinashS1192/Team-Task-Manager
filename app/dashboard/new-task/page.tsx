export const dynamic = "force-dynamic";

import { createTask } from "@/actions/adminActions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NewTaskPage() {
  // Fetch projects and users so the admin can select them from dropdowns
  const projects = await prisma.project.findMany();
  const users = await prisma.user.findMany();

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-sm border border-gray-200 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Task</h2>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline text-sm"
        >
          Cancel
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
          You need to create a Project before you can create tasks!
        </div>
      ) : (
        <form action={createTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Design landing page"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Project
            </label>
            <select
              name="projectId"
              required
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              name="assigneeId"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name || u.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Create Task
          </button>
        </form>
      )}
    </div>
  );
}
