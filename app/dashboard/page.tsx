import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardTabs from "@/components/DashboardTabs";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const role = session.user.role;
  const userId = session.user.id;

  // 1. Fetch Projects (Admins see all, Members see owned)
  const allProjects = await prisma.project.findMany({
    where: role === "ADMIN" ? {} : { ownerId: userId },
    include: {
      tasks: { include: { assignee: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch Tasks (Admins see all, Members see assigned)
  const allTasks =
    role === "ADMIN"
      ? await prisma.task.findMany({
          include: { project: true, assignee: true },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.task.findMany({
          where: { assigneeId: userId },
          include: { project: true, assignee: true },
          orderBy: { createdAt: "desc" },
        });

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            <div className="flex items-center gap-4">
              {role === "ADMIN" && (
                <Link
                  href="/dashboard/users"
                  className="text-sm font-medium text-purple-600 hover:underline"
                >
                  Manage Users
                </Link>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Logged in as {role}</p>
          </div>

          {role === "ADMIN" && (
            <div className="flex gap-2">
              <Link
                href="/dashboard/new-project"
                className="bg-white border px-4 py-2 rounded-md text-sm"
              >
                + Project
              </Link>
              <Link
                href="/dashboard/new-task"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                + Task
              </Link>
            </div>
          )}
        </div>

        {/* This component handles the switching between Views */}
        <DashboardTabs
          initialTasks={allTasks}
          projects={allProjects}
          role={role}
        />
      </main>
    </div>
  );
}
