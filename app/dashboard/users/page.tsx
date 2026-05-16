// app/dashboard/users/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserSearchList from "@/components/UserSearchList";
import Link from "next/link";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  // Strict RBAC: Only Admins can access this page
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch initial list of users
  const initialUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    take: 10,
  });

  return (
    <div className="max-w-4xl mx-auto p-8 text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <UserSearchList initialUsers={initialUsers} />
    </div>
  );
}
