import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          TaskFlow
        </div>
        <div className="space-x-4">
          {session ? (
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">
          Management made <span className="text-blue-600">simple.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          The all-in-one platform for teams to create projects, assign tasks,
          and track progress in real-time.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
          >
            Start for free
          </Link>
          <button className="border border-gray-300 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition">
            Watch Demo
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              🚀
            </div>
            <h3 className="text-xl font-bold mb-2">Role-Based Access</h3>
            <p className="text-gray-500">
              Admins manage projects, Members focus on tasks. Everyone stays in
              sync.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
              📈
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
            <p className="text-gray-500">
              Instantly see task updates and progress metrics across your whole
              team.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 text-red-600">
              ⏰
            </div>
            <h3 className="text-xl font-bold mb-2">Overdue Alerts</h3>
            <p className="text-gray-500">
              Visual indicators for tasks past their deadline to keep projects
              on schedule.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
