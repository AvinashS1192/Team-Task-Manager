// actions/adminActions.ts
"use server";

import { prisma, Role } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Helper to check admin access
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function createProject(formData: FormData) {
  const user = await requireAdmin();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.project.create({
    data: {
      title,
      description,
      ownerId: user.id,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function createTask(formData: FormData) {
  await requireAdmin();

  const dueDate = formData.get("dueDate") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectId = formData.get("projectId") as string;
  const assigneeId = formData.get("assigneeId") as string;

  await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      assigneeId: assigneeId || null, // Null if unassigned
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteTask(taskId: string) {
  await requireAdmin();
  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath("/dashboard");
}

// NEW: Delete Project
export async function deleteProject(projectId: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/dashboard");
}

export async function searchUsers(query: string) {
  await requireAdmin(); // Security check

  return await prisma.user.findMany({
    where: {
      OR: [{ name: { contains: query } }, { email: { contains: query } }],
    },
    select: { id: true, name: true, email: true, role: true },
    take: 10,
  });
}

// Update a user's role
export async function updateUserRole(userId: string, newRole: Role) {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/dashboard/users");
}
