// components/AuthForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/authActions";
import { Role } from "@/lib/prisma";

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid email or password");
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // REGISTRATION FLOW
        const res = await registerUser(formData);

        if (res.error) {
          setError(res.error);
        } else {
          const loginRes = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (!loginRes?.error) {
            router.push("/dashboard");
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {isLogin ? "Welcome Back" : "Create an Account"}
      </h2>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              required={!isLogin}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="••••••••"
          />
        </div>

        {!isLogin && (
          <input type="hidden" name="role" value={"MEMBER" as Role} />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="text-sm text-center text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  );
}
