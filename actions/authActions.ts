// actions/authActions.ts
"use server";

import { prisma, Role } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // Let's make the first user an ADMIN, or allow passing a role for testing
  const role = (formData.get("role") as Role) || ("MEMBER" as Role);

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the user
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
