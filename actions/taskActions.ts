"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateTaskStatus(taskId: string, newStatus: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update task status" };
  }
}

export async function getProjectsWithTasks() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  return await prisma.project.findMany({
    where: session.user.role === "ADMIN" ? {} : { ownerId: session.user.id },
    include: {
      tasks: {
        include: { assignee: true },
      },
    },
  });
}
