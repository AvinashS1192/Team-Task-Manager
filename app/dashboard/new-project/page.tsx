import { createProject } from "@/actions/adminActions";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-sm border border-gray-200 text-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Project</h2>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline text-sm"
        >
          Cancel
        </Link>
      </div>

      <form action={createProject} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Q3 Marketing Campaign"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="What is this project about?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
