import AuthForm from "@/components/AuthForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="mb-8 text-center">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          TaskFlow
        </div>
        <p className="mt-2 text-lg text-gray-600">
          Manage projects, assign tasks, and track progress.
        </p>
      </div>

      <AuthForm />
    </main>
  );
}
